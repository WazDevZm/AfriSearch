// Entry point for backend server
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import searchRoutes from './routes/search.js';
import newsRoutes from './routes/news.js';
import businessRoutes from './routes/businesses.js';
import authorRoutes from './routes/authors.js';
import searchEngine from './services/searchEngine.js';

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/afrisearch';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/search', searchRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/authors', authorRoutes);

// Initialize search engine
searchEngine.initIndex();

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    features: [
      'African Business Directory',
      'African News Aggregation', 
      'African Authors & Creators',
      'Multi-language Translation',
      'Cultural Content Discovery'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`AfriSearch backend running on port ${PORT}`);
  console.log('Features enabled:');
  console.log('- African Business Directory');
  console.log('- African News Aggregation');
  console.log('- African Authors & Creators');
  console.log('- Multi-language Translation');
  console.log('- Cultural Content Discovery');
});