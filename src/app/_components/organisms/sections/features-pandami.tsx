"use client";

import { Container } from "@/app/_components/atoms/ui/container";
import FeaturesIcon from '@/app/_components/atoms/svg/features-icon';
import Image from "next/image";

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

                    <div className="relative w-full bg-white border border-gray-200 rounded-2xl items-center shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col min-h-[550px] lg:min-h-[600px] pt-8 px-4">
                        <div className="z-10 w-full lg:w-[300px]">

                            {/* Div dos ícones e status - inicio */}
                            <div className="pb-4 flex flex-row items-center justify-between">
                                <FeaturesIcon status="visagism" />

                                {/* Badge de status - inicio */}
                                {/*<div className="py-2 px-4 bg-yellow-100 flex flex-row gap-2 rounded-full">
                                    <img src="lp/images/features-pandami/indevelopment.png"
                                        width={16}
                                        height={16} />
                                    <p className="text-xs text-yellow-900">Em desenvolvimento</p>
                                </div>*/}
                                {/* Badge de status - fim */}

                            </div>
                            {/* Div dos ícones e status - Fim */}

                            <h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
                                {features[0].title}
                            </h3>
                            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                {features[0].description}
                            </p>
                        </div>

                        <Image
                            src={features[0].image}
                            alt="Sintonia Humana"
                            width={400}
                            height={300}
                            className="absolute bottom-0 w-full object-contain object-bottom "
                        />
                    </div>
                    {/* Card Visgaismo - Fim */}

                    {/* Card Site Profissional - Inicio */}

                    <div className="relative w-full bg-white border border-gray-200 rounded-2xl items-center shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col min-h-[550px] lg:min-h-[600px] pt-8 px-4">
                        <div className="z-10 w-full lg:w-[300px]">

                            {/* Div dos ícones e status - inicio */}
                            <div className="pb-4 flex flex-row items-center justify-between">
                                <FeaturesIcon status="website" />

                                {/* Badge de status - inicio */}
                                {/*<div className="py-2 px-4 bg-yellow-100 flex flex-row gap-2 rounded-full">
                                    <img src="lp/images/features-pandami/indevelopment.png"
                                        width={16}
                                        height={16} />
                                    <p className="text-xs text-yellow-900">Em desenvolvimento</p>
                                </div>*/}
                                {/* Badge de status - fim */}


                            </div>
                            {/* Div dos ícones e status - Fim */}

                            <h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
                                {features[1].title}
                            </h3>
                            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                {features[1].description}
                            </p>
                        </div>

                        <Image
                            src={features[1].image}
                            alt="Sintonia Humana"
                            width={400}
                            height={300}
                            className="absolute bottom-0 w-full object-contain object-bottom " />
                    </div>

                    {/* Card Site Profissional - Fim */}


                    {/* Card Dashboard - Inicio */}

                    <div className="relative w-full bg-white border border-gray-200 rounded-2xl items-center shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col min-h-[550px] lg:min-h-[600px] pt-8 px-4">
                        <div className="z-10 w-full lg:w-[300px]">

                            {/* Div dos ícones e status - inicio */}
                            <div className="pb-4 flex flex-row items-center justify-between">
                                <FeaturesIcon status="dashboard" />

                                {/* Badge de status - inicio */}
                                {/*<div className="py-2 px-4 bg-yellow-100 flex flex-row gap-2 rounded-full">
                                    <img src="lp/images/features-pandami/indevelopment.png"
                                        width={16}
                                        height={16} />
                                    <p className="text-xs text-yellow-900">Em desenvolvimento</p>
                                </div>*/}
                                {/* Badge de status - fim */}


                            </div>
                            {/* Div dos ícones e status - Fim */}

                            <h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
                                {features[2].title}
                            </h3>
                            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                {features[2].description}
                            </p>
                        </div>

                        <Image
                            src={features[2].image}
                            alt="Sintonia Humana"
                            width={400}
                            height={300}
                            className="absolute bottom-0 w-full object-contain object-bottom " />
                    </div>


                </div>
                {/* Segunda linha de cards */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6 lg:mb-8">
                    {/* Card Formatos de rosto */}

                    <div className="relative w-full bg-white border border-gray-200 rounded-2xl items-center shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col min-h-[550px] lg:min-h-[600px] pt-8 px-4">
                        <div className="z-10 w-full">

                            {/* Div dos ícones e status - inicio */}
                            <div className="pb-4 flex flex-row items-center justify-between">
                                <FeaturesIcon status="faceformat" />

                            </div>
                            {/* Div dos ícones e status - Fim */}

                            <h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
                                {features[3].title}
                            </h3>
                            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                {features[3].description}
                            </p>
                        </div>

                        <Image
                            src={features[3].image}
                            alt="Sintonia Humana"
                            width={400}
                            height={300}
                            className="absolute bottom-0 w-full object-contain object-bottom " />
                    </div>
                    {/* Card Catalogo de cortes */}

                    <div className="relative w-full bg-white border border-gray-200 rounded-2xl items-center shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col min-h-[550px] lg:min-h-[600px] pt-8 px-4">
                        <div className="z-10 w-full">

                            {/* Div dos ícones e status - inicio */}
                            <div className="pb-4 flex flex-row items-center justify-between">
                                <FeaturesIcon status="cutcatalog" />
                            </div>
                            {/* Div dos ícones e status - Fim */}

                            <h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
                                {features[4].title}
                            </h3>
                            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                {features[4].description}
                            </p>
                        </div>

                        <Image
                            src={features[4].image}
                            alt="Sintonia Humana"
                            width={400}
                            height={300}
                            className="absolute bottom-0 w-full object-contain object-bottom " />
                    </div>

                </div>

                {/* Linha 3 - Inicio */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6 lg:mb-8">
                    {/* Card CRM - Inicio */}

                    <div className="relative w-full bg-white border border-gray-200 rounded-2xl items-center shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col min-h-[550px] lg:min-h-[600px] pt-8 px-4">
                        <div className="z-10 w-full lg:w-[300px]">

                            {/* Div dos ícones e status - inicio */}
                            <div className="pb-4 flex flex-row items-center justify-between">
                                <FeaturesIcon status="visagism" />

                                {/* Badge de status - inicio */}
                                <div className="py-2 px-4 bg-yellow-100 flex flex-row gap-2 rounded-full">
                                    <img src="lp/images/features-pandami/indevelopment.png"
                                        width={16}
                                        height={16} />
                                    <p className="text-xs text-yellow-900">Em desenvolvimento</p>
                                </div>
                                {/* Badge de status - fim */}

                            </div>
                            {/* Div dos ícones e status - Fim */}

                            <h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
                                {features[5].title}
                            </h3>
                            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                {features[5].description}
                            </p>
                        </div>

                        <Image
                            src={features[5].image}
                            alt="Sintonia Humana"
                            width={400}
                            height={300}
                            className="absolute bottom-0 w-full object-contain object-bottom " />
                    </div>
                    {/* Card CRM - Fim */}

                    {/* Card Afiliados  - Inicio */}

                    <div className="relative w-full bg-white border border-gray-200 rounded-2xl items-center shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col min-h-[550px] lg:min-h-[600px] pt-8 px-4">
                        <div className="z-10 w-full lg:w-[300px]">

                            {/* Div dos ícones e status - inicio */}
                            <div className="pb-4 flex flex-row items-center justify-between">
                                <FeaturesIcon status="affiliated" />

                                {/* Badge de status - inicio */}
                                <div className="py-2 px-4 bg-yellow-100 flex flex-row gap-2 rounded-full">
                                    <img src="lp/images/features-pandami/indevelopment.png"
                                        width={16}
                                        height={16} />
                                    <p className="text-xs text-yellow-900">Em desenvolvimento</p>
                                </div>
                                {/* Badge de status - fim */}


                            </div>
                            {/* Div dos ícones e status - Fim */}

                            <h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
                                {features[6].title}
                            </h3>
                            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                {features[6].description}
                            </p>
                        </div>

                        <Image
                            src={features[6].image}
                            alt="Sintonia Humana"
                            width={400}
                            height={300}
                            className="absolute left-2.5 bottom-0 w-full object-contain object-bottom " />
                    </div>
                    {/* Card Afiliados  - Fim */}

                    {/* Card Agendamento  - Inicio */}

                    <div className="relative w-full bg-white border border-gray-200 rounded-2xl items-center shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col min-h-[550px] lg:min-h-[600px] pt-8 px-4">
                        <div className="z-10 w-full lg:w-[300px]">

                            {/* Div dos ícones e status - inicio */}
                            <div className="pb-4 flex flex-row items-center justify-between">
                                <FeaturesIcon status="dashboard" />

                                {/* Badge de status - inicio */}
                                <div className="py-2 px-4 bg-yellow-100 flex flex-row gap-2 rounded-full">
                                    <img src="lp/images/features-pandami/indevelopment.png"
                                        width={16}
                                        height={16} />
                                    <p className="text-xs text-yellow-900">Em desenvolvimento</p>
                                </div>
                                {/* Badge de status - fim */}


                            </div>
                            {/* Div dos ícones e status - Fim */}

                            <h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
                                {features[7].title}
                            </h3>
                            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                {features[7].description}
                            </p>
                        </div>

                        <Image
                            src={features[7].image}
                            alt="Sintonia Humana"
                            width={400}
                            height={300}
                            className="absolute bottom-0 w-full object-contain object-bottom " />
                    </div>

                    {/* Card Agendamento  - Fim */}

                    {/* Linha 3 - fim */}


                </div>

            </Container>

        </section>
    );
}
