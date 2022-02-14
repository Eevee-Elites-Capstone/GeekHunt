import { firebase, projectFirestore, timestamp } from '../../firebase/fbConfig';
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useAllConversations } from '../../hooks/useAllConversations'
import { Link } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar"


export default function AllConversations() {
  const { user } = useAuthContext()
  const { selectedConvo, convoError } = useAllConversations(user.uid)

  if (convoError) {
    return <div className="error">{convoError}</div>
  }
  else if (!selectedConvo) {
    return <div className="loading">Loading...</div>
  }
  else {

    return (
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-auto bg-white-200 justify-center">
          <div className="bg-blue-100 h-screen w-3/4 shadow-xl rounded-xl flex-col m-6 overflow overflow-auto resize">
            <div className="flex flex-col ml-8 p-6 justify-between">
              <h3 className="text-3xl font-bold "> All Conversations </h3>
              {selectedConvo.map(conv => (
                <Link to={`/conversations/${conv.id}`} key={conv.id}>
                  <div class="p-2" key={conv.id}>
                    <div class="inline-flex items-center bg-white leading-none text-purple-600 rounded-full p-2 shadow text-teal text-sm w-5/6">
                      <span class="inline-flex bg-blue-600 text-white rounded-full h-6 px-3 justify-center items-center">{conv.title} with {conv.userNames.find(elem => elem !== user.displayName)}</span>
                      <span class="inline-flex px-2">{conv.messages.at(-1).message}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          {/* <SingleConversation /> */}
          </div>
        </div>
      </div>
    )
  }
}
