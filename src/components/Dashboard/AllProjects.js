import { Link } from 'react-router-dom'
import Avatar from '../UI/Avatar'
import DetailsModal from './DetailsModal'

export default function AllProjects({ projects }) {
  console.log('projects', projects)

  return (
    <div className="flex justify-center items-center space-x-6">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => (
        <div className="flex flex-col">
          <Link to={`/projects/${project.id}`} key={project.id}>
            <div className="block rounded-t-lg shadow-lg bg-white max-w-sm text-center">
              <div className="py-3 px-6 border-b border-gray-300">
                <h1 className="font-semibold text-xl">Urgent</h1>
              </div>
              <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  {project.name}</h5>
                <p className="text-gray-700 text-base mb-4">
                  {project.details}
                </p>
              </div>
              <div className="assigned-to">
                <p><strong>Assigned to:</strong></p>
                <ul>
                  {project.assignedUsersList.map(user => (
                    <li key={user.photoURL}>
                      <Avatar src={user.photoURL} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                <p>Due by {project.dueDate.toDate().toDateString()}</p>
              </div>
            </div>
          </Link>
          <DetailsModal/>
        </div>
      ))}
    </div>
  )
}
