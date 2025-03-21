import defaultSeo from "@/common/config/default-seo";
import BlogGrid from "@/components/sections/blog-grid";
import { Container } from "@/components/ui/container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: defaultSeo.blog_title,
};

export default function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
    return (
        <>
            <main>
                <BlogGrid searchParams={searchParams} />
            </main>
        </>
    );
}