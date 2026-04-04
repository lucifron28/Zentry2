import { Link } from 'react-router-dom'
import { SectionCard } from '@/shared/ui/data/SectionCard'
import { StatusBadge } from '@/shared/ui/data/StatusBadge'
import { ProgressIndicator } from '@/shared/ui/data/ProgressIndicator'
import { ACTIVE_PROJECT_PREVIEWS } from '@/features/dashboard/data/dashboardMockData'
import { APP_ROUTES } from '@/shared/constants/routes'

export function ActiveProjectsCard() {
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
            {ACTIVE_PROJECT_PREVIEWS.map((project) => (
              <tr key={project.id} className="hover">
                <td className="py-2.5">
                  <div>
                    <p className="text-sm font-medium text-base-content leading-tight">
                      {project.name}
                    </p>
                    <p className="text-xs text-base-content/50 mt-0.5">
                      {project.category}
                    </p>
                  </div>
                </td>
                <td className="py-2.5 min-w-[120px]">
                  <ProgressIndicator value={project.progress} size="xs" />
                </td>
                <td className="py-2.5">
                  <StatusBadge status={project.status} size="xs" />
                </td>
                <td className="py-2.5 text-right">
                  <span className="text-xs text-base-content/55 tabular-nums">
                    {project.dueDate}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  )
}
