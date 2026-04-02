import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { FormError } from '@/shared/ui/form/FormError'

type FormCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  label: string
  error?: string
  registration?: UseFormRegisterReturn
}

export function FormCheckbox({
  label,
  error,
  registration,
  id,
  className,
  required,
  ...props
}: FormCheckboxProps) {
  const checkboxId = id ?? registration?.name
  const errorId = checkboxId ? `${checkboxId}-error` : undefined
  const checkboxClassName = ['checkbox', className].filter(Boolean).join(' ')

  return (
    <div className="form-control gap-2">
      <label className="label cursor-pointer justify-start gap-3 p-0" htmlFor={checkboxId}>
        <input
          id={checkboxId}
          type="checkbox"
          className={checkboxClassName}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          required={required}
          {...registration}
          {...props}
        />
        <span className="label-text">{label}</span>
      </label>
      <FormError id={errorId} message={error} />
    </div>
  )
}
