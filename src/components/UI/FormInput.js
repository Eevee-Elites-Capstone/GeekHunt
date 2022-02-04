import React from "react";

function FormInput({ onChange, value, placeholder, required }) {
  return (
    <input
      className="shadow appearance-none border rounded
                w-full py-2 px-3 text-gray-700 leading-tight 
                focus:outline-none focus:shadow-outline"
      autoFocus
      required={required}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default FormInput;
