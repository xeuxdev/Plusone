import { APIs, getRequest } from "@/lib/http-helpers";
import { QueryResponse } from "@/types/queries";
import { useQuery } from "@tanstack/react-query";

type Response = QueryResponse<
  {
    id: string;
    title: string;
    content: string;
    image: string;
    likesCount: number;
    createdAt: Date;
    updatedAt: Date;
    user_id: string;
    author: {
      name: string;
    };
  }[]
>;

async function getAllPosts() {
  const data = await getRequest<Response>({
    url: APIs.getAllPosts,
  });

  return data.data;
}

export function useGetPosts() {
  return useQuery({
    queryKey: ["get-posts"],
    queryFn: getAllPosts,
  });
}
