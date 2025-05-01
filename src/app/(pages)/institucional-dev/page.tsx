import { BlogSection } from "@/components/sections/blog-section";
import FAQSection from "@/components/sections/faq-section";
import BenefitsSection from "@/components/sections/lp-dev/benefits-section";
import ComparisonSection from "@/components/sections/lp-dev/comparison-section";
import CTASection from "@/components/sections/lp-dev/cta-section";
import Footer from "@/components/sections/lp-dev/footer";
import GlobalPresenceSection from "@/components/sections/lp-dev/global-presence-section";
import HeroSection from "@/components/sections/lp-dev/hero-section";
import ImpactSection from "@/components/sections/lp-dev/impact-section";
import RisksSection from "@/components/sections/lp-dev/risks-section";
import SolutionsSection from "@/components/sections/lp-dev/solutions-section";
import StoriesSection from "@/components/sections/lp-dev/stories-section";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function InstitucionalPage() {
    const faq = [
        {
            question: "Quem é a PPPI?",
            answer: "A PPPI surgiu de uma parceria entre um advogado com mais de 16 anos de experiência em propriedade intelectual, que já atendeu grandes marcas, e especialistas renomados em cibersegurança. Em pouco tempo, nos consolidamos como uma empresa referência no Brasil, oferecendo proteção e registro para importantes empresas."
        },
        {
            question: "O que é o registro de marca e por que isso importante?",
            answer: "O registro de marca é a única forma de garantir que ninguém mais possa usar o nome ou logotipo do seu negócio. Sem essa proteção, sua marca fica vulnerável a cópias e concorrência desleal. Imagine construir sua reputação e, de repente, alguém tomar o controle do nome da sua empresa. Não corra esse risco!"
        },
        {
            question: "Por que devo registrar minha marca o quanto antes?",
            answer: "Se você já usa um nome comercial, cada dia sem registro é um dia de risco. Qualquer pessoa pode registrá-lo antes de você e impedir seu uso, forçando mudanças que podem custar caro. Proteger sua marca hoje evita grandes problemas amanhã!"
        },
        {
            question: "Preciso de um CNPJ para registrar uma marca?",
            answer: "Não! Pessoas físicas também podem registrar, desde que comprovem atividade na área. Ou seja, se você é empreendedor individual, influencer ou criador de conteúdo, sua marca também pode (e deve) ser protegida!"
        },
        {
            question: "Quanto custa registrar uma marca?",
            answer: "O custo do registro de uma marca é bem acessível, especialmente quando comparado ao prejuízo que você pode ter se outra pessoa registrar antes de você. Imagine ter que mudar o nome, o logotipo, os produtos e até perder a confiança dos seus clientes.\n\nProteger sua marca agora é um investimento que vale muito mais do que o preço do registro. Para saber o valor exato, preencha o formulário em nosso site e nossa equipe irá te ajudar a garantir a proteção da sua marca de maneira fácil e prática."
        }
    ]

    return (
        <div
            data-no-header
            data-no-footer
            className="h-screen overflow-y-auto snap-y snap-mandatory"
        >
            <HeroSection />
            <AnimatedSection>
                <RisksSection />
            </AnimatedSection>
            <AnimatedSection>
                <BenefitsSection />
            </AnimatedSection>
            <AnimatedSection>
                <StoriesSection />
            </AnimatedSection>
            <AnimatedSection>
                <CTASection />
            </AnimatedSection>
            <AnimatedSection>
                <SolutionsSection />
            </AnimatedSection>
            <AnimatedSection>
                <ComparisonSection />
            </AnimatedSection>
            <AnimatedSection>
                <ImpactSection />
            </AnimatedSection>
            <AnimatedSection>
                <GlobalPresenceSection />
            </AnimatedSection>
            <AnimatedSection>
                <BlogSection />
            </AnimatedSection>
            <AnimatedSection>
                <FAQSection faq={faq} />
            </AnimatedSection>
            <Footer />
        </div>
    );
}