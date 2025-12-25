import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import {Plus, Edit2, Trash2, X} from 'lucide-react';
import styles from '../../styles/AdminTeams.module.css';
const Teams = () => {
    const [teams, setTeams] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingTeam, setEditingTeam] = React.useState(null);
    const [form, setForm] = React.useState({
        name: '',
        slug: '',
        game: '',
        gameCategory: '',
        logoUrl: '',
        description: '',
        achievements: '',
        isActive: true,
    });

    const handleAddClick = () => {
        setEditingTeam(null);
        setForm({
            name: '',
            slug: '',
            game: '',
            gameCategory: '',
            logoUrl: '',
            description: '',
            achievements: '',
            isActive: true,
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (team) => {
        setEditingTeam(team);
        setForm({
        name: team.name || '',
        slug: team.slug || '',
        game: team.game || '',
        gameCategory: team.gameCategory || '',
        logoUrl: team.logoUrl || '',
        description: team.description || '',
        achievements: team.achievements || '',
        isActive: !!team.isActive,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTeam(null);
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

        if (editingTeam) {
            // Update existing team
            const updated = { ...editingTeam, ...form };
            setTeams((prev) =>
            prev.map((t) => (t.id === editingTeam.id ? updated : t))
            );
            console.log('Updating team:', updated);
            
            fetch(`http://localhost:5000/api/teams/${editingTeam.slug}`, {
                method: 'PUT',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
                .then(async res => console.log( await res.json()))
                .then(data => {
                if (data.team) {
                    setTeams((prev) =>
                    prev.map((t) => (t.id === editingTeam.id ? data.team : t))
                    );
                }
                })
                .catch(error => console.error('Error updating team:', error));
        } else {
            // Create new team
            console.log('Creating team:', form);
            
            fetch('http://localhost:5000/api/teams', {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
                .then(async res => console.log(await res.json()))
                .then(data => {
                    console.log('Team created:', data);
                    if (data.team) {
                        setTeams((prev) => [...prev, data.team]);
                    }
                })
                .catch(error => console.error('Error creating team:', error));
        }
        handleCloseModal();
    };

    const handleDelete = (team) => {
        if (!window.confirm(`Are you sure you want to delete team "${team.name}"?`)) {
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/teams/${team.slug}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log('Team deleted:', data);
                setTeams((prev) => prev.filter((t) => t.id !== team.id));
            })
            .catch(error => console.error('Error deleting team:', error));
        }

    React.useEffect(() => {
        fetch('http://localhost:5000/api/teams').then(res => res.json()).then(data => setTeams(data));
    }, [teams]);

  return (
    <AdminLayout>
        <div className={styles.page}>
            <div className={styles.pageBar}>
                <span>Teams</span>
            </div>

            <header className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>Teams Management</h1>
                </div>

                <button className={styles.addButton} type="button" onClick={handleAddClick}>
                    <Plus size={16} />
                    <span>Add Team</span>
                </button>
            </header>

            <section className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Game</th>
                            <th className={styles.th}>Status</th>
                            <th className={`${styles.th} ${styles.thActions}`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.id} className={styles.row}>
                            <td className={styles.td}>{team.name}</td>
                            <td className={styles.td}>{team.game}</td>
                            <td className={styles.td}>
                                <span className={styles.statusBadge}>{(team.isActive) ? "Active" : "Inactive"}</span>
                            </td>
                            <td className={`${styles.td} ${styles.tdActions}`}>
                                <button className={styles.iconButton} type="button" onClick={() => handleEditClick(team)}>
                                <Edit2 size={16} />
                                </button>
                                <button
                                className={`${styles.iconButton} ${styles.iconDanger}`}
                                type="button"
                                onClick={() => handleDelete(team)}>
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
                    <h2 className={styles.modalTitle}>{editingTeam ? 'Edit Team' : 'Add New Team'}</h2>
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
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Slug</label>
                    <input
                        name="slug"
                        className={styles.modalInput}
                        value={form.slug}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Game</label>
                    <input
                        name="game"
                        className={styles.modalInput}
                        value={form.game}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Game Category</label>
                    <input
                        name="gameCategory"
                        className={styles.modalInput}
                        value={form.gameCategory}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Logo URL</label>
                    <input
                        name="logoUrl"
                        className={styles.modalInput}
                        value={form.logoUrl}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Description</label>
                    <textarea
                        name="description"
                        className={styles.modalTextarea}
                        rows={3}
                        value={form.description}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>
                        Achievements (comma-separated)
                    </label>
                    <textarea
                        name="achievements"
                        className={styles.modalTextarea}
                        rows={2}
                        value={form.achievements}
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
                        {editingTeam ? 'Update' : 'Create'}
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

export default Teams
