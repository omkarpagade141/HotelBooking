// src/pages/Home.js
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Sidebar/Navbar";
import "./Home.css";
import Section from "../Sections/Section";
import { Route, Routes } from "react-router-dom";
import AddContent from "../Contents/AddContent";
import ContentList from "../Contents/ContentList";
import AddCustomer from "../Customer/AddCustomer";
import ListCustomers from "../Customer/ListCustomers";
import Dashboaed from "../Dashboard/Dashboaed";
import SettingMaster from "../Settings/SettingMaster";
import Enquiry from "../Enquiry/Enquiry";

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Navbar onToggle={() => setCollapsed(!collapsed)} />

      <div className="home-container">
        <Sidebar collapsed={collapsed} />
        <div
          className={` homeContentDiv content ${
            collapsed ? "collapsed" : "expanded"
          }`}
        >
          <Routes>
            <Route path="/" element={<Dashboaed />} />
            <Route path="/content" element={<AddContent />} />
            <Route path="/content-list" element={<ContentList />} />
            <Route path="/sections" element={<Section />} />
            <Route path="/addCustomer" element={<AddCustomer />} />
            <Route path="/listCustomer" element={<ListCustomers />} />
            <Route path="/settingMaster" element={<SettingMaster />} />
            <Route path="/enquiry" element={<Enquiry />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
