import { Suspense } from "react";
import { GradientText } from "../ui/gradient-text";
import LoadingFallback from "../ui/loading-fall-back";

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <Suspense fallback={<LoadingFallback />}>
                    <div className="text-center mb-12">
                        <GradientText
                            text="Conheça algumas marcas que já protegemos"
                            className="text-5xl font-bold mb-4 font-heading"
                            colors={["#0055FF", "#4F46E5", "#6D28D9", "#0055FF"]}
                        />
                    </div>
                </Suspense>

                <div className="grid place-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <img src="/brands/belavita.png" alt="brand" />
                    <img src="/brands/ecostyle.png" alt="brand" />
                    <img src="/brands/max.png" alt="brand" />
                    <img src="/brands/techflux.png" alt="brand" />
                    <img src="/brands/vivaflex.png" alt="brand" />
                    <img src="/brands/econex.png" alt="brand" width={350} />
                </div>
            </div>
        </section>
    )
}