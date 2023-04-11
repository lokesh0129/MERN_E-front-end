import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './pages/About'
import {createBrowserRouter, createRoutesFromElements,Route , RouterProvider} from 'react-router-dom'
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NewProduct from './pages/NewProduct';
import SignUp from './pages/SignUp';
import { store } from './redux/index';
import {Provider} from 'react-redux'
import Cart from './pages/Cart';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"  element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      {/* <Route path='menu' element={<Menu/>}/> */}
      <Route path='menu/:filterby'element={<Menu/>} />
      <Route path='contact' element={<Contact/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='newproduct' element={<NewProduct/>}/>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='cart' element={< Cart/>}/>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
   <RouterProvider router={router} />
   </Provider>
);
 
