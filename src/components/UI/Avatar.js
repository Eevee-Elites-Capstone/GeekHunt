import React from 'react';
// styles
import './Avatar.css'
function Avatar({ src }) {
  return (
    <div className="avatar">
    {src && <img src={src} alt="" />}
    {!src && <img src='./default.png' alt="default"/>}
    </div>
  );
}

export default Avatar;
