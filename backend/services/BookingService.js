const Booking = require('../models/Booking');
const AppError = require('../utils/AppError');

class BookingService {
  static async createBooking(payload) {
    const { name, email, eventType, date, message } = payload;

    if (!name || !email || !eventType || !date || !message) {
      throw new AppError('All booking fields are required', 400);
    }

    const booking = await Booking.create({
      name,
      email,
      eventType,
      date,
      message,
    });

    return booking;
  }

  static async getBookings() {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return bookings;
  }

  static async updateBookingStatus(bookingId, status) {
    if (!['pending', 'confirmed', 'rejected'].includes(status)) {
      throw new AppError('Invalid booking status', 400);
    }

    const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    return booking;
  }
}

module.exports = BookingService;
