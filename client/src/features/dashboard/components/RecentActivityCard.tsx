import { SectionCard } from '@/shared/ui/data/SectionCard'

export function RecentActivityCard() {
  return (
    <SectionCard
      title="Recent Activity"
      subtitle="Latest updates across all projects"
    >
      <div className="rounded-xl border border-dashed border-base-300 bg-base-100 px-4 py-8 text-center">
        <p className="text-sm font-medium text-base-content">Activity feed is in progress.</p>
        <p className="mt-1 text-xs text-base-content/60">
          This section will show real cross-project activity once the dedicated backend feed is available.
        </p>
      </div>
    </SectionCard>
  )
}
