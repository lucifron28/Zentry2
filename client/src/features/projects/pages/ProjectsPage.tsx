import { useState, useMemo } from 'react'
import { PageHeader } from '@/shared/ui/data/PageHeader'
import { FilterToolbar } from '@/features/projects/components/FilterToolbar'
import { ProjectsTable } from '@/features/projects/components/ProjectsTable'
import { InsightPanel } from '@/features/projects/components/InsightPanel'
import { PROJECTS_MOCK } from '@/features/projects/data/projectsMockData'
import type { ProjectStatus } from '@/shared/ui/data/StatusBadge'

const INSIGHT = {
  headline: 'Horizon Terminal Phase II is ahead of schedule',
  body: 'At 64% completion, current velocity suggests a finish 12 days before the Oct 24 deadline. Starlight Server Integration is picking up pace — worth reviewing resourcing before Nov 12.',
  healthScore: 87,
  healthLabel: 'Overall system projects are running 15% more efficiently than last quarter.',
}

const PAGE_SIZE = 6

export function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'dueDate' | 'status'>('name')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = PROJECTS_MOCK

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.owner.name.toLowerCase().includes(q),
      )
    }

    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter)
    }

    return [...result].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'progress') return b.progress - a.progress
      if (sortBy === 'dueDate') return a.dueDate.localeCompare(b.dueDate)
      if (sortBy === 'status') return a.status.localeCompare(b.status)
      return 0
    })
  }, [search, statusFilter, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Reset to page 1 when filters change
  const handleSearch = (v: string) => { setSearch(v); setPage(1) }
  const handleStatus = (v: ProjectStatus | 'all') => { setStatusFilter(v); setPage(1) }
  const handleSort = (v: 'name' | 'progress' | 'dueDate' | 'status') => { setSortBy(v); setPage(1) }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Projects"
        description="Organize project records, milestones, and assigned team members in one place."
        action={
          <button className="btn btn-primary btn-sm" disabled aria-label="New project (coming soon)">
            + New Project
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Main content */}
        <div className="space-y-4 lg:col-span-3">
          <FilterToolbar
            search={search}
            onSearchChange={handleSearch}
            statusFilter={statusFilter}
            onStatusChange={handleStatus}
            sortBy={sortBy}
            onSortChange={handleSort}
          />

          <ProjectsTable projects={paged} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-base-content/55">
                Showing {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} projects
              </p>
              <div className="join">
                <button
                  className="join-item btn btn-sm btn-ghost"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ‹ Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={['join-item btn btn-sm', n === page ? 'btn-active' : 'btn-ghost'].join(' ')}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  className="join-item btn btn-sm btn-ghost"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next ›
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar insight */}
        <div className="lg:col-span-1">
          <InsightPanel
            headline={INSIGHT.headline}
            body={INSIGHT.body}
            healthScore={INSIGHT.healthScore}
            healthLabel={INSIGHT.healthLabel}
          />
        </div>
      </div>
    </section>
  )
}
