const InquiryService = require('../services/InquiryService');

const createInquiry = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      service,
      eventDate,
      location,
      message,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !service ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      });
    }

    const inquiry =
      await InquiryService.createInquiry({
        fullName,
        email,
        phone,
        service,
        eventDate,
        location,
        message,
      });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

const getAllInquiries = async (req, res, next) => {
  try {
    const inquiries =
      await InquiryService.getAllInquiries();

    res.status(200).json({
      success: true,
      inquiries,
    });
  } catch (error) {
    next(error);
  }
};
const getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await InquiryService.getInquiryById(req.params.id);

    res.status(200).json({
      success: true,
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

const deleteInquiry = async (req, res, next) => {
  try {
    await InquiryService.deleteInquiry(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getAllInquiries,
  deleteInquiry,
getInquiryById,
};