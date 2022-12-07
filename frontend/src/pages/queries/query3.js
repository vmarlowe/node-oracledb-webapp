import React, { useState } from "react";
import Button from '../../components/Button'
import { fetchData } from "../../api";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );
/*
Complex query:
6.2 Which zones (residential, commercial, or public) had the highest percentage increase 
in complaints at night time compared to day time?

For this query, the complaints can be divided by zone, and averages can be taken for day 
time complaints and night time complaints for each zone. The average volume can be mapped 
to the y-axis with day and night hours being as the x-axis. Then, the percentage increase 
would be taken between the volume of daytime complaints and volume of night time complaints, 
and this result can be compared for each zone. 

SQL Query:
WITH a AS 
    (SELECT * FROM 
        (Complaint INNER JOIN Complaint_Location 
        ON Complaint.gps_coord = Complaint_Location.gps_coord))
        
SELECT BORO_NAME,COUNT(*) AS reports FROM 
    (a INNER JOIN Patrol_Boro
        ON a.patrol_boro_name = Patrol_Boro.Patrol_boro_name)
WHERE EXTRACT(HOUR FROM Complaint_From_TM) = 0
GROUP BY BORO_NAME
ORDER BY reports DESC;

QUERY:
WITH tempComp AS (SELECT EXTRACT(HOUR FROM Complaint_From_TM) hour, GPS_Coord, Complaint_Number FROM Complaint),
    tempLoc AS (SELECT GPS_COORD, BORO_NAME FROM Complaint_Location INNER JOIN Patrol_Boro ON Complaint_Location.patrol_boro_name = Patrol_Boro.patrol_boro_name)
SELECT BORO_NAME,HOUR,COUNT(*) FROM tempComp INNER JOIN tempLoc ON tempComp.gps_coord = tempLoc.gps_coord
GROUP BY Boro_Name,HOUR
ORDER BY BORO_NAME,HOUR;


*/

