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
        invoiceamount: 0.00
    });
    const [file, setFile] = useState(null);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        itemName: '',
        itemPrice: '',
        itemQuantity: '',
        itemDescription: ''
    });

    const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0);

    // Fetch booking details by BookingId
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
                invoiceamount: data.invoiceamount
            });
            setItems(data.itemList || []);
        } catch (error) {
            console.error("Error fetching booking data:", error);
        }
    };

    // Fetch booking data on component mount or when BookingId changes
    useEffect(() => {
        fetchBookingById(BookingId);
    }, [BookingId]);

    // Recalculate total invoice amount whenever items change
    useEffect(() => {
        setTotalInvoiceAmount(calculateTotalInvoice());
    }, [items]);

    // Handle input change
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

    // Handle form submission
    const handleSubmit = async () => {
        // Update formData with the current total invoice amount
        const updatedFormData = {
            ...formData,
            invoiceamount: totalInvoiceAmount, // Update invoice amount
        };

        const data = new FormData();
        const blob = new Blob([JSON.stringify(updatedFormData)], { type: 'application/json' });
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
            toast.success("Booking updated successfully!");
        } catch (error) {
            console.error("Error updating booking:", error);
            toast.error('Failed to update booking');
        }
    };


    // Handle adding a new item
    const handleAddItem = async () => {
        if (!newItem.itemName || !newItem.itemPrice || !newItem.itemQuantity) {
            toast.error('Fill all details for new item');
            return;
        }

        const itemData = {
            itemName: newItem.itemName,
            itemPrice: Number(newItem.itemPrice),
            itemQuantity: Number(newItem.itemQuantity),
            itemDescription: newItem.itemDescription,
            subTotal: Number(newItem.itemPrice) * Number(newItem.itemQuantity),
        };

        try {
            await apiClient.post(`http://localhost:8080/api/items/booking/${BookingId}`, {
                itemList: [itemData],
            });

            setNewItem({
                itemName: '',
                itemPrice: '',
                itemQuantity: '',
                itemDescription: '',
            });

            await fetchBookingById(BookingId);
            toast.success('Item Added and Invoice Updated Successfully');
        } catch (error) {
            console.error("Error adding item and updating booking:", error);
            toast.error('Failed to add item or update booking');
        }
    };

    // Handle item deletion
    const handleDeleteItem = async (itemId) => {
        const confirmed = window.confirm("Delete this item from booking details?");
        if (confirmed) {
            try {
                await apiClient.delete(`http://localhost:8080/api/items/booking/${BookingId}/item/${itemId}`);
                toast.success('Item deleted Successfully');
                fetchBookingById(BookingId);
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    // Calculate total invoice amount
    const calculateTotalInvoice = () => {
        return items.reduce((total, item) => total + (item.itemPrice * item.itemQuantity), 0);
    };

    if (!bookingData) return <div>Loading...</div>;

    return (
        <div>
            <Card>
                <Card.Body>
                    <h3>Edit Booking ({bookingData ? bookingData.customer.fullName : ''})</h3>
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
                        <Col md={2}>
                            <Button
                                style={{
                                    backgroundColor: "#1861bf",
                                    borderColor: "#1861bf",
                                    marginTop: "30px",
                                }}
                                onClick={handleAddItem}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Col>
                    </Row>

                    <hr />
                    <h4>Item List</h4>
                    {items.length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Sub Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.itemId}>
                                        <td>{item.itemName}</td>
                                        <td>{item.itemPrice}</td>
                                        <td>{item.itemQuantity}</td>
                                        <td>{item.itemPrice * item.itemQuantity}</td>
                                        <td>
                                            <Button
                                                style={{ backgroundColor: "#e74c3c", borderColor: "#e74c3c" }}
                                                onClick={() => handleDeleteItem(item.itemId)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No items added yet.</p>
                    )}

                    <Row style={{ marginTop: '15px' }}>
                        <Col xs={7}>
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
                        </Col>
                        <Col xs={5}>
                            <h3>Total Invoice Amount: {totalInvoiceAmount.toFixed(2)}</h3>

                        </Col>

                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EditBooking;
