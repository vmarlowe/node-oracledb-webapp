import React, { useState } from "react";
import { fetchData } from "../../api";
import Button from "../../components/Button";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import 'chart.js/auto'
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, Title);



const Trends = () => {
//populate pie data
//these need to exist outside of getvicSexPieData because of useState hooks
const [resArr, setResArr] = useState(['M','F']);
const [resArrData, setResArrData] = useState([1,1]);

//do only on page reload
const getvicSexPieData =()=>{
    let pieAttrib = "VIC_SEX"
    let pieTable = "Complaint"

    let pieQuery = `SELECT UNIQUE ${pieAttrib} FROM ${pieTable}`;
    let pieArr = [];

    pieArr.push({ sql: pieQuery, id: `sql-0`, index: 0, queryBinds: [] });
    //grab unique values of the attribute from the table to use as labels

    fetchData({ queries: pieArr, concurrency: null }).then((response) => {
        //we can use "0" here since theres only one query.
        //the first [] corresponds to the query index, and will start at 0.
        //query index just what place the query is in when sending multiple queries. 
        setResArr(response["0"]["rows"].map(obj => obj.VIC_SEX));
        console.log("resArr: " + resArr); 
        
        let subqueries = [];
        let tempInd = 0;

        resArr.forEach((i) => {
            let subq = `SELECT COUNT(*) FROM ${pieTable} WHERE ${pieAttrib} = '${i}'`;
            subqueries.push({ sql: subq, id: `sql-${tempInd}`, index: tempInd, queryBinds: []});
            tempInd++;
            //console.log(subqueries);
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
}

const vicSexPieData = {
  //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  labels: resArr,
  datasets: [
    {
      label: '# of Votes',
      //data: [12, 19, 3, 5, 2, 3],
      data: resArrData,
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

    <div class="container">
    <div style={{ margin: '20px 0px 0px 0px' }}>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item active>Trends</Breadcrumb.Item>
    </Breadcrumb>
    </div>
    <div id={"2938"}className="container mt-5">
      
      <div >
        <Pie 
        data={vicSexPieData} 
        height="400px"
        width="400px"
        options={pieOpts}
        />
      </div>

      <center>
      <div style={{ margin: '40px 0px 0px 0px' }}>
      <div class="container">
        <Button title={"Refresh Pie"} id={"001"} onClick={() => (getvicSexPieData())} />
      </div>
      </div>
      </center>
    </div>
    </div>
  );
};

export default Trends;