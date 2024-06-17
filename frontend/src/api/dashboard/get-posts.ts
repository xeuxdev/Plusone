import { APIs, getRequest } from "@/lib/http-helpers";
import { QueryResponse } from "@/types/queries";
import { useQuery } from "@tanstack/react-query";

type Response = QueryResponse<{
  posts: ({
    _count: {
      comments: number;
    };
  } & {
    id: string;
    title: string;
    content: string;
    full_content: string;
    image: string | null;
    likesCount: number;
    viewCount: number;
    createdAt: Date;
    updatedAt: Date;
    user_id: string;
  })[];
  numOfPosts: number;
  numOfComments: number;
  totalViews: number;
}>;

async function getUserPosts() {
  const data = await getRequest<Response>({
    url: APIs.getUserPosts,
  });

  return data.data;
}

export function useGetUserPosts() {
  return useQuery({
    queryKey: ["get-user-posts"],
    queryFn: getUserPosts,
  });
}
