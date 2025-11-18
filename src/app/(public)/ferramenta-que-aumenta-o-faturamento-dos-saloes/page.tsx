"use client";

import { QuizForm } from "@/app/_components/organisms/quiz/quiz-form";
import PageLayout from "@/app/_components/templates/page-layout";

export default function FaturamentoQuizPage() {
	const handleQuizComplete = (answers: Record<number, number>) => {
		// Navigation is handled by the useQuiz hook
	};

	return (
		<PageLayout headerVariant="logo-only" hideFooter={true}>
			<QuizForm onComplete={handleQuizComplete} />
		</PageLayout>
	);
}
