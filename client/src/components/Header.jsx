import React from 'react'
import { Link } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'

function Header() {
  const { isSignedIn } = useUser()
  const { signOut } = useClerk()

  return (
    <div>
      <nav className='navbar d-flex justify-content-between bg-dark p-2'>
        <img src="" alt="Logo" width="40px" />
        <ul className='nav d-flex align-items-center'>
          <li><Link className='nav-link text-light' to="/">Home</Link></li>
          <li><Link className='nav-link text-light' to="/events">View Events</Link></li>
          {isSignedIn ? (
            <button className='btn btn-light' onClick={() => signOut()}>Sign Out</button>
          ) : (
            <>
              <li><Link className='nav-link text-light' to="/login">Login</Link></li>
              <li><Link className='nav-link text-light' to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Header
