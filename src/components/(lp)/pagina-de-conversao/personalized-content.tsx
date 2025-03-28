'use client'

import { lazy, Suspense, useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    CheckCircle2,
    ArrowRight,
    Shield,
    AlertTriangle,
    Badge,
} from "lucide-react";
import LoadingFallback from "../ui/loading-fall-back";

const AnimatedElement = lazy(() =>
    import("@/components/(lp)/ui/animated-element").then((mod) => ({
        default: mod.AnimatedElement,
    }))
);

const GlowButton = lazy(() =>
    import("@/components/(lp)/ui/glow-button").then((mod) => ({
        default: mod.GlowButton,
    }))
);

export default function PersonalizedContent() {
    const [showPersonalizedContent, setShowPersonalizedContent] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
 
    const getIndustryName = (industryId: string | null): string => {
        switch (industryId) {
            case "tech":
                return "Tecnologia";
            case "retail":
                return "Varejo";
            case "food":
                return "Alimentação";
            case "health":
                return "Saúde";
            case "education":
                return "Educação";
            case "logistics":
                return "Logística";
            case "creative":
                return "Criativo";
            case "corporate":
                return "Corporativo";
            case "fashion":
                return "Moda";
            default:
                return "seu setor";
        }
    };

    const getIndustryChallenges = (industryId: string | null): string[] => {
        switch (industryId) {
            case "tech":
                return [
                    "Alta competitividade e rápida evolução do mercado",
                    "Nomes genéricos ou descritivos comuns no setor",
                    "Conflitos com patentes e direitos autorais",
                    "Expansão internacional com diferentes legislações",
                ];
            case "retail":
                return [
                    "Marcas similares em diferentes categorias de produtos",
                    "Dificuldade em proteger elementos visuais distintivos",
                    "Conflitos com grandes varejistas",
                    "Proteção de marcas próprias e linhas de produtos",
                ];
            case "food":
                return [
                    "Nomes descritivos difíceis de registrar",
                    "Conflitos com marcas regionais não registradas",
                    "Proteção de receitas e processos exclusivos",
                    "Expansão para delivery e produtos embalados",
                ];
            default:
                return [
                    "Conflitos com marcas similares no mesmo segmento",
                    "Dificuldade em comprovar distintividade da marca",
                    "Documentação incompleta ou incorreta",
                    "Classificação inadequada de produtos e serviços",
                ];
        }
    };

    const getIndustrySolutions = (industryId: string | null): string[] => {
        switch (industryId) {
            case "tech":
                return [
                    "Análise especializada em marcas de tecnologia",
                    "Estratégias para proteção de software e hardware",
                    "Monitoramento contínuo de novos registros no setor",
                    "Consultoria para expansão internacional segura",
                ];
            case "retail":
                return [
                    "Proteção abrangente em múltiplas classes de produtos",
                    "Estratégias para registro de elementos visuais distintivos",
                    "Monitoramento de grandes varejistas e concorrentes",
                    "Consultoria para desenvolvimento de marcas próprias",
                ];
            case "food":
                return [
                    "Estratégias para registro de nomes descritivos",
                    "Pesquisa abrangente de marcas regionais não registradas",
                    "Proteção de trade dress e elementos visuais",
                    "Consultoria para expansão de canais de venda",
                ];
            default:
                return [
                    "Análise prévia completa de disponibilidade",
                    "Estratégias personalizadas para seu segmento",
                    "Documentação correta e classificação adequada",
                    "Monitoramento contínuo após o registro",
                ];
        }
    };

    return (
        <>
            {showPersonalizedContent && (
                <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="container mx-auto px-4 md:px-6">
                        <Suspense fallback={<LoadingFallback />}>
                            <AnimatedElement animation="fadeInUp" scrollTrigger={true}>
                                <div className="text-center mb-8">
                                    <Badge
                                        className="mb-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border-primary/20"
                                    >
                                        CONTEÚDO PERSONALIZADO
                                    </Badge>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">
                                        Soluções exclusivas para o setor de{" "}
                                        {getIndustryName(selectedIndustry)}
                                    </h2>
                                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                                        Veja como podemos ajudar especificamente empresas do seu
                                        setor a proteger suas marcas
                                    </p>
                                </div>
                            </AnimatedElement>
                        </Suspense>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <Suspense fallback={<LoadingFallback />}>
                                <AnimatedElement
                                    animation="fadeInLeft"
                                    delay={0.2}
                                    scrollTrigger={true}
                                >
                                    <Card className="border-0 shadow-md hover:shadow-xl transition-all">
                                        <CardContent className="p-6">
                                            <div className="flex items-center mb-4">
                                                <div className="p-2 rounded-full bg-amber-100 mr-3">
                                                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900">
                                                    Desafios comuns no setor de{" "}
                                                    {getIndustryName(selectedIndustry)}
                                                </h3>
                                            </div>
                                            <ul className="space-y-3">
                                                {getIndustryChallenges(selectedIndustry).map(
                                                    (challenge, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                                            <span className="text-slate-700">
                                                                {challenge}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </AnimatedElement>
                            </Suspense>

                            <Suspense fallback={<LoadingFallback />}>
                                <AnimatedElement
                                    animation="fadeInRight"
                                    delay={0.4}
                                    scrollTrigger={true}
                                >
                                    <Card className="border-0 shadow-md hover:shadow-xl transition-all">
                                        <CardContent className="p-6">
                                            <div className="flex items-center mb-4">
                                                <div className="p-2 rounded-full bg-green-100 mr-3">
                                                    <Shield className="h-6 w-6 text-green-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900">
                                                    Nossas soluções para{" "}
                                                    {getIndustryName(selectedIndustry)}
                                                </h3>
                                            </div>
                                            <ul className="space-y-3">
                                                {getIndustrySolutions(selectedIndustry).map(
                                                    (solution, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                            <span className="text-slate-700">{solution}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </AnimatedElement>
                            </Suspense>
                        </div>

                        <div className="mt-8 text-center">
                            <Suspense fallback={<LoadingFallback />}>
                                <GlowButton
                                    onClick={() =>
                                        document
                                            .getElementById("form-section")
                                            ?.scrollIntoView({ behavior: "smooth" })
                                    }
                                    className="bg-gradient-to-r from-[#0057FF] to-[#007BFF] hover:from-[#0044CC] hover:to-[#0066CC] shadow-md"
                                >
                                    Solicitar análise personalizada para{" "}
                                    {getIndustryName(selectedIndustry)}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </GlowButton>
                            </Suspense>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}