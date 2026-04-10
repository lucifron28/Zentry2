import type { ApiUser } from '@/features/projects/types/project'

const MOCK_USERS: ApiUser[] = [
  {
    id: 1,
    email: 'naruto@konoha.gov',
    first_name: 'Naruto',
    last_name: 'Uzumaki',
    display_name: 'Naruto Uzumaki',
    role: 'Seventh Hokage (Owner)',
    is_active: true,
  },
  {
    id: 2,
    email: 'kakashi@konoha.gov',
    first_name: 'Kakashi',
    last_name: 'Hatake',
    display_name: 'Kakashi Hatake',
    role: 'Sixth Hokage (Admin)',
    is_active: true,
  },
  {
    id: 3,
    email: 'sasuke@uchiha.com',
    first_name: 'Sasuke',
    last_name: 'Uchiha',
    display_name: 'Sasuke Uchiha',
    role: 'Supporting Kage (Manager)',
    is_active: true,
  },
  {
    id: 4,
    email: 'sakura@med.konoha.gov',
    first_name: 'Sakura',
    last_name: 'Haruno',
    display_name: 'Sakura Haruno',
    role: 'Head of Medical (Manager)',
    is_active: true,
  },
  {
    id: 5,
    email: 'shikamaru@nara.com',
    first_name: 'Shikamaru',
    last_name: 'Nara',
    display_name: 'Shikamaru Nara',
    role: 'Chief Advisor (Member)',
    is_active: true,
  },
  {
    id: 6,
    email: 'hinata@hyuga.com',
    first_name: 'Hinata',
    last_name: 'Hyuga',
    display_name: 'Hinata Hyuga',
    role: 'Special Investigator (Member)',
    is_active: true,
  },
]

export function UserManagementPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content">User Management</h1>
          <p className="text-base-content/60">Configure access levels and manage the Hidden Leaf personnel.</p>
        </div>
        <button className="btn btn-primary btn-md shadow-lg shadow-primary/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
          Invite Shinobi
        </button>
      </header>

      {/* Stats row */}
      <div className="flex flex-wrap gap-4">
        <div className="badge badge-outline p-4 h-auto gap-2 border-base-300">
          <span className="font-bold">Total Users:</span> {MOCK_USERS.length}
        </div>
        <div className="badge badge-success badge-outline p-4 h-auto gap-2">
          <span className="font-bold">Active:</span> 6
        </div>
        <div className="badge badge-info badge-outline p-4 h-auto gap-2">
          <span className="font-bold">New This Month:</span> 0
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <table className="table table-zebra w-full text-base-content">
          <thead className="bg-base-200/50">
            <tr>
              <th className="font-bold text-xs uppercase tracking-widest text-base-content/50">Personnel</th>
              <th className="font-bold text-xs uppercase tracking-widest text-base-content/50">Designation</th>
              <th className="font-bold text-xs uppercase tracking-widest text-base-content/50">Status</th>
              <th className="font-bold text-xs uppercase tracking-widest text-base-content/50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="hover:bg-base-200/30 transition-colors">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary/10 text-primary font-bold rounded-lg w-10">
                        <span>{user.first_name[0]}{user.last_name[0]}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.display_name}</div>
                      <div className="text-xs text-base-content/50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-sm font-medium">{user.role}</span>
                </td>
                <td>
                  <div className="badge badge-success badge-sm gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-content" />
                    Active
                  </div>
                </td>
                <td className="text-right">
                  <div className="dropdown dropdown-left dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-sm btn-square">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-200">
                      <li><a>Assign Role</a></li>
                      <li><a>View Activity</a></li>
                      <li className="text-error"><a>Suspend Access</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
