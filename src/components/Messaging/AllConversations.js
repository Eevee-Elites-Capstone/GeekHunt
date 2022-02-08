import  {firebase, projectFirestore, timestamp} from '../../firebase/fbConfig';
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useAllConversations } from '../../hooks/useAllConversations'
import { useNewConversation } from '../../hooks/useNewConversation'
import { Link } from "react-router-dom";

export default function AllConversations () {
  const { user } = useAuthContext()
  console.log('THE USER!!!: ', user)
  const [newMessage, setNewMessage] = useState('')
  const [newUser, setNewUser] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const conversationsRef = projectFirestore.collection('conversations');
  //const { id } = useParams()
//   const { document, error } = useCollection('conversations', `"users", "array-contains", ${id}`)
  const { document, error } = useAllConversations(user.uid)
  console.log('THE DOCUMENT: ', document)
  
  if (error) {
    return <div className="error">{error}</div>
  }
  else if (!document) {
    return <div className="loading">Loading...</div>
  }
  else {
  console.log('THE DOCUMENT LENGTH: ', document.length)
  
  //{conv.users.forEach(element => {if (element !== user.uid){return element}})}
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await useNewConversation(newUser, newTitle, newMessage)
  //   console.log(e)
  //   console.log('FormValues: ', newUser, newTitle, newMessage)
  // }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const conversationToCreate = {
        users: [newUser, user.uid],
        messages: [newMessage],
        createdAt: timestamp.fromDate(new Date()),
        updatedAt: timestamp.fromDate(new Date()),
        title: newTitle,
    }
    await conversationsRef.add(conversationToCreate)
  }
  
  return (
    <div className="all-conversations">
      <h1> All Conversations: </h1>
        {document.map(conv => (
          <Link to={`/conversations/${conv.id}`} key={conv.id}>
            <p> Conversation Title: {conv.title}</p>
            <p> {conv.messages[0].message} </p>
          </Link>
        ))}
      <h3> Start a new conversation </h3>
      <form className='new-conversation-form' onSubmit={handleSubmit}>
        <input 
          onChange={(e) => setNewTitle(e.target.value)} 
          value={newTitle} 
          placeholder="Title" />
        <input 
          onChange={(e) => setNewUser(e.target.value)} 
          value={newUser} 
          placeholder="Who do you want to reach" />
        <textarea 
          required
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage} 
          placeholder="First Message" />
        <button type="submit">️SEND</button>
      </form>
    </div>
  )
  }
}
