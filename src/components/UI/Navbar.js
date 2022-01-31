import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useSignout } from '../../hooks/useSignout';

function Navbar() {
  const { signout, isPending } = useSignout()
  const { user } = useAuthContext()

  return (
    <nav className="font-sans flex fixed text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <a href="/" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Geek Hunt</a>
      </div>
      <div>

        {!user && (
          <>
            <a href="/signin" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Sign In</a>
            <a href="/signup" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Sign Up</a>
          </>
        )}
        {user && (
          <>
            {user.displayName ? <p>Hello, {user.displayName}!</p> : <p>Hello!</p>}
            {!isPending &&
              <button
                className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
                onClick={signout}
              >
                Sign Out
              </button>
            }
            {isPending && <button className="btn" disabled>Logging out...</button>}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
