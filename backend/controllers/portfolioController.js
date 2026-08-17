const PortfolioService = require('../services/PortfolioService');

const getPortfolioItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const items = await PortfolioService.getPortfolioItems(filter);

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    next(error);
  }
};

const getPortfolioItemById = async (req, res, next) => {
  try {
    const item = await PortfolioService.getPortfolioItemById(req.params.id);

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    next(error);
  }
};

const createPortfolioItem = async (req, res, next) => {
  try {
    console.log("📦 BODY:", req.body);
    console.log("📁 FILES:", req.files);

    const { title, category, eventDate } = req.body;

    const coverImage = req.files?.coverImage?.[0];
    const media = req.files?.media || [];

    if (!title || !category || !eventDate) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and event date are required',
      });
    }

    if (!coverImage) {
      return res.status(400).json({
        success: false,
        message: 'Cover image is required or multer failed',
      });
    }

    const item = await PortfolioService.createPortfolioItem({
      title,
      category,
      eventDate,
      coverImage,
      media,
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio created successfully',
      item,
    });

  } catch (error) {
    console.error("🔥 CREATE PORTFOLIO ERROR:", error);
    next(error);
  }
};
const updatePortfolioItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title, category, eventDate, removedMedia } = req.body || {};

    if (!title || !category || !eventDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Parse the removedMedia JSON string into an array of Cloudinary public IDs
    let removedMediaIds = [];
    if (removedMedia) {
      try {
        removedMediaIds = JSON.parse(removedMedia);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: 'Invalid removedMedia format'
        });
      }
    }

    const newCoverImageFile = req.files?.coverImage?.[0] || null;
    const newMediaFiles = req.files?.media || [];

    const item = await PortfolioService.updatePortfolioItem(id, {
      title,
      category,
      eventDate,
      removedMediaIds,
      newMediaFiles,
      newCoverImageFile,
    });

    res.status(200).json({
      success: true,
      message: 'Portfolio updated successfully',
      item
    });
  } catch (error) {
    next(error);
  }
};

const deletePortfolioItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    await PortfolioService.deletePortfolioItem(id);

    res.status(200).json({
      success: true,
      message: 'Portfolio item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPortfolioItems,
  createPortfolioItem,
  deletePortfolioItem,
  getPortfolioItemById,
  updatePortfolioItem,
};