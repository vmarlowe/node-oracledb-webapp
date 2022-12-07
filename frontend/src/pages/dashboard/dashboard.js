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
import Table from 'react-bootstrap/Table';

const tempStyle = {
  padding: '10px 10px 10px 10px',
}

const Dashboard = () => {
  
  let boros = ["BROOKLYN","QUEENS","MANHATTAN","BRONX","STATEN ISLAND"];

  const [bMap,setbMap] = useState(new Map());

  const [totalComp, settotalComp] = useState('200000');

  const [bronxComp, setbronxComp] = useState('40000')
  const [brookComp, setbrookComp] = useState('40000');
  const [queensComp, setqueensComp] = useState('40000');
  const [statComp, setstatComp] = useState('40000');
  const [manComp, setmanComp] = useState('40000');

  const getData =()=>{
      let totalQuery = 'SELECT COUNT(*) FROM Complaint';
      fetchData({ queries: [{ sql: totalQuery, id: `sql-0`, index: 0, queryBinds: [] }], concurrency: null }).then((response = {}) => {
        console.log(response); 
        settotalComp(`${response[0]["rows"][0]["COUNT(*)"]}`);
      });

      

      boros.forEach((boro)=>{
        let bQuery = `WITH a AS (SELECT * FROM 
          (Complaint INNER JOIN Complaint_Location 
          ON Complaint.gps_coord = Complaint_Location.gps_coord))
          SELECT BORO_NAME,COUNT(*) AS reports FROM 
          (a INNER JOIN Patrol_Boro
          ON a.patrol_boro_name = Patrol_Boro.Patrol_boro_name)
          WHERE BORO_NAME = '${boro}'
          GROUP BY BORO_NAME`

        fetchData({ queries: [{ sql: bQuery, id: `sql-0`, index: 0, queryBinds: [] }], concurrency: null }).then((response = {}) => {
          console.log(response[0]["rows"][0]["REPORTS"]);
          bMap.set(`${boro}`,`${response[0]["rows"][0]["REPORTS"]}`);
          setbMap(bMap);

          if(boro == 'BRONX'){ setbronxComp(`${response[0]["rows"][0]["REPORTS"]}`); }          
          else if(boro == 'BROOKLYN'){ setbrookComp(`${response[0]["rows"][0]["REPORTS"]}`); }  
          else if(boro == 'QUEENS'){ setqueensComp(`${response[0]["rows"][0]["REPORTS"]}`); }   
          else if(boro == 'MANHATTAN'){ setmanComp(`${response[0]["rows"][0]["REPORTS"]}`); }   
          else if(boro == 'STATEN ISLAND'){ setstatComp(`${response[0]["rows"][0]["REPORTS"]}`); }   

        });
      });

      //setbronxComp(bMap.get('BRONX'));
  }
  
  //run on page reload
  useEffect(() => {
    getData();
  }, []);

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
            <h1>{totalComp}</h1>
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
            <h1>{ manComp }</h1>
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
            <h1>{bronxComp}</h1>
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
            <h1>{queensComp}</h1>
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
            <h1>{brookComp}</h1>
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
            <h1>{statComp}</h1>
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

      <Table striped>
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

export default Dashboard