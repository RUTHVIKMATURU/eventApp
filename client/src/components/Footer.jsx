import React from 'react'

function Footer() {
  return (
    <footer className="bg-dark text-center py-6 mt-10" style={{minHeight:"100px"}}>
      <p className="text-lg font-semibold">© {new Date().getFullYear()} Event Manager. All rights reserved.</p>
      <div className="mt-2 d-flex justify-content-around space-x-6">
        <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
        <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
        <a href="#" className="hover:text-blue-400 transition">Contact Us</a>
      </div>
    </footer>
  )
}

export default Footer