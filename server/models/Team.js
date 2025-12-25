import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  game: {
    type: String,
    required: true
  },
  gameCategory: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: '/placeholder.svg'
  },
  banner: {
    type: String,
    default: '/placeholder.svg'
  },
  description: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  achievements: [String],
  roster: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  staff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

teamSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Team', teamSchema);
