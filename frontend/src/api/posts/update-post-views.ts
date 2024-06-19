import { APIs, putRequest } from "@/lib/http-helpers";
import { useMutation } from "@tanstack/react-query";

async function updatePostViews(id: string) {
  return putRequest({
    url: APIs.updatePostViews(id),
    payload: {},
  });
}

export function useUpdatePostViews() {
  return useMutation({
    mutationKey: ["update-post-views"],
    mutationFn: updatePostViews,
  });
}
