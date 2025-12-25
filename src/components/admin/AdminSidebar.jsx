import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Trophy,
  Newspaper,
  Briefcase,
  ShoppingBag,
  Handshake,
  UserCircle2,
  LogOut,
} from 'lucide-react';
import styles from '../../styles/AdminSidebar.module.css';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/teams', label: 'Teams', icon: Trophy },
  { to: '/admin/players', label: 'Players', icon: Users },
  { to: '/admin/matches', label: 'Matches', icon: Briefcase },
  { to: '/admin/news', label: 'News', icon: Newspaper },
  { to: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/admin/products', label: 'Products', icon: ShoppingBag },
  { to: '/admin/sponsors', label: 'Sponsors', icon: Handshake },
  { to: '/admin/management', label: 'Management', icon: UserCircle2 },
  { to: '/admin/users', label: 'Users', icon: Users },
];

const AdminSidebar = ({user}) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

  return (
    <div>
       <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandTitle}>Admin Panel</span>
      </div>

      <nav className={styles.nav}>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <Icon size={18} className={styles.navIcon} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.bottom}>
        {user && (
          <div className={styles.userBox}>
            <span className={styles.userCaption}>Logged in as</span>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userEmail}>{user.email}</span>
          </div>
        )}

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
    </div>
  )
}

export default AdminSidebar
