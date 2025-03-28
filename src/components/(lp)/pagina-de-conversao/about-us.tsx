import { Suspense } from "react";
import LoadingFallback from "../ui/loading-fall-back";
import { AnimatedElement } from "../ui/animated-element";
import { GradientText } from "../ui/gradient-text";
import Image from "next/image";
import { CheckCircle2, Clock, Scale, Shield } from "lucide-react";

export default function AboutUs() {
    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <Suspense fallback={<LoadingFallback />}>
                    <AnimatedElement animation="fadeInUp" scrollTrigger={true}>
                        <div className="text-center mb-12">
                            <GradientText
                                text="Prazer, somos a 3PI"
                                className="text-5xl font-bold mb-4 font-heading"
                                colors={["#0055FF", "#4F46E5", "#6D28D9", "#0055FF"]}
                            />
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Conheça a empresa referência que há mais de 18 anos protege o
                                patrimônio intelectual de empresas em todo o Brasil
                            </p>
                        </div>
                    </AnimatedElement>
                </Suspense>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <Suspense fallback={<LoadingFallback />}>
                        <AnimatedElement
                            animation="fadeInLeft"
                            delay={0.2}
                            scrollTrigger={true}
                        >
                            <div className="relative">
                                <div className="relative rounded-lg overflow-hidden shadow-xl">
                                    <Image
                                        src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600"
                                        alt="Equipe 3PI em reunião"
                                        width={1000}
                                        height={1000}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <p className="font-medium text-lg">
                                            Nossa sede em Florianópolis
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full">
                                            <Shield className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500">Desde</p>
                                            <p className="text-xl font-bold text-primary">2005</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedElement>
                    </Suspense>

                    <Suspense fallback={<LoadingFallback />}>
                        <AnimatedElement
                            animation="fadeInRight"
                            delay={0.4}
                            scrollTrigger={true}
                        >
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                        Nossa História
                                    </h3>
                                    <p className="text-slate-600">
                                        Fundada em 2005 por um grupo de advogados especialistas em
                                        propriedade intelectual, a 3PI nasceu com a missão de
                                        tornar o processo de registro de marcas mais acessível e
                                        eficiente para empresas de todos os portes.
                                    </p>
                                    <p className="text-slate-600 mt-2">
                                        Ao longo de quase duas décadas, desenvolvemos metodologias
                                        exclusivas que aumentam significativamente as chances de
                                        aprovação de marcas no INPI, consolidando nossa posição
                                        como referência no mercado.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                        Nossa Missão
                                    </h3>
                                    <p className="text-slate-600">
                                        Proteger o patrimônio intelectual de nossos clientes com
                                        excelência, ética e eficiência, contribuindo para o
                                        desenvolvimento sustentável dos negócios e da economia
                                        criativa no Brasil.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Shield className="h-5 w-5 text-primary" />
                                            <h4 className="font-bold text-slate-900">
                                                Experiência
                                            </h4>
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            Mais de 7.000 marcas registradas com sucesso em diversos
                                            segmentos
                                        </p>
                                    </div>

                                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                            <h4 className="font-bold text-slate-900">Aprovação</h4>
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            99% de taxa de aprovação na primeira tentativa
                                        </p>
                                    </div>

                                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Scale className="h-5 w-5 text-primary" />
                                            <h4 className="font-bold text-slate-900">Equipe</h4>
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            Advogados especialistas em propriedade intelectual
                                        </p>
                                    </div>

                                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="h-5 w-5 text-primary" />
                                            <h4 className="font-bold text-slate-900">Agilidade</h4>
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            Processos otimizados para reduzir o tempo de registro
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedElement>
                    </Suspense>
                </div>
            </div>
        </section>
    )
}