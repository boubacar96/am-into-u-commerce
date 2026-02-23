"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import styles from './page.module.css';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, getCartTotal, getCartItemsCount, clearCart } = useCart();
    const { formatPrice, currency } = useCurrency();
    const [mounted, setMounted] = useState(false);

    // États du formulaire
    const [paymentMethod, setPaymentMethod] = useState<'orange-money' | 'wave' | 'cash-on-delivery'>('orange-money');
    const [isProcessing, setIsProcessing] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: 'CI'
    });

    useEffect(() => {
        setMounted(true);
        // Rediriger vers le panier s'il est vide
        if (cart.length === 0) {
            // En vrai mode dev on laisse passer pour voir le design mais en prod on redirige
            // router.push('/cart'); 
        }
    }, [cart]);

    if (!mounted) return null;

    const total = getCartTotal();
    const shipping = total >= 35000 ? 0 : 3000;
    const finalTotal = total + shipping;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCustomerInfo({
            ...customerInfo,
            [e.target.id]: e.target.value
        });
    };

    const generateWhatsAppMessage = () => {
        // Numéro du gérant (fictif)
        const managerPhone = "22500000000";

        let message = `*Nouvelle Commande (Paiement à la livraison)* 🛍️\n\n`;
        message += `*CLIENT:*\n`;
        message += `- Nom: ${customerInfo.firstname} ${customerInfo.lastname}\n`;
        message += `- Tél: ${customerInfo.phone}\n`;
        message += `- Adresse: ${customerInfo.address}, ${customerInfo.city} (${customerInfo.country})\n\n`;

        message += `*COMMANDE:*\n`;
        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (${formatPrice(item.price)})\n`;
        });
        message += `\n*TOTAL: ${formatPrice(finalTotal)}*`;

        return `https://wa.me/${managerPhone}?text=${encodeURIComponent(message)}`;
    };

    const saveOrderToLocalStorage = () => {
        const existingOrders = localStorage.getItem('ami-admin-orders');
        const orders = existingOrders ? JSON.parse(existingOrders) : [];

        const newOrder = {
            id: `#AMI-${Math.floor(Math.random() * 9000) + 1000}`,
            customer: `${customerInfo.firstname} ${customerInfo.lastname}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: `${customerInfo.address}, ${customerInfo.city}`,
            date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            total: `${formatPrice(finalTotal)}`,
            status: 'pending',
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: formatPrice(item.price)
            })),
            paymentMethod: paymentMethod === 'orange-money' ? 'Orange Money' : (paymentMethod === 'wave' ? 'Wave' : 'Espèces')
        };

        orders.unshift(newOrder); // Ajouter au début
        localStorage.setItem('ami-admin-orders', JSON.stringify(orders));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Sauvegarder la commande localement pour l'admin
        saveOrderToLocalStorage();

        // Si paiement à la livraison, rediriger vers WhatsApp puis page de succès
        if (paymentMethod === 'cash-on-delivery') {
            const whatsappUrl = generateWhatsAppMessage();

            // Simuler l'envoi de mail
            console.log("Simulation : Email envoyé au gérant et au client avec les récapitulatifs.");

            setTimeout(() => {
                // Ouvrir WhatsApp dans un nouvel onglet
                window.open(whatsappUrl, '_blank');
                clearCart();
                setIsProcessing(false);
                router.push('/success');
            }, 1500);

        } else {
            // Simulation Mobile Money
            setTimeout(() => {
                clearCart();
                setIsProcessing(false);
                router.push('/success');
            }, 2000);
        }
    };

    return (
        <main className="container">
            <div className={styles.checkoutPage}>
                <h1 className={`premium-title ${styles.title}`}>Finaliser la commande</h1>

                <div className={styles.layout}>

                    <form id="checkout-form" onSubmit={handleSubmit}>
                        {/* Étape 1 : Coordonnées */}
                        <section className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.stepNumber}>1</span> Coordonnées
                            </h2>
                            <div className={styles.grid2}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="email">Adresse E-mail *</label>
                                    <input required type="email" id="email" className={styles.input} placeholder="vous@exemple.com" value={customerInfo.email} onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="phone">Numéro de Téléphone *</label>
                                    <input required type="tel" id="phone" className={styles.input} placeholder="+225 00000000" value={customerInfo.phone} onChange={handleInputChange} />
                                </div>
                            </div>
                        </section>

                        {/* Étape 2 : Livraison */}
                        <section className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.stepNumber}>2</span> Adresse de livraison
                            </h2>

                            <div className={styles.grid2}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="firstname">Prénom *</label>
                                    <input required type="text" id="firstname" className={styles.input} value={customerInfo.firstname} onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="lastname">Nom *</label>
                                    <input required type="text" id="lastname" className={styles.input} value={customerInfo.lastname} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                                <label className={styles.label} htmlFor="address">Adresse de livraison (Quartier, Rue) *</label>
                                <input required type="text" id="address" className={styles.input} value={customerInfo.address} onChange={handleInputChange} />
                            </div>

                            <div className={styles.grid2} style={{ marginTop: '1rem' }}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="city">Ville *</label>
                                    <input required type="text" id="city" className={styles.input} value={customerInfo.city} onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="country">Pays *</label>
                                    <select id="country" className={styles.input} required value={customerInfo.country} onChange={handleInputChange}>
                                        <option value="CI">Côte d'Ivoire</option>
                                        <option value="SN">Sénégal</option>
                                        <option value="ML">Mali</option>
                                        <option value="FR">France</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Étape 3 : Paiement */}
                        <section className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.stepNumber}>3</span> Mode de paiement
                            </h2>

                            <div className={styles.paymentMethods}>
                                <label className={`${styles.paymentOption} ${paymentMethod === 'orange-money' ? styles.selected : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="orange-money"
                                        className={styles.paymentRadio}
                                        checked={paymentMethod === 'orange-money'}
                                        onChange={() => setPaymentMethod('orange-money')}
                                    />
                                    <span className={styles.paymentIcon} style={{ color: '#ff6600' }}>📱</span>
                                    <div className={styles.paymentDetails}>
                                        <span className={styles.paymentName}>Orange Money</span>
                                        <span className={styles.paymentDesc}>Paiement mobile rapide et sécurisé</span>
                                    </div>
                                </label>

                                <label className={`${styles.paymentOption} ${paymentMethod === 'wave' ? styles.selected : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="wave"
                                        className={styles.paymentRadio}
                                        checked={paymentMethod === 'wave'}
                                        onChange={() => setPaymentMethod('wave')}
                                    />
                                    <span className={styles.paymentIcon} style={{ color: '#15e2e8' }}>🌊</span>
                                    <div className={styles.paymentDetails}>
                                        <span className={styles.paymentName}>Wave</span>
                                        <span className={styles.paymentDesc}>Paiement mobile simple (Sénégal, CI...)</span>
                                    </div>
                                </label>

                                <label className={`${styles.paymentOption} ${paymentMethod === 'cash-on-delivery' ? styles.selected : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cash-on-delivery"
                                        className={styles.paymentRadio}
                                        checked={paymentMethod === 'cash-on-delivery'}
                                        onChange={() => setPaymentMethod('cash-on-delivery')}
                                    />
                                    <span className={styles.paymentIcon}>💵</span>
                                    <div className={styles.paymentDetails}>
                                        <span className={styles.paymentName}>Paiement à la livraison</span>
                                        <span className={styles.paymentDesc}>Payez en espèces à réception. Le récap sera envoyé par WhatsApp.</span>
                                    </div>
                                </label>
                            </div>

                            {(paymentMethod === 'orange-money' || paymentMethod === 'wave') && (
                                <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label} htmlFor="mobile-number">Numéro {paymentMethod === 'orange-money' ? 'Orange Money' : 'Wave'}</label>
                                        <input type="tel" id="mobile-number" className={styles.input} placeholder={customerInfo.phone || "+225 00 00 00 00 00"} required />
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                        Vous recevrez une notification sur votre téléphone pour valider le paiement (Montant : {formatPrice(finalTotal)}).
                                    </p>
                                </div>
                            )}
                        </section>
                    </form>

                    {/* Résumé Panier */}
                    <aside className={styles.summary}>
                        <h2 className={styles.sectionTitle} style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                            Votre commande
                        </h2>

                        <div style={{ marginBottom: '1.5rem' }}>
                            {cart.map(item => (
                                <div key={item.id} className={styles.summaryItem}>
                                    <div className={styles.itemImage}>
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} />
                                        ) : (
                                            <span>{item.icon || '📦'}</span>
                                        )}
                                        <span className={styles.itemBadge}>{item.quantity}</span>
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <div className={styles.itemName}>{item.name}</div>
                                        <div className={styles.itemPrice}>{formatPrice(item.price)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summaryLine}>
                            <span>Sous-total ({getCartItemsCount()} articles)</span>
                            <span>{formatPrice(total)}</span>
                        </div>

                        <div className={styles.summaryLine}>
                            <span>Livraison</span>
                            <span>{shipping === 0 ? 'Offerte' : formatPrice(shipping)}</span>
                        </div>

                        <div className={`${styles.summaryLine} ${styles.total}`}>
                            <span>Total final</span>
                            <span>{formatPrice(finalTotal)}</span>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            className={`button-primary ${styles.submitBtn}`}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Traitement en cours...' : (paymentMethod === 'cash-on-delivery' ? 'Confirmer la commande' : `Payer ${formatPrice(finalTotal)}`)}
                        </button>

                        {paymentMethod === 'cash-on-delivery' && (
                            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--success-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                <span>Vous serez redirigé vers WhatsApp</span>
                            </div>
                        )}
                        {paymentMethod !== 'cash-on-delivery' && (
                            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                🔒 Paiement 100% sécurisé (Mobile Money)
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
}
