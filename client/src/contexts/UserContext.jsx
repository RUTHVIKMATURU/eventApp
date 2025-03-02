import {createContext,useEffect,useState} from 'react'
export const userContextObj=createContext();

function UserContext({children}) {
  let [currentUser,setcurrentUser]=useState({
    firstName:"",
    lastName:"",
    email:"",
    profileImageUrl:"",
    role:""
})
  return (
    <userContextObj.Provider value={{currentUser,setcurrentUser}}>
      {children}
    </userContextObj.Provider>
  )
}

export default UserContext