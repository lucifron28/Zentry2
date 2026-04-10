import type { ProjectStatus } from '@/shared/ui/data/StatusBadge'

type FilterToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: ProjectStatus | 'all'
  onStatusChange: (value: ProjectStatus | 'all') => void
  sortBy: 'name' | 'progress' | 'dueDate' | 'status'
  onSortChange: (value: 'name' | 'progress' | 'dueDate' | 'status') => void
}

export function FilterToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
}: FilterToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative max-w-sm flex-1">
        <input
          id="project-search"
          type="search"
          className="input input-bordered input-sm w-full pl-9 bg-base-100"
          placeholder="Search projects…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search projects"
        />
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-base-content/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </div>

      <div className="flex items-center gap-2.5">
        <select
          id="project-status-filter"
          className="select select-bordered select-sm bg-base-100"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as ProjectStatus | 'all')}
          aria-label="Filter by status"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="planning">Planning</option>
          <option value="on_hold">On Hold</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>

        <select
          id="project-sort"
          className="select select-bordered select-sm bg-base-100"
          value={sortBy}
          onChange={(e) =>
            onSortChange(e.target.value as 'name' | 'progress' | 'dueDate' | 'status')
          }
          aria-label="Sort projects"
        >
          <option value="name">Sort: Name</option>
          <option value="progress">Sort: Progress</option>
          <option value="dueDate">Sort: Due Date</option>
          <option value="status">Sort: Status</option>
        </select>
      </div>
    </div>
  )
}
