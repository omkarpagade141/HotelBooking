import React, { useState } from 'react';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../APIClient';
import { toast } from 'react-toastify';

function BasicExample({ customerData }) {
  const [items, setItems] = useState([
    {
      itemName: '',
      itemPrice: '',
      itemQuantity: '',
      subTotal: '',
      itemDescription: '',
    },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  // State for booking details
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [bookingImage, setBookingImage] = useState(null);
  const [bookingDescription, setBookingDescription] = useState('');

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        itemName: '',
        itemPrice: '',
        itemQuantity: '',
        subTotal: '',
        itemDescription: '',
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSelectItem = (index) => {
    const newSelectedItems = selectedItems.includes(index)
      ? selectedItems.filter((i) => i !== index)
      : [...selectedItems, index];
    setSelectedItems(newSelectedItems);
  };

  const handleDeleteItems = () => {
    const newItems = items.filter((_, index) => !selectedItems.includes(index));
    setItems(newItems);
    setSelectedItems([]); // Clear selected items after deletion
  };

  const validateBookingDetails = () => {
    return checkInDate && checkInTime && checkOutDate && checkOutTime;
  };

  const handleSubmit = async () => {
    if (!validateBookingDetails()) {
      toast.error('Please fill in all booking details.');
      return;
    }

    if(bookingImage===null){
        toast.error("Attach Id proof")
        return;
    }

    const formData = new FormData();
    const sendBookingData = {
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      invoiceAmount,
      bookingDescription,
    };

    formData.append(
      'booking',
      new Blob([JSON.stringify(sendBookingData)], { type: 'application/json' })
    );
    formData.append('image', bookingImage);

    try {
      const response = await apiClient.post(
        `http://localhost:8080/api/Booking/reserve/${customerData.customerId}`,
        formData
      );
      if (response.status === 200) {
        const bookId = response.data.bookingId;

        // Prepare itemList from items only if they are filled
        const itemList = items
          .filter(
            (item) => item.itemName && item.itemPrice && item.itemQuantity
          )
          .map((item) => ({
            itemName: item.itemName,
            itemPrice: Number(item.itemPrice),
            itemQuantity: Number(item.itemQuantity),
            subTotal: Number(item.subTotal),
            itemDescription: item.itemDescription,
          }));

        // Only make the second API call if there are valid items
        if (itemList.length > 0) {
          const responseSaveItem = await apiClient.post(
            `http://localhost:8080/api/items/booking/${bookId}`,
            { itemList }
          );
          if (responseSaveItem.status === 200) {
            toast.success('Booking and items added successfully');
          }
        } else {
          toast.success('Booking created successfully');
        }

        // Clear all states after successful submission
        setCheckInDate('');
        setCheckInTime('');
        setCheckOutDate('');
        setCheckOutTime('');
        setInvoiceAmount(0);
        setBookingImage(null);
        setItems([
          {
            itemName: '',
            itemPrice: '',
            itemQuantity: '',
            subTotal: '',
            itemDescription: '',
          },
        ]);
        setSelectedItems([]);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while submitting the booking.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <h3>Add Booking</h3>
        <hr />
        <Row style={{ marginRight: '5px', marginBottom: '5px' }}>
          <Col xs={6} md={2}>
            <Form.Group controlId="checkInDate">
              <Form.Label>
                <strong>Check-In Date</strong>
              </Form.Label>
              <Form.Control
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={6} md={2}>
            <Form.Group controlId="checkInTime">
              <Form.Label>
                <strong>Check-In Time</strong>
              </Form.Label>
              <Form.Control
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={6} md={2}>
            <Form.Group controlId="checkOutDate">
              <Form.Label>
                <strong>Check-Out Date</strong>
              </Form.Label>
              <Form.Control
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={6} md={2}>
            <Form.Group controlId="checkOutTime">
              <Form.Label>
                <strong>Check-Out Time</strong>
              </Form.Label>
              <Form.Control
                type="time"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="uploadImage">
              <Form.Label>
                <strong>Upload Image</strong>
              </Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setBookingImage(e.target.files[0])}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Label>
                <strong>Description</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setBookingDescription(e.target.value)}
                style={{ height: '100px' }}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={1}>
            <strong>Check</strong>
          </Col>
          <Col xs={2}>
            <strong>Item Name</strong>
          </Col>
          <Col xs={2}>
            <strong>Cost</strong>
          </Col>
          <Col xs={2}>
            <strong>Quantity</strong>
          </Col>
          <Col xs={2}>
            <strong>SubTotal</strong>
          </Col>
          <Col xs={2}>
            <strong>Item Description</strong>
          </Col>
          <Col xs={1}></Col>
        </Row>

        {items.map((item, index) => (
          <Row
            key={index}
            className="align-items-center"
            style={{ marginBottom: '10px' }}
          >
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
                onChange={(e) =>
                  handleChange(index, 'itemName', e.target.value)
                }
              />
            </Col>
            <Col xs={2}>
              <Form.Control
                type="number"
                placeholder="Enter Cost"
                value={item.itemPrice}
                onChange={(e) =>
                  handleChange(index, 'itemPrice', e.target.value)
                }
              />
            </Col>
            <Col xs={2}>
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
                value={item.itemQuantity}
                onChange={(e) =>
                  handleChange(index, 'itemQuantity', e.target.value)
                }
              />
            </Col>
            <Col xs={2}>
              <Form.Control
                type="number"
                placeholder="SubTotal"
                value={item.subTotal}
                onChange={(e) =>
                  handleChange(index, 'subTotal', e.target.value)
                }
              />
            </Col>
            <Col xs={2}>
              <Form.Control
                type="text"
                placeholder="Add Item Desc."
                value={item.itemDescription}
                onChange={(e) =>
                  handleChange(index, 'itemDescription', e.target.value)
                }
              />
            </Col>
          </Row>
        ))}

        <Row style={{ marginTop: '15px' }}>
          <Col xs={10}>
            <Button
              type="button"
              onClick={handleSubmit}
              style={{
                backgroundColor: '#1861bf',
                borderColor: '#1861bf',
                marginLeft: '2%',
              }}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ marginRight: '12px' }}
              />
              <strong>Submit</strong>
            </Button>
            <Button
              onClick={handleDeleteItems}
              variant="danger"
              style={{ marginLeft: '10px' }}
            >
              Delete Selected
            </Button>
          </Col>
          <Col md={2}>
            <Button onClick={handleAddItem}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;
