
import './App.css';

import { useState, useEffect } from 'react';
import Products from './productlist';
import Home from './pages/home';
import About from './pages/about';
import Collection from './pages/collection';
import Contactus from './pages/contactus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/register';
import Login
 from './pages/login';
import { useRoutes} from 'react-router-dom'
import Cart from './pages/cart';
import Profile from './pages/profile';
import Navbar from './navbar'

import Thankyou  from './pages/thankyou';
import Footer from './footer';
import Productpage from './pages/productpage';
import Dashboard from './pages/dashboard';
import Allproductss from './pages/allproducts';



const App = () => {
  let user = localStorage.getItem('hasUser')
  const [isUser, setUser] = useState(false)

  //triggers if has user by logging in or signout
  const getUser= (hasuser) =>setUser(hasuser)
  
  const [productdata, setPdata] = useState([])

  const getData = (pData)=>setPdata(pData) 
  const Routing = () =>{
    let routes = useRoutes([
      { path: "/", element: <Home/> },
      { path: "/about", element: <About/> },
      { path: "/products", element: <Products getData = {getData}/> },
      { path: "/contactus", element: <Contactus/> },
      { path: "/collection", element: <Collection/> },
      { path: "/user-login", element: <Login hasUser = {getUser}/> },
      { path: "/user-registration", element: <Register/> },
      { path: "/Cart", element: <Cart/> },
      { path: "/Profile", element: <Profile/> },
      { path: "/thanks", element: <Thankyou/>},
      { path: "/products/:id", element:<Productpage hasUser = {{isUser}}/>},
      { path: "/admin/dashboard/", element: <Dashboard/>},
    ]);
    return routes;
  }
  
  
  return (

   <div className="App">
    <Navbar props = {isUser} hasUser = {getUser} /> 
    
    <main className='min-h-screen mt-auto'>
    <Routing/> 
    </main>
    <Footer/>
      
      
    </div>

  );
}

export default App;
 