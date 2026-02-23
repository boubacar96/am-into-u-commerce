"use client";

import styles from '../spices/page.module.css';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../context/ProductContext';

export default function JewelleryPage() {
    const { getProductsByCategory } = useProducts();
    const JEWELS = getProductsByCategory('Bijoux');

    return (
        <main>
            <section className={styles.categoryHero} style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/assets/images/african_minimalist_jewelry_1771871344071.png") center/cover' }}>
                <div className={styles.heroBackground}></div>
                <div className={styles.heroContent}>
                    <h1 className={`premium-title ${styles.categoryTitle}`}>Bijoux Éternels</h1>
                    <p className={styles.categoryDesc}>
                        L'éclat de l'or et la finesse du design minimaliste.
                        Des parures conçues pour célébrer l'élégance naturelle et le raffinement intemporel.
                    </p>
                </div>
            </section>

            <div className={styles.layout}>
                <aside className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Type de Bijou</h3>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Bagues</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Colliers & Pendentifs</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Bracelets</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Boucles d'oreilles</label>
                    </div>
                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Matériau</h3>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Or Jaune 18k</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Or Blanc</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Argent 925</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Plaqué Or</label>
                    </div>
                </aside>

                <div>
                    <div className={styles.topBar}>
                        <span className={styles.productCount}>{JEWELS.length} produits trouvés</span>
                        <select className={styles.select}>
                            <option>Pertinence</option>
                            <option>Prix croissant</option>
                            <option>Prix décroissant</option>
                            <option>Nouveautés</option>
                        </select>
                    </div>
                    <div className={styles.productGrid}>
                        {JEWELS.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
