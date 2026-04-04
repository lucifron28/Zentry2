import { AxiosHeaders, type AxiosInstance } from 'axios'
import { useAuthStore } from '@/features/auth/store/authStore'
import { refreshAccessToken } from '@/features/auth/api/authApi'

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

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      // If we got a 401 Unauthorized, and this is the first time we're caught
      if (error?.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
        (originalRequest as any)._retry = true

        const isAuthRoute = originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh')
        
        if (!isAuthRoute) {
          try {
            // Attempt to fetch new access token using HttpOnly refresh cookie
            const { access } = await refreshAccessToken()
            
            // Store new token in memory
            useAuthStore.getState().setAccessToken(access)
            
            // Retry the original request with the new token
            // The request interceptor will automatically attach the new token
            return client(originalRequest)
          } catch (refreshError) {
            // Refresh failed (cookie expired, missing etc)
            useAuthStore.getState().clearSession()
            return Promise.reject(refreshError)
          }
        }
      }

      // If it's a 401 and we either already retried or it's an auth route, clear session
      if (error?.response?.status === 401) {
        useAuthStore.getState().clearSession()
      }

      return Promise.reject(error)
    },
  )
}
