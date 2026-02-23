"use client";

import Link from 'next/link';
import styles from './page.module.css';

const COLLECTIONS = [
    {
        id: 'spices',
        title: "L'Art des Épices",
        subtitle: "Amy'spices",
        path: '/spices',
        image: '/assets/images/luxury_saffron_packaging_1771871590753.png'
    },
    {
        id: 'jewellery',
        title: "Éclat Minimaliste",
        subtitle: "Amy's Jewellery",
        path: '/jewellery',
        image: '/assets/images/african_minimalist_jewelry_1771871344071.png'
    },
    {
        id: 'fragrance',
        title: "Sillages Divins",
        subtitle: "Amy's Fragrance",
        path: '/fragrance',
        image: '/assets/images/luxury_oud_perfume_bottle_1771871462941.png' // Mis à jour avec le bon nom de fichier
    }
];

export default function CollectionsPage() {
    return (
        <main className="container">
            <div className={styles.collectionsPage}>
                <h1 className={`premium-title ${styles.title}`}>Nos Univers</h1>

                <div className={styles.grid}>
                    {COLLECTIONS.map(col => (
                        <Link key={col.id} href={col.path} className={styles.collectionCard}>
                            <img src={col.image} alt={col.title} />
                            <div className={styles.cardContent}>
                                <span className={styles.cardSubtitle}>{col.subtitle}</span>
                                <h2 className={styles.cardTitle}>{col.title}</h2>
                                <span className={styles.cardLink}>DÉCOUVRIR LE CATALOGUE</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
