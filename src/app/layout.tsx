import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "../context/CartContext";
import { CurrencyProvider } from "../context/CurrencyContext";
import { ProductProvider } from "../context/ProductContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Am-Into-U Trading | Épices, Bijoux & Parfums Premium",
  description: "Découvrez notre sélection exclusive d'épices raffinées, de bijoux élégants et de parfums envoûtants. Qualité premium et livraison internationale.",
  keywords: ["épices bio", "bijoux artisanaux", "parfums authentiques", "am-into-u", "commerce en ligne", "luxe", "afrique", "europe"],
  authors: [{ name: "Am-Into-U Trading" }],
  openGraph: {
    title: "Am-Into-U Trading - Premium Store",
    description: "L'excellence en matière d'Épices, Bijoux & Parfums.",
    url: "https://am-into-u.com",
    siteName: "Am-Into-U Trading",
    images: [
      {
        url: "/og-image.jpg", // Image d'aperçu pour les réseaux sociaux
        width: 1200,
        height: 630,
        alt: "Am-Into-U Trading - Boutique Premium",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Am-Into-U Trading",
    description: "Découvrez notre sélection exclusive d'épices, de bijoux et de parfums.",
    images: ["/og-image.jpg"],
  },
  manifest: '/manifest.json', // Lien vers le fichier PWA
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="light">
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ProductProvider>
          <CurrencyProvider>
            <CartProvider>
              <Header />
              <CartDrawer />
              <div style={{ flex: 1 }}>
                {children}
              </div>
              <Footer />
            </CartProvider>
          </CurrencyProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
