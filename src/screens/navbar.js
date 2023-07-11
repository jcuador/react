import * as React from 'react';
import Cookies from 'universal-cookie';
import "../../node_modules/jquery/dist/jquery.min.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { useState} from 'react'
import "../styles/navbar.css"


function Navbar() {

    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    //Para acceder a las cookies
    const cookies = new Cookies();

    //Para convertir la cookie en JSON
    var json = JSON.stringify(cookies.get('usuario'));

    //Verificamos que el usuario esté registrado
    if(json==null) {
        window.location.href='/login';
    } else {
    
    return (

        <nav class="navbar navbar navbar-expand-md navbar-light navbar-custom">
            <a class="navbar-brand" href="/home"> <img src={require('../media/albalat_logo.png')} width="20" height="20" alt=""/>AlbalatEat</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNavAltMarkup">
                <div class="navbar-nav me-auto">
                    <a class="nav-item nav-link" href="/comidas">Pedir Comidas</a>
                    <a class="nav-item nav-link" href="/semana">Ver Comidas</a>
                    <a class="nav-item nav-link" href="/profile">Modificar Datos</a>
                    <a class="nav-item nav-link" href="/horarios">Horarios Comidas</a>
                    
                </div>

                <div class="custom-nav ms-auto">
                    <a class="nav-item nav-link" href="/logout">Cerrar Sesión</a>
                </div>
            </div>
        </nav>

    );
        
}
}


export default Navbar;

/*
<nav class="navbar navbar-custom">

        <a class="navbar-brand" href="/">
            <img src={require('../media/albalat_logo.png')} alt="Logo" width="36" height="36" className="vertical-align-middle" />
            ALBALAT EAT
        </a>

        <button class="custom-toggler navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample09">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="#">Features</a>
      <a class="nav-item nav-link" href="#">Pricing</a>
      <a class="nav-item nav-link disabled" href="#">Disabled</a>
    </div>
  </div>

        <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
            <a className="nav-link text-info" href="/contact">Support</a>
            <a className="nav-link text-info" href="/login">Login</a>
            <a href="/request-demo" className="btn btn-sm btn-info nav-link text-white" >Request demo</a>
        </div>
        </nav>


*/