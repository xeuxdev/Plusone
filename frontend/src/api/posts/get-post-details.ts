import { APIs, getRequest } from "@/lib/http-helpers";
import { QueryResponse } from "@/types/queries";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type Response = QueryResponse<
  | ({
      comments: {
        id: string;
        comment: string;
        commenter_name: string | null;
        createdAt: Date;
        updatedAt: Date;
        post_id: string;
      }[];
    } & {
      author: {
        name: string | null;
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
    })
  | null
>;

export async function getPostDetails(id: string) {
  const { data } = await getRequest<Response>({
    url: APIs.getPostDetails(id),
  });

  return data;
}

export function useGetPostDetails(postId?: string) {
  const { id } = useParams();

  const post_id = (postId || id) as string;

  return useQuery({
    queryKey: ["get-post-details"],
    queryFn: () => getPostDetails(post_id),
    refetchOnWindowFocus: false,
    staleTime: 50,
  });
}
