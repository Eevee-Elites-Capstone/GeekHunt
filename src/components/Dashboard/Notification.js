import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
import moment from 'moment';

function Notification() {
  // console.log('notifications', notifications);
   /**Add project collection to firestore */
  const { addDocument, response } = useFirestore('notifications')
  /*Assign function*/
  const { documents, error } = useCollection('notifications')
  const { user } = useAuthContext()
  console.log('documents', documents);
  console.log('user', user);
  return ( <>
    <div className="notification-container">
      <h1>Notifications</h1>
      <ul className="notifications">
      {user.uid && !documents && <li>No notifications to show</li>}
      {user.uid && documents && documents.map(noti => (
        <li className="bg-yellow-400" key={noti.id}>
        <span>{noti.user}</span>
        <span>{noti.details}</span>
        <div className="moment-from-now">
        {moment(noti.time.toDate()).fromNow()}

        </div>
        </li>
      ))}
      </ul>
    </div>
  </> );
}

export default Notification;
