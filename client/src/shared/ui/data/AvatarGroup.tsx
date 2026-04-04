const MAX_VISIBLE = 4

type Member = {
  id: string
  name: string
  initials: string
}

type AvatarGroupProps = {
  members: Member[]
  size?: 'xs' | 'sm' | 'md'
}

const SIZE_CLASSES: Record<string, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
}

export function AvatarGroup({ members, size = 'sm' }: AvatarGroupProps) {
  const visible = members.slice(0, MAX_VISIBLE)
  const overflow = members.length - MAX_VISIBLE

  return (
    <div className="avatar-group -space-x-3">
      {visible.map((member) => (
        <div
          key={member.id}
          className={[
            'avatar placeholder ring-2 ring-base-100',
            SIZE_CLASSES[size],
          ].join(' ')}
          title={member.name}
        >
          <div
            className={[
              'rounded-full bg-base-300 text-base-content/80 font-semibold flex items-center justify-center',
              SIZE_CLASSES[size],
            ].join(' ')}
          >
            <span>{member.initials}</span>
          </div>
        </div>
      ))}
      {overflow > 0 ? (
        <div
          className={[
            'avatar placeholder ring-2 ring-base-100',
            SIZE_CLASSES[size],
          ].join(' ')}
        >
          <div
            className={[
              'rounded-full bg-base-200 text-base-content/60 font-semibold flex items-center justify-center',
              SIZE_CLASSES[size],
            ].join(' ')}
          >
            <span>+{overflow}</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export type { Member }
