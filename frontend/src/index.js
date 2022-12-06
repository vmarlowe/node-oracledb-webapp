import React from "react";
import ReactDOM from "react-dom/client";
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

import Root from "./pages/Root";
import Querytest from "./pages/Querytest";
import ErrorPage from "./pages/error-page";
import Trends from "./pages/trends/trends";

/*
const router = (
  <BrowserRouter>
    <Route exact path="/" element={Root} />
    <Route path="/querytester" component={Querytest} />
  </BrowserRouter>
);
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/querytester",
    element: <Querytest />
  },
  {
    path: "/trends",
    element: <Trends />
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
  />
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
