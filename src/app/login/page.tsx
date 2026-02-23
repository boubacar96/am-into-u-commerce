"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulation connexion rapide
        setTimeout(() => {
            setIsLoading(false);
            router.push('/admin');
        }, 1000);
    };

    return (
        <main className="container">
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.logo}>
                        <span className="premium-title" style={{ fontSize: '1.8rem' }}>Am-Into-U</span>
                        <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '5px', display: 'block' }}>Espace Administrateur</span>
                    </div>

                    <form onSubmit={handleLogin} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Identifiant ou E-mail</label>
                            <input type="text" id="email" className={styles.input} required defaultValue="admin@am-into-u.com" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>Mot de passe</label>
                            <input type="password" id="password" className={styles.input} required defaultValue="password123" />
                        </div>

                        <button type="submit" className={`button-primary ${styles.submitBtn}`} disabled={isLoading}>
                            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        <p>Accès restreint au personnel autorisé.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
