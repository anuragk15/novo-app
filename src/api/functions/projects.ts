import { axiosClient } from "@/lib/axios";
import { URLs } from "../URLs";

export const getProjects = async () => {
  const response = await axiosClient.get(URLs.PROJECTS_GET).catch((error) => {
    throw error;
  });
  return response.data;
};

export const deleteProject = async ({ projectId }: { projectId: string }) => {
  const response = await axiosClient
    .delete(URLs.PROJECTS_DELETE, {
      params: {
        projectId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const getProjectById = async ({ projectId }: { projectId: string }) => {
  const response = await axiosClient
    .get(URLs.PROJECT_BY_ID, {
      params: {
        projectId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};
export const getProjectCollaborators = async ({
  projectId,
}: {
  projectId: string;
}) => {
  const response = await axiosClient
    .get(URLs.PROJECTS_COLLABS, {
      params: {
        projectId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const inviteCollaborator = async ({
  projectId,
  email,
  accessLevel,
}: {
  projectId: string;
  email: string;
  accessLevel: "admin" | "manager" | "write" | "read";
}) => {
  const response = await axiosClient
    .post(URLs.PROJECTS_INVITE_COLLAB, {
      projectId,
      email,
      accessLevel,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const removeCollaborator = async ({
  projectId,
  collaboratorId,
}: {
  projectId: string;
  collaboratorId: string;
}) => {
  const response = await axiosClient
    .delete(URLs.PROJECTS_REMOVE_COLLAB, {
      params: {
        projectId,
        collaboratorId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const changeCollaboratorAccess = async ({
  projectId,
  collaboratorId,
  accessLevel,
}: {
  projectId: string;
  collaboratorId: string;
  accessLevel: "admin" | "manager" | "write" | "read";
}) => {
  const response = await axiosClient
    .post(URLs.PROJECTS_COLLAB_CHANGE_ACCESS, {
      projectId,
      collaboratorId,
      accessLevel,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const acceptInvite = async ({ inviteId }: { inviteId: string }) => {
  const response = await axiosClient
    .post(URLs.PROJECT_ACCEPT_INVITE, {
      inviteId,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const updateProject = async ({
  projectId,
  name,
}: {
  projectId: string;
  name: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROJECT_UPDATE, {
      projectId,
      name,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};
