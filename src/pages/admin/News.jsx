import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import {Plus, Edit2, Trash2, X} from 'lucide-react';
import styles from '../../styles/AdminNews.module.css';
const News = () => {
    const [news, setNews] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingNews, setEditingNews] = React.useState(null);
    const [form, setForm] = React.useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        thumbnail: '',
        featuredImage: '',
        category: '',
        author: '',
        publishedAt: '',
        tags: '',
        isPublished: true,
    });

    const handleAddClick = () => {
        setEditingNews(null);
        setForm({
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            thumbnail: '',
            featuredImage: '',
            category: '',
            author: '',
            publishedAt: '',
            tags: '',
            isPublished: true,
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (newsItem) => {
        setEditingNews(newsItem);
        setForm({
            title: newsItem.title || '',
            slug: newsItem.slug || '',
            excerpt: newsItem.excerpt || '',
            content: newsItem.content || '',
            thumbnail: newsItem.thumbnail || '',
            featuredImage: newsItem.featuredImage || '',
            category: newsItem.category || '',
            author: newsItem.author || '',
            publishedAt: newsItem.publishedAt ? newsItem.publishedAt.split('T')[0] : '',
            tags: Array.isArray(newsItem.tags) ? newsItem.tags.join(', ') : '',
            isPublished: !!newsItem.isPublished,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingNews(null);
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

        const newsData = {
            ...form,
            tags: form.tags ? form.tags.split(',').map(t => t.trim()) : []
        };

        if (editingNews) {
            // Update existing news
            fetch(`http://localhost:5000/api/news/${editingNews.slug}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newsData),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('News updated:', data);
                    if (data.news) {
                        setNews((prev) =>
                            prev.map((n) => (n._id === editingNews._id ? data.news : n))
                        );
                    }
                })
                .catch(error => console.error('Error updating news:', error));
        } else {
            // Create new news
            fetch('http://localhost:5000/api/news', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newsData),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('News created:', data);
                    if (data.news) {
                        setNews((prev) => [...prev, data.news]);
                    }
                })
                .catch(error => console.error('Error creating news:', error));
        }
        handleCloseModal();
    };

    const handleDelete = (newsItem) => {
        if (!window.confirm(`Are you sure you want to delete news "${newsItem.title}"?`)) {
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/news/${newsItem.slug}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log('News deleted:', data);
                setNews((prev) => prev.filter((n) => n._id !== newsItem._id));
            })
            .catch(error => console.error('Error deleting news:', error));
    }

    React.useEffect(() => {
        fetch('http://localhost:5000/api/news').then(res => res.json()).then(data => {
            if (data.news) {
                setNews(data.news);
            }
        });
    }, []);

  return (
    <AdminLayout>
        <div className={styles.page}>
            <div className={styles.pageBar}>
                <span>News</span>
            </div>

            <header className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>News Management</h1>
                </div>

                <button className={styles.addButton} type="button" onClick={handleAddClick}>
                    <Plus size={16} />
                    <span>Add News</span>
                </button>
            </header>

            <section className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Title</th>
                            <th className={styles.th}>Category</th>
                            <th className={styles.th}>Author</th>
                            <th className={styles.th}>Published</th>
                            <th className={styles.th}>Status</th>
                            <th className={`${styles.th} ${styles.thActions}`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map((newsItem) => (
                            <tr key={newsItem._id} className={styles.row}>
                            <td className={styles.td}>{newsItem.title}</td>
                            <td className={styles.td}>{newsItem.category}</td>
                            <td className={styles.td}>{newsItem.author}</td>
                            <td className={styles.td}>{new Date(newsItem.publishedAt).toLocaleDateString()}</td>
                            <td className={styles.td}>
                                <span className={styles.statusBadge}>{(newsItem.isPublished) ? "Published" : "Draft"}</span>
                            </td>
                            <td className={`${styles.td} ${styles.tdActions}`}>
                                <button className={styles.iconButton} type="button" onClick={() => handleEditClick(newsItem)}>
                                <Edit2 size={16} />
                                </button>
                                <button
                                className={`${styles.iconButton} ${styles.iconDanger}`}
                                type="button"
                                onClick={() => handleDelete(newsItem)}>
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
                    <h2 className={styles.modalTitle}>{editingNews ? 'Edit News' : 'Add New News'}</h2>
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
                    <label className={styles.modalLabel}>Excerpt</label>
                    <textarea
                        name="excerpt"
                        className={styles.modalTextarea}
                        rows={2}
                        value={form.excerpt}
                        onChange={handleFormChange}
                        required
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Content</label>
                    <textarea
                        name="content"
                        className={styles.modalTextarea}
                        rows={5}
                        value={form.content}
                        onChange={handleFormChange}
                        required
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Thumbnail URL</label>
                    <input
                        name="thumbnail"
                        className={styles.modalInput}
                        value={form.thumbnail}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Featured Image URL</label>
                    <input
                        name="featuredImage"
                        className={styles.modalInput}
                        value={form.featuredImage}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Category</label>
                    <input
                        name="category"
                        className={styles.modalInput}
                        value={form.category}
                        onChange={handleFormChange}
                        required
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Author</label>
                    <input
                        name="author"
                        className={styles.modalInput}
                        value={form.author}
                        onChange={handleFormChange}
                        required
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Published Date</label>
                    <input
                        type="date"
                        name="publishedAt"
                        className={styles.modalInput}
                        value={form.publishedAt}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Tags (comma-separated)</label>
                    <input
                        name="tags"
                        className={styles.modalInput}
                        value={form.tags}
                        onChange={handleFormChange}
                        placeholder="e.g., VALORANT, VCT, Championship"
                    />
                    </div>

                    <label className={styles.checkboxRow}>
                    <input
                        type="checkbox"
                        name="isPublished"
                        checked={form.isPublished}
                        onChange={handleFormChange}
                    />
                    <span>Published</span>
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
                        {editingNews ? 'Update' : 'Create'}
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

export default News;