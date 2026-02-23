"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../components/ProductCard';

interface ProductContextType {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    getProductsByCategory: (category: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const DEFAULT_PRODUCTS: Product[] = [
    // Épices
    {
        id: 1,
        name: "Safran de Taliouine - Grade A",
        price: 20000,
        category: "Épices Rares",
        image: "/assets/images/luxury_saffron_packaging_1771871590753.png",
        badge: "Rare",
        description: "Récolté à la main dans les montagnes du Maroc, notre safran de Grade A offre une concentration en safranal inégalée. Idéal pour vos risottos et pâtisseries fines.",
        stock: 50,
        status: 'instock'
    },
    { id: 4, name: "Poivre Noir de Sarawak", price: 10000, category: "Épices", icon: "🌶️", badge: "Bio", stock: 120, status: "instock", description: "Un poivre puissant aux notes boisées et fruitées." },

    // Bijoux
    {
        id: 2,
        name: "Bague 'Soleil d'Or' 18k",
        price: 120000,
        category: "Bijoux",
        image: "/assets/images/african_minimalist_jewelry_1771871344071.png",
        badge: "Best-seller",
        description: "Une bague minimaliste en or 18 carats, inspirée par les couchers de soleil du Sahara. Design pur et intemporel.",
        stock: 15,
        status: 'instock'
    },
    { id: 5, name: "Collier Goutte d'Or", price: 95000, category: "Bijoux", icon: "✨", stock: 25, status: "instock", description: "Élégance discrète pour ce collier en or pur." },

    // Parfums
    {
        id: 3,
        name: "Oud Mystérieux Absolu 50ml",
        price: 80000,
        oldPrice: 100000,
        category: "Parfums",
        image: "/assets/images/luxury_oud_perfume_bottle_1771871462941.png",
        badge: "-20%",
        description: "Un sillage intense et boisé mêlant le précieux bois de Oud aux notes chaudes de l'ambre et du santal.",
        stock: 45,
        status: 'instock'
    },
    { id: 6, name: "Rose Noir Extrait 30ml", price: 65000, category: "Parfums", icon: "💧", stock: 30, status: "instock", description: "Une rose mystique, sombre et envoûtante." },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const storedProducts = localStorage.getItem('ami-admin-products');
        if (storedProducts) {
            try {
                const parsed = JSON.parse(storedProducts);
                // Harmonisation des prix au cas où ils seraient stockés en string
                const formatted = parsed.map((p: any) => ({
                    ...p,
                    price: typeof p.price === 'string' ? parseFloat(p.price.replace(',', '.').replace(/[^\d.]/g, '')) : p.price
                }));
                setProducts(formatted);
            } catch (e) {
                setProducts(DEFAULT_PRODUCTS);
            }
        } else {
            setProducts(DEFAULT_PRODUCTS);
            localStorage.setItem('ami-admin-products', JSON.stringify(DEFAULT_PRODUCTS));
        }
        setMounted(true);
    }, []);

    const getProductsByCategory = (category: string) => {
        // Match partial category names (e.g. 'Bijoux' matches 'Bijoux Homme')
        return products.filter(p => p.category && p.category.toLowerCase().includes(category.toLowerCase()));
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, getProductsByCategory }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
