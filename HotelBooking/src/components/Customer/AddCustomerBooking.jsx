import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../APIClient';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

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
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [bookingImage, setBookingImage] = useState(null);
  const [bookingDescription, setBookingDescription] = useState('');
  const [roomContentId, setRoomContentId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [allContents, setAllContents] = useState([]);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(0);
  const [totalItemPrice, setTotalItemPrice] = useState(0);


  // Fetch all room contents
  const fetchAllContents = async () => {
    try {
      const response = await apiClient.get('http://localhost:8080/api/content');
      if (response.status === 200) {
        setAllContents(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filter rooms based on available contents
  const filterRoomsFromAllContents = () => {
    setRooms(allContents.filter((content) => content.section.sectionId === 1));
  };

  const fetchBookedRooms = async () => {
    try {
      const response = await apiClient.post('http://localhost:8080/api/Booking/available-rooms', {
        checkInDate,
        checkInTime,
        checkOutDate,
        checkOutTime,
      });

      if (response.status === 200) {
        setBookedRooms(response.data);

        // Filter rooms after fetching booked rooms
        const availableRooms = rooms.filter(
          (room) => !response.data.some((bookedRoom) => bookedRoom.contentId === room.contentId)
        );
        setFilteredRooms(availableRooms);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checkInDate && checkInTime && checkOutDate && checkOutTime) {
      fetchBookedRooms();
    }
  }, [checkInDate, checkInTime, checkOutTime, checkOutDate]);

  useEffect(() => {
    fetchAllContents();
  }, []);

  useEffect(() => {
    filterRoomsFromAllContents();
  }, [allContents]);

  // Handle room selection
  const handleRoomSelection = (roomId) => {
    setRoomContentId(roomId);
    const selectedRoom = filteredRooms.find((room) => room.contentId === Number(roomId));
    setSelectedRoomPrice(selectedRoom ? selectedRoom.contentPrice : 0);
  };

  // Add new item
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

  // Handle item changes
  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === 'itemPrice' || field === 'itemQuantity') {
      newItems[index].subTotal = newItems[index].itemPrice * newItems[index].itemQuantity || 0;
    }

    setItems(newItems);
  };

  // Handle item selection for deletion (checkbox)
  const handleSelectItem = (index) => {
    const newSelectedItems = selectedItems.includes(index)
      ? selectedItems.filter((i) => i !== index)
      : [...selectedItems, index];
    setSelectedItems(newSelectedItems);
  };

  // Delete selected items
  const handleDeleteItems = () => {
    const newItems = items.filter((_, index) => !selectedItems.includes(index));
    setItems(newItems);
    setSelectedItems([]); // Clear selected items after deletion
  };

  // Calculate the total invoice amount
  useEffect(() => {
    const totalItemCost = items.reduce((acc, item) => acc + Number(item.subTotal), 0);
    setTotalItemPrice(totalItemCost)
    // Calculate the number of days for the room
    const daysDifference = dayjs(checkOutDate).diff(dayjs(checkInDate), 'day') || 1;
    const roomCost = daysDifference * selectedRoomPrice;

    setInvoiceAmount(totalItemCost + roomCost);
  }, [items, selectedRoomPrice, checkInDate, checkOutDate]);

  const validateBookingDetails = () => {
    return checkInDate && checkInTime && checkOutDate && checkOutTime && roomContentId;
  };

  const handleSubmit = async () => {
    if (!validateBookingDetails()) {
      toast.error('Please fill in all booking details.');
      return;
    }

    if (bookingImage === null) {
      toast.error('Attach Id proof');
      return;
    }

    const formData = new FormData();
    const sendBookingData = {
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      invoiceamount:invoiceAmount,
      bookingDescription,
      roomContentId,
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

        // Reset form state
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
                required
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
                required
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
          <Col xs={6} md={2}>
            <Form.Group controlId="roomSelect">
              <Form.Label>
                <strong>Select Room</strong>
              </Form.Label>
              <Form.Control
                as="select"
                value={roomContentId || ''}
                onChange={(e) => handleRoomSelection(e.target.value)}
              >
                <option value="">-- Select a Room --</option>
                {filteredRooms.map((room) => (
                  <option key={room.contentId} value={room.contentId}>
                    {room.contentTitle}  
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Form.Group controlId="bookingImage">
              <Form.Label>
                <strong>Attach ID Proof</strong>
              </Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setBookingImage(e.target.files[0])}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr />
        <h4>Items</h4>
        <Row >
          {items.map((item, index) => (
            <Row key={index} style={{ marginBottom: '10px' }}>
              <Col xs={12} md={1}>
                <Form.Check
                  type="checkbox"
                  // label={selectedItems.includes(index) ? 'Selected' : 'Select'}
                  checked={selectedItems.includes(index)}
                  onChange={() => handleSelectItem(index)}
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId={`itemName-${index}`}>
                  <Form.Control
                    type="text"
                    placeholder="Item Name"
                    value={item.itemName}
                    onChange={(e) =>
                      handleChange(index, 'itemName', e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={2}>
                <Form.Group controlId={`itemPrice-${index}`}>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    value={item.itemPrice}
                    onChange={(e) =>
                      handleChange(index, 'itemPrice', e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={2}>
                <Form.Group controlId={`itemQuantity-${index}`}>
                  <Form.Control
                    type="number"
                    placeholder="Quantity"
                    value={item.itemQuantity}
                    onChange={(e) =>
                      handleChange(index, 'itemQuantity', e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId={`itemDescription-${index}`}>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    value={item.itemDescription}
                    onChange={(e) =>
                      handleChange(index, 'itemDescription', e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

            </Row>
          ))}
        </Row>
        <Row style={{paddingRight:'25px'}}> 
          <Col xs={12} style={{textAlign:'right'}}>  
            <Button
              variant="danger"
              onClick={handleDeleteItems}
              disabled={selectedItems.length === 0}
            >
              Delete Selected Items
            </Button>
            <Button variant="success" onClick={handleAddItem}
            style={{ marginLeft: '10px' }}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Item
            </Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={6}>
            <Form.Group controlId="bookingDescription">
              <Form.Label>
                <strong>Booking Description</strong>
              </Form.Label>
              <Form.Control
                as="textarea"  // Change to textarea
                rows={3}       // Optional: specify the number of visible rows
                placeholder="Describe your booking"
                value={bookingDescription}
                onChange={(e) => setBookingDescription(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Row >
              <Row>
                <Col md={4} style={{ textAlign: 'right', fontSize: '18px',marginBottom:'20px' }}> <strong>Room Price:</strong></Col>
                <Col md={8}>
                  <Form.Group >
                    <Form.Control
                      type="text"
                      value={selectedRoomPrice.toFixed(2) +"  per day"}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4} style={{ textAlign: 'right', fontSize: '18px',marginBottom:'20px' }}> <strong>Item Total:</strong></Col>
                <Col md={8}>
                  <Form.Group >
                    <Form.Control
                      type="text"
                      value={totalItemPrice.toFixed(2)}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4} style={{ textAlign: 'right', fontSize: '18px',marginBottom:'20px' }}> <strong>Net Total:</strong></Col>
                <Col md={8}>
                  <Form.Group >
                    <Form.Control
                      type="text"
                      value={invoiceAmount.toFixed(2)}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>  

            </Row>
          </Col>


        </Row>
        
        <Button
          variant="primary"
          onClick={handleSubmit}
          style={{ marginTop: '10px' }}
        >
          <FontAwesomeIcon icon={faCheckCircle} /> Submit Booking
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;
