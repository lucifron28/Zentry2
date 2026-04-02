import type { ReactNode } from 'react'
import {
  useController,
  useFormContext,
  type Control,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form'

type RenderFormFieldProps = {
  name: string
  value: unknown
  onChange: (...event: unknown[]) => void
  onBlur: () => void
  ref: (instance: HTMLElement | null) => void
  disabled?: boolean
  invalid: boolean
  errorMessage?: string
}

type FormFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  control?: Control<TFieldValues>
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>
  defaultValue?: FieldPathValue<TFieldValues, FieldPath<TFieldValues>>
  disabled?: boolean
  render: (props: RenderFormFieldProps) => ReactNode
}

export function FormField<TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  disabled,
  render,
}: FormFieldProps<TFieldValues>) {
  const context = useFormContext<TFieldValues>()
  const resolvedControl = control ?? context.control

  const { field, fieldState } = useController<TFieldValues>({
    name,
    control: resolvedControl,
    rules,
    defaultValue,
    disabled,
  })

  return render({
    ...field,
    invalid: fieldState.invalid,
    errorMessage: fieldState.error?.message,
  })
}
