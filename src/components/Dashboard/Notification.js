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
  return (<>
    <div className="w-64 flex flex-col rounded-md shadow-lg bg-neutral-300">
      <div className="font-bold p-2">Notifications</div>
      {/* <ul className="notifications"> */}
      {user.uid && !documents && <p className="justify-center items-center">No notifications to show</p>}
      {user.uid && documents && documents.map(noti => (
        <div className="flex flex-col p-1 w-auto bg-green-200" key={noti.id}>
          <p className="text-xs font-bold">{noti.user}</p>
          <p className="text-xs">{noti.content}</p>
          <p className="text-xs ml-48">
            {moment(noti.time.toDate()).fromNow()}
          </p>
        </div>
      ))}
      {/* </ul> */}
    </div>
  </>);
}

export default Notification;
