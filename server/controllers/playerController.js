import Player from '../models/Player.js';
import Team from '../models/Team.js';

export const getAllPlayers = async (req, res) => {
  try {
    const { type, teamId } = req.query;
    const filter = {};
    
    if (type) {
      filter.type = type;
    }
    if (teamId) {
      filter.teamId = teamId;
    }

    const players = await Player.find(filter)
      .populate('teamId', 'name slug logo')
      .sort({ joinDate: -1 });
    
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlayerBySlug = async (req, res) => {
  try {
    const player = await Player.findOne({ slug: req.params.slug })
      .populate('teamId', 'name slug logo');
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();

    // Add player to team's roster if teamId is provided
    if (req.body.teamId) {
      await Team.findByIdAndUpdate(req.body.teamId, {
        $addToSet: { roster: player._id }
      });
    }

    res.status(201).json({
      message: 'Player created successfully',
      player
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    // Get the current player to check if teamId is changing
    const currentPlayer = await Player.findOne({ slug: req.params.slug });
    
    if (!currentPlayer) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const oldTeamId = currentPlayer.teamId?.toString();
    const newTeamId = req.body.teamId?.toString();

    // If team is changing, update roster arrays
    if (oldTeamId !== newTeamId) {
      // Remove from old team's roster
      if (oldTeamId) {
        await Team.findByIdAndUpdate(oldTeamId, {
          $pull: { roster: currentPlayer._id }
        });
      }

      // Add to new team's roster
      if (newTeamId) {
        await Team.findByIdAndUpdate(newTeamId, {
          $addToSet: { roster: currentPlayer._id }
        });
      }
    }

    // Update the player
    const player = await Player.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    ).populate('teamId', 'name slug logo');
    
    res.json({
      message: 'Player updated successfully',
      player
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findOneAndDelete({ slug: req.params.slug });
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Remove player from team's roster
    if (player.teamId) {
      await Team.findByIdAndUpdate(player.teamId, {
        $pull: { roster: player._id }
      });
    }
    
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
