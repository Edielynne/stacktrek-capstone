import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Products from './productlist';
import Home from './pages/home';
import About from './pages/about';
import Collection from './pages/collection';
import Contactus from './pages/contactus';
import { BrowserRouter as Router} from 'react-router-dom'
import Navbar from './navbar';
import Cart from './pages/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Dashboard from './pages/dashboard';
axios.defaults.baseURL = 'http://192.168.100.130:5050/'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
    <Router>
    <App /> 
    </Router>
    <ToastContainer autoClose={2000} /> 
  </React.StrictMode>
);

reportWebVitals();
