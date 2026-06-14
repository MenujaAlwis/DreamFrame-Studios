const express = require('express');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const {
  createBooking,
  getBookings,
  updateBookingStatus,
} = require('../controllers/bookingController');

const router = express.Router();

router.post('/', createBooking);
router.get('/', protect, authorizeRoles('admin'), getBookings);
router.put('/:id', protect, authorizeRoles('admin'), updateBookingStatus);

module.exports = router;