import { useParams, Navigate } from 'react-router-dom'
import { ProjectHeader } from '@/features/projects/components/ProjectHeader'
import { MembersCard } from '@/features/projects/components/MembersCard'
import { MilestonesCard } from '@/features/projects/components/MilestonesCard'
import { ProjectActivityCard } from '@/features/projects/components/ProjectActivityCard'
import { InsightPanel } from '@/features/projects/components/InsightPanel'
import { APP_ROUTES } from '@/shared/constants/routes'
import { useProject } from '@/features/projects/hooks/useProject'
import type { Milestone } from '@/features/projects/components/MilestonesCard'
import type { ActivityItem } from '@/shared/ui/data/ActivityList'
import type { ApiUser } from '@/features/projects/types/project'

const DEFAULT_MILESTONES: Milestone[] = [
  { id: 'm1', title: 'Initial Scoping & Requirements', dueLabel: 'Completed', assignee: 'Project Lead' },
  { id: 'm2', title: 'Design Review & Approval', dueLabel: 'In progress', assignee: 'Design Team' },
]

const DEFAULT_ACTIVITY: ActivityItem[] = [
  { id: 'a1', actor: 'System', actorInitials: 'SY', action: 'created this project', timestamp: '3 weeks ago' },
  { id: 'a2', actor: 'Project Lead', actorInitials: 'PL', action: 'assigned initial team members', timestamp: '3 weeks ago' },
  { id: 'a3', actor: 'System', actorInitials: 'SY', action: 'project status set to active', timestamp: '2 weeks ago' },
]

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  
  const { data: project, isLoading, isError } = useProject(id as string)

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    )
  }

  if (isError || !project) {
    return <Navigate replace to={APP_ROUTES.projects} />
  }

  const milestones = DEFAULT_MILESTONES
  const activity = DEFAULT_ACTIVITY
  
  const membersWithRoles = (project.members || []).map((m: ApiUser) => ({
    ...m,
    projectRole: m.role || 'Member',
  }))

  const dueDateStr = project.due_date ? new Date(project.due_date).toLocaleDateString() : 'no date'
  
  const insight = {
    headline: `${project.name} — ${project.progress}% complete`,
    body: project.progress >= 50
      ? `At ${project.progress}% completion, this project is making solid progress. Current velocity suggests the team is on track for the ${dueDateStr} deadline.`
      : `This project is in early stages at ${project.progress}% complete. Ensure milestone dependencies are resolved to maintain delivery pace toward ${dueDateStr}.`,
    healthScore: Math.min(100, project.progress + 15),
    healthLabel: project.status === 'overdue'
      ? 'This project is past its original deadline. Prioritize blockers.'
      : 'Team efficiency is within acceptable range for this project phase.',
  }

  return (
    <section className="space-y-6">
      <ProjectHeader project={project} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Left — main content */}
        <div className="space-y-5 lg:col-span-3">
          <MilestonesCard milestones={milestones} />
          <ProjectActivityCard items={activity} />
        </div>

        {/* Right — sidebar */}
        <div className="space-y-5 lg:col-span-2">
          <MembersCard members={membersWithRoles} />
          <InsightPanel
            headline={insight.headline}
            body={insight.body}
            healthScore={insight.healthScore}
            healthLabel={insight.healthLabel}
          />
        </div>
      </div>
    </section>
  )
}
