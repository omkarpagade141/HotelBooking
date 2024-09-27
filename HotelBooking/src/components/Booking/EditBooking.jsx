import { faCheckCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import apiClient from '../APIClient';
import { toast } from 'react-toastify';

function EditBooking() {
    const { BookingId } = useParams();
    const [bookingData, setBookingData] = useState(null);
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkInTime: '',
        checkOutDate: '',
        checkOutTime: '',
        description: '',
    });
    const [file, setFile] = useState(null);
    const [items, setItems] = useState([]); // State for items
    const [newItem, setNewItem] = useState({
        itemName: '',
        itemPrice: '',
        itemQuantity: '',
        itemDescription: '',
    });

    const fetchBookingById = async (BookingId) => {
        try {
            const response = await apiClient.get(`http://localhost:8080/api/Booking/${BookingId}`);
            const data = response.data;
            setBookingData(data);
            setFormData({
                checkInDate: data.checkInDate,
                checkInTime: data.checkInTime,
                checkOutDate: data.checkOutDate,
                checkOutTime: data.checkOutTime,
                description: data.description,
            });
            setItems(data.itemList || []); // Initialize items
        } catch (error) {
            console.error("Error fetching booking data:", error);
        }
    };

    useEffect(() => {
        fetchBookingById(BookingId);
    }, [BookingId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'uploadImage') {
            setFile(e.target.files[0]);
        } else if (name.startsWith('newItem')) {
            setNewItem({ ...newItem, [name.split('.')[1]]: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async () => {
        const data = new FormData();
        const blob = new Blob([JSON.stringify(formData)], { type: 'application/json' });
        data.append('booking', blob);
        if (file) {
            data.append('image', file);
        }

        try {
            await apiClient.put(`http://localhost:8080/api/Booking/${BookingId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Booking updated successfully!");
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    };

    const handleAddItem = async () => {
        if (!newItem.itemName || !newItem.itemPrice || !newItem.itemQuantity) {
            toast.error('Fill all details for new item')
            return;
        }
        const response = await apiClient.post(`http://localhost:8080/api/items/booking/${BookingId}`,
            {
                "itemList": [{
                    "itemName": newItem.itemName,
                    "itemPrice": newItem.itemPrice,
                    "itemQuantity": newItem.itemQuantity,
                    "subTotal": newItem.itemPrice * newItem.itemQuantity,
                    "itemDescription": newItem.itemDescription
                }
                ]
            }           
        )
        setNewItem({
            itemName: '',
            itemPrice: '',
            itemQuantity: '',
            itemDescription: '',
        })
        fetchBookingById(BookingId)
        toast.success('Item Added Successfully')
        
    };

    const handleDeleteItem = async (itemId) => {
        const confirmed = confirm("delete this item from booking details")

        if (confirmed) {
            try {
                const response = await apiClient.delete(`http://localhost:8080/api/items/booking/${BookingId}/item/${itemId}`)
                if (response.status === 200) {
                    toast.success('Item deleted Successfully')
                    fetchBookingById(BookingId);
                }

            } catch (error) {
                console.log(error);

            }

        }


        // setItems(items.filter(item => item.itemId !== itemId));
    };

    if (!bookingData) return <div>Loading...</div>;

    return (
        <div>
            <Card>
                <Card.Body>
                    <h3>Edit Booking ({bookingData ? bookingData.customer.fullName : ''}) </h3>
                    <hr />
                    <Row>
                        <Col xs={6} md={2}>
                            <Form.Group controlId="checkInDate">
                                <Form.Label><strong>Check-In Date</strong></Form.Label>
                                <Form.Control
                                    type="date"
                                    name="checkInDate"
                                    value={formData.checkInDate}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={2}>
                            <Form.Group controlId="checkInTime">
                                <Form.Label><strong>Check-In Time</strong></Form.Label>
                                <Form.Control
                                    type="time"
                                    name="checkInTime"
                                    value={formData.checkInTime}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={2}>
                            <Form.Group controlId="checkOutDate">
                                <Form.Label><strong>Check-Out Date</strong></Form.Label>
                                <Form.Control
                                    type="date"
                                    name="checkOutDate"
                                    value={formData.checkOutDate}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={2}>
                            <Form.Group controlId="checkOutTime">
                                <Form.Label><strong>Check-Out Time</strong></Form.Label>
                                <Form.Control
                                    type="time"
                                    name="checkOutTime"
                                    value={formData.checkOutTime}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group controlId="uploadImage">
                                <Form.Label><strong>Upload Image</strong></Form.Label>
                                <Form.Control type="file" name="uploadImage" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="description">
                                <Form.Label><strong>Description</strong></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    style={{ height: "100px" }}
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <hr />
                    {/* Items Section */}
                    <h4>Add New Items</h4>
                    <Row>
                        <Col md={3}>
                            <Form.Group controlId="newItem.itemName">
                                <Form.Label><strong>Item Name</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="newItem.itemName"
                                    value={newItem.itemName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="newItem.itemPrice">
                                <Form.Label><strong>Price</strong></Form.Label>
                                <Form.Control
                                    type="number"
                                    name="newItem.itemPrice"
                                    value={newItem.itemPrice}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="newItem.itemQuantity">
                                <Form.Label><strong>Quantity</strong></Form.Label>
                                <Form.Control
                                    type="number"
                                    name="newItem.itemQuantity"
                                    value={newItem.itemQuantity}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="newItem.itemDescription">
                                <Form.Label><strong>Description</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="newItem.itemDescription"
                                    value={newItem.itemDescription}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={1}>
                            <Button onClick={handleAddItem} style={{ marginTop: '30px' }}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Col>
                    </Row>
                    <hr />


                    <Row>
                        <Col>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>SubTotal</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={item.itemId}>
                                            <td>{index + 1}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.itemPrice}</td>
                                            <td>{item.itemQuantity}</td>
                                            <td>{item.itemPrice * item.itemQuantity}</td>
                                            <td>
                                                <Button variant="danger" onClick={() => handleDeleteItem(item.itemId)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Col>
                    </Row>

                    <hr />
                    <Row style={{ marginTop: '15px' }}>
                        <Col xs={10}>
                            <Button
                                type="button"
                                style={{
                                    backgroundColor: "#1861bf",
                                    borderColor: "#1861bf",
                                    marginLeft: "2%",
                                }}
                                onClick={handleSubmit}
                            >
                                <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: "12px" }} />
                                <strong>Submit</strong>
                            </Button>
                            {/* <Button variant="danger" style={{ marginLeft: "10px" }}>
                                Delete Selected
                            </Button> */}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EditBooking;
