import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  opponent: {
    type: String,
    required: true
  },
  opponentLogo: {
    type: String,
    default: '/placeholder.svg'
  },
  date: {
    type: Date,
    required: true
  },
  tournament: {
    type: String,
    required: true
  },
  result: {
    type: String,
    enum: ['win', 'loss', 'upcoming'],
    required: true
  },
  score: {
    type: String,
    required: true
  },
  highlights: [String],
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Match', matchSchema);
