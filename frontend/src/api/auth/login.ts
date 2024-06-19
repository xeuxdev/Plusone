import { LoginType } from "@/components/auth/login-form";
import { APIs, postRequest } from "@/lib/http-helpers";
import { displayQueryError, showSuccess } from "@/lib/utils";
import useUserStore from "@/store/user";
import { QueryError, QueryResponse } from "@/types/queries";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type Response = {
  token: string;
  name: string;
  email: string;
  id: string;
};

export function loginUser(values: LoginType) {
  return postRequest<QueryResponse<Response>, LoginType>({
    url: APIs.loginUser,
    payload: {
      email: values.email.trim(),
      password: values.password,
    },
  });
}

export function useLoginUser() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationKey: ["login-user"],
    mutationFn: loginUser,
    onSuccess(data) {
      showSuccess(data.message);

      Cookies.set("plusone-auth", data.data.token, {
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: 60 * 60 * 24,
      });

      setUser({
        name: data.data.name,
        email: data.data.email,
        id: data.data.id,
      });

      navigate("/dashboard");
    },
    onError(error: QueryError) {
      displayQueryError(error);
    },
  });
}
