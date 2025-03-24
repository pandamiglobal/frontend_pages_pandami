'use client'

import { useEffect } from 'react';

export default function ContatoAtendente() {
    const whatsappLink = 'https://wa.me/4888793250';

    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = whatsappLink;
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f0f2f5]">
            <div className="text-center p-8">
                <div className="w-[50px] h-[50px] border-4 border-[#f3f3f3] border-t-[#25D366] rounded-full animate-spin mx-auto mb-8"></div>
                <h1 className="text-[#333] text-2xl mb-4">Redirecionando você para um atendente</h1>
                <p className="text-[#666] text-base">Por favor, aguarde...</p>
            </div>
        </div>
    );
}