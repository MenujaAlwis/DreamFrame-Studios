const express = require('express');
const upload = require('../config/multer');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const {
  getPortfolioItems,
  createPortfolioItem,
  deletePortfolioItem,
  getPortfolioItemById,
  updatePortfolioItem
} = require('../controllers/portfolioController');

const router = express.Router();

router.get('/', getPortfolioItems);
router.get('/:id', getPortfolioItemById);

router.post(
  '/',
  protect,
  authorizeRoles('admin'),
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'media', maxCount: 20 },
  ]),
  createPortfolioItem
);
router.put(
  '/:id',
  protect,
  authorizeRoles('admin'),
  upload.none(), 
  updatePortfolioItem
);

router.delete('/:id', protect, authorizeRoles('admin'), deletePortfolioItem);

module.exports = router;