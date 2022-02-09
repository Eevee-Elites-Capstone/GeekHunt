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
      alert("YOU MUST SIGN IN");
    } else {
      setForm();
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
    <div>
      <Navbar />
      <div className="flex flex-col bg-white h-full justify-center w-screen pt-40">
        <div className="flex flex-col w-5/6  justify-center text-[#2E4C6D] tracking-tight">
          <div className=" flex flex-col w-full align-content:center ">
            <h1 className="mb-2 text-2xl font-bold tracking-tight">
              {document.jobTitle}
            </h1>
            <div className="flex  justify-left items-center w-full  h-full rounded-lg">
              <img
                src={document.photoURL}
                className="rounded-full w-16 shadow-lg mr-2"
                alt="Avatar"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {document.displayName} {document.lastName}
              </p>
            </div>

              <div className="flex flex-col  fw-1/2 py-10 rounded-lg shadow-lg border-5">
                <h2>Contact this Geek</h2>
                {user && (
                  <form
                    className="w-1/3 flex-col "
                    onSubmit={handleSubmit}
                  >
                    <input
                      onChange={(e) => setNewTitle(e.target.value)}
                      value={newTitle}
                      placeholder="Title"
                    />

                    <textarea
                      required
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                      placeholder="First Message"
                    />
                    <button type="submit">️SEND</button>
                  </form>
                )}
              </div>

          </div>

        </div>
        <div className="flex flex-col rounded-xl  md:flex-rows w-full h-80  border-[#396EB0] mt-2 p-4 shadow-lg">
            <h2 className="text-xl">Past Projects</h2>
            <div className="flex flex-col  rounded-ms  md:flex-rows w-full h-80 bg-[#DADDFC] mt-2 p-4">
              <p>images or list of past projects / portfolio here</p>
            </div>
          </div>

          <div className="flex flex-col rounded-xl  md:flex-rows w-full h-60 shadow-lg  mt-2 p-4">
            <h2>About this Geek</h2>
            <div className="flex flex-col rounded-lg  md:flex-rows w-full h-80  mt-2 p-4">
              {document.description}
            </div>
          </div>

          <div className="flex flex-col rounded-xl shadow-lg  md:flex-rows w-full h-60  mt-2 p-4">
            <h2>Skills</h2>
            <p
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
};

export default PublicProfile;
