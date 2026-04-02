type ErrorStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'The requested content could not be loaded at this time.',
  actionLabel = 'Try again',
  onAction,
}: ErrorStateProps) {
  return (
    <section className="rounded-2xl border border-error/30 bg-base-100 p-8 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-base-content">{title}</h3>
      <p className="mt-2 text-sm text-base-content/70">{description}</p>
      {onAction ? (
        <button className="btn btn-error btn-outline mt-5 btn-sm" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}
