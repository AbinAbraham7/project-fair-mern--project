import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import photo from '../assets/image1.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { homeProjectApi } from '../services/allApi'


function Home() {

    const [islogin,setIslogin]=useState(false)

    const [homeProject,setHomeProject]=useState([])

    const getHomeProject = async()=>{
        const result = await homeProjectApi()
        setHomeProject(result.data)
    }
    console.log(homeProject);
    

    useEffect(()=>{

        getHomeProject()
        if(sessionStorage.getItem("token"))
        {
            setIslogin(true)
        }
        else{
            setIslogin(false)
        }
    })
  return (
    <>
    <div  className='bg-success p-5'>
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h1  style={{fontSize:"70px",color:"white"}}>Project Fair</h1>
                    <p>One stop destination for all software development projects</p>
                  { islogin==false?
                   <Link to={'/login'}><button className='btn text-light p-0 mt-3'>Get Started<FontAwesomeIcon icon={faArrowRight} /></button></Link> 
                   :
                 <Link to={'/dashboard'}> <button className='btn text-light p-0 mt-3'>Manage Projects<FontAwesomeIcon icon={faArrowRight} /></button></Link>}  
                </div>
                <div className="col-md-6 mt-5 mt-md-0 d-flex justify-content-center">
                    <img 
                    src="https://static.vecteezy.com/system/resources/previews/033/291/589/non_2x/website-icon-in-illustration-vector.jpg" alt="" 
                    className='w-100 shadow' height={"450px"} />
                </div>
            </div>
        </div>
    </div>

    <div>
        <h1 className='text-center mt-4 mb-4'>Explore Our Projects</h1>
        <div className="container">
            <div className="row">
               {homeProject?.map((item)=>(
                <div className="col-md-4">
                <ProjectCard project={item}/>
                </div>

               )) }
               
            </div>
           <Link to={'/projects'}> <p className='text-center my-4'>See more projects</p></Link>
        </div>
    </div>
    </>
  )
}

export default Home