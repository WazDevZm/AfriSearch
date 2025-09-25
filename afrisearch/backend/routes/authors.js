import express from 'express';
import Author from '../models/Author.js';

const router = express.Router();

// Get all authors with filters
router.get('/', async (req, res) => {
  try {
    const { nationality, expertise, verified, limit = 20, page = 1 } = req.query;
    
    const filter = {};
    if (nationality) filter.nationality = nationality;
    if (expertise) filter.expertise = { $in: [new RegExp(expertise, 'i')] };
    if (verified !== undefined) filter.verified = verified === 'true';

    const skip = (page - 1) * limit;
    const authors = await Author.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1, followers: -1 });

    const total = await Author.countDocuments(filter);

    res.json({
      authors,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Authors error:', error);
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
});

// Get author by ID
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    console.error('Author error:', error);
    res.status(500).json({ error: 'Failed to fetch author' });
  }
});

// Create new author
router.post('/', async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    console.error('Create author error:', error);
    res.status(500).json({ error: 'Failed to create author' });
  }
});

// Search authors
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { nationality, expertise } = req.query;
    
    const searchCriteria = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { bio: { $regex: query, $options: 'i' } },
        { expertise: { $in: [new RegExp(query, 'i')] } }
      ]
    };

    if (nationality) searchCriteria.nationality = nationality;
    if (expertise) searchCriteria.expertise = { $in: [new RegExp(expertise, 'i')] };

    const authors = await Author.find(searchCriteria)
      .limit(20)
      .sort({ rating: -1, followers: -1 });

    res.json({ authors });
  } catch (error) {
    console.error('Author search error:', error);
    res.status(500).json({ error: 'Author search failed' });
  }
});

export default router; 