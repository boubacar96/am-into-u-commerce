"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'EUR' | 'XAF' | 'USD';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (c: Currency) => void;
    formatPrice: (priceInEur: number) => string;
    convertPrice: (priceInEur: number) => number;
}

// Taux de change fictifs (Base EUR)
const EXCHANGE_RATES: Record<Currency, number> = {
    EUR: 1,
    XAF: 655.96, // 1 EUR = ~655.96 FCFA
    USD: 1.08,   // 1 EUR = ~1.08 USD
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>('EUR');
    const [isInitialized, setIsInitialized] = useState(false);

    // Charger la devise depuis le localStorage au démarrage
    useEffect(() => {
        try {
            const savedCurrency = localStorage.getItem('ami-currency') as Currency;
            if (savedCurrency && EXCHANGE_RATES[savedCurrency]) {
                setCurrencyState(savedCurrency);
            }
        } catch (error) {
            console.error("Erreur chargement devise:", error);
        }
        setIsInitialized(true);
    }, []);

    const setCurrency = (newCurrency: Currency) => {
        setCurrencyState(newCurrency);
        if (isInitialized) {
            localStorage.setItem('ami-currency', newCurrency);
        }
    };

    const convertPrice = (priceInEur: number) => {
        return priceInEur * EXCHANGE_RATES[currency];
    };

    const formatPrice = (priceInEur: number): string => {
        const converted = convertPrice(priceInEur);

        switch (currency) {
            case 'XAF':
                // Le FCFA n'affiche généralement pas de centimes et s'écrit avec des espaces (ex: 15 000 FCFA)
                return `${Math.round(converted).toLocaleString('fr-FR')} FCFA`;
            case 'USD':
                // Le dollar s'affiche généralement avec le symbole avant et un point (ex: $15.50)
                return `$${converted.toFixed(2)}`;
            case 'EUR':
            default:
                // L'euro s'affiche avec une virgule et le symbole après (ex: 15,50 €)
                return `${converted.toFixed(2).replace('.', ',')} €`;
        }
    };

    return (
        <CurrencyContext.Provider value={{
            currency,
            setCurrency,
            formatPrice,
            convertPrice
        }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
