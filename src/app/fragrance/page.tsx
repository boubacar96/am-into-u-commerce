"use client";

import styles from '../spices/page.module.css';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../context/ProductContext';

export default function FragrancePage() {
    const { getProductsByCategory } = useProducts();
    const PERFUMES = getProductsByCategory('Parfums');

    return (
        <main>
            <section className={styles.categoryHero} style={{ background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/assets/images/luxury_oud_perfume_bottle_1771871462941.png") center/cover' }}>
                <div className={styles.heroBackground}></div>
                <div className={styles.heroContent}>
                    <h1 className={`premium-title ${styles.categoryTitle}`}>Fragrances Signatures</h1>
                    <p className={styles.categoryDesc}>
                        Un voyage olfactif entre ombre et lumière.
                        Découvrez nos extraits de parfum rares, composés à partir des essences les plus précieuses du monde.
                    </p>
                </div>
            </section>

            <div className={styles.layout}>
                <aside className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Famille Olfactive</h3>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Boisé & Oriental</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Floral</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Gourmand</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Frais & Agrumes</label>
                    </div>
                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Concentration</h3>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Extrait de Parfum</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Eau de Parfum</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Brume / Eau de Toilette</label>
                    </div>
                </aside>

                <div>
                    <div className={styles.topBar}>
                        <span className={styles.productCount}>{PERFUMES.length} produits trouvés</span>
                        <select className={styles.select}>
                            <option>Pertinence</option>
                            <option>Prix croissant</option>
                            <option>Prix décroissant</option>
                            <option>Nouveautés</option>
                        </select>
                    </div>
                    <div className={styles.productGrid}>
                        {PERFUMES.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
