import type { ApiUser } from '@/features/projects/types/project'
import { SectionCard } from '@/shared/ui/data/SectionCard'

function getInitials(name?: string) {
  if (!name) return '?'
  const parts = name.split(' ').filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

type MembersCardProps = {
  members: (ApiUser & { projectRole?: string })[]
  ownerId?: string | number | null
  canManageMembers?: boolean
  isAddingMember?: boolean
  isRemovingMember?: boolean
  removingMemberId?: string | number | null
  errorMessage?: string | null
  onAddMember?: () => void
  onRemoveMember?: (member: ApiUser & { projectRole?: string }) => void
}

function normalizeId(value: string | number | null | undefined) {
  return value == null ? '' : String(value)
}

export function MembersCard({
  members,
  ownerId,
  canManageMembers = false,
  isAddingMember = false,
  isRemovingMember = false,
  removingMemberId,
  errorMessage,
  onAddMember,
  onRemoveMember,
}: MembersCardProps) {
  return (
    <SectionCard
      title="Project Team"
      subtitle={`${members?.length || 0} member${(members?.length || 0) !== 1 ? 's' : ''}`}
      action={
        canManageMembers && onAddMember ? (
          <button type="button" className="btn btn-primary btn-xs" onClick={onAddMember} disabled={isAddingMember}>
            {isAddingMember ? 'Adding...' : '+ Add Member'}
          </button>
        ) : null
      }
    >
      {errorMessage ? (
        <p className="mb-3 rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">
          {errorMessage}
        </p>
      ) : null}

      {!members?.length ? (
        <p className="text-sm text-base-content/65">No members are assigned to this project yet.</p>
      ) : (
        <ul className="space-y-3">
          {members?.map((member) => {
            const isOwner = normalizeId(ownerId) === normalizeId(member.id)
            const isRemovingThisMember =
              isRemovingMember && normalizeId(removingMemberId) === normalizeId(member.id)

            return (
              <li key={member.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="avatar placeholder shrink-0">
                    <div className="w-9 h-9 rounded-full bg-base-300 text-sm font-semibold text-base-content/80 flex items-center justify-center">
                      <span>{getInitials(member.display_name)}</span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-base-content truncate">{member.display_name}</p>
                    {member.role || member.projectRole ? (
                      <p className="text-xs text-base-content/50 truncate">{member.projectRole || member.role}</p>
                    ) : null}
                  </div>
                </div>

                {canManageMembers && onRemoveMember ? (
                  isOwner ? (
                    <span className="badge badge-outline badge-sm">Owner</span>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs text-error"
                      disabled={isRemovingMember}
                      onClick={() => onRemoveMember(member)}
                    >
                      {isRemovingThisMember ? 'Removing...' : 'Remove'}
                    </button>
                  )
                ) : isOwner ? (
                  <span className="badge badge-outline badge-sm">Owner</span>
                ) : null}
              </li>
            )
          })}
        </ul>
      )}

    </SectionCard>
  )
}
