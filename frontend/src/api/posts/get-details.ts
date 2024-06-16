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
      image: string | null;
      likesCount: number;
      createdAt: Date;
      updatedAt: Date;
      user_id: string;
    })
  | null
>;

async function getPostDetails(id: string) {
  const { data } = await getRequest<Response>({
    url: APIs.getPostDetails(id),
  });

  return data;
}

export function useGetPostDetails() {
  const { id } = useParams();

  return useQuery({
    queryKey: ["get-post-details"],
    queryFn: () => getPostDetails(id!),
    refetchOnWindowFocus: false,
  });
}
