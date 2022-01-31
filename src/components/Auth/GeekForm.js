import React, { useState } from 'react';
import { useGeekForm } from '../../hooks/useGeekForm'; //make hook later

function GeekForm () {
    const [description, setDescription] = useState('')
    const [skills, setSkills] = useState([])
    const [linkedInUrl, setLinkedInUrl] = useState('')
    const [gitHubUrl, setGitHubUrl] = useState('')
    
    const { signup, isPending, error } = useGeekForm()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        //useGeekForm(description, skills, linkedInUrl, gitHubUrl);
    }
    
    return (<div>
        <div className="h-screen bg-grey flex flex-col space-y-10 justify-center items-center">
         <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
             Account Information
            </div>
            <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              v-model="form.description"
              type="description"
              required
              autoFocus
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          
          <div className="flex items-center justify-between">
            {!isPending && <button
              className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
              type="submit"
            >
              Sign Up
            </button>}
            {isPending && <button
              className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
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
        </div>
    </div>)
}

export default GeekForm;