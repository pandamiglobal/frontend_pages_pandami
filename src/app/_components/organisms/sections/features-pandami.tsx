"use client";

import { Container } from "@/app/_components/atoms/ui/container";
import FeaturesIcon from '@/app/_components/atoms/svg/features-icon';
import { FeatureCard } from "../../molecules/feature-card";

export function FeaturesPandami() {
    const features = [
        {
            title: "Visagismo com IA",
            description:
                "IA que analisa 47 pontos do rosto e sugere os cortes que mais valorizam cada cliente. Elimina tentativa e erro. Você apresenta sugestões personalizadas com segurança total.",
            image: "/lp/images/features-pandami/visagism_feature_ai.png",
        },
        {
            title: "Site profissional",
            description:
                "Crie uma página com seus serviços, contato, redes sociais e cortes realizados. Compartilhe em qualquer lugar e facilite para o cliente encontrar tudo sobre você.",
            image: "/lp/images/features-pandami/website_feature.png",
        },
        {
            title: "Dashboard completo",
            description:
                "Visualize clientes, históricos, relatórios e informações importantes em um só lugar. Anote preferências de conversa e estilos favoritos de cada cliente.",
            image: "/lp/images/features-pandami/dashboard_feature.png",
        },
        {
            title: "Formatos de rosto",
            description:
                'Consulte rapidamente as combinações ideais entre formato de rosto e cortes para cada cliente.',
            image: "/lp/images/features-pandami/face_format_feature.png",
        },
        {
            title: "Catalogo de cortes",
            description:
                'Apresente opções profissionais aos clientes com nosso banco completo de referências masculinas e femininas.',
            image: "/lp/images/features-pandami/cut_catalog_feature.png",
        },
        {
            title: "CRM",
            description:
                'Controle financeiro integrado com histórico de clientes, cálculo automático de comissões, programa de fidelidade e relatórios gerenciais. Tudo para você ter o negócio sob controle.',
            image: "/lp/images/features-pandami/crm_feature.png",
        },
        {
            title: "Seja um afiliado",
            description:
                'Torne-se afiliado dos produtos PandaMI e ganhe comissão em cada venda realizada aos seus clientes.',
            image: "/lp/images/features-pandami/affiliated_feature.png",
        },
        {
            title: "Agendamento",
            description:
                'Seus clientes agendam online 24/7 e você recebe notificações automáticas. Sem ligações, sem WhatsApp lotado, sem esquecimentos.',
            image: "/lp/images/features-pandami/booking_feature.png",
        },
    ];

    return (
        <section id="features" className="w-full pb-10 pt-24 lg:pb-14 bg-neutral-50">
            <Container>
                {/* Informações da Section */}
                <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-2   text-stone-900">
                    Somos a única ferramenta que você precisa </h2>
                <p className="text-center text-gray-600 max-w-4xl mx-auto mb-12 lg:mb-8 px-4 lg:px-0">
                    Chega de usar um app para agendar, outro para análise facial, uma planilha para finanças e o Instagram como portfólio. Reunimos tudo em uma plataforma e em uma assinatura.
                </p>

                {/* Primeira linha de cards */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6 lg:mb-8">
                    {/* Card Visagismo - Inicio */}

                    <FeatureCard
                        title="Visagismo com IA"
                        description="IA que analisa 47 pontos do rosto e sugere os cortes que mais valorizam cada cliente. Elimina tentativa e erro. Você apresenta sugestões personalizadas com segurança total."
                        image={{
                            src: "/lp/images/features-pandami/visagism_feature_ai.png",
                            alt: "Visagismo com IA",
                        }}
                        Icon={<FeaturesIcon status="visagism" />}
                    />


                    {/* Card Visgaismo - Fim */}

                    {/* Card Site Profissional - Inicio */}

                    <FeatureCard
                        title="Site profissional"
                        description="Crie uma página com seus serviços, contato, redes sociais e cortes realizados. Compartilhe em qualquer lugar e facilite para o cliente encontrar tudo sobre você."
                        image={{
                            src: "/lp/images/features-pandami/website_feature.png",
                            alt: "Site profissional",
                        }}
                        Icon={<FeaturesIcon status="website" />}
                    />

                    {/* Card Site Profissional - Fim */}


                    {/* Card Dashboard - Inicio */}

                    <FeatureCard
                        title="Dashboard completo"
                        description="Visualize clientes, históricos, relatórios e informações importantes em um só lugar. Anote preferências de conversa e estilos favoritos de cada cliente."
                        image={{
                            src: "/lp/images/features-pandami/dashboard_feature.png",
                            alt: "Dashboard completo",
                        }}
                        Icon={<FeaturesIcon status="dashboard" />}
                    />


                </div>
                {/* Segunda linha de cards */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6 lg:mb-8">
                    {/* Card Formatos de rosto */}

                    <FeatureCard
                        title="Formatos de rosto"
                        description="Consulte rapidamente as combinações ideais entre formato de rosto e cortes para cada cliente."
                        image={{
                            src: "/lp/images/features-pandami/face_format_feature.png",
                            alt: "Formatos de rosto",
                        }}
                        Icon={<FeaturesIcon status="faceformat" />}
                    />
                    {/* Card Catalogo de cortes */}

                    <FeatureCard
                        title="Catalogo de cortes"
                        description="Apresente opções profissionais aos clientes com nosso banco completo de referências masculinas e femininas."
                        image={{
                            src: "/lp/images/features-pandami/cut_catalog_feature.png",
                            alt: "Catalogo de cortes",
                        }}
                        Icon={<FeaturesIcon status="cutcatalog" />}
                    />

                </div>

                {/* Linha 3 - Inicio */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6 lg:mb-8">
                    {/* Card CRM - Inicio */}

                    <FeatureCard
                        title="CRM"
                        description="Controle financeiro integrado com histórico de clientes, cálculo automático de comissões, programa de fidelidade e relatórios gerenciais. Tudo para você ter o negócio sob controle."
                        image={{
                            src: "/lp/images/features-pandami/crm_feature.png",
                            alt: "CRM",
                        }}
                        Icon={<FeaturesIcon status="visagism" />}
                        badge={true}
                    />
                    {/* Card CRM - Fim */}

                    {/* Card Afiliados  - Inicio */}

                    <FeatureCard
                        title="Seja um afiliado"
                        description="Torne-se afiliado dos produtos PandaMI e ganhe comissão em cada venda realizada aos seus clientes."
                        image={{
                            src: "/lp/images/features-pandami/affiliated_feature.png",
                            alt: "Seja um afiliado",
                        }}
                        Icon={<FeaturesIcon status="affiliated" />}
                        badge={true}
                    />
                    {/* Card Afiliados  - Fim */}

                    {/* Card Agendamento  - Inicio */}

                    <FeatureCard
                        title="Agendamento"
                        description="Seus clientes agendam online 24/7 e você recebe notificações automáticas. Sem ligações, sem WhatsApp lotado, sem esquecimentos."
                        image={{
                            src: "/lp/images/features-pandami/booking_feature.png",
                            alt: "Agendamento",
                        }}
                        Icon={<FeaturesIcon status="dashboard" />}
                        badge={true}
                    />

                    {/* Card Agendamento  - Fim */}

                    {/* Linha 3 - fim */}


                </div>

            </Container>

        </section>
    );
}
