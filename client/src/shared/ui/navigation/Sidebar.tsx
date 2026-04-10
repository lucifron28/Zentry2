import { NavLink } from 'react-router-dom'

import { APP_NAV_ITEMS } from '@/shared/constants/navigation'

type SidebarProps = {
  className?: string
  onNavigate?: () => void
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const sidebarClassName = [
    'flex h-screen w-64 shrink-0 flex-col border-r border-base-300 bg-base-100 overflow-y-auto',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <aside className={sidebarClassName}>
      {/* Brand header */}
      <div className="border-b border-base-300 px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-content shadow-md">
            <img src="/zentry-icon.png" alt="" className="h-6 w-6 object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold tracking-tight text-base-content">Zentry</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-base-content/45 leading-none mt-1">
              Workspace v0.1
            </p>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Primary">
        {APP_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) => {
              const base = 'block rounded-xl border px-3 py-3 transition-colors'
              const active = 'border-primary/20 bg-primary/10 text-primary'
              const idle =
                'border-transparent text-base-content/80 hover:border-base-300 hover:bg-base-200/70 hover:text-base-content'
              return `${base} ${isActive ? active : idle}`
            }}
          >
            <p className="text-sm font-semibold">{item.label}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-base-content/55">{item.subtitle}</p>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-base-300 px-5 py-4 text-xs text-base-content/40">
        Team Workspace
      </div>
    </aside>
  )
}
