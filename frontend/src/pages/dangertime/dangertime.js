import React, { useState } from "react";
import Button from '../../components/Button'
import { fetchData } from "../../api";

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

*/

const DangerTime =()=> {
    let boros = ["BROOKLYN","QUEENS","MANHATTAN","BRONX","STATEN ISLAND"];
    let hours = []; 
    for (let i = 0; i < 24; i++) { hours.push(`${i}`);}

    //const [resArr, setResArr] = useState(['M','F']);
    const [oMap, setoMapState ] = useState(new Map([]));

    const getData =()=>{
        boros.forEach((boro) => {
        //oMap.push({ boro: boro, counts: [] });
        oMap.set(`${boro}`, [])
        //setoMapState(oMap);

        hours.forEach((hour)=>{
            let mQuery = `WITH a AS (SELECT * FROM 
                (Complaint INNER JOIN Complaint_Location 
                ON Complaint.gps_coord = Complaint_Location.gps_coord))
            SELECT BORO_NAME,COUNT(*) AS reports FROM 
                (a INNER JOIN Patrol_Boro
                ON a.patrol_boro_name = Patrol_Boro.Patrol_boro_name)
            WHERE EXTRACT(HOUR FROM Complaint_From_TM) = ${hour} 
            AND BORO_NAME = '${boro}'
            GROUP BY BORO_NAME`;

            fetchData({ queries: [{ sql: mQuery, id: `sql-0`, index: 0, queryBinds: [] }], concurrency: null }).then((response = {}) => {
                console.log(response[0]["rows"][0]["REPORTS"]); 
                //console.log(oArr[boro]);
                //let count = Number(response[0]["rows"][0]["REPORTS"]);
                //const index = oArr.findIndex(element => element.boro === boro);
                //oArr[index].counts.push(response[0]["rows"][0]["REPORTS"]);
                oMap.get(`${boro}`).push(response[0]["rows"][0]["REPORTS"]);
                //setoMapState(oMap);
            });

        });
        });
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
    
    let labelHours = [];
    for (let i = 0; i < 24; i++) { labelHours.push(`${i}`);}
    const labels = labelHours;
      
    console.log("Brooklyn counts--")
    console.log(oMap.get('BRONX'));

    const colors = [  'rgba(123, 0, 255, 0.5)',  'rgba(255, 123, 0, 0.7)',  'rgba(0, 255, 123, 0.9)',  'rgba(123, 255, 0, 0.3)',  'rgba(255, 0, 123, 0.6)'];
 


    const data = {
        labels,
        datasets: [
          {
            label: 'Brooklyn',
            data: oMap.get('BROOKLYN'),
            borderColor: colors[0],
            backgroundColor: colors[0],
          },
          {
            label: 'Bronx',
            data: oMap.get('BRONX'),
            borderColor: colors[1],
            backgroundColor: colors[1],
          },
          {
            label: 'Manhattan',
            data: oMap.get('MANHATTAN'),
            borderColor: colors[2],
            backgroundColor: colors[2],
          },
          {
            label: 'Queens',
            data: oMap.get('QUEENS'),
            borderColor: colors[3],
            backgroundColor: colors[3],
          },
          {
            label: 'Staten Island',
            data: oMap.get('STATEN ISLAND'),
            borderColor: colors[4],
            backgroundColor: colors[4],
          },
        ],
      };

  return (
    <div className='dt' id='dt1'>
        <div className="d-flex flex-row mb-5">
            <Button title={"Refresh Graph"} id={"dtb-1"} onClick={ () => (getData()) } />
        </div>
        <div><Line options={options} data={data} /></div>
    </div>
  )
}

export default DangerTime