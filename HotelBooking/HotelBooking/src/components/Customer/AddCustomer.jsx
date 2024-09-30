import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import apiClient from '../APIClient'

function AddCustomer() {
  const [fullName, setFullName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [locality, setLocality] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [image,setImage]=useState(null)

  const handleAddCustomer= async(e)=>{
    e.preventDefault();
    const formdata = new FormData();

    const customerData = {
      fullName,
      mobileNumber,
      address,
      email,
      locality,
      city,
      pincode,
    };

    // Append JSON blob
    formdata.append('customer', new Blob([JSON.stringify(customerData)], { type: 'application/json' }));
    formdata.append('image', image);

    try {
      const response = await apiClient.post('/api/customer', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        toast.success('Customer added successfully');
        
        // Reset all state variables to initial values
        setAddress('');
        setFullName('');
        setMobileNumber('');
        setEmail('');
        setLocality('');
        setCity('');
        setPincode('');
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add customer');
    }
  }

  return (
    <div>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Card>
            <Card.Body style={{ padding: "50px", fontSize: "16px" }}>
              <h3 style={{ marginLeft: "12px" }}>Add Customer</h3>
              <hr />

              <Form onSubmit={(e)=>handleAddCustomer(e)}>
                {/* <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Role:</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                      type="text"
                      readOnly
                      value='Customer'
                      placeholder=""
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row> */}
                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Full Name:</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                    required
                    value={fullName}
                    onChange={(e)=>setFullName(e.target.value)}
                      type="text"
                      placeholder="Full Name"
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Mobile Number/Username:</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                    required
                    value={mobileNumber}
                    maxLength={10}
                    onChange={(e)=>setMobileNumber(e.target.value)}
                      type="text"
                      placeholder="Mobile Number"
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Email:</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                      type="text"
                      placeholder="Email"
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Building/Flat Number:</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                      type="text"
                      placeholder="Building/Flat Number"
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Locality:</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                    value={locality}
                    onChange={(e)=>setLocality(e.target.value)}
                      type="text"
                      placeholder="Locality"
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>City:</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                      type="text"
                      placeholder="City"
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Pin Code:</strong>
                  </Col>
                  <Col xs md={8}>

                    <Form.Control
                    value={pincode}
                    onChange={(e)=>setPincode(e.target.value)}
                      type="text"
                      placeholder="Pin Code"
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Image:</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                    onChange={(e)=>setImage(e.target.files[0])}
                      type="file"
                      style={{ marginBottom: "20px", padding: "4px" }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs md={4}></Col>
                  <Col xs md={8}>
                    <Button
                    type='submit'
                      style={{
                        fontsize: "120px",
                        backgroundColor: "#1861bf",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{ marginRight: "15px" }}
                      />
                      <strong>Submit</strong>
                    </Button>
                  </Col>
                </Row>


              </Form>
            </Card.Body>


          </Card>
        </Col>
        <Col md={2}></Col>

      </Row>
    </div>
  )
}

export default AddCustomer
