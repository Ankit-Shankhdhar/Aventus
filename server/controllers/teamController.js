import Team from '../models/Team.js';
import Player from '../models/Player.js';

export const getAllTeams = async (req, res) => {
  try {
    const { active, game } = req.query;
    const filter = {};
    
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }
    if (game) {
      filter.game = game;
    }

    const teams = await Team.find(filter)
      .populate('roster')
      .sort({ createdAt: -1 });
    
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamBySlug = async (req, res) => {
  try {
    const team = await Team.findOne({ slug: req.params.slug })
      .populate('roster');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json({
      message: 'Team created successfully',
      team
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    ).populate('roster');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json({
      message: 'Team updated successfully',
      team
    }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findOneAndDelete({ slug: req.params.slug });
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addPlayerToTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ slug: req.params.slug });
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const player = await Player.findById(req.body.playerId);
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    if (!team.roster.includes(player._id)) {
      team.roster.push(player._id);
      player.teamId = team._id;
      await team.save();
      await player.save();
    }

    const updatedTeam = await Team.findOne({ slug: req.params.slug })
      .populate('roster');

    res.json({
      message: 'Player added to team',
      team: updatedTeam
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removePlayerFromTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ slug: req.params.slug });
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    team.roster = team.roster.filter(id => id.toString() !== req.params.playerId);
    await team.save();

    const player = await Player.findById(req.params.playerId);
    if (player) {
      player.teamId = null;
      await player.save();
    }

    const updatedTeam = await Team.findOne({ slug: req.params.slug })
      .populate('roster');

    res.json({
      message: 'Player removed from team',
      team: updatedTeam
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
