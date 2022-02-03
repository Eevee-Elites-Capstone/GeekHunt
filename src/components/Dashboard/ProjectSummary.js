import { useHistory } from "react-router-dom"
import Avatar from "../../components/UI/Avatar"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore('projects')
  const { user } = useAuthContext()
  const history = useHistory()

  const handleClick = () => {
    deleteDocument(project.id)
    history.push('/dashboard')
  }

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>Created By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">
          {project.details}
        </p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
        {user.uid === project.createdBy.id && (
        <button className="btn bg-red-600" onClick={handleClick}>Delete Project</button>
      )}
    </div>
  )
}
