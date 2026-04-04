type ProgressIndicatorProps = {
  value: number // 0-100
  showLabel?: boolean
  size?: 'xs' | 'sm' | 'md'
}

export function ProgressIndicator({ value, showLabel = true, size = 'sm' }: ProgressIndicatorProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="flex items-center gap-2.5">
      <progress
        className={['progress progress-primary flex-1', `progress-${size}`].join(' ')}
        value={clamped}
        max={100}
        aria-label={`${clamped}% complete`}
      />
      {showLabel ? (
        <span className="w-8 text-right text-xs font-medium tabular-nums text-base-content/65">
          {clamped}%
        </span>
      ) : null}
    </div>
  )
}
