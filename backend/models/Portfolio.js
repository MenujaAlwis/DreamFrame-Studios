const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    category: {
      type: String,
      enum: ['wedding', 'pre-shoot', 'portrait', 'event', 'commercial'],
      required: true,
      index: true,
    },

    coverImage: {
      url: String,
      thumbnailUrl: String,
      cloudinaryPublicId: String,
      mediaType: { type: String, enum: ['image', 'video'], default: 'image' }
    },

    media: [
      {
        url: { type: String, required: true },
        thumbnailUrl: String,
        cloudinaryPublicId: String,
        mediaType: { type: String, enum: ['image', 'video'], required: true }
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);