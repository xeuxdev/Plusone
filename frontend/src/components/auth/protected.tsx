import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import useUserStore from "@/store/user";
import { cookieNames } from "@/lib/utils";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth, expiresAt } = cookieNames;

  const cookie = Cookies.get(auth);
  const expired = Cookies.get(expiresAt);

  const { logout } = useUserStore();

  if (!cookie || !expired || Number(expired) < new Date().getTime()) {
    logout();

    Cookies.remove(auth);
    Cookies.remove(expiresAt);
    Navigate({ to: "/login", replace: true });
  }

  return !cookie ? null : children;
}
