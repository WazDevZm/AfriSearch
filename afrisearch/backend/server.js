// Entry point for backend server
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import searchRoutes from './routes/search.js';
import newsRoutes from './routes/news.js';
import businessRoutes from './routes/businesses.js';
import searchEngine from './services/searchEngine.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/search', searchRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/businesses', businessRoutes);

// Initialize search engine
searchEngine.initIndex();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`AfriSearch backend running on port ${PORT}`);
});