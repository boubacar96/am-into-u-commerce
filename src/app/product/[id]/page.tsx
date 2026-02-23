"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProducts } from '../../../context/ProductContext';
import { useCart } from '../../../context/CartContext';
import { useCurrency } from '../../../context/CurrencyContext';
import styles from './product.module.css';
import ProductCard from '../../../components/ProductCard';

export default function ProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    const product = products.find(p => p.id.toString() === id);

    if (!product) {
        return (
            <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
                <h1 className="premium-title">Produit introuvable</h1>
                <p>Le produit que vous recherchez n'existe pas ou a été déplacé.</p>
                <Link href="/shop" className="button-primary" style={{ marginTop: '2rem' }}>
                    Retour à la boutique
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    // Produits suggérés (même catégorie)
    const suggestedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <main className={styles.productMain}>
            <div className={`container ${styles.productContainer}`}>
                {/* Fil d'ariane */}
                <nav className={styles.breadcrumb}>
                    <Link href="/">Accueil</Link> /
                    <Link href={`/${product.category.toLowerCase()}`}>{product.category}</Link> /
                    <span>{product.name}</span>
                </nav>

                <div className={styles.productGrid}>
                    {/* Galerie Images (Mockée avec l'image principale) */}
                    <div className={styles.gallery}>
                        <div className={styles.mainImageWrapper}>
                            {product.image ? (
                                <img src={product.image} alt={product.name} className={styles.mainImage} />
                            ) : (
                                <div className={styles.placeholder}>{product.icon || '📦'}</div>
                            )}
                        </div>
                    </div>

                    {/* Informations Produit */}
                    <div className={styles.details}>
                        <span className={styles.categoryBadge}>{product.category}</span>
                        <h1 className={`premium-title ${styles.title}`}>{product.name}</h1>

                        <div className={styles.priceRow}>
                            <span className={styles.price}>{formatPrice(product.price)}</span>
                            {product.oldPrice && (
                                <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
                            )}
                        </div>

                        <p className={styles.shortDesc}>
                            {product.description || "Une pièce d'exception issue de notre collection premium, alliant savoir-faire artisanal et matières premières nobles."}
                        </p>

                        <div className={styles.purchaseControls}>
                            <div className={styles.quantitySelector}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <button className="button-primary" style={{ flex: 1 }} onClick={handleAddToCart}>
                                Ajouter au Panier
                            </button>
                        </div>

                        {/* Accordéons / Onglets */}
                        <div className={styles.tabs}>
                            <div className={styles.tabHeaders}>
                                <button
                                    className={activeTab === 'description' ? styles.activeTab : ''}
                                    onClick={() => setActiveTab('description')}
                                >
                                    Description
                                </button>
                                <button
                                    className={activeTab === 'usage' ? styles.activeTab : ''}
                                    onClick={() => setActiveTab('usage')}
                                >
                                    Conseils
                                </button>
                                <button
                                    className={activeTab === 'shipping' ? styles.activeTab : ''}
                                    onClick={() => setActiveTab('shipping')}
                                >
                                    Livraison
                                </button>
                            </div>
                            <div className={styles.tabContent}>
                                {activeTab === 'description' && (
                                    <p>Chaque produit <strong>Am-Into-U</strong> est sélectionné pour sa pureté et son authenticité. Nous travaillons directement avec des artisans et producteurs locaux pour vous offrir le meilleur de l'Afrique et du monde.</p>
                                )}
                                {activeTab === 'usage' && (
                                    <p>Pour préserver la qualité de ce produit, nous vous conseillons de le conserver dans un endroit sec et à l'abri de la lumière directe du soleil.</p>
                                )}
                                {activeTab === 'shipping' && (
                                    <p>Livraison express en 48/72h. Livraison offerte dès {formatPrice(35000)} d'achat. Retours gratuits sous 30 jours.</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.features}>
                            <div className={styles.featureItem}>🌿 100% Naturel / Artisanal</div>
                            <div className={styles.featureItem}>🌍 Commerce Éthique</div>
                            <div className={styles.featureItem}>✨ Qualité Premium</div>
                        </div>
                    </div>
                </div>

                {/* Suggestions */}
                {suggestedProducts.length > 0 && (
                    <section className={styles.suggestions}>
                        <h2 className={`premium-title ${styles.suggestionTitle}`}>Vous aimerez aussi</h2>
                        <div className={styles.suggestionGrid}>
                            {suggestedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
