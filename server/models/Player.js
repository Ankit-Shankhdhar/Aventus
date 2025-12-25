import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  // realName: {
  //   type: String,
  //   required: false
  // },
  role: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: '/placeholder.svg'
  },
  country: {
    type: String,
    required: true
  },
  socialLinks: {
    twitter: String,
    twitch: String,
    instagram: String,
    youtube: String
  },
  // joinDate: {
  //   type: Date,
  //   required: false
  // },
  type: {
    type: String,
    enum: ['player', 'creator', 'staff'],
    default: 'player'
  },
  bio: String,
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Player', playerSchema);
