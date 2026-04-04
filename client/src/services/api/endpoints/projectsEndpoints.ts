export const PROJECTS_ENDPOINTS = {
  list: '/projects/',
  detail: (id: string | number) => `/projects/${id}/`,
  members: (id: string | number) => `/projects/${id}/members/`,
} as const
