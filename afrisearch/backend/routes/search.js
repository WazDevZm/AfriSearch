// Search route
import express from 'express';
import searchEngine from '../services/searchEngine.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { q: query, lang, country, lat, lon, distance } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const filters = { language: lang, country, lat, lon, distance };
    const results = await searchEngine.search(query, filters);
    
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;