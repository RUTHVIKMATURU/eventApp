import React from 'react'
import { Link } from 'react-router-dom'
function ErrorPage() {
  return (
    <div className="d-flex flex-column align-items-center bg-dark justify-content-center fs-1 px-5" style={{minHeight:"100vh"}}>
      <h1 className="text-4xl font-bold text-warning">404 Error</h1>
      <p className="text-warning mt-4">The page you are looking for might have been removed or does not exist.</p>
      <Link to="/" className='nav-link'><button className='btn btn-warning fs-3'>Go Home</button> </Link>
    </div>
  )
}

export default ErrorPage