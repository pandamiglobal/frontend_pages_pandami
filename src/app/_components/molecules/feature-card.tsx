import FeaturesIcon from "../atoms/svg/features-icon";
import Image from "next/image";

interface FeatureCardProps {
    title: string;
    description: string;
    image: {
        src: string,
        alt: string,
    };
    badge?: boolean;
    Icon: any;
}

export function FeatureCard({ title, description, image, badge, Icon }: FeatureCardProps) {

    return (

        <div className=" w-full bg-white border border-gray-200 rounded-2xl items-center shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col justify-between pt-8 px-4">
            <div className="z-10 w-full">

                {/* Div dos ícones e status - inicio */}
                <div className="pb-4 flex flex-row items-center justify-between">
                    {Icon}
                    {badge && <div className="py-2 px-4 bg-yellow-100 flex flex-row gap-2 rounded-full">
                        <Image 
                            src="/lp/images/features-pandami/indevelopment.png"
                            alt="Em desenvolvimento"
                            width={16}
                            height={16}
                            loading="lazy"
                        />
                        <p className="text-xs text-yellow-900">Em desenvolvimento</p>
                    </div>}

                </div>
                {/* Div dos ícones e status - Fim */}

                <h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
                    {title}
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                    {description}
                </p>
            </div>

            <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full object-cover object-bottom"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
        </div>
    )
}