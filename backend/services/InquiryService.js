const Inquiry = require('../models/Inquiry');

class InquiryService {
  static async createInquiry(data) {
    return await Inquiry.create(data);
  }

  static async getAllInquiries() {
    return await Inquiry.find().sort({
      createdAt: -1,
    });
  }

  static async deleteInquiry(id) {
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      throw new Error('Inquiry not found');
    }

    await inquiry.deleteOne();
  }
}

module.exports = InquiryService;