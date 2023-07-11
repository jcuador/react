import React from 'react';
import axios from 'axios';
import Moment from 'moment';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';



const AdminComidas = () => {

    const URI = "http://54.224.159.196:8080/comidas/daily/"


    //Obtenemos el día
    const [varURL, setvarURL] = useState(useParams().day);
    const [vector, setVector] = useState([]);
    const [showOnlyPositiveRegimen, setShowOnlyPositiveRegimen] = useState(false);

    //Se invoca una función que puede modificar el estado de las constantes definidas arriba
    useEffect(() => {
      getDayFoods();
    }, [])

    //procedimiento llamar a todos los desayunos, comidas y cenas de un día en concreto
    const getDayFoods = async() => {

      //obtenemos la fecha actual y actualizamos el valor del objeto Day (param)
      var date = new Date();
      date.setDate(date.getDate() + parseInt(varURL));
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var fecha = year + "-" + month + "-" + day;
      
      //conseguimos a todos los residentes
      const residentes = await axios.get("http://54.224.159.196:8080/comidas/login/");

      //creamos un vector para volcar los datos
      var vec = [];
      
      //creamos un vector con índice cada usuario con campos desayuno, comida y cena
      for(var i = 0; i < residentes.data.length; i++) {
        vec[i] = {'Usuario': residentes.data[i].Usuario, 'Nombre' : residentes.data[i].Nombre, 'Desayuno': '', 'Comida': '', 'Cena': '', 'Régimen': residentes.data[i].Régimen};
      }
      
      //conseguimos todas las comidas del día señalado por fecha
      const res = await axios.get(URI + fecha);
      
      //para cada comida obtenida, buscamos el vector correspondiente y agregamos, en función de la comida, el turno correspondiente
      for(var j = 0; j < res.data.length; j++) {

        //conseguimos el usuario que pide la comida
        var user = res.data[j].User;
        
        //accedemos al índice del vector correspondiente para actualizar la información
        for(var c = 0; c < vec.length; c++) {
          if(vec[c].Usuario == user) {
            var comida = res.data[j].Food;
            if(comida == 1) {vec[c].Desayuno = (res.data[j].Turn);}
            else if(comida == 2) {vec[c].Comida = (res.data[j].Turn);}
            else if(comida == 3) {vec[c].Cena = (res.data[j].Turn);} 
          }
        }
      }

      //actualizamos nuestro vector con la info del vector auxiliar local
      setVector(vec);
      console.log(vec);
    }


    const [filterText, setFilterText] = useState('');
    const [filterColumn, setFilterColumn] = useState('');

    const data = [];
    
    vector.map((value,i) => {
        data.push([(value.Nombre).toString(), (value.Desayuno).toString(), (value.Comida).toString(), (value.Cena).toString(), (value.Régimen).toString()]);
    });
  
    const handleFilterTextChange = (event) => {
      const value = event.target.value;
      setFilterText(value);
    };
  
    const handleFilterColumnChange = (event) => {
      const value = event.target.value;
      if (value === "4") {
        setShowOnlyPositiveRegimen(true);
      } else {
        setShowOnlyPositiveRegimen(false);
      }
      setFilterColumn(value);
      setFilterText('');
    };
  
    const filteredData = filterColumn
      ? data.filter((row) =>
          row[filterColumn].toLowerCase().includes(filterText.toLowerCase())
        )
      : data;
    
      const filteredAndRegimenData = showOnlyPositiveRegimen
      ? filteredData.filter((row) => parseInt(row[4]) > 0)
      : filteredData;
  
    return (
      <div className="container">
        <div className="form-group mt-4">
          <select
            id="filterColumn"
            className="form-control"
            value={filterColumn}
            onChange={handleFilterColumnChange}
          >
            <option value="">--Selecciona Columna--</option>
            <option value="0">Nombre</option>
            <option value="1">Desayuno</option>
            <option value="2">Comida</option>
            <option value="3">Cena</option>
            <option value="4">Régimen</option>
          </select>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Filtrar..."
          value={filterText}
          onChange={handleFilterTextChange}
        />
        <table className="table mt-4 customTable2">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Desayuno</th>
              <th>Comida</th>
              <th>Cena</th>
              <th>Régimen</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndRegimenData.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default AdminComidas;

/*
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'jquery.quicksearch';

const Table = () => {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterText(value);
    $('#table-data').quicksearch('#table-body tr');
  };

  return (
    <div className="container">
      <input
        type="text"
        className="form-control mt-4"
        placeholder="Filtrar..."
        value={filterText}
        onChange={handleFilterChange}
      />
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Columna 1</th>
            <th>Columna 2</th>
            <th>Columna 3</th>
          </tr>
        </thead>
        <tbody id="table-body">
          <tr>
            <td>Fila 1, Columna 1</td>
            <td>Fila 1, Columna 2</td>
            <td>Fila 1, Columna 3</td>
          </tr>
          <tr>
            <td>Fila 2, Columna 1</td>
            <td>Fila 2, Columna 2</td>
            <td>Fila 2, Columna 3</td>
          </tr>
          <tr>
            <td>Fila 3, Columna 1</td>
            <td>Fila 3, Columna 2</td>
            <td>Fila 3, Columna 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;


*/


/*

<body>
        <h1>DÍA</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre y Apellidos</th>
              <th>Desayuno</th>
              <th>Comida</th>
              <th>Cena</th>
            </tr>
          </thead>
          <tbody>
            {vector.map(value => {return (
            <tr>
              <td>{value.Nombre}</td>
              <td>{value.Desayuno}</td>
              <td>{value.Comida}</td>
              <td>{value.Cena}</td>
            </tr>
            )})}
          </tbody>
        </table>
      </body>

*/