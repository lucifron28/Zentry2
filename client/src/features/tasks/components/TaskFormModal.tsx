import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { taskSchema, type TaskInput } from '@/features/tasks/schemas/taskSchema'
import { useCreateTask } from '@/features/tasks/hooks/useCreateTask'
import { useUpdateTask } from '@/features/tasks/hooks/useUpdateTask'
import { FormInput, FormSelect, FormTextarea } from '@/shared/ui/form'
import type { ApiTask } from '@/features/tasks/types/task'
import type { ApiUser } from '@/features/projects/types/project'

type TaskFormModalProps = {
  isOpen: boolean
  onClose: () => void
  projectId: string | number
  projectMembers: ApiUser[]
  initialData?: ApiTask
}

function firstErrorMessage(value: unknown): string | undefined {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    const firstString = value.find((item) => typeof item === 'string')
    return typeof firstString === 'string' ? firstString : undefined
  }
  return undefined
}

export function TaskFormModal({ isOpen, onClose, projectId, projectMembers, initialData }: TaskFormModalProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  
  const isEditing = !!initialData
  
  const createTaskMutation = useCreateTask()
  const updateTaskMutation = useUpdateTask()
  const isPending = createTaskMutation.isPending || updateTaskMutation.isPending

  const defaultValues: TaskInput = {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    project: projectId,
    assignee: null,
    due_date: '',
  }

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues,
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (isOpen) {
      setServerError(null)
      if (initialData) {
        reset({
          title: initialData.title,
          description: initialData.description,
          status: initialData.status,
          priority: initialData.priority,
          project: initialData.project || projectId,
          assignee: initialData.assignee,
          due_date: initialData.due_date || '',
        })
      } else {
        reset({ ...defaultValues, project: projectId })
      }
    }
  }, [isOpen, initialData, projectId, reset])

  const onSubmit: SubmitHandler<TaskInput> = async (values) => {
    setServerError(null)

    try {
      if (isEditing && initialData) {
        await updateTaskMutation.mutateAsync({ id: initialData.id, data: values })
      } else {
        await createTaskMutation.mutateAsync(values)
      }
      onClose()
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data && typeof error.response.data === 'object') {
        const data = error.response.data as any
        const mainError = data.non_field_errors || data.detail
        
        if (mainError) {
          setServerError(firstErrorMessage(mainError) || 'Failed to save task.')
        } else {
          setServerError('Validation error. Please check the fields.')
          Object.keys(values).forEach((key) => {
            const fieldError = firstErrorMessage(data[key])
            if (fieldError) {
              setError(key as keyof TaskInput, { type: 'server', message: fieldError })
            }
          })
        }
      } else {
        setServerError('An unexpected error occurred.')
      }
    }
  }

  const handleClose = () => {
    if (isPending) return
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
      <div className="modal-box max-w-2xl bg-base-100">
        <h3 id="task-form-title" className="text-lg font-semibold text-base-content">
          {isEditing ? 'Edit Task' : 'Create Task'}
        </h3>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Task Title"
            registration={register('title')}
            error={errors.title?.message}
            disabled={isPending}
            required
          />

          <FormTextarea
            label="Description"
            rows={3}
            registration={register('description')}
            error={errors.description?.message}
            disabled={isPending}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormSelect
              label="Status"
              registration={register('status')}
              error={errors.status?.message}
              disabled={isPending}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="in_review">In Review</option>
              <option value="done">Done</option>
              <option value="blocked">Blocked</option>
            </FormSelect>

            <FormSelect
              label="Priority"
              registration={register('priority')}
              error={errors.priority?.message}
              disabled={isPending}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </FormSelect>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormSelect
              label="Assignee"
              registration={register('assignee', {
                setValueAs: (v) => (v === '' ? null : v),
              })}
              error={errors.assignee?.message}
              disabled={isPending}
            >
              <option value="">Unassigned</option>
              {projectMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.display_name}
                </option>
              ))}
            </FormSelect>

            <FormInput
              label="Due Date"
              type="date"
              registration={register('due_date')}
              error={errors.due_date?.message}
              disabled={isPending}
            />
          </div>

          {serverError && <p className="text-sm text-error">{serverError}</p>}

          <div className="modal-action mt-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
      <button className="modal-backdrop" onClick={handleClose}>close</button>
    </div>
  )
}
