import { APIs, getRequest } from "@/lib/http-helpers";
import { useQuery } from "@tanstack/react-query";

type Response = {
  data: {
    id: string;
    title: string;
    content: string;
    likesCount: number;
    createdAt: Date;
    updatedAt: Date;
    user_id: string;
  }[];
};

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
