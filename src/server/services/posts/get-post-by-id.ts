import { IPost } from "@/common/types/IBlogArticlePost";
import api from "@/common/config/api";

export async function getPostById(id: number) {
    try {
        const response = await api.get<IPost>(`/wp-json/wp/v2/posts/${id}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching post ${id}:`, error)
        throw error
    }
}