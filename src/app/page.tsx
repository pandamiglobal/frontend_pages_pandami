import { HeroSection } from "@/components/sections/hero-section"

import FAQSection from "@/components/sections/faq-section"

export default function Home() {
  const faq = [
    {
      question: "Como a IA analisa meu rosto e sugere os melhores cortes?",
      answer: "Nossa tecnologia de IA analisa o formato do seu rosto, características faciais e textura do cabelo para recomendar os estilos que melhor complementam sua aparência. O sistema considera diversos fatores como proporções faciais, cor de pele e estilo pessoal para oferecer sugestões personalizadas de cortes que valorizam seus traços naturais."
    },
    {
      question: "Preciso baixar algum app ou é direto no salão?",
      answer: "Não é necessário baixar nenhum aplicativo. Nosso sistema funciona diretamente no salão, onde nossos profissionais utilizam a tecnologia durante a consulta. Você pode simplesmente agendar uma visita e experimentar a análise de IA como parte do seu atendimento personalizado."
    },
    {
      question: "A IA realmente acerta? E se eu não gostar do resultado?",
      answer: "Nossa IA tem alto índice de satisfação entre os clientes, mas entendemos que o gosto pessoal é fundamental. Se você não gostar das sugestões iniciais, nossos profissionais trabalharão com você para ajustar as recomendações. Além disso, oferecemos garantia de satisfação para que você saia do salão com um visual que realmente ame."
    },
    {
      question: "Funciona para todos os tipos de cabelo e etnias?",
      answer: "Sim! Nossa tecnologia foi treinada com uma base de dados diversificada, contemplando diferentes tipos de cabelo, texturas e características étnicas variadas. Nosso sistema foi desenvolvido para ser inclusivo e atender às necessidades específicas de cada cliente, independente do seu tipo de cabelo ou origem étnica."
    },
    {
      question: "Como fica a privacidade das fotos das clientes?",
      answer: "Levamos a privacidade muito a sério. As fotos utilizadas para análise são processadas com criptografia de ponta a ponta e não são compartilhadas com terceiros. Após a consulta, você pode optar por manter ou excluir suas imagens do nosso sistema. Cumprimos rigorosamente todas as normas de proteção de dados vigentes."
    },
    {
      question: "Posso testar antes de decidir implementar no salão?",
      answer: "Certamente! Oferecemos demonstrações gratuitas para profissionais interessados em implementar nossa tecnologia. Um especialista pode visitar seu salão para uma apresentação completa do sistema, onde você e sua equipe poderão testar todas as funcionalidades antes de tomar qualquer decisão."
    }
  ]
  
  return (
    <main>
      <HeroSection />
     
      <FAQSection faq={faq} />
    </main>
  )
}

