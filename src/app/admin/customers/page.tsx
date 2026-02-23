"use client";

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import { useCurrency } from '../../../context/CurrencyContext';

interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
}

export default function AdminCustomers() {
    const { formatPrice } = useCurrency();
    const [mounted, setMounted] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        setMounted(true);

        const storedOrders = localStorage.getItem('ami-admin-orders');
        const orders = storedOrders ? JSON.parse(storedOrders) : [];

        // Grouper par email pour identifier les clients uniques
        const customerMap: Record<string, Customer> = {};

        orders.forEach((o: any) => {
            const email = o.email || 'inconnu@exemple.com';
            const price = parseFloat(o.total.replace(',', '.').replace(/[^\d.]/g, '')) || 0;

            if (!customerMap[email]) {
                customerMap[email] = {
                    name: o.customer,
                    email: email,
                    phone: o.phone || '-',
                    address: o.address || '-',
                    totalOrders: 0,
                    totalSpent: 0,
                    lastOrderDate: o.date
                };
            }

            customerMap[email].totalOrders += 1;
            customerMap[email].totalSpent += price;

            // On garde la date la plus récente (hypotèse: les commandes sont déjà triées ou on compare)
            // Pour l'instant on garde la première rencontrée car elles sont souvent antéchronologiques
        });

        setCustomers(Object.values(customerMap));
    }, []);

    if (!mounted) return null;

    return (
        <div className={styles.dashboard}>
            <header className={styles.pageHeader}>
                <h2 className={styles.sectionTitle}>Gestion des Clients</h2>
                <div className={styles.dateRange}>{customers.length} clients enregistrés</div>
            </header>

            <div className={styles.card}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Email / Tél</th>
                                <th>Localisation</th>
                                <th>Commandes</th>
                                <th>Total Dépensé</th>
                                <th>Dernière activité</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, index) => (
                                <tr key={index}>
                                    <td className={styles.orderId}>{customer.name}</td>
                                    <td>
                                        <div style={{ fontSize: '0.85rem' }}>{customer.email}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{customer.phone}</div>
                                    </td>
                                    <td style={{ fontSize: '0.85rem' }}>{customer.address}</td>
                                    <td style={{ fontWeight: 700, textAlign: 'center' }}>{customer.totalOrders}</td>
                                    <td style={{ fontWeight: 800 }}>{formatPrice(customer.totalSpent)}</td>
                                    <td className={styles.orderDate}>{customer.lastOrderDate}</td>
                                </tr>
                            ))}
                            {customers.length === 0 && (
                                <tr>
                                    <td colSpan={6} className={styles.emptyTable}>Aucun client trouvé dans l'historique des commandes.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
