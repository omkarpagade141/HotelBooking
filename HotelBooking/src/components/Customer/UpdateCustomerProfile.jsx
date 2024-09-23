import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import apiClient from '../APIClient'

function UpdateCustomerProfile({ customerData, fetchCustById }) {

  const [updCustData, setUpdCustData] = useState(customerData)
  const [image, setImage] = useState(null)

  const handleUpdateCustomer = async (e) => {
    e.preventDefault()
    const formdata = new FormData();
    formdata.append('customer', new Blob([JSON.stringify(updCustData)], { type: 'application/json' }));
    formdata.append('image', image);

    try {
      const response = await apiClient.put(`/api/customer/${updCustData.customerId}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchCustById(customerData.customerId)
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }

    // console.log(updCustData);
    
  }



  return (
    <div>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Card>
            <Card.Body style={{ fontSize: "16px" }}>
              <h3 style={{ marginLeft: "12px" }}>Update Customer</h3>
              <hr />

              <Form onSubmit={(e) => handleUpdateCustomer(e)}>
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
                      onChange={
                        (e) => setUpdCustData({
                          ...updCustData, fullName: e.target.value
                        })
                      }
                      defaultValue={customerData ? customerData.fullName : ''}
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
                      readOnly
                      defaultValue={customerData ? customerData.mobileNumber : ''}
                      onChange={(e) => setUpdCustData({
                        ...updCustData, mobileNumber: e.target.value
                      })}
                      maxLength={10}
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
                      onChange={(e) => setUpdCustData({
                        ...updCustData, email: e.target.value
                      })}
                      defaultValue={customerData ? customerData.email : ''}
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
                      onChange={(e) => setUpdCustData({
                        ...updCustData, address: e.target.value
                      })}
                      defaultValue={customerData ? customerData.address : ''}
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
                      onChange={(e) => setUpdCustData({
                        ...updCustData, locality: e.target.value
                      })}
                      defaultValue={customerData ? customerData.locality : ''}
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
                      onChange={(e) => setUpdCustData({
                        ...updCustData, city: e.target.value
                      })}
                      defaultValue={customerData ? customerData.city : ''}
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
                      onChange={(e) => setUpdCustData({
                        ...updCustData, pincode: e.target.value
                      })}
                      defaultValue={customerData ? customerData.pincode : ''}
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
                      onChange={(e)=>setImage(e.target.files[0])}
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

export default UpdateCustomerProfile
