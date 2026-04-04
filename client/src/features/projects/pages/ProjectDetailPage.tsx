import { useParams, Navigate } from 'react-router-dom'
import { ProjectHeader } from '@/features/projects/components/ProjectHeader'
import { MembersCard } from '@/features/projects/components/MembersCard'
import { MilestonesCard } from '@/features/projects/components/MilestonesCard'
import { ProjectActivityCard } from '@/features/projects/components/ProjectActivityCard'
import { InsightPanel } from '@/features/projects/components/InsightPanel'
import { PROJECTS_MOCK } from '@/features/projects/data/projectsMockData'
import { APP_ROUTES } from '@/shared/constants/routes'
import type { Milestone } from '@/features/projects/components/MilestonesCard'
import type { ActivityItem } from '@/shared/ui/data/ActivityList'
import type { Member } from '@/shared/ui/data/AvatarGroup'

// Scaffold milestone data by project — replace with API call later
const PROJECT_MILESTONES: Record<string, Milestone[]> = {
  p1: [
    { id: 'm1', title: 'Phase 1: Foundation Architecture', dueLabel: 'Completed', assignee: 'Alex Rivera' },
    { id: 'm2', title: 'Phase 2: Technical Layouts', dueLabel: 'Due tomorrow • Design Team', assignee: 'Sarah Chen' },
    { id: 'm3', title: 'Phase 3: Integration Testing', dueLabel: 'Due Oct 20 • QA', assignee: 'Marcus Wright' },
  ],
  p5: [
    { id: 'm1', title: 'Q1 Brand Guidelines Finalization', dueLabel: 'Due tomorrow • Design Team', assignee: 'Elena Vance' },
    { id: 'm2', title: 'Developer Portal Alpha Test', dueLabel: 'Due Oct 24 • Tech Lead', assignee: 'Jordan Ridley' },
    { id: 'm3', title: 'Security Audit Feedback Loop', dueLabel: 'Overdue by 2 days • Security', assignee: 'Security Dept', overdue: true },
  ],
}

const DEFAULT_MILESTONES: Milestone[] = [
  { id: 'm1', title: 'Initial Scoping & Requirements', dueLabel: 'Completed', assignee: 'Project Lead' },
  { id: 'm2', title: 'Design Review & Approval', dueLabel: 'In progress', assignee: 'Design Team' },
]

// Scaffold activity data by project — replace with API call later
const PROJECT_ACTIVITY: Record<string, ActivityItem[]> = {
  p5: [
    { id: 'a1', actor: 'Elena Vance', actorInitials: 'EV', action: 'updated the strategy document', timestamp: '20m ago' },
    { id: 'a2', actor: 'Jordan Ridley', actorInitials: 'JR', action: 'created milestone: Alpha Test', timestamp: '2h ago' },
    { id: 'a3', actor: 'Finance Dept', actorInitials: 'FD', action: 'approved budget allocation', timestamp: '1d ago' },
  ],
}

const DEFAULT_ACTIVITY: ActivityItem[] = [
  { id: 'a1', actor: 'System', actorInitials: 'SY', action: 'created this project', timestamp: '3 weeks ago' },
  { id: 'a2', actor: 'Project Lead', actorInitials: 'PL', action: 'assigned initial team members', timestamp: '3 weeks ago' },
  { id: 'a3', actor: 'System', actorInitials: 'SY', action: 'project status set to active', timestamp: '2 weeks ago' },
]

// Scaffold member roles — replace with API data later
const MEMBER_ROLES: Record<string, string> = {
  AR: 'Project Lead',
  SC: 'Senior Designer',
  MW: 'QA Engineer',
  ER: 'Product Manager',
  JR: 'Senior Strategist',
  SG: 'UX Researcher',
  DP: 'Developer',
}

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = PROJECTS_MOCK.find((p) => p.id === id)

  if (!project) {
    return <Navigate replace to={APP_ROUTES.projects} />
  }

  const milestones = PROJECT_MILESTONES[project.id] ?? DEFAULT_MILESTONES
  const activity = PROJECT_ACTIVITY[project.id] ?? DEFAULT_ACTIVITY
  const membersWithRoles: (Member & { role?: string })[] = project.members.map((m) => ({
    ...m,
    role: MEMBER_ROLES[m.initials],
  }))

  const insight = {
    headline: `${project.name} — ${project.progress}% complete`,
    body: project.progress >= 50
      ? `At ${project.progress}% completion, this project is making solid progress. Current velocity suggests the team is on track for the ${project.dueDate} deadline.`
      : `This project is in early stages at ${project.progress}% complete. Ensure milestone dependencies are resolved to maintain delivery pace toward ${project.dueDate}.`,
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
