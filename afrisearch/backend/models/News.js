import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true
  },
  summary: String,
  author: {
    name: String,
    email: String,
    organization: String
  },
  source: {
    name: String,
    url: String,
    logo: String
  },
  category: {
    type: String,
    required: true,
    enum: ['politics', 'business', 'technology', 'sports', 'entertainment', 'health', 'education', 'environment', 'culture', 'international']
  },
  country: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    default: 'en'
  },
  tags: [String],
  images: [String],
  publishedAt: {
    type: Date,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  sentiment: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    default: 'neutral'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Text search index
newsSchema.index({
  title: 'text',
  content: 'text',
  summary: 'text',
  tags: 'text'
});

// Compound indexes for filtering
newsSchema.index({ category: 1, country: 1, publishedAt: -1 });
newsSchema.index({ language: 1, publishedAt: -1 });

const News = mongoose.model('News', newsSchema);

export default News; 