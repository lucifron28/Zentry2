import type { Member } from '@/shared/ui/data/AvatarGroup'
import { SectionCard } from '@/shared/ui/data/SectionCard'

type MembersCardProps = {
  members: (Member & { role?: string })[]
}

export function MembersCard({ members }: MembersCardProps) {
  return (
    <SectionCard
      title="Project Team"
      subtitle={`${members.length} member${members.length !== 1 ? 's' : ''}`}
    >
      <ul className="space-y-3">
        {members.map((member) => (
          <li key={member.id} className="flex items-center gap-3">
            <div className="avatar placeholder flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-base-300 text-sm font-semibold text-base-content/80 flex items-center justify-center">
                <span>{member.initials}</span>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-base-content truncate">{member.name}</p>
              {member.role ? (
                <p className="text-xs text-base-content/50 truncate">{member.role}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
