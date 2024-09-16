// src/components/Sidebar.js
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser,faUsers, faCog, faEnvelope,faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './Sidebar.css';

const Sidebar = ({ collapsed, onToggle }) => {

  const [customerToggle, setCustomerToggle] = useState(false)
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/home" className="nav-link">
            <FontAwesomeIcon icon={faHome} />
            {!collapsed && <span>Home</span>}
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" onClick={()=>setCustomerToggle(!customerToggle)}>
            <FontAwesomeIcon icon={faUser} />
            {!collapsed && <span>Customer</span>}
          </Link>
        </Nav.Item>
        {customerToggle && (
          <>
          <Nav.Item style={{marginLeft:'20px'}}> 
            <Link to="/home/content" className="nav-link">
              <FontAwesomeIcon icon={faUserPlus} />
              {!collapsed && <span>Add Customer</span>}
            </Link>
          </Nav.Item>
           <Nav.Item style={{marginLeft:'20px'}}>
           <Link to="/home/content" className="nav-link">
             <FontAwesomeIcon icon={faUsers} />
             {!collapsed && <span>List Customer</span>}
           </Link>
         </Nav.Item>
         </>
          
        )}
        <Nav.Item>
          <Link to="#" className="nav-link">
            <FontAwesomeIcon icon={faCog} />
            {!collapsed && <span>Settings</span>}
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="#" className="nav-link">
            <FontAwesomeIcon icon={faEnvelope} />
            {!collapsed && <span>Contact</span>}
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
