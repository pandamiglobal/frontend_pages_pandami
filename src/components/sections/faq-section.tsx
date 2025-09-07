"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Container } from "../ui/container";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { PrimaryButton } from "../ui/primary-button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface FAQ {
  question: string;
  answer: string;
}

const testimonialAvatars = [
  {
    src: "/testimonials/home/ana-paula.jpg",
    alt: "Ana Paula",
    initials: "AP"
  },
  {
    src: "/testimonials/home/carlos-men.jpg", 
    alt: "Carlos Mendes",
    initials: "CM"
  },
  {
    src: "/testimonials/home/jorge-santana.jpg",
    alt: "Jorge Santana",
    initials: "JS"
  },
  {
    src: "/testimonials/home/maria-silva.jpg",
    alt: "Maria Silva",
    initials: "MS"
  }
];

export default function FAQSection({ faq }: { faq: FAQ[] }) {
  return (
    <section className="w-full py-10 md:py-16 bg-white">
      <Container className="px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
          {/* Left column with title and CTA for desktop */}
          <div className="w-full md:w-5/12 lg:w-4/12">
            <div className="md:sticky md:top-20">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                Perguntas frequentes
              </h2>
              <p className="text-gray-700 mb-6 hidden md:block">
                Tudo que você precisa saber sobre a Pandami, desde a compra à usabilidade.
              </p>
              
              {/* Testimonial avatars */}
              <div className="hidden md:block mt-8">
                <div className="flex flex-col gap-2">
                  <div className="flex -space-x-2">
                    {testimonialAvatars.map((avatar, i) => (
                      <Avatar key={i} className="border-2 border-white h-9 w-9">
                        <AvatarImage src={avatar.src} alt={avatar.alt} />
                        <AvatarFallback>{avatar.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    +2 mil homens e mulheres já descobriram sua melhor versão
                  </p>
                  <div className="mt-2">
                    <Link href="/#">
                      <PrimaryButton
                        size="lg"
                        icon={<ChevronRight className="h-4 w-4" />}
                        className="w-full md:w-auto justify-center"
                      >
                        Comece grátis
                      </PrimaryButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column with accordion */}
          <div className="w-full md:w-7/12 lg:w-8/12">
            {/* Mobile version of the subtitle */}
            <p className="text-gray-700 mb-6 md:hidden">
              Tudo que você precisa saber sobre a Pandami, desde a compra à usabilidade.
            </p>
            
            <Accordion type="single" collapsible className="space-y-2">
              {faq.map((item, index) => (
                <AccordionItem 
                  key={`faq-${index}`} 
                  value={`faq-${index}`} 
                  className="border-b border-gray-200 overflow-hidden"
                >
                  <AccordionTrigger className="px-2 py-4 hover:no-underline text-left">
                    <span className="text-left font-medium text-sm md:text-base">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-4 pt-0">
                    <p className="text-gray-600 text-sm md:text-base">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        {/* Mobile testimonial and CTA */}
        <div className="mt-8 md:hidden">
          <div className="flex items-center justify-center flex-col">
            <div className="flex -space-x-2 mb-2">
              {testimonialAvatars.map((avatar, i) => (
                <Avatar key={i} className="border-2 border-white h-8 w-8">
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                  <AvatarFallback>{avatar.initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-xs text-gray-600 text-center mb-4">
              +2 mil homens e mulheres já descobriram sua melhor versão
            </p>
            <Link href="/#">
              <PrimaryButton
                size="lg"
                icon={<ChevronRight className="h-4 w-4" />}
                className="w-full justify-center"
              >
                Comece grátis
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
