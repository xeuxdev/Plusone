import { APIs, postRequest } from "@/lib/http-helpers";
import { displayQueryError, showSuccess } from "@/lib/utils";
import { CreatePostType } from "@/pages/blog/new";
import { QueryError, QueryResponse } from "@/types/queries";
import { useMutation } from "@tanstack/react-query";

async function createPost(values: CreatePostType) {
  return postRequest<QueryResponse<{ id: string }>, CreatePostType>({
    url: APIs.createPost,
    payload: values,
  });
}

export function useCreatePost() {
  return useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPost,

    onSuccess(data) {
      showSuccess(data.message);
    },
    onError(error: QueryError) {
      displayQueryError(error);
    },
  });
}
