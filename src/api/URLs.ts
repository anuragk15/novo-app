export const URLs = {
  //Users
  USER_GET: "/users",
  USER_UPDATE: "/users/update",
  USER_DELETE: "/users/delete",
  USER_CREATE: "/users/create",

  // Prompts
  PROMPTS_REFINE_CONTENT: "/prompts/refine",
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

  //Recommendations
  RECOMMENDATIONS_GET: "/recommendations",
  RECOMMENDATIONS_ACCEPT: "/recommendations/accept",
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
  PROJECT_ONBOARD: "/projects/onboarding",
  PROJECT_ONBOARD_COMPETITORS: "/projects/competitor/add",
  PROJECTS_ADD_TAG: "/documents/add/tag",
  PROJECTS_GET_TAGS: "/documents/tags",
  PROJECTS_REMOVE_COLLAB: "/projects/remove/collaborator",

  // DOCUMENTS
  DOCUMENTS_GET: "/documents",
  DOCUMENTS_GET_BY_ID: "/documents/id",

  // Notion
  NOTION_PAGES_GET: "/notion/pages",
  NOTION_PAGES_CONNECT: "/notion/connect",
  NOTION_PAGES_DISCONNECT: "/notion/disconnect",
  NOTION_PAGES_IMPORT: "/notion/page-to-source",
  NOTION_DEV_AUTH_URL:
    "https://api.notion.com/v1/oauth/authorize?client_id=141d872b-594c-8038-a680-0037e5b2c087&response_type=code&owner=user&redirect_uri=https%3A%2F%2F3e75-103-249-38-244.ngrok-free.app%2Fadd%2Fnotion",
  NOTION_PROD_AUTH_URL:
    "https://api.notion.com/v1/oauth/authorize?client_id=141d872b-594c-8038-a680-0037e5b2c087&response_type=code&owner=user&redirect_uri=https%3A%2F%2Fwrite.withnovo.com%2Fadd%2Fnotion",
  DOCUMENTS_UPDATE: "/documents/update",
  DOCUMENTS_DELETE: "/documents/id",
  DOCUMENTS_SEARCH: "/documents/search",
  DOCUMENT_ATTACH_TAG: "/documents/tag/document",
  DOCUMENT_REMOVE_TAG: "/documents/remove/document-tag",
  ASSETS_UPLOAD: "/assets/upload",
};
