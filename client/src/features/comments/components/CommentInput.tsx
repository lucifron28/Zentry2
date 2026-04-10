import { useState } from 'react'
import { useCreateComment } from '@/features/comments/hooks/useCreateComment'

type CommentInputProps = {
  taskId: string | number
}

export function CommentInput({ taskId }: CommentInputProps) {
  const [body, setBody] = useState('')
  const createComment = useCreateComment()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = body.trim()
    if (!trimmed) return

    createComment.mutate(
      { task: taskId, body: trimmed },
      {
        onSuccess: () => setBody(''),
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <textarea
        id="comment-input"
        className="textarea textarea-bordered flex-1 min-h-[2.5rem] max-h-32 resize-y text-sm leading-relaxed"
        placeholder="Write a comment..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={2}
        disabled={createComment.isPending}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
      />
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        disabled={!body.trim() || createComment.isPending}
      >
        {createComment.isPending ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          'Post'
        )}
      </button>
    </form>
  )
}
