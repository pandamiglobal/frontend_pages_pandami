export default {
    title: 'Visagismo com IA | PandaMi',
    blog_title: 'Blog | PandaMi',
    description: 'Registre e proteja sua marca. Gere leads qualificados com nossa solução completa para negócios B2B. 🚀 Aumente sua competitividade com monitoramento inteligente e registro de marca eficiente!',
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: process.env.NEXT_PUBLIC_SITE_URL,
        title: 'Você está perdendo oportunidades de negócio sem saber!',
        description: 'E se eu te dissesse que é possível gerar leads B2B qualificados enquanto sua marca fica protegida contra concorrentes e uso indevido?',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}registro-monitoria-e-prospeccao-de-leads-pppi.png`,
                width: 1200,
                height: 630,
                alt: 'Registro de marca, monitoria e prospecção de leads B2B. PPPI'
            }
        ],
    },
    // twitter: {
    //     handle: '@meuusuario',
    //     site: '@meusite',
    //     cardType: 'summary_large_image',
    // },
};
