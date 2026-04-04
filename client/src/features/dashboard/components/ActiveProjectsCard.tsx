import { Link } from 'react-router-dom'
import { SectionCard } from '@/shared/ui/data/SectionCard'
import { StatusBadge } from '@/shared/ui/data/StatusBadge'
import { ProgressIndicator } from '@/shared/ui/data/ProgressIndicator'
import { APP_ROUTES } from '@/shared/constants/routes'
import { useProjects } from '@/features/projects/hooks/useProjects'

export function ActiveProjectsCard() {
  const { data, isLoading } = useProjects({ limit: 5, status: 'active' })

  return (
    <SectionCard
      title="Active Projects"
      subtitle="Current project snapshots"
      action={
        <Link
          to={APP_ROUTES.projects}
          className="btn btn-ghost btn-xs text-primary"
        >
          View all →
        </Link>
      }
    >
      <div className="overflow-x-auto -mx-1">
        <table className="table table-sm w-full">
          <thead>
            <tr className="text-xs text-base-content/55 uppercase tracking-wide">
              <th className="font-medium">Project</th>
              <th className="font-medium">Progress</th>
              <th className="font-medium">Status</th>
              <th className="font-medium text-right">Due</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Loading skeleton rows
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-3">
                    <div className="h-4 w-32 bg-base-300 rounded mb-1"></div>
                    <div className="h-3 w-16 bg-base-200 rounded"></div>
                  </td>
                  <td className="py-3 min-w-[120px]">
                    <div className="h-2 w-full bg-base-200 rounded"></div>
                  </td>
                  <td className="py-3">
                    <div className="h-5 w-16 bg-base-200 rounded-full"></div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="h-3 w-20 bg-base-200 rounded ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : data?.results.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-base-content/60">
                  No active projects found.
                </td>
              </tr>
            ) : (
              // Data rows
              data?.results.map((project) => (
                <tr key={project.id} className="hover">
                  <td className="py-2.5">
                    <Link to={`/projects/${project.id}`} className="block">
                      <p className="text-sm font-medium text-base-content leading-tight hover:text-primary transition-colors">
                        {project.name}
                      </p>
                      <p className="text-xs text-base-content/50 mt-0.5">
                        {project.category || 'No category'}
                      </p>
                    </Link>
                  </td>
                  <td className="py-2.5 min-w-[120px]">
                    <ProgressIndicator value={project.progress} size="xs" />
                  </td>
                  <td className="py-2.5">
                    <StatusBadge status={project.status} size="xs" />
                  </td>
                  <td className="py-2.5 text-right">
                    <span className="text-xs text-base-content/55 tabular-nums">
                      {project.due_date ? new Date(project.due_date).toLocaleDateString() : 'No date'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </SectionCard>
  )
}

