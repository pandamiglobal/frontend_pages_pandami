"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import { Container } from "@/components/ui/container";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AboutVisagismComparisonSlider } from "@/components/(lp)/about-visagism-comparison-slider";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { PrimaryButton } from "@/components/ui/primary-button";

interface VariantSet {
  mainBefore: string;
  mainAfter: string;
  variants: string[]; // 4 imagens
}

const woman: VariantSet = {
  mainBefore: "/lp/images/about-visagism/female-main-before.png",
  mainAfter: "/lp/images/about-visagism/female-main-after.png",
  variants: [
    "/lp/images/about-visagism/female-variant-1.png",
    "/lp/images/about-visagism/female-variant-2.png",
    "/lp/images/about-visagism/female-variant-3.png",
    "/lp/images/about-visagism/female-variant-4.png",
  ],
};

const man: VariantSet = {
  mainBefore: "/lp/images/about-visagism/male-main-before.png",
  mainAfter: "/lp/images/about-visagism/male-main-after.png",
  variants: [
    "/lp/images/about-visagism/male-variant-1.png",
    "/lp/images/about-visagism/male-variant-2.png",
    "/lp/images/about-visagism/male-variant-3.png",
    "/lp/images/about-visagism/male-variant-4.png",
  ],
};

const chips = [
  "Encontre cortes que realçam a beleza natural do seu rosto",
  "Veja com que aspecto você ficaria com diferentes colorações",
  "Visualize seu cabelo com o estilo de algum famoso que gosta",
];

export function AboutVisagismSection() {
  const [gender, setGender] = useState<"woman" | "man">("woman");
  const prevGender = useRef<"woman" | "man">("woman");
  const directionRef = useRef<1 | -1>(1); // 1 indo para 'man', -1 voltando para 'woman'
  const data = gender === "woman" ? woman : man;

  // Atualiza direção ao mudar gênero
  useEffect(() => {
    if (gender !== prevGender.current) {
      directionRef.current = gender === "man" && prevGender.current === "woman" ? 1 : -1;
      prevGender.current = gender;
    }
  }, [gender]);

  const ChipIcon = useMemo(
    () => (
      <Sparkles className="size-5 text-stone-900/70" strokeWidth={1.8} />
    ),
    []
  );

  return (
    <section id="aboutvisagism" className="py-20 bg-white">
      <Container>
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-stone-900">
          Conheça o Visagismo PandaMi
        </h2>

        <Tabs
          value={gender}
          onValueChange={(v) => setGender(v as any)}
          className="flex flex-col items-center"
        >
          <TabsList className="mb-10 bg-neutral-100 rounded-full p-1 h-auto">
            <TabsTrigger
              value="woman"
              className="data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-stone-900 rounded-full px-6 py-2 text-sm md:text-base"
            >
              Feminino
            </TabsTrigger>
            <TabsTrigger
              value="man"
              className="data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-stone-900 rounded-full px-6 py-2 text-sm md:text-base"
            >
              Masculino
            </TabsTrigger>
          </TabsList>

          <TabsContent value="woman" className="w-full">
            {gender === "woman" && (
              <GenderContent key={gender} data={woman} direction={directionRef.current} />
            )}
          </TabsContent>
          <TabsContent value="man" className="w-full">
            {gender === "man" && (
              <GenderContent key={gender} data={man} direction={directionRef.current} />
            )}
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
}

interface GenderContentProps { data: VariantSet; direction: 1 | -1 }

function GenderContent({ data, direction }: GenderContentProps) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.6 } });
    if (textRef.current && sliderRef.current) {
      gsap.set([textRef.current, sliderRef.current], { willChange: 'transform, opacity' });
      gsap.set(textRef.current, { x: direction * 70, autoAlpha: 0 });
      gsap.set(sliderRef.current, { x: direction * 50, autoAlpha: 0 });
      tl.to(textRef.current, { x: 0, autoAlpha: 1 }, 0.05)
        .to(sliderRef.current, { x: 0, autoAlpha: 1 }, 0.1)
        .add(() => gsap.set([textRef.current, sliderRef.current], { clearProps: 'willChange' }));
    }
    return () => { tl.kill(); };
  }, [data, direction]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-10">
      {/* Right side (texto / variantes / chips / ações) – em mobile fica abaixo */}
      <div ref={textRef} className="md:w-1/2 flex flex-col gap-6 bg-white rounded-3xl border border-gray-200 p-6 md:p-8 h-full">
        <div>
          <h3 className="text-xl md:text-2xl font-medium text-stone-900 mb-4">
            Outros estilos que também combinam com você
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {data.variants.map((v, i) => (
              <div key={i} className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={v}
                  alt={`variante ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 25vw, 8vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {chips.map((c) => (
            <div
              key={c}
              className="flex items-start gap-2 rounded-lg bg-orange-50 px-3 py-2"
            >
              <Sparkles className="size-5 text-stone-900/70 mt-0.5" strokeWidth={1.8} />
              <p className="text-sm md:text-base text-stone-900 leading-snug">
                {c}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <PrimaryButton size="lg" className="flex-1">
            Comece grátis
          </PrimaryButton>
          <PrimaryButton
            size="lg"
            variant="outline"
            className="flex-1"
          >
            Quero no meu salão
          </PrimaryButton>
        </div>
      </div>

  {/* Left slider */}
  <div ref={sliderRef} className="md:w-1/2">
        <AboutVisagismComparisonSlider
          before={data.mainBefore}
          after={data.mainAfter}
          beforeAlt="Antes do visagismo"
          afterAlt="Depois do visagismo"
      className="w-full"
        />
      </div>
    </div>
  );
}
