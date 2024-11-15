import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';



function Addproject() {

    const [show, setShow] = useState(false);
   
    const {setAddResponse}=useContext(addResponseContext)
    

    const [projectDetails,setProjectDetails]=useState({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectimage:""
    })

    const [preview,setPreview]=useState("")

    const [token,setToken]=useState("")

    const [key,setKey]=useState(1)

   
    
    console.log(preview);
    
    console.log(projectDetails);
    console.log(token);
    

    const handleClose = () =>{ setShow(false);
      handleCancel()
    }
    const handleShow = () => setShow(true);
    const handleCancel = () =>{
      setProjectDetails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectimage:""

      })
      setPreview("")
      if(key==1)
      {
        setKey(0)
      }
      else{
        setKey(1)
      }
    }

    const handleFile=(e)=>{
      console.log(e.target.files);
      setProjectDetails({...projectDetails,projectimage:e.target.files[0]})
      
    }

    const handleAdd=async()=>{
      const {title , language , github , website ,overview , projectimage}=projectDetails
      if(!title || !language || !github || !website || !overview || !projectimage)
      {
        toast.info('please fill the form completely')
      }
      else
      {
        //append() - if the request method contains uploaded content then the request body
          //should be created with the help of append method in formData class - inshort request
              //body should be a formData

              const reqBody=new FormData()
              reqBody.append("title",title)
              reqBody.append("language",language)
              reqBody.append("github",github)
              reqBody.append("website",website)
              reqBody.append("overview",overview)
              reqBody.append("projectimage",projectimage)

              if(token)
              {
                const reqHeader={
                  "Content-Type":"multipart/form-data",
                  "Authorization":`Bearer ${token}`
                }
                const result =await addProjectApi(reqBody,reqHeader)
                console.log(result);
               if(result.status==200)
               {
                toast.success('project added successfully')
                setTimeout(() => {
                  handleClose()

                  
                }, 2002)
                setAddResponse(result)
               }
               else if(result.status==406)
               {
                toast.warning(result.response.data)
                handleCancel()
               }
               else{
                toast.error('something went wrong')
                setTimeout(() => {
                  handleClose()
                  
                }, 2002);
               }
                

              }
              else{
                toast.warning('please login to add project')
              }

      }
    }
    
    useEffect(()=>
    {
      if(projectDetails.projectimage)
      {
        setPreview(URL.createObjectURL(projectDetails.projectimage))
      }

    },[projectDetails.projectimage])

    useEffect(()=>{
      if(sessionStorage.getItem("token"))
      {
        setToken(sessionStorage.getItem("token"))
      }
    },[])
    

  return (
    <>

    <button onClick={handleShow} className='btn btn-success rounded-0 text-white'>Add Project</button>


    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="Projectimage">
                            <input type="file"  id="Projectimage" style={{display:"none"}} key={key}
                            onChange={(e)=>handleFile(e)} />
                            <img src={preview?preview:"https://img.freepik.com/premium-vector/photo-icon_944197-522.jpg"} alt="no image" 
                            className='w-100 mb-md-0 mb-2'  
                            />
                        </label>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <input type="text" className="form-control"  placeholder='Title' value={projectDetails.title}
                            onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                        <input type="text" className="form-control"  placeholder='Language' value={projectDetails.language}
                        onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                        <input type="text" className="form-control"  placeholder='Github' value={projectDetails.github}
                        onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                        <input type="text" className="form-control"  placeholder='Website' value={projectDetails.website}
                        onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <textarea rows={5} className='form-control' placeholder='Overview' value={projectDetails.overview}
                            onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
      </Modal>

    
    </>
  )
}

export default Addproject