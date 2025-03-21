"use client";

import { Hero } from "@/components/(seo-tools)/analise-de-marca/hero";
import { Features } from "@/components/(seo-tools)/analise-de-marca/features";
import { HowItWorks } from "@/components/(seo-tools)/analise-de-marca/how-it-works";
import { EducationalSection } from "@/components/(seo-tools)/analise-de-marca/educational-section";
import { Testimonials } from "@/components/(seo-tools)/analise-de-marca/testimonials";
import { CTASection } from "@/components/(seo-tools)/analise-de-marca/cta-section";
import { motion } from "framer-motion";
import "@/styles/seo-tool.css";

const sectionVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
			staggerChildren: 0.1,
		},
	},
};


export default function Home() {
	return (
		<motion.main
			className="min-h-screen relative overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
		>
			<div className="relative z-10">
				<Hero />
				{[
					Features,
					HowItWorks,
					Testimonials,
					EducationalSection,
					CTASection,
				].map((Section, index) => (
					<motion.div
						key={Section.name}
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2, margin: "-100px" }}
					>
						<Section />
					</motion.div>
				))}
			</div>
		</motion.main>
	);
}
