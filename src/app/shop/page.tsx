"use client";

import { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard';
import styles from './shop.module.css';

const CATEGORIES = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'Épices', name: 'Épices & Rares' },
    { id: 'Bijoux', name: 'Bijoux' },
    { id: 'Parfums', name: 'Parfums' }
];

export default function ShopPage() {
    const { products } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category.includes(selectedCategory));

    return (
        <main className="container">
            <div className={styles.shopPage}>
                <h1 className={`premium-title ${styles.title}`}>La Boutique</h1>

                <div className={styles.filters}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.filterBtnActive : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {filteredProducts.length > 0 ? (
                    <div className={styles.grid}>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.noProducts}>
                        <p>Aucun produit ne correspond à cette catégorie pour le moment.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
