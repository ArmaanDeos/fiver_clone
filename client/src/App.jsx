import React from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Gigs from "./pages/Gigs/Gigs";
import SingleGig from "./pages/SingleGig/SingleGig";
import Orders from "./pages/Orders/Orders";
import MyGigs from "./pages/myGigs/MyGigs";
import Add from "./pages/AddGigs/Add";
import Messages from "./pages/Messages/Messages";
import SingleMessages from "./pages/SingleMessages/SingleMessages";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";

const App = () => {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gig/:id",
          element: <SingleGig />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/my-gigs",
          element: <MyGigs />,
        },
        {
          path: "/add-gigs",
          element: <Add />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <SingleMessages />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
