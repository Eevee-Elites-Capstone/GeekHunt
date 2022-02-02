import React from "react";


const EditProfile = () => {
  return (
    <div className="flex bg-gray-100 h-full justify-center w-screen pt-20">
      <div className="flex flex-col sm:flex-col w-5/6 h-screen justify-center">

        <div className="w-full md:w-2/5 h-80">
          <div className="flex flex-col justify-center items-center w-2/6 h-full bg-purple-400 rounded-lg">

            <img
  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
  class="rounded-full w-32 shadow-lg"
  alt="Avatar"
/>

            <p>Username</p>
            <p>Job Title</p>
            <button>Edit</button>
          </div>
        </div>

        <div className="flex md:flex-col w-full h-60 bg-green-200 mt-2 p-4">
          <h2>Description</h2>
          <textarea type="text" class="rounded-lg m-2 w-1/2
        px-3
        py-1.5
        text-base
        font-normal" placeholder="Enter some text..."></textarea>
          <button>Edit</button>
        </div>

        <div className="flex w-full h-60 bg-yellow-200 my-2 p-4">
          <h2>Skills</h2>
          <textarea type="text" class="rounded-lg m-2 w-1/2
        px-3
        py-1.5
        text-base
        font-normal" placeholder="Enter some text..."></textarea>
          <button>Edit</button>
        </div>


      </div>
    </div>
  );
}


export default EditProfile;
