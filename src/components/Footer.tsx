import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerGrid}`}>
                <div className={styles.brandSection}>
                    <h2 className={`premium-title ${styles.logo}`}>Am-Into-U</h2>
                    <p className={styles.desc}>
                        Découvrez notre sélection premium d'épices d'exception, de bijoux artisanaux et de fragrances luxueuses qui soulignent votre personnalité.
                    </p>
                </div>

                <div className={styles.linksSection}>
                    <h3 className={styles.heading}>Explorer</h3>
                    <ul className={styles.list}>
                        <li><Link href="/spices">Amy'spices</Link></li>
                        <li><Link href="/jewellery">Amy's Jewellery</Link></li>
                        <li><Link href="/fragrance">Amy's Fragrance</Link></li>
                    </ul>
                </div>

                <div className={styles.linksSection}>
                    <h3 className={styles.heading}>Assistance</h3>
                    <ul className={styles.list}>
                        <li><Link href="/contact">Nous contacter</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Link href="/livraison">Livraison & Retours</Link></li>
                    </ul>
                </div>
            </div>

            <div className={styles.copy}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <p>&copy; {new Date().getFullYear()} Am-Into-U Trading. Tous droits réservés.</p>
                    <div className={styles.socials}>
                        <span role="img" aria-label="Instagram">📸</span>
                        <span role="img" aria-label="Facebook">📘</span>
                        <span role="img" aria-label="WhatsApp">💬</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
