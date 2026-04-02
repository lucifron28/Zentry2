import type { TextareaHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { FormError } from '@/shared/ui/form/FormError'
import { FormLabel } from '@/shared/ui/form/FormLabel'

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
  registration?: UseFormRegisterReturn
}

export function FormTextarea({
  label,
  error,
  registration,
  id,
  className,
  required,
  ...props
}: FormTextareaProps) {
  const textareaId = id ?? registration?.name
  const errorId = textareaId ? `${textareaId}-error` : undefined
  const textareaClassName = ['textarea textarea-bordered w-full', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="form-control w-full gap-2">
      <FormLabel htmlFor={textareaId} required={required}>
        {label}
      </FormLabel>
      <textarea
        id={textareaId}
        className={textareaClassName}
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
