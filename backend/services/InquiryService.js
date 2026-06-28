const Inquiry = require('../models/Inquiry');

class InquiryService {
  static async createInquiry(data) {
    return await Inquiry.create(data);
  }

  static async getAllInquiries() {
    return await Inquiry.find().sort({ createdAt: -1 });
  }

  static async getInquiryById(id) {
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      const error = new Error('Inquiry not found');
      error.statusCode = 404;
      throw error;
    }

    return inquiry;
  }

  static async deleteInquiry(id) {
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      const error = new Error('Inquiry not found');
      error.statusCode = 404;
      throw error;
    }

    await inquiry.deleteOne();
  }
}

module.exports = InquiryService;