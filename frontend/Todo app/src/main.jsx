import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"; 
import Layout from "./Layout.jsx";
import Home from "./components/home/home.jsx";
import Contact from "./components/Contact/contact.jsx";
import About from "./components/About/about.jsx";
import Signup from './components/Signup/signup.jsx';
import Login from './components/Login/login.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="signup" element={<Signup/>} />
      <Route path="login" element={<Login/>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
