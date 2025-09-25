// Businesses route
import express from 'express';
import Business from '../models/Business.js';

const router = express.Router();

// Get all businesses with filters
router.get('/', async (req, res) => {
  try {
    const { category, country, city, verified, limit = 20, page = 1 } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (country) filter['address.country'] = country;
    if (city) filter['address.city'] = new RegExp(city, 'i');
    if (verified !== undefined) filter.verified = verified === 'true';

    const skip = (page - 1) * limit;
    const businesses = await Business.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1, verified: -1 });

    const total = await Business.countDocuments(filter);

    res.json({
      businesses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Businesses error:', error);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
});

// Get business by ID
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    res.json(business);
  } catch (error) {
    console.error('Business error:', error);
    res.status(500).json({ error: 'Failed to fetch business' });
  }
});

// Create new business
router.post('/', async (req, res) => {
  try {
    const business = new Business(req.body);
    await business.save();
    res.status(201).json(business);
  } catch (error) {
    console.error('Create business error:', error);
    res.status(500).json({ error: 'Failed to create business' });
  }
});

// Update business
router.put('/:id', async (req, res) => {
  try {
    const business = await Business.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    res.json(business);
  } catch (error) {
    console.error('Update business error:', error);
    res.status(500).json({ error: 'Failed to update business' });
  }
});

// Search businesses
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { category, country, city } = req.query;
    
    const searchCriteria = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    };

    if (category) searchCriteria.category = category;
    if (country) searchCriteria['address.country'] = country;
    if (city) searchCriteria['address.city'] = new RegExp(city, 'i');

    const businesses = await Business.find(searchCriteria)
      .limit(20)
      .sort({ rating: -1, verified: -1 });

    res.json({ businesses });
  } catch (error) {
    console.error('Business search error:', error);
    res.status(500).json({ error: 'Business search failed' });
  }
});

export default router;