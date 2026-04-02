type TopbarProps = {
  title: string
  subtitle?: string
  userEmail: string | null
  onToggleSidebar: () => void
  onLogout: () => void
}

export function Topbar({ title, subtitle, userEmail, onToggleSidebar, onLogout }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-start gap-3">
          <button className="btn btn-ghost btn-square btn-sm lg:hidden" onClick={onToggleSidebar} aria-label="Open navigation">
            <span className="text-xs font-semibold uppercase tracking-[0.08em]">Menu</span>
          </button>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-base-content sm:text-xl">{title}</h2>
            {subtitle ? <p className="mt-1 text-sm text-base-content/70">{subtitle}</p> : null}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs uppercase tracking-[0.14em] text-base-content/60">Session</p>
            <p className="max-w-56 truncate text-sm font-medium text-base-content">{userEmail ?? 'Authenticated user'}</p>
          </div>

          <button className="btn btn-sm btn-outline" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
