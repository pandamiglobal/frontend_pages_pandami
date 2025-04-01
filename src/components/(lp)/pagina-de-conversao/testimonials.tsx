import { Suspense } from "react";
import { GradientText } from "../ui/gradient-text";
import LoadingFallback from "../ui/loading-fall-back";
import Image from "next/image";

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-16 bg-white">
            <div className="container mx-auto">
                <Suspense fallback={<LoadingFallback />}>
                    <div className="text-center mb-12">
                        <GradientText
                            text="Conheça algumas marcas que já protegemos"
                            className="title-2 mb-4 !font-heading"
                            colors={["#0055FF", "#4F46E5", "#6D28D9", "#0055FF"]}
                        />
                    </div>
                </Suspense>

                <div className="grid place-items-center grid-cols-2 lg:grid-cols-3">
                    <Image width={300} height={200} src="/brands/belavita.png" alt="brand" />
                    <Image width={300} height={200} src="/brands/ecostyle.png" alt="brand" />
                    <Image width={300} height={200} src="/brands/max.png" alt="brand" />
                    <Image width={300} height={200} src="/brands/techflux.png" alt="brand" />
                    <Image width={300} height={200} src="/brands/vivaflex.png" alt="brand" />
                    <Image width={300} height={200} src="/brands/econex.png" alt="brand" />
                </div>
            </div>
        </section>
    )
}