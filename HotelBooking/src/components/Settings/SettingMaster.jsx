import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { Card, Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import apiClient from "../APIClient";
import { toast } from 'react-toastify';


function SettingMaster() {
  const [settings, setSettings] = useState(null);
  
  // Individual state variables for form fields
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);

  // Fetch existing settings from API
  const fetchSettingMaster = async () => {
    try {
      const response = await apiClient.get('http://localhost:8080/api/settings/get-setting/2');
      setSettings(response.data);
      console.log(response.data, response.status);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  // Update the form fields after fetching settings
  useEffect(() => {
    fetchSettingMaster();
  }, []);

  // Update form states once settings data is available
  useEffect(() => {
    if (settings) {
      setCompanyName(settings.companyName || '');
      setAddress(settings.address || '');
      setCity(settings.city || '');
      setEmail(settings.email || '');
      setPhoneNumber(settings.phoneNumber || '');
    }
  }, [settings]);

  // Handle form submission
  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    const sendSettingData = {
      companyName,
      address,
      city,
      phoneNumber,
      email,
    };

    const formdata = new FormData();
    // Append JSON blob
    formdata.append('settingObj', new Blob([JSON.stringify(sendSettingData)], { type: 'application/json' }));
    if (image) formdata.append('image', image); // Append the image if selected

    try {
      const response = await apiClient.put('http://localhost:8080/api/settings/addOrUpdate-setting', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data,response.status);
      if (response.status===200) {
        toast.success('Settings updated Successfully')
      }
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <div>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Card>
            <Card.Body style={{ padding: "50px", fontSize: "16px" }}>
              <h3 style={{ marginLeft: "12px" }}>Setting Master</h3>
              <hr />
              <Form onSubmit={handleUpdateSettings}>
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
                    <strong>Company Address:</strong>
                  </Col>
                  <Col xs md={8}>
                    <Form.Control
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                      placeholder="Enter City Name"
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
                    <strong>Email:</strong>
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
                    <strong>Choose File:</strong>
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
                    <Button variant="contained" type="submit" fullWidth>
                      Submit
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
  );
}

export default SettingMaster;
