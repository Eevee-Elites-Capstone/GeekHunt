import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSignout } from "../../hooks/useSignout";
//import { MenuItems } from './MenuItem'

function Navbar() {
  const { signout, isPending } = useSignout();
  const { user } = useAuthContext();

  return (
    <nav className="font-sans flex fixed text-center sm:flex-row sm:text-left
    sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <a
          href="/"
          className="text-6xl no-underline font-bold text-grey-darkest hover:text-blue-dark"
        >
          GeekHunt
        </a>
      </div>
      <div>
        {!user && (
          <>
            <a
              href="/landing"
              className="text-lg no-underline
            text-grey-darkest hover:text-blue-dark ml-2"
            >
              Home
            </a>
            <a
              href="/fetchProfiles"
              className="text-lg no-underline
            text-grey-darkest hover:text-blue-dark ml-2"
            >
              Profiles
            </a>
            <a
              href="/signin"
              className="text-lg no-underline
            text-grey-darkest hover:text-blue-dark ml-2"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="text-lg no-underline
            text-grey-darkest hover:text-blue-dark ml-2"
            >
              Sign Up
            </a>
          </>
        )}
        {user && (
          <>
            {user.displayName ? (
              <p>Hello, {user.displayName}!</p>
            ) : (
              <p>Hello!</p>
            )}
            <a
              href="/landing"
              className="text-lg no-underline
            text-grey-darkest hover:text-blue-dark ml-2"
            >
              Home
            </a>
            <a
              href="/dashboard"
              className="text-lg no-underline
            text-grey-darkest hover:text-blue-dark ml-2"
            >
              Dashboard
            </a>
            <a
              href="/fetchProfiles"
              className="text-lg no-underline
            text-grey-darkest hover:text-blue-dark ml-2"
            >
              Profiles
            </a>
            <a
              href={`/profile/${user.uid}`}
              className="text-lg no-underline
            text-grey-darkest hover:text-blue-dark ml-2"
            >
              My Profile
            </a>
            {!isPending && (
              <button
                className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
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
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
