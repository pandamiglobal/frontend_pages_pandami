import { IPost } from "@/@types/@post"
import api from "@/common/config/api"

export async function getPosts(page: number = 1, limit: number = 9) {
    try {
        const response = await api.get<{ posts: IPost[] }>(`/post?page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        console.error("Error fetching posts:", error)
        return []
    }
}