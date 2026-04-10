import { GlobalCommentItem } from '../components/GlobalCommentItem'
import type { ApiComment } from '../types/comment'

const MOCK_COMMENTS: (ApiComment & { task_title: string; project_name: string })[] = [
  {
    id: 1,
    task: 101,
    task_title: 'Implement Dark Mode',
    project_name: 'Zentry Web App',
    author: 1,
    author_details: {
      id: 1,
      email: 'admin@zentry.com',
      first_name: 'Admin',
      last_name: 'User',
      display_name: 'Admin User',
      role: 'admin',
      is_active: true,
    },
    body: 'Reviewed the theme implementation. The contrast ratios in dark mode look excellent. Let\'s proceed with the merge.',
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1h ago
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    task: 102,
    task_title: 'API Performance Tuning',
    project_name: 'Core Engine',
    author: 2,
    author_details: {
      id: 2,
      email: 'sarah@zentry.com',
      first_name: 'Sarah',
      last_name: 'Chen',
      display_name: 'Sarah Chen',
      role: 'manager',
      is_active: true,
    },
    body: 'Great catches on the N+1 queries. We should also look into caching the project list results for frequent users.',
    created_at: new Date(Date.now() - 7200000).toISOString(), // 2h ago
    updated_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 3,
    task: 103,
    task_title: 'Mobile Navigation Fix',
    project_name: 'Zentry Mobile',
    author: 3,
    author_details: {
      id: 3,
      email: 'mike@zentry.com',
      first_name: 'Mike',
      last_name: 'Ross',
      display_name: 'Mike Ross',
      role: 'developer',
      is_active: true,
    },
    body: 'The burger menu was overlapping the status bar on iOS. Pushed a fix using safe-area-inset-top.',
    created_at: new Date(Date.now() - 14400000).toISOString(), // 4h ago
    updated_at: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: 4,
    task: 101,
    task_title: 'Implement Dark Mode',
    project_name: 'Zentry Web App',
    author: 2,
    author_details: {
      id: 2,
      email: 'sarah@zentry.com',
      first_name: 'Sarah',
      last_name: 'Chen',
      display_name: 'Sarah Chen',
      role: 'manager',
      is_active: true,
    },
    body: 'Don\'t forget to check the logo visibility on the login page against the new background gradients!',
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1d ago
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
]

export function CommentsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
          Recent Activity
        </h1>
        <p className="text-base-content/60 max-w-2xl">
          A centralized view of collaboration across all projects and tasks. 
          Use this to stay updated on the latest discussions and architectural decisions.
        </p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="stats shadow-sm bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-title">Total Comments</div>
            <div className="stat-value text-primary">1,284</div>
            <div className="stat-desc">Jan 1st - Apr 1st</div>
          </div>
        </div>
        <div className="stats shadow-sm bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-title">Active Collaborators</div>
            <div className="stat-value text-secondary">42</div>
            <div className="stat-desc">↗︎ 12% from last month</div>
          </div>
        </div>
        <div className="stats shadow-sm bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-title">Unreplied Threads</div>
            <div className="stat-value text-accent">5</div>
            <div className="stat-desc">Requires attention</div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-base-content">Collaboration Feed</h2>
          <div className="flex gap-2">
            <select className="select select-bordered select-sm">
              <option>All Projects</option>
              <option>Zentry Web App</option>
              <option>Core Engine</option>
            </select>
            <button className="btn btn-sm btn-ghost">Mark all as read</button>
          </div>
        </div>

        <div className="grid gap-4">
          {MOCK_COMMENTS.map((comment) => (
            <GlobalCommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  )
}
