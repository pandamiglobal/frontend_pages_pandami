'use server'

import { IPost } from "@/common/types/@post"
import getLatestPosts from "../services/posts/get-latest-posts"

export default async function getLatestPostsAction(): Promise<{ posts: IPost[] } | never[]> {
    const posts = await getLatestPosts()
    return posts
}
