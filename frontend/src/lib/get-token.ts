import Cookies from "js-cookie";

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return Cookies.get("plusone-auth");
};

export const getUserId = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return Cookies.get("plusone-user-id");
};
