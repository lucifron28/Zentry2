type FormErrorProps = {
  id?: string
  message?: string
}

export function FormError({ id, message }: FormErrorProps) {
  if (!message) {
    return null
  }

  return (
    <p id={id} className="text-sm text-error" role="alert">
      {message}
    </p>
  )
}
