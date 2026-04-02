import { EmptyState } from '@/shared/ui/states/EmptyState'

type ModuleScaffoldPageProps = {
  title: string
  description: string
}

export function ModuleScaffoldPage({ title, description }: ModuleScaffoldPageProps) {
  return (
    <section className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-base-content sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-base-content/70 sm:text-base">{description}</p>
      </header>

      <EmptyState
        title={`${title} module scaffold`}
        description="This screen is ready for module-specific components, data hooks, and workflows in the next commit."
      />
    </section>
  )
}
