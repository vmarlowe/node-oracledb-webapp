import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from "./pages/dashboard/dashboard";
import Query from "./pages/query/query";
import Trends from "./pages/trends/trends";
import Tables from "./pages/tables/tables";
import DangerTime from "./pages/dangertime/dangertime";

import React from 'react'

function App() {
  return (
      <Router>
        <div className='App'>
      <Navbar/>
        <Routes>
          <Route path='/' exact element={<Dashboard/>} />
          <Route path='/trends' exact element={<Trends/>} />
          <Route path='/tables' exact element={<Tables/>} />
          <Route path='/query' exact element={<Query/>} />
          <Route path='/dt' exact element={<DangerTime/>} />
        </Routes>
        </div>
      </Router>
    
  );
}

export default App;