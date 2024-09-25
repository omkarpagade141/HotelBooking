import React, { useState } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Login.css'; // Include custom styles for fine-tuning
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: userName,
        password: password,
      });

      if (response.status === 200) {
        const { jwtToken, userName: name } = response.data;
        sessionStorage.setItem('jwtToken', jwtToken);
        sessionStorage.setItem('userName', name);
        toast.success('Login success');
        onLoginSuccess(); // Update the authentication state
        navigate('/home');
      }
    } catch (error) {
      toast.error(error.response?.data || 'Login failed');
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex justify-content-center align-items-center login-container">
        <Row>
          <Col>
            <h1 className='header-of-hotel-billing'>Hotel Billing</h1>
            <div className="login-box shadow-lg p-5">
              <h4 className="text-center fw-bold">
                <FontAwesomeIcon icon={faUser} /> SIGN IN
              </h4>
              <hr />
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="User Name" 
                    onChange={(e) => setUserName(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  <i className="bi bi-box-arrow-in-right mx-1"></i> SIGN IN
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
