// News route
import express from 'express';
import News from '../models/News.js';

const router = express.Router();

// Get all news with filters
router.get('/', async (req, res) => {
  try {
    const { category, country, language, limit = 20, page = 1 } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (country) filter.country = country;
    if (language) filter.language = language;

    const skip = (page - 1) * limit;
    const news = await News.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ publishedAt: -1, views: -1 });

    const total = await News.countDocuments(filter);

    res.json({
      news,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('News error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get news by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'News article not found' });
    }
    
    // Increment view count
    article.views += 1;
    await article.save();
    
    res.json(article);
  } catch (error) {
    console.error('News article error:', error);
    res.status(500).json({ error: 'Failed to fetch news article' });
  }
});

// Create new news article
router.post('/', async (req, res) => {
  try {
    const article = new News(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({ error: 'Failed to create news article' });
  }
});

// Search news
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { category, country, language } = req.query;
    
    const searchCriteria = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    };

    if (category) searchCriteria.category = category;
    if (country) searchCriteria.country = country;
    if (language) searchCriteria.language = language;

    const news = await News.find(searchCriteria)
      .limit(20)
      .sort({ publishedAt: -1, views: -1 });

    res.json({ news });
  } catch (error) {
    console.error('News search error:', error);
    res.status(500).json({ error: 'News search failed' });
  }
});

export default router;