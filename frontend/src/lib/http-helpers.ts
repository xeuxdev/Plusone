import axiosClient from "./axios-client";

export const postRequest = async <T, P>(params: {
  url: string;
  payload: P;
}) => {
  const { data } = await axiosClient.post<T>(params.url, params.payload);

  return data;
};

export const deleteRequest = async <T>(params: { url: string }) => {
  const { data } = await axiosClient.delete<T>(params.url);

  return data;
};

export const putRequest = async <T, P>(params: { url: string; payload: P }) => {
  const { data } = await axiosClient.put<T>(params.url, params.payload);

  return data;
};

export const getRequest = async <T>(params: { url: string }) => {
  const { data } = await axiosClient.get<T>(params.url);

  return data;
};

export const APIs = {
  registerUser: "/user/register",
  loginUser: "/user/login",

  // posts
  getAllPosts: "/post/all",
  getPostDetails: (id: string) => `/post/${id}`,
  getUserPosts: "/post/me",
  deletePosts: (id: string) => `/post/${id}/delete`,
  searchPosts: (query: string) => `/post/search?term=${query}`,
  createPost: "/post/create",
  editPost: (id: string) => `/post/${id}/edit`,
  uploadBanner: "https://api.cloudinary.com/v1_1/dksup6zjc/image/upload",

  // comments
  createComment: (id: string) => `/post/${id}/comments/create`,
};
