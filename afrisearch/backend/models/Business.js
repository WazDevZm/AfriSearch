import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['restaurant', 'hotel', 'shop', 'service', 'transport', 'health', 'education', 'entertainment', 'other']
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  operatingHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  languages: [String],
  verified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  tags: [String],
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Text search index
businessSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  'address.city': 'text',
  'address.country': 'text'
});

// Geospatial index for location-based searches
businessSchema.index({ 'address.coordinates': '2dsphere' });

const Business = mongoose.model('Business', businessSchema);

export default Business;
