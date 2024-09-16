import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { Row,Col } from 'react-bootstrap';


function Navbar({onToggle}) {
  return (
    <div style={{height:'40px',width:'100vw',backgroundColor:'#1861bf',zIndex:'1000',position:'fixed'}}>
        <Row>
            <Col xs={2} style={{textAlign:'center',color:'white',marginTop:'2px',fontSize:'23px'}}>Admin</Col>
            <Col xs={2}><FontAwesomeIcon icon={faBars} onClick={onToggle}  style={{color:'white',height:'21px', marginTop:'8px',cursor:'pointer'}}/></Col>
            <Col xs={8}></Col>
        </Row>
          

      
    </div>
  )
}

export default Navbar
