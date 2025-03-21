import { IPost } from "@/@types/@post";
import api from "@/common/config/api";

export async function getPostBySlug(slug: string) {
    try {
        const response = await api.get<IPost>(`/post/by-slug/${slug}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error)
        throw error
    }
}