import { HeroSection } from "@/components/sections/hero-section";
import { WhyVisagismSection } from "@/components/sections/why-visagism-section";
import { AboutVisagismSection } from "@/components/sections/about-visagism-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import FAQSection from "@/components/sections/faq-section";
import CarouselSection from "@/components/sections/carousel-section";
import { CtaSection } from "@/components/sections/cta-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { PricingSection } from "@/components/sections/pricing-section";

// Removidos imports específicos da seção de benefícios (agora componentizada)

export default function Home() {
	const faq = [
		{
			question: "Funciona no meu tipo de cabelo?",
			answer:
				"Sim! Nossa IA foi treinada especialmente para a diversidade brasileira: cabelos lisos, cacheados, crespos, de todas as texturas e etnias. O sistema reconhece as características únicas de cada tipo.",
		},
		{
			question: "É complicado de usar?",
			answer:
				"Super simples: tire uma foto, aguarde 30 segundos, receba as sugestões. Não precisa ser expert em tecnologia. Se tiver dúvidas, nosso suporte te ajuda no mesmo dia.",
		},
		{
			question: "E se o cliente não gostar do resultado?",
			answer:
				"Nossa IA tem 94% de aprovação, mas entendemos que gosto é pessoal. Se não gostar das sugestões iniciais, nossos profissionais podem ajustar as recomendações até encontrar a opção ideal.",
		},
		{
			question: "Preciso baixar algum app?",
			answer:
				"Não! Funciona direto no seu celular pelo navegador. Você agenda pelo link que enviamos e usa durante a consulta com o cliente.",
		},
		{
			question: "Como funciona a privacidade?",
			answer:
				"Total segurança: fotos são processadas e automaticamente apagadas após a análise. Não compartilhamos dados com terceiros. Privacidade garantida.",
		},
		{
			question: "Posso testar antes de decidir?",
			answer:
				"Claro! Teste por 7 dias com risco zero. Se não melhorar seus resultados, cancele sem pegadinhas. Suporte incluído durante todo o teste.",
		},
	];

	return (
		<main>
			<HeroSection />
			<WhyVisagismSection />
			<CarouselSection />
			<BenefitsSection />
			<AboutVisagismSection />
			<SocialProofSection />
			<PricingSection />
			<FAQSection faq={faq} />
			<CtaSection />
		</main>
	);
}
