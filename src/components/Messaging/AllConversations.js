import { useParams } from "react-router-dom"
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from "../../hooks/useAuthContext"
import { useAllConversations } from '../../hooks/useAllConversations'
import { Link } from "react-router-dom";

export default function AllConversations () {
  const { user } = useAuthContext()
  console.log('THE USER!!!: ', user)
  //const { id } = useParams()
//   const { document, error } = useCollection('conversations', `"users", "array-contains", ${id}`)
  const { document, error } = useAllConversations(user.uid)
  console.log(document)
  
  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="all-conversations">
      <h1> All Conversations </h1>
    </div>
  )
}
