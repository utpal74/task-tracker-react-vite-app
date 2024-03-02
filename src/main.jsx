import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactGa from "react-ga";
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from 'react-router-dom';

const TRACKING_ID = "G-SXL6T8M54Y";
ReactGa.initialize(TRACKING_ID);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

const SendAnalytics = ()=> {
  ReactGa.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
}

reportWebVitals(SendAnalytics);
