import { axiosClient } from "@/lib/axios";
import { URLs } from "../URLs";

export const refineContent = async ({
  projectId,
  content,
  prompt,
  tone,
}: {
  projectId: string;
  content: string;
  prompt: string;
  tone?: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_REFINE_CONTENT, {
      projectId,
      content,
      prompt,
      tone: tone,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsCopilotAlternativeTitles = async ({
  projectId,
  documentId,
}: {
  projectId: string;
  documentId: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_COPILOT_ALT_TITLES, {
      projectId,
      documentId,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsCopilotContentAnalysis = async ({
  projectId,
  documentId,
}: {
  projectId: string;
  documentId: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_COPILOT_CONTENT_ANALYSIS, {
      projectId,
      documentId,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsCopilotChat = async ({
  projectId,
  documentId,
  message,
}: {
  projectId: string;
  message: string;
  documentId: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_COPILOT_CHAT, {
      projectId,
      documentId,
      message,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsCopilotRepurposeIdeas = async ({
  projectId,
  documentId,
}: {
  projectId: string;

  documentId: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_COPILOT_REPURPOSE_IDEAS, {
      projectId,
      documentId,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};
export const promptsRepurposeContent = async ({
  projectId,
  documentId,
  repurpose,
}: {
  projectId: string;
  repurpose: string;
  documentId: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_REPURPOSE_CONTENT, {
      projectId,
      repurpose,
      documentId,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptCopilotNextTopics = async ({
  projectId,
  documentId,
}: {
  projectId: string;
  documentId: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_COPILOT_NEXT_TOPICS, {
      projectId,
      documentId,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const promptsWriteNext = async ({
  projectId,
  content,
  topic,
}: {
  projectId: string;
  content: string;
  topic: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPTS_WRITE_NEXT, {
      projectId,
      content,
      prompt: topic,
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

export const promptInsertContent = async ({
  textBefore,
  textAfter,
  prompt,
  projectId,
}: {
  textBefore: string;
  textAfter: string;
  prompt: string;
  projectId: string;
}) => {
  const response = await axiosClient
    .post(URLs.PROMPT_INSERT_CONTENT, {
      textBefore,
      textAfter,
      prompt,
      projectId,
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export type PromptType =
  | "summarise"
  | "fix-grammar"
  | "simplify"
  | "expand"
  | "change-tone"
  | "insert-content"
  | "custom-prompt"
  | "generate-with-template"
  | "write-next"
  | "generate-alt-titles"
  | "generate-template";
export const runPrompts = async ({
  content,
  tone,
  type,
  customUserPrompt,
  projectId,
  textAfter,
  documentId,
  textBefore,
}: {
  textBefore?: string;
  textAfter?: string;
  type: PromptType;
  content?: string;
  tone?: string;
  projectId: string;
  customUserPrompt?: string;
  documentId?: string;
}) => {
  switch (type) {
    case "summarise":
      return refineContent({ projectId, content, prompt: type });
    case "write-next":
      return promptsWriteNext({ projectId, content, topic: customUserPrompt });
    case "fix-grammar":
      return refineContent({ projectId, content, prompt: type });
    case "generate-alt-titles":
      return promptsCopilotAlternativeTitles({ projectId, documentId });
    case "simplify":
      return refineContent({ projectId, content, prompt: type });
    case "expand":
      return refineContent({ projectId, content, prompt: type });
    case "change-tone":
      return refineContent({ projectId, content, prompt: type, tone: tone });
    case "custom-prompt":
      return promptsCustomPrompt({
        projectId,
        content,
        prompt: customUserPrompt,
      });
    case "insert-content":
      return promptInsertContent({
        projectId,
        textBefore: textBefore,
        textAfter: textAfter,
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
