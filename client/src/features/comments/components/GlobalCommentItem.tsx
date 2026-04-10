import type { ApiComment } from '@/features/comments/types/comment'
import { Link } from 'react-router-dom'
import { APP_ROUTES } from '@/shared/constants/routes'

type GlobalCommentItemProps = {
  comment: ApiComment & { task_title?: string; project_name?: string }
}

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then

  const minutes = Math.floor(diffMs / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`

  return new Date(dateStr).toLocaleDateString()
}

export function GlobalCommentItem({ comment }: GlobalCommentItemProps) {
  const authorName = comment.author_details?.display_name || 'System User'
  const initials = authorName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all group">
      {/* Avatar */}
      <div className="avatar placeholder flex-shrink-0">
        <div className="bg-primary/10 text-primary rounded-xl w-10 h-10 border border-primary/20">
          <span className="text-sm font-bold">{initials}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-sm font-bold text-base-content">
            {authorName}
          </span>
          <span className="text-xs text-base-content/40">
            {timeAgo(comment.created_at)}
          </span>
          
          <div className="flex items-center gap-1 ml-auto">
             <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/30">on</span>
             <Link 
              to={`${APP_ROUTES.tasks}/${comment.task}`}
              className="text-xs font-medium text-primary hover:underline truncate max-w-[150px]"
            >
              {comment.task_title || `Task #${comment.task}`}
            </Link>
          </div>
        </div>
        
        <p className="text-sm text-base-content/80 mt-2 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
          {comment.body}
        </p>

        {comment.project_name && (
          <div className="mt-2 text-[10px] text-base-content/40 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v8H5V6z" clipRule="evenodd" />
            </svg>
            Project: <span className="font-semibold">{comment.project_name}</span>
          </div>
        )}
      </div>
    </div>
  )
}
