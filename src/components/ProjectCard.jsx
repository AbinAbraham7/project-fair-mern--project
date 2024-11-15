import React from 'react'
import Card from 'react-bootstrap/Card';
import projectphoto from '../assets/Screenshot 2024-10-31 104615.png'
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Cardphoto from '../assets/Screenshot 2024-10-31 104212.png'
import { serverUrl } from '../services/serverUrl';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Card className='w-100 mt-4  shadow border-0 rounded-0'>
      <Card.Img onClick={handleShow} variant="top" src={`${serverUrl}/upload/${project.projectimage}`} className='w-100'
      style={{height:"220px"}} />
      <Card.Body>
        <Card.Title className='text-center'>{project?.title}</Card.Title>
       
       
      </Card.Body>
    </Card>




    
    <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <img src={`${serverUrl}/upload/${project.projectimage}`} alt="" className='w-100' />
                    </div>
                    <div className="col-md-6">
                        <h4>Description:</h4>
                        <p>{project?.overview}
                        </p>
                        <h4>Technology:</h4>
                        <p>{project?.language}</p>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
         <div className="d-flex">
            <Link to={project?.github} target='_blank'>
            <FontAwesomeIcon icon={faGithub} className="me-3 fa-2x"/></Link>

            <Link to={project?.website} target='_blank'
            ><FontAwesomeIcon icon={faGlobe}  className="me-3 fa-2x"/></Link>
         </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard