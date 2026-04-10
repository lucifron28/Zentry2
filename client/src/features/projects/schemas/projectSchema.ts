import { z } from 'zod'

const YYYY_MM_DD_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export const projectCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Project name must be at least 3 characters long.')
    .max(200, 'Project name must be 200 characters or fewer.'),
  description: z
    .string()
    .trim()
    .max(2000, 'Description must be 2000 characters or fewer.'),
  status: z.enum(['planning', 'active', 'on_hold', 'completed', 'overdue']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  category: z
    .string()
    .trim()
    .max(100, 'Category must be 100 characters or fewer.'),
  due_date: z.union([
    z.literal(''),
    z.string().regex(YYYY_MM_DD_PATTERN, 'Use a valid due date.'),
  ]),
})

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>