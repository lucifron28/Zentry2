const MOCK_ATTACHMENTS = [
  {
    id: 1,
    name: 'Land_of_Waves_Map.png',
    type: 'image',
    size: '2.4 MB',
    owner: 'Naruto Uzumaki',
    project: 'Reconstruction Plan',
    created_at: '2026-04-01T10:00:00Z',
  },
  {
    id: 2,
    name: 'Advanced_Healing_Techniques.pdf',
    type: 'pdf',
    size: '15.7 MB',
    owner: 'Sakura Haruno',
    project: 'Medical Wing Upgrade',
    created_at: '2026-04-05T14:30:00Z',
  },
  {
    id: 3,
    name: 'Susanoo_Optimization_Notes.docx',
    type: 'doc',
    size: '850 KB',
    owner: 'Sasuke Uchiha',
    project: 'Combat Training',
    created_at: '2026-04-08T09:15:00Z',
  },
  {
    id: 4,
    name: 'Tactical_Formation_Gamma.xlsx',
    type: 'sheet',
    size: '120 KB',
    owner: 'Shikamaru Nara',
    project: 'Village Defense',
    created_at: '2026-04-09T16:45:00Z',
  },
  {
    id: 5,
    name: 'Icha_Icha_Tactics_Draft.txt',
    type: 'text',
    size: '45 KB',
    owner: 'Kakashi Hatake',
    project: 'Private Research',
    created_at: '2026-04-10T11:20:00Z',
  },
]

function getIcon(type: string) {
  switch (type) {
    case 'image': return '🖼️'
    case 'pdf': return '📕'
    case 'doc': return '📄'
    case 'sheet': return '📊'
    default: return '📁'
  }
}

export function AttachmentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content">Attachments</h1>
          <p className="text-base-content/60">Maintain file evidence and references associated with projects and tasks.</p>
        </div>
        <button className="btn btn-primary btn-md shadow-lg shadow-primary/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          Upload Artifact
        </button>
      </header>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button className="btn btn-sm btn-active rounded-full">All Files</button>
        <button className="btn btn-sm btn-ghost rounded-full border border-base-300">Images</button>
        <button className="btn btn-sm btn-ghost rounded-full border border-base-300">Documents</button>
        <button className="btn btn-sm btn-ghost rounded-full border border-base-300">Archives</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {MOCK_ATTACHMENTS.map((file) => (
          <div key={file.id} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
            <div className="card-body p-5">
              <div className="flex items-start justify-between">
                <div className="text-4xl select-none">{getIcon(file.type)}</div>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-xs btn-square opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                  </label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-40 border border-base-200">
                    <li><a>Download</a></li>
                    <li><a>Share</a></li>
                    <li className="text-error"><a>Delete</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-bold text-base-content truncate" title={file.name}>{file.name}</h3>
                <p className="text-xs text-base-content/40 mt-1">{file.size} · {file.type.toUpperCase()}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-base-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-primary/10 text-primary text-[10px] font-bold rounded-full w-6">
                      <span>{file.owner[0]}</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-base-content/60">{file.owner}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">{file.project}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
