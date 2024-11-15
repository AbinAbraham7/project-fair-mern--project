import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProjectApi } from '../services/allApi';
import { editResponseContext } from '../context/Contextshare';


function Edit({projects}) {

    const [projectDetails,setProjectDetails]=useState(
      {
        title:projects.title,
        language:projects.language,
        github:projects.github,
        website:projects.website,
        overview:projects.overview,
        projectimage:""
      }
    )

    const [preview,setPreview]=useState("")

    const [key,setKey]=useState(0)
    
    const [show, setShow] = useState(false);

    const {setEditResponse}=useContext(editResponseContext)


    const handleClose = () => {
      setShow(false);
      handleCancel()

    }
    const handleShow = () => setShow(true);

    console.log(projectDetails);
    

    //console.log(projects);

    const handleFile=(e)=>{
      console.log(e.target.files);
      setProjectDetails({...projectDetails,projectimage:e.target.files[0]})
      

    }

    const handleCancel=()=>{
      setProjectDetails({
        title:projects?.title,
        language:projects?.language,
        github:projects?.github,
        website:projects?.website,
        overview:projects?.overview,
        projectimage:""

      })
      setPreview("")
      if(key==0)
      {
        setKey(1)
      }
      else{
        setKey(0)
      }

    }

    const handleUpdate=async()=>{
      const {title , language ,github , website , overview , projectimage}=projectDetails
      if(!title || !language || !github || !website || !overview){
        toast.info('please fill the for completely')
      }
      else{
        const reqBody=new FormData()
          reqBody.append("title",title)
          reqBody.append("language",language)
          reqBody.append("github",github)
          reqBody.append("website",website)
          reqBody.append("overview",overview)
        preview?reqBody.append("projectimage",projectimage):reqBody.append("projectimage",projects?.projectimage)

        const token=sessionStorage.getItem("token")

        if(preview) //if there is uploaded content in update
        {
          const reqHeader={
             "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
          }
          const result=await updateUserProjectApi(projects._id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200)
          {
            setEditResponse(result)
            toast.success('project updated successfully')
            setTimeout(() => {
              handleClose()
              
            },2002);
          }
          else{
            handleCancel()
            toast.error('something went wrong')
          }
          
        }
        else
        {
          const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`

          }
          const result=await updateUserProjectApi(projects._id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200)
            {
              setEditResponse(result)
              toast.success('project updated successfully')
              setTimeout(() => {
                handleClose()
                
              },2002);
            }
            else{
              handleCancel()
              toast.error('something went wrong')
            }

        }
        
      }
    }

    useEffect(()=>{

      if(projectDetails.projectimage)
      {
        setPreview(URL.createObjectURL(projectDetails.projectimage))
      }
    },[projectDetails.projectimage])
    
  return (
    <>
    <FontAwesomeIcon  onClick={handleShow}  icon={faPenToSquare}  className='mx-3' style={{color:"rgb(160,98,192)"}}/>



    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="Projectimage">
                            <input type="file"  id="Projectimage" style={{display:"none"}} key={key}  onChange={(e)=>handleFile(e)}/>
                            <img src={preview?preview:`${serverUrl}/upload/${projects.projectimage}`} alt="" 
                            className='w-100 mb-2' />
                        </label>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <input type="text" className="form-control" value={projectDetails.title} placeholder='Title'
                            onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                        <input type="text" className="form-control" value={projectDetails.language} placeholder='Language'
                        onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                        <input type="text" className="form-control" value={projectDetails.github} placeholder='Github'
                        onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                        <input type="text" className="form-control" value={projectDetails.website}  placeholder='Website'
                        onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <textarea rows={5} className='form-control' value={projectDetails.overview} placeholder='Overview'
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
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
      </Modal>

    </>
  )
}

export default Edit