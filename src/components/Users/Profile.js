import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

const EditProfile = () => {

  const { user } = useAuthContext();
  const { document, error } = useDocument('users', user.uid);


if(!document) {
  return (<div>"loader bar here "</div>)
}


  return (
    <div className="flex bg-gray-100 h-full justify-center w-screen pt-20">
      <div className="flex flex-col sm:flex-col w-5/6 h-screen justify-center">
        <div className=" flex flex-col sm:flex-row w-full h-80">

          <div className="bg-purple-400 flex flex-col justify-center items-center w-full sm:w-1/3  h-full rounded-lg">
            <img
              src={document.photoURL}
              className="rounded-full w-32 shadow-lg"
              alt="Avatar"
            />
            <p>{document.displayName}</p>
            <p>{document.jobTitle}</p>
            <p>{document.email}</p>

              <Link className="sm:w-3/4  rounded-lg px-3 py-1 my-2 md:ml-5 sm:ml-5 bg-purple-300 md:pl-20" to={`/editprofile/${user.uid}`}>Edit Profile
              </Link>
          </div>
          <Link to="/dashboard" className="h-10 w-full sm:w-1/4 rounded-lg px-3 my-2 md:ml-5 sm:ml-5 bg-pink-500">
            <button className="h-10 w-full text-white">
              Dashboard
            </button>
          </Link>

        </div>
        <div className="flex flex-col rounded-lg  md:flex-rows w-full h-60 bg-green-200 mt-2 p-4">

          <h2>Description</h2>
          <p
            type="text"
            className="
              rounded-lg m-2
              h-full
              w-full
              px-3
              py-1.5
              text-base
              font-normal"
          >
            {document.description}
          </p>
        </div>

        <div className="flex flex-col rounded-lg  md:flex-rows w-full h-60 bg-yellow-200 mt-2 p-4">

          <h2>Skills</h2>
          <p
            type="text"
            className="rounded-lg m-2
              w-full
              h-full
              px-3
              py-1.5
              text-base
              font-normal"
          >
            {document.skills}
          </p>
        </div>
      </div>
    </div>
  );
}


export default EditProfile;
