import { getPostBySlug } from "@/common/services/posts/get-post-by-slug";
import { Container } from "../ui/container";
import { notFound } from "next/navigation";

export default async function ArticleContent({ postSlug }: { postSlug: string }) {
    let uri = null;

    if (Array.isArray(postSlug) && postSlug.length >= 2) {
        uri = `/blog/${postSlug.join('/')}/`;
    }

    const post = await getPostBySlug(postSlug);

    if (!post) {
        notFound();
    }

    const parsedUrl = new URL(post.link);
    const path = parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;

    if (uri != null && uri != path) {
        notFound();
    }

    // Transform HTML content to handle React-specific attributes
    const transformedContent = post.content.rendered
        .replace(/class=/g, 'className=')
        .replace(/fetchpriority=/g, 'fetchPriority=')
        .replace(/<(br)([^>]*)(?!\/)>/g, '<$1$2 />')
        .replace(/style="([^"]*)"/g, (match: string, styles: string) => {
            const styleObject = styles.split(';')
                .filter(Boolean)
                .reduce((acc: Record<string, string>, style: string) => {
                    const [property, value] = style.split(':').map(s => s.trim());
                    const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    acc[camelProperty] = value;
                    return acc;
                }, {});
            return `style={${JSON.stringify(styleObject)}}`;
        })
        // Handle other common HTML attributes
        .replace(/for=/g, 'htmlFor=')
        .replace(/tabindex=/g, 'tabIndex=')
        .replace(/readonly=/g, 'readOnly=')
        .replace(/maxlength=/g, 'maxLength=')
        .replace(/contenteditable=/g, 'contentEditable=');

    return (
        <section className="w-full py-16 bg-white">
            <Container>
                <article className="max-w-4xl mx-auto flex flex-col gap-8">
                    <div>
                        <h1 className="text-3xl md:text-45l font-bold text-gray-900 mb-4">
                            {post.title.rendered}
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm">
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                }).replace(',', '')}
                            </time>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div
                            className="post-content text-gray-700"
                            dangerouslySetInnerHTML={{ __html: transformedContent }}
                        />
                    </div>
                </article>
            </Container>
        </section>
    )
}
