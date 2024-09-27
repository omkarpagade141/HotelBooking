import React from "react";
import { Grid, TextField,Button } from "@mui/material";
import {  Card, Col, Form, Row } from 'react-bootstrap'
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'


function SettingMaster() {
  return (
    <div>
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <Card>
          <Card.Body style={{ padding: "50px", fontSize: "16px" }}>
            <h3 style={{ marginLeft: "12px" }}>Setting Master</h3>
            <hr />

            <Form>
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
                 
                    type="file"
                    style={{ marginBottom: "20px", padding: "4px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={2}></Col>
                <Col xs md={6}>
                 <Button variant="contained" fullWidth>Submit</Button>
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
