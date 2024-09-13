import { axiosClient } from "@/lib/axios";
import { URLs } from "../URLs";

export const promptsSummarise = async ({
  projectId,
  content,
}: {
  projectId: string;
  content: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_SUMMARISE, {
      projectId,
      content,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsFixGrammar = async ({
  projectId,
  content,
}: {
  projectId: string;
  content: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_FIX_GRAMMAR, {
      projectId,
      content,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsSimplify = async ({
  projectId,
  content,
}: {
  projectId: string;
  content: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_SIMPLIFY, {
      projectId,
      content,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsExpand = async ({
  projectId,
  content,
}: {
  projectId: string;
  content: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_EXPAND, {
      projectId,
      content,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsChangeTone = async ({
  projectId,
  content,
}: {
  projectId: string;
  content: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_CHANGE_TONE, {
      projectId,
      content,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsCustomPrompt = async ({
  projectId,
  content,
}: {
  projectId: string;
  content: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_CUSTOM_PROMPT, {
      projectId,
      content,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsGenerateWithTemplate = async ({
  projectId,
  title,
  templateId,
  fields,
}: {
  projectId: string;
  title: string;
  templateId: string;
  fields: unknown;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_GENERATE_WITH_TEMPLATE, {
      projectId,
      title,
      templateId,
      fields,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsGenerateTemplate = async ({
  projectId,
  content,
}: {
  projectId: string;
  content: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_GENERATE_TEMPLATE, {
      projectId,
      content,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};
