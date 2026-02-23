"use client";

import React from 'react';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
    // Numéro configuré (peut être récupéré via un contexte si besoin de dynamisme total)
    const phone = "+22500000000";
    const message = encodeURIComponent("Bonjour Am-Into-U, j'aimerais avoir plus d'informations sur vos produits.");
    const whatsappUrl = `https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`;

    return (
        <div className={styles.whatsappWrapper}>
            <span className={styles.tooltip}>Besoin d'aide ?</span>
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
                title="Contactez-nous sur WhatsApp"
            >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.768-5.764-5.768zm3.393 8.204c-.146.411-.84.794-1.155.845-.224.037-.457.078-1.55-.363-1.4-.564-2.288-2.002-2.358-2.097-.07-.094-.571-.758-.571-1.445 0-.688.359-1.026.488-1.164.129-.138.281-.173.374-.173.095 0 .19 0 .272.004.088.004.208-.033.326.248.12.284.411 1.001.447 1.074.036.073.06.158.012.253-.048.096-.072.155-.144.238-.073.084-.153.187-.219.25-.074.07-.152.146-.065.295.087.148.388.641.832 1.036.571.507 1.052.664 1.201.738.149.074.235.061.323-.039.087-.1.373-.434.472-.583.099-.148.199-.125.336-.074.138.051.874.412 1.025.487.152.075.253.111.29.174.037.062.037.362-.109.773z" />
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 21.162c-5.052 0-9.162-4.11-9.162-9.162 0-5.051 4.11-9.162 9.162-9.162 5.051 0 9.162 4.111 9.162 9.162 0 5.052-4.111 9.162-9.162 9.162z" />
                </svg>
            </a>
        </div>
    );
}
