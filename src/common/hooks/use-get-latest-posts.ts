'use server'

import { IPost } from "@/common/types/@post"
import getLatestPostsAction from "@/server/actions/get-latest-posts-action"

export default function useGetLatestPosts() {
  const execGetLatestPosts = async () => {
    const response = await getLatestPostsAction()

    if (!Object.hasOwn(response as object, "posts")) {
      return [] as IPost[]
    }

    return (response as { posts: IPost[] }).posts
  }

  return { execGetLatestPosts }
}
