const MOCK_LOGS = [
  {
    id: 1,
    user: 'Naruto Uzumaki',
    action: 'Created new project',
    target: 'Land of Waves Reconstruction',
    timestamp: new Date(Date.now() - 300000).toISOString(), // 5m ago
    type: 'project_create',
  },
  {
    id: 2,
    user: 'Sasuke Uchiha',
    action: 'Assigned task',
    target: 'Watch for rogue ninjas',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1h ago
    type: 'task_assign',
  },
  {
    id: 3,
    user: 'Shikamaru Nara',
    action: 'Updated status',
    target: 'Chunin Exams Security',
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2h ago
    type: 'status_update',
  },
  {
    id: 4,
    user: 'Sakura Haruno',
    action: 'Uploaded attachment',
    target: 'Advanced Healing Scroll.pdf',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1d ago
    type: 'file_upload',
  },
  {
    id: 5,
    user: 'Kakashi Hatake',
    action: 'Completed project',
    target: 'Icha Icha Tactics Review',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2d ago
    type: 'project_complete',
  },
  {
    id: 6,
    user: 'Hinata Hyuga',
    action: 'Commented on task',
    target: 'Training Ground 4 Maintenance',
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3d ago
    type: 'comment_add',
  },
]

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const minutes = Math.floor(diffMs / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}

export function ActivityLogsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-base-content">Activity Logs</h1>
        <p className="mt-2 text-base-content/60">Traceable records of user and system actions within the village.</p>
      </header>

      <div className="relative">
        <div className="absolute left-6 top-4 bottom-4 w-px bg-base-300" />
        
        <div className="space-y-6">
          {MOCK_LOGS.map((log) => (
            <div key={log.id} className="relative pl-12 group">
              {/* Dot */}
              <div className="absolute left-4 top-2 h-4 w-4 rounded-full border-2 border-base-100 bg-primary ring-4 ring-base-100 group-hover:scale-125 transition-transform" />
              
              <div className="bg-base-100 border border-base-200 rounded-2xl p-4 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base-content">{log.user}</span>
                    <span className="text-sm text-base-content/60">{log.action}</span>
                    <span className="text-sm font-semibold text-primary/80">{log.target}</span>
                  </div>
                  <span className="text-xs font-medium text-base-content/40 whitespace-nowrap">
                    {timeAgo(log.timestamp)}
                  </span>
                </div>
                
                <div className="mt-3 flex gap-2">
                  <div className="badge badge-sm badge-ghost font-medium">#{log.type}</div>
                  <div className="badge badge-sm badge-outline border-base-300 font-medium">Konoha HQ</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button className="btn btn-ghost btn-sm text-base-content/40 hover:bg-base-200">
          Load older logs...
        </button>
      </div>
    </div>
  )
}
