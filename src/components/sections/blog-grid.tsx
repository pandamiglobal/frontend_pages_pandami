import { getPosts } from "@/common/services/posts/get-posts";
import { IPagination, IPost } from "@/@types/@post";
import ClientPagination from "../ui/client-pagination";
import BlogCard from "../ui/blog-card";
import { Container } from "../ui/container";

export default async function BlogGrid({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 9;

  const data = await getPosts(currentPage, limit) as { posts: IPost[], pagination: IPagination };

  if (!data) return null;

  return (
    <section className="w-full bg-white">
      <Container section={true}>
        <h2 className="text-2xl md:text-3xl font-bold text-center md:mb-12 mb-8">
          Nosso Blog
        </h2>
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.posts.map((post) => {
              const parsedUrl = new URL(post.link);
              const path = parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;

              return (
                <BlogCard key={post.id} post={post} uri={path} />
              );
            })}
          </div>
          <div className="mt-12">
            <ClientPagination
              currentPage={data.pagination.current_page}
              totalPages={data.pagination.total_pages}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}