import React from 'react';
import { Link } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';

function Header() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  function handleLogout() {
    signOut();
  }

  return (
    <div>
      <nav className="navbar d-flex justify-content-between bg-dark p-2">
        <Link to="/">
          <img
            src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?t=st=1740913289~exp=1740916889~hmac=1c77cd781505437de6b78cf13b6db6859c083a45b4ced91d80d980cd1353834d&w=1060"
            alt="Logo"
            width="50px"
            className="rounded-circle"
          />
        </Link>

        <ul className="nav d-flex align-items-center">
          <li>
            <Link className="nav-link text-light" to="/">Home</Link>
          </li>
          <li>
            <Link className="nav-link text-light" to="/events">View Events</Link>
          </li>
          {isSignedIn ? (
            <button className="btn btn-light" onClick={handleLogout}>Sign Out</button>
          ) : (
            <>
              <li>
                <Link className="nav-link text-light" to="/login">Login</Link>
              </li>
              <li>
                <Link className="nav-link text-light" to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
