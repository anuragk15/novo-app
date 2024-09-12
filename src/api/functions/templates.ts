import { axiosClient } from "@/lib/axios";
import { URLs } from "../URLs";

export const getTemplates = async () => {
  const response = await axiosClient.get(URLs.TEMPLATES_GET).catch((error) => {
    throw error;
  });
  return response.data;
};

export const getBookmarks = async ({ projectId }: { projectId: string }) => {
  const response = await axiosClient
    .get(URLs.TEMPLATES_GET_BOOKMARKS, {
      params: {
        projectId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const getUserGeneratedTemplates = async ({
  projectId,
}: {
  projectId: string;
}) => {
  const response = await axiosClient
    .get(URLs.TEMPLATES_GET_USER_GENERATED, {
      params: {
        projectId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const addBookmark = async ({
  templateId,
  projectId,
}: {
  templateId: string;
  projectId: string;
}) => {
  const response = await axiosClient
    .post(URLs.TEMPLATES_ADD_BOOKMARK, {
      templateId,
      projectId,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const addUserGeneratedTemplate = async ({
  projectId,
  title,
  fields,
  prompt,
  tags,
  description,
}: {
  projectId: string;
  title: string;
  fields: string;
  prompt: string;
  tags: string;
  description: string;
}) => {
  const response = await axiosClient
    .post(URLs.TEMPLATES_ADD_USER_GENERATED, {
      projectId,
      title,
      fields,
      prompt,
      tags,
      description,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};
