import { useCollection } from '../../hooks/useCollection'
import Notification from './Notification'

// components
import AllProjects from './AllProjects'
import Sidebar from './Sidebar'
import DashboardNav from './DashboardNav'
import OnlineUsers from '../Users/OnlineUsers'

export default function Dashboard() {
  const { documents, error } = useCollection('projects')
  const { doc, err } = useCollection('notifications')

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex-auto flex-col bg-yellow-500 rounded-md h-full">
        <DashboardNav />
        <div className="flex flex-row">
          <div className="bg-blue-200 w-1/2 p-8 flex-wrap overflow overflow-auto h/1/2">
            {error && <p className="error">{error}</p>}
            {documents && <AllProjects projects={documents} />}
          </div>
          <div className="bg-green-200 w-1/2 h-96">
            Report
          </div>

        </div>
      </div>

      <div className="submenu w-64 h-full bg-slate-400 flex flex-col items-center space-y-4">
        <div className="bg-yellow-200 h-72 w-64 rounded-md shadow-md mt-2 p-2">Todo List</div>
        <Notification notification={doc} />
        <OnlineUsers/>
      </div>
    </div>
  )
}
