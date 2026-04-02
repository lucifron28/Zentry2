import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { loginSchema } from '@/features/auth/schemas/loginSchema'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const loginMutation = useLogin()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsed = loginSchema.safeParse({ email, password })
    if (!parsed.success) {
      setErrorMessage(parsed.error.issues[0]?.message ?? 'Invalid login details.')
      return
    }

    setErrorMessage(null)
    loginMutation.mutate(parsed.data)
  }

  return (
    <form className="card w-full max-w-md bg-base-100 shadow-xl" onSubmit={onSubmit}>
      <div className="card-body gap-4">
        <h2 className="card-title text-2xl">Sign in</h2>

        <label className="form-control w-full gap-2">
          <span className="label-text">Email</span>
          <input
            className="input input-bordered w-full"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label className="form-control w-full gap-2">
          <span className="label-text">Password</span>
          <input
            className="input input-bordered w-full"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {errorMessage ? <p className="text-sm text-error">{errorMessage}</p> : null}

        {loginMutation.isError ? (
          <p className="text-sm text-error">Unable to sign in. Please try again.</p>
        ) : null}

        <button className="btn btn-primary" type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  )
}
