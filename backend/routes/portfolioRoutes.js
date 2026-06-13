const express = require('express');
const upload = require('../config/multer');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const {
  getPortfolioItems,
  createPortfolioItem,
  deletePortfolioItem,
} = require('../controllers/portfolioController');

const router = express.Router();

router.get('/', getPortfolioItems);
router.post('/', protect, authorizeRoles('admin'), upload.single('media'), createPortfolioItem);
router.delete('/:id', protect, authorizeRoles('admin'), deletePortfolioItem);

module.exports = router;