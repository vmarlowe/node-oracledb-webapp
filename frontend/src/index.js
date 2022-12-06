import React from "react";
import ReactDom from 'react-dom';
import "../src/main.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";



import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";


import Querytest from "./pages/Querytest";
import ErrorPage from "./pages/error-page";
import Trends from "./pages/trends/trends";
import Dashboard from "./pages/dashboard/dashboard";

/*
const router = (
  <BrowserRouter>
    <Route exact path="/" element={Root} />
    <Route path="/querytester" component={Querytest} />
  </BrowserRouter>
);
*/

/* const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/querytester",
    element: <Querytest />
  },
  
]); */

ReactDom.render (
<React.StrictMode>
  <App />
</React.StrictMode>
, document.getElementById("root")

);





