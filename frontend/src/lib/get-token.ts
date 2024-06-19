import Cookies from "js-cookie";
import { cookieNames } from "./utils";

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return Cookies.get(cookieNames.auth);
};
