import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import Avatar from '../UI/Avatar';
import Navbar from '../UI/Navbar';


export default function FetchProfiles() {
  const { isPending, error, documents } = useCollection('users')
  console.log('***documents***', documents)

  return (
      <>
      <Navbar/>
      <h1 className="flex justify-center mx-auto pt-36 text-3xl underline font-mono">Profiles</h1>
      <div className="flex justify-center mx-auto p-4 w-full">
      {isPending && <div>Loading users...</div>}
      {error && <div>{error}</div>}
      <div className="flex flex-wrap block rounded-lg shadow-lg bg-white max-w-sm text-center">
      {documents && documents.map(user => (
        <div key={user.id} className="py-3 px-6 border-b border-gray-300">
          <div>{user.displayName}</div>
          <div>{user.lastName}</div>
          <div>{user.jobTitle}</div>
          <div>{user.skills}</div>
          <Avatar src={user.photoURL} />
        </div>
      ))}
      </div>
    </div>
    </>
  )
}

