import Link from 'next/link';
import styles from './page.module.css';

export default function SuccessPage() {
    return (
        <main className="container">
            <div className={styles.successPage}>
                <div className={styles.iconWrapper}>
                    <span className={styles.checkIcon}>✓</span>
                </div>

                <h1 className={`premium-title ${styles.title}`}>Commande confirmée !</h1>

                <p className={styles.message}>
                    Merci pour votre achat. Votre commande <strong>#AMI-{Math.floor(Math.random() * 100000)}</strong> a bien été enregistrée.
                </p>

                <div className={styles.detailsBox}>
                    <p>Un e-mail de confirmation contenant les détails de votre commande vous a été envoyé.</p>
                    <p>Vous pourrez suivre l'état de votre livraison depuis votre espace client.</p>
                </div>

                <div className={styles.actions}>
                    <Link href="/shop" className="button-primary">
                        Continuer mes achats
                    </Link>
                    <Link href="/" className="button-outline">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </main>
    );
}
