import { Link } from 'react-router-dom'
import type { Project } from '@/features/projects/types/project'
import { StatusBadge } from '@/shared/ui/data/StatusBadge'
import { PriorityBadge } from '@/shared/ui/data/PriorityBadge'
import { ProgressIndicator } from '@/shared/ui/data/ProgressIndicator'
import { APP_ROUTES } from '@/shared/constants/routes'

type ProjectHeaderProps = {
  project: Project
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-base-content/50">
        <Link to={APP_ROUTES.projects} className="hover:text-primary transition-colors">
          Projects
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-base-content/70 truncate">{project.name}</span>
      </div>

      {/* Header card */}
      <div className="card bg-base-100 border border-base-200 shadow-sm">
        <div className="card-body p-6 space-y-4">
          {/* Title row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <StatusBadge status={project.status} />
                <PriorityBadge priority={project.priority} />
                <span className="text-xs text-base-content/40 border border-base-200 rounded-full px-2 py-0.5">
                  {project.category}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-base-content leading-snug sm:text-3xl">
                {project.name}
              </h1>
            </div>
            <button 
              className="btn btn-primary btn-sm flex-shrink-0" 
              disabled={!project.user_permissions.can_edit}
            >
              Edit Project
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-base-content/70 leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-base-content/55 uppercase tracking-wide">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-base-content tabular-nums">
                {project.task_count} tasks total
              </span>
            </div>
            <ProgressIndicator value={project.progress} showLabel={true} size="md" />
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 gap-4 border-t border-base-200 pt-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-base-content/45">
                Owner
              </p>
              <p className="mt-1 text-sm font-medium text-base-content">
                {project.owner?.display_name || 'Unassigned'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-base-content/45">
                Due Date
              </p>
              <p className="mt-1 text-sm font-medium text-base-content">
                {project.due_date ? new Date(project.due_date).toLocaleDateString() : 'No date'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-base-content/45">
                Team Size
              </p>
              <p className="mt-1 text-sm font-medium text-base-content">
                {project.members?.length || 0} member{(project.members?.length || 0) !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
