import { Suspense } from "react";
import LoadingFallback from "../ui/loading-fall-back";
import { AnimatedElement } from "../ui/animated-element";
import { Badge } from "lucide-react";
import { GradientText } from "../ui/gradient-text";
import { GlowButton } from "../ui/glow-button";

export default function WhatsappTestimonials() {
    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <Suspense fallback={<LoadingFallback />}>
                    <AnimatedElement animation="fadeInUp" scrollTrigger={true}>
                        <div className="text-center mb-12">
                            <Badge
                                className="mb-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border-primary/20"
                            >
                                REGISTRE COM QUEM É REFERÊNCIA
                            </Badge>
                            <GradientText
                                text="O que nossos clientes falam
"
                                className="text-5xl font-bold mb-4 font-heading"
                                colors={["#0055FF", "#4F46E5", "#6D28D9", "#0055FF"]}
                            />
                        </div>
                    </AnimatedElement>
                </Suspense>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* WhatsApp Chat 1 - Aprovação Rápida */}
                    <Suspense fallback={<LoadingFallback />}>
                        <AnimatedElement
                            animation="fadeInUp"
                            delay={0.2}
                            scrollTrigger={true}
                        >
                            <div className="bg-[#e5ddd5] rounded-lg shadow-lg overflow-hidden h-full flex flex-col justify-between">
                                {/* WhatsApp Header */}
                                <div className="bg-[#128C7E] text-white p-3 flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                        <img
                                            src="/testimonials/registrar-minha-marca/carlos-mendes.jpg"
                                            alt="persona"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">Carlos Mendes</p>
                                        <p className="text-xs opacity-80">CEO - TechFlux</p>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="p-4 space-y-4">
                                    {/* Client Message 1 */}
                                    <div className="flex justify-end">
                                        <div className="bg-[#dcf8c6] p-3 rounded-lg max-w-[80%] shadow-sm relative">
                                            <p className="text-gray-800">
                                                A 3PI foi fundamental para acelerar o processo. O
                                                registro foi finalizado muito mais rápido do que
                                                esperávamos. Simples e direto.
                                            </p>
                                            <span className="text-xs text-gray-500 text-right block mt-1">
                                                09:50
                                            </span>
                                            <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1/2 rotate-45 w-4 h-4 bg-[#dcf8c6]"></div>
                                        </div>
                                    </div>

                                    {/* 3PI Response */}
                                    <div className="flex justify-start">
                                        <div className="bg-white p-3 rounded-lg max-w-[80%] shadow-sm relative">
                                            <p className="text-gray-800">
                                                Ficamos felizes que conseguimos atender às suas
                                                expectativas. Nosso objetivo é sempre garantir
                                                agilidade e segurança para o seu negócio.
                                            </p>
                                            <span className="text-xs text-gray-500 block mt-1">
                                                09:52
                                            </span>
                                            <div className="absolute top-0 left-0 transform -translate-x-1 -translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card - Expansão Internacional */}
                                <div className="bg-[#f0f0f0] p-3 mt-auto">
                                    <div className="bg-white rounded-full py-2 px-4 text-gray-400 text-xs text-center">
                                        Expansão Internacional
                                    </div>
                                </div>
                            </div>
                        </AnimatedElement>
                    </Suspense>

                    {/* WhatsApp Chat 2 - Valorização da Marca */}
                    <Suspense fallback={<LoadingFallback />}>
                        <AnimatedElement
                            animation="fadeInUp"
                            delay={0.2}
                            scrollTrigger={true}
                        >
                            <div className="bg-[#e5ddd5] rounded-lg shadow-lg overflow-hidden h-full flex flex-col justify-between">
                                {/* WhatsApp Header */}
                                <div className="bg-[#128C7E] text-white p-3 flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                        <img
                                            src="/testimonials/registrar-minha-marca/mariana-souza.jpg"
                                            alt="persona"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">Mariana Souza</p>
                                        <p className="text-xs opacity-80">Diretora - Econex</p>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="p-4 space-y-4">
                                    {/* Client Message 1 */}
                                    <div className="flex justify-end">
                                        <div className="bg-[#dcf8c6] p-3 rounded-lg max-w-[80%] shadow-sm relative">
                                            <p className="text-gray-800">
                                                A parceria com a 3PI agregou muito valor à nossa
                                                marca. O processo foi rápido e simples, e agora
                                                estamos bem mais confiantes no nosso futuro.
                                            </p>
                                            <span className="text-xs text-gray-500 text-right block mt-1">
                                                12:54
                                            </span>
                                            <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1/2 rotate-45 w-4 h-4 bg-[#dcf8c6]"></div>
                                        </div>
                                    </div>

                                    {/* 3PI Response */}
                                    <div className="flex justify-start">
                                        <div className="bg-white p-3 rounded-lg max-w-[80%] shadow-sm relative">
                                            <p className="text-gray-800">
                                                Ficamos contentes em saber que nosso trabalho ajudou
                                                a fortalecer a sua marca. Nosso objetivo é sempre
                                                agregar valor ao seu negócio.
                                            </p>
                                            <span className="text-xs text-gray-500 block mt-1">
                                                12:55
                                            </span>
                                            <div className="absolute top-0 left-0 transform -translate-x-1 -translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card - Valorização da Marca */}
                                <div className="bg-[#f0f0f0] p-3 mt-auto">
                                    <div className="bg-white rounded-full py-2 px-4 text-gray-400 text-xs text-center">
                                        Valorização da Marca
                                    </div>
                                </div>
                            </div>
                        </AnimatedElement>
                    </Suspense>

                    {/* WhatsApp Chat 3 - Aceleração de Crescimento */}
                    <Suspense fallback={<LoadingFallback />}>
                        <AnimatedElement
                            animation="fadeInUp"
                            delay={0.2}
                            scrollTrigger={true}
                        >
                            <div className="bg-[#e5ddd5] rounded-lg shadow-lg overflow-hidden h-full flex flex-col justify-between">
                                {/* WhatsApp Header */}
                                <div className="bg-[#128C7E] text-white p-3 flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                        <img
                                            src="/testimonials/registrar-minha-marca/thiago-lima.jpg"
                                            alt="persona"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">Thiago Lima</p>
                                        <p className="text-xs opacity-80">Fundador - Vivaflex</p>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="p-4 space-y-4">
                                    {/* Client Message 1 */}
                                    <div className="flex justify-end">
                                        <div className="bg-[#dcf8c6] p-3 rounded-lg max-w-[80%] shadow-sm relative">
                                            <p className="text-gray-800">
                                                O trabalho da 3PI foi essencial para nossa expansão
                                                internacional. O registro foi rápido e agora estamos
                                                preparados para crescer em novos mercados.
                                            </p>
                                            <span className="text-xs text-gray-500 text-right block mt-1">
                                                15:47
                                            </span>
                                            <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1/2 rotate-45 w-4 h-4 bg-[#dcf8c6]"></div>
                                        </div>
                                    </div>

                                    {/* 3PI Response */}
                                    <div className="flex justify-start">
                                        <div className="bg-white p-3 rounded-lg max-w-[80%] shadow-sm relative">
                                            <p className="text-gray-800">
                                                Estamos felizes que conseguimos ajudar na sua
                                                expansão. O nosso foco é sempre garantir a proteção
                                                necessária para que o seu crescimento seja tranquilo e
                                                seguro.
                                            </p>
                                            <span className="text-xs text-gray-500 block mt-1">
                                                15:50
                                            </span>
                                            <div className="absolute top-0 left-0 transform -translate-x-1 -translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card - Expansão Internacional */}
                                <div className="bg-[#f0f0f0] p-3 mt-auto">
                                    <div className="bg-white rounded-full py-2 px-4 text-gray-400 text-xs text-center">
                                        Expansão Internacional
                                    </div>
                                </div>
                            </div>
                        </AnimatedElement>
                    </Suspense>
                </div>

                <div className="mt-10 text-center">
                    <Suspense fallback={<LoadingFallback />}>
                        <GlowButton
                            onClick={() =>
                                document
                                    .getElementById("form-section")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            size="lg"
                            className="uppercase text-lg bg-gradient-to-r from-[#0057FF] to-[#007BFF] hover:from-[#0044CC] hover:to-[#0066CC] shadow-md"
                        >
                            Quero registrar minha marca
                        </GlowButton>
                    </Suspense>
                    <p className="mt-3 text-sm text-slate-500">
                        Junte-se aos nossos clientes satisfeitos
                    </p>
                </div>
            </div>
        </section>
    )
}