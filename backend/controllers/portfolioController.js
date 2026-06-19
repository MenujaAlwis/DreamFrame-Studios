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

const createPortfolioItem = async (req, res, next) => {
  try {
    const { title, category, eventDate } = req.body;

    const coverImage = req.files?.coverImage?.[0];
    const media = req.files?.media || [];

    if (!coverImage) {
      return res.status(400).json({
        success: false,
        message: 'Cover image is required',
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
};