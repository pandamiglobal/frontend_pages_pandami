import { Suspense } from "react";
import LoadingFallback from "../ui/loading-fall-back";
import { AnimatedElement } from "../ui/animated-element";
import { RiskCalculatorSection } from "./risk-calculator";
import { Badge, CheckCircle2, Scale } from "lucide-react";
import { GradientText } from "../ui/gradient-text";
import { Card, CardContent } from "@/components/ui/card";

export default function Tool() {
    return (
        <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <Suspense fallback={<LoadingFallback />}>
                    <AnimatedElement
                        animation="fadeInUp"
                        delay={0.3}
                        scrollTrigger={true}
                    >
                        <div className="max-w-5xl mx-auto">
                            <Suspense fallback={<LoadingFallback />}>
                                <div className="text-center mb-8">
                                    <Badge
                                        className="mb-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border-primary/20"
                                    >
                                        TECNOLOGIA EXCLUSIVA DESENVOLVIDA PELA 3PI
                                    </Badge>
                                    <GradientText
                                        text="Utilize nossa Ferramenta Gratuita"
                                        className="text-5xl font-bold mb-4 font-heading"
                                        colors={["#0055FF", "#4F46E5", "#6D28D9", "#0055FF"]}
                                    />
                                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                        Nossa tecnologia e I.A. exclusiva e treinada da 3PI para avaliar as chances
                                        de aprovação da sua marca em apenas 30 segundos
                                    </p>
                                </div>
                            </Suspense>

                            <Suspense fallback={<LoadingFallback />}>
                                <div className="w-full mx-auto">
                                    <Card className="border shadow-md mb-4 hover:shadow-lg transition-all">
                                        <CardContent className="p-6">
                                            <div className="flex items-center mb-4">
                                                <div className="p-2 rounded-full bg-primary/10 mr-3">
                                                    <Scale className="h-6 w-6 text-primary" />
                                                </div>
                                                <h3 className="text-lg font-medium">Como avaliamos sua marca</h3>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-4">
                                                Nossa ferramenta analisa os principais fatores que influenciam a aprovação de uma marca no Brasil:
                                            </p>
                                            <ul className="text-sm text-slate-600 space-y-2 mb-4 benefit-list">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                    <span>Originalidade da marca (quanto mais única, melhor)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                    <span>Possíveis conflitos com marcas já existentes</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                    <span>Adequação às regras de registro brasileiras</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                    <span>Clareza e precisão da descrição da marca</span>
                                                </li>
                                            </ul>
                                            <div className="bg-primary/5 p-3 rounded-lg text-sm border border-primary/10">
                                                <p className="text-slate-700">
                                                    Esta avaliação inicial ajuda a identificar possíveis problemas antes de iniciar o processo oficial
                                                    de registro.
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Suspense fallback={<LoadingFallback />}>
                                        <RiskCalculatorSection />
                                    </Suspense>
                                </div>
                            </Suspense>
                        </div>
                    </AnimatedElement>
                </Suspense>
            </div>
        </section >
    )
}