import { axiosClient } from "@/lib/axios";
import { URLs } from "../URLs";

export const getUser = async () => {
  const response = await axiosClient.get(URLs.USER_GET).catch((error) => {
    throw error;
  });
  return response.data;
};

export const createUser = async () => {
  const response = await axiosClient.post(URLs.USER_CREATE).catch((error) => {
    throw error;
  });
  return response.data;
};

export const updateUser = async ({ username }: { username: string }) => {
  const response = await axiosClient
    .post(URLs.USER_UPDATE, {
      username,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const deleteUser = async () => {
  const response = await axiosClient.delete(URLs.USER_DELETE).catch((error) => {
    throw error;
  });
  return response.data;
};
