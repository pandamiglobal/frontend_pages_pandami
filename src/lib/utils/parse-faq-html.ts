interface FAQItem {
	id: string;
	question: string;
	answer: string;
}

interface ParsedContent {
	contentWithoutFaq: string;
	faqItems: FAQItem[];
}

export function parseFaqFromHtml(html: string): ParsedContent {
	const faqItems: FAQItem[] = [];

	// Find the FAQ block - match from rank-math-faq id to the closing structure
	// The structure has 3 nested divs, so we need to count closing tags
	const faqStartRegex = /<div[^>]*id=["']rank-math-faq["'][^>]*>/i;
	const startMatch = faqStartRegex.exec(html);

	let faqBlock = "";
	let contentWithoutFaq = html;

	if (startMatch) {
		const startIndex = startMatch.index;
		let depth = 0;
		let endIndex = startIndex;
		let inTag = false;
		let tagStart = 0;

		for (let i = startIndex; i < html.length; i++) {
			if (html[i] === "<") {
				inTag = true;
				tagStart = i;
			} else if (html[i] === ">" && inTag) {
				inTag = false;
				const tag = html.substring(tagStart, i + 1);

				if (tag.match(/^<div/i) && !tag.match(/\/\s*>$/)) {
					depth++;
				} else if (tag.match(/^<\/div>/i)) {
					depth--;
					if (depth === 0) {
						endIndex = i + 1;
						break;
					}
				}
			}
		}

		faqBlock = html.substring(startIndex, endIndex);
		contentWithoutFaq = html.substring(0, startIndex) + html.substring(endIndex);
	}

	if (faqBlock) {
		// Extract FAQ items using a more flexible regex
		// Match: div with faq-question-* id, then h3 with question, then div with answer
		const itemRegex =
			/<div[^>]*id=["'](faq-question-[^"']+)["'][^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<div[^>]*class(?:name)?=["'][^"']*rank-math-answer[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;

		let match;
		while ((match = itemRegex.exec(faqBlock)) !== null) {
			const id = match[1];
			// Strip HTML tags from question
			const question = match[2].replace(/<[^>]*>/g, "").trim();
			const answer = match[3].trim();

			if (question && answer) {
				faqItems.push({ id, question, answer });
			}
		}
	}

	return {
		contentWithoutFaq: contentWithoutFaq.trim(),
		faqItems,
	};
}
