import axios from 'axios'
import { registerAuthInterceptor } from '@/services/api/interceptors/authInterceptor'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1',
  timeout: 10000,
})

registerAuthInterceptor(httpClient)
