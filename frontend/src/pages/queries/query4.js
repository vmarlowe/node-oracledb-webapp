import React, { useState } from "react";
import Button from '../../components/Button'
import { fetchData } from "../../api";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Pie } from 'react-chartjs-2';

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

const Query2 =()=> {
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
      select complaint_location.patrol_boro_name, sum(season_count)as Spring 
from(
    select cl.patrol_boro_name as Boro,(Extract( Month from cp.complaint_from_dt)) as m, count(cp.complaint_number) as season_count 
    from complaint cp, complaint_location cl
    where cp.gps_coord =cl.gps_coord and (Extract( Month from cp.complaint_from_dt)) <4 and (Extract( Month from cp.complaint_from_dt))>0
    group by cl.patrol_boro_name, (Extract( Month from cp.complaint_from_dt))
    order by cl.patrol_boro_name ,(Extract( Month from cp.complaint_from_dt)) asc) sub, complaint_location
    where complaint_location.patrol_boro_name = sub.Boro group by complaint_location.patrol_boro_name
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

  const vicSexPieData = {
    //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    
    datasets: [
      {
        label: '# of Votes',
        //data: [12, 19, 3, 5, 2, 3],
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
    title:{
      display: true,
      text: 'Gender Chart (change this)',
      fontSize: 18,
      fontColor: '#FFF',
    },
  };
  
  const pieOpts = {
    plugins: { //plugins keyword is super important
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Gender Chart',
        fontSize: 100,
        fontColor: '#FFF',
      },
    },
    maintainAspectRatio: false,
  };

  return (

    <>
    <div class="container">
    <div style={{ margin: '20px 0px 0px 0px' }}>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item active>Query2</Breadcrumb.Item>
    </Breadcrumb>

    <h5>Show total number of complaints for each Patrol_Boro.Boro_Name for Spring.</h5>
     
    <h5>{data[2]}</h5>

    






    </div>

    
    <div className='dt' id='dt1'>
    <Pie 
        data={data} 
        height="200px"
        width="200px"
        
        />
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

export default Query2