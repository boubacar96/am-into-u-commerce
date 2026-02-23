import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Am-Into-U Trading - Épices, Bijoux & Parfums Premium',
        short_name: 'Am-Into-U',
        description: 'Découvrez notre sélection exclusive d\'épices raffinées, de bijoux élégants et de parfums envoûtants.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#d4af37',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
