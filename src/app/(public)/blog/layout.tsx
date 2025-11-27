import PageLayout from "@/app/_components/templates/page-layout";

export default function QuizLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
    <PageLayout>
      {children}
    </PageLayout>
  ) 
}
