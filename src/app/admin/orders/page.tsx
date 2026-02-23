"use client";

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

// Type Commande
type Order = {
    id: string;
    customer: string;
    date: string;
    total: string;
    status: 'completed' | 'pending' | 'cancelled';
    paymentMethod: string;
    items?: any[];
};

const INITIAL_ORDERS: Order[] = [
    { id: "#AMI-8472", customer: "Jean Dupont", date: "23 Fév 2026, 14:30", total: "22 500 FCFA", status: "completed", paymentMethod: "Carte Bancaire" },
    { id: "#AMI-8471", customer: "Awa Sylla", date: "23 Fév 2026, 11:15", total: "120 000 FCFA", status: "pending", paymentMethod: "Orange Money" },
    { id: "#AMI-8470", customer: "Marc L.", date: "22 Fév 2026, 09:00", total: "15 000 FCFA", status: "completed", paymentMethod: "PayPal" },
    { id: "#AMI-8469", customer: "Sophie K.", date: "22 Fév 2026, 08:30", total: "85 000 FCFA", status: "cancelled", paymentMethod: "Wave" },
    { id: "#AMI-8468", customer: "Moussa S.", date: "21 Fév 2026, 18:45", total: "5 000 FCFA", status: "completed", paymentMethod: "Espèces (Livraison)" },
];

export default function AdminOrders() {
    const [mounted, setMounted] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Charger Commandes depuis LocalStorage
        const stored = localStorage.getItem('ami-admin-orders');
        if (stored) {
            setOrders(JSON.parse(stored));
        } else {
            setOrders(INITIAL_ORDERS);
            localStorage.setItem('ami-admin-orders', JSON.stringify(INITIAL_ORDERS));
        }
        setMounted(true);
    }, []);

    // Sauvegarder Statuts
    useEffect(() => {
        if (mounted && orders.length > 0) {
            localStorage.setItem('ami-admin-orders', JSON.stringify(orders));
        }
    }, [orders, mounted]);

    if (!mounted) return null;

    const filteredOrders = orders.filter((order: Order) =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpdateStatus = (id: string, newStatus: 'completed' | 'pending' | 'cancelled') => {
        setOrders(orders.map((o: Order) => o.id === id ? { ...o, status: newStatus } : o));
    };

    const handleDeleteOrder = (id: string) => {
        if (window.confirm(`Supprimer définitivement la commande ${id} de l'historique ?`)) {
            setOrders(orders.filter((o: Order) => o.id !== id));
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed': return 'Payé';
            case 'pending': return 'En attente';
            case 'cancelled': return 'Annulé';
            default: return status;
        }
    };

    return (
        <div>
            <div className={styles.header} style={{ marginBottom: '2rem' }}>
                <h2 className={styles.title} style={{ fontSize: '1.8rem' }}>Gestion des Commandes</h2>
                <button className="button-primary" onClick={() => {
                    const data = JSON.stringify(orders);
                    const blob = new Blob([data], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    window.open(url, '_blank');
                }}>Exporter JSON</button>
            </div>

            <div className={styles.tableContainer} style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Rechercher par n° de commande, client ou paiement..."
                        className="input"
                        style={{ width: '400px', padding: '0.6rem 1rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>{orders.length} Commandes</span>
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Commande</th>
                            <th>Date</th>
                            <th>Client</th>
                            <th>Paiement</th>
                            <th>Total</th>
                            <th>Statut</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td style={{ fontWeight: 600 }}>{order.id}</td>
                                <td style={{ fontSize: '0.85rem' }}>{order.date}</td>
                                <td>{order.customer}</td>
                                <td><span style={{ fontSize: '0.85rem', backgroundColor: 'var(--surface-light)', padding: '2px 6px', borderRadius: '4px' }}>{order.paymentMethod}</span></td>
                                <td style={{ fontWeight: 600 }}>{order.total}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${styles[`status-${order.status}`]}`}>
                                        {getStatusLabel(order.status)}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right', display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
                                    <select
                                        title="Modifier le statut"
                                        style={{ padding: '0.3rem', fontSize: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'transparent' }}
                                        value={order.status}
                                        onChange={(e) => {
                                            handleUpdateStatus(order.id, e.target.value as 'completed' | 'pending' | 'cancelled');
                                        }}
                                    >
                                        <option value="completed">Valider (Payé)</option>
                                        <option value="pending">Mettre en attente</option>
                                        <option value="cancelled">Annuler</option>
                                    </select>
                                    <button className={styles.actionBtn} title="Supprimer la commande" onClick={() => handleDeleteOrder(order.id)} style={{ color: '#d32f2f' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}

                        {filteredOrders.length === 0 && (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>Aucune commande trouvée.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
