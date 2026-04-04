import { useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api/client/httpClient'
import { NOTIFICATIONS_ENDPOINTS } from '@/services/api/endpoints/notificationsEndpoints'

export type ApiNotification = {
  id: string | number
  recipient: number
  actor: number | null
  actor_details?: {
    id: number
    display_name: string
  }
  verb: string
  target_type: string
  target_id: number | null
  target_name: string
  is_read: boolean
  created_at: string
}

type PaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export function useNotifications(isRead?: boolean) {
  return useQuery({
    queryKey: ['notifications', { isRead }],
    queryFn: async () => {
      const params = isRead !== undefined ? { is_read: isRead } : undefined
      const { data } = await httpClient.get<PaginatedResponse<ApiNotification>>(
        NOTIFICATIONS_ENDPOINTS.list,
        { params },
      )
      return data
    },
  })
}
