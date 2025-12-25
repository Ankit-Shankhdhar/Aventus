import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import {Plus, Edit2, Trash2, X} from 'lucide-react';
import styles from '../../styles/AdminTeams.module.css';
const Matches = () => {
    const [matches, setMatches] = React.useState([]);
    const [teams, setTeams] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingMatch, setEditingMatch] = React.useState(null);
    const [form, setForm] = React.useState({
        slug: '',
        teamId: '',
        opponent: '',
        opponentLogo: '',
        date: '',
        tournament: '',
        result: 'scheduled',
        score: '',
        highlights: '',
    });

    const handleAddClick = () => {
        setEditingMatch(null);
        setForm({
            slug: '',
            teamId: '',
            opponent: '',
            opponentLogo: '',
            date: '',
            tournament: '',
            result: 'scheduled',
            score: '',
            highlights: '',
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (match) => {
        setEditingMatch(match);
        setForm({
            slug: match.slug || '',
            teamId: match.teamId?._id || match.teamId || '',
            opponent: match.opponent || '',
            opponentLogo: match.opponentLogo || '',
            date: match.date ? match.date.split('T')[0] : '',
            tournament: match.tournament || '',
            result: match.result || 'scheduled',
            score: match.score || '',
            highlights: Array.isArray(match.highlights) ? match.highlights.join(', ') : '',
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMatch(null);
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

        const payload = {
            ...form,
            highlights: form.highlights ? form.highlights.split(',').map(h => h.trim()) : []
        };

        if (editingMatch) {
            // Update existing match
            fetch(`http://localhost:5000/api/matches/${editingMatch.slug}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(async res => await res.json())
                .then(data => {
                    console.log('Match updated:', data);
                    if (data.match) {
                        setMatches((prev) =>
                            prev.map((m) => (m._id === editingMatch._id ? data.match : m))
                        );
                    }
                })
                .catch(error => console.error('Error updating match:', error));
        } else {
            // Create new match
            fetch('http://localhost:5000/api/matches', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(async res => await res.json())
                .then(data => {
                    console.log('Match created:', data);
                    if (data.match) {
                        setMatches((prev) => [...prev, data.match]);
                    }
                })
                .catch(error => console.error('Error creating match:', error));
        }
        handleCloseModal();
    };

    const handleDelete = (match) => {
        if (!window.confirm(`Are you sure you want to delete match "${match.slug}"?`)) {
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/matches/${match.slug}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log('Match deleted:', data);
                setMatches((prev) => prev.filter((m) => m._id !== match._id));
            })
            .catch(error => console.error('Error deleting match:', error));
        }

    React.useEffect(() => {
        fetch('http://localhost:5000/api/matches').then(res => res.json()).then(data => setMatches(data));
        fetch('http://localhost:5000/api/teams').then(res => res.json()).then(data => setTeams(data));
    }, []);

  return (
    <AdminLayout>
        <div className={styles.page}>
            <div className={styles.pageBar}>
                <span>Matches</span>
            </div>

            <header className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>Matches Management</h1>
                </div>

                <button className={styles.addButton} type="button" onClick={handleAddClick}>
                    <Plus size={16} />
                    <span>Add Match</span>
                </button>
            </header>

            <section className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Teams</th>
                            <th className={styles.th}>Tournament</th>
                            <th className={styles.th}>Date</th>
                            <th className={styles.th}>Result</th>
                            <th className={`${styles.th} ${styles.thActions}`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match) => (
                            <tr key={match._id} className={styles.row}>
                            <td className={styles.td}>{match.teamId?.name || 'N/A'} vs {match.opponent}</td>
                            <td className={styles.td}>{match.tournament}</td>
                            <td className={styles.td}>{new Date(match.date).toLocaleDateString()}</td>
                            <td className={styles.td}>
                                <span className={styles.statusBadge}>{match.result} {match.score && `(${match.score})`}</span>
                            </td>
                            <td className={`${styles.td} ${styles.tdActions}`}>
                                <button className={styles.iconButton} type="button" onClick={() => handleEditClick(match)}>
                                <Edit2 size={16} />
                                </button>
                                <button
                                className={`${styles.iconButton} ${styles.iconDanger}`}
                                type="button"
                                onClick={() => handleDelete(match)}>
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
                    <h2 className={styles.modalTitle}>{editingMatch ? 'Edit Match' : 'Add New Match'}</h2>
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
                    <label className={styles.modalLabel}>Our Team</label>
                    <select
                        name="teamId"
                        className={styles.modalInput}
                        value={form.teamId}
                        onChange={handleFormChange}
                        required
                    >
                        <option value="">Select our team</option>
                        {teams.map((team) => (
                            <option key={team._id} value={team._id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Opponent Team</label>
                    <input
                        name="opponent"
                        className={styles.modalInput}
                        value={form.opponent}
                        onChange={handleFormChange}
                        placeholder="Enter opponent team name"
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
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Tournament</label>
                    <input
                        name="tournament"
                        className={styles.modalInput}
                        value={form.tournament}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Date</label>
                    <input
                        type="date"
                        name="date"
                        className={styles.modalInput}
                        value={form.date}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Result</label>
                    <select
                        name="result"
                        className={styles.modalInput}
                        value={form.result}
                        onChange={handleFormChange}
                    >
                        <option value="scheduled">Scheduled</option>
                        <option value="win">Win</option>
                        <option value="loss">Loss</option>
                        <option value="draw">Draw</option>
                    </select>
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Score</label>
                    <input
                        name="score"
                        className={styles.modalInput}
                        value={form.score}
                        onChange={handleFormChange}
                        placeholder="e.g., 13-7"
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Opponent Logo URL</label>
                    <input
                        name="opponentLogo"
                        className={styles.modalInput}
                        value={form.opponentLogo}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>
                        Highlights (comma-separated URLs)
                    </label>
                    <textarea
                        name="highlights"
                        className={styles.modalTextarea}
                        rows={2}
                        value={form.highlights}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalFooter}>
                    <button
                        type="button"
                        className={styles.modalCancel}
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                    <button type="submit" className={styles.modalUpdate}>
                        {editingMatch ? 'Update' : 'Create'}
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

export default Matches
