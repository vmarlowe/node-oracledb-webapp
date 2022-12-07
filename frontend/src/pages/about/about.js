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

const tempStyle = {
  padding: '10px 10px 10px 10px',
}

function about() {
  return (
    <>
    <div className='about'>
   
    <div class="container">
  <div class="row">
    <div class="col" style={{ margin: '20px 0px 0px 0px' }}>
    <h4>Within our application, we used the following tables: </h4>
    </div>
   
  </div>
  <div class="row">
    <div class="col">
    <div style={{ margin: '20px 0px 20px 0px' }}>
    <Card border="primary" style={{ width: '100%' }}>
        <Card.Header><b>Table: Complaint</b></Card.Header>
        <Card.Body>
          <Card.Title>About</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    </div>
    <div class="col">
    <div style={{ margin: '20px 0px 20px 0px' }}>
    <Card border="primary" style={{ width: '100%' }}>
        <Card.Header><b>Table Name</b></Card.Header>
        <Card.Body>
          <Card.Title>About</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="col" style={{ margin: '20px 0px 15px 0px' }}>
    <h4>Here are the individual table fields:</h4>
    </div>
   
  </div>
</div>


    <div class="container">
  <div class="row">
    <div class="col-sm">
  
    <Card style={{ width: '18rem' }}>
      <Card.Header><b>Table: Complaint</b></Card.Header>
      <Card.Header>Total # of Tuples: <Badge pill bg="primary">1000</Badge></Card.Header>
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
    <div class="col-sm">
      
    <Card style={{ width: '18rem' }}>
      <Card.Header><b>Table: Complaint_Location</b></Card.Header>
      <Card.Header>Total # of Tuples:</Card.Header>
      <ListGroup variant="flush">
      <ListGroup.Item>GPS_Coord VARCHAR (40) NOT NULL,</ListGroup.Item>
      <ListGroup.Item>Latitude INT NOT NULL,</ListGroup.Item>
      <ListGroup.Item>Longitude INT NOT NULL,</ListGroup.Item>
      <ListGroup.Item>Y_Coord INT NOT NULL,</ListGroup.Item>
      <ListGroup.Item>X_Coord INT NOT NULL,</ListGroup.Item>
      <ListGroup.Item>--Location_Desc VARCHAR(15) NOT NULL,</ListGroup.Item>
      <ListGroup.Item> Premise_Type_Desc VARCHAR(35),</ListGroup.Item>
      <ListGroup.Item>--add Patrol boro foreign key</ListGroup.Item>
      <ListGroup.Item>Patrol_Boro_Name VARCHAR(25) NOT NULL,</ListGroup.Item>
      <ListGroup.Item>PRIMARY KEY (GPS_Coord)</ListGroup.Item>
      </ListGroup>
    </Card>

    <div style={{ margin: '20px 0px 0px 0px' }}>
    <Card style={{ width: '18rem' }}>
      <Card.Header><b>Table: Responder</b></Card.Header>
      <Card.Header>Total # of Tuples:</Card.Header>
      <ListGroup variant="flush">
      <ListGroup.Item>Jurisdiction_Code INT NOT NULL,</ListGroup.Item>
      <ListGroup.Item>Jurisdiction_Desc VARCHAR(28) NOT NULL,</ListGroup.Item>
      <ListGroup.Item>PRIMARY KEY (Jurisdiction_Code)</ListGroup.Item>
      </ListGroup>
    </Card>
    </div>

    <div style={{ margin: '20px 0px 0px 0px' }}>
    <Card style={{ width: '18rem' }}>
      <Card.Header><b>Table: Patrol_Boro</b></Card.Header>
      <Card.Header>Total # of Tuples:</Card.Header>
      <ListGroup variant="flush">
      <ListGroup.Item>Patrol_Boro_Name VARCHAR(25) NOT NULL,</ListGroup.Item>
      <ListGroup.Item>Boro_Name VARCHAR(25) NOT NULL,</ListGroup.Item>
      <ListGroup.Item>PRIMARY KEY (Patrol_Boro_Name)</ListGroup.Item>
      </ListGroup>
    </Card>
    </div>
    </div>
    <div class="col-sm">

    <Card style={{ width: '18rem' }}>
      <Card.Header><b>Table: Offense</b></Card.Header>
      <Card.Header>Total # of Tuples:</Card.Header>
      <ListGroup variant="flush">
      <ListGroup.Item> Offense_Code INT NOT NULL,</ListGroup.Item>
      <ListGroup.Item> Offense_Desc VARCHAR(40) NOT NULL,</ListGroup.Item>
      <ListGroup.Item> Offense_Level VARCHAR(40) NOT NULL,</ListGroup.Item>
      <ListGroup.Item> PRIMARY KEY (Offense_Code)</ListGroup.Item>
      </ListGroup>
    </Card>
    <div style={{ margin: '20px 0px 0px 0px' }}>
    <Card style={{ width: '18rem' }}>
      <Card.Header><b>PD_Offense</b></Card.Header>
      <Card.Header>Total # of Tuples:</Card.Header>
      <ListGroup variant="flush">
      <ListGroup.Item> PD_Code INT NOT NULL,</ListGroup.Item>
      <ListGroup.Item> PD_Desc VARCHAR(75) NOT NULL,</ListGroup.Item>
      <ListGroup.Item> Offense_Level VARCHAR(75) NOT NULL,</ListGroup.Item>
      <ListGroup.Item> PRIMARY KEY (PD_Code)</ListGroup.Item>
      </ListGroup>
    </Card>
    </div>

    <div style={{ margin: '20px 0px 0px 0px' }}>
    <Card style={{ width: '18rem' }}>
      <Card.Header><b>Works_In</b></Card.Header>
      <Card.Header>Total # of Tuples:</Card.Header>
      <ListGroup variant="flush">
      <ListGroup.Item> Patrol_Boro_Name VARCHAR(25) NOT NULL,</ListGroup.Item>
      <ListGroup.Item> Jurisdiction_Code INT NOT NULL,</ListGroup.Item>
      <ListGroup.Item> PRIMARY KEY (Patrol_Boro_Name, Jurisdiction_Code)</ListGroup.Item>
      </ListGroup>
    </Card>
    </div>

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

export default about