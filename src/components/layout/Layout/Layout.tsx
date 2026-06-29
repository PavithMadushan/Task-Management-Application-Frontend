import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import { UserBadge } from '../Topbar/UserBadge';
import { useAuth } from '../../../context/AuthContext';

export const Layout = () => {
  const { user } = useAuth();

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
      <div className={styles.logo}>Pro Manage</div>

      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? styles.navItemActive : styles.navItem
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/board"
          className={({ isActive }) =>
            isActive ? styles.navItemActive : styles.navItem
          }
        >
          Board
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? styles.navItemActive : styles.navItem
          }
        >
          Users
        </NavLink>
      </nav>

      <button className={styles.logoutButton}>
        Log out
      </button>
    </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <div />

          <UserBadge
            name={user?.name ?? 'Unknown'}
            role={user?.role ?? ''}
          />
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};