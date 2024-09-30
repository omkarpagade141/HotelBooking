import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import apiClient from '../APIClient';
import { useState } from 'react';
import { toast } from 'react-toastify';

function AddExpense() {
  // amt type date note  image
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseNote, setExpenseNote] = useState('');
  const [expenseImage, setExpenseImage] = useState(null);

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const sendingData = {
      expAmount: expenseAmount,
      expType: expenseType,
      expDate: expenseDate,
      expNote: expenseNote,
    };

    // console.log(sendingData);

    // Create formdata obj
    const formData = new FormData();

    //FOr Json Blob
    formData.append(
      'expenseObj',
      new Blob([JSON.stringify(sendingData)], { type: 'application/json' })
    );
    formData.append('expimage', expenseImage);
    try {
      const response = await apiClient.post('/api/expense/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log(response);

      if (response.status === 201) {
        toast.success('Expense added successfully');
        setExpenseAmount('');
        setExpenseType('');
        setExpenseDate('');
        setExpenseNote('');
        setExpenseImage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to add Expense');
    }
  };

  const handleClear = () => {
    setExpenseAmount('');
    setExpenseType('');
    setExpenseDate('');
    setExpenseNote('');
    setExpenseImage(null);
  };

  return (
    <Row>
      <Col xs md={2}></Col>
      <Col xs md={8}>
        <Card>
          <Card.Body style={{ padding: '35px', fontSize: '18px' }}>
            <h3 style={{ marginLeft: '12px' }}>Add Expense</h3>
            <hr />

            <Form onSubmit={(e) => handleAddExpense(e)}>
              <Row>
                <Col xs md={4} style={{ textAlign: 'start' }}>
                  <strong>Expense Amount (in Rs):</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Add Expense in Amount in(Rs)"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    style={{ marginBottom: '20px', padding: '5px' }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: 'start' }}>
                  <strong>Expense Type:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Expense Type"
                    value={expenseType}
                    onChange={(e) => setExpenseType(e.target.value)}
                    style={{ marginBottom: '20px', padding: '5px' }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs md={4} style={{ textAlign: 'start' }}>
                  <strong>Expense Date:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="date"
                    required
                    placeholder="Content Title"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                    style={{ marginBottom: '20px', padding: '5px' }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: 'start' }}>
                  <strong>Note :</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    as="textarea"
                    placeholder="Note"
                    value={expenseNote}
                    onChange={(e) => setExpenseNote(e.target.value)}
                    style={{ marginBottom: '20px', padding: '4px' }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: 'start' }}>
                  <strong>Image:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="file"
                    onChange={(e) => setExpenseImage(e.target.files[0])}
                    style={{ marginBottom: '20px', padding: '4px' }}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs md={6}>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: '#1861bf',
                      marginLeft: '50%',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ marginRight: '15px' }}
                    />
                    <strong>Submit</strong>
                  </Button>
                </Col>
                <Col xs md={6}>
                  <Button
                    onClick={handleClear}
                    style={{
                      backgroundColor: 'gray',
                      borderColor: 'gray',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ marginRight: '15px' }}
                    />
                    <strong>Clear</strong>
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col xs md={2}></Col>
    </Row>
  );
}

export default AddExpense;
