import React, { useState } from "react";
// import { useSignup } from "../../hooks/useSignup";
import GeekForm from "./GeekForm";
import HunterForm from "./HunterForm";
import Navbar from "../UI/Navbar";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //displayName is a default value from firebase
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [picture, setPicture] = useState(null)
  const [pictureError, setPictureError] = useState(null)
  const [displayName, setDisplayName] = useState("");
  /* Need to upgrade to punch in FirstName and LastName fields */
  const [formType, setFormType] = useState("");
  const onFormTypeSelect = (type) => {
    return (e) => {
      e.preventDefault();
      setFormType(type);
    };
  };

  return (
    <div>

      <Navbar />
      <div className="h-screen bg-grey flex flex-col space-y-10 justify-center items-center">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
              Sign Up
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="name"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="first Name"
                v-model="form.name"
                type="first name"
                required
                autoFocus
                placeholder="First Name"
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="name"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="last Name"
                v-model="form.name"
                type="last name"
                required
                autoFocus
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                v-model="form.email"
                type="email"
                required
                autoFocus
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                v-model="form.password"
                type="password"
                placeholder="Password"
                name="password"
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                onClick={onFormTypeSelect("geek")}
              >
                Are you a Geek?
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                onClick={onFormTypeSelect("hunter")}
              >
                Are you a Hunter?
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {formType === "hunter" && (
          <HunterForm
            email={email}
            password={password}
            displayName={displayName}
            lastName={lastName}
          />
        )}
        {formType === "geek" && (
          <GeekForm
            email={email}
            password={password}
            displayName={displayName}
            lastName={lastName}
          />
        )}
      </div>
    </div>
  );
}

export default SignUp;
