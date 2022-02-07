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
    <div className="flex bg-white h-full justify-center w-screen pt-20">
      <div className="flex flex-col sm:flex-col w-5/6 h-screen justify-center">
        <div className=" flex flex-col w-full h-40">
        <h1 className="text-2xl">{document.jobTitle}</h1>
          <div className="flex  justify-left items-center w-full  h-full rounded-lg">
            <img
              src={document.photoURL}
              className="rounded-full w-16 shadow-lg mr-2"
              alt="Avatar"
            />
             <p>{document.displayName}</p>
          </div>
          <Link to="/" className="h-10 w-full sm:w-1/4 rounded-lg px-3 my-2 md:ml-80 sm:ml-5 bg-[#396EB0]">
            <button className="h-10 w-full text-white">
              Contact this Geek
            </button>
          </Link>
        </div>
        <div className="flex flex-col rounded-sm  md:flex-rows w-full h-80 border-2 border-[#396EB0] mt-2 p-4">

<h2 className="text-xl">Past Projects</h2>
  <div className="flex flex-col  rounded-ms  md:flex-rows w-full h-80 bg-[#DADDFC] mt-2 p-4">
    <p>images or list of past projects / portfolio here</p>
  </div>
</div>

        <div className="flex flex-col rounded-sm  md:flex-rows w-full h-60 border-2 border-[#396EB0] mt-2 p-4">

          <h2>About this Geek</h2>
          <div className="flex flex-col rounded-lg  md:flex-rows w-full h-80  mt-2 p-4">
            {document.description}
          </div>
        </div>

        <div className="flex flex-col rounded-sm border-2 border-[#396EB0]  md:flex-rows w-full h-60  mt-2 p-4">

          <h2>Skills</h2>
          <div className="flex flex-col rounded-sm md:flex-rows w-full h-80  mt-2 p-4">
            <ul>
            {document.skills.map((skill) => {
              return (
              <li>{skill}</li>
              )
            })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


export default EditProfile;
