import { useState, useEffect } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home'; // Ensure this component exists
import { jwtDecode } from 'jwt-decode'; // Ensure this library is installed

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('jwtToken'));

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = sessionStorage.getItem('jwtToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          sessionStorage.removeItem('jwtToken');
          sessionStorage.removeItem('userName');
          setIsAuthenticated(false);
        }
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000);
    checkTokenExpiration();

    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/home/*" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
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
  );
}

export default App;
