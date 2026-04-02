import type { ReactNode } from 'react'

type FormLabelProps = {
  htmlFor?: string
  required?: boolean
  children: ReactNode
}

export function FormLabel({ htmlFor, required = false, children }: FormLabelProps) {
  return (
    <label className="label p-0" htmlFor={htmlFor}>
      <span className="label-text">
        {children}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
    </label>
  )
}
