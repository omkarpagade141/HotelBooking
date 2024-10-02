import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { Card, Col, Form, Row } from 'react-bootstrap'
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import apiClient from "../APIClient";


function SettingMaster() {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null)



  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    const sendSettingData = {
      companyName,
      address,
      city,
      phoneNumber,
      email
    }
    const formdata = new FormData();
    // Append JSON blob
    formdata.append('settingObj', new Blob([JSON.stringify(sendSettingData)], { type: 'application/json' }));
    formdata.append('image', image);
    console.log(sendSettingData);

    try {
      const response= await apiClient.put('http://localhost:8080/api/settings/addOrUpdate-setting',formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
      
    }

  }

 
  return (
    <div>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Card>
            <Card.Body style={{ padding: "50px", fontSize: "16px" }}>
              <h3 style={{ marginLeft: "12px" }}>Setting Master</h3>
              <hr />

              <Form onSubmit={(e) => handleUpdateSettings(e)}>
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
                    <strong>Company Name:</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      type="text"
                      placeholder="Enter Company Name"
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Company Address:-</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      maxLength={10}
                      type="text"
                      placeholder="Enter Company Address"
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
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      placeholder="Enter City Nmae"
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Contact Number:</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="text"
                      placeholder="Enter Contact Number"
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Email:-</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Enter Email"
                      style={{ marginBottom: "20px", padding: "5px" }}
                    />
                  </Col>
                </Row>


                <Row>
                  <Col xs md={4} style={{ textAlign: "start" }}>
                    <strong>Choose File:-</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      style={{ marginBottom: "20px", padding: "4px" }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs md={2}></Col>
                  <Col xs md={6}>
                    <Button variant="contained" type="submit" fullWidth>Submit</Button>
                  </Col>
                </Row>


              </Form>
            </Card.Body>


          </Card>
        </Col>
        <Col md={2}></Col>

      </Row>
    </div>
  );
}

export default SettingMaster;
