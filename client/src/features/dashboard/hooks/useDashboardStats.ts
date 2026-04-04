import { useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api/client/httpClient'
import { DASHBOARD_ENDPOINTS } from '@/services/api/endpoints/dashboardEndpoints'

export type DashboardStats = {
  total_projects: number
  active_tasks: number
  pending_reviews: number
  upcoming_deadlines_count: number
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data } = await httpClient.get<DashboardStats>(DASHBOARD_ENDPOINTS.stats)
      return data
    },
  })
}
