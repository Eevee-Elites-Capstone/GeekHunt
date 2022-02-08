import React, {useEffect, useState} from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore"
import { useDocument } from "../../hooks/useDocument";
import { Link } from "react-router-dom";


const EditProfile = () => {

  const { user } = useAuthContext();
  const { document, error } = useDocument('users', user.uid);
  const [userInfo, setUserInfo ] = useState(document)
 console.log("DOCUMENT ", document)
  const { deleteDocument, updateDocument } = useFirestore('users')


    useEffect(() => {
      setUserInfo(document)
    }, [document])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(updateDocument)
    updateDocument(user.uid, userInfo)
  }
  const handleChange = (e) => {
    setUserInfo({...document, [e.target.name]: e.target.value})
  }

  const deleteAccount = () => {
    deleteDocument(user.uid);
  }
console.log("userInfo", userInfo)

if(!document) {
  return (<div>"loader bar here "</div>)
} else {

}


  return (
    <div className="bg-blue-900 py-32 px-10 min-h-screen">
      <div className="bg-gray-200 rounded-lg p-10 md:w-3/4 lg:w-1/2 mx-auto">
        <div className="w-full  sm:text-right">
          <Link to={`/profile/${user.uid}`}>
            <button className="h-10 w-full sm:w-1/3 rounded-lg px-2 my-2  bg-green-300">
              Back to Profile
            </button>
          </Link>
          <Link to={`/dashboard/${user.uid}`}>
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
        <form action="submit" onSubmit={handleSubmit} onChange={handleChange}>
          <div className="flex items-center mb-5">
            <label
              for="photoURL"
              class="inline-block w-20 mr-6 text-right
                           font-bold text-gray-600"
            >
              Photo
            </label>
            <input
              type="file"
              id="URL"
              name="photoURL"
              placeholder="photo"
              className="flex-1 py-2  border-gray-400 focus:border-green-400
                text-gray-600 placeholder-gray-400
                outline-none"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="displayName"
              class="inline-block w-20 mr-6 text-right
                           font-bold text-gray-600"
            >
              Name
            </label>

            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder="Name"
              defaultValue={document.displayName}
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400
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
              defaultValue={document.lastName}
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400
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
              defaultValue={document.email}
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400
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
              // defaultValue={document}
              placeholder="password"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="jobTitle"
              className="inline-block w-20 mr-6 text-right font-bold text-gray-600"
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              defaultValue={document.jobTitle}
              placeholder="Job Title"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="skills"
              class="inline-block w-20 mr-6 text-right font-bold text-gray-600"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="description"
              defaultValue={document.description}
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 h-40 placeholder-gray-400 outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="skills"
              className="inline-block w-20 mr-6 text-right font-bold text-gray-600"
            >
              Skills
            </label>
            <textarea
              type="text"
              id="skills"
              name="skills"
              placeholder="skills"
              defaultValue={document.skills}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none px-2 h-40 "
            />
          </div>

          <div className="text-right">

            <button className="py-3 px-8 bg-blue-700 text-white w-full">
              Update
            </button>
          </div>
        </form>
        <button onClick={() => deleteAccount()} class="py-3 px-8 bg-red-600 text-white w-full mt-7">
              Delete Account
            </button>
      </div>
    </div>
  );
}

export default EditProfile;
