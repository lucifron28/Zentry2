type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  title = 'No records yet',
  description = 'Content for this module will appear here as implementation progresses.',
  actionLabel = 'Refresh',
  onAction,
}: EmptyStateProps) {
  return (
    <section className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-8 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-base-content">{title}</h3>
      <p className="mt-2 text-sm text-base-content/70">{description}</p>
      {onAction ? (
        <button className="btn btn-primary mt-5 btn-sm" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}
