import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import {Plus, Edit2, Trash2, X} from 'lucide-react';
import styles from '../../styles/AdminSponsors.module.css';
const Sponsors = () => {
    const [sponsors, setSponsors] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingSponsor, setEditingSponsor] = React.useState(null);
    const [form, setForm] = React.useState({
        name: '',
        logo: '',
        url: '',
        tier: 'partner',
        isActive: true,
    });

    const handleAddClick = () => {
        setEditingSponsor(null);
        setForm({
            name: '',
            logo: '',
            url: '',
            tier: 'partner',
            isActive: true,
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (sponsor) => {
        setEditingSponsor(sponsor);
        setForm({
            name: sponsor.name || '',
            logo: sponsor.logo || '',
            url: sponsor.url || '',
            tier: sponsor.tier || 'partner',
            isActive: !!sponsor.isActive,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSponsor(null);
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

        if (editingSponsor) {
            // Update existing sponsor
            fetch(`http://localhost:5000/api/sponsors/${editingSponsor._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Sponsor updated:', data);
                    if (data.sponsor) {
                        setSponsors((prev) =>
                            prev.map((s) => (s._id === editingSponsor._id ? data.sponsor : s))
                        );
                    }
                })
                .catch(error => console.error('Error updating sponsor:', error));
        } else {
            // Create new sponsor
            fetch('http://localhost:5000/api/sponsors', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Sponsor created:', data);
                    if (data.sponsor) {
                        setSponsors((prev) => [...prev, data.sponsor]);
                    }
                })
                .catch(error => console.error('Error creating sponsor:', error));
        }
        handleCloseModal();
    };

    const handleDelete = (sponsor) => {
        if (!window.confirm(`Are you sure you want to delete sponsor "${sponsor.name}"?`)) {
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/sponsors/${sponsor._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log('Sponsor deleted:', data);
                setSponsors((prev) => prev.filter((s) => s._id !== sponsor._id));
            })
            .catch(error => console.error('Error deleting sponsor:', error));
        }

    React.useEffect(() => {
        fetch('http://localhost:5000/api/sponsors').then(res => res.json()).then(data => setSponsors(data));
    }, []);

  return (
    <AdminLayout>
        <div className={styles.page}>
            <div className={styles.pageBar}>
                <span>Sponsors</span>
            </div>

            <header className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>Sponsors Management</h1>
                </div>

                <button className={styles.addButton} type="button" onClick={handleAddClick}>
                    <Plus size={16} />
                    <span>Add Sponsor</span>
                </button>
            </header>

            <section className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Tier</th>
                            <th className={styles.th}>URL</th>
                            <th className={styles.th}>Status</th>
                            <th className={`${styles.th} ${styles.thActions}`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sponsors.map((sponsor) => (
                            <tr key={sponsor._id} className={styles.row}>
                            <td className={styles.td}>{sponsor.name}</td>
                            <td className={styles.td}>
                                <span style={{ textTransform: 'capitalize' }}>{sponsor.tier}</span>
                            </td>
                            <td className={styles.td}>{sponsor.url}</td>
                            <td className={styles.td}>
                                <span className={styles.statusBadge}>{sponsor.isActive ? "Active" : "Inactive"}</span>
                            </td>
                            <td className={`${styles.td} ${styles.tdActions}`}>
                                <button className={styles.iconButton} type="button" onClick={() => handleEditClick(sponsor)}>
                                <Edit2 size={16} />
                                </button>
                                <button
                                className={`${styles.iconButton} ${styles.iconDanger}`}
                                type="button"
                                onClick={() => handleDelete(sponsor)}>
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
                    <h2 className={styles.modalTitle}>{editingSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}</h2>
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
                        <label className={styles.modalLabel}>Name</label>
                        <input
                            name="name"
                            className={styles.modalInput}
                            value={form.name}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className={styles.modalField}>
                        <label className={styles.modalLabel}>Logo URL</label>
                        <input
                            name="logo"
                            className={styles.modalInput}
                            value={form.logo}
                            onChange={handleFormChange}
                            placeholder="/uploads/logos/sponsor.png"
                        />
                    </div>

                    <div className={styles.modalField}>
                        <label className={styles.modalLabel}>Website URL</label>
                        <input
                            name="url"
                            type="url"
                            className={styles.modalInput}
                            value={form.url}
                            onChange={handleFormChange}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className={styles.modalField}>
                        <label className={styles.modalLabel}>Tier</label>
                        <select
                            name="tier"
                            className={styles.modalInput}
                            value={form.tier}
                            onChange={handleFormChange}
                        >
                            <option value="main">Main</option>
                            <option value="partner">Partner</option>
                        </select>
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
                            {editingSponsor ? 'Update' : 'Create'}
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

export default Sponsors
