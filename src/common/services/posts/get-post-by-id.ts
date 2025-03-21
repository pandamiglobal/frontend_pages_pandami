import { IPost } from "@/@types/@post";
import api from "@/common/config/api";

export async function getPostById(id: number) {
    try {
        const response = await api.get<IPost>(`/post/${id}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching post ${id}:`, error)
        throw error
    }
}