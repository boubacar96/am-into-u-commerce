"use client";

import styles from './page.module.css';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../context/ProductContext';

export default function SpicesPage() {
    const { getProductsByCategory } = useProducts();
    const SPICES = getProductsByCategory('Épices');

    return (
        <main>
            <section className={styles.categoryHero} style={{ background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/assets/images/luxury_saffron_packaging_1771871590753.png") center/cover' }}>
                <div className={styles.heroBackground}></div>
                <div className={styles.heroContent}>
                    <h1 className={`premium-title ${styles.categoryTitle}`}>L'Or Rouge & Épices Rares</h1>
                    <p className={styles.categoryDesc}>
                        Une exploration sensorielle à travers les terroirs les plus prestigieux.
                        Nos épices sont sélectionnées pour leur pureté absolue et leur puissance aromatique.
                    </p>
                </div>
            </section>

            <div className={styles.layout}>
                <aside className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Catégories</h3>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Tous</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Poivres & Baies</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Mélanges d'Épices</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Sels Rares</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Piments</label>
                    </div>
                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Niveau de piquant</h3>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Doux</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Relevé</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Fort</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Extrême</label>
                    </div>
                </aside>

                <div>
                    <div className={styles.topBar}>
                        <span className={styles.productCount}>{SPICES.length} produits trouvés</span>
                        <select className={styles.select}>
                            <option>Pertinence</option>
                            <option>Prix croissant</option>
                            <option>Prix décroissant</option>
                            <option>Nouveautés</option>
                        </select>
                    </div>
                    <div className={styles.productGrid}>
                        {SPICES.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
