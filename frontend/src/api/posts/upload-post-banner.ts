import { APIs } from "@/lib/http-helpers";
import { displayQueryError, notify, showSuccess } from "@/lib/utils";
import { QueryError } from "@/types/queries";
import { useMutation } from "@tanstack/react-query";

type UploadProfileResponse = {
  secure_url: string;
};

export async function uploadToCloudinary(data: FormData) {
  notify(`Uploading Image`);

  const req = await fetch(APIs.uploadBanner, {
    method: "POST",
    body: data,
  });

  const res = await req.json();

  return res as UploadProfileResponse;
}

export const useUploadPostBannerImage = () => {
  return useMutation({
    mutationFn: uploadToCloudinary,
    onSuccess(data) {
      showSuccess("Uploaded Successfully");
      localStorage.setItem("banner-image", data.secure_url);
    },
    onError: (error: QueryError) => {
      displayQueryError(error);
    },
  });
};
