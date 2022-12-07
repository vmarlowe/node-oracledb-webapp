import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from "./pages/dashboard/dashboard";
import Query from "./pages/query/query";
import Trends from "./pages/trends/trends";
import Tables from "./pages/tables/tables";
import Query1 from "./pages/queries/query1";
import Query2 from "./pages/queries/query1";
import Query3 from "./pages/queries/query1";
import About from "./pages/about/about";


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
          <Route path='/querytool' exact element={<Query/>} />
          <Route path='/query1' exact element={<Query1/>} />
          <Route path='/query2' exact element={<Query2/>} />
          <Route path='/query3' exact element={<Query3/>} />
          <Route path='/about' exact element={<About/>} />
        </Routes>
        </div>
      </Router>
    
  );
}

export default App;