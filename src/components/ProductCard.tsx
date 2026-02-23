"use client";

import React from 'react';
import Link from 'next/link';
import styles from './ProductCard.module.css';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';

export interface Product {
    id: string | number;
    name: string;
    price: number;
    oldPrice?: number;
    category: string;
    icon?: string;
    image?: string;
    badge?: string;
    description?: string;
    stock?: number;
    status?: 'instock' | 'lowstock' | 'cancelled';
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { formatPrice } = useCurrency();
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // On passe les données au format attendu par le panier
        addToCart(product, 1);
    };

    return (
        <div className={styles.productCard}>
            <Link href={`/product/${product.id}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>
                    {product.badge && (
                        <span className={`${styles.badge} ${product.badge.includes('%') ? styles.badgeSale : ''}`}>
                            {product.badge}
                        </span>
                    )}

                    {product.image ? (
                        <img src={product.image} alt={product.name} className={styles.productImage} />
                    ) : (
                        <div className={styles.placeholder}>
                            {product.icon || '📦'}
                        </div>
                    )}

                    <button
                        className={styles.quickAdd}
                        onClick={handleAddToCart}
                        title="Ajouter au panier rapide"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </Link>

            <div className={styles.productInfo}>
                <div className={styles.meta}>
                    <span className={styles.category}>{product.category}</span>
                </div>
                <Link href={`/product/${product.id}`}>
                    <h3 className={styles.name}>{product.name}</h3>
                </Link>
                <div className={styles.priceRow}>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                        <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
