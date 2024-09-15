export const URLs = {
  //Users
  USER_GET: "/users",
  USER_UPDATE: "/users/update",
  USER_DELETE: "/users/delete",
  USER_CREATE: "/users/create",

  // Prompts
  PROMPTS_SUMMARISE: "/prompts/summarise",
  PROMPTS_FIX_GRAMMAR: "/prompts/fix-grammar",
  PROMPTS_SIMPLIFY: "/prompts/simplify",
  PROMPTS_EXPAND: "/prompts/expand",
  PROMPTS_CHANGE_TONE: "/prompts/change-tone",
  PROMPTS_CUSTOM_PROMPT: "/prompts/custom-prompt",
  PROMPTS_GENERATE_WITH_TEMPLATE: "/prompts/generate-with-template",
  PROMPTS_GENERATE_TEMPLATE: "/prompts/generate-template",
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
  PROJECTS_DELETE: "/projects",
  PROJECTS_COLLABS: "/projects/collaborators",
  PROJECT_BY_ID: "/projects/id",
  PROJECTS_INVITE_COLLAB: "/projects/invite/collaborator",
  PROJECTS_COLLAB_CHANGE_ACCESS: "/projects/change/collaborator/access",
  PROJECT_ACCEPT_INVITE: "/projects/invite/accept",
  PROJECT_UPDATE: "/projects/update",
  PROJECTS_ADD_TAG: "/documents/add/tag",
  PROJECTS_GET_TAGS: "/documents/tags",
  PROJECTS_REMOVE_COLLAB: "/projects/remove/collaborator",

  // DOCUMENTS
  DOCUMENTS_GET: "/documents",
  DOCUMENTS_GET_BY_ID: "/documents/id",

  DOCUMENTS_UPDATE: "/documents/update",
  DOCUMENTS_DELETE: "/documents",
  DOCUMENTS_SEARCH: "/documents/search",
  DOCUMENT_ATTACH_TAG: "/documents/tag/document",
  DOCUMENT_REMOVE_TAG: "/documents/remove/document-tag",
  ASSETS_UPLOAD: "/assets/upload",
};
