"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/app/_components/atoms/ui/accordion";

interface FAQItem {
	id: string;
	question: string;
	answer: string;
}

interface FAQAccordionProps {
	items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
	if (!items || items.length === 0) return null;

	return (
		<div className="my-8 rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6">
			<h2 className="mb-4 text-xl font-semibold text-gray-900">
				Perguntas Frequentes
			</h2>
			<Accordion type="single" collapsible className="w-full">
				{items.map((item, index) => (
					<AccordionItem key={item.id || index} value={item.id || `faq-${index}`}>
						<AccordionTrigger className="text-left text-base font-medium text-gray-800 hover:no-underline">
							{item.question}
						</AccordionTrigger>
						<AccordionContent className="text-gray-600">
							<div dangerouslySetInnerHTML={{ __html: item.answer }} />
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
