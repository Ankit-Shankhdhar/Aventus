import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import {Plus, Edit2, Trash2, X} from 'lucide-react';
import styles from '../../styles/AdminManagement.module.css';
const Management = () => {
    const [members, setMembers] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingMember, setEditingMember] = React.useState(null);
    const [form, setForm] = React.useState({
        name: '',
        role: '',
        photo: '',
        bio: '',
        order: 1,
        twitter: '',
        linkedin: '',
        isActive: true,
    });

    const handleAddClick = () => {
        setEditingMember(null);
        setForm({
            name: '',
            role: '',
            photo: '',
            bio: '',
            order: 1,
            twitter: '',
            linkedin: '',
            isActive: true,
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (member) => {
        setEditingMember(member);
        setForm({
            name: member.name || '',
            role: member.role || '',
            photo: member.photo || '',
            bio: member.bio || '',
            order: member.order || 1,
            twitter: member.socialLinks?.twitter || '',
            linkedin: member.socialLinks?.linkedin || '',
            isActive: !!member.isActive,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMember(null);
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
            name: form.name,
            role: form.role,
            photo: form.photo,
            bio: form.bio,
            order: Number(form.order),
            socialLinks: {
                twitter: form.twitter,
                linkedin: form.linkedin,
            },
            isActive: form.isActive,
        };

        if (editingMember) {
            // Update existing member
            fetch(`http://localhost:5000/api/management/${editingMember._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Member updated:', data);
                    if (data.member) {
                        setMembers((prev) =>
                            prev.map((m) => (m._id === editingMember._id ? data.member : m))
                        );
                    }
                })
                .catch(error => console.error('Error updating member:', error));
        } else {
            // Create new member
            fetch('http://localhost:5000/api/management', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Member created:', data);
                    if (data.member) {
                        setMembers((prev) => [...prev, data.member]);
                    }
                })
                .catch(error => console.error('Error creating member:', error));
        }
        handleCloseModal();
    };

    const handleDelete = (member) => {
        if (!window.confirm(`Are you sure you want to delete "${member.name}"?`)) {
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/management/${member._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log('Member deleted:', data);
                setMembers((prev) => prev.filter((m) => m._id !== member._id));
            })
            .catch(error => console.error('Error deleting member:', error));
        }

    React.useEffect(() => {
        fetch('http://localhost:5000/api/management').then(res => res.json()).then(data => setMembers(data));
    }, []);

  return (
    <AdminLayout>
        <div className={styles.page}>
            <div className={styles.pageBar}>
                <span>Management</span>
            </div>

            <header className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>Management Team</h1>
                </div>

                <button className={styles.addButton} type="button" onClick={handleAddClick}>
                    <Plus size={16} />
                    <span>Add Member</span>
                </button>
            </header>

            <section className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Role</th>
                            <th className={styles.th}>Order</th>
                            <th className={styles.th}>Status</th>
                            <th className={`${styles.th} ${styles.thActions}`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member._id} className={styles.row}>
                            <td className={styles.td}>{member.name}</td>
                            <td className={styles.td}>{member.role}</td>
                            <td className={styles.td}>{member.order}</td>
                            <td className={styles.td}>
                                <span className={styles.statusBadge}>{member.isActive ? "Active" : "Inactive"}</span>
                            </td>
                            <td className={`${styles.td} ${styles.tdActions}`}>
                                <button className={styles.iconButton} type="button" onClick={() => handleEditClick(member)}>
                                <Edit2 size={16} />
                                </button>
                                <button
                                className={`${styles.iconButton} ${styles.iconDanger}`}
                                type="button"
                                onClick={() => handleDelete(member)}>
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
                    <h2 className={styles.modalTitle}>{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
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
                        <label className={styles.modalLabel}>Role</label>
                        <input
                            name="role"
                            className={styles.modalInput}
                            value={form.role}
                            onChange={handleFormChange}
                            placeholder="CEO & Founder"
                            required
                        />
                    </div>

                    <div className={styles.modalField}>
                        <label className={styles.modalLabel}>Photo URL</label>
                        <input
                            name="photo"
                            className={styles.modalInput}
                            value={form.photo}
                            onChange={handleFormChange}
                            placeholder="/uploads/team/member.jpg"
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
                            placeholder="Short biography about the team member"
                        />
                    </div>

                    <div className={styles.modalField}>
                        <label className={styles.modalLabel}>Display Order</label>
                        <input
                            name="order"
                            type="number"
                            className={styles.modalInput}
                            value={form.order}
                            onChange={handleFormChange}
                            min="1"
                        />
                    </div>

                    <div className={styles.modalField}>
                        <label className={styles.modalLabel}>Twitter URL</label>
                        <input
                            name="twitter"
                            className={styles.modalInput}
                            value={form.twitter}
                            onChange={handleFormChange}
                            placeholder="https://twitter.com/username"
                        />
                    </div>

                    <div className={styles.modalField}>
                        <label className={styles.modalLabel}>LinkedIn URL</label>
                        <input
                            name="linkedin"
                            className={styles.modalInput}
                            value={form.linkedin}
                            onChange={handleFormChange}
                            placeholder="https://linkedin.com/in/username"
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
                            {editingMember ? 'Update' : 'Create'}
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

export default Management
