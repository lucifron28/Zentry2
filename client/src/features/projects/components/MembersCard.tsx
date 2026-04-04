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
}

export function MembersCard({ members }: MembersCardProps) {
  return (
    <SectionCard
      title="Project Team"
      subtitle={`${members?.length || 0} member${(members?.length || 0) !== 1 ? 's' : ''}`}
    >
      <ul className="space-y-3">
        {members?.map((member) => (
          <li key={member.id} className="flex items-center gap-3">
            <div className="avatar placeholder flex-shrink-0">
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
          </li>
        ))}
      </ul>

    </SectionCard>
  )
}
