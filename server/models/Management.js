import mongoose from 'mongoose';

const managementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: '/placeholder.svg'
  },
  bio: {
    type: String,
    required: true
  },
  socialLinks: {
    twitter: String,
    linkedin: String
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Management', managementSchema);
