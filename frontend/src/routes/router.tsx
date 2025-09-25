import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Courses from "../Pages/Courses/Courses";
import Batches from "../Pages/Batches/Batches";
import Store from "../Pages/Store/Store";
import ProtectedRoute from "./ProtectedRoute";

import EditProfile from "../Pages/Dashboard/EditProfile";
import MyCourses from "../Pages/Dashboard/MyCourses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/courses", element: <Courses /> },
      { path: "/batches", element: <Batches /> },
      { path: "/store", element: <Store /> },
      {
        path: "/dashboard/my-courses",
        element: (
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);