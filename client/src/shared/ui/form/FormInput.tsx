import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { FormError } from '@/shared/ui/form/FormError'
import { FormLabel } from '@/shared/ui/form/FormLabel'

type FormInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string
  error?: string
  registration?: UseFormRegisterReturn
}

export function FormInput({
  label,
  error,
  registration,
  id,
  className,
  required,
  ...props
}: FormInputProps) {
  const inputId = id ?? registration?.name
  const errorId = inputId ? `${inputId}-error` : undefined
  const inputClassName = ['input input-bordered w-full', className].filter(Boolean).join(' ')

  return (
    <div className="form-control w-full gap-2">
      <FormLabel htmlFor={inputId} required={required}>
        {label}
      </FormLabel>
      <input
        id={inputId}
        className={inputClassName}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        required={required}
        {...registration}
        {...props}
      />
      <FormError id={errorId} message={error} />
    </div>
  )
}
