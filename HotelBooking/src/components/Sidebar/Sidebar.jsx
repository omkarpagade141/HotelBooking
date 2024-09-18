// src/components/Sidebar.js
import React, { useState } from "react";
import { Collapse, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faCog,
  faEnvelope,
  faUserPlus,
  faPlus,
  faList,
  faObjectGroup,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = ({ collapsed, onToggle }) => {
  const [customerToggle, setCustomerToggle] = useState(false);
  const [contentToggle, setContentToggle] = useState(false);
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}>
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/home" className="nav-link">
            <FontAwesomeIcon icon={faHome} />
            {!collapsed && <span>Home</span>}
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            className="nav-link"
            onClick={() => setCustomerToggle(!customerToggle)}
          >
            <FontAwesomeIcon icon={faUser} />
            {!collapsed && <span>Customer</span>}
          </Link>
        </Nav.Item>
        {customerToggle && (
          <>
            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/addCustomer" className="nav-link">
                <FontAwesomeIcon icon={faUserPlus} />
                {!collapsed && <span>Add Customer</span>}
              </Link>
            </Nav.Item>
            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/listCustomer" className="nav-link">
                <FontAwesomeIcon icon={faUsers} />
                {!collapsed && <span>List Customer</span>}
              </Link>
            </Nav.Item>
          </>
        )}
        <Nav.Item>
          <Link to="/home/sections" className="nav-link">
            <FontAwesomeIcon icon={faObjectGroup} />
            {!collapsed && <span>Sections</span>}
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            className="nav-link"
            onClick={() => setContentToggle(!contentToggle)}
          >
            <FontAwesomeIcon icon={faListAlt} />
            {!collapsed && <span>Contents</span>}
          </Link>
        </Nav.Item>
        {contentToggle && (
          <>
            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/content" className="nav-link">
                <FontAwesomeIcon icon={faPlus} />
                {!collapsed && <span>Add Content</span>}
              </Link>
            </Nav.Item>

            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/content-list" className="nav-link">
                <FontAwesomeIcon icon={faList} />
                {!collapsed && <span>Content List</span>}
              </Link>
            </Nav.Item>
          </>
        )}

     
       
        <Nav.Item>
          <Link to="/home/settingMaster" className="nav-link">
            <FontAwesomeIcon icon={faCog} />
            {!collapsed && <span>Settings</span>}
          </Link>
        </Nav.Item>


        <Nav.Item>
          <Link to="/home/enquiry" className="nav-link">
            <FontAwesomeIcon icon={faEnvelope} />
            {!collapsed && <span>Enquiry</span>}
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
