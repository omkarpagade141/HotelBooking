import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import apiClient from '../APIClient';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function ExpenseDetails() {
  const { expenseId } = useParams();

  const [expenseDetails, setExpenseDetails] = useState({
    expAmount: '',
    expType: '',
    expDate: '',
    expNote: '',
    expImage: null,
  });
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await apiClient.get(
          `/api/expense/get-expense/${expenseId}`
        );
        setExpenseDetails(response.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch expense details');
      }
    };

    fetchExpense();
  }, [expenseId]);

  const handleUpdateExpense = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      'expenseObj',
      new Blob([JSON.stringify(expenseDetails)], { type: 'application/json' })
    );
    if (expenseDetails.expImage) {
      formData.append('expimage', expenseDetails.expImage);
    }

    try {
      const response = await apiClient.put(
        `/api/expense/update/${expenseId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Expense updated successfully');
        setIsEditing(false);
        // fetchExpense(); // Refresh the expense details
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update expense');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setExpenseDetails((prev) => ({
      ...prev,
      expImage: e.target.files[0],
    }));
  };

  return (
    <Row>
      <Col xs md={2}></Col>
      <Col xs md={8}>
        <Card>
          <Card.Body style={{ padding: '35px', fontSize: '18px' }}>
            <h3 style={{ marginLeft: '12px' }}>Expense Details</h3>
            <hr />

            <Form onSubmit={handleUpdateExpense}>
              <Row>
                <Col xs md={4} style={{ textAlign: 'start' }}>
                  <strong>Expense Amount (in Rs):</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Add Expense in Amount in(Rs)"
                    name="expAmount"
                    value={expenseDetails.expAmount}
                    onChange={handleChange}
                    readOnly={!isEditing}
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
                    name="expType"
                    value={expenseDetails.expType}
                    onChange={handleChange}
                    readOnly={!isEditing}
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
                    name="expDate"
                    value={expenseDetails.expDate}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    style={{ marginBottom: '20px', padding: '5px' }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: 'start' }}>
                  <strong>Note:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    as="textarea"
                    placeholder="Note"
                    name="expNote"
                    value={expenseDetails.expNote}
                    onChange={handleChange}
                    readOnly={!isEditing}
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
                    onChange={handleFileChange}
                    disabled={!isEditing}
                    style={{ marginBottom: '20px', padding: '4px' }}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs md={6}>
                  {isEditing ? (
                    <Button
                      type="submit"
                      style={{ backgroundColor: '#1861bf', marginLeft: '50%' }}
                    >
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{ marginRight: '15px' }}
                      />
                      <strong>Update</strong>
                    </Button>
                  ) : (
                    <Button
                      type="button" // Prevent form submission
                      onClick={() => setIsEditing(true)}
                      style={{ backgroundColor: 'gray', marginLeft: '50%' }}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ marginRight: '15px' }}
                      />
                      <strong>Edit</strong>
                    </Button>
                  )}
                </Col>
                <Col xs md={6}>
                  <Button
                    type="button" // Prevent form submission
                    onClick={() => setIsEditing(false)}
                    style={{ backgroundColor: 'gray', borderColor: 'gray' }}
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ marginRight: '15px' }}
                    />
                    <strong>Cancel</strong>
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

export default ExpenseDetails;
