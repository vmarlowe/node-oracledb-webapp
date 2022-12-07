import React from 'react'
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
    Legend
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
    let qArr = [];
    
    let stime = 0;
    let mQuery = `WITH a AS (SELECT * FROM 
                    (Complaint INNER JOIN Complaint_Location 
                    ON Complaint.gps_coord = Complaint_Location.gps_coord))
                SELECT BORO_NAME,COUNT(*) AS reports FROM 
                    (a INNER JOIN Patrol_Boro
                    ON a.patrol_boro_name = Patrol_Boro.Patrol_boro_name)
                WHERE EXTRACT(HOUR FROM Complaint_From_TM) = ${stime}
                GROUP BY BORO_NAME
                ORDER BY reports DESC`;
    
    qArr.push({ sql: mQuery, id: `sql-0`, index: 0, queryBinds: [] });

    fetchData({ queries: qArr, concurrency: null }).then((response = {}) => {
        console.log(response[0]["rows"]); 
    });

    /*
        let subqueries = [];
        let tempInd = 0;

        resArr.forEach((i) => {
            let subq = `SELECT COUNT(*) FROM ${pieTable} WHERE ${pieAttrib} = '${i}'`;
            let subBinds = [];
            subqueries.push({ sql: subq, id: `sql-${tempInd}`, index: tempInd, queryBinds: []});
            tempInd++;
            console.log(subqueries);
        });

        fetchData({ queries: subqueries, concurrency: null}).then((response1) => {
            //clear out array for pushing - need to change scope to avoid this
            resArrData.splice(0, resArrData.length);
            setResArrData(resArrData);

            for (let count = 0; count < tempInd; count++) {
                //push value to array
                resArrData.push(response1[count]["rows"]["0"]["COUNT(*)"]);
                //update array state - or else you'll get an empty array
                setResArrData(resArrData);
            }
           //console.log(resArrData);
        });


    });
    */
  
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [1,2,3],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: [3,2,1],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

  return (
    <div className='dt' id='dt1'>
        <div><Line options={options} data={data} /></div>
    </div>
  )
}

export default DangerTime