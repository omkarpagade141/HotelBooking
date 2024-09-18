import { useState } from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import './App.css'
import Login from './components/Login/Login';
import Home from './components/Home/Home';


function App() {

  return (
    <>
        
       <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home/*" element={<Home />} />
        </Routes>
       </Router>
    </>
  )
}

export default App
