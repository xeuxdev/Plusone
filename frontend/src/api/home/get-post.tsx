import { APIs, getRequest } from "@/lib/http-helpers";
import { QueryResponse } from "@/types/queries";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

type Response = QueryResponse<
  {
    posts: {
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
    }[];
  } & { nextCursor: string; hasNextPage: string }
>;

async function getAllPosts() {
  const data = await getRequest<Response>({
    url: APIs.getAllPosts(0),
  });

  return data.data;
}

export function useGetPosts() {
  return useQuery({
    queryKey: ["get-posts"],
    queryFn: getAllPosts,
  });
}

const fetchProjects = async ({ pageParam }: { pageParam: number }) => {
  const data = await getRequest<Response>({
    url: APIs.getAllPosts(pageParam),
  });

  return data.data;
};

export function useGetPostsInfinite() {
  return useInfiniteQuery({
    queryKey: ["get-posts-infinite"],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) {
        return undefined;
      }
      return parseInt(lastPage.nextCursor);
    },
    refetchOnWindowFocus: false,
  });
}
