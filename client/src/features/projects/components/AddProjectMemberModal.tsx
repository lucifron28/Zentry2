import { useEffect, useMemo, useState } from 'react'
import type { ApiUser } from '@/features/projects/types/project'
import { useProjectMemberCandidates } from '@/features/projects/hooks/useProjectMemberCandidates'
import { EmptyState } from '@/shared/ui/states/EmptyState'
import { ErrorState } from '@/shared/ui/states/ErrorState'
import { LoadingState } from '@/shared/ui/states/LoadingState'

type AddProjectMemberModalProps = {
  isOpen: boolean
  members: ApiUser[]
  isSubmitting: boolean
  errorMessage?: string | null
  onAddMember: (userId: string | number) => Promise<void>
  onClose: () => void
}

function normalizeId(value: string | number | null | undefined) {
  return value == null ? '' : String(value)
}

function matchesSearch(user: ApiUser, query: string) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) {
    return true
  }

  return [user.display_name, user.email, user.role]
    .join(' ')
    .toLowerCase()
    .includes(normalizedQuery)
}

export function AddProjectMemberModal({
  isOpen,
  members,
  isSubmitting,
  errorMessage,
  onAddMember,
  onClose,
}: AddProjectMemberModalProps) {
  const [search, setSearch] = useState('')
  const [pendingUserId, setPendingUserId] = useState<string | number | null>(null)

  const usersQuery = useProjectMemberCandidates(isOpen)

  useEffect(() => {
    if (isOpen) {
      setSearch('')
      setPendingUserId(null)
    }
  }, [isOpen])

  const existingMemberIds = useMemo(
    () => new Set((members || []).map((member) => normalizeId(member.id))),
    [members],
  )

  const availableUsers = useMemo(() => {
    const users = usersQuery.data || []

    return users.filter(
      (user) => !existingMemberIds.has(normalizeId(user.id)) && matchesSearch(user, search),
    )
  }, [existingMemberIds, search, usersQuery.data])

  const hasAnyCandidate = useMemo(() => {
    const users = usersQuery.data || []
    return users.some((user) => !existingMemberIds.has(normalizeId(user.id)))
  }, [existingMemberIds, usersQuery.data])

  const handleAddMember = async (userId: string | number) => {
    setPendingUserId(userId)
    try {
      await onAddMember(userId)
    } finally {
      setPendingUserId(null)
    }
  }

  const handleClose = () => {
    if (isSubmitting) {
      return
    }
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="add-member-title">
      <div className="modal-box max-w-2xl bg-base-100">
        <h3 id="add-member-title" className="text-lg font-semibold text-base-content">
          Add Project Member
        </h3>
        <p className="mt-1 text-sm text-base-content/70">
          Select an active user to add to this project team.
        </p>

        <div className="mt-5 space-y-4">
          <label className="form-control">
            <div className="label pb-1">
              <span className="label-text text-xs font-medium uppercase tracking-wide text-base-content/55">
                Search Users
              </span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search by name, email, or role"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              disabled={isSubmitting || usersQuery.isLoading}
            />
          </label>

          {errorMessage ? (
            <p className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">
              {errorMessage}
            </p>
          ) : null}

          {usersQuery.isLoading ? (
            <LoadingState
              title="Loading users"
              description="Preparing available users for member assignment."
            />
          ) : null}

          {usersQuery.isError ? (
            <ErrorState
              title="Could not load users"
              description="Try again to retrieve active users for this project."
              actionLabel="Retry"
              onAction={() => {
                void usersQuery.refetch()
              }}
            />
          ) : null}

          {!usersQuery.isLoading && !usersQuery.isError ? (
            availableUsers.length ? (
              <ul className="max-h-72 space-y-2 overflow-y-auto pr-1">
                {availableUsers.map((user) => {
                  const isPendingForRow =
                    isSubmitting && normalizeId(pendingUserId) === normalizeId(user.id)

                  return (
                    <li
                      key={user.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-base-200 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-base-content">{user.display_name}</p>
                        <p className="truncate text-xs text-base-content/60">{user.email}</p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-xs"
                        disabled={isSubmitting}
                        onClick={() => {
                          void handleAddMember(user.id)
                        }}
                      >
                        {isPendingForRow ? 'Adding...' : 'Add'}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <EmptyState
                title={hasAnyCandidate ? 'No users match your search' : 'All active users are already members'}
                description={
                  hasAnyCandidate
                    ? 'Try a different search keyword to find a user.'
                    : 'There are no additional active users available to add right now.'
                }
              />
            )
          ) : null}
        </div>

        <div className="modal-action mt-2">
          <button type="button" className="btn btn-ghost" onClick={handleClose} disabled={isSubmitting}>
            Close
          </button>
        </div>
      </div>

      <button type="button" className="modal-backdrop" onClick={handleClose} aria-label="Close add member dialog">
        close
      </button>
    </div>
  )
}
