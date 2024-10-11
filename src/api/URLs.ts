export const URLs = {
  //Users
  USER_GET: "/users",
  USER_UPDATE: "/users/update",
  USER_DELETE: "/users/delete",
  USER_CREATE: "/users/create",

  // Prompts
  PROMPTS_SUMMARISE: "/prompts/summarise",
  PROMPTS_WRITE_NEXT: "/prompts/next-content",
  PROMPT_INSERT_CONTENT: "/prompts/insert-content",
  PROMPTS_FIX_GRAMMAR: "/prompts/fix-grammar",
  PROMPTS_SIMPLIFY: "/prompts/simplify",
  PROMPTS_EXPAND: "/prompts/expand",
  PROMPTS_CHANGE_TONE: "/prompts/change-tone",
  PROMPTS_CUSTOM_PROMPT: "/prompts/custom-prompt",
  PROMPTS_GENERATE_WITH_TEMPLATE: "/prompts/generate-with-template",
  PROMPTS_GENERATE_TEMPLATE: "/prompts/generate-template",
  PROMPTS_COPILOT_ALT_TITLES: "/prompts/copilot/alternative-titles",
  PROMPTS_COPILOT_CONTENT_ANALYSIS: "/prompts/copilot/content-analysis",
  PROMPTS_COPILOT_NEXT_TOPICS: "/prompts/copilot/generate-next-topics",
  PROMPTS_COPILOT_REPURPOSE_IDEAS: "/prompts/copilot/generate-repurpose-ideas",
  PROMPTS_REPURPOSE_CONTENT: "/prompts/copilot/repurpose-content",

  PROMPTS_COPILOT_CHAT: "/prompts/copilot/chat",

  //Sources
  SOURCES_GET: "/sources",
  SOURCES_ADD: "/sources/add",
  SOURCES_ADD_FILe: "/sources/add/file",
  SOURCES_DELETE: "/sources/delete/",

  //Templates
  TEMPLATES_GET: "/templates",
  TEMPLATES_GET_BOOKMARKS: "/templates/bookmarks",
  TEMPLATES_GET_USER_GENERATED: "/templates/user-generated",
  TEMPLATES_ADD_BOOKMARK: "/templates/add/bookmark",
  TEMPLATES_DELETE_BOOKMARK: "/templates/remove/bookmark",

  TEMPLATES_ADD_USER_GENERATED: "/templates/add/user-template",

  //Projects
  PROJECTS_GET: "/projects",
  INVITES_GET: "/projects/invites",
  PROJECTS_DELETE: "/projects/id",
  PROJECTS_BILLING: "/projects/billing",
  PROJECTS_COLLABS: "/projects/collaborators",
  PROJECT_BY_ID: "/projects/id",
  PROJECTS_INVITE_COLLAB: "/projects/invite/collaborator",
  PROJECTS_REMOVE_INVITE: "/projects/remove/invite",

  PROJECTS_COLLAB_CHANGE_ACCESS: "/projects/change/collaborator/access",
  PROJECTS_RESPOND_INVITE: "/projects/invite/respond",
  PROJECT_UPDATE: "/projects/update",
  PROJECTS_ADD_TAG: "/documents/add/tag",
  PROJECTS_GET_TAGS: "/documents/tags",
  PROJECTS_REMOVE_COLLAB: "/projects/remove/collaborator",

  // DOCUMENTS
  DOCUMENTS_GET: "/documents",
  DOCUMENTS_GET_BY_ID: "/documents/id",

  DOCUMENTS_UPDATE: "/documents/update",
  DOCUMENTS_DELETE: "/documents/id",
  DOCUMENTS_SEARCH: "/documents/search",
  DOCUMENT_ATTACH_TAG: "/documents/tag/document",
  DOCUMENT_REMOVE_TAG: "/documents/remove/document-tag",
  ASSETS_UPLOAD: "/assets/upload",
};
