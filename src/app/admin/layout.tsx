"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className={styles.adminLayout}>
            {/* Sidebar Admin */}
            <aside className={styles.sidebar}>
                <Link href="/admin" className={`premium-title ${styles.logo}`}>
                    Ami-Admin
                </Link>

                <nav className={styles.nav}>
                    <Link
                        href="/admin"
                        className={`${styles.navLink} ${pathname === '/admin' ? styles.active : ''}`}
                    >
                        📊 Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className={`${styles.navLink} ${pathname === '/admin/products' ? styles.active : ''}`}
                    >
                        📦 Produits
                    </Link>
                    <Link
                        href="/admin/orders"
                        className={`${styles.navLink} ${pathname === '/admin/orders' ? styles.active : ''}`}
                    >
                        📋 Commandes
                    </Link>
                    <Link
                        href="/admin/customers"
                        className={`${styles.navLink} ${pathname === '/admin/customers' ? styles.active : ''}`}
                    >
                        👥 Clients
                    </Link>
                    <Link
                        href="/admin/settings"
                        className={`${styles.navLink} ${pathname === '/admin/settings' ? styles.active : ''}`}
                    >
                        ⚙️ Paramètres
                    </Link>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                    <Link href="/" className={styles.navLink} style={{ color: 'var(--text-muted)' }}>
                        ← Retour au site
                    </Link>
                </div>
            </aside>

            {/* Contenu Principal */}
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1 className={`premium-title ${styles.title}`}>Bienvenue, Amy</h1>
                    <div className={styles.headerActions}>
                        <button className="button-outline" style={{ padding: '0.5rem 1rem' }}>
                            Boutique en ligne
                        </button>
                        <div className={styles.userProfile}>
                            <div className={styles.avatar}>A</div>
                            <span>Admin</span>
                        </div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
