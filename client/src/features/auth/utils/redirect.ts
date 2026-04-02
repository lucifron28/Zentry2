import { APP_ROUTES } from '@/shared/constants/routes'

type RedirectState = {
  from?: unknown
} | null

export function buildIntendedPath(pathname: string, search: string, hash: string) {
  const fullPath = `${pathname}${search}${hash}`
  return fullPath || APP_ROUTES.dashboard
}

export function resolvePostLoginPath(
  redirectState: RedirectState,
  fallbackPath = APP_ROUTES.dashboard,
) {
  const from = redirectState?.from

  if (typeof from !== 'string') {
    return fallbackPath
  }

  if (!from.startsWith('/')) {
    return fallbackPath
  }

  if (from === APP_ROUTES.login || from === APP_ROUTES.root) {
    return fallbackPath
  }

  return from
}