const Query3 =()=> {
  let labelHours = [];
  for (let i = 0; i < 24; i++) { labelHours.push(`${i}`);}
  const labels = labelHours;
    
  //console.log("Brooklyn counts--")
  //console.log(oMap.get('BRONX'));

  const colors = [  'rgba(123, 0, 255, 0.5)',  'rgba(255, 123, 0, 0.7)',  'rgba(0, 255, 123, 0.9)',  'rgba(123, 255, 0, 0.3)',  'rgba(255, 0, 123, 0.6)'];

  const defdata = {
      labels,
      datasets: [
        {
          label: 'Brooklyn',
          data: [1,2,3,4],
          borderColor: colors[0],
          backgroundColor: colors[0],
        },
        {
          label: 'Bronx',
          data: [1,2,3,4],
          borderColor: colors[1],
          backgroundColor: colors[1],
        },
        {
          label: 'Manhattan',
          data: [1,2,3,4],
          borderColor: colors[2],
          backgroundColor: colors[2],
        },
        {
          label: 'Queens',
          data: [1,2,3,4],
          borderColor: colors[3],
          backgroundColor: colors[3],
        },
        {
          label: 'Staten Island',
          data: [1,2,3,4],
          borderColor: colors[4],
          backgroundColor: colors[4],
        },
      ],
    };


    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState({});

    const [data, setData] = useState(defdata);

    const [rowArr, setrowArr] = useState([]);
  
    const boros = ["BROOKLYN","QUEENS","MANHATTAN","BRONX","STATEN ISLAND"];
    let hours = []; 
    for (let i = 0; i < 24; i++) { hours.push(`${i}`);}

    //const [resArr, setResArr] = useState(['M','F']);
    const [oMap, setoMapState ] = useState(new Map());
    const [dataMap, setdataMap ] = useState(new Map());

    const getData =()=>{
      //const tboros = ["BROOKLYN","QUEENS","MANHATTAN","BRONX","STATEN ISLAND"];
      setdataMap(new Map());
      for(let i = 0; i < boros.length; i++){
        console.log(boros[i]);
        dataMap.set(`${boros[i]}`, []);
        //dataMap.set({ boro: boros[i], counts: [] });
        setdataMap(dataMap);
      }
      console.log(dataMap);

      const mQuery = `
      WITH tempComp AS (SELECT EXTRACT(HOUR FROM Complaint_From_TM) hour, GPS_Coord, Complaint_Number 
                        FROM Complaint),
            tempLoc AS (SELECT GPS_COORD, BORO_NAME 
            FROM Complaint_Location INNER JOIN Patrol_Boro 
            ON Complaint_Location.patrol_boro_name = Patrol_Boro.patrol_boro_name)
      SELECT BORO_NAME,HOUR,COUNT(*) 
      FROM tempComp INNER JOIN tempLoc 
      ON tempComp.gps_coord = tempLoc.gps_coord
      GROUP BY Boro_Name,HOUR
      ORDER BY BORO_NAME,HOUR
      `

      let qArr = [];
      qArr.push({ sql: mQuery, id: `sql-0`, index: 0, queryBinds: [] });
      //grab unique values of the attribute from the table to use as labels

      fetchData({ queries: qArr , concurrency: null }).then((response) => {
        setResults(response);
        //setLoading(!loading);
      });

      console.log(results);

      let mapArr = [];
      for(let i = 0; i < results[0]["rows"].length; i++){
          mapArr.push(new Map(Object.entries(results[0]["rows"][i])))
      }
      setrowArr(mapArr);

      console.log(rowArr);
      /*
      for(const b in boros){
        console.log(`${b}`);
        dataMap.set(`${b}`, []);
        setdataMap(dataMap);
      }
      console.log(dataMap);
      */
      /*
      rowArr.forEach((row)=>{
          console.log(`${row['BORO_NAME']}`);
          //dataMap[`${row.BORO_NAME}`].push(Number(row["COUNT(*)"]));
      });
      */
      for(let i = 0; i < rowArr.length; i++){
          const bName = rowArr[i].get("BORO_NAME");
          const count = Number(rowArr[i].get("COUNT(*)"));
          //setdataMap(dataMap.set(`${bName}`, []));
          console.log(dataMap);
          //console.log("bNAme: " + bName + count);
          setdataMap(dataMap.get(`${bName}`).push(count));
          //console.log(dataMap.get(`${rowArr[i].get("BORO_NAME")}`));
          console.log(dataMap);
      }
      
      
      //console.log(rowArr[0]);
      const data = {
        labels,
        datasets: [
          {
            label: 'Brooklyn',
            data: dataMap.get('BROOKLYN'),
            borderColor: colors[0],
            backgroundColor: colors[0],
          },
          {
            label: 'Bronx',
            data: dataMap.get('BRONX'),
            borderColor: colors[1],
            backgroundColor: colors[1],
          },
          {
            label: 'Manhattan',
            data: dataMap.get('MANHATTAN'),
            borderColor: colors[2],
            backgroundColor: colors[2],
          },
          {
            label: 'Queens',
            data: dataMap.get('QUEENS'),
            borderColor: colors[3],
            backgroundColor: colors[3],
          },
          {
            label: 'Staten Island',
            data: dataMap.get('STATEN ISLAND'),
            borderColor: colors[4],
            backgroundColor: colors[4],
          },
        ],
      };
      setData(data);
      setLoading(!loading);
    }

    //chart stuff
    //want to label x and y axis but idk how
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Complaints for each Boro by Time of Day',
          },
          scales: {
            x: {
                display: true,
                text: 'Hour of Day (Why isn\'t this showing up)',
            },
          },
        },
      };
    
 

  if(loading){
    <div className='dt' id='dt1'>
    <div className="d-flex flex-row mb-5">
        <Button title={"Refresh Graph"} id={"dtb-1"} onClick={ () => (getData()) } />
    </div>
    <div>Waiting for DB results</div>
</div>
  }

  return (

    <>
    <div class="container">
    <div style={{ margin: '20px 0px 0px 0px' }}>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item active>Query3</Breadcrumb.Item>
    </Breadcrumb>
    </div>
    
    <div className='dt' id='dt1'>
        <div><Line options={options} data={data} /></div>
        <div style={{ margin: '45px 0px 0px 0px' }}>
          <center>
            <Button title={"Refresh Graph"} id={"dtb-1"} onClick={ () => (getData()) } />
            </center>
        </div>
        </div>
    </div>
    </>
  )
}

export default Query3