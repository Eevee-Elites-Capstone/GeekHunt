import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link, useParams, useHistory } from "react-router-dom";
import Navbar from "../UI/Navbar";
import { projectFirestore, timestamp } from "../../firebase/fbConfig";

const PublicProfile = () => {
  const { id } = useParams();
  let history = useHistory();
  const { user } = useAuthContext();
  const { document, error } = useDocument("users", id);
  const [form, setForm] = useState("");

  const [newMessage, setNewMessage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const conversationsRef = projectFirestore.collection("conversations");

  const handleClick = (e) => {
    if (!user) {
      alert("You must create an account to contact this Geek");
      history.push("/signin")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const conversationToCreate = {
      users: [id, user.uid],
      messages: [newMessage],
      createdAt: timestamp.fromDate(new Date()),
      updatedAt: timestamp.fromDate(new Date()),
      title: newTitle,
    };
    await conversationsRef.add(conversationToCreate);
    history.push("/allconversations")
  };

  if (!document) {
    return <div>"loader bar here "</div>;
  }

  return (
    <div className="bg-green-200 ">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-auto flex-col h-screen w-3/4 bg-slate-100 p-16 ">
          <div className="flex flex-col  justify-center text-[#2E4C6D] tracking-tight rounded-xl shadow-lg bg-white ">
            <div className="flex flex-row w-full align-content:center px-16 justify-between">
            <div className="flex flex-col">
              <h1 className="mb-2 mt-2 text-5xl font-bold tracking-tight">
                {document.jobTitle}
              </h1>
              <div className="flex justify-left items-center rounded-lg ">
                <img
                  src={document.photoURL}
                  className="rounded-full w-24 shadow-lg mr-2"
                  alt="Avatar"
                />
                <p className="text-2xl font-medium text-gray-500 dark:text-gray-400">
                  {document.displayName} {document.lastName}
                </p>
                </div>
              </div>

              <div className="flex flex-col fw-1/2 mt-4 mb-4 rounded-lg shadow-lg border-5 bg-blue-50  w-1/3">
                <div className="flex flex-col p-4">
                  <h2 className="font-medium mb-4">Contact this Geek</h2>
                  {user ?(
                    <form
                      className="w-fullflex flex-col "
                      onSubmit={handleSubmit}
                    >
                      <input
                        className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 font-mono font-light text-gray-600 dark:text-gray-400 mb-6"
                        onChange={(e) => setNewTitle(e.target.value)}
                        value={newTitle}
                        placeholder="Title"
                      />

                      <textarea
                        className="border  border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 font-mono font-light text-gray-600 dark:text-gray-400 mb-6"
                        required
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        placeholder="First Message"
                      />
                      <button type="submit" className="h-10 w-full sm:w-1/3 rounded-lg px-3 my-2 md:ml-5 sm:ml-5 text-white bg-[#396EB0]">️SEND</button>
                    </form>
                  ) :<button className="h-10 w-full  rounded-lg px-3 text-white bg-[#396EB0]" onClick={handleClick}>Contact this geek</button>}
                </div>
              </div>
            </div>

          </div>
          <div className="flex flex-col rounded-xl  md:flex-rows w-full h-80  border-[#396EB0] mt-2 p-4 shadow-lg bg-white">
            <h2 className="text-xl font-bold">Past Projects</h2>
            <div className="flex flex-col rounded-md  md:flex-rows w-full h-80 bg-[#DADDFC] mt-2 p-4">
              <p>images or list of past projects / portfolio here</p>
            </div>
          </div>

          <div className="flex flex-col rounded-xl  md:flex-rows w-full h-60 shadow-lg  mt-2 p-4 bg-white">
            <h2 className="text-xl font-bold">About this Geek</h2>
            <div className="flex flex-col rounded-lg  md:flex-rows w-full h-80  mt-2 p-4">
              {document.description}
            </div>
          </div>

          <div className="flex flex-col rounded-xl shadow-lg  md:flex-rows w-full h-60  mt-2 p-4 bg-white">
            <h2 className="text-xl font-bold">Skills</h2>
            <p
              className="rounded-lg m-2
              w-full
              h-full
              py-1.5
              text-base
              font-normal

              "
            >
              {document.skills}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
