import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faKey, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import './Navbar.css'
import { Navigate, useNavigate } from 'react-router-dom';
function Navbar({ onToggle }) {
  const [adminToggle, setAdminToggle] = useState(false)

  const nevigate = useNavigate() 

  const handleLogout = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userName');
    nevigate('/')
    // window.location.href = '/';
  }
  return (
    <div className='navMainDiv' style={{ height: '40px', width: '100vw', backgroundColor: '#1861bf', zIndex: '1000', position: 'fixed' }}>
      <Row>
        <Col xs={2} style={{ textAlign: 'center', color: 'white', marginTop: '2px', fontSize: '23px' }}>Admin</Col>
        <Col xs={2}><FontAwesomeIcon icon={faBars} onClick={onToggle} style={{ color: 'white', height: '21px', marginTop: '8px', cursor: 'pointer' }} /></Col>
        <Col xs={8}>
          <Row>
            <Col xs={10}></Col>
            <Col xs={2} className='adminIConBtnInNav'>
              <Row>
                <Col onClick={() => setAdminToggle(!adminToggle)}>
                  <FontAwesomeIcon icon={faUser} />Admin
                </Col>
              </Row>
            </Col>
          </Row>
          {adminToggle && (
            <Row>
              <Col xs={9}></Col>
              <Col xs={3} className='adminButtonsListNav'>
                <div>
                  <ul>
                    <li className='liInNavAdmin'><FontAwesomeIcon icon={faKey} style={{marginRight:'7px'}} /> Change Password</li>
                    <li className='liInNavAdmin' onClick={ handleLogout}><FontAwesomeIcon icon={faSignOutAlt} style={{marginRight:'7px'}}/>  Logout</li>
                  </ul>
                </div>
              </Col>
            </Row>
          )}

        </Col>
      </Row>



    </div>
  )
}

export default Navbar
