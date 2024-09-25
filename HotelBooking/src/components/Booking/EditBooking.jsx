import { faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

function EditBooking() {
const { BookingId } = useParams();

  return (
    <div>
      <Card>
            <Card.Body>
                <h3>Add Booking</h3>
                <hr />
                <Row style={{ marginRight: "5px", marginBottom: "5px" }}>
                    <Col xs={6} md={2}>
                        <Form.Group controlId="checkInDate">
                            <Form.Label><strong>Check-In Date</strong></Form.Label>
                            <Form.Control type="date"  />
                        </Form.Group>
                    </Col>
                    <Col xs={6} md={2}>
                        <Form.Group controlId="checkInTime">
                            <Form.Label><strong>Check-In Time</strong></Form.Label>
                            <Form.Control type="time" />
                        </Form.Group>
                    </Col>
                    <Col xs={6} md={2}>
                        <Form.Group controlId="checkOutDate">
                            <Form.Label><strong>Check-Out Date</strong></Form.Label>
                            <Form.Control type="date"  />
                        </Form.Group>
                    </Col>
                    <Col xs={6} md={2}>
                        <Form.Group controlId="checkOutTime">
                            <Form.Label><strong>Check-Out Time</strong></Form.Label>
                            <Form.Control type="time"   />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Group controlId="uploadImage">
                            <Form.Label><strong>Upload Image</strong></Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="description">
                            <Form.Label><strong>Description</strong></Form.Label>
                            <Form.Control as="textarea" style={{ height: "100px" }} />
                        </Form.Group>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs={1}><strong>Check</strong></Col>
                    <Col xs={2}><strong>Item Name</strong></Col>
                    <Col xs={2}><strong>Cost</strong></Col>
                    <Col xs={2}><strong>Quantity</strong></Col>
                    <Col xs={2}><strong>SubTotal</strong></Col>
                    <Col xs={2}><strong>Item Description</strong></Col>
                    <Col xs={1}></Col>
                </Row>

                {/* {items.map((item, index) => (
                    <Row key={index} className="align-items-center" style={{ marginBottom: '10px' }}>
                        <Col xs={1}>
                            <Form.Check
                                type="checkbox"
                                checked={selectedItems.includes(index)}
                                onChange={() => handleSelectItem(index)}
                            />
                        </Col>
                        <Col xs={2}>
                            <Form.Control
                                type="text"
                                placeholder="Enter Item Name"
                                value={item.itemName}
                                onChange={(e) => handleChange(index, 'itemName', e.target.value)}
                            />
                        </Col>
                        <Col xs={2}>
                            <Form.Control
                                type="number"
                                placeholder="Enter Cost"
                                value={item.itemPrice}
                                onChange={(e) => handleChange(index, 'itemPrice', e.target.value)}
                            />
                        </Col>
                        <Col xs={2}>
                            <Form.Control
                                type="number"
                                placeholder="Enter Quantity"
                                value={item.itemQuantity}
                                onChange={(e) => handleChange(index, 'itemQuantity', e.target.value)}
                            />
                        </Col>
                        <Col xs={2}>
                            <Form.Control
                                type="number"
                                placeholder="SubTotal"
                                value={item.subTotal}
                                onChange={(e) => handleChange(index, 'subTotal', e.target.value)}
                            />
                        </Col>
                        <Col xs={2}>
                            <Form.Control
                                type="text"
                                placeholder="Add Item Desc."
                                value={item.itemDescription}
                                onChange={(e) => handleChange(index, 'itemDescription', e.target.value)}
                            />
                        </Col>
                    </Row>
                ))} */}

                <Row style={{ marginTop: '15px' }}>
                    <Col xs={10}>
                        <Button
                            type="button"
                            style={{
                                backgroundColor: "#1861bf",
                                borderColor: "#1861bf",
                                marginLeft: "2%",
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                style={{ marginRight: "12px" }}
                            />
                            <strong>Submit</strong>
                        </Button>
                        <Button
                           
                            variant="danger"
                            style={{ marginLeft: "10px" }}
                        >
                            Delete Selected
                        </Button>
                    </Col>
                    <Col md={2}>
                        <Button >
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </div>
  )
}

export default EditBooking
