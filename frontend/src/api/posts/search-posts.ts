import { APIs, getRequest } from "@/lib/http-helpers";
import { QueryResponse } from "@/types/queries";
import { useQuery } from "@tanstack/react-query";

type Response = QueryResponse<
  {
    id: string;
    title: string;
    content: string;
    image: string | null;
    likesCount: number;
    createdAt: Date;
    updatedAt: Date;
    user_id: string;
  }[]
>;

async function searchPosts(query: string) {
  const { data } = await getRequest<Response>({
    url: APIs.searchPosts(query),
  });

  return data;
}

export function useSearchPosts(searchTerm: string) {
  return useQuery({
    queryKey: ["search-posts"],
    queryFn: () => searchPosts(searchTerm),
    refetchOnWindowFocus: false,
  });
}
