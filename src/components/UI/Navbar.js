import React from "react";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSignout } from "../../hooks/useSignout";


function Navbar() {
  const { signout, isPending } = useSignout();
  const { user } = useAuthContext();
  const id = user ? user.uid : 'JPiu2ngrV2fdaLl6zkX7YuvV4413'
  const { document } = useDocument('users', id);
  

  return (
    <nav className="flex items-center justify-between flex-wrap h-32 bg-[#2E4C6D] ">
      <div className="mb-2 px-3 sm:mb-0">
        <img className="sm:object-fill w-52 self-center" src="./Geek Hunt-logos_white.png" alt='' />
      </div>
      <div className="absolute inset-y-0 right-0 px-3 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {!user && (
          <>
            <a
              href="/landing"
              className="text-xl no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Home
            </a>
            <a
              href="/fetchProfiles"
              className="text-xl no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Profiles
            </a>
            <a
              href="/signin"
              className="text-xl no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="text-xl no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Sign Up
            </a>
          </>
        )}
        {user && (
          <div className="px-3">
            {user.displayName ? (
              <p className="text-xl no-underline
              text-white">Hello, {user.displayName}!</p>
            ) : (
              <p className="text-xl no-underline
              text-white" > Hello!</p>
            )}
            <a
              href="/landing"
              className="text-xl no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Home
            </a>
            { document && document.isAGeek  && (
            <a
              href="/dashboard"
              className="text-xl no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Dashboard
            </a>
            )}
            <a
              href="/fetchProfiles"
              className="text-xl no-underline
            text-white hover:text-blue-dark ml-2"
            >
              {console.log('user.isAGeek',document)}
              Profiles
            </a>
            { document && document.isAGeek && (
            <a
              href={`/profile/${user.uid}`}
              className="text-xl no-underline
            text-white hover:text-blue-dark ml-2"
            >
              My Profile
            </a>
            )}
            {!isPending && (
              <button
                className="text-xl no-underline text-white hover:text-blue-dark ml-2"
                onClick={signout}
              >
                Sign Out
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Logging out...
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
