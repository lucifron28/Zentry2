export type UserRole = 'admin' | 'user'

export type AuthUser = {
  id: number
  email: string
  first_name: string
  last_name: string
  display_name: string
  role: UserRole
  is_active: boolean
}

export type AuthLoginResponse = {
  access: string
  user: AuthUser
}

export type AuthRefreshResponse = {
  access: string
}

