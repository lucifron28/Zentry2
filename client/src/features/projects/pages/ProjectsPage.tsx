import { useState } from 'react'
import { PageHeader } from '@/shared/ui/data/PageHeader'
import { FilterToolbar } from '@/features/projects/components/FilterToolbar'
import { ProjectsTable } from '@/features/projects/components/ProjectsTable'
import { InsightPanel } from '@/features/projects/components/InsightPanel'
import { CreateProjectModal } from '@/features/projects/components/CreateProjectModal'
import { useProjects } from '@/features/projects/hooks/useProjects'
import type { ProjectStatus } from '@/shared/ui/data/StatusBadge'

const INSIGHT = {
  headline: 'Insight metrics are still being integrated',
  body: 'This panel is intentionally limited until evidence-based project analytics are available from backend support.',
  healthScore: 0,
  healthLabel: 'Trend analysis and predictive insights are intentionally out of scope for this pass.',
}

export function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'dueDate' | 'status'>('name')
  const [page, setPage] = useState(1)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [createFeedback, setCreateFeedback] = useState<string | null>(null)

  // Map sort keys to Django ordering strings
  const orderingMap: Record<string, string> = {
    name: 'name',
    progress: '-progress',
    dueDate: 'due_date',
    status: 'status',
  }

  const { data, isLoading } = useProjects({
    page,
    search: search || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    ordering: orderingMap[sortBy] || 'name',
    // limit/pageSize is handled automatically by DRF if we set PAGE_SIZE=20.
    // For smaller pagination we could pass limit if the API supports it.
  })

  const projects = data?.results || []
  
  // DRF total pages based on count and pagination settings (assuming 20 page_size)
  const pageSize = 20
  const totalCount = data?.count || 0
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  const handleSearch = (v: string) => { setSearch(v); setPage(1) }
  const handleStatus = (v: ProjectStatus | 'all') => { setStatusFilter(v); setPage(1) }
  const handleSort = (v: 'name' | 'progress' | 'dueDate' | 'status') => { setSortBy(v); setPage(1) }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Projects"
        description="Organize project records, milestones, and assigned team members in one place."
        action={
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsCreateModalOpen(true)}
            aria-label="Create new project"
          >
            + New Project
          </button>
        }
      />

      {createFeedback ? (
        <div className="alert alert-success items-start sm:items-center">
          <span>{createFeedback}</span>
          <button
            type="button"
            className="btn btn-ghost btn-xs sm:ml-auto"
            onClick={() => setCreateFeedback(null)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-3">
          <FilterToolbar
            search={search}
            onSearchChange={handleSearch}
            statusFilter={statusFilter}
            onStatusChange={handleStatus}
            sortBy={sortBy}
            onSortChange={handleSort}
          />

          <ProjectsTable projects={projects} isLoading={isLoading} />

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-base-content/55">
                Showing {(page - 1) * pageSize + 1}–
                {Math.min(page * pageSize, totalCount)} of {totalCount} projects
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

        <div className="lg:col-span-1">
          <InsightPanel
            headline={INSIGHT.headline}
            body={INSIGHT.body}
            healthScore={INSIGHT.healthScore}
            healthLabel={INSIGHT.healthLabel}
          />
        </div>
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={(projectName) => {
          setCreateFeedback(`Project "${projectName}" was created successfully.`)
          setPage(1)
        }}
      />
    </section>
  )
}
