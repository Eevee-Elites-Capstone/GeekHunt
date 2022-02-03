import React, { useRef, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useCollection } from '../../hooks/useCollection'
import { useSendMessage } from '../../hooks/useSendMessage' 

const firestore = firebase.firestore();


function SingleChatMessage (props) {
    const { text, recepientId, senderId } = props.message
    console.log(props)
    
    return (
    <div>
        <div>
            <h5>From: {senderId} To: {recepientId} </h5>
            <p>{ text } </p>
        </div>
    </div>
    )
}

export default function MessagingPage() {
    
    //const messagesRef = firestore.collection('messages');
   // const query = messagesRef.orderBy('createdAt').limit(25);
    //{documents.length === 0 && <p>No messages yet!</p>}
    
    //{documents.map(msg => <singleChatMessage key={msg.id} message={msg} />)}
    
    const [formValue, setFormValue] = useState('');
    
    const { documents, error } = useCollection('messages');
    // const { message } = useSendMessage({})
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }
    
    console.log('DOCUMENTS:', documents)
    return (
        <div>
            <h1>Messages</h1>
            {documents && documents.map(msg => <SingleChatMessage key={msg.id} message={msg} />)}
        <form onSubmit={handleSubmit}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
            <button type="submit">️SEND</button>
        </form>
        </div>
    )
}