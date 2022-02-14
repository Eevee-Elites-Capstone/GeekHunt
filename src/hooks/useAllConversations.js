import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/fbConfig"

export const useAllConversations = (id) => {
  const [selectedConvo, setSelectedConvo] = useState(null)
  const [convoError, setConvoError] = useState(null)
  
  console.log(id)
  // realtime document data
  useEffect(() => {
    const conversationsRef = projectFirestore.collection('conversations')
    let userConversations = conversationsRef.where('users', 'array-contains', id).orderBy('updatedAt', 'desc')
    
    const unsubscribe = userConversations.onSnapshot(snapshot => {
      // need to make sure the doc exists & has data
      let results = [];
      if(snapshot.docs) {
        snapshot.docs.forEach(doc => {
          results.push({...doc.data(), id: doc.id})
        })
        setSelectedConvo(results)
        setConvoError(null)
      }
      else {
        setConvoError('No such document exists')
      }
    }, err => {
      console.log(err.message)
      setConvoError('failed to get document')
    })
    
    return () => unsubscribe()
    
  }, [id])

  return { selectedConvo, convoError }
}
