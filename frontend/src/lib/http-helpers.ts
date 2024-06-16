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

export const patchRequest = async <T, P>(params: {
  url: string;
  payload: P;
}) => {
  const { data } = await axiosClient.patch<T>(params.url, params.payload);

  return data;
};

export const APIs = {
  registerUser: "/user/register",
};
