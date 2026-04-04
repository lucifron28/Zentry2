import { useState } from 'react'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { TasksTable } from '@/features/tasks/components/TasksTable'
import { TaskDetailModal } from '@/features/tasks/components/TaskDetailModal'
import { FormSelect } from '@/shared/ui/form'
import type { ApiTask } from '@/features/tasks/types/task'

export function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [priorityFilter, setPriorityFilter] = useState<string>('')

  const { data, isLoading } = useTasks({
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(priorityFilter ? { priority: priorityFilter } : {}),
  })

  const tasks = data?.results || []
  
  const [selectedTask, setSelectedTask] = useState<ApiTask | null>(null)

  const handleTaskClick = (task: ApiTask) => {
    setSelectedTask(task)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-base-content">My Tasks</h1>
          <p className="mt-1 text-sm text-base-content/70">
            A comprehensive view of all task assignments across your projects.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-40">
            <FormSelect
              label=""
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="in_review">In Review</option>
              <option value="done">Done</option>
              <option value="blocked">Blocked</option>
            </FormSelect>
          </div>
          <div className="w-full sm:w-40">
            <FormSelect
              label=""
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </FormSelect>
          </div>
        </div>
      </div>

      <div className="bg-base-100/50 p-1 rounded-xl">
        <TasksTable
          tasks={tasks}
          isLoading={isLoading}
          onTaskClick={handleTaskClick}
        />
      </div>

      <TaskDetailModal
        isOpen={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        canEdit={false} // Editing is isolated to Project context for optimal scope boundary handling
        onEdit={() => {}}
      />
    </div>
  )
}
