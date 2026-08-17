const { Readable } = require('stream');
const cloudinary = require('../config/cloudinary');
const Portfolio = require('../models/Portfolio');
const AppError = require('../utils/AppError');

class PortfolioService {
  static uploadBufferToCloudinary(buffer, options) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      const bufferStream = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      });

      bufferStream.pipe(uploadStream);
    });
  }

  static async getPortfolioItems(filter = {}) {
    return await Portfolio.find(filter).sort({ eventDate: -1 });
  }
  static async getPortfolioItemById(id) {
    const item = await Portfolio.findById(id);

    if (!item) throw new AppError('Portfolio item not found', 404);

    return item;
  }
  static async createPortfolioItem(payload) {
    const { title, category, eventDate, coverImage, media } = payload;

    if (!title || !category || !eventDate) {
      throw new AppError('Title, category, and event date are required', 400);
    }

    const uploadFile = async (file) => {
      const result = await this.uploadBufferToCloudinary(file.buffer, {
        folder: 'dreamframe-portfolio',
        resource_type: 'auto',
        public_id: `${Date.now()}-${file.originalname}`,
      });

      return {
        url: result.secure_url,
        thumbnailUrl: result.secure_url,
        cloudinaryPublicId: result.public_id,
        mediaType: file.mimetype.startsWith('video/') ? 'video' : 'image',
      };
    };

    const cover = await uploadFile(coverImage);

    const mediaUploads = [];

    for (const file of media) {
      mediaUploads.push(await uploadFile(file));
    }

    return await Portfolio.create({
      title,
      category,
      coverImage: cover,
      media: mediaUploads,
      eventDate,
    });
  }

  static async updatePortfolioItem(itemId, payload) {
    const {
      title,
      category,
      eventDate,
      removedMediaIds = [],
      newMediaFiles = [],
      newCoverImageFile = null,
    } = payload;

    const item = await Portfolio.findById(itemId);
    if (!item) throw new AppError('Portfolio item not found', 404);

    // --- Upload helper (reuses existing method) ---
    const uploadFile = async (file) => {
      const result = await this.uploadBufferToCloudinary(file.buffer, {
        folder: 'dreamframe-portfolio',
        resource_type: 'auto',
        public_id: `${Date.now()}-${file.originalname}`,
      });

      return {
        url: result.secure_url,
        thumbnailUrl: result.secure_url,
        cloudinaryPublicId: result.public_id,
        mediaType: file.mimetype.startsWith('video/') ? 'video' : 'image',
      };
    };

    // --- Delete removed media from Cloudinary ---
    if (removedMediaIds.length > 0) {
      for (const publicId of removedMediaIds) {
        const mediaItem = item.media.find(
          (m) => m.cloudinaryPublicId === publicId
        );
        if (mediaItem) {
          try {
            await cloudinary.uploader.destroy(publicId, {
              resource_type: mediaItem.mediaType,
            });
          } catch (err) {
            console.error(`Failed to delete ${publicId} from Cloudinary:`, err);
          }
        }
      }

      // Filter out removed media from the document
      item.media = item.media.filter(
        (m) => !removedMediaIds.includes(m.cloudinaryPublicId)
      );
    }

    // --- Upload new media files ---
    for (const file of newMediaFiles) {
      const uploaded = await uploadFile(file);
      item.media.push(uploaded);
    }

    // --- Replace cover image if a new one was uploaded ---
    if (newCoverImageFile) {
      // Delete old cover from Cloudinary
      if (item.coverImage?.cloudinaryPublicId) {
        try {
          await cloudinary.uploader.destroy(
            item.coverImage.cloudinaryPublicId,
            { resource_type: item.coverImage.mediaType }
          );
        } catch (err) {
          console.error('Failed to delete old cover from Cloudinary:', err);
        }
      }

      item.coverImage = await uploadFile(newCoverImageFile);
    }

    // --- Update text fields ---
    if (title) item.title = title;
    if (category) item.category = category;
    if (eventDate) item.eventDate = eventDate;

    await item.save();
    return item;
  }

  static async deletePortfolioItem(itemId) {
    const item = await Portfolio.findByIdAndDelete(itemId);

    if (!item) throw new AppError('Portfolio item not found', 404);

    await cloudinary.uploader.destroy(item.coverImage.cloudinaryPublicId, {
      resource_type: item.coverImage.mediaType,
    });

    for (const file of item.media) {
      await cloudinary.uploader.destroy(file.cloudinaryPublicId, {
        resource_type: file.mediaType,
      });
    }

    return { message: 'Portfolio item deleted successfully' };
  }
}

module.exports = PortfolioService;