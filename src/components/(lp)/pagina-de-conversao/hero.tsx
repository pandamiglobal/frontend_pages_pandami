import { lazy, Suspense } from "react";
import LoadingFallback from "../ui/loading-fall-back";
import { Clock, Shield } from "lucide-react";

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

export default function Hero() {
    return (
        <section className="py-16 md:py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <Suspense fallback={<LoadingFallback />}>
                            <AnimatedElement animation="fadeInLeft" delay={0.4}>
                                <h1 className="text-center md:text-start text-4xl md:text-4xl font-bold tracking-tight mb-6 font-heading">
                                    <span className="text-primary">Descubra</span> agora se sua
                                    marca é registravel
                                </h1>
                            </AnimatedElement>
                        </Suspense>
                        <span className="w-full text-center md:text-start text-gray-600 mb-5 md:w-[70%]">
                            Não fique para trás, sem uma análise prévia, as chances de
                            aprovação do seu registro caem consideravelmente
                        </span>
                    </div>
                    <Suspense fallback={<LoadingFallback />}>
                        <AnimatedElement animation="fadeInUp" delay={1}>
                            <div className="block">
                                <GlowButton
                                    size="lg"
                                    className="text-lg py-6 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-primary transition-all duration-300 shadow-lg"
                                    onClick={() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })}
                                >
                                    QUERO MINHA CONSULTA GRATUITA
                                </GlowButton>

                                {/* Trust indicators */}
                                <div className="flex items-center mt-4 text-sm text-slate-600">
                                    <Shield className="h-4 w-4 mr-1 text-primary" />
                                    <span className="mr-4">Consulta 100% gratuita</span>
                                    <Clock className="h-4 w-4 mr-1 text-primary" />
                                    <span>Resposta em até 42h</span>
                                </div>
                            </div>
                        </AnimatedElement>
                    </Suspense>
                </div>
            </div>
        </section>
    )
}