import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";




import "bootstrap/dist/css/bootstrap.min.css";

import "./custom/styles.css"; //Core theme CSS (includes Bootstrap)
import "./custom/main.css"; 
//import "bootstrap";
import "./custom/scripts"; //Core theme JS

import Login from "./component/Auth/Login";
import {loader as AppLoader} from './App'
import SignUp from './component/Auth/Signup';
import LinkPayment from './component/Main/LinkPayment';
import Profile from './component/Main/Profile';
import Payment from './component/Main/Payment';
import PaymentResult from './component/Main/PaymentResult';
import ManualPayment from './component/Main/ManualPayment';
import TransferList from './component/Main/TransferList';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    loader: AppLoader,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },

  {
    path: "/link",
    element: <LinkPayment></LinkPayment>,
  },

  {
    path: "/manual",
    element: <ManualPayment></ManualPayment>,
  },

  {
    path: "/profile",
    element: <Profile></Profile>,
  },

  {
    path: "/transfers",
    element: <TransferList></TransferList>,
  },

  {
    path: "/payment",
    element: <Payment></Payment>,
  },

  {
    path: "/payment-result",
    element: <PaymentResult></PaymentResult>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
