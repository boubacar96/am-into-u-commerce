"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../context/CartContext';
import { useCurrency, Currency } from '../context/CurrencyContext';
import { useProducts } from '../context/ProductContext';
import { useEffect, useState, useRef } from 'react';

export default function Header() {
    const router = useRouter();
    const { getCartItemsCount, openDrawer } = useCart();
    const { currency, setCurrency, formatPrice } = useCurrency();
    const { products } = useProducts();
    const [mounted, setMounted] = useState(false);

    // Recherche
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);

        // Fermer la recherche au clic extérieur
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchResults = searchQuery.trim().length > 1
        ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
        : [];

    return (
        <>
            <div className={styles.announcementBar}>
                Expédition rapide | Qualité Premium "Amy'spices" | Livraison offerte dès {mounted ? formatPrice(50) : '50,00 €'}
            </div>

            <header className={styles.header}>
                <div className={`container ${styles.headerContent}`}>

                    <Link href="/" className={`${styles.logo} premium-title`}>
                        Am-Into-U
                    </Link>

                    <nav className={styles.nav}>
                        <ul className={styles.navList}>
                            <li><Link href="/spices" className={styles.navLink}>Épices</Link></li>
                            <li><Link href="/jewellery" className={styles.navLink}>Bijoux</Link></li>
                            <li><Link href="/fragrance" className={styles.navLink}>Parfums</Link></li>
                        </ul>
                    </nav>

                    <div className={styles.actions}>
                        {/* Recherche Dynamic */}
                        <div className={styles.searchWrapper} ref={searchRef}>
                            <div className={styles.searchBar}>
                                <input
                                    type="text"
                                    placeholder="Rechercher une épice, un bijou..."
                                    className={styles.searchInput}
                                    value={searchQuery}
                                    onFocus={() => setShowResults(true)}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowResults(true);
                                    }}
                                />
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>

                            {showResults && searchQuery.trim().length > 1 && (
                                <div className={styles.searchResults}>
                                    {searchResults.length > 0 ? (
                                        searchResults.map(p => (
                                            <Link
                                                key={p.id}
                                                href={`/product/${p.id}`}
                                                className={styles.resultItem}
                                                onClick={() => { setShowResults(false); setSearchQuery(''); }}
                                            >
                                                <div className={styles.resultImage}>
                                                    {p.image ? <img src={p.image} alt={p.name} /> : <span>{p.icon || '📦'}</span>}
                                                </div>
                                                <div className={styles.resultInfo}>
                                                    <span className={styles.resultName}>{p.name}</span>
                                                    <span className={styles.resultPrice}>{formatPrice(p.price)}</span>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className={styles.noResult}>Aucun produit trouvé</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <ThemeToggle />

                        {mounted && (
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value as Currency)}
                                className={styles.currencySelect}
                            >
                                <option value="EUR">€ EUR</option>
                                <option value="XAF">FCFA</option>
                                <option value="USD">$ USD</option>
                            </select>
                        )}

                        <Link href="/login" className={styles.iconButton} title="Compte">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </Link>

                        <button
                            className={styles.iconButton}
                            title="Panier"
                            onClick={(e) => {
                                e.preventDefault();
                                openDrawer();
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            {mounted && getCartItemsCount() > 0 && (
                                <span className={styles.cartCount}>{getCartItemsCount()}</span>
                            )}
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}
