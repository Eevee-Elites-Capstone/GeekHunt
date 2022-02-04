import { useCollection } from '../../hooks/useCollection'
import Notification from './Notification'

// components
import AllProjects from './AllProjects'

export default function Dashboard() {
  const { documents, error } = useCollection('projects')
  const { doc, err } = useCollection('notifications')

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <AllProjects projects={documents} />}
      <Notification notification={doc}/>
    </div>
  )
}
