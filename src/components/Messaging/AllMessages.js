import { comment } from "postcss"
import { useState } from "react"
import { timestamp } from "../../firebase/fbConfig"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../UI/Avatar"

export default function AllMessages ({ conversation }) {
    const { user } = useAuthContext()
    console.log('USER FROM useAuthContext: ', user)
    console.log('THE CONVERSATION: ', conversation)
    const { updateDocument, response } = useFirestore('conversations') //not sure what this does
    const [newMessage, setNewMessage] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const messageToAdd = {
            senderId: user.uid,
            senderName: user.displayName,
            message: newMessage,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }
        
        await updateDocument(conversation.id, {
            messages: [...conversation.messages, messageToAdd]
        })
        if (!response.error) {
            setNewMessage('')
        }
    }
    
    return (
        <div className='MessagingPage'>
            <h4> Conversation Messages </h4>
            {conversation.messages.length > 0 && conversation.messages.map(msg => (
                console.log(msg),
                <div key={msg.id} className='singleMessage'>
                
                    <div className='message-sender-name'>
                        <p> From: {msg.senderName} </p>
                    </div>
                    <div className='message-content'>
                        <p> {msg.message} </p>
                    </div>
                    
                </div>
            ))}
            
            <form className='new-message-form' onSubmit={handleSubmit}>
                <input onChange={(e) => setNewMessage(e.target.value)} value={newMessage} placeholder="say something nice" />
                <button type="submit">️SEND</button>
            </form>
        </div>
    )
}