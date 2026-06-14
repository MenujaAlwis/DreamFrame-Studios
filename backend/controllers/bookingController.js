const BookingService = require('../services/BookingService');

const createBooking = async (req, res, next) => {
  try {
    const booking = await BookingService.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: 'Booking request submitted successfully',
      booking,
    });
  } catch (error) {
    next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {
    const bookings = await BookingService.getBookings();

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await BookingService.updateBookingStatus(id, status);

    res.status(200).json({
      success: true,
      message: 'Booking status updated',
      booking,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus,
};