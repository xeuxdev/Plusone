import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = Cookies.get("plusone-auth");

  if (!cookie) {
    Navigate({ to: "/login", replace: true });
  }

  return !cookie ? null : children;
}
