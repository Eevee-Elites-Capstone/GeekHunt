import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import ProjectComments from "./ProjectComments"

import ProjectSummary from "./ProjectSummary"

export default function SingleProject() {
  const { id } = useParams()
  const { document, error } = useDocument('projects', id)

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }


  return (<>
    <div className="project-details flex flex-col items-center m-36 px-6 border rounded-xl shadow-lg h-full bg-slate-50">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>

  </>
  )
}
