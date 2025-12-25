import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import {Plus, Edit2, Trash2, X} from 'lucide-react';
import styles from '../../styles/AdminProducts.module.css';
const Products = () => {
    const [products, setProducts] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState(null);
    const [form, setForm] = React.useState({
        name: '',
        slug: '',
        price: 0,
        image: '',
        images: '',
        category: '',
        description: '',
        inStock: true,
        stock: 0,
        sizes: '',
        colors: '',
        featured: false,
    });

    const handleAddClick = () => {
        setEditingProduct(null);
        setForm({
            name: '',
            slug: '',
            price: 0,
            image: '',
            images: '',
            category: '',
            description: '',
            inStock: true,
            stock: 0,
            sizes: '',
            colors: '',
            featured: false,
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setForm({
            name: product.name || '',
            slug: product.slug || '',
            price: product.price || 0,
            image: product.image || '',
            images: Array.isArray(product.images) ? product.images.join(', ') : '',
            category: product.category || '',
            description: product.description || '',
            inStock: !!product.inStock,
            stock: product.stock || 0,
            sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
            colors: Array.isArray(product.colors) ? product.colors.join(', ') : '',
            featured: !!product.featured,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const productData = {
            ...form,
            images: form.images ? form.images.split(',').map(i => i.trim()).filter(i => i) : [],
            sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()).filter(s => s) : [],
            colors: form.colors ? form.colors.split(',').map(c => c.trim()).filter(c => c) : []
        };

        if (editingProduct) {
            // Update existing product
            fetch(`http://localhost:5000/api/products/${editingProduct.slug}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Product updated:', data);
                    if (data.product) {
                        setProducts((prev) =>
                            prev.map((p) => (p._id === editingProduct._id ? data.product : p))
                        );
                    }
                })
                .catch(error => console.error('Error updating product:', error));
        } else {
            // Create new product
            fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Product created:', data);
                    if (data.product) {
                        setProducts((prev) => [...prev, data.product]);
                    }
                })
                .catch(error => console.error('Error creating product:', error));
        }
        handleCloseModal();
    };

    const handleDelete = (product) => {
        if (!window.confirm(`Are you sure you want to delete product "${product.name}"?`)) {
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/products/${product.slug}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log('Product deleted:', data);
                setProducts((prev) => prev.filter((p) => p._id !== product._id));
            })
            .catch(error => console.error('Error deleting product:', error));
    }

    React.useEffect(() => {
        fetch('http://localhost:5000/api/products').then(res => res.json()).then(data => {
            if (data.products) {
                setProducts(data.products);
            }
        });
    }, []);

  return (
    <AdminLayout>
        <div className={styles.page}>
            <div className={styles.pageBar}>
                <span>Products</span>
            </div>

            <header className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>Products Management</h1>
                </div>

                <button className={styles.addButton} type="button" onClick={handleAddClick}>
                    <Plus size={16} />
                    <span>Add Product</span>
                </button>
            </header>

            <section className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Category</th>
                            <th className={styles.th}>Price</th>
                            <th className={styles.th}>Stock</th>
                            <th className={styles.th}>Status</th>
                            <th className={`${styles.th} ${styles.thActions}`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className={styles.row}>
                            <td className={styles.td}>{product.name}</td>
                            <td className={styles.td}>{product.category}</td>
                            <td className={styles.td}>${product.price.toFixed(2)}</td>
                            <td className={styles.td}>{product.stock}</td>
                            <td className={styles.td}>
                                <span className={styles.statusBadge}>{(product.inStock) ? "In Stock" : "Out of Stock"}</span>
                            </td>
                            <td className={`${styles.td} ${styles.tdActions}`}>
                                <button className={styles.iconButton} type="button" onClick={() => handleEditClick(product)}>
                                <Edit2 size={16} />
                                </button>
                                <button
                                className={`${styles.iconButton} ${styles.iconDanger}`}
                                type="button"
                                onClick={() => handleDelete(product)}>
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
                    <h2 className={styles.modalTitle}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
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
                    <label className={styles.modalLabel}>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        className={styles.modalInput}
                        value={form.price}
                        onChange={handleFormChange}
                        required
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Category</label>
                    <input
                        name="category"
                        className={styles.modalInput}
                        value={form.category}
                        onChange={handleFormChange}
                        placeholder="e.g., Apparel, Gear"
                        required
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Main Image URL</label>
                    <input
                        name="image"
                        className={styles.modalInput}
                        value={form.image}
                        onChange={handleFormChange}
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Additional Images (comma-separated URLs)</label>
                    <input
                        name="images"
                        className={styles.modalInput}
                        value={form.images}
                        onChange={handleFormChange}
                        placeholder="url1, url2, url3"
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
                        required
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Stock Quantity</label>
                    <input
                        type="number"
                        name="stock"
                        className={styles.modalInput}
                        value={form.stock}
                        onChange={handleFormChange}
                        required
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Sizes (comma-separated)</label>
                    <input
                        name="sizes"
                        className={styles.modalInput}
                        value={form.sizes}
                        onChange={handleFormChange}
                        placeholder="S, M, L, XL, XXL"
                    />
                    </div>

                    <div className={styles.modalField}>
                    <label className={styles.modalLabel}>Colors (comma-separated)</label>
                    <input
                        name="colors"
                        className={styles.modalInput}
                        value={form.colors}
                        onChange={handleFormChange}
                        placeholder="Black, White, Blue"
                    />
                    </div>

                    <label className={styles.checkboxRow}>
                    <input
                        type="checkbox"
                        name="inStock"
                        checked={form.inStock}
                        onChange={handleFormChange}
                    />
                    <span>In Stock</span>
                    </label>

                    <label className={styles.checkboxRow}>
                    <input
                        type="checkbox"
                        name="featured"
                        checked={form.featured}
                        onChange={handleFormChange}
                    />
                    <span>Featured Product</span>
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
                        {editingProduct ? 'Update' : 'Create'}
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

export default Products
