import { useState } from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Login from './components/Login/Login';
import Home from './components/Home/Home';


function App() {
  const isAuthenticated = !!sessionStorage.getItem('jwtToken');

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home/*" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        </Routes>
      </Router>

      
      <ToastContainer
        position="top-right" // Set default position for all toasts
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
