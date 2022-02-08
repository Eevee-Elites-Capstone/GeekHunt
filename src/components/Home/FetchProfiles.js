import React from "react";
import { useCollection } from "../../hooks/useCollection";
import Navbar from "../UI/Navbar";

export default function FetchProfiles() {
  const { isPending, error, documents } = useCollection("users");

  return (
    <>
      <Navbar />
      <h1 className="flex justify-center mx-auto pt-36 text-5xl font-bold">
        Geeks
      </h1>
      <div className="grid grid-cols-3 mx-4 justify-evenly">
        {isPending && <div>Loading users...</div>}
        {error && <div>{error}</div>}
        {documents &&
          documents.map((user) => (
            <div
              key={user.id}
              className="bg-white font-semibold text-center ml-16 mb-12
                rounded-3xl border shadow-lg p-10 max-w-xs mt-5 bg-[#DADDFC]"
            >
              <div className="container mx-auto inline-block object-cover w-36 h-36">
                <img className="object-contain hover:object-scale-down rounded-full" src={user.photoURL} alt="" />
              </div>
              <div className="text-2xl text-gray-700">
                {user.displayName} {user.lastName}
              </div>
              <div className="text-xl text-gray-400 ">{user.jobTitle}</div>
              <div>
                <p className="text-[#FC997C] text-lg font-bold">Skills</p>
                <ul className="container mx-auto grid grid-cols-2 gap-1 mb-6 text-lg">
                  {user.skills &&
                    user.skills.map &&
                    user.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
              <a
                className="bg-[#2E4C6D] px-8 py-2 rounded-3xl text-gray-100
                  font-semibold tracking-wide text-sm"
                href={`/publicprofile/${user.id}`}
              >
                See My Profile
              </a>
            </div>
          ))}
      </div>
    </>
  );
}
