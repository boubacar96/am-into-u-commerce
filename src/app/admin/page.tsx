"use client";

import { useState, useEffect } from 'react';
import styles from './admin.module.css';
import { useCurrency } from '../../context/CurrencyContext';

export default function AdminDashboard() {
    const { formatPrice } = useCurrency();
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState<any[]>([]);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [categoryRevenue, setCategoryRevenue] = useState<any[]>([]);

    useEffect(() => {
        setMounted(true);

        // Charger les données réelles
        const storedOrders = localStorage.getItem('ami-admin-orders');
        const storedProducts = localStorage.getItem('ami-admin-products');

        const orders = storedOrders ? JSON.parse(storedOrders) : [];
        const products = storedProducts ? JSON.parse(storedProducts) : [];

        // 1. Calculer les Revenus Totaux
        const totalSales = orders
            .filter((o: any) => o.status === 'completed' || o.status === 'pending')
            .reduce((acc: number, o: any) => {
                const price = parseFloat(o.total.replace(',', '.').replace(/[^\d.]/g, ''));
                return acc + (isNaN(price) ? 0 : price);
            }, 0);

        // 2. Calculer les Top Produits
        const productSalesCount: Record<string, { count: number, name: string, category: string }> = {};
        orders.forEach((o: any) => {
            if (o.items && Array.isArray(o.items)) {
                o.items.forEach((item: any) => {
                    if (!productSalesCount[item.id]) {
                        productSalesCount[item.id] = { count: 0, name: item.name, category: '' };
                        // Essayer de trouver la catégorie dans la liste des produits
                        const prod = products.find((p: any) => p.id === item.id);
                        productSalesCount[item.id].category = prod ? prod.category : 'Inconnue';
                    }
                    productSalesCount[item.id].count += item.quantity;
                });
            }
        });

        const sortedProducts = Object.values(productSalesCount)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // 3. Revenu par Catégorie
        const catRev: Record<string, number> = {};
        orders.forEach((o: any) => {
            if (o.items) {
                o.items.forEach((item: any) => {
                    const prod = products.find((p: any) => p.id === item.id);
                    const cat = prod ? prod.category : 'Divers';
                    const price = parseFloat(item.price.replace(',', '.').replace(/[^\d.]/g, ''));
                    catRev[cat] = (catRev[cat] || 0) + (price * item.quantity);
                });
            }
        });

        const categoryData = Object.entries(catRev).map(([name, value]) => ({ name, value }));

        const lowStockCount = products.filter((p: any) => p.stock > 0 && p.stock < 10).length;

        setStats([
            { title: "Chiffre d'Affaires", value: formatPrice(totalSales), trend: "+12.5%", up: true, icon: "💰" },
            { title: "Commandes", value: orders.length.toString(), trend: `+${orders.filter((o: any) => new Date().toLocaleDateString() === new Date(o.date).toLocaleDateString()).length}`, up: true, icon: "📦" },
            { title: "Alertes Stock", value: lowStockCount.toString(), trend: lowStockCount > 0 ? "Action requise" : "Optimal", up: lowStockCount === 0, icon: "⚠️" },
            { title: "Panier Moyen", value: orders.length > 0 ? formatPrice(totalSales / orders.length) : formatPrice(0), trend: "+2.1%", up: true, icon: "🛒" },
        ]);

        setRecentOrders(orders.slice(0, 5));
        setTopProducts(sortedProducts);
        setCategoryRevenue(categoryData);

    }, [formatPrice]);

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed': return 'Payé';
            case 'pending': return 'En attente';
            case 'cancelled': return 'Annulé';
            default: return status;
        }
    };

    if (!mounted) return null;

    return (
        <div className={styles.dashboard}>
            <header className={styles.pageHeader}>
                <h2 className={styles.sectionTitle}>Tableau de bord</h2>
                <span className={styles.dateRange}>Aujourd'hui, {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
            </header>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statIcon}>{stat.icon}</span>
                            <span className={`${styles.statTrend} ${stat.up ? styles.up : styles.down}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div className={styles.statBody}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statTitle}>{stat.title}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.mainGrid}>
                {/* Recent Orders */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Dernières Commandes</h3>
                        <a href="/admin/orders" className={styles.viewAll}>Voir tout</a>
                    </div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Réf</th>
                                    <th>Client</th>
                                    <th>Date</th>
                                    <th>Montant</th>
                                    <th>Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, index) => (
                                    <tr key={index}>
                                        <td className={styles.orderId}>{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td className={styles.orderDate}>{order.date}</td>
                                        <td className={styles.orderTotal}>{order.total}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${styles[`status-${order.status}`]}`}>
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {recentOrders.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className={styles.emptyTable}>Aucune commande enregistrée.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column: Top Products & Revenue Chart */}
                <div className={styles.sideColumn}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Top Produits</h3>
                        <div className={styles.topProductsList}>
                            {topProducts.length > 0 ? topProducts.map((p, i) => (
                                <div key={i} className={styles.topProductItem}>
                                    <div className={styles.productInitial}>{p.name.charAt(0)}</div>
                                    <div className={styles.productInfo}>
                                        <span className={styles.pName}>{p.name}</span>
                                        <span className={styles.pCat}>{p.category}</span>
                                    </div>
                                    <div className={styles.pSales}>
                                        <span className={styles.salesCount}>{p.count}</span>
                                        <span className={styles.salesLabel}>ventes</span>
                                    </div>
                                </div>
                            )) : (
                                <p className={styles.emptyMsg}>Pas encore de ventes.</p>
                            )}
                        </div>
                    </div>

                    <div className={styles.card} style={{ marginTop: '2rem' }}>
                        <h3 className={styles.cardTitle}>Répartition par Catégorie</h3>
                        <div className={styles.categoryStats}>
                            {categoryRevenue.map((cat, i) => (
                                <div key={i} className={styles.catRow}>
                                    <div className={styles.catInfo}>
                                        <span>{cat.name}</span>
                                        <span>{formatPrice(cat.value)}</span>
                                    </div>
                                    <div className={styles.progressContainer}>
                                        <div
                                            className={styles.progressBar}
                                            style={{ width: `${Math.min(100, (cat.value / stats[0].value.replace(/[^\d]/g, '')) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {categoryRevenue.length === 0 && <p className={styles.emptyMsg}>Données insuffisantes.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
