import { useState } from "react"
import { timestamp } from "../../firebase/fbConfig"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../UI/Avatar"

export default function AllMessages({ conversation }) {
    const { user } = useAuthContext()
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
        <div className="bg-blue-300 flex h-1/2 w-1/2 shadow-xl rounded-xl">
            <div className="flex flex-col ml-16 justify-between">
                <h4 className="text-3xl font-bold mt-4"> Conversation Messages </h4>
                <div className="flex flex-col">
                    {conversation.messages.length > 0 && conversation.messages.map(msg => (
                        <div key={msg.id} className='singleMessage'>

                            <div className='message-sender-name'>
                                <p> From: {msg.senderName} </p>
                            </div>
                            <div className='message-content'>
                                <p> {msg.message} </p>
                            </div>

                        </div>
                    ))}

                    <form className="flex flex-row"  onSubmit={handleSubmit}>
                        <textarea
                            className="mb-12"
                            onChange={(e) => setNewMessage(e.target.value)} value={newMessage} placeholder="say something nice" ></textarea>
                        <button type="submit" className="flex flex-grow-0 bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 mb-12 ml-6">
                            Send
                            <svg xmlns="http://www.w3.org/2000/svg" class="inline ml-2 w-6 stroke-current text-white stroke-2" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
