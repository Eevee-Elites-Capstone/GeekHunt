import React from 'react';
function Avatar({ src }) {
  return ( <div className="inline-block object-cover w-12 h-12 rounded-full">
    <img src={src} alt=""/>
    <span className="absolute bottom-0 right-0 inline-block w-3 h-3 bg-green-600 border-2 border-white rounded-full"></span>
  </div> );
}

export default Avatar;
