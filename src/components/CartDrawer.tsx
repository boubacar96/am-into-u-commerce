"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, isDrawerOpen, closeDrawer } = useCart();
    const { formatPrice } = useCurrency();
    const drawerRef = useRef<HTMLDivElement>(null);

    // Fermer au clic extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isDrawerOpen) {
                closeDrawer();
            }
        };

        if (isDrawerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden'; // Empêcher le scroll
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [isDrawerOpen, closeDrawer]);

    return (
        <>
            {/* Overlay */}
            <div className={`${styles.overlay} ${isDrawerOpen ? styles.overlayVisible : ''}`} />

            {/* Drawer */}
            <div ref={drawerRef} className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ''}`}>
                <div className={styles.header}>
                    <h2 className="premium-title">Votre Panier</h2>
                    <button className={styles.closeBtn} onClick={closeDrawer}>&times;</button>
                </div>

                <div className={styles.content}>
                    {cart.length === 0 ? (
                        <div className={styles.empty}>
                            <div className={styles.emptyIcon}>🛍️</div>
                            <p>Votre panier est vide</p>
                            <button className="button-primary" onClick={closeDrawer} style={{ marginTop: '1.5rem' }}>
                                Continuer mes achats
                            </button>
                        </div>
                    ) : (
                        <div className={styles.itemsList}>
                            {cart.map((item) => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemImage}>
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} />
                                        ) : (
                                            <span>{item.icon || '📦'}</span>
                                        )}
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h4 className={styles.itemName}>{item.name}</h4>
                                        <div className={styles.itemMeta}>
                                            <div className={styles.quantityControls}>
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <span className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                        <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Supprimer</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.totalRow}>
                            <span>Total estimé</span>
                            <span className={styles.totalAmount}>{formatPrice(getCartTotal())}</span>
                        </div>
                        <p className={styles.footerNote}>Taxes et frais de port calculés lors du paiement.</p>
                        <div className={styles.actions}>
                            <Link href="/cart" className="button-outline" style={{ flex: 1 }} onClick={closeDrawer}>
                                Voir le panier
                            </Link>
                            <Link href="/checkout" className="button-primary" style={{ flex: 1 }} onClick={closeDrawer}>
                                Passer commande
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
