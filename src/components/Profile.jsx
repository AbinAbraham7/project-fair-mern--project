import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileApi } from '../services/allApi';
import { Collapse } from 'react-bootstrap';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';






function Profile() {

  const [userDetails,setuserDetails]=useState({
    
    username:"",
    email:"",
    password:"",
    profile:"",
    github:"",
    linkedin:""

  })
  console.log(userDetails);
  const [exitingImg,setExistingImg]=useState("")

  const [preview,setPreview]=useState("")

  const [updateStatus,setUpdateStatus]=useState({})

  const [open, setOpen] = useState(false);

  const handleFile=(e)=>{
    setuserDetails({...userDetails,profile:e.target.files[0]})
  }

  console.log(preview);

  const handleUpdate=async()=>{
    const { username , email ,password , profile ,github ,linkedin}=userDetails
    if(!github || !linkedin)
    {
      toast.info('please add github and linkedin')
    }
    else{
      const reqBody=new FormData()
      reqBody.append("username",username),
      reqBody.append("email",email),
      reqBody.append("password",password),
      reqBody.append("github",github),
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profile",profile):reqBody.append("profile",exitingImg)

      const token=sessionStorage.getItem("token")

      if(preview)
      {
        const reqHeader={
          "Content-Type":"multipart/form-data",
           "Authorization":`Bearer ${token}`
       }
       const result=await updateUserProfileApi(reqBody,reqHeader)
       console.log(result);
       if(result.status==200)
       {
        toast.success('updated successfully')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        setUpdateStatus(result)
        
       }
       else{
        toast.error('something went wrong')
      }
       
      }
      else
      {
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`

        }
        const result=await updateUserProfileApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200)
          {
           toast.success('updated successfully')
           sessionStorage.setItem("existingUser",JSON.stringify(result.data))
           setUpdateStatus(result)
        
           
          }
          else{
            toast.error('something went wrong')
          }
      }

    }
  }
  
  useEffect(()=>{
    if(userDetails.profile)
    {
      setPreview(URL.createObjectURL(userDetails.profile))
    }

  },[userDetails.profile])

  useEffect(()=>{

    if(sessionStorage.getItem("existingUser"))
    {
      const user=JSON.parse(sessionStorage.getItem("existingUser"));
      console.log(user);
      setuserDetails({...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin})
      setExistingImg(user.profile)
      
    }
  },[updateStatus])
  
  
  return (
    <>
    <div className="shadow p-4 mt-4 mt-md-0"  onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      <div className="d-flex justify-content-between" >
        <h3 className='text-success'>Profile</h3>
        <button onClick={() => setOpen(!open)} 
        className='btn border border-success text-success'>{open==true?<FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</button>
      </div>
      <Collapse in={open}>

      <div>
      <div className='d-flex justify-content-center align-items-center flex-column mt-4 '>
        <label htmlFor="profilephoto" className='d-flex justify-content-center align-items-center mb-3'>
          <input type="file" id="profilephoto" style={{display:"none"}} onChange={(e)=>handleFile(e)}/>

         {exitingImg==""?
          <img src={preview?preview:"https://static.vecteezy.com/system/resources/previews/009/267/561/original/user-icon-design-free-png.png"}
           alt="" style={{height:"200px",width:"200px",borderRadius:"50%"}} />
            :
            <img src={preview?preview:`${serverUrl}/upload/${exitingImg}`}
           alt="" style={{height:"200px",width:"200px",borderRadius:"50%"}}  />}
        </label>

        <div className="w-100 ">
        <div className="mb-3">
          <input type="text" className="form-control" placeholder='Github'
          value={userDetails?.github} onChange={(e)=>setuserDetails({...userDetails,github:e.target.value})}/>
        </div>
        <div className="mb-3">
        <input type="text" className="form-control" placeholder='LinkedIn'
        value={userDetails?.linkedin} onChange={(e)=>setuserDetails({...userDetails,linkedin:e.target.value})}/>
        </div>
        <div className="mb-3">
          <button className='btn btn-success w-100' onClick={handleUpdate}>Update</button>
        </div>
        </div>
      </div>
      </div>
      </Collapse>
      <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </div>
    </>
  )
}

export default Profile