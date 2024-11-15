import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faL, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'

import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/Contextshare';



function Header() {


  const {setLoginResponse}=useContext(loginResponseContext)
  const [token,setToken]=useState("")
  const navigate=useNavigate()

  const handleLogout=()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setLoginResponse("")
    navigate('/')
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token"))
    {
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <>
    <Navbar className="bg-success d-flex align-items-center px-5">
     
       <Link to={'/'} style={{textDecoration:"none"}}>
       <Navbar.Brand  className='text-light'>
        <span className=' fs-3'> <FontAwesomeIcon icon={faStackOverflow} /> Project Fair</span>
           
           
          </Navbar.Brand>
       </Link>   
      {token && <button onClick={handleLogout} className='btn btn-warning ms-auto rounded-0 text-light '><FontAwesomeIcon icon={faPowerOff} /> Logout</button>}
       
      </Navbar>
    </>
  )
}

export default Header