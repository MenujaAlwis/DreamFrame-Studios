const { Readable } = require('stream');
const cloudinary = require('../config/cloudinary');
const Portfolio = require('../models/Portfolio');
const AppError = require('../utils/AppError');

class PortfolioService {
  static uploadBufferToCloudinary(buffer, options) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error) {
          reject(error);
          return;
        }

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
    const items = await Portfolio.find(filter).sort({ createdAt: -1 });
    return items;
  }

  static async createPortfolioItem(payload) {
    const { title, category, fileBuffer, mimetype, fileName } = payload;

    if (!title || !category) {
      throw new AppError('Title and category are required', 400);
    }

    if (!fileBuffer) {
      throw new AppError('Media file is required', 400);
    }

    const mediaType = mimetype.startsWith('video/') ? 'video' : 'image';

    const cloudinaryResult = await this.uploadBufferToCloudinary(fileBuffer, {
      folder: 'event-photography/portfolio',
      resource_type: 'auto',
      public_id: `${Date.now()}-${fileName}`,
    });

    const item = await Portfolio.create({
      title,
      category,
      mediaType,
      mediaUrl: cloudinaryResult.secure_url,
      thumbnailUrl: cloudinaryResult.secure_url,
      cloudinaryPublicId: cloudinaryResult.public_id,
    });

    return item;
  }

  static async deletePortfolioItem(itemId) {
    const item = await Portfolio.findByIdAndDelete(itemId);

    if (!item) {
      throw new AppError('Portfolio item not found', 404);
    }

    await cloudinary.uploader.destroy(item.cloudinaryPublicId, {
      resource_type: item.mediaType === 'video' ? 'video' : 'image',
    });

    return { message: 'Portfolio item deleted successfully' };
  }
}

module.exports = PortfolioService;
