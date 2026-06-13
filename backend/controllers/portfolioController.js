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
    const { title, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Media file is required',
      });
    }

    const item = await PortfolioService.createPortfolioItem({
      title,
      category,
      fileBuffer: file.buffer,
      mimetype: file.mimetype,
      fileName: file.originalname,
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio item uploaded successfully',
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