import React, { useEffect, useState } from "react";
import { fetchData } from "../../api";
import SelectDropdown from "../../components/SelectDropdown";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import Query from "../../components/Query";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import 'chart.js/auto'
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Trends = () => {
  const [queryCount, setQueryCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [checked, setChecked] = useState(false);
  const [concurrency, setConcurrency] = useState(null);
  const queriesDropdown = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const concurrencyDropdown = [1, 2, 3, 4];

  const queryCountHandler = (e) => {
    let selected = e.target.value;
    let arr = [];

    resetResults();
    if (!isNaN(selected)) {
      for (let count = 0; count < selected; count++) {
        arr.push(count);
      }
      setQueryCount(arr);
    } else {
      setQueryCount([]);
    }
  };

  const concurrentCheckedHandler = (e) => {
    let checked = e.target.checked;
    setChecked(checked);
  };

  const executeQueries = () => {
    let arr = [];
    let queryBinds = [];
    queryCount.forEach((i) => {
      let bindCountEle = document.getElementById(`bind-count-${i}`);
      let bindCount = bindCountEle.options[bindCountEle.selectedIndex].value;

      let binds = {};
      for (let count = 0; count < bindCount; count++) {
        let bind = document.getElementById(`bind-${i}`).value;
        let val = document.getElementById(`bind-value-${i}`).value;
        let typeEle = document.getElementById(`bind-type-${i}`);
        let type = typeEle.options[typeEle.selectedIndex].value;
        binds[bind] = {
          val,
          type,
        };
        console.log("try to print binds");
        console.log(binds);
        queryBinds.push(binds);
      }

      // Binds example: { NAME: { val: 'Adrian', type: STRING }, ID: { val: '1234', type: NUMBER } }
      let query = document.getElementById(`sql-${i}`).value;
      if (query) {
        arr.push({ sql: query, id: `sql-${i}`, index: i, queryBinds });
        console.log("attempt to print queryBinds");
        console.log(JSON.stringify(queryBinds));
      }
    });
    setLoading(true);
    fetchData({ queries: arr, concurrency }).then((response) => {
      setResults(response);
      setLoading(!loading);
    });
  };

  // Remove previous results if there are any
  const resetResults = () => {
    if (Object.keys(results).length > 0) {
      setResults([]);
    }
  };

//populate pie data
//these need to exist outside of getvicSexPieData because of useState hooks
const [resArr, setResArr] = useState([]);
const [resArrData, setResArrData] = useState([]);

//do only on page reload
const getvicSexPieData =()=>{
    let pieAttrib = "VIC_SEX"
    let pieTable = "Complaint"

    let pieQuery = `SELECT UNIQUE ${pieAttrib} FROM ${pieTable}`;
    let pieArr = [];

    pieArr.push({ sql: pieQuery, id: `sql-0`, index: 0, queryBinds: [] });
    //grab unique values of the attribute from the table to use as labels


    fetchData({ queries: [{ sql: pieQuery, id: `sql-0`, index: 0, queryBinds: [] }], concurrency: null }).then((response) => {
        //we can use "0" here since theres only one query.
        //the first [] corresponds to the query index, and will start at 0.
        //query index just what place the query is in when sending multiple queries. 
        setResArr(response["0"]["rows"].map(obj => obj.VIC_SEX));
        console.log("resArr: " + resArr); 
        
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

            /*
            console.log(typeof(response1));
            Object.entries(response1["0"]).forEach((a) => {
                resArrData.push(a["rows"]["0"]["COUNT(*)"])
            });
            
            console.log(typeof(response1));
            console.log(Object.keys(response1));
            console.log(pieRes1);
            console.log(pieRes1["0"]["rows"]["0"]["COUNT(*)"]);
            let tm = pieRes1["0"];
            setResArrData(tm.map(obj => obj.rows["0"]["COUNT(*)"]));
            */
           console.log(resArrData);
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
      text: 'Gender Chart (change this)',
      fontSize: 100,
      fontColor: '#FFF',
    },
  },
  maintainAspectRatio: false,
};

  return (
    <div id={"2938"}className="container mt-5">
      <div className="d-flex flex-row mb-5">
        <Button title={"Core"} id={"001"} onClick={() => (executeQueries() + getvicSexPieData())} />
        <Button title={"Clear Results"} onClick={() => resetResults()} />
      </div>
      <div className="d-flex flex-row mb-5">
        <Pie data={vicSexPieData} options={pieOpts}/>
      </div>
      
    </div>
  );
};

export default Trends;