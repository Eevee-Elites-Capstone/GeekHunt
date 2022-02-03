import React, { useRef, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useCollection } from '../../hooks/useCollection'
import { sendMessage } from '../../hooks/useSendMessage' 

const firestore = firebase.firestore();


function singleChatMessage (props) {
    const { text, recepientId, senderId } = props.message
    
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
    
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    
    const [formValue, setFormValue] = useState('');
    
    const { documents, error } = useCollection('messages');
    
    return (
        <div>
            <h1>Messages</h1>
            {documents.length === 0 && <p>No messages yet!</p>}
            {documents.map(msg => <singleChatMessage key={msg.id} message={msg} />)}
        <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
            <button type="submit" disabled={!formValue}>️SEND</button>
        </form>
        </div>
    )
}