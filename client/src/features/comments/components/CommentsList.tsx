import { useComments } from '@/features/comments/hooks/useComments'
import { useDeleteComment } from '@/features/comments/hooks/useDeleteComment'
import { useAuthStore } from '@/features/auth/store/authStore'
import type { ApiComment } from '@/features/comments/types/comment'

type CommentsListProps = {
  taskId: string | number
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

function CommentItem({
  comment,
  isOwn,
  onDelete,
  isDeleting,
}: {
  comment: ApiComment
  isOwn: boolean
  onDelete: (id: string | number) => void
  isDeleting: boolean
}) {
  const authorName = comment.author_details?.display_name || 'Unknown'
  const initials = authorName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex gap-3 group">
      {/* Avatar */}
      <div className="avatar placeholder flex-shrink-0">
        <div className="bg-primary/15 text-primary rounded-full w-8 h-8">
          <span className="text-xs font-semibold">{initials}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-base-content leading-none">
            {authorName}
          </span>
          <span className="text-xs text-base-content/40 leading-none">
            {timeAgo(comment.created_at)}
          </span>
          {isOwn && (
            <button
              className="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-error/60 hover:text-error"
              onClick={() => onDelete(comment.id)}
              disabled={isDeleting}
              title="Delete comment"
            >
              {isDeleting ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )}
        </div>
        <p className="text-sm text-base-content/80 mt-1 whitespace-pre-wrap break-words leading-relaxed">
          {comment.body}
        </p>
      </div>
    </div>
  )
}

export function CommentsList({ taskId }: CommentsListProps) {
  const { data, isLoading, isError } = useComments(taskId)
  const deleteMutation = useDeleteComment(taskId)
  const currentUser = useAuthStore((state) => state.currentUser)

  const comments = data?.results ?? []

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <span className="loading loading-dots loading-sm text-base-content/30" />
      </div>
    )
  }

  if (isError) {
    return (
      <p className="text-sm text-error/70 text-center py-4">
        Failed to load comments.
      </p>
    )
  }

  if (comments.length === 0) {
    return (
      <p className="text-sm text-base-content/40 text-center py-4 italic">
        No comments yet. Be the first to comment.
      </p>
    )
  }

  return (
    <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isOwn={currentUser?.id === comment.author}
          onDelete={(id) => deleteMutation.mutate(id)}
          isDeleting={deleteMutation.isPending}
        />
      ))}
    </div>
  )
}
