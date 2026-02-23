"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useCart();
    const { formatPrice } = useCurrency();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Prevent hydration mismatch

    return (
        <main className="container">
            <div className={styles.cartPage}>
                <h1 className={`premium-title ${styles.cartTitle}`}>Mon Panier ({getCartItemsCount()})</h1>

                {cart.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <h2>Votre panier est actuellement vide.</h2>
                        <p>Découvrez nos collections exceptionnelles d'épices, de bijoux et de parfums.</p>
                        <Link href="/" className="button-primary">
                            Retourner à la boutique
                        </Link>
                    </div>
                ) : (
                    <div className={styles.cartLayout}>
                        {/* Lignes de produits (Côté Gauche) */}
                        <div className={styles.cartList}>
                            {cart.map((item) => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemImage}>
                                        {item.icon}
                                    </div>

                                    <div className={styles.itemDetails}>
                                        <span className={styles.itemCat}>{item.category}</span>
                                        <h3 className={styles.itemName}>{item.name}</h3>
                                        <div className={styles.itemPrice}>{formatPrice(item.price)}</div>

                                        <div className={styles.quantityControl}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                aria-label="Diminuer la quantité"
                                            >
                                                -
                                            </button>
                                            <span className={styles.qtyValue}>{item.quantity}</span>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                aria-label="Augmenter la quantité"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.itemActions}>
                                        <div className={styles.itemTotal}>
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                        <button
                                            className={styles.removeBtn}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Résumé de commande (Côté Droit) */}
                        <aside className={styles.summary}>
                            <h2 className={`premium-title ${styles.summaryTitle}`}>Résumé de commande</h2>

                            <div className={styles.summaryLine}>
                                <span>Sous-total ({getCartItemsCount()} articles)</span>
                                <span>{formatPrice(getCartTotal())}</span>
                            </div>

                            <div className={styles.summaryLine}>
                                <span>Livraison Standard</span>
                                <span>{getCartTotal() >= 35000 ? 'Offerte' : formatPrice(3000)}</span>
                            </div>

                            <div className={styles.summaryLine}>
                                <span>Taxes (TVA incluse)</span>
                                <span>Calculées au paiement</span>
                            </div>

                            <div className={`${styles.summaryLine} ${styles.total}`}>
                                <span>Total estimé</span>
                                <span>{formatPrice(getCartTotal() >= 35000 ? getCartTotal() : getCartTotal() + 3000)}</span>
                            </div>

                            <Link href="/checkout" className={`button-primary ${styles.checkoutBtn}`}>
                                Procéder au paiement
                            </Link>

                            <Link href="/" className={styles.continueShopping}>
                                Continuer mes achats
                            </Link>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}
