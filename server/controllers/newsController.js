import News from '../models/News.js';

export const getAllNews = async (req, res) => {
  try {
    const { category, tag, published, limit = 10, page = 1 } = req.query;
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    if (tag) {
      filter.tags = tag;
    }
    if (published !== undefined) {
      filter.isPublished = published === 'true';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const news = await News.find(filter)
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await News.countDocuments(filter);

    res.json({
      news,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    
    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }

    // Increment views
    news.views += 1;
    await news.save();
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json({
      message: 'News article created successfully',
      news
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const news = await News.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }
    
    res.json({
      message: 'News article updated successfully',
      news
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findOneAndDelete({ slug: req.params.slug });
    
    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }
    
    res.json({ message: 'News article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedNews = async (req, res) => {
  try {
    const news = await News.find({ isPublished: true })
      .sort({ views: -1, publishedAt: -1 })
      .limit(5);
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNewsCategories = async (req, res) => {
  try {
    const categories = await News.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
