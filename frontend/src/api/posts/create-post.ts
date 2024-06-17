import { APIs, postRequest } from "@/lib/http-helpers";
import { displayQueryError, showSuccess } from "@/lib/utils";
import { CreatePostType } from "@/pages/posts/new";
import { QueryError, QueryResponse } from "@/types/queries";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function createPost(values: CreatePostType) {
  return postRequest<QueryResponse<{ id: string }>, CreatePostType>({
    url: APIs.createPost,
    payload: values,
  });
}

export function useCreatePost() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPost,

    onSuccess(data) {
      showSuccess(data.message);
      navigate(`/p/${data.data.id}`);
      localStorage.removeItem("new-post");
    },

    onError(error: QueryError) {
      displayQueryError(error);
    },
  });
}
