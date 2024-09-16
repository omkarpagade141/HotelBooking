// src/pages/Home.js
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Sidebar/Navbar';
import './Home.css'
import Section from '../Sections/Section';
import { Route, Routes } from 'react-router-dom';
import AddContent from '../Contents/AddContent';

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Navbar onToggle={() => setCollapsed(!collapsed)} />

      <div className="home-container">

        <Sidebar collapsed={collapsed} />
        <div className={` homeContentDiv content ${collapsed ? 'collapsed' : 'expanded'}`}>

          <Routes>
            <Route path="/" element={<Section />} />
            <Route path="/content" element={<AddContent />} />

          </Routes>

          
        </div>
      </div>
    </>
  );
};

export default Home;
