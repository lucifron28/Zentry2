import { z } from 'zod'

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(300, 'Title must be 300 characters or fewer'),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'in_review', 'done', 'blocked']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  project: z.union([z.string(), z.number()]).nullable(),
  assignee: z.union([z.string(), z.number()]).nullable(),
  due_date: z.string().nullable().optional(),
})

export type TaskInput = z.infer<typeof taskSchema>
