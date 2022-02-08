import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSignout } from "../../hooks/useSignout";
//import { MenuItems } from './MenuItem'

function Navbar() {
  const { signout, isPending } = useSignout();
  const { user } = useAuthContext();

  return (
    <nav className="font-sans flex fixed text-center sm:flex-row sm:text-left
    sm:justify-between pt-1 px-6 bg-white shadow sm:items-baseline w-full bg-[#2E4C6D] text-gray-200 tracking-tight">
      <div className="mb-2 sm:mb-0">
        <a
          href="/"
          className="text-4xl no-underline font-bold text-grey-darkest hover:text-blue-dark ml-10"
        >
          GeekHunt
        </a>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {!user && (
          <>
            <a
              href="/landing"
              className="text-lg no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Home
            </a>
            <a
              href="/fetchProfiles"
              className="text-lg no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Profiles
            </a>
            <a
              href="/signin"
              className="text-lg no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="text-lg no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Sign Up
            </a>
          </>
        )}
        {user && (
          <div className="">
            {user.displayName ? (
              <p className="text-md no-underline
              text-white">Hello, {user.displayName}!</p>
            ) : (
              <p className="text-md no-underline
              text-white" > Hello!</p>
            )}
            <a
              href="/landing"
              className="text-lg no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Home
            </a>
            <a
              href="/dashboard"
              className="text-lg no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Dashboard
            </a>
            <a
              href="/fetchProfiles"
              className="text-lg no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Profiles
            </a>
            { !user.isAGeek && (
            <a
              href={`/profile/${user.uid}`}
              className="text-lg no-underline
            text-white hover:text-blue-dark ml-2"
            >
              My Profile
            </a>
            )}
            {!isPending && (
              <button
                className="text-lg no-underline text-white hover:text-blue-dark ml-2"
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
