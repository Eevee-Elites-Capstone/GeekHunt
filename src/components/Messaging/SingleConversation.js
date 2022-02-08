import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import Sidebar from "../Dashboard/Sidebar"
import AllMessages from "./AllMessages"

export default function SingleConversation() {
  const { id } = useParams()
  const { document, error } = useDocument('conversations', id)

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }


  return (
    <div className="h-screen flex flex-row">
    <Sidebar/>
      <div className="flex flex-auto bg-slate-200 justify-center items-center">
        <AllMessages conversation={document} />
      </div>
    </div>
  )
}
