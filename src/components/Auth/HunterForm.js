import React, { useState } from "react";
import { useHunterSignup } from "../../hooks/useHunterSignup";

function HunterForm({ email, password, displayName, lastName }) {
  const { signup, isPending, error } = useHunterSignup();
  const [PersonalOrCompany, setFormType] = useState("");

  const onFormTypeSelect = (type) => {
    return (e) => {
      e.preventDefault();
      setFormType(type);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, lastName, PersonalOrCompany);
  };

  return (
    <div className="bg-grey flex flex-col space-y-10 justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded pt-6 pb-8 mb-4"
      >

        <button
          className="px-4 py-2 rounded text-white inline-block 
        shadow-lg bg-purple-500 hover:bg-blue-600 focus:bg-blue-700"
          onClick={onFormTypeSelect("Personal")}
        >
          Personal
        </button>
        <h1>Or</h1>
        <button
          className="px-4 py-2 rounded text-white inline-block 
        shadow-lg bg-green-500 hover:bg-blue-600 focus:bg-blue-700"
          onClick={onFormTypeSelect("Company")}
        >
          Company
        </button>
        <input
          className="shadow appearance-none border rounded w-full 
          py-2 px-3 text-gray-700 leading-tight focus:outline-none 
          focus:shadow-outline"
          type="name"
          placeholder="Company Name"
        />
        <input
          className="shadow appearance-none border rounded w-full
           py-2 px-3 text-gray-700 leading-tight focus:outline-none 
           focus:shadow-outline"
          type="name"
          placeholder="Location"
        />
        <div className="flex items-center justify-between">
          {!isPending && (
            <button
              className="px-4 py-2 rounded text-white inline-block
              shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
              type="submit"
            >
              Sign Up
            </button>
          )}
          {isPending && (
            <button
              className="px-4 py-2 rounded text-white inline-block 
              shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
              disabled
            >
              Loading...
            </button>
          )}
          {error && <p>{error}</p>}
          <p
            className="inline-block align-baseline font-normal 
            text-sm text-blue-500 hover:text-blue-800"
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
  );
}

export default HunterForm;
