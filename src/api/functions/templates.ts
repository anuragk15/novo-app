import { axiosClient } from "@/lib/axios";
import { URLs } from "../URLs";

export const getTemplates = async ({ projectId }: { projectId: string }) => {
  const response = await axiosClient
    .get(URLs.TEMPLATES_GET, {
      params: {
        projectId,
      },
    })
    .catch((error) => {
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
  ////console.log(templateId, projectId);
  const response = await axiosClient
    .post(
      URLs.TEMPLATES_ADD_BOOKMARK,
      {
        templateId,
        projectId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .catch((error) => {
      throw error;
    });
  return response.data;
};
export const deleteBookmark = async ({
  bookmarkId,
}: {
  bookmarkId: string;
}) => {
  const response = await axiosClient
    .delete(URLs.TEMPLATES_DELETE_BOOKMARK, {
      data: {
        bookmarkId,
      },
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
