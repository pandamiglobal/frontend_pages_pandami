"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function FAQSection() {
  return (
    <section className="w-full py-6 md:py-12 bg-white">
      <div className="container px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center md:mb-12 mb-8">
          Perguntas frequentes
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="item-5"
            className="border rounded-xl overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
              <span className="text-left font-medium">Quem é a PPPI?</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2">
              <p className="text-gray-700">
                A PPPI surgiu de uma parceria entre um advogado com mais de 16
                anos de experiência em propriedade intelectual, que já atendeu
                grandes marcas, e especialistas renomados em cibersegurança. Em
                pouco tempo, nos consolidamos como uma empresa referência no
                Brasil, oferecendo proteção e registro para importantes empresas.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-1"
            className="border rounded-xl overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
              <span className="text-left font-medium">
                O que é o registro de marca e por que isso importante?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2">
              <p className="text-gray-700">
                O registro de marca é a única forma de garantir que ninguém mais
                possa usar o nome ou logotipo do seu negócio. Sem essa proteção,
                sua marca fica vulnerável a cópias e concorrência desleal.
                Imagine construir sua reputação e, de repente, alguém tomar o
                controle do nome da sua empresa. Não corra esse risco!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border rounded-xl overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
              <span className="text-left font-medium">
                Por que devo registrar minha marca o quanto antes?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2">
              <p className="text-gray-700">
                Se você já usa um nome comercial, cada dia sem registro é um dia
                de risco. Qualquer pessoa pode registrá-lo antes de você e
                impedir seu uso, forçando mudanças que podem custar caro.
                Proteger sua marca hoje evita grandes problemas amanhã!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border rounded-xl overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
              <span className="text-left font-medium">
                Preciso de um CNPJ para registrar uma marca??
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2">
              <p className="text-gray-700">
                Não! Pessoas físicas também podem registrar, desde que comprovem
                atividade na área. Ou seja, se você é empreendedor individual,
                influencer ou criador de conteúdo, sua marca também pode (e
                deve) ser protegida!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="border rounded-xl overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
              <span className="text-left font-medium">
                Quanto custa registrar uma marca?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2">
              <p className="text-gray-700">
                O custo do registro de uma marca é bem acessível, especialmente
                quando comparado ao prejuízo que você pode ter se outra pessoa
                registrar antes de você. Imagine ter que mudar o nome, o
                logotipo, os produtos e até perder a confiança dos seus
                clientes. <br />
                <br />
                Proteger sua marca agora é um investimento que vale muito mais
                do que o preço do registro. Para saber o valor exato, preencha o{" "}
                <a href="#hero-brand" className="underline text-blue-500">
                  formulário em nosso site
                </a>{" "}
                e nossa equipe irá te ajudar a garantir a proteção da sua marca
                de maneira fácil e prática.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
