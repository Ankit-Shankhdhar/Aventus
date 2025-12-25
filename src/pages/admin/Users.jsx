import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import {Plus, Edit2, Trash2, X} from 'lucide-react';
import styles from '../../styles/AdminUsers.module.css';
const Users = () => {
    const [users, setUsers] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState(null);
    const token = localStorage.getItem('token');
    const [form, setForm] = React.useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        isActive: true,
    });

    const handleAddClick = () => {
        setEditingUser(null);
        setForm({
            name: '',
            email: '',
            password: '',
            role: 'user',
            isActive: true,
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setForm({
            name: user.name || '',
            email: user.email || '',
            password: '',
            role: user.role || 'user',
            isActive: !!user.isActive,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
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
            email: form.email,
            role: form.role,
            isActive: form.isActive,
        };

        // Only include password if it's provided
        if (form.password) {
            payload.password = form.password;
        }

        if (editingUser) {
            // Update existing user
            fetch(`http://localhost:5000/api/users/${editingUser._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('User updated:', data);
                    if (data.user) {
                        setUsers((prev) =>
                            prev.map((u) => (u._id === editingUser._id ? data.user : u))
                        );
                    }
                })
                .catch(error => console.error('Error updating user:', error));
        } else {
            // Create new user
            fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('User created:', data);
                    if (data.user) {
                        setUsers((prev) => [...prev, data.user]);
                    }
                })
                .catch(error => console.error('Error creating user:', error));
        }
        handleCloseModal();
    };

    const handleDelete = (user) => {
        if (!window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/users/${user._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log('User deleted:', data);
                setUsers((prev) => prev.filter((u) => u._id !== user._id));
            })
            .catch(error => console.error('Error deleting user:', error));
        }

    React.useEffect(() => {
            fetch(`http://localhost:5000/api/auth/users/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json()).then(data => setUsers(data));
    }, []);

  return (
    <AdminLayout>
        <div className={styles.page}>
            <div className={styles.pageBar}>
                <span>Users</span>
            </div>

            <header className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>Users Management</h1>
                </div>

                <button className={styles.addButton} type="button" onClick={handleAddClick}>
                    <Plus size={16} />
                    <span>Add User</span>
                </button>
            </header>

            <section className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Role</th>
                            <th className={styles.th}>Last Login</th>
                            <th className={styles.th}>Status</th>
                            <th className={`${styles.th} ${styles.thActions}`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className={styles.row}>
                            <td className={styles.td}>{user.name}</td>
                            <td className={styles.td}>{user.email}</td>
                            <td className={styles.td}>
                                <span style={{ 
                                    display: 'inline-flex',
                                    padding: '0.1rem 0.6rem',
                                    borderRadius: '999px',
                                    background: user.role === 'admin' ? '#fecaca' : user.role === 'moderator' ? '#ddd6fe' : '#e0e7ff',
                                    color: user.role === 'admin' ? '#991b1b' : user.role === 'moderator' ? '#5b21b6' : '#1e40af',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    textTransform: 'capitalize'
                                }}>{user.role}</span>
                            </td>
                            <td className={styles.td}>
                                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'}
                            </td>
                            <td className={styles.td}>
                                <span className={styles.statusBadge}>{user.isActive ? "Active" : "Inactive"}</span>
                            </td>
                            <td className={`${styles.td} ${styles.tdActions}`}>
                                <button className={styles.iconButton} type="button" onClick={() => handleEditClick(user)}>
                                <Edit2 size={16} />
                                </button>
                                <button
                                className={`${styles.iconButton} ${styles.iconDanger}`}
                                type="button"
                                onClick={() => handleDelete(user)}>
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
                    <h2 className={styles.modalTitle}>{editingUser ? 'Edit User' : 'Add New User'}</h2>
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
                        <label className={styles.modalLabel}>Email</label>
                        <input
                            name="email"
                            type="email"
                            className={styles.modalInput}
                            value={form.email}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className={styles.modalField}>
                        <label className={styles.modalLabel}>Password</label>
                        <input
                            name="password"
                            type="password"
                            className={styles.modalInput}
                            value={form.password}
                            onChange={handleFormChange}
                            placeholder="Minimum 6 characters"
                            minLength={6}
                            required={!editingUser}
                        />
                    </div>

                    <div className={styles.modalField}>
                        <label className={styles.modalLabel}>Role</label>
                        <select
                            name="role"
                            className={styles.modalInput}
                            value={form.role}
                            onChange={handleFormChange}
                        >
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
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
                            {editingUser ? 'Update' : 'Create'}
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

export default Users
