import { useState, type PropsWithChildren } from 'react'

import { Sidebar } from '@/shared/ui/navigation/Sidebar'
import { Topbar } from '@/shared/ui/navigation/Topbar'

type AppShellProps = PropsWithChildren<{
  title: string
  subtitle?: string
  userIdentity: string | null
  onLogout: () => void
}>

export function AppShell({ children, title, subtitle, userIdentity, onLogout }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-base-200/40">
      {/* Desktop sidebar — flush left, full height, own scroll */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile sidebar overlay */}
      {sidebarOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <button
            className="absolute inset-0 bg-base-content/30"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          />
          <Sidebar className="relative z-10 flex h-full" onNavigate={() => setSidebarOpen(false)} />
        </div>
      ) : null}

      {/* Main content column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          title={title}
          subtitle={subtitle}
          userIdentity={userIdentity}
          onToggleSidebar={() => setSidebarOpen(true)}
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

