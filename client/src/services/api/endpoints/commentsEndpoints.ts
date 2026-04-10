export const COMMENTS_ENDPOINTS = {
  list: '/comments/',
  detail: (id: string | number) => `/comments/${id}/`,
} as const
