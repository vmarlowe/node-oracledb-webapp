import React from 'react'
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

const tempStyle = {
  padding: '10px 10px 10px 10px',
}

function dashboard() {
  return (
    <>
    <div className='dashboard'>
    <h3>Use the above menu to navigate to various functionality.</h3>


    <h5>Within our application, we used the following tables. </h5>
    <div style={tempStyle}>
    <Card style={{ width: '18rem', }}>
      <Card.Header>Table: Complaint</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Complaint_Number VARCHAR(11) NOT NULL,</ListGroup.Item>
        <ListGroup.Item>Attempt_Status VARCHAR(15) NOT NULL,</ListGroup.Item>
        <ListGroup.Item>Susp_Sex VARCHAR(1),</ListGroup.Item>
        <ListGroup.Item>Susp_Race VARCHAR(30),</ListGroup.Item>
        <ListGroup.Item>Susp_Age_Group_Min INT,</ListGroup.Item>
        <ListGroup.Item>Susp_Age_Group_Max INT,</ListGroup.Item>
        <ListGroup.Item>Vic_Sex VARCHAR(1),</ListGroup.Item>
        <ListGroup.Item>Vic_Race VARCHAR(30),</ListGroup.Item>
        <ListGroup.Item>Vic_Age_Group_Min INT,</ListGroup.Item>
        <ListGroup.Item>Vic_Age_Group_Max INT,</ListGroup.Item>
        <ListGroup.Item>Complaint_From_DT DATE,</ListGroup.Item>
        <ListGroup.Item>Complaint_From_TM TIMESTAMP,</ListGroup.Item>
        <ListGroup.Item>Complaint_To_DT DATE,</ListGroup.Item>
        <ListGroup.Item>Complaint_To_TM TIMESTAMP,</ListGroup.Item>
        <ListGroup.Item>Offense_Code INT NOT NULL,</ListGroup.Item>
        <ListGroup.Item>GPS_Coord VARCHAR(40) NOT NULL,</ListGroup.Item>
        <ListGroup.Item>Location_Desc VARCHAR(40),</ListGroup.Item>
        <ListGroup.Item>Jurisdiction_Code INT NOT NULL,</ListGroup.Item>
        <ListGroup.Item>--PRIMARY KEY (Complaint_Number, Offense_Code)</ListGroup.Item>
        <ListGroup.Item>PRIMARY KEY (Complaint_Number)</ListGroup.Item>
      </ListGroup>
    </Card>
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