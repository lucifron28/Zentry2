export const NOTIFICATIONS_ENDPOINTS = {
  list: '/notifications/',
  markAllRead: '/notifications/mark-all-read/',
  detail: (id: string | number) => `/notifications/${id}/`,
} as const
