"use client"

import { Container } from '@/components/ui/container'
import { BadgeIcon } from '@/components/svg/badge-icon'
import { ImageComparisonSlider } from './image-comparison-slider'

// Pares de imagens antes/depois
type BeforeAfterPair = {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  className?: string
  transitionDuration?: number
}

const womenPairs: BeforeAfterPair[] = [
  {
    beforeSrc: '/lp/images/carrousel/woman-1-before.png',
    afterSrc: '/lp/images/carrousel/woman-1-after.png',
    beforeAlt: 'Mulher antes do visagismo',
    afterAlt: 'Mulher depois do visagismo',
    className: 'w-64 h-72',
    transitionDuration: 3000
  },
  {
    beforeSrc: '/lp/images/carrousel/woman-2-before.png',
    afterSrc: '/lp/images/carrousel/woman-2-after.png',
    beforeAlt: 'Mulher antes do visagismo',
    afterAlt: 'Mulher depois do visagismo',
    className: 'w-72 h-72',
    transitionDuration: 4000
  },
  {
    beforeSrc: '/lp/images/carrousel/woman-3-before.png',
    afterSrc: '/lp/images/carrousel/woman-3-after.png',
    beforeAlt: 'Mulher antes do visagismo',
    afterAlt: 'Mulher depois do visagismo',
    className: 'w-56 h-72',
    transitionDuration: 3500
  },
  {
    beforeSrc: '/lp/images/carrousel/woman-4-before.png',
    afterSrc: '/lp/images/carrousel/woman-4-after.png',
    beforeAlt: 'Mulher antes do visagismo',
    afterAlt: 'Mulher depois do visagismo',
    className: 'w-64 h-72',
    transitionDuration: 4500
  },
  {
    beforeSrc: '/lp/images/carrousel/woman-5-before.png',
    afterSrc: '/lp/images/carrousel/woman-5-after.png',
    beforeAlt: 'Mulher antes do visagismo',
    afterAlt: 'Mulher depois do visagismo',
    className: 'w-64 h-72',
    transitionDuration: 5000
  }
]

const menPairs: BeforeAfterPair[] = [
  {
    beforeSrc: '/lp/images/carrousel/man-1-before.png',
    afterSrc: '/lp/images/carrousel/man-1-after.png',
    beforeAlt: 'Homem antes do visagismo',
    afterAlt: 'Homem depois do visagismo',
    className: 'w-64 h-72',
    transitionDuration: 3200
  },
  {
    beforeSrc: '/lp/images/carrousel/man-2-before.png',
    afterSrc: '/lp/images/carrousel/man-2-after.png',
    beforeAlt: 'Homem antes do visagismo',
    afterAlt: 'Homem depois do visagismo',
    className: 'w-80 h-72',
    transitionDuration: 4200
  },
  {
    beforeSrc: '/lp/images/carrousel/man-3-before.png',
    afterSrc: '/lp/images/carrousel/man-3-after.png',
    beforeAlt: 'Homem antes do visagismo',
    afterAlt: 'Homem depois do visagismo',
    className: 'w-64 h-72',
    transitionDuration: 3800
  },
  {
    beforeSrc: '/lp/images/carrousel/man-4-before.png',
    afterSrc: '/lp/images/carrousel/man-4-after.png',
    beforeAlt: 'Homem antes do visagismo',
    afterAlt: 'Homem depois do visagismo',
    className: 'w-64 h-72',
    transitionDuration: 4800
  },
  {
    beforeSrc: '/lp/images/carrousel/man-5-before.png',
    afterSrc: '/lp/images/carrousel/man-5-after.png',
    beforeAlt: 'Homem antes do visagismo',
    afterAlt: 'Homem depois do visagismo',
    className: 'w-64 h-72',
    transitionDuration: 5200
  }
]

function MarqueeRow({ items, reverse = false, speed = 40 }: { items: BeforeAfterPair[]; reverse?: boolean; speed?: number }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={[
          'flex gap-5 flex-nowrap',
          `animate-[marquee_${speed}s_linear_infinite]`,
          reverse ? 'direction-reverse' : ''
        ].join(' ')}
        aria-hidden="false"
      >
        {[...Array(2)].map((_, dupIdx) => (
          <div key={dupIdx} className="flex gap-5 flex-nowrap shrink-0">
            {items.map((item, i) => (
              <ImageComparisonSlider
                key={i + '-' + dupIdx}
                beforeImage={item.beforeSrc}
                afterImage={item.afterSrc}
                beforeAlt={item.beforeAlt}
                afterAlt={item.afterAlt}
                className={item.className}
                transitionDuration={item.transitionDuration}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Fades laterais */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-50 to-transparent" />
    </div>
  )
}

export default function CarouselSection() {
  return (
    <section
      id="carousel"
      className="w-full py-20 pb-32 bg-neutral-50 rounded-bl-[32px] rounded-br-[32px] overflow-hidden relative"
    >
      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .direction-reverse { animation-direction: reverse; }
      `}</style>
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-stone-900 text-4xl font-semibold mb-4">
            Transformações reais de <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">visagismo</span> feito por IA
          </h2>
         
        </div>
        
        <div className="flex flex-col justify-start items-center gap-10">
          <div className="relative w-full">
            <MarqueeRow items={womenPairs} speed={55} />
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-lg">
           
            </div>
          </div>
          
          <div className="relative w-full">
            <MarqueeRow items={menPairs} reverse speed={45} />
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-lg">
             
            </div>
          </div>
        </div>
      </Container>
      
      {/* Badge decorativa */}
      <div className="flex justify-center items-center mt-8">
        <BadgeIcon />
      </div>
    </section>
  )
}
