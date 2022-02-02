import React, { useRef, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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