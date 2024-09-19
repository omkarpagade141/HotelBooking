import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

function AddCustomer() {
  return (
    <div>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Card>
            <Card.Body style={{ padding: "50px", fontSize: "16px" }}>
              <h3 style={{ marginLeft: "12px" }}>Add Customer</h3>
              <hr />

              <Form>
              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Role:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Select
                    id="section"
                    style={{ marginBottom: "20px", padding: "5px" }}
                  >
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Full Name:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
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
                    type="file"
                    style={{ marginBottom: "20px", padding: "4px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4}></Col>
                <Col xs md={8}>
                  <Button
                    style={{
                      fontsize: "120px",
                      backgroundColor: "#1861bf",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle   }
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
