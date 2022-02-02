import { useCollection } from '../../hooks/useCollection'

// components
import AllProjects from './AllProjects'

export default function Dashboard() {
  const { documents, error } = useCollection('projects')

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <AllProjects projects={documents} />}
    </div>
  )
}