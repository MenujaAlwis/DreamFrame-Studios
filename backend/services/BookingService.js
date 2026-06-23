const Booking = require('../models/Booking');
const AppError = require('../utils/AppError');
const mongoose = require('mongoose');

class BookingService {

  static async createBooking(payload) {
    const { name, email, eventType, date, message } = payload;

    if (!name || !email || !eventType || !date || !message) {
      throw new AppError('All booking fields are required', 400);
    }

    return await Booking.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      eventType,
      date,
      message: message.trim(),
      status: 'pending'
    });
  }

  static async getBookings() {
    return await Booking.find().sort({ createdAt: -1 });
  }

  static async getBookingById(bookingId) {
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new AppError('Invalid booking ID', 400);
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    return booking;
  }

  static async updateBookingStatus(bookingId, status) {
    const allowedStatuses = ['pending', 'confirmed', 'rejected'];

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new AppError('Invalid booking ID', 400);
    }

    if (!allowedStatuses.includes(status)) {
      throw new AppError('Invalid booking status', 400);
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    return booking;
  }

  static async deleteBooking(bookingId) {
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new AppError('Invalid booking ID', 400);
    }

    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    return { message: 'Booking deleted successfully' };
  }
}

module.exports = BookingService;