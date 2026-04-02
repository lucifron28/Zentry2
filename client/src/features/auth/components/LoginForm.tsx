import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { loginSchema, type LoginInput } from '@/features/auth/schemas/loginSchema'
import { resolvePostLoginPath } from '@/features/auth/utils/redirect'
import { APP_ROUTES } from '@/shared/constants/routes'
import { FormInput } from '@/shared/ui/form'

type LoginApiErrorShape = {
  detail?: unknown
  non_field_errors?: unknown
  email?: unknown
  password?: unknown
}

type ApiErrorEnvelope = {
  error?: {
    details?: unknown
  }
}

type ParsedLoginErrors = {
  fieldErrors: Partial<Record<keyof LoginInput, string>>
  formError?: string
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

function parseLoginErrors(error: unknown): ParsedLoginErrors {
  if (!axios.isAxiosError(error) || !error.response?.data || typeof error.response.data !== 'object') {
    return {
      fieldErrors: {},
      formError: 'Unable to sign in. Please try again.',
    }
  }

  const responseData = error.response.data as LoginApiErrorShape & ApiErrorEnvelope
  const data =
    responseData.error && typeof responseData.error.details === 'object'
      ? (responseData.error.details as LoginApiErrorShape)
      : responseData

  const fieldErrors: ParsedLoginErrors['fieldErrors'] = {}

  const emailError = firstErrorMessage(data.email)
  if (emailError) {
    fieldErrors.email = emailError
  }

  const passwordError = firstErrorMessage(data.password)
  if (passwordError) {
    fieldErrors.password = passwordError
  }

  const formError = firstErrorMessage(data.non_field_errors) ?? firstErrorMessage(data.detail)

  return {
    fieldErrors,
    formError: formError || (Object.keys(fieldErrors).length ? undefined : 'Unable to sign in. Please try again.'),
  }
}

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null)

  const location = useLocation()
  const navigate = useNavigate()

  const redirectTo = resolvePostLoginPath(
    location.state as { from?: unknown } | null,
    APP_ROUTES.dashboard,
  )

  const loginMutation = useLogin({
    onSuccess: () => {
      navigate(redirectTo, { replace: true })
    },
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const onSubmit: SubmitHandler<LoginInput> = async (values) => {
    setServerError(null)

    try {
      await loginMutation.mutateAsync(values)
    } catch (error) {
      const parsedErrors = parseLoginErrors(error)

      if (parsedErrors.fieldErrors.email) {
        setError('email', { type: 'server', message: parsedErrors.fieldErrors.email })
      }

      if (parsedErrors.fieldErrors.password) {
        setError('password', { type: 'server', message: parsedErrors.fieldErrors.password })
      }

      if (parsedErrors.formError) {
        setServerError(parsedErrors.formError)
      }
    }
  }


  return (
    <form className="card w-full max-w-md bg-base-100 shadow-xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-body gap-4">
        <h2 className="card-title text-2xl">Sign in</h2>

        <FormInput
          label="Email"
          type="email"
          autoComplete="email"
          registration={register('email')}
          error={errors.email?.message}
          disabled={loginMutation.isPending}
          required
        />

        <FormInput
          label="Password"
          type="password"
          autoComplete="current-password"
          registration={register('password')}
          error={errors.password?.message}
          disabled={loginMutation.isPending}
          required
        />

        {serverError ? <p className="text-sm text-error">{serverError}</p> : null}

        <button className="btn btn-primary" type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  )
}
