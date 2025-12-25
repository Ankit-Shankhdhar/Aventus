import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: '/placeholder.svg'
  },
  featuredImage: {
    type: String,
    default: '/placeholder.svg'
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Admin'
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

newsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('News', newsSchema);
