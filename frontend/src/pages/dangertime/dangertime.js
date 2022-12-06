import React from 'react'

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

*/

const DangerTime =()=> {
    /*
    let mQuery = `SELECT COUNT(*) FROM Patrol_Boro`;
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
           //console.log(resArrData);
        });


    });
    */
  
  return (
    <div className='dt' id='dt1'>
    <div>these are dangerous time we live in - taikan</div>
    </div>
  )
}

export default DangerTime