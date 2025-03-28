import { Suspense } from "react";
import LoadingFallback from "../ui/loading-fall-back";
import { AnimatedElement } from "../ui/animated-element";
import { Badge } from "lucide-react";
import { CaseStudies } from "../ui/case-studies";

export default function PersonalizedTestimonials() {
    return (
        <section className="py-16 bg-slate-50">
            <Suspense fallback={<LoadingFallback />}>
                <AnimatedElement animation="fadeInUp" scrollTrigger={true}>
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-8">
                            <Badge
                                className="mb-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border-primary/20"
                            >
                                CASOS DE SUCESSO
                            </Badge>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 font-heading">
                                Histórias reais de clientes
                            </h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Veja como ajudamos empresas a superar desafios no registro de
                                suas marcas
                            </p>
                        </div>
                        <CaseStudies />
                    </div>
                </AnimatedElement>
            </Suspense>
        </section>
    )
}