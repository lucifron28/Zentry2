export type UserRole = 'admin' | 'project_manager' | 'team_member'

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
  refresh: string
  user: AuthUser
}

export type AuthRefreshResponse = {
  access: string
  refresh?: string
}
