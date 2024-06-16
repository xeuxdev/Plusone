import { CreateCommentType } from "@/components/posts/comment-form";
import { APIs, postRequest } from "@/lib/http-helpers";
import { displayQueryError, showSuccess } from "@/lib/utils";
import { QueryError, QueryResponse } from "@/types/queries";
import { QueryClient, useMutation } from "@tanstack/react-query";

async function createComment(values: CreateCommentType) {
  return postRequest<QueryResponse<{ message: string }>, CreateCommentType>({
    url: APIs.createComment(values.post_id),
    payload: values,
  });
}

export function useCreateComment() {
  const queryClient = new QueryClient();

  return useMutation({
    mutationKey: ["create-comment"],
    mutationFn: createComment,

    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["get-post-details"],
      });
      showSuccess(data.message);
    },
    onError(error: QueryError) {
      displayQueryError(error);
    },
  });
}
