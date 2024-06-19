import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { cookieNames } from "@/lib/utils";

export default function UnProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = Cookies.get(cookieNames.auth);

  if (cookie) {
    Navigate({ to: "/dashboard", replace: true });
  }

  return cookie ? null : children;
}
