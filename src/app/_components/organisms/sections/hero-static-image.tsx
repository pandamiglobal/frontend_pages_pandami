import Image from 'next/image';
import { HeroIcon } from '@/app/_components/atoms/svg/hero-icon';

/**
 * Static hero image for fast LCP
 * This component renders immediately without JS hydration
 * The animated version will overlay this once loaded
 */
export function HeroStaticImage() {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-end h-full w-full max-w-[320px] md:max-w-[400px] lg:max-w-[480px] mx-auto lg:mx-0"
      id="hero-static-image"
    >
      {/* Background Icon */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 z-0">
        <div className="opacity-40 lg:opacity-100">
          <HeroIcon className="w-96 h-64 lg:w-full lg:h-full object-contain" />
        </div>
      </div>

      {/* Static Person Image - LCP element */}
      <div className="relative w-full h-full flex flex-col justify-end">
        <div className="w-full relative">
          <div className="absolute inset-x-0 bottom-0">
            <Image
              src="/lp/images/hero/heroPersonImage_Female1.png"
              alt="Pessoa para análise de visagismo"
              width={486}
              height={659}
              className="w-full h-auto object-contain object-bottom"
              priority
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 480px"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
