import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  bio: String,
  nationality: String,
  expertise: [String],
  socialMedia: {
    twitter: String,
    linkedin: String,
    website: String
  },
  publications: [{
    title: String,
    type: {
      type: String,
      enum: ['book', 'article', 'blog', 'research', 'media']
    },
    url: String,
    publishedAt: Date
  }],
  languages: [String],
  verified: {
    type: Boolean,
    default: false
  },
  followers: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Text search index
authorSchema.index({
  name: 'text',
  bio: 'text',
  expertise: 'text'
});

const Author = mongoose.model('Author', authorSchema);

export default Author; 