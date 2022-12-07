import React from 'react'
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';

const tempStyle = {
  padding: '10px 10px 10px 10px',
}

function dashboard() {
  return (
    <>
    <div className='dashboard'>
   
   
    <div class="container">
    <div style={{ margin: '20px 0px 0px 0px' }}>
    <h4>Complaint Data Overview</h4>
    </div>
  <div class="row">
  <div style={{ margin: '20px 0px 0px 0px' }}>
  <h5>Complaints By Borough</h5>
  </div>
    <div class="col-2" style={{ margin: '0px 10px 0px 10px' }}>
  
    <Card bg="danger" style={{ width: '180px' }}>
        <Card.Body>
          <center>
          <div style={{ color: '#fff' }}>
          <Card.Title>Total Complaints</Card.Title>
          <Card.Text>
            <h1>10485</h1>
          </Card.Text>
          </div>
          </center>
        </Card.Body>
      </Card>
      
      <div style={{ margin: '40px 0px 0px 0px' }}>
      <Card bg="danger" style={{ width: '180px' }}>
        <Card.Body>
          <center>
          <div style={{ color: '#fff' }}>
          <Card.Title>Manhattan Complaints</Card.Title>
          <Card.Text>
            <h1>285</h1>
          </Card.Text>
          </div>
          </center>
        </Card.Body>
      </Card>
      </div>
      

    </div>
    <div class="col-2" style={{ margin: '0px 10px 0px 10px' }}>
      
    <Card bg="danger" style={{ width: '180px' }}>
        <Card.Body>
          <center>
          <div style={{ color: '#fff' }}>
          <Card.Title>Bronx Complaints</Card.Title>
          <Card.Text>
            <h1>400</h1>
          </Card.Text>
          </div>
          </center>
        </Card.Body>
      </Card>

      <div style={{ margin: '40px 0px 0px 0px' }}>
      <Card bg="danger" style={{ width: '180px' }}>
        <Card.Body>
          <center>
          <div style={{ color: '#fff' }}>
          <Card.Title>Queens Complaints</Card.Title>
          <Card.Text>
            <h1>668</h1>
          </Card.Text>
          </div>
          </center>
        </Card.Body>
      </Card>
      </div>


    </div>
    <div class="col-2 style={{ margin: '0px 10px 0px 10px' }}">
    <Card bg="danger" style={{ width: '180px' }}>
        <Card.Body>
          <center>
          <div style={{ color: '#fff' }}>
          <Card.Title>Brooklyn Complaints</Card.Title>
          <Card.Text>
            <h1>336</h1>
          </Card.Text>
          </div>
          </center>
        </Card.Body>
      </Card>

      <div style={{ margin: '40px 0px 0px 0px' }}>
      <Card bg="danger" style={{ width: '180px' }}>
        <Card.Body>
          <center>
          <div style={{ color: '#fff' }}>
          <Card.Title>Staten Island Complaints</Card.Title>
          <Card.Text>
            <h1>158</h1>
          </Card.Text>
          </div>
          </center>
        </Card.Body>
      </Card>
      </div>
    </div>

    <div class="col-2" style={{ margin: '0px 10px 0px 10px' }}>
    <Card bg="dark" style={{ width: '300px' }}>
        <Card.Body>
          <center>
          <div style={{ color: '#fff' }}>
          <Card.Title>Complaints By Zone</Card.Title>
          <Card.Text>
            <h5>Residential</h5>
            <h1>158</h1>

            <h5>Commerial</h5>
            <h1>40</h1>

            <h5>Other</h5>
            <h1>0</h1>
          </Card.Text>
          </div>
          </center>
        </Card.Body>
      </Card>
    </div>

    
  </div>
  <div class="row">
    <div class="col">
    <div style={{ margin: '20px 0px 0px 0px' }}>
      <h5>Last 10 Complaints</h5>
      </div>

      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
    </div>
  </div>
</div>



    
    {/* <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
        <MDBBtn>Button</MDBBtn>
      </MDBCardBody>
    </MDBCard> */}

    </div>
    </>
  )
}

export default dashboard