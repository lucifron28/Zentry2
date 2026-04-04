import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddProjectMemberModal } from '@/features/projects/components/AddProjectMemberModal'
import { ProjectHeader } from '@/features/projects/components/ProjectHeader'
import { MembersCard } from '@/features/projects/components/MembersCard'
import { MilestonesCard } from '@/features/projects/components/MilestonesCard'
import { ProjectActivityCard } from '@/features/projects/components/ProjectActivityCard'
import { InsightPanel } from '@/features/projects/components/InsightPanel'
import { APP_ROUTES } from '@/shared/constants/routes'
import { useAddProjectMember } from '@/features/projects/hooks/useAddProjectMember'
import { useProject } from '@/features/projects/hooks/useProject'
import { useRemoveProjectMember } from '@/features/projects/hooks/useRemoveProjectMember'
import { useAuthSession } from '@/features/auth/hooks/useAuthSession'
import type { Milestone } from '@/features/projects/components/MilestonesCard'
import type { ActivityItem } from '@/shared/ui/data/ActivityList'
import type { ApiUser } from '@/features/projects/types/project'
import { ErrorState } from '@/shared/ui/states/ErrorState'
import { LoadingState } from '@/shared/ui/states/LoadingState'

const DEFAULT_MILESTONES: Milestone[] = [
  { id: 'm1', title: 'Initial Scoping & Requirements', dueLabel: 'Completed', assignee: 'Project Lead' },
  { id: 'm2', title: 'Design Review & Approval', dueLabel: 'In progress', assignee: 'Design Team' },
]

const DEFAULT_ACTIVITY: ActivityItem[] = [
  { id: 'a1', actor: 'System', actorInitials: 'SY', action: 'created this project', timestamp: '3 weeks ago' },
  { id: 'a2', actor: 'Project Lead', actorInitials: 'PL', action: 'assigned initial team members', timestamp: '3 weeks ago' },
  { id: 'a3', actor: 'System', actorInitials: 'SY', action: 'project status set to active', timestamp: '2 weeks ago' },
]

type MemberApiErrorShape = {
  detail?: unknown
  non_field_errors?: unknown
  user_id?: unknown
}

type ApiErrorEnvelope = {
  error?: {
    details?: unknown
  }
}

function normalizeId(value: string | number | null | undefined) {
  return value == null ? '' : String(value)
}

function firstErrorMessage(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    const firstString = value.find((item) => typeof item === 'string')
    return typeof firstString === 'string' ? firstString : undefined
  }

  return undefined
}

function parseMemberMutationError(error: unknown, fallbackMessage: string): string {
  if (!axios.isAxiosError(error) || !error.response?.data || typeof error.response.data !== 'object') {
    return fallbackMessage
  }

  const responseData = error.response.data as MemberApiErrorShape & ApiErrorEnvelope
  const data =
    responseData.error && typeof responseData.error.details === 'object'
      ? (responseData.error.details as MemberApiErrorShape)
      : responseData

  return (
    firstErrorMessage(data.non_field_errors) ||
    firstErrorMessage(data.user_id) ||
    firstErrorMessage(data.detail) ||
    fallbackMessage
  )
}

export function ProjectDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { currentUser } = useAuthSession()
  const projectId = id || ''
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [addMemberError, setAddMemberError] = useState<string | null>(null)
  const [memberActionError, setMemberActionError] = useState<string | null>(null)
  const [removingMemberId, setRemovingMemberId] = useState<string | number | null>(null)

  const { data: project, isLoading, isError } = useProject(projectId)

  const addMemberMutation = useAddProjectMember(projectId)
  const removeMemberMutation = useRemoveProjectMember(projectId)

  if (isLoading) {
    return <LoadingState title="Loading project" description="Retrieving project details and team members." />
  }

  if (isError || !project) {
    return (
      <ErrorState
        title="Project could not be loaded"
        description="The project record may no longer exist or you may not have access."
        actionLabel="Back to projects"
        onAction={() => navigate(APP_ROUTES.projects)}
      />
    )
  }

  const canManageMembers = Boolean(
    currentUser &&
      (currentUser.role === 'admin' || normalizeId(currentUser.id) === normalizeId(project.owner?.id)),
  )

  const milestones = DEFAULT_MILESTONES
  const activity = DEFAULT_ACTIVITY

  const membersWithRoles = (project.members || []).map((m: ApiUser) => ({
    ...m,
    projectRole: m.role || 'Member',
  }))

  const dueDateStr = project.due_date ? new Date(project.due_date).toLocaleDateString() : 'no date'

  const handleOpenAddMemberModal = () => {
    setMemberActionError(null)
    setAddMemberError(null)
    setIsAddMemberModalOpen(true)
  }

  const handleCloseAddMemberModal = () => {
    if (addMemberMutation.isPending) {
      return
    }

    setAddMemberError(null)
    setIsAddMemberModalOpen(false)
  }

  const handleAddMember = async (userId: string | number) => {
    setMemberActionError(null)
    setAddMemberError(null)

    try {
      await addMemberMutation.mutateAsync(userId)
      setIsAddMemberModalOpen(false)
    } catch (error) {
      setAddMemberError(parseMemberMutationError(error, 'Unable to add member. Please try again.'))
    }
  }

  const handleRemoveMember = async (member: ApiUser) => {
    if (normalizeId(project.owner?.id) === normalizeId(member.id)) {
      setMemberActionError('Project owner cannot be removed from members.')
      return
    }

    const shouldRemove = window.confirm(`Remove ${member.display_name} from this project team?`)
    if (!shouldRemove) {
      return
    }

    setMemberActionError(null)
    setRemovingMemberId(member.id)

    try {
      await removeMemberMutation.mutateAsync(member.id)
    } catch (error) {
      setMemberActionError(parseMemberMutationError(error, 'Unable to remove member. Please try again.'))
    } finally {
      setRemovingMemberId(null)
    }
  }

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
          <MembersCard
            members={membersWithRoles}
            ownerId={project.owner?.id}
            canManageMembers={canManageMembers}
            isAddingMember={addMemberMutation.isPending}
            isRemovingMember={removeMemberMutation.isPending}
            removingMemberId={removingMemberId}
            errorMessage={memberActionError}
            onAddMember={canManageMembers ? handleOpenAddMemberModal : undefined}
            onRemoveMember={canManageMembers ? handleRemoveMember : undefined}
          />
          <InsightPanel
            headline={insight.headline}
            body={insight.body}
            healthScore={insight.healthScore}
            healthLabel={insight.healthLabel}
          />
        </div>
      </div>

      <AddProjectMemberModal
        isOpen={isAddMemberModalOpen}
        members={project.members || []}
        isSubmitting={addMemberMutation.isPending}
        errorMessage={addMemberError}
        onAddMember={handleAddMember}
        onClose={handleCloseAddMemberModal}
      />
    </section>
  )
}
