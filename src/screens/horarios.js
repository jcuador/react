import * as React from 'react';
import 'bootstrap/dist/js/bootstrap.min';
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'

const Horarios = () => {

//Para acceder a las cookies
const cookies = new Cookies();

//Para convertir la cookie en JSON
var json = JSON.stringify(cookies.get('usuario'));

//Verificamos que el usuario esté registrado
if(json==null) {
    window.location.href='/login';
} else {

    return (
        <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Desayuno</th>
          <th scope="col">Comida</th>
          <th scope="col">Cena</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Temprano</th>
          <td>6.40 - 7.15</td>
          <td>13.30 - 14.00</td>
          <td>-</td>
        </tr>
        <tr>
          <th scope="row">Normal</th>
          <td>7.15 - 9.30</td>
          <td>14.30 - 15.00</td>
          <td>21.00 - 21.30</td>
        </tr>
        <tr>
          <th scope="row">Tarde</th>
          <td>-</td>
          <td>15.45 - 16.15</td>
          <td>22.00</td>
        </tr>
      </tbody>
    </table>
    )

}

}

export default Horarios;