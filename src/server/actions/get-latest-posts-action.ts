'use server'

import { IPost } from "@/common/types/IBlogArticlePost"
import getLatestPosts from "@/server/services/posts/get-latest-posts"

export default async function getLatestPostsAction(): Promise<{ posts: IPost[] } | never[]> {
    const posts = await getLatestPosts()
    return posts
}
