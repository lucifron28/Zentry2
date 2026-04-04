export const TASKS_ENDPOINTS = {
  list: '/tasks/',
  detail: (id: string | number) => `/tasks/${id}/`,
} as const
