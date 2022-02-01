import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //displayName is a default value from firebase
  const [displayName, setDisplayName] = useState('')
  /* Need to upgrade to punch in FirstName and LastName fields */

  /**implement useSignup Custom Hook */
  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName);
  }
  return (<div>
    <div className="h-screen bg-grey flex flex-col space-y-10 justify-center items-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
          {/* <!-- @csrf --> */}
          <div
            className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
          >
            Sign Up
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              v-model="form.name"
              type="name"
              required
              autoFocus
              placeholder="Name"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
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
            {!isPending && <button
              className=""
              type="submit"
            >
              Sign Up
            </button>}
            {isPending && <button
              className=""
              disabled
            >Loading...</button>}
            {error && <p>{error}</p>}
            <p
              className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Sign Up with Google
            </p>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Geek Hunt. All rights reserved.
        </p>
      </div>
    </div>
  </div>);
}

export default SignUp;
