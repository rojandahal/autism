import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";
import TutorLogin from "./pages/TutorLogin.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./pages/DashBoard.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreateQuestions from "./pages/CreateQuestions.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/create-question",
        element: <CreateQuestions />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/login-tutor",
    element: <TutorLogin />,
  },
  {
    path: "/signup",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
