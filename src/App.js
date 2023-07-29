import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min';
import CompCreateFood from './comidasREST/createFood.js';
import CompCreateUser from './usuariosREST/createUser';
import CompLoginUser from './usuariosREST/loginUser';
import CompUpdateUser from './usuariosREST/updateUser';
import CompUpdateFood from './comidasREST/updateFood';
import CompGetDaily from './comidasREST/getFoods';
import CompUpdateFoodv2 from './comidasREST/updateFoodv2';
import CompGetDailyAdmin from './comidasREST/getFoodsAdmin';
import Login from './screens/login';
import Home from './screens/home';
import Comidas from './screens/comidas';
import SignUp from './screens/signup';
import Profile from './screens/profile';
import Logout from './screens/logout';
import Admin from './screens/adminHome';
import Semana from './screens/semana';
import Navbar from './screens/navbar';
import AdminComidas from './screens/adminComidas';
import AdminResidentes from './screens/adminResidentes';
import NavbarAdmin from './screens/navbarAdmin';
import AdminRecuento from './screens/adminRecuento';
import Horarios from './screens/horarios';
import AdminHoja from './screens/adminHoja';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/comidas/create' element={<CompCreateFood/>} />
          <Route path='/comidas/update' element={<CompUpdateFood/>} />
          <Route path='/comidas/updatev2' element={<CompUpdateFoodv2/>} />
          <Route path='/usuarios/create' element={<CompCreateUser/>} />
          <Route path='/usuarios/login' element={<CompLoginUser/>} />
          <Route path='/comidas/profile' element={<CompUpdateUser/>} />
          <Route path='/comidas/daily' element={<CompGetDaily/>} />
          <Route path='/comidas/daily/admin' element={<CompGetDailyAdmin/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/admin' element={<div><Admin/></div>} />
          <Route path='/adminComidas/:day' element={<div><NavbarAdmin/><AdminComidas/></div>} />
          <Route path='/adminHoja/:day' element={<AdminHoja/>} />
          <Route path='/adminRecuento/:day' element={<div><NavbarAdmin/><AdminHoja/></div>} />
          <Route path='/adminResidentes' element={<div><NavbarAdmin/><AdminResidentes/></div>} />
          <Route path='/comidas' element={<div><Navbar/><Comidas/> </div>} />
          <Route path='/semana' element={<div><Navbar/> <Semana/> </div>} />
          <Route path='/profile' element={<div><Navbar/> <Profile/> </div>} />
          <Route path='/horarios' element={<div><Navbar/> <Horarios/> </div>} />
          <Route path='/logout' element={<Logout/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
