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
      <div className="border-b border-base-300 px-5 py-5">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-base-content/60">Zentry</p>
        <h1 className="mt-1 text-lg font-semibold text-base-content">Team Project Management</h1>
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
        Zentry v0.1 · Team Workspace
      </div>
    </aside>
  )
}
