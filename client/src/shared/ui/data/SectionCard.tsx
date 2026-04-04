import type { ReactNode } from 'react'

type SectionCardProps = {
  title: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  className = '',
}: SectionCardProps) {
  return (
    <div className={['card bg-base-100 border border-base-200 shadow-sm', className].join(' ')}>
      <div className="card-body p-0">
        <div className="flex items-center justify-between border-b border-base-200 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-base-content">{title}</h2>
            {subtitle ? (
              <p className="mt-0.5 text-xs text-base-content/55">{subtitle}</p>
            ) : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}
