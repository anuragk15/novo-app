import { axiosClient } from "@/lib/axios";
import { URLs } from "../URLs";

export const getSources = async ({ projectId }: { projectId: string }) => {
  const response = await axiosClient
    .get(URLs.SOURCES_GET, {
      params: {
        projectId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const addSource = async ({
  projectId,
  name,
  url,
}: {
  url: string;
  name: string;
  projectId: string;
}) => {
  const response = await axiosClient
    .post(URLs.SOURCES_ADD, {
      url,
      projectId,
      name,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const addSourceFile = async ({
  projectId,
  name,
  file,
}: {
  projectId: string;
  name: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("projectId", projectId);
  const response = await axiosClient
    .post(URLs.SOURCES_ADD_FILe, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const deleteSource = async ({
  sourceId,
  projectId,
}: {
  sourceId: string;
  projectId: string;
}) => {
  const response = await axiosClient
    .delete(URLs.SOURCES_DELETE + sourceId, {
      params: {
        projectId,
        sourceId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};
