import Management from '../models/Management.js';

export const getAllManagement = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = {};
    
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }

    const management = await Management.find(filter).sort({ order: 1, name: 1 });
    res.json(management);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getManagementById = async (req, res) => {
  try {
    const member = await Management.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({ error: 'Management member not found' });
    }
    
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createManagement = async (req, res) => {
  try {
    const member = new Management(req.body);
    await member.save();
    res.status(201).json({
      message: 'Management member created successfully',
      member
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateManagement = async (req, res) => {
  try {
    const member = await Management.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!member) {
      return res.status(404).json({ error: 'Management member not found' });
    }
    
    res.json({
      message: 'Management member updated successfully',
      member
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteManagement = async (req, res) => {
  try {
    const member = await Management.findByIdAndDelete(req.params.id);
    
    if (!member) {
      return res.status(404).json({ error: 'Management member not found' });
    }
    
    res.json({ message: 'Management member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
