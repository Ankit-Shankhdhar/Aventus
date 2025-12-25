import Job from '../models/Job.js';

export const getAllJobs = async (req, res) => {
  try {
    const { type, department, remote, active } = req.query;
    const filter = {};
    
    if (type) {
      filter.type = type;
    }
    if (department) {
      filter.department = department;
    }
    if (remote !== undefined) {
      filter.isRemote = remote === 'true';
    }
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }

    const jobs = await Job.find(filter).sort({ postedAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getJobBySlug = async (req, res) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug });
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({
      message: 'Job posting created successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({
      message: 'Job posting updated successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ slug: req.params.slug });
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({ message: 'Job posting deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getJobTypes = async (req, res) => {
  try {
    const types = await Job.distinct('type');
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getJobDepartments = async (req, res) => {
  try {
    const departments = await Job.distinct('department');
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
