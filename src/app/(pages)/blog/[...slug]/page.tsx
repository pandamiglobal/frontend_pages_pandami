import { notFound } from "next/navigation";
import React from "react";
import { Container } from "@/components/ui/container";
import { Metadata } from "next";
import { getMetadataPostBySlug } from "@/common/services/posts/get-metadata-post-by-slug";
import ArticleContent from "@/components/sections/article-content";
import Link from "next/link";
import { BrandCheckForm } from "@/components/forms/brand-check-form";
import { ScrollSyncWrapper } from "@/components/sections/scroll-sync-wrapper";
import { FileSearch, Globe2Icon, ShieldCheckIcon } from "lucide-react";
import { SlugPageProps } from "@/@types/next-page";

export async function generateMetadata(
    { params }: any
): Promise<Metadata> {
    try {
        const slugParts = Array.isArray(params.slug) ? params.slug : [params.slug];
        const postSlug = slugParts[slugParts.length - 1];
        const post = await getMetadataPostBySlug(postSlug);

        // Construct the current URL
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pppi.com.br';
    const currentPath = `/blog/${slugParts.join('/')}`;
        const fullUrl = `${baseUrl}${currentPath}`;

        return {
            title: post.title,
            description: post.description,
            openGraph: {
                title: post.title,
                description: post.description,
                type: 'article',
                url: fullUrl,
                images: [{
                    url: post.image,
                    width: 700,
                    height: 400,
                }],
                siteName: post.title
            },
            twitter: {
                title: post.title,
                description: post.description,
                card: 'summary_large_image',
                images: [{
                    url: post.image,
                    width: 700,
                    height: 400,
                }],
            },
            robots: {
                index: true,
                follow: true,
                "max-image-preview": 'large',
                "max-snippet": -1,
                "max-video-preview": -1,
            }
        }
    } catch (error) {
        notFound();
    }
}

export default async function BlogPost({ params }: any) {
    const postSlug = Array.isArray(params.slug) ? params.slug[params.slug.length - 1] : params.slug;

    const sidebar = (
        <>
            <BrandCheckForm articleUri={`/blog/${postSlug}`} />
            <div>
                <h2 className="title-4 px-3 text-gray-900 mb-4 border-b-2 md:mt-8 border-gray-200 pb-4">Ferramentas</h2>
                <ul className="flex flex-col gap-4">
                    <li className="px-3 text-4 !font-medium !text-primary underline">
                        <Link className="w-full flex items-center gap-2" href="/consulta-inpi"><FileSearch className="w-4 h-4" /> Busca de marca no INPI</Link>
                    </li>
                    <li className="px-3 text-4 !font-medium !text-primary underline">
                        <Link className="w-full flex items-center gap-2" href="/consulta-inpi"><Globe2Icon className="w-4 h-4" /> Busca de marca internacional</Link>
                    </li>
                    <li className="px-3 text-4 !font-medium !text-primary underline">
                        <Link className="w-full flex items-center gap-2" href="/registrar-minha-marca"><ShieldCheckIcon className="w-4 h-4" /> Proteja sua marca</Link>
                    </li>
                </ul>
            </div>
        </>
    );

    return (
        <main>
            <Container>
                <ScrollSyncWrapper
                    article={<ArticleContent postSlug={postSlug} />}
                    sidebar={sidebar}
                />
            </Container>
        </main>
    )
}