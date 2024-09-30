import {
  Row,
  Col,
  Card,
  Table,
  Dropdown,
  Pagination,
  Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import React, { useEffect, useState } from 'react';
import apiClient from '../APIClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ListExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [filterExpensesList, setFilterExpensesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    const response = await apiClient.get('/api/expense/list');
    if (response.status === 200) {
      console.log(response.data);
      setExpenses(response.data);
    }
  };

  const updateExpense = (expenseId) => {
    console.log(expenseId);
    // navigate(`/home/viewCustomer/${id}`);
    navigate(`/home/viewAndUpdateExpense/${expenseId}`);
  };

  const deleteExpense = async (expId) => {
    try {
      const confirmed = confirm('confirm delete expense');
      if (confirmed) {
        const response = await apiClient.delete(`/api/expense/delete/${expId}`);
        if (response.status === 200) {
          toast.success('Expense deleted successfully');
          fetchExpenses();
        }
      }
    } catch (error) {
      console.log(error);
      console.error('Failed to delete expense', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [searchTerm, startDate, endDate, expenses]);

  const filterExpenses = () => {
    let filterExp = expenses;

    if (searchTerm) {
      filterExp = filterExp.filter((exp) =>
        exp.expType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (startDate || endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filterExp = filterExp.filter((i) => {
        const expDate = new Date(i.expDate);
        return (!startDate || expDate >= start) && (!endDate || expDate <= end);
      });
    }

    setFilterExpensesList(filterExp);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  // Logic for pagination
  const totalEntries = expenses.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentExpenses = expenses.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const handlPageChange = (pg) => {
    setCurrentPage(pg);
  };

  const handleEntriesChange = (ev) => {
    setEntriesPerPage(Number(ev.target.value));
    setCurrentPage(1);
  };

  return (
    <Row style={{ padding: '20px' }}>
      <Col xs md={12} style={{ padding: '8px' }}>
        <Card>
          <h3 style={{ marginLeft: '15px', marginTop: '5px' }}>
            List of Expenses
          </h3>
          <hr />
          <Card.Body>
            <Row
              style={{
                backgroundColor: '#d3d3d3',
              }}
            >
              <Col
                xs
                md={5}
                style={{
                  marginBottom: '15px',
                  marginTop: '25px',
                  fontSize: '18px',
                  textAlign: 'end',
                }}
              >
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="From Date"
                />
              </Col>

              <Col
                xs
                md={7}
                style={{
                  marginBottom: '25px',
                  marginTop: '25px',
                  fontSize: '18px',
                  textAlign: 'start',
                }}
              >
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="To Date"
                />
                <Button
                  type="submit"
                  style={{
                    backgroundColor: '#1861bf',
                    borderColor: '#1861bf',
                    marginLeft: '2%',
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ marginRight: '12px' }}
                  />
                  <strong>Search</strong>
                </Button>
              </Col>
            </Row>
            <hr />

            <Row style={{ fontSize: '18px', marginTop: '10px' }}>
              <Col xs md={9}>
                <div>
                  {' '}
                  <span>Show </span>
                  <select
                    onChange={handleEntriesChange}
                    value={entriesPerPage}
                    name=""
                    id=""
                    style={{ width: '50px' }}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                  <span> Entries</span>
                </div>
              </Col>
              <Col xs md={3} style={{ fontSize: '18px', marginBottom: '15px' }}>
                <input
                  type="text"
                  placeholder="Search"
                  style={{ width: '100%', padding: '4px' }}
                />
              </Col>
            </Row>
            <Table
              striped
              bordered
              hover
              style={{ textAlign: 'center', fontSize: '16px' }}
            >
              <thead style={{ fontSize: '16 px' }}>
                <tr>
                  <th>Expense Date</th>
                  <th>Expense Amount</th>
                  <th>Expense Type</th>
                  <th>Expense Note</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentExpenses.map((exp, index) => (
                  <tr key={index}>
                    <td>{formatDate(exp.expDate)}</td>
                    <td>{exp.expAmount}</td>
                    <td>{exp.expType}</td>
                    <td>{exp.expNote}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="primary"
                          style={{ height: '30px' }}
                        >
                          Action
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => updateExpense(exp.expensId)}
                          >
                            View/Edit
                          </Dropdown.Item>
                          <Dropdown.Item>Add Photo</Dropdown.Item>
                          <Dropdown.Item>Add Video</Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => deleteExpense(exp.expensId)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div>
              <Row style={{}}>
                <Col
                  xs
                  md={9}
                  style={{
                    fontSize: '17px',
                  }}
                >
                  <p>
                    Showing {startIndex + 1} to{' '}
                    {Math.min(startIndex + entriesPerPage, totalEntries)} of{' '}
                    {totalEntries} entries
                  </p>
                </Col>
                <Col
                  xs
                  md={3}
                  style={{
                    fontSize: '17px',
                    textAlign: 'end',
                  }}
                >
                  <Pagination>
                    <Pagination.Prev
                      onClick={() => handlPageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {/* <Pagination.Ellipsis />
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item>{4}</Pagination.Item>
                    <Pagination.Item>{5}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Next /> */}
                    {Array.from({ length: totalPages }, (_, i) => {
                      const page = i + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => handlPageChange(page)}
                          >
                            {page}
                          </Pagination.Item>
                        );
                      }
                      if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return <Pagination.Ellipsis key={page} />;
                      }
                      return null;
                    })}
                    <Pagination.Next
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ListExpense;
