import firebase from '../firebase/fbConfig';
import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/fbConfig'
import { useAuthContext } from './useAuthContext'

const auth = firebase.auth();
const firestore = firebase.firestore();

const SEND_MESSAGE = 'SEND_MESSAGE'

export const useSendMessage = () => {
    
    const { dispatch } = useAuthContext()
    
    const sendMessage = async (message, recipientUserId) => {
        try {
            const messagesRef = firestore.collection('messages');
            const { uid } = auth.currentUser;
            console.log('THE USER ID: ', uid)
            
            await messagesRef.add({
                text: message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                recepientId: recipientUserId,
                senderId: uid
            })
            
        } catch (err) {
            console.log('ERROR INSIDE sendMessage Hook: ', err)
        }
        
    }
}