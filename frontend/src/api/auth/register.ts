import { RegisterType } from "@/components/auth/register-form";
import { APIs, postRequest } from "@/lib/http-helpers";
import { displayQueryError, showSuccess } from "@/lib/utils";
import { ErrorData, QueryResponse } from "@/types/queries";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export function registerUser(values: RegisterType) {
  return postRequest<QueryResponse<{ message: string }>, RegisterType>({
    url: APIs.registerUser,
    payload: values,
  });
}

export function useRegisterUser() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["register-user"],
    mutationFn: registerUser,
    onSuccess(data) {
      showSuccess(data.message);
      navigate("/login");
    },
    onError(error: AxiosError<ErrorData>) {
      displayQueryError(error);
    },
  });
}
