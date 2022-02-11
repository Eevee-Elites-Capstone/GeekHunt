import React from "react";
import { useHistory } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSignout } from "../../hooks/useSignout";

function Navbar() {
  const { signout, isPending } = useSignout();
  const { user } = useAuthContext();
  const id = user ? user.uid : undefined;
  const { document } = useDocument("users", id);
  const history = useHistory();

  function handleLogout() {
    signout();
    history.push("/signin");
  }

  return (
    <nav className="bg-[#2E4C6D] text-white">
      <div className=" flex flex-row justify-between max-w-6xl mx-auto px-4">
      <div class="flex justify-center w-1/4 md:w-1/6 ">
        <div class="flex items-center py-4 px-2">
        <a href="/" className="flex">
          <img
            alt="Logo" className="mr-2"
            src="./Geek Hunt-logos_white.png"
          />
        </a>
        </div>
      </div>
      <div class="hidden md:flex items-center space-x-1">
        {!user && (
          <div class="hidden md:flex items-center space-x-1">
            <a
              href="/landing"
              className="py-4 px-2 hover:text-[#FC997C] font-semibold"
            >
              Home
            </a>
            <a
              href="/fetchProfiles"
              className="py-4 px-2 font-semibold hover:text-[#FC997C] transition duration-300"
            >
              Profiles
            </a>
            <a
              href="/signin"
              className="py-4 px-2 font-semibold hover:text-[#FC997C] transition duration-300"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="py-4 px-2 font-semibold hover:text-[#FC997C] transition duration-300"
            >
              Sign Up
            </a>
          </div>
        )}
        {user && (
          <div className="px-3 w-full">
            {user.displayName ? (
              <p
                className="py-4 px-2 font-semibold no-underline
              text-white text-right"
              >
                Hello!, {user.displayName}!
              </p>
            ) : (
              <p
                className="py-4 px-2 font-semibold hover:text-[#FC997C] transition duration-300"
              >
                Hello!,
              </p>
            )}
            <a
              href="/landing"
              className="py-4 px-2 font-semibold hover:text-[#FC997C] transition duration-300"
            >
              Home
            </a>
            {document && document.isAGeek && (
              <a
                href="/dashboard"
                className="py-4 px-2 font-semibold hover:text-[#FC997C] transition duration-300"
              >
                Dashboard
              </a>
            )}
            <a
              href="/fetchProfiles"
              className="py-4 px-2 font-semibold hover:text-[#FC997C] transition duration-300"
            >
              Profiles
            </a>
            {document && document.isAGeek && (
              <a
                href={`/profile/${user.uid}`}
                className="px-2 font-semibold hover:text-[#FC997C] transition duration-300"
              >
                My Profile
              </a>
            )}
            {!isPending && (
              <button
                className=" px-2 font-semibold no-underline text-white hover:text-blue-dark ml-2"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            )}
            {isPending && (
              <button className=" py-4 px-2 font-semibold hover:text-purple-500 transition duration-300" disabled>
                Logging out...
              </button>
            )}
          </div>
        )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
