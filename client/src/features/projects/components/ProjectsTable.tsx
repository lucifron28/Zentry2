import { Link } from 'react-router-dom'
import type { Project } from '@/features/projects/types/project'
import { StatusBadge } from '@/shared/ui/data/StatusBadge'
import { PriorityBadge } from '@/shared/ui/data/PriorityBadge'
import { ProgressIndicator } from '@/shared/ui/data/ProgressIndicator'
import { AvatarGroup } from '@/shared/ui/data/AvatarGroup'
import { APP_ROUTES } from '@/shared/constants/routes'

type ProjectsTableProps = {
  projects: Project[]
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-base-300 bg-base-100 py-12 text-center">
        <p className="text-sm font-medium text-base-content">No projects found</p>
        <p className="mt-1 text-xs text-base-content/55">
          Try adjusting your search or filters.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-base-200">
      <table className="table table-zebra w-full text-sm">
        <thead>
          <tr className="bg-base-200/60 text-xs uppercase tracking-wide text-base-content/55">
            <th className="font-semibold px-4 py-3">Project</th>
            <th className="font-semibold px-4 py-3">Owner</th>
            <th className="font-semibold px-4 py-3">Team</th>
            <th className="font-semibold px-4 py-3">Priority</th>
            <th className="font-semibold px-4 py-3">Status</th>
            <th className="font-semibold px-4 py-3 min-w-[140px]">Progress</th>
            <th className="font-semibold px-4 py-3 text-right">Due Date</th>
            <th className="font-semibold px-4 py-3 text-right sr-only">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="hover border-b border-base-200 last:border-0">
              <td className="px-4 py-3">
                <div className="max-w-[220px]">
                  <p className="font-semibold text-base-content leading-snug truncate">
                    {project.name}
                  </p>
                  <p className="mt-0.5 text-xs text-base-content/50 truncate">
                    {project.category}
                  </p>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="avatar placeholder">
                    <div className="w-7 h-7 rounded-full bg-base-300 text-xs font-semibold text-base-content/80 flex items-center justify-center">
                      <span>{project.owner.initials}</span>
                    </div>
                  </div>
                  <span className="text-xs text-base-content/70 hidden xl:inline">
                    {project.owner.name}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3">
                <AvatarGroup members={project.members} size="xs" />
              </td>
              <td className="px-4 py-3">
                <PriorityBadge priority={project.priority} size="xs" />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={project.status} size="xs" />
              </td>
              <td className="px-4 py-3 min-w-[140px]">
                <ProgressIndicator value={project.progress} size="xs" />
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-xs text-base-content/55 tabular-nums whitespace-nowrap">
                  {project.dueDate}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  to={`${APP_ROUTES.projects}/${project.id}`}
                  className="btn btn-ghost btn-xs text-primary"
                  aria-label={`View ${project.name}`}
                >
                  View →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
