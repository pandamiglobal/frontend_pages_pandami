import { notFound } from "next/navigation";
import React from "react";
import { Container } from "@/components/ui/container";
import { Metadata } from "next";
import { getMetadataPostBySlug } from "@/common/services/posts/get-metadata-post-by-slug";
import { getPostBySlug } from "@/common/services/posts/get-post-by-slug";
import ArticleContent from "@/components/sections/article-content";

export async function generateMetadata(
    { params }: { params: { slug: string[] } }
): Promise<Metadata> {
    try {
        const postSlug = Array.isArray(params.slug) ? params.slug[params.slug.length - 1] : params.slug;
        const post = await getMetadataPostBySlug(postSlug);

        // Construct the current URL
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pppi.com.br';
        const currentPath = `/blog/${Array.isArray(params.slug) ? params.slug.join('/') : params.slug}`;
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
            // openGraph: {
            //     images: ['/some-specific-page-image.jpg', ...previousImages],
            // },
        }
    } catch (error) {
        notFound();
    }
}

export default async function BlogPost({ params }: { params: { slug: string[] } }) {
    const postSlug = Array.isArray(params.slug) ? params.slug[params.slug.length - 1] : params.slug;

    return (
        <main>
            <ArticleContent postSlug={postSlug} />
        </main>
    )
}