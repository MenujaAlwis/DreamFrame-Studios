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
    return await Portfolio.find(filter).sort({ createdAt: -1 });
  }

  static async createPortfolioItem(payload) {
    const { title, category, coverImage, media } = payload;

    if (!title || !category) {
      throw new AppError('Title and category are required', 400);
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
    });
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