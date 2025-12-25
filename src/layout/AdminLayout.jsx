import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import styles from '../styles/AdminLayout.module.css';

const AdminLayout = ({ children }) => {
    const user = React.useMemo(() => {
    try {
    const userData = JSON.parse(localStorage.getItem('user')) || null;
        if (!userData) {
          window.location.href = '/';
          return null;
        }
        return userData;
    } catch {
      return null;
    }
  }, []);

  return (
    <div className={styles.shell}>
      <AdminSidebar user={user} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AdminLayout;
