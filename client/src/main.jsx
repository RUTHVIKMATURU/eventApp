import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./components/Home.jsx";
import RootLayout from "./RootLayout.jsx";
import ViewEvents from "./components/ViewEvents.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import EventById from "./components/EventById.jsx";
import AddEvents from "./components/AddEvents.jsx";
import UpdateEvents from "./components/UpdateEvents.jsx";
import ErrorPage from "./ErrorPage.jsx";
// Define Routes
const browserRouterObj = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { 
        path: "/", 
        element: <Home /> 
      },
      { 
        path: "/events", 
        element: <ViewEvents />
      },
      { 
        path: "/event/:eventid", 
        element: <EventById /> 
      },
      {
        path:"/add-event",
        element:<AddEvents/>
      },
      { 
        path: "/login", 
        element: <Login /> 
      },
      {
        path:"/update-event/:eventid",
        element:<UpdateEvents/>
      },
      { 
        path: "/signup", 
        element: <Signup /> 
      },
      
    ]
  },
  {
      path:"*",
      element:<ErrorPage/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={browserRouterObj} />
  </StrictMode>
);
