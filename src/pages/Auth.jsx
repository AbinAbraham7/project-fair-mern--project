import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare'



function Auth({register}) {


    const {setLoginResponse}=useContext(loginResponseContext)
    const navigate=useNavigate()
    const [userDetails,setuserDetails]=useState({
        username:"",
        email:"",
        password:""
      })
      console.log(userDetails);
      const handleRegister=async()=>{
        const {username,email,password}=userDetails
        if(!username || !email || !password )
        {
            toast.info('please fill the form completly')
           
            
        }
        else{
            const result = await registerApi(userDetails)
            console.log(result);
            if(result.status==200)
            {
                setLoginResponse(result.data)
                toast.success('Registration successfully')
                navigate('/login')
            setuserDetails(
                {
                    username:"",
                    email:"",
                    password:""
                }
            )

            }
            else if(result.status==406)
            {
                toast.warning(result.response.data)
            }
            else{
                toast.error('something went wrong')
            }
            
        }
      }

      const handleLogin=async()=>{
        const {email,password}=userDetails
        if(!email || !password)
        {
            toast.info('please fill the form completely')
        }
        else{
            const result=await loginApi({email,password})
            console.log(result);
            if(result.status==200)
            {
                toast.success('Login Successfull')

                //token and data stored in sessionStorage
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existinguser))
                sessionStorage.setItem("token",result.data.token)
                setuserDetails({
                    username:"",
                    email:"",
                    password:""
                })



              setTimeout(()=>{
                 navigate('/')
               },2000)
            }
            else if(result.status==406)
            {
                toast.warning(result.response.data)
                setuserDetails({
                    username:"",
                    email:"",
                    password:""
                })
            }
            else{
                toast.error('something went wrong')
                setuserDetails({
                    username:"",
                    email:"",
                    password:""
                })
            }
            
        }
      }
      
  return (
    <>
    <div className='mt-5'>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                   <Link style={{textDecoration:"none"}} to={'/'} > <h4 className='text-warning'><FontAwesomeIcon icon={faArrowLeft} />Back to Home</h4></Link>
                    <div className="row bg-success p-5">
                        <div className="col-md-6">
                            <div className='d-flex justify-content-center align-items-center'>
                            <img src="https://cdn0.iconfinder.com/data/icons/flat-security-icons/512/lock-open-blue.png" alt="" className='w-75' />
                            </div>
                        </div>
                        <div className="col-md-6 mt-4 mt-md-0 p-5">
                            <div className='d-flex '>

                                <h3 className='text-center text-light ms-3'>
                                <FontAwesomeIcon icon={faStackOverflow} /> Project Fair
                                </h3>
                            </div>
                                {!register?
                                <div className="d-flex ">
                                <h5 className='text-center text-light ms-4'>Sign in to Your Account</h5>
                                </div>
                                :
                                <div className="d-flex ">
                                <h5 className='text-center text-light ms-4'>Sign up to Your Account</h5>
                                </div>}
                                { register && (
                                 <input 
                                  type="text" 
                                  className="form-control mt-3 rounded-0" 
                                  placeholder="username"  value={userDetails.username}
                                  onChange={(e)=>setuserDetails({...userDetails, username:e.target.value})} 
                                          />
                            )}

                                <input type="text" className="form-control  mt-3 rounded-0 " placeholder='abin@gmail.com' value={userDetails.email}
                                 onChange={(e)=>setuserDetails({...userDetails, email:e.target.value})} />
                                <input type="password" className="form-control mt-3 rounded-0" placeholder='Password' value={userDetails.password}
                                onChange={(e)=>setuserDetails({...userDetails, password:e.target.value})} />

                              
                                 {register?
                                  <div> <button onClick={handleRegister} className='btn btn-warning w-100 text-light rounded-0 mt-3'>Register</button>
                                <p className='mt-2 text-light'>Already a User? Click Here to <Link to={'/login'} className="text-danger">Login</Link></p>
                                </div> 
                                :
                                <div>
                                <button onClick={handleLogin}
                                 className='btn btn-warning w-100 text-light rounded-0 mt-3'>Login</button>
                                <p className='mt-2 text-light'>New User? Click Here to <Link to={'/register'} className="text-danger">Register</Link></p>
                                 </div>
                                    }

                            

                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    </div>
    
    
    <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </>
  )
}

export default Auth