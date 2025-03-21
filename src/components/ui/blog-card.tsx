import { IPost } from "@/@types/@post"
import Image from "next/image"
import Link from "next/link"

export default function BlogCard({ post, uri }: { post: IPost, uri: string }) {
    return (
        <Link 
            href={`${uri}`} 
            className="group bg-white rounded-xl overflow-hidden transition-all duration-300 border border-solid border-gray-200"
        >
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={post.rttpg_featured_image_url.full[0] || "/placeholder.svg"}
                    alt={post.title.rendered}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.date).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }).replace(',', '')}
                </p>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title.rendered}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.rttpg_excerpt.length > 150 ? post.rttpg_excerpt.slice(0, 180) + '...' : post.rttpg_excerpt}
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                    Ler mais
                    <svg 
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                        />
                    </svg>
                </div>
            </div>
        </Link>
    )
}