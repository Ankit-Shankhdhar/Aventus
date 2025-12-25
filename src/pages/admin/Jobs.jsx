import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import {Plus, Edit2, Trash2, X} from 'lucide-react';
import styles from '../../styles/AdminJobs.module.css';
const Jobs = () => {
    const [jobs, setJobs] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingJob, setEditingJob] = React.useState(null);
    const [form, setForm] = React.useState({
        title: '',
        slug: '',
        type: 'player',
        department: '',
        location: '',
        isRemote: false,
        description: '',
        requirements: '',
        responsibilities: '',
        postedAt: '',
        isActive: true,
    });

    const handleAddClick = () => {
        setEditingJob(null);
        setForm({
            title: '',
            slug: '',
            type: 'player',
            department: '',
            location: '',
            isRemote: false,
            description: '',
            requirements: '',
            responsibilities: '',
            postedAt: '',
            isActive: true,
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (job) => {
        setEditingJob(job);
        setForm({
            title: job.title || '',
            slug: job.slug || '',
            type: job.type || 'player',
            department: job.department || '',
            location: job.location || '',
            isRemote: !!job.isRemote,
            description: job.description || '',
            requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : '',
            responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : '',
            postedAt: job.postedAt ? job.postedAt.split('T')[0] : '',
            isActive: !!job.isActive,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingJob(null);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const jobData = {
            ...form,
            requirements: form.requirements ? form.requirements.split('\n').filter(r => r.trim()) : [],
            responsibilities: form.responsibilities ? form.responsibilities.split('\n').filter(r => r.trim()) : []
        };

        if (editingJob) {
            // Update existing job
            fetch(`http://localhost:5000/api/jobs/${editingJob.slug}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Job updated:', data);
                    if (data.job) {
                        setJobs((prev) =>
                            prev.map((j) => (j._id === editingJob._id ? data.job : j))
                        );
                    }
                })
                .catch(error => console.error('Error updating job:', error));
        } else {
            // Create new job
            fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Job created:', data);
                    if (data.job) {
                        setJobs((prev) => [...prev, data.job]);
                    }
                })
                .catch(error => console.error('Error creating job:', error));
        }
        handleCloseModal();
    };

    const handleDelete = (job) => {
        if (!window.confirm(`Are you sure you want to delete job "${job.title}"?`)) {
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/jobs/${job.slug}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log('Job deleted:', data);
                setJobs((prev) => prev.filter((j) => j._id !== job._id));
            })
            .catch(error => console.error('Error deleting job:', error));
    }

    React.useEffect(() => {
        fetch('http://localhost:5000/api/jobs').then(res => res.json()).then(data => setJobs(data));
    }, []);

return (
    <AdminLayout>
            <div className={styles.page}>
                    <div className={styles.pageBar}>
                            <span>Jobs</span>
                    </div>

                    <header className={styles.headerRow}>
                            <div>
                                    <h1 className={styles.title}>Jobs Management</h1>
                            </div>

                            <button className={styles.addButton} type="button" onClick={handleAddClick}>
                                    <Plus size={16} />
                                    <span>Add Job</span>
                            </button>
                    </header>

                    <section className={styles.tableCard}>
                            <table className={styles.table}>
                                    <thead>
                                            <tr>
                                                    <th className={styles.th}>Title</th>
                                                    <th className={styles.th}>Type</th>
                                                    <th className={styles.th}>Department</th>
                                                    <th className={styles.th}>Location</th>
                                                    <th className={styles.th}>Status</th>
                                                    <th className={`${styles.th} ${styles.thActions}`}>Actions</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                            {jobs.map((job) => (
                                                    <tr key={job._id} className={styles.row}>
                                                    <td className={styles.td}>{job.title}</td>
                                                    <td className={styles.td}>{job.type}</td>
                                                    <td className={styles.td}>{job.department}</td>
                                                    <td className={styles.td}>{job.location} {job.isRemote && '(Remote)'}</td>
                                                    <td className={styles.td}>
                                                            <span className={styles.statusBadge}>{(job.isActive) ? "Active" : "Inactive"}</span>
                                                    </td>
                                                    <td className={`${styles.td} ${styles.tdActions}`}>
                                                            <button className={styles.iconButton} type="button" onClick={() => handleEditClick(job)}>
                                                            <Edit2 size={16} />
                                                            </button>
                                                            <button
                                                            className={`${styles.iconButton} ${styles.iconDanger}`}
                                                            type="button"
                                                            onClick={() => handleDelete(job)}>
                                                            <Trash2 size={16} />
                                                            </button>
                                                    </td>
                                                    </tr>
                                            ))}
                                    </tbody>
                            </table>
                    </section>

                    {isModalOpen && (
                    <div className={styles.modalOverlay}>
                            <div className={styles.modal}>
                            <div className={styles.modalHeader}>
                                    <h2 className={styles.modalTitle}>{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
                                    <button
                                    type="button"
                                    className={styles.modalClose}
                                    onClick={handleCloseModal}
                                    >
                                    <X size={18} />
                                    </button>
                            </div>

                            <form className={styles.modalForm} onSubmit={handleSubmit}>
                                    <div className={styles.modalField}>
                                    <label className={styles.modalLabel}>Title</label>
                                    <input
                                            name="title"
                                            className={styles.modalInput}
                                            value={form.title}
                                            onChange={handleFormChange}
                                            required
                                    />
                                    </div>

                                    <div className={styles.modalField}>
                                    <label className={styles.modalLabel}>Slug</label>
                                    <input
                                            name="slug"
                                            className={styles.modalInput}
                                            value={form.slug}
                                            onChange={handleFormChange}
                                            required
                                    />
                                    </div>

                                    <div className={styles.modalField}>
                                    <label className={styles.modalLabel}>Type</label>
                                    <select
                                            name="type"
                                            className={styles.modalInput}
                                            value={form.type}
                                            onChange={handleFormChange}
                                            required
                                    >
                                            <option value="staff">Staff</option>
                                            <option value="player">Player</option>
                                            <option value="creator">Creator</option>
                                            <option value="freelance">Freelance</option>
                                    </select>
                                    </div>

                                    <div className={styles.modalField}>
                                    <label className={styles.modalLabel}>Department</label>
                                    <input
                                            name="department"
                                            className={styles.modalInput}
                                            value={form.department}
                                            onChange={handleFormChange}
                                            required
                                    />
                                    </div>

                                    <div className={styles.modalField}>
                                    <label className={styles.modalLabel}>Location</label>
                                    <input
                                            name="location"
                                            className={styles.modalInput}
                                            value={form.location}
                                            onChange={handleFormChange}
                                            required
                                    />
                                    </div>

                                    <label className={styles.checkboxRow}>
                                    <input
                                            type="checkbox"
                                            name="isRemote"
                                            checked={form.isRemote}
                                            onChange={handleFormChange}
                                    />
                                    <span>Remote Position</span>
                                    </label>

                                    <div className={styles.modalField}>
                                    <label className={styles.modalLabel}>Description</label>
                                    <textarea
                                            name="description"
                                            className={styles.modalTextarea}
                                            rows={3}
                                            value={form.description}
                                            onChange={handleFormChange}
                                            required
                                    />
                                    </div>

                                    <div className={styles.modalField}>
                                    <label className={styles.modalLabel}>Requirements (one per line)</label>
                                    <textarea
                                            name="requirements"
                                            className={styles.modalTextarea}
                                            rows={4}
                                            value={form.requirements}
                                            onChange={handleFormChange}
                                            placeholder="Immortal+ rank&#10;Tournament experience&#10;Team player mentality"
                                    />
                                    </div>

                                    <div className={styles.modalField}>
                                    <label className={styles.modalLabel}>Responsibilities (one per line)</label>
                                    <textarea
                                            name="responsibilities"
                                            className={styles.modalTextarea}
                                            rows={4}
                                            value={form.responsibilities}
                                            onChange={handleFormChange}
                                            placeholder="Compete in tournaments&#10;Practice with team&#10;Represent the organization"
                                    />
                                    </div>

                                    <div className={styles.modalField}>
                                    <label className={styles.modalLabel}>Posted Date</label>
                                    <input
                                            type="date"
                                            name="postedAt"
                                            className={styles.modalInput}
                                            value={form.postedAt}
                                            onChange={handleFormChange}
                                    />
                                    </div>

                                    <label className={styles.checkboxRow}>
                                    <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={form.isActive}
                                            onChange={handleFormChange}
                                    />
                                    <span>Active</span>
                                    </label>

                                    <div className={styles.modalFooter}>
                                    <button
                                            type="button"
                                            className={styles.modalCancel}
                                            onClick={handleCloseModal}
                                    >
                                            Cancel
                                    </button>
                                    <button type="submit" className={styles.modalUpdate}>
                                            {editingJob ? 'Update' : 'Create'}
                                    </button>
                                    </div>
                            </form>
                            </div>
                    </div>
                    )}
            </div>
    </AdminLayout>
)
}

export default Jobs
