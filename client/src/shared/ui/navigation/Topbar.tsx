import { Link } from 'react-router-dom'
import { useThemeStore, THEME_OPTIONS } from '@/shared/hooks/useThemeStore'
import { APP_ROUTES } from '@/shared/constants/routes'

type TopbarProps = {
  title: string
  subtitle?: string
  userIdentity: string | null
  onToggleSidebar: () => void
  onLogout: () => void
}

export function Topbar({ title, subtitle, userIdentity, onToggleSidebar, onLogout }: TopbarProps) {
  const { theme, setTheme } = useThemeStore()

  return (
    <header className="sticky top-0 z-20 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">

        {/* Left — menu toggle + page title */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            className="btn btn-ghost btn-square btn-sm lg:hidden"
            onClick={onToggleSidebar}
            aria-label="Open navigation"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-base-content sm:text-xl">{title}</h2>
            {subtitle ? <p className="mt-0.5 text-xs text-base-content/60 truncate">{subtitle}</p> : null}
          </div>
        </div>

        {/* Right — notifications + theme switcher + session + logout */}
        <div className="flex flex-shrink-0 items-center gap-1.5">

          {/* Notification bell */}
          <Link
            to={APP_ROUTES.notifications}
            className="btn btn-ghost btn-square btn-sm relative"
            aria-label="Notifications"
          >
            <svg
              className="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </Link>

          {/* Theme switcher */}
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-square btn-sm"
              aria-label="Switch theme"
              title={`Theme: ${theme}`}
            >
              <svg
                className="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m8.66-13l-.87.5M4.21 17.5l-.87.5M20.66 17.5l-.87-.5M4.21 6.5l-.87-.5M21 12h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm z-50 mt-2 w-44 rounded-xl border border-base-200 bg-base-100 p-1.5 shadow-lg"
            >
              {THEME_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <button
                    className={[
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                      theme === opt.value
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'text-base-content hover:bg-base-200',
                    ].join(' ')}
                    onClick={() => setTheme(opt.value)}
                  >
                    {opt.label}
                    {theme === opt.value && (
                      <svg className="h-3.5 w-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-1 hidden h-5 w-px bg-base-300 sm:block" aria-hidden="true" />

          {/* Session + Logout */}
          <div className="hidden text-right sm:block">
            <p className="text-xs uppercase tracking-[0.12em] text-base-content/50">Session</p>
            <p className="max-w-40 truncate text-xs font-medium text-base-content">{userIdentity ?? 'Authenticated'}</p>
          </div>

          <button className="btn btn-sm btn-outline" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

