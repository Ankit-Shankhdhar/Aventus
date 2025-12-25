import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import {Plus, Edit2, Trash2, X} from 'lucide-react';
import styles from '../../styles/AdminPlayers.module.css';
const Players = () => {
    const [players, setPlayers] = React.useState([]);
    const [teams, setTeams] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingPlayer, setEditingPlayer] = React.useState(null);
    const [form, setForm] = React.useState({
        name: '',
        slug: '',
        role: '',
        team: '',
        country: '',
        image: '',
        bio: '',
        stats: {
            kills: 0,
            deaths: 0,
            assists: 0
        },
        socialMedia: {
            twitter: '',
            instagram: '',
            twitch: ''
        },
        isActive: true,
    });

    const handleAddClick = () => {
        setEditingPlayer(null);
        setForm({
            name: '',
            slug: '',
            role: '',
            team: '',
            country: '',
            image: '',
            bio: '',
            stats: {
                kills: 0,
                deaths: 0,
                assists: 0
            },
            socialMedia: {
                twitter: '',
                instagram: '',
                twitch: ''
            },
            isActive: true,
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (player) => {
        setEditingPlayer(player);
        setForm({
            name: player.name || '',
            slug: player.slug || '',
            role: player.role || '',
            team: player.teamId?._id || '',
            country: player.country || '',
            image: player.image || '',
            bio: player.bio || '',
            stats: {
                kills: player.stats?.kills || 0,
                deaths: player.stats?.deaths || 0,
                assists: player.stats?.assists || 0
            },
            socialMedia: {
                twitter: player.socialMedia?.twitter || '',
                instagram: player.socialMedia?.instagram || '',
                twitch: player.socialMedia?.twitch || ''
            },
            isActive: !!player.isActive,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPlayer(null);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.startsWith('stats.')) {
            const statKey = name.split('.')[1];
            setForm((prev) => ({
                ...prev,
                stats: {
                    ...prev.stats,
                    [statKey]: Number(value) || 0
                }
            }));
        } else if (name.startsWith('socialMedia.')) {
            const socialKey = name.split('.')[1];
            setForm((prev) => ({
                ...prev,
                socialMedia: {
                    ...prev.socialMedia,
                    [socialKey]: value
                }
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Prepare the data with teamId instead of team
        const playerData = {
            ...form,
            teamId: form.team,
        };
        delete playerData.team;

        if (editingPlayer) {
            // Update existing player
            const updated = { ...editingPlayer, ...playerData };
            setPlayers((prev) =>
                prev.map((p) => (p._id === editingPlayer._id ? updated : p))
            );
            console.log('Updating player:', playerData);
            
            fetch(`http://localhost:5000/api/players/${editingPlayer.slug}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playerData),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Player updated:', data);
                    if (data.player) {
                        setPlayers((prev) =>
                            prev.map((p) => (p._id === editingPlayer._id ? data.player : p))
                        );
                    }
                })
                .catch(error => console.error('Error updating player:', error));
        } else {
            // Create new player
            console.log('Creating player:', playerData);
            
            fetch('http://localhost:5000/api/players', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playerData),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Player created:', data);
                    if (data.player) {
                        setPlayers((prev) => [...prev, data.player]);
                    }
                })
                .catch(error => console.error('Error creating player:', error));
        }
        handleCloseModal();
    };

    const handleDelete = (player) => {
        if (!window.confirm(`Are you sure you want to delete player "${player.name}"?`)) {
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/players/${player.slug}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log('Player deleted:', data);
                setPlayers((prev) => prev.filter((p) => p._id !== player._id));
            })
            .catch(error => console.error('Error deleting player:', error));
    }

    React.useEffect(() => {
        fetch('http://localhost:5000/api/players').then(res => res.json()).then(data => setPlayers(data));
        fetch('http://localhost:5000/api/teams').then(res => res.json()).then(data => setTeams(data));
    }, []);

  return (
    <AdminLayout>
        <div className={styles.page}>
            <div className={styles.pageBar}>
                <span>Players</span>
            </div>

            <header className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>Players Management</h1>
                </div>

                <button className={styles.addButton} type="button" onClick={handleAddClick}>
                    <Plus size={16} />
                    <span>Add Player</span>
                </button>
            </header>

            <section className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Role</th>
                            <th className={styles.th}>Team</th>
                            <th className={styles.th}>Country</th>
                            <th className={styles.th}>Status</th>
                            <th className={`${styles.th} ${styles.thActions}`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player._id} className={styles.row}>
                            <td className={styles.td}>{player.name}</td>
                            <td className={styles.td}>{player.role}</td>
                            <td className={styles.td}>{player.teamId?.name || 'N/A'}</td>
                            <td className={styles.td}>{player.country}</td>
                            <td className={styles.td}>
                                <span className={styles.statusBadge}>{(player.isActive) ? "Active" : "Inactive"}</span>
                            </td>
                            <td className={`${styles.td} ${styles.tdActions}`}>
                                <button className={styles.iconButton} type="button" onClick={() => handleEditClick(player)}>
                                <Edit2 size={16} />
                                </button>
                                <button
                                className={`${styles.iconButton} ${styles.iconDanger}`}
                                type="button"
                                onClick={() => handleDelete(player)}>
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
                    <h2 className={styles.modalTitle}>{editingPlayer ? 'Edit Player' : 'Add New Player'}</h2>
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
                    <label className={styles.modalLabel}>Role</label>
                    <input
                        name="role"
                        className={styles.modalInput}
                        value={form.role}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Team</label>
                    <select
                        name="team"
                        className={styles.modalInput}
                        value={form.team}
                        onChange={handleFormChange}
                    >
                        <option value=''>Select team</option>
                        {teams.map((team) => (
                            <option key={team._id} value={team._id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Country</label>
                    <input
                        name="country"
                        className={styles.modalInput}
                        value={form.country}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Image URL</label>
                    <input
                        name="image"
                        className={styles.modalInput}
                        value={form.image}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Bio</label>
                    <textarea
                        name="bio"
                        className={styles.modalTextarea}
                        rows={3}
                        value={form.bio}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Stats</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                        <div>
                            <label style={{ fontSize: '12px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>Kills</label>
                            <input
                                type="number"
                                name="stats.kills"
                                className={styles.modalInput}
                                value={form.stats.kills}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '12px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>Deaths</label>
                            <input
                                type="number"
                                name="stats.deaths"
                                className={styles.modalInput}
                                value={form.stats.deaths}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '12px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>Assists</label>
                            <input
                                type="number"
                                name="stats.assists"
                                className={styles.modalInput}
                                value={form.stats.assists}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Social Media</label>
                    <input
                        name="socialMedia.twitter"
                        className={styles.modalInput}
                        placeholder="Twitter"
                        value={form.socialMedia.twitter}
                        onChange={handleFormChange}
                        style={{ marginBottom: '8px' }}
                    />
                    <input
                        name="socialMedia.instagram"
                        className={styles.modalInput}
                        placeholder="Instagram"
                        value={form.socialMedia.instagram}
                        onChange={handleFormChange}
                        style={{ marginBottom: '8px' }}
                    />
                    <input
                        name="socialMedia.twitch"
                        className={styles.modalInput}
                        placeholder="Twitch"
                        value={form.socialMedia.twitch}
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
                        {editingPlayer ? 'Update' : 'Create'}
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

export default Players
