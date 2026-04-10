import type { ApiTask } from '@/features/tasks/types/task'
import { StatusBadge } from '@/shared/ui/data/StatusBadge'
import { PriorityBadge } from '@/shared/ui/data/PriorityBadge'
import { CommentsList } from '@/features/comments/components/CommentsList'
import { CommentInput } from '@/features/comments/components/CommentInput'

type TaskDetailModalProps = {
  isOpen: boolean
  onClose: () => void
  task: ApiTask | null
  canEdit: boolean
  onEdit: (task: ApiTask) => void
}

export function TaskDetailModal({ isOpen, onClose, task, canEdit, onEdit }: TaskDetailModalProps) {
  if (!isOpen || !task) return null

  const handleEditClick = () => {
    onEdit(task)
  }

  const assigneeName = task.assignee_details?.display_name || 'Unassigned'
  const dueDateStr = task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date set'
  const createdDateStr = new Date(task.created_at).toLocaleDateString()

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="task-detail-title">
      <div className="modal-box max-w-2xl bg-base-100">
        <div className="flex justify-between items-start mb-4">
          <h3 id="task-detail-title" className="text-xl font-bold text-base-content leading-snug pr-4">
            {task.title}
          </h3>
          <div className="flex items-center gap-2">
            <PriorityBadge priority={task.priority} size="sm" />
            <StatusBadge status={task.status as any} size="sm" />
          </div>
        </div>

        <div className="py-2 space-y-4">
          <div className="bg-base-200/50 rounded-lg p-3 text-sm text-base-content/80 whitespace-pre-wrap flex-1 min-h-[4rem]">
            {task.description || <span className="italic opacity-60">No description provided.</span>}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-base-200/30 p-3 rounded-lg">
              <span className="block text-xs font-semibold text-base-content/55 uppercase tracking-wide mb-1">Assignee</span>
              <span className="text-base-content font-medium">{assigneeName}</span>
            </div>
            <div className="bg-base-200/30 p-3 rounded-lg">
              <span className="block text-xs font-semibold text-base-content/55 uppercase tracking-wide mb-1">Due Date</span>
              <span className="text-base-content font-medium">{dueDateStr}</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6 pt-4 border-t border-base-200">
          <h4 className="text-sm font-semibold text-base-content/70 uppercase tracking-wide mb-3">
            Comments
          </h4>
          <CommentsList taskId={task.id} />
          <div className="mt-3">
            <CommentInput taskId={task.id} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-base-200">
          <div className="text-xs text-base-content/40">
            Created: {createdDateStr}
          </div>
          <div className="flex gap-2">
            <button className="btn btn-ghost" onClick={onClose}>
              Close
            </button>
            {canEdit && (
              <button className="btn btn-primary" onClick={handleEditClick}>
                Edit Task
              </button>
            )}
          </div>
        </div>
      </div>
      <button className="modal-backdrop" onClick={onClose}>close</button>
    </div>
  )
}
