import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import apiClient from '../APIClient';
import { Card, Col, Row, Table } from 'react-bootstrap';

function ViewContent() {
  const { contentID } = useParams();
  const [content, setContent] = useState({})


  const fetchContentById = async (contentID) => {
    const response = await apiClient.get(`/api/content/${contentID}`);
    setContent(response.data);
  };

  useEffect(() => {
    fetchContentById(contentID);
  }, [contentID]);
  return (
    <div>
      <Row>
        <Card>
          <Card.Body>
            <h2>{content ? content.contentTitle : ''}</h2> <hr />
            <Row>


              <Col md={3}  >
                <img src={content ? content.contentImage : ''} alt="content image" />
              </Col>
              <Col md={9} >
                <Table bordered>
                  <thead>
                    <tr>
                    <th width={200}></th>
                    <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Content Title:</strong></td>
                      <td>{content ? content.contentTitle : ''}</td>
                    </tr>
                    <tr>
                      <td><strong>Content Charge/price:</strong></td>
                      <td>{content ? content.contentPrice : ''}</td>
                    </tr>
                    <tr>
                      <td><strong>Content contentSequence:</strong></td>
                      <td>{content ? content.contentSequence : ''}</td>
                    </tr>
                    <tr>
                      <td><strong>Content Img Alt Tag:</strong></td>
                      <td>{content ? content.contentImgAltTag : ''}</td>
                    </tr>
                    <tr>
                      <td><strong>Content Description:</strong></td>
                      <td>{content ? content.contentDescription : ''}</td>
                    </tr>
                    <tr>
                      <td><strong>Content Location:</strong></td>
                      <td>{content ? content.contentLocation : ''}</td>
                    </tr>
                    <tr>
                      <td><strong>Content Link:</strong></td>
                      <td>{content ? content.contentLink : ''}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

          </Card.Body>
        </Card>
      </Row>
    </div>
  )
}

export default ViewContent
