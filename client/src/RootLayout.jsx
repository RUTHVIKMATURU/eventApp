import React from 'react'
import {Outlet} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import {ClerkProvider} from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <div>
      <Header/>
      <div className='Body my-2' style={{minHeight:"90vh"}}>
        <Outlet/>
      </div>
      <Footer/>
    </div>
    </ClerkProvider>
  )
}

export default RootLayout