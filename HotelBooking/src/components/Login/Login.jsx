import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Login.css'; // Include custom styles for fine-tuning

const Login = () => {
  return (
     <div className="login-page">
      
      <Container className="d-flex justify-content-center align-items-center login-container">
        <Row>
          <Col>
            <h1 className='header-of-hotel-billing'>Hotel Billing</h1>
            <div className="login-box shadow-lg p-5 ">
              <h4 className="text-center fw-bold"><i className="bi bi-person-fill"></i> SIGN IN</h4>
              <hr/>
              <Form>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  <i className="bi bi-box-arrow-in-right mx-1 "></i> SIGN IN
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
