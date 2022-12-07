import React, { useState, useEffect } from "react";
import { fetchData } from "../../api";
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

const About = () => {
  
  let boros = ["BROOKLYN","QUEENS","MANHATTAN","BRONX","STATEN ISLAND"];

  const [bMap,setbMap] = useState(new Map());

  const [totalTuples, settotalTuples] = useState('2500000');
  const [totalCompTable, settotalComp] = useState('200000');
  const [totalCompLocTable, setCompLocTable] = useState('40000')
  const [totalOffenseTable, setOffenseTable] = useState('40000');
  const [totalResponderTable, setResponderTable] = useState('40000');
  const [totalPatrolBoroTable, setPatrolBoroTable] = useState('40000');
  const [totalPDOffense, setTotalPDOffense] = useState('40000');

  

  const getData =()=>{
      let totalQuery = 'SELECT COUNT(*) FROM Complaint';
      fetchData({ queries: [{ sql: totalQuery, id: `sql-0`, index: 0, queryBinds: [] }], concurrency: null }).then((response = {}) => {
        console.log(response); 
        settotalComp(`${response[0]["rows"][0]["COUNT(*)"]}`);
      });

      

      boros.forEach((boro)=>{
        let bQuery = `SELECT COUNT(*) FROM Complaint_Location`

        fetchData({ queries: [{ sql: bQuery, id: `sql-0`, index: 0, queryBinds: [] }], concurrency: null }).then((response = {}) => {
          console.log(response[0]["rows"][0]["REPORTS"]);
          setCompLocTable(`${response[0]["rows"][0]["COUNT(*)"]}`);

        });
      });

      boros.forEach((boro)=>{
        let bQuery = `SELECT COUNT(*) FROM Offense`

        fetchData({ queries: [{ sql: bQuery, id: `sql-0`, index: 0, queryBinds: [] }], concurrency: null }).then((response = {}) => {
          console.log(response[0]["rows"][0]["REPORTS"]);
          setOffenseTable(`${response[0]["rows"][0]["COUNT(*)"]}`);

        });
      });

      boros.forEach((boro)=>{
        let bQuery = `SELECT COUNT(*) FROM Responder`

        fetchData({ queries: [{ sql: bQuery, id: `sql-0`, index: 0, queryBinds: [] }], concurrency: null }).then((response = {}) => {
          console.log(response[0]["rows"][0]["REPORTS"]);
          setResponderTable(`${response[0]["rows"][0]["COUNT(*)"]}`);

        });
      });

      boros.forEach((boro)=>{
        let bQuery = `SELECT COUNT(*) FROM Patrol_Boro`

        fetchData({ queries: [{ sql: bQuery, id: `sql-0`, index: 0, queryBinds: [] }], concurrency: null }).then((response = {}) => {
          console.log(response[0]["rows"][0]["REPORTS"]);
          setPatrolBoroTable(`${response[0]["rows"][0]["COUNT(*)"]}`);

        });
      });


      boros.forEach((boro)=>{
        let bQuery = `SELECT COUNT(*) FROM PD_Offense`

        fetchData({ queries: [{ sql: bQuery, id: `sql-0`, index: 0, queryBinds: [] }], concurrency: null }).then((response = {}) => {
          console.log(response[0]["rows"][0]["REPORTS"]);
          setTotalPDOffense(`${response[0]["rows"][0]["COUNT(*)"]}`);

        });
      });

      settotalTuples(parseInt(totalCompTable) + parseInt(totalCompLocTable) + parseInt(totalOffenseTable) + parseInt(totalResponderTable) + parseInt(totalPatrolBoroTable) + parseInt(totalPDOffense)) ;

      //setbronxComp(bMap.get('BRONX'));
  }
  
  //run on page reload
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>

    <div className='about'>
    <div class="container">
    <div class="col" style={{ margin: '20px 0px 0px 0px' }}>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item active>About</Breadcrumb.Item>
    </Breadcrumb>
    </div>

  <div class="row">
    <div class="col" style={{ margin: '20px 0px 0px 0px' }}>
    <h4>Within our application, we used the following tables: </h4>
    </div>

    <h6>Total number of tuples in the application: <Badge pill bg="primary">{totalTuples}</Badge></h6>

    <p>This dataset includes all valid felony, misdemeanor, and violation crimes reported to the New York City Police Department (NYPD) for all complete quarters so far this year (2019). For additional details, please see the attached data dictionary in the ‘About’ section.</p>
   
  </div>
  <div class="row">
    <div class="col">
    <div style={{ margin: '20px 0px 20px 0px' }}>
    <Card border="primary" style={{ width: '100%' }}>
        <Card.Header><b>Table: Complaint</b></Card.Header>
        <Card.Body>
          <Card.Title>About</Card.Title>
          <Card.Text>
            This is the primary table within our database. It contains the majority of the data that we used to create our queries. 
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    </div>
    <div class="col">
    <div style={{ margin: '20px 0px 20px 0px' }}>
    <Card border="primary" style={{ width: '100%' }}>
        <Card.Header><b>Table: Complaint Location</b></Card.Header>
        <Card.Body>
          <Card.Title>About</Card.Title>
          <Card.Text>
            This is a supplementary table that helps us get the location of the complaint. 
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
    <h4>Here are the individual tables and their fields:</h4>
    </div>
   
  </div>
</div>


    <div class="container">
  <div class="row">
    <div class="col-sm">
  
    <Card style={{ width: '18rem' }}>
      <Card.Header><b>Table: Complaint</b></Card.Header>
      <Card.Header>Total # of Tuples: <Badge pill bg="primary">{totalCompTable}</Badge></Card.Header>
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
      <Card.Header>Total # of Tuples: <Badge pill bg="primary">{totalCompLocTable}</Badge></Card.Header>
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
      <Card.Header>Total # of Tuples: <Badge pill bg="primary">{totalResponderTable}</Badge></Card.Header>
      <ListGroup variant="flush">
      <ListGroup.Item>Jurisdiction_Code INT NOT NULL,</ListGroup.Item>
      <ListGroup.Item>Jurisdiction_Desc VARCHAR(28) NOT NULL,</ListGroup.Item>
      <ListGroup.Item>PRIMARY KEY (Jurisdiction_Code)</ListGroup.Item>
      </ListGroup>
    </Card>
    </div>

    </div>
    <div class="col-sm">

    <Card style={{ width: '18rem' }}>
      <Card.Header><b>Table: Offense</b></Card.Header>
      <Card.Header>Total # of Tuples: <Badge pill bg="primary">{totalOffenseTable}</Badge></Card.Header>
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
      <Card.Header>Total # of Tuples: <Badge pill bg="primary">{totalPDOffense}</Badge></Card.Header>
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
      <Card.Header><b>Table: Patrol_Boro</b></Card.Header>
      <Card.Header>Total # of Tuples: <Badge pill bg="primary">{totalPatrolBoroTable}</Badge></Card.Header>
      <ListGroup variant="flush">
      <ListGroup.Item>Patrol_Boro_Name VARCHAR(25) NOT NULL,</ListGroup.Item>
      <ListGroup.Item>Boro_Name VARCHAR(25) NOT NULL,</ListGroup.Item>
      <ListGroup.Item>PRIMARY KEY (Patrol_Boro_Name)</ListGroup.Item>
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

export default About