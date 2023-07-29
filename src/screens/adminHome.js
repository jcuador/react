import * as React from 'react';
import 'bootstrap/dist/js/bootstrap.min';
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'
import '../styles/adminComidas.css'

function Admin() {

  const navigate = useNavigate();

  const navigateTo = url => async() => {
    navigate('/' + url);
  }

  //Para acceder a las cookies
  const cookies = new Cookies();

  //Para convertir la cookie en JSON
  var json = JSON.stringify(cookies.get('usuario'));
  var json2 = JSON.stringify(cookies.get('contraseña'));

  //Verificamos que el usuario esté registrado
  if(json==null || json !== 'admin' || json2 !== 'aquino') {
      window.location.href='/login';
  } else {

    //Necesitamos obtener la fecha de los 7 días desde hoy
    //El formato será dia xx-mes
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }


    var semana = [];
    var nombresS = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    var nombresM = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    
    for(var i = 0; i < 7; i++) {
      var today = new Date();
      today = today.addDays(i);
      var month = today.getMonth();
      var num = today.getDate();
      var day = today.getDay();
      var fecha = nombresS[day]  + '\n'  + num +  '-' + nombresM[month];
      semana.push(fecha);
    }

    return (
        <div className='adminHome'>
        <img src={require('../media/albalat_logo.png')} width='10%' height='10%' class="img-fluid" alt="Responsive image"/>
        <div className="container mt-4 customed">
          
          <p>Ver comidas</p>
          <div className="d-flex flex-wrap">
            {semana.map((value, i) => {
              return (
                <button className="btn mr-2 mb-2"  onClick={navigateTo('adminComidas/' + i)}>{value.toString()}</button>
              );
            })}
          </div>

          <p>Administración</p>
          <div className="d-flex flex-wrap">
          {semana.map((value, i) => {
              return (
                <button className="btn mr-2 mb-2" onClick={navigateTo('adminRecuento/' + i)}>{value.toString()}</button>
              );
            })}
          </div>

          <p>Más</p>
          <div className="d-flex flex-wrap">
            <button className="btn mr-2 mb-2" onClick={navigateTo('adminResidentes')}>Residentes</button>
            <button className="btn mr-2 mb-2 logout" id='logout' onClick={navigateTo('logout')}>Cerrar Sesión</button>
          </div>

        </div>
        </div>
    );
  
}
}

export default Admin;


/*

 return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Mi Barra de Navegación</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Acerca de</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contacto</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-4">
        <p>Texto debajo de la barra de navegación</p>
        <div className="d-flex">
          <button className="btn btn-primary mr-2">Botón 1</button>
          <button className="btn btn-primary mr-2">Botón 2</button>
          <button className="btn btn-primary mr-2">Botón 3</button>
          <button className="btn btn-primary mr-2">Botón 4</button>
          <button className="btn btn-primary mr-2">Botón 5</button>
          <button className="btn btn-primary mr-2">Botón 6</button>
          <button className="btn btn-primary mr-2">Botón 7</button>
        </div>
      </div>
    </div>
  );
};

export default App;
En este código, hemos utilizado Bootstrap para implementar la barra de navegación en la parte superior (<nav>). A continuación, hemos agregado un texto (<p>) debajo de la barra de navegación y un contenedor (<div>) con los 7 botones (<button>) alineados a la izquierda mediante la clase de Bootstrap d-flex (display flex).

Recuerda que necesitarás tener instalado Bootstrap en tu proyecto de React para que los estilos funcionen correctamente. Puedes instalarlo ejecutando el siguiente comando en la terminal:

Copy code
npm install bootstrap
Espero que esto te ayude a crear la interfaz deseada en React con la barra de navegación, el texto y los botones.









*/



/*
return (
    <html>
    <head>
        <title>Interfaz con Bootstrap</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="../styles/adminComidas.css"/>
    </head>
    <body>
    <div class="container">
        <div class="row justify-content-start">
            <h2>Ver comidas de la semana</h2>
        </div>    
    <div class="row justify-content-start">
      <div class="col">
        <button class="btn btn-primary">Botón 1</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 2</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 3</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 4</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 5</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 6</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 7</button>
      </div>
    </div>
    <div class="row justify-content-start">
            <h2>Administración</h2>
        </div>    
    <div class="row justify-content-start">
      <div class="col">
        <button class="btn btn-primary">Botón 1</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 2</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 3</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 4</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 5</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 6</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Botón 7</button>
      </div>
    </div>
    <div class="row justify-content-start">
        <h2>Más</h2>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-primary">Residentes</button>
      </div>
      <div class="col">
        <button class="btn btn-primary">Cerrar Sesión</button>
      </div>
    </div>
  </div>
    </body>
    </html>
  );

*/