import Link from 'next/link';
import styles from './page.module.css';
import ProductCard, { Product } from '../components/ProductCard';

const FEATURED_PRODUCTS: Product[] = [
  { id: 1, name: "Safran de Taliouine - Grade A", price: 29.90, category: "Épices Rares", icon: "🌶️", badge: "Rare" },
  { id: 2, name: "Bague 'Soleil d'Or' 18k", price: 185.00, category: "Bijoux", icon: "✨", badge: "Best-seller" },
  { id: 3, name: "Oud Mystérieux Absolu 50ml", price: 120.00, oldPrice: 150.00, category: "Parfums", icon: "💧", badge: "-20%" },
  { id: 4, name: "Poivre Noir de Sarawak", price: 14.50, category: "Épices", icon: "🌶️", badge: "Bio" },
];

export default function Home() {
  const heroImageUrl = "/assets/images/amy_spices_hero_bg_1771871022381.png";

  return (
    <main>
      <section className={styles.hero}>
        <div className={`container ${styles.headerContent} ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroSubtitle}>L'Épicerie Fine & la Parfumerie de Luxe</span>
            <h1 className={`premium-title ${styles.heroTitle}`}>
              L'Essence de <br /> <span style={{ color: 'var(--terracotta)' }}>l'Afrique</span> Premium
            </h1>
            <p className={styles.heroDesc}>
              Une sélection rigoureuse d'épices rares, de bijoux minimalistes et de fragrances envoûtantes pour magnifier votre quotidien.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/shop" className="button-primary">
                Explorer la Boutique
              </Link>
              <Link href="/collections" className="button-outline">
                Nos Collections
              </Link>
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            <img src={heroImageUrl} alt="Am-Into-U Spices" className={styles.heroImage} />
            <div className={styles.heroImageDecor}></div>
          </div>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={`premium-title ${styles.sectionTitle}`}>Catégories</h2>
        </div>

        <div className={styles.categoryGrid}>
          <Link href="/jewellery" className={styles.categoryCard}>
            <div className={styles.categoryImage}>✨</div>
            <h3 className={styles.categoryTitle}>Bijoux Artisanaux</h3>
            <span className={styles.categoryLink}>Découvrir</span>
          </Link>

          <Link href="/fragrance" className={styles.categoryCard}>
            <div className={styles.categoryImage}>💧</div>
            <h3 className={styles.categoryTitle}>Extraits de Parfums</h3>
            <span className={styles.categoryLink}>Découvrir</span>
          </Link>

          <Link href="/spices" className={styles.categoryCard}>
            <div className={styles.categoryImage}>🌶️</div>
            <h3 className={styles.categoryTitle}>Épices & Sels Rares</h3>
            <span className={styles.categoryLink}>Découvrir</span>
          </Link>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={`premium-title ${styles.sectionTitle}`}>Nouveautés</h2>
          <Link href="/shop" className={styles.viewAll}>
            Tout voir <span>→</span>
          </Link>
        </div>

        <div className={styles.featuredGrid}>
          {FEATURED_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container mb-2 mt-2">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          padding: '3rem 0',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚚</div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Livraison Express</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Offerte dès 50€ d'achat</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Paiement Sécurisé</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Visa, Mastercard, Paypal</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔄</div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Retours Simples</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>30 jours pour changer d'avis</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Service Client</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Réponse sous 24h via WhatsApp</p>
          </div>
        </div>
      </section>
    </main>
  );
}
