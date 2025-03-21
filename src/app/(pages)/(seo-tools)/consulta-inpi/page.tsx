"use client";

// import { Features } from "@/components/(seo-tools)/consulta-inpi/features";
// import { HowItWorks } from "@/components/(seo-tools)/consulta-inpi/how-it-works";
// import { EducationalSection } from "@/components/(seo-tools)/consulta-inpi/educational-section";
// import { Testimonials } from "@/components/(seo-tools)/consulta-inpi/testimonials";
// import { CTASection } from "@/components/(seo-tools)/consulta-inpi/cta-section";
import { motion } from "framer-motion";
import "@/../styles/seo-tool.css";
import BlogPage from "@/components/(lp)/consulta-inpi/blog-page";
import { Hero } from "@/components/(seo-tools)/consulta-inpi/hero";
import { Features } from "@/components/(lp)/consulta-inpi/features-brand";
import { HowItWorks } from "@/components/(lp)/consulta-inpi/how-it-works";
import { Testimonials } from "@/components/(lp)/consulta-inpi/testimonials";
import { EducationalSection } from "@/components/(lp)/consulta-inpi/educational-section";

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
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
		>
			<Hero />
			{[
					Features,
					HowItWorks,
					Testimonials,
					EducationalSection,
					// CTASection,
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
			<BlogPage />
		</motion.main>
	);
}
