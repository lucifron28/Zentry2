import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useCreateProject } from '@/features/projects/hooks/useCreateProject'
import {
  projectCreateSchema,
  type ProjectCreateInput,
} from '@/features/projects/schemas/projectSchema'
import { FormInput, FormSelect, FormTextarea } from '@/shared/ui/form'

type CreateProjectModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreated: (projectName: string) => void
}

type ProjectCreateApiErrorShape = {
  detail?: unknown
  non_field_errors?: unknown
  name?: unknown
  description?: unknown
  status?: unknown
  priority?: unknown
  category?: unknown
  due_date?: unknown
}

type ApiErrorEnvelope = {
  error?: {
    details?: unknown
  }
}

type ParsedProjectCreateErrors = {
  fieldErrors: Partial<Record<keyof ProjectCreateInput, string>>
  formError?: string
}

const DEFAULT_VALUES: ProjectCreateInput = {
  name: '',
  description: '',
  status: 'planning',
  priority: 'medium',
  category: '',
  due_date: '',
}

function firstErrorMessage(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    const firstString = value.find((item) => typeof item === 'string')
    return typeof firstString === 'string' ? firstString : undefined
  }

  return undefined
}

function parseProjectCreateErrors(error: unknown): ParsedProjectCreateErrors {
  if (!axios.isAxiosError(error) || !error.response?.data || typeof error.response.data !== 'object') {
    return {
      fieldErrors: {},
      formError: 'Unable to create project. Please try again.',
    }
  }

  const responseData = error.response.data as ProjectCreateApiErrorShape & ApiErrorEnvelope
  const data =
    responseData.error && typeof responseData.error.details === 'object'
      ? (responseData.error.details as ProjectCreateApiErrorShape)
      : responseData

  const fieldErrors: ParsedProjectCreateErrors['fieldErrors'] = {}
  const fieldKeys: Array<keyof ProjectCreateInput> = [
    'name',
    'description',
    'status',
    'priority',
    'category',
    'due_date',
  ]

  for (const fieldKey of fieldKeys) {
    const fieldError = firstErrorMessage(data[fieldKey])
    if (fieldError) {
      fieldErrors[fieldKey] = fieldError
    }
  }

  const formError = firstErrorMessage(data.non_field_errors) ?? firstErrorMessage(data.detail)

  return {
    fieldErrors,
    formError:
      formError || (Object.keys(fieldErrors).length ? undefined : 'Unable to create project. Please try again.'),
  }
}

export function CreateProjectModal({ isOpen, onClose, onCreated }: CreateProjectModalProps) {
  const [serverError, setServerError] = useState<string | null>(null)

  const createProjectMutation = useCreateProject({
    onSuccess: (projectName) => {
      onCreated(projectName)
      onClose()
    },
  })

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ProjectCreateInput>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    if (isOpen) {
      setServerError(null)
      reset(DEFAULT_VALUES)
    }
  }, [isOpen, reset])

  const onSubmit: SubmitHandler<ProjectCreateInput> = async (values) => {
    setServerError(null)

    try {
      await createProjectMutation.mutateAsync(values)
    } catch (error) {
      const parsedErrors = parseProjectCreateErrors(error)

      for (const [field, message] of Object.entries(parsedErrors.fieldErrors)) {
        if (message) {
          setError(field as keyof ProjectCreateInput, { type: 'server', message })
        }
      }

      if (parsedErrors.formError) {
        setServerError(parsedErrors.formError)
      }
    }
  }

  const handleClose = () => {
    if (createProjectMutation.isPending) {
      return
    }
    setServerError(null)
    reset(DEFAULT_VALUES)
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="create-project-title">
      <div className="modal-box max-w-2xl bg-base-100">
        <h3 id="create-project-title" className="text-lg font-semibold text-base-content">
          Create Project
        </h3>
        <p className="mt-1 text-sm text-base-content/70">
          Add a new project record with key planning details for your team.
        </p>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Project Name"
            placeholder="e.g., Horizon Terminal Phase III"
            registration={register('name')}
            error={errors.name?.message}
            disabled={createProjectMutation.isPending}
            required
          />

          <FormTextarea
            label="Description"
            placeholder="Summarize the project scope and expected outcome."
            rows={4}
            registration={register('description')}
            error={errors.description?.message}
            disabled={createProjectMutation.isPending}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormSelect
              label="Status"
              registration={register('status')}
              error={errors.status?.message}
              disabled={createProjectMutation.isPending}
              required
            >
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="on_hold">On Hold</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </FormSelect>

            <FormSelect
              label="Priority"
              registration={register('priority')}
              error={errors.priority?.message}
              disabled={createProjectMutation.isPending}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </FormSelect>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              label="Category"
              placeholder="e.g., Infrastructure"
              registration={register('category')}
              error={errors.category?.message}
              disabled={createProjectMutation.isPending}
            />

            <FormInput
              label="Due Date"
              type="date"
              registration={register('due_date')}
              error={errors.due_date?.message}
              disabled={createProjectMutation.isPending}
            />
          </div>

          {serverError ? <p className="text-sm text-error">{serverError}</p> : null}

          <div className="modal-action mt-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
              disabled={createProjectMutation.isPending}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={createProjectMutation.isPending}>
              {createProjectMutation.isPending ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>

      <button
        type="button"
        className="modal-backdrop"
        onClick={handleClose}
        aria-label="Close create project dialog"
      >
        close
      </button>
    </div>
  )
}