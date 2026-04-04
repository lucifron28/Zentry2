import { useState } from 'react'
import { SectionCard } from '@/shared/ui/data/SectionCard'
import { TasksTable } from '@/features/tasks/components/TasksTable'
import { TaskFormModal } from '@/features/tasks/components/TaskFormModal'
import { TaskDetailModal } from '@/features/tasks/components/TaskDetailModal'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import type { ApiTask } from '@/features/tasks/types/task'
import type { ApiUser } from '@/features/projects/types/project'

type ProjectTasksCardProps = {
  projectId: string | number
  projectMembers: ApiUser[]
  canManageTasks: boolean
}

export function ProjectTasksCard({ projectId, projectMembers, canManageTasks }: ProjectTasksCardProps) {
  const { data, isLoading } = useTasks({ project: projectId })
  const tasks = data?.results || []

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<ApiTask | undefined>(undefined)

  const [selectedTask, setSelectedTask] = useState<ApiTask | null>(null)

  const handleOpenCreate = () => {
    setEditingTask(undefined)
    setIsFormModalOpen(true)
  }

  const handleTaskClick = (task: ApiTask) => {
    setSelectedTask(task)
  }

  return (
    <>
      <SectionCard
        title="Project Tasks"
        subtitle="Manage and track work items for this project"
        action={
          canManageTasks && (
            <button className="btn btn-sm btn-primary" onClick={handleOpenCreate}>
              New Task
            </button>
          )
        }
      >
        <div className="mt-4">
          <TasksTable
            tasks={tasks}
            isLoading={isLoading}
            onTaskClick={handleTaskClick}
          />
        </div>
      </SectionCard>

      <TaskFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        projectId={projectId}
        projectMembers={projectMembers}
        initialData={editingTask}
      />

      <TaskDetailModal
        isOpen={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        canEdit={canManageTasks}
        onEdit={(task: any) => {
          setSelectedTask(null)
          setEditingTask(task)
          setIsFormModalOpen(true)
        }}
      />
    </>
  )
}
