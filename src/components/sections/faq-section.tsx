"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Container } from "../ui/container";

export interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection({ faq }: { faq: FAQ[] }) {
  return (
    <section className="w-full snap-start py-16 bg-white">
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold text-center md:mb-12 mb-8">
          Perguntas frequentes
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faq.map((item, index) => (
            <AccordionItem key={`faq-${index}`} value={`faq-${index}`} className="border rounded-xl overflow-hidden bg-[#F9FAFB]">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                <span className="text-left font-medium">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2">
                <p className="text-gray-700">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
