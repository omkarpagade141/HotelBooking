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
  faCaretDown,
  faChevronLeft,
  faObjectGroup,
  faListAlt,
  faMoneyBills,
  faIndianRupee,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [customerToggle, setCustomerToggle] = useState(false);
  const [contentToggle, setContentToggle] = useState(false);
  const [incomeToggle, setIncomeToggle] = useState(false);
  const [expenseToggle, setExpenseToggle] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}>
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/home" className={`nav-link ${isActive('/home') ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faHome} />
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link
            className={`nav-link ${isActive('/home/addCustomer') || isActive('/home/listCustomer') ? 'active' : ''}`}
            onClick={() => setCustomerToggle(!customerToggle)}
          >
            <FontAwesomeIcon icon={faUser} />
            {!collapsed && <span>Customer</span>}
            {!collapsed && (
              <FontAwesomeIcon icon={customerToggle ? faChevronDown : faChevronRight} style={{ marginLeft: 'auto' }} />
            )}
          </Link>
        </Nav.Item>
        {!collapsed && customerToggle && (
          <>
            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/addCustomer" className={`nav-link ${isActive('/home/addCustomer') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faUserPlus} />
                {!collapsed && <span>Add Customer</span>}
              </Link>
            </Nav.Item>
            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/listCustomer" className={`nav-link ${isActive('/home/listCustomer') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faUsers} />
                {!collapsed && <span>List Customer</span>}
              </Link>
            </Nav.Item>
          </>
        )}

        <Nav.Item>
          <Link to="/home/sections" className={`nav-link ${isActive('/home/sections') ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faObjectGroup} />
            {!collapsed && <span>Sections</span>}
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link
            className={`nav-link ${isActive('/home/content') || isActive('/home/content-list') ? 'active' : ''}`}
            onClick={() => setContentToggle(!contentToggle)}
          >
            <FontAwesomeIcon icon={faListAlt} />
            {!collapsed && <span>Contents</span>}
            {!collapsed && (
              <FontAwesomeIcon icon={contentToggle ? faChevronDown : faChevronRight} style={{ marginLeft: 'auto' }} />
            )}
          </Link>
        </Nav.Item>
        {!collapsed && contentToggle && (
          <>
            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/content" className={`nav-link ${isActive('/home/content') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faPlus} />
                {!collapsed && <span>Add Content</span>}
              </Link>
            </Nav.Item>

            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/content-list" className={`nav-link ${isActive('/home/content-list') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faList} />
                {!collapsed && <span>Content List</span>}
              </Link>
            </Nav.Item>
          </>
        )}

        <Nav.Item>
          <Link
            className={`nav-link ${isActive('/home/addIncome') || isActive('/home/viewIncome') ? 'active' : ''}`}
            onClick={() => setIncomeToggle(!incomeToggle)}
          >
            <FontAwesomeIcon icon={faIndianRupee} />
            {!collapsed && <span>Income</span>}
            {!collapsed && (
              <FontAwesomeIcon icon={incomeToggle ? faChevronDown : faChevronRight} style={{ marginLeft: 'auto' }} />
            )}
          </Link>
        </Nav.Item>
        {!collapsed && incomeToggle && (
          <>
            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/addIncome" className={`nav-link ${isActive('/home/addIncome') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faPlus} />
                {!collapsed && <span>Add Income</span>}
              </Link>
            </Nav.Item>

            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/viewIncome" className={`nav-link ${isActive('/home/viewIncome') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faList} />
                {!collapsed && <span>View Income</span>}
              </Link>
            </Nav.Item>
          </>
        )}

        <Nav.Item>
          <Link
            className={`nav-link ${isActive('/home/addExpense') || isActive('/home/listExpense') ? 'active' : ''}`}
            onClick={() => setExpenseToggle(!expenseToggle)}
          >
            <FontAwesomeIcon icon={faMoneyBills} />
            {!collapsed && <span>Expenses</span>}
            {!collapsed && (
              <FontAwesomeIcon icon={expenseToggle ? faChevronDown : faChevronRight} style={{ marginLeft: 'auto' }} />
            )}
          </Link>
        </Nav.Item>
        {!collapsed && expenseToggle && (
          <>
            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/addExpense" className={`nav-link ${isActive('/home/addExpense') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faPlus} />
                {!collapsed && <span>Add Expense</span>}
              </Link>
            </Nav.Item>

            <Nav.Item style={{ marginLeft: "20px" }}>
              <Link to="/home/listExpense" className={`nav-link ${isActive('/home/listExpense') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faList} />
                {!collapsed && <span>Expense List</span>}
              </Link>
            </Nav.Item>
          </>
        )}

        <Nav.Item>
          <Link to="/home/settingMaster" className={`nav-link ${isActive('/home/settingMaster') ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faCog} />
            {!collapsed && <span>Settings</span>}
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link to="/home/enquiry" className={`nav-link ${isActive('/home/enquiry') ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faEnvelope} />
            {!collapsed && <span>Enquiry</span>}
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
