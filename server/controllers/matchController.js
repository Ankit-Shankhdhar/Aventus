import Match from '../models/Match.js';

export const getAllMatches = async (req, res) => {
  try {
    const { teamId, result, limit = 20 } = req.query;
    const filter = {};
    
    if (teamId) {
      filter.teamId = teamId;
    }
    if (result) {
      filter.result = result;
    }

    const matches = await Match.find(filter)
      .populate('teamId', 'name slug logo')
      .sort({ date: -1 })
      .limit(parseInt(limit));
    
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMatchBySlug = async (req, res) => {
  try {
    const match = await Match.findOne({ slug: req.params.slug })
      .populate('teamId', 'name slug logo');
    
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json({
      message: 'Match created successfully',
      match
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMatch = async (req, res) => {
  try {
    const match = await Match.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    ).populate('teamId', 'name slug logo');
    
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    res.json({
      message: 'Match updated successfully',
      match
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findOneAndDelete({ slug: req.params.slug });
    
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    res.json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUpcomingMatches = async (req, res) => {
  try {
    const matches = await Match.find({ 
      result: 'upcoming',
      date: { $gte: new Date() }
    })
      .populate('teamId', 'name slug logo')
      .sort({ date: 1 })
      .limit(10);
    
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
