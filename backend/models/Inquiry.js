const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    service: {
      type: String,
      required: true,
      enum: [
        'wedding',
        'pre-shoot',
        'portrait',
        'event',
        'commercial',
      ],
    },

    eventDate: {
      type: Date,
    },

    location: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Inquiry', inquirySchema);