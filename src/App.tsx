import './App.css';

import React from "react";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import "./index.css";
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';

const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployeeList />,
  },
  {
    path: "/add",
    element: <AddEmployee />,
  },
  {
    path: "/:employeeId",
    element: <EditEmployee />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
