import { axiosClient } from "@/lib/axios";
import { URLs } from "../URLs";

export const getDocuments = async ({ projectId }: { projectId: string }) => {
  const response = await axiosClient.get(URLs.DOCUMENTS_GET, {
    params: {
      projectId,
    },
  });

  return response.data;
};

export const getDocumentById = async ({
  projectId,
  documentId,
}: {
  projectId: string;
  documentId: string;
}) => {
  const response = await axiosClient.get(URLs.DOCUMENTS_GET_BY_ID, {
    params: {
      projectId,
      documentId,
    },
  });

  return response.data;
};

export const createDocument = async ({
  documentId,
  content,
  title,
  projectId,
}: {
  content: string;
  title: string;
  projectId: string;

  documentId: string;
}) => {
  const response = await axiosClient
    .post(URLs.DOCUMENTS_UPDATE, {
      documentId,
      content,
      title,
      projectId,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const updateDocument = async ({
  documentId,
  content,
  title,
  projectId,
}: {
  content: string;
  title: string;
  projectId: string;

  documentId: string;
}) => {
  const response = await axiosClient
    .post(URLs.DOCUMENTS_UPDATE, {
      documentId,
      content,
      title,
      projectId,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const deleteDocument = async ({
  projectId,
  documentId,
}: {
  projectId: string;
  documentId: string;
}) => {
  const response = await axiosClient
    .delete(URLs.DOCUMENTS_DELETE, {
      params: {
        projectId,
        documentId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const searchDocuments = async ({
  query,
  projectId,
}: {
  projectId: string;
  query: string;
}) => {
  const response = await axiosClient
    .get(URLs.DOCUMENTS_SEARCH, {
      params: {
        projectId,
        search: query,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const addDocumentTag = async ({
  projectId,
  tag,
}: {
  projectId: string;
  tag: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROJECTS_ADD_TAG, {
      projectId,
      tag,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const getDocumentTags = async ({ projectId }: { projectId: string }) => {
  const response = await axiosClient
    .get(URLs.PROJECTS_GET_TAGS, {
      params: {
        projectId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const addTagToDocument = async ({
  documentId,
  projectId,
  tagId,
}: {
  documentId: string;
  projectId: string;
  tagId: string;
}) => {
  const response = await axiosClient
    .post(URLs.DOCUMENT_ATTACH_TAG, {
      documentId,
      projectId,
      tagId,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const removeTagFromDocument = async ({
  projectId,
  tagId,
  documentId,
}: {
  projectId: string;
  tagId: string;
  documentId: string;
}) => {
  const response = await axiosClient
    .delete(URLs.DOCUMENT_REMOVE_TAG, {
      data: {
        projectId,
        tagId,
        documentId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};
