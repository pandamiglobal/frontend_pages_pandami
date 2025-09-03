import { IPagination, IPost } from "@/@types/@post"
import api from "@/common/config/api"

export async function getPosts(page: number = 1, limit: number = 9) {
    try {
        const response = await api.get<{ posts: IPost[], pagination: IPagination }>(`/post?page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        console.error("Error fetching posts:", error)
        // Retornando uma estrutura de dados compatível mesmo em caso de erro
        return {
            posts: [],
            pagination: {
                total_items: 0,
                total_pages: 1,
                current_page: page,
                limit: limit
            }
        }
    }
}