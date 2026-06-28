const express = require('express');

const {
  createInquiry,
  getAllInquiries,
  deleteInquiry,
} = require('../controllers/inquiryController');

const {
  protect,
  authorizeRoles,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createInquiry);

router.get(
  '/',
  protect,
  authorizeRoles('admin'),
  getAllInquiries
);

router.delete(
  '/:id',
  protect,
  authorizeRoles('admin'),
  deleteInquiry
);

module.exports = router;