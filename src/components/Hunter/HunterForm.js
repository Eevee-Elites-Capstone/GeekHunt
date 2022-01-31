import React from 'react';
function HunterForm() {
  return (
    <div className="h-screen bg-grey flex flex-col space-y-10 justify-center items-center">
      <h1 className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">Hunter Form</h1>
      <form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
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
        <button className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700">Done</button>
      </form>
    </div>
   );
}

export default HunterForm;
