import Image from "next/image";

import { Button } from "./button";
import Link from "next/link";

type BenefitItem = {
  title: string;

  subtitle?: string;

  description: string;

  imagePosition: "left" | "right";

  image: {
    src: string;

    alt: string;
  };

  stats?: {
    value: string;

    label: string;
  }[];
};

const scrollToSection = (id: any) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

interface BenefitsSectionProps {
  heading: string;

  benefits: BenefitItem[];

  ctaText?: string;

  ctaAction?: () => void;
}

export default function BenefitsSection({
  heading,
  benefits,
  ctaText,
  ctaAction,
}: BenefitsSectionProps) {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container px-4 flex flex-col gap-12">
        <h2 className="text-2xl md:text-4xl font-bold text-center max-w-[500px] mx-auto">
          {heading}
        </h2>

        <div className="flex flex-col gap-4 md:gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
              {benefit.imagePosition === "left" && (
                <div className="order-1 md:order-1">
                  <div className="w-full h-full">
                    <Image
                      src={benefit.image.src}
                      width={400}
                      height={400}
                      alt={benefit.image.alt}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              <div
                className={`order-2 ${
                  benefit.imagePosition === "left" ? "md:order-2" : "md:order-1"
                }`}
              >
                {benefit.subtitle && (
                  <p className="text-[#20679e] text-sm font-medium mb-2">
                    {benefit.subtitle}
                  </p>
                )}

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#111827]">
                  {benefit.title}
                </h3>

                <p
                  className="text-[#6b7280] mb-4 text-justify"
                  dangerouslySetInnerHTML={{ __html: benefit.description }}
                />
              </div>

              {benefit.imagePosition === "right" && (
                <div className="order-1 md:order-2">
                  <div className="w-full h-full">
                    <Image
                      src={benefit.image.src}
                      width={450}
                      height={450}
                      alt={benefit.image.alt}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {ctaText && (
          <div className="text-center" onClick={() => scrollToSection('hero-brand')}>
            <Button
              size="lg"
              className="bg-[#0047ff] text-white font-bold py-4 px-8 rounded-full hover:bg-[#0047ff]/90 transition-colors max-md:w-full"
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
