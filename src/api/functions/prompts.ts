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
  tone,
}: {
  projectId: string;
  tone: string;
  content: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_CHANGE_TONE, {
      projectId,
      content,
      tone,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsCustomPrompt = async ({
  projectId,
  content,
  prompt,
}: {
  projectId: string;
  content: string;
  prompt: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_CUSTOM_PROMPT, {
      projectId,
      content,
      prompt,
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

export const runPrompts = async ({
  content,
  tone,
  type,
  customUserPrompt,
  projectId,
}: {
  type:
    | "summarise"
    | "fix-grammar"
    | "simplify"
    | "expand"
    | "change-tone"
    | "custom-prompt"
    | "generate-with-template"
    | "generate-template";
  content: string;
  tone?: string;
  projectId: string;
  customUserPrompt?: string;
}) => {
  switch (type) {
    case "summarise":
      return promptsSummarise({ projectId, content });
    case "fix-grammar":
      return promptsFixGrammar({ projectId, content });
    case "simplify":
      return promptsSimplify({ projectId, content });
    case "expand":
      return promptsExpand({ projectId, content });
    case "change-tone":
      return promptsChangeTone({ projectId, content, tone });
    case "custom-prompt":
      return promptsCustomPrompt({
        projectId,
        content,
        prompt: customUserPrompt,
      });
    case "generate-with-template":
      return promptsGenerateWithTemplate({
        projectId,
        title: "Untitled",
        templateId: customUserPrompt,
        fields: {},
      });
    case "generate-template":
      return promptsGenerateTemplate({ projectId, content });
    default:
      throw new Error("Invalid prompt type");
  }
};
