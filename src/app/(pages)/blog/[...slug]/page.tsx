import { notFound } from "next/navigation";
import React from "react";
import { Container } from "@/components/ui/container";
import { Metadata } from "next";
import { getMetadataPostBySlug } from "@/common/services/posts/get-metadata-post-by-slug";
import ArticleContent from "@/components/sections/article-content";
import Link from "next/link";
import { LeadFormBlog } from "@/components/forms/lead-form-blog";
import { ScrollSyncWrapper } from "@/components/sections/scroll-sync-wrapper";
import { Scissors, Camera, AppWindow, Users } from "lucide-react";
import { SlugPageProps } from "@/@types/next-page";


// Função auxiliar para extrair o slug final
function getPostSlug(slug: string | string[]): string {
  if (Array.isArray(slug)) {
    return slug[slug.length - 1];
  }
  return slug;
}

export async function generateMetadata(
  { params }: { params: { slug: string | string[] } }
): Promise<Metadata> {
  try {
    // Aguarde a resolução do params antes de acessar suas propriedades
    const resolvedParams = await params;
    const slugParam = await resolvedParams.slug;
    
    // Agora podemos acessar o slug com segurança
    const postSlug = getPostSlug(slugParam);
    const post = await getMetadataPostBySlug(postSlug);
    
    // Construct the current URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pppi.com.br';
    const slugPath = Array.isArray(slugParam) ? slugParam.join('/') : slugParam;
    const currentPath = `/blog/${slugPath}`;
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
    };
  } catch (error) {
    notFound();
  }
}

export default async function BlogPost({ params }: { params: { slug: string | string[] } }) {
  // Aguarde a resolução do params antes de acessar suas propriedades
  const resolvedParams = await params;
  const slugParam = await resolvedParams.slug;
  const postSlug = getPostSlug(slugParam);
  
  const sidebar = (
    <>
      <LeadFormBlog articleUri={`/blog/${postSlug}`} />
      <div>
        <h2 className="title-4 px-3 text-gray-900 mb-4 border-b-2 md:mt-8 border-gray-200 pb-4">Soluções Pandami</h2>
        <ul className="flex flex-col gap-4">
          <li className="px-3 text-4 font-medium! text-primary! underline">
            <Link className="w-full flex items-center gap-2" href="/visagismo-ia"><Scissors className="w-4 h-4" /> Experimente visagismo por IA</Link>
          </li>
          <li className="px-3 text-4 font-medium! text-primary! underline">
            <Link className="w-full flex items-center gap-2" href="/superapp"><AppWindow className="w-4 h-4" /> SuperApp para salões</Link>
          </li>
        
        </ul>
      </div>
    </>
  );

  return (
    <main >
      <Container>
        <ScrollSyncWrapper
          article={<ArticleContent postSlug={postSlug} />}
          sidebar={sidebar}
        />
      </Container>
    </main>
  );
}