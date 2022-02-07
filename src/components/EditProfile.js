import React, {useEffect, useState} from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { useDocument } from "../hooks/useDocument";
import { Link } from "react-router-dom";
const EditProfile = () => {

  const { user } = useAuthContext();
  const { document, error } = useDocument('users', user.uid);
  const [userInfo, setUserInfo ] = useState({
    name: "",
    jobTitle: "",
    email: "",
    description: "",
    skills: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    setUserInfo({
      name: "",
    jobTitle: "",
    email: "",
    description: "",
    skills: ""
    })
  }
if(!document) {
  return (<div>"loader bar here "</div>)
} else {
  console.log("****done")
}
  return (
    <div className="bg-blue-900 py-32 px-10 min-h-screen">
      <div className="bg-gray-200 rounded-lg p-10 md:w-3/4 lg:w-1/2 mx-auto">
        <div className="w-full  sm:text-right">
          <Link to="/profile">
            <button className="h-10 w-full sm:w-1/3 rounded-lg px-2 my-2  bg-green-300">
              Back to Profile
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="h-10 w-full sm:w-1/3 rounded-lg px-3 my-2 md:ml-5 sm:ml-5 bg-pink-500">
              Dashboard
            </button>
          </Link>
        </div>
        <img
          src={document.photoURL}
          className="rounded-full w-32 shadow-lg"
          alt="Avatar"
        />
        <form action="submit" onSubmit={handleSubmit}>
          <div className="flex items-center mb-5">
            <label
              for="photo"
              className="inline-block w-20 mr-6 text-right
                           font-bold text-gray-600"
            >
              Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              placeholder="photo"
              className="flex-1 py-2  border-gray-400 focus:border-green-400
                text-gray-600 placeholder-gray-400
                outline-none"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="name"
              className="inline-block w-20 mr-6 text-right
                           font-bold text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400
                text-gray-600 placeholder-gray-400
                outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="lastName"
              className="inline-block w-20 mr-6 text-right
                           font-bold text-gray-600"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400
                text-gray-600 placeholder-gray-400
                outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="email"
              className="inline-block w-20 mr-6 text-right
                           font-bold text-gray-600"
            >
              email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400
                text-gray-600 placeholder-gray-400
                outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="password"
              className="inline-block w-20 mr-6 text-right font-bold text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="password"
              className="inline-block w-20 mr-6 text-right font-bold text-gray-600"
            >
              Job Title
            </label>
            <input
              type="jobTitle"
              id="jobTitle"
              name="jobTitle"
              placeholder="Job Title"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="skills"
              className="inline-block w-20 mr-6 text-right font-bold text-gray-600"
            >
              Skill
            </label>
            <textarea
              type="text"
              id="skills"
              name="skills"
              placeholder="skills"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none px-2"
            />
          </div>

          <div className="text-right">
            <button className="py-3 px-8 bg-blue-700 text-white ">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
