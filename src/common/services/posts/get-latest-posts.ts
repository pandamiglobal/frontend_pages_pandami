import { IPost } from "@/@types/@post"
import api from "@/common/config/api"

export default async function getLatestPosts() {
    try {
        const response = await api.get<{ posts: IPost[] }>(`/post?page=${1}&limit=${3}`)
        return response.data
    } catch (error) {
        console.error("Error fetching posts:", error)
        return []
    }
}
