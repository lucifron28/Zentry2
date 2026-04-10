const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'New Mission Assigned',
    message: 'Naruto Uzumaki assigned you to the "Land of Waves Reconstruction" project.',
    type: 'success',
    time: '5m ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Deployment Strategy Update',
    message: 'Shikamaru Nara tagged you in a comment on "Chunin Exams Security".',
    type: 'info',
    time: '1h ago',
    unread: true,
  },
  {
    id: 3,
    title: 'System Alert',
    message: 'Six Paths of Pain detected in the staging environment. Verification required.',
    type: 'warning',
    time: '2h ago',
    unread: false,
  },
  {
    id: 4,
    title: 'Archival Update',
    message: 'Kakashi Hatake uploaded a new version of "Advanced Healing Techniques.pdf".',
    type: 'info',
    time: '4h ago',
    unread: false,
  },
  {
    id: 5,
    title: 'Medical Approval',
    message: 'Sakura Haruno approved your request for medical supplies on Mission #402.',
    type: 'success',
    time: '1d ago',
    unread: false,
  },
]

export function NotificationsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content">Notifications</h1>
          <p className="text-base-content/60">Manage your alerts and staying updated with the village's progress.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost btn-sm">Mark all as read</button>
          <button className="btn btn-primary btn-sm">Settings</button>
        </div>
      </header>

      <div className="space-y-3">
        {MOCK_NOTIFICATIONS.map((notif) => (
          <div 
            key={notif.id} 
            className={`flex items-start gap-4 p-5 rounded-3xl border transition-all hover:bg-base-200/40 ${
              notif.unread 
                ? 'bg-base-100 border-primary/20 shadow-sm' 
                : 'bg-base-100/50 border-base-200 opacity-80'
            }`}
          >
            {/* Type Indicator */}
            <div className={`mt-1 flex-shrink-0 h-3 w-3 rounded-full ${
              notif.type === 'success' ? 'bg-success' : 
              notif.type === 'warning' ? 'bg-warning' : 'bg-info'
            }`} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <h3 className={`text-base font-bold truncate ${notif.unread ? 'text-base-content' : 'text-base-content/70'}`}>
                  {notif.title}
                </h3>
                <span className="text-xs font-medium text-base-content/40 whitespace-nowrap">{notif.time}</span>
              </div>
              <p className={`mt-1 text-sm leading-relaxed ${notif.unread ? 'text-base-content/80' : 'text-base-content/50'}`}>
                {notif.message}
              </p>
            </div>

            {notif.unread && (
              <div className="flex-shrink-0 self-center">
                <div className="badge badge-primary badge-xs" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <button className="btn btn-ghost btn-sm text-base-content/40">
          View older notifications
        </button>
      </div>
    </div>
  )
}
