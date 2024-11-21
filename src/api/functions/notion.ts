import { axiosClient } from "@/lib/axios";
import { URLs } from "../URLs";

export const getNotionPages = async ({ projectId }: { projectId: string }) => {
  const response = await axiosClient.get(URLs.NOTION_PAGES_GET, {
    params: {
      projectId,
    },
  });

  return response?.data;
};
export const importFromNotion = async ({
  projectId,
  pageUrl,
  name,
}: {
  projectId: string;
  pageUrl: string;
  name: string;
}) => {
  const response = await axiosClient.post(URLs.NOTION_PAGES_IMPORT, {
    data: {
      projectId,
      pageUrl,
      name,
    },
  });
  return response?.data;
};

export const connectNotion = async ({
  code,
  projectId,
}: {
  code: string;
  projectId: string;
}) => {
  const response = await axiosClient.get(URLs.NOTION_PAGES_CONNECT, {
    params: {
      code,
      state: projectId,
    },
  });

  return response?.data;
};

export const disconnectNotion = async ({
  projectId,
}: {
  projectId: string;
}) => {
  const response = await axiosClient.delete(URLs.NOTION_PAGES_DISCONNECT, {
    params: {
      projectId,
    },
  });

  return response?.data;
};
