import { APIs, putRequest } from "@/lib/http-helpers";
import { displayQueryError, showSuccess } from "@/lib/utils";
import { EditPostType } from "@/pages/posts/edit";
import { QueryError, QueryResponse } from "@/types/queries";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function editPost(values: EditPostType) {
  return putRequest<QueryResponse<{ id: string }>, EditPostType>({
    url: APIs.editPost(values.id),
    payload: values,
  });
}

export function useEditPost() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["edit-post"],
    mutationFn: editPost,

    onSuccess(data) {
      showSuccess(data.message);

      navigate(`/p/${data.data.id}`);
      localStorage.removeItem("edit-post");
    },

    onError(error: QueryError) {
      displayQueryError(error);
      console.log(error.response?.data.message);
    },
  });
}
