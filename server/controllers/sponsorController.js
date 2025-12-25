import Sponsor from '../models/Sponsor.js';

export const getAllSponsors = async (req, res) => {
  try {
    const { tier, active } = req.query;
    const filter = {};
    
    if (tier) {
      filter.tier = tier;
    }
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }

    const sponsors = await Sponsor.find(filter).sort({ tier: 1, name: 1 });
    res.json(sponsors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSponsorById = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    
    if (!sponsor) {
      return res.status(404).json({ error: 'Sponsor not found' });
    }
    
    res.json(sponsor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSponsor = async (req, res) => {
  try {
    const sponsor = new Sponsor(req.body);
    await sponsor.save();
    res.status(201).json({
      message: 'Sponsor created successfully',
      sponsor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!sponsor) {
      return res.status(404).json({ error: 'Sponsor not found' });
    }
    
    res.json({
      message: 'Sponsor updated successfully',
      sponsor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndDelete(req.params.id);
    
    if (!sponsor) {
      return res.status(404).json({ error: 'Sponsor not found' });
    }
    
    res.json({ message: 'Sponsor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
