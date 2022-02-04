import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'

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
    <div className="singleConversation">
      <AllMessages conversation={document} />
    </div>
  )
}