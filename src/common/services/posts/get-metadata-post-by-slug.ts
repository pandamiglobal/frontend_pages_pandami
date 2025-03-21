import { IMetadataPost } from "@/@types/@post";
import api from "@/common/config/api";

export async function getMetadataPostBySlug(slug: string) {
    try {
        const response = await api.get<IMetadataPost>(`/post/metadata/by-slug/${slug}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error)
        throw error
    }
}