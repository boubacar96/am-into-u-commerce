"use client";

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminSettings() {
    const [mounted, setMounted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // States Settings
    const [storeName, setStoreName] = useState('Am-Into-U Trading');
    const [contactEmail, setContactEmail] = useState('contact@am-into-u.com');
    const [whatsappNumber, setWhatsappNumber] = useState('+225 00000000');
    const [currency, setCurrency] = useState('EUR');

    // Design states
    const [themeMode, setThemeMode] = useState('light');

    useEffect(() => {
        // Charger Settings fictifs ou depuis memory si on voulait
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulation sauvegarde Global
        setTimeout(() => {
            setIsSaving(false);
            alert('Paramètres enregistrés avec succès. (Simulation Front-end)');
        }, 1000);
    }

    return (
        <div>
            <div className={styles.header} style={{ marginBottom: '2rem' }}>
                <h2 className={styles.title} style={{ fontSize: '1.8rem' }}>Paramètres de la Boutique</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>

                {/* Menu de navigation des paramètres */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Général</div>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}>Paiements</div>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}>Livraison</div>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}>Notifications Email</div>
                </div>

                {/* Formulaire Principal "Général" */}
                <div style={{ backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2rem' }}>
                    <form onSubmit={handleSave}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Informations de la boutique</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>Nom de la boutique</label>
                                    <input
                                        type="text" className="input" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                        value={storeName} onChange={e => setStoreName(e.target.value)} required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>E-mail de contact client</label>
                                    <input
                                        type="email" className="input" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                        value={contactEmail} onChange={e => setContactEmail(e.target.value)} required
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>Numéro WhatsApp (Réception des Commandes)</label>
                                <input
                                    type="tel" className="input" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                    value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} required
                                />
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px' }}>Ce numéro recevra les commandes des clients choisissant "Paiement à la livraison".</p>
                            </div>

                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Préférences Globales</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>Devise de Référence Administrative</label>
                                    <select
                                        className="input" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                        value={currency} onChange={e => setCurrency(e.target.value)}
                                    >
                                        <option value="EUR">Euro (€)</option>
                                        <option value="XAF">Franc CFA (XAF)</option>
                                        <option value="USD">Dollar Américain ($)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>Thème Front-office par Défaut</label>
                                    <select
                                        className="input" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                        value={themeMode} onChange={e => setThemeMode(e.target.value)}
                                    >
                                        <option value="light">Clair (Light Mode)</option>
                                        <option value="dark">Sombre (Dark Mode - Luxe)</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <button type="submit" className="button-primary" style={{ padding: '0.8rem 2rem' }} disabled={isSaving}>
                                    {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
