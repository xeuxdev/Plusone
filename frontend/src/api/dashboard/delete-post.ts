import { APIs, deleteRequest } from "@/lib/http-helpers";
import { displayQueryError, showSuccess } from "@/lib/utils";
import { QueryError } from "@/types/queries";
import { QueryClient, useMutation } from "@tanstack/react-query";

async function deletePost(id: string) {
  return deleteRequest<{ message: string }>({
    url: APIs.deletePosts(id),
  });
}

export function useDeletePost() {
  const queryClient = new QueryClient();

  return useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePost,
    onSuccess(data) {
      showSuccess(data.message);
      queryClient.invalidateQueries({
        queryKey: ["get-user-posts"],
      });
    },
    onError(error: QueryError) {
      displayQueryError(error);
    },
  });
}
