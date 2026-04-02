type LoadingStateProps = {
  title?: string
  description?: string
}

export function LoadingState({
  title = 'Loading content',
  description = 'Please wait while the system prepares this section.',
}: LoadingStateProps) {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
      <span className="loading loading-spinner loading-md text-primary" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold text-base-content">{title}</h3>
      <p className="mt-2 text-sm text-base-content/70">{description}</p>
    </section>
  )
}
