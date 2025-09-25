// Search route
import express from 'express';
import searchEngine from '../services/searchEngine.js';
import translationService from '../services/translationService.js';

const router = express.Router();

// Main search endpoint
router.get('/', async (req, res) => {
  try {
    const { q: query, lang, country, category, type, lat, lon, distance } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const filters = { 
      language: lang, 
      country, 
      category, 
      type,
      lat: parseFloat(lat), 
      lon: parseFloat(lon), 
      distance: parseFloat(distance) 
    };
    
    const results = await searchEngine.search(query, filters);
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Translation endpoint
router.post('/translate', async (req, res) => {
  try {
    const { text, targetLang, sourceLang } = req.body;
    
    if (!text || !targetLang) {
      return res.status(400).json({ error: 'Text and target language are required' });
    }

    const translation = await translationService.translate(text, targetLang, sourceLang);
    res.json(translation);
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Language detection endpoint
router.post('/detect-language', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const detectedLang = await translationService.detectLanguage(text);
    res.json({ 
      language: detectedLang,
      languageName: translationService.supportedLanguages[detectedLang] || 'Unknown'
    });
  } catch (error) {
    console.error('Language detection error:', error);
    res.status(500).json({ error: 'Language detection failed' });
  }
});

// Get supported languages
router.get('/languages', (req, res) => {
  try {
    const languages = translationService.getSupportedLanguages();
    res.json({ languages });
  } catch (error) {
    console.error('Languages error:', error);
    res.status(500).json({ error: 'Failed to get languages' });
  }
});

export default router;