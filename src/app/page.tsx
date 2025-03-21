import { HeroSection } from "@/components/sections/hero-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { CyberSecuritySection } from "@/components/sections/cyber-security-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { BlogSection } from "@/components/sections/blog-section"
import FAQSection from "@/components/sections/faq-section"

export default function Home() {
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
    <main>
      <HeroSection />
      <PartnersSection />
      <CyberSecuritySection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection faq={faq} />
    </main>
  )
}

