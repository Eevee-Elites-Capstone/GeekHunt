import React from 'react';
import { useSignup } from '../../hooks/useSignup';



function HunterForm() {
  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    //signup(email, password, displayName, lastName);
  }

  return (
    <div className="h-screen bg-grey flex flex-col space-y-10 justify-center items-center">
      <h1 className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">Hunter Form</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
      <button className="px-4 py-2 rounded text-white inline-block shadow-lg bg-purple-500 hover:bg-blue-600 focus:bg-blue-700">Personal</button>
      <h1>Or</h1>
      <button className="px-4 py-2 rounded text-white inline-block shadow-lg bg-green-500 hover:bg-blue-600 focus:bg-blue-700">Company</button>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="name"
        placeholder="Company Name" />
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="name"
        placeholder="Location" />
        {/* <button className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700">Done</button> */}
        <div className="flex items-center justify-between">
            {!isPending && <button
              // className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
              type="submit"
            >
              Sign Up
            </button>}
            {isPending && <button
              // className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
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
    </div>
   );
}

export default HunterForm;
