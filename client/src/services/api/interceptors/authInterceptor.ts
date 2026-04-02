import { AxiosHeaders, type AxiosInstance } from 'axios'
import { useAuthStore } from '@/features/auth/store/authStore'

export function registerAuthInterceptor(client: AxiosInstance) {
  client.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken

    if (!accessToken) {
      return config
    }

    if (config.headers && 'set' in config.headers) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    } else {
      const headers = AxiosHeaders.from(config.headers ?? {})
      headers.set('Authorization', `Bearer ${accessToken}`)
      config.headers = headers
    }

    return config
  })
}
