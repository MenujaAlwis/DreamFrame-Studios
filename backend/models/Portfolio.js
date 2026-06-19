const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    thumbnailUrl: String,
    cloudinaryPublicId: String,
    mediaType: { type: String, enum: ['image', 'video'], required: true },
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    category: {
      type: String,
      enum: ['wedding', 'pre-shoot', 'portrait', 'event', 'commercial'],
      required: true,
      index: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    coverImage: mediaSchema,
    media: [mediaSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);