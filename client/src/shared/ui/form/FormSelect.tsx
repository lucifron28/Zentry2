import type { SelectHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { FormError } from '@/shared/ui/form/FormError'
import { FormLabel } from '@/shared/ui/form/FormLabel'

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  registration?: UseFormRegisterReturn
}

export function FormSelect({
  label,
  error,
  registration,
  id,
  className,
  required,
  children,
  ...props
}: FormSelectProps) {
  const selectId = id ?? registration?.name
  const errorId = selectId ? `${selectId}-error` : undefined
  const selectClassName = ['select select-bordered w-full', className].filter(Boolean).join(' ')

  return (
    <div className="form-control w-full gap-2">
      <FormLabel htmlFor={selectId} required={required}>
        {label}
      </FormLabel>
      <select
        id={selectId}
        className={selectClassName}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        required={required}
        {...registration}
        {...props}
      >
        {children}
      </select>
      <FormError id={errorId} message={error} />
    </div>
  )
}
