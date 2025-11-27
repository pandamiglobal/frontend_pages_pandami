import { DEFAULT_SEO } from "@/common/constants/default-seo";
import BlogGrid from "@/app/_components/organisms/sections/blog-grid";
import { Metadata } from "next";
import PageLayout from "@/app/_components/templates/page-layout";

export const metadata: Metadata = {
	title: DEFAULT_SEO.blog_title,
};

export default async function BlogPage({ searchParams }: any) {
	const resolvedSearchParams =
		typeof searchParams?.then === "function"
			? await searchParams
			: searchParams;
	return (
		<>
			<PageLayout>
				<main className="w-full flex flex-col gap-16 py-16">
					<BlogGrid searchParams={resolvedSearchParams} />
				</main>
			</PageLayout>
		</>
	);
}
