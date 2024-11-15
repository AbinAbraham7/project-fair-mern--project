import React, { createContext, useState } from 'react'

export const addResponseContext=createContext({})
export const editResponseContext=createContext({})
export const loginResponseContext=createContext({})

function Contextshare({children}) {

    //for addition of new project and that should be automatically loaded
    const [addResponse,setAddResponse]=useState([])
    //for update
    const [editResponse,setEditResponse]=useState([])
    //login response
    const [loginResponse,setLoginResponse]=useState([])

    
  return (
    <>
    <addResponseContext.Provider value={{addResponse,setAddResponse}}>
       <editResponseContext.Provider value={{editResponse,setEditResponse}}> 
        <loginResponseContext.Provider value={{loginResponse,setLoginResponse}}>
        {children}
        </loginResponseContext.Provider>
        </editResponseContext.Provider>
    </addResponseContext.Provider>
    </>
  )
}

export default Contextshare