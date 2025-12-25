import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  tier: {
    type: String,
    enum: ['main', 'partner', 'supporter'],
    required: true
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  },
  contractStart: Date,
  contractEnd: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Sponsor', sponsorSchema);
