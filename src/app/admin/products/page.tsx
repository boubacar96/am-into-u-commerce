"use client";

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

import { Product } from '../../../components/ProductCard';

const DEFAULT_PRODUCTS: Product[] = [
    { id: 1, name: "Curcuma Bio en Poudre", category: "Épices", price: 5000, stock: 145, status: "instock", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200" },
    { id: 2, name: "Collier Doré 'Lune'", category: "Bijoux", price: 15000, stock: 5, status: "lowstock", image: "https://images.unsplash.com/photo-1599643478514-4a884f6305a2?w=200" },
    { id: 3, name: "Parfum Ambre Royal", category: "Parfums", price: 30000, stock: 0, status: "cancelled", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200" },
    { id: 4, name: "Mix Grillades Spécial", category: "Épices", price: 4500, stock: 89, status: "instock", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200" },
];

import { useProducts } from '../../../context/ProductContext';
import { useCurrency } from '../../../context/CurrencyContext';

export default function AdminProducts() {
    const { products, setProducts } = useProducts();
    const { formatPrice } = useCurrency();
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({ name: '', category: 'Épices', price: '', stock: 0, image: '' });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Sauvegarder à chaque changement dans LocalStorage
    useEffect(() => {
        if (mounted && products.length > 0) {
            localStorage.setItem('ami-admin-products', JSON.stringify(products));
        }
    }, [products, mounted]);

    if (!mounted) return null;

    const filteredProducts = products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string | number) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement ce produit ?")) {
            setProducts(products.filter((p: Product) => p.id !== id));
        }
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({ name: '', category: 'Épices', price: '', stock: 0, image: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({ name: product.name, category: product.category, price: String(product.price), stock: product.stock || 0, image: product.image || '' });
        setIsModalOpen(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProduct = (e: React.FormEvent) => {
        e.preventDefault();

        // Calculer le statut en fonction du stock
        let status: 'instock' | 'lowstock' | 'cancelled' = 'instock';
        if (formData.stock === 0) status = 'cancelled';
        else if (formData.stock < 10) status = 'lowstock';

        const newProductData: Product = {
            id: editingProduct ? editingProduct.id : Date.now(),
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price.replace(',', '.')),
            stock: Number(formData.stock),
            status: status,
            image: formData.image
        };

        if (editingProduct) {
            // Mode Modification
            setProducts(products.map((p: Product) => p.id === editingProduct.id ? newProductData : p));
        } else {
            // Mode Ajout
            setProducts([newProductData, ...products]);
        }

        setIsModalOpen(false);
    };

    return (
        <div>
            <div className={styles.header} style={{ marginBottom: '2rem' }}>
                <h2 className={styles.title} style={{ fontSize: '1.8rem' }}>Gestion du Catalogue</h2>
                <button className="button-primary" onClick={openAddModal}>+ Nouveau Produit</button>
            </div>

            <div className={styles.tableContainer} style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        className="input"
                        style={{ width: '300px', padding: '0.6rem 1rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Catégorie</th>
                            <th>Prix unitaire</th>
                            <th>Quantité (Stock)</th>
                            <th>Statut</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '4px', backgroundColor: '#f0f0f0', backgroundImage: `url(${product.image || ''})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    {product.name}
                                </td>
                                <td>{product.category}</td>
                                <td>{formatPrice(product.price)}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${styles[`status-${product.status}`]}`}>
                                        {product.status === 'instock' ? 'En Stock' : (product.status === 'lowstock' ? 'Faible (Ravitaillement conseillé)' : 'Rupture Sécurisée')}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <button className={styles.actionBtn} title="Modifier" onClick={() => openEditModal(product)}>✏️ Editer</button>
                                    <button className={styles.actionBtn} title="Supprimer" onClick={() => handleDelete(product.id)} style={{ color: '#d32f2f', marginLeft: '10px' }}>🗑️ Suppr.</button>
                                </td>
                            </tr>
                        ))}

                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Aucun produit dans le catalogue.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Ajout/Modification */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: '8px',
                        width: '100%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{editingProduct ? 'Modifier le Produit' : 'Ajouter un Produit'}</h3>

                        <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>Nom du produit</label>
                                <input
                                    type="text" required className="input" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>Catégorie</label>
                                    <select
                                        className="input" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                        value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="Épices">Épices</option>
                                        <option value="Bijoux">Bijoux</option>
                                        <option value="Parfums">Parfums</option>
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>Prix (FCFA)</label>
                                    <input
                                        type="text" required className="input" placeholder="ex: 12,50" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                        value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>Stock actuel (Quantité)</label>
                                <input
                                    type="number" required min="0" className="input" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                    value={formData.stock} onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>Image du Produit (Upload)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="input"
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                    onChange={handleImageUpload}
                                />
                                {formData.image && (
                                    <div style={{ marginTop: '0.8rem', position: 'relative', display: 'inline-block' }}>
                                        <img src={formData.image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                                <button type="button" className="button-outline" onClick={() => setIsModalOpen(false)}>Annuler</button>
                                <button type="submit" className="button-primary">Sauvegarder</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
