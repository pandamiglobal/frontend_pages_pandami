'use client'

import { useEffect } from 'react';
import styles from '../../../../styles/loading.css';

export default function ContatoAtendente() {
    const whatsappLink = 'https://wa.me/4888793250';

    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = whatsappLink;
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.container} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center'
        }}>
            <div className={styles.content}>
                <div className={styles.loadingSpinner}></div>
                <h1>Redirecionando você para um atendente</h1>
                <p>Por favor, aguarde...</p>
            </div>
        </div>
    );
}