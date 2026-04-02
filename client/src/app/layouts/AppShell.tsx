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
    <div className="min-h-screen bg-base-200/50">
      <div className="mx-auto flex min-h-screen w-full max-w-250">
        <Sidebar className="hidden lg:block" />

        {sidebarOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
            <button
              className="absolute inset-0 bg-base-content/35"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation"
            />
            <Sidebar className="relative z-10 h-full" onNavigate={() => setSidebarOpen(false)} />
          </div>
        ) : null}

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Topbar
            title={title}
            subtitle={subtitle}
            userIdentity={userIdentity}
            onToggleSidebar={() => setSidebarOpen(true)}
            onLogout={onLogout}
          />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
