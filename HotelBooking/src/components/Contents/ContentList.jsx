import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Dropdown, Pagination } from 'react-bootstrap';
import apiClient from '../APIClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ContentList = () => {
  const navigate = useNavigate();

  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const fetchContents = async () => {
    const response = await apiClient.get('http://localhost:8080/api/content');
    if (response.status === 200) {
      setContents(response.data);
      console.log(response.data);
    }
  };

  const ViewContent = (ccid) => {
    navigate(`/home/viewContent/${ccid}`);
  };

  const deleteContent = async (contentId) => {
    try {
      const confirmed = confirm('confirm delete content');
      if (confirmed) {
        const response = await apiClient.delete(`/api/content/${contentId}`);
        if (response.status === 200) {
          toast.success('Content deleted successfully');
          fetchContents();
        }
      }
    } catch (error) {
      console.log(error);
      console.error('Failed to delete content', error);
    }
  };

  const editContent = (cid) => {
    navigate(`/home/editContent/${cid}`);
  };

  useEffect(() => {
    fetchContents();
  }, []);

  // Logic for pagination
  const totalEntries = contents.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEntries = contents.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEntriesChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when entries per page changes
  };

  return (
    <Row style={{ padding: '20px' }}>
      <Col xs md={12} style={{ padding: '8px' }}>
        <Card>
          <h3 style={{ marginLeft: '15px', marginTop: '5px' }}>
            List of Contents
          </h3>
          <hr />
          <Card.Body>
            <Row style={{ fontSize: '18px' }}>
              <Col xs md={9}>
                <div>
                  <span>Show </span>
                  <select
                    onChange={handleEntriesChange}
                    value={entriesPerPage}
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
              <thead style={{ fontSize: '16px' }}>
                <tr>
                  <th>Section Id</th>
                  <th>Content Id</th>
                  <th>Section Name</th>
                  <th>Content Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((content, index) => (
                  <tr key={index}>
                    <td>{content.section.sectionId}</td>
                    <td>{content.contentId}</td>
                    <td>{content.section.name}</td>
                    <td>{content.contentTitle}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          name="contentActionBtn"
                          id="contentActionBtnId"
                          variant="primary"
                          style={{ height: '30px' }}
                        >
                          Action
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => ViewContent(content.contentId)}
                          >
                            View
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => editContent(content.contentId)}
                          >
                            Edit
                          </Dropdown.Item>
                          {/* <Dropdown.Item onClick={() => deleteContent(content.contentId)}>Delete</Dropdown.Item> */}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div>
              <Row>
                <Col xs md={9} style={{ fontSize: '17px' }}>
                  <p>
                    Showing {startIndex + 1} to{' '}
                    {Math.min(startIndex + entriesPerPage, totalEntries)} of{' '}
                    {totalEntries} entries
                  </p>
                </Col>
                <Col xs md={3} style={{ fontSize: '17px', textAlign: 'end' }}>
                  <Pagination>
                    <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
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
                            onClick={() => handlePageChange(page)}
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

export default ContentList;
