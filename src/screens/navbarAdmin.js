import * as React from 'react';
import Cookies from 'universal-cookie';
import "../../node_modules/jquery/dist/jquery.min.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { useState} from 'react'
import "../styles/navbar.css"


function NavbarAdmin() {

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
            <a class="navbar-brand" href="/admin"> <img src={require('../media/albalat_logo.png')} width="20" height="20" alt=""/>AlbalatEat</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNavAltMarkup">
                <div class="navbar-nav me-auto">
                    <a class="nav-item nav-link" href="/adminComidas/0">Ver Comidas</a>
                    <a class="nav-item nav-link" href="/adminRecuento/0">Administración</a>
                    <a class="nav-item nav-link" href="/adminResidentes">Residentes</a>
                    
                </div>

                <div class="custom-nav ms-auto">
                    <a class="nav-item nav-link" href="/logout">Cerrar Sesión</a>
                </div>
            </div>
        </nav>

    );
        
}
}


export default NavbarAdmin;

