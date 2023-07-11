import React from 'react';
import axios from 'axios';
import Moment from 'moment';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';



const AdminRecuento = () => {

    const URI = "http://54.224.159.196:8080/comidas/daily/"


    //Obtenemos el día
    const [varURL, setvarURL] = useState(useParams().day);
    const [vector, setVector] = useState([]);

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
  
        console.log(fecha);
        
        //conseguimos a todos los residentes
        const residentes = await axios.get("http://54.224.159.196:8080/comidas/login/");
        
        //conseguimos todas las comidas del día señalado por fecha
        const res = await axios.get(URI + fecha);
  
        //vector sobre el que volcar los datos
        var vec = [{'Desayunos': 0, 'DTempranos': 0, 'DNormales': 0, 'Comidas': 0, 'CTempranas': 0, 'CNormales': 0, 'CTardes': 0, 'Cenas': 0, 'CeNormales': 0, 'CeTardes': 0}];
  
        //contadores de desayunos, comidas y cenas
        var cDes = 0, cDesT = 0, cDesN = 0, cCom = 0, cComT = 0, cComN = 0, cComTa = 0, CCen = 0, cCenN = 0, cCenT = 0;
        
        //para cada comida obtenida, verificamos si es desayuno, comida o cena y lo contamos
        for(var j = 0; j < res.data.length; j++) {
  
          //comprobamos qué comida y turno es
          var comida = res.data[j].Food;
          var turno = res.data[j].Turn;
          if(comida == 1) {
              cDes++;
              if(turno == 1) {cDesT++;}
              else if(turno == 2) {cDesN++;}
          }
          else if(comida == 2) {
              cCom++;
              if(turno == 1) {cComT++;}
              else if(turno == 2) {cComN++;}
              else if(turno == 3) {cComTa++;}
          }
          else if(comida == 3) {
              CCen++;
              if(turno == 2) {cCenN++;}
              else if(turno == 3) {cCenT++;}
          }
      }
         vec[0].Desayunos = cDes;
         vec[0].DTempranos = cDesT;
         vec[0].DNormales = cDesN;
         vec[0].Comidas = cCom;
         vec[0].CTempranas = cComT;
         vec[0].CNormales = cComN;
         vec[0].CTardes = cComTa;
         vec[0].Cenas = CCen;
         vec[0].CeNormales = cCenN;
         vec[0].CeTardes = cCenT;
  
        //actualizamos nuestro vector con la info del vector auxiliar local
        setVector(vec);
      }


    const [filterText, setFilterText] = useState('');
    const [filterColumn, setFilterColumn] = useState('');
  
    return (
      <div className="container customTable" style={{ display: 'flex'}}>
        <div>
        <h2 className='foodName'>Desayunos</h2>
        <table className="table mt-4">
          <thead>
            <tr>
                <th>Tempranos</th>
                <th>Normales</th>
            </tr>
          </thead>
          {vector.map(value => {return (
            <tbody>
                <tr>
                    <td>{value.DTempranos}</td>
                    <td>{value.DNormales}</td>
                </tr>

          </tbody>
            )})}
        </table>
        </div>

          <div>
        <h2 className='foodName'>Comidas</h2>
        <table className="table mt-4">
          <thead>
            <tr>
                <th>Tempranas</th>
                <th>Normales</th>
                <th>Tardes</th>
            </tr>
          </thead>
          {vector.map(value => {return (
            <tbody>
                <tr>
                    <td>{value.CTempranas}</td>
                    <td>{value.CNormales}</td>
                    <td>{value.CTardes}</td>
                </tr>

          </tbody>
            )})}
        </table>
        </div>

            <div>
        <h2 className='foodName'>Cenas</h2>
        <table className="table mt-4">
          <thead>
            <tr>
                <th>Normales</th>
                <th>Tardes</th>
            </tr>
          </thead>
          {vector.map(value => {return (
            <tbody>
                <tr>
                    <td>{value.CeNormales}</td>
                    <td>{value.CeTardes}</td>
                </tr>

          </tbody>
            )})}
        </table>
        </div>
      </div>
    );
}

export default AdminRecuento;

/*
<table className="table mt-4">
          <thead>
            <tr>
                <th scope="col" colspan="2">Desayunos</th>
                <th scope="col" colspan="3">Comidas</th>
                <th scope="col" colspan="2">Cenas</th>
            </tr>
          </thead>
          {vector.map(value => {return (
            <tbody>
                <tr>
                    <td scope="col" colspan="2">{value.Desayunos}</td>
                    <td scope="col" colspan="3">{value.Comidas}</td>
                    <td scope="col" colspan="2">{value.Cenas}</td>
                </tr>
                <tr>
                    <th>Temprano</th>
                    <th>Normales</th>
                    <th>Temprano</th>
                    <th>Normales</th>
                    <th>Tardes</th>
                    <th>Normales</th>
                    <th>Tardes</th>
                </tr>
                <tr>
                    <td>{value.DTempranos}</td>
                    <td>{value.DNormales}</td>
                    <td>{value.CTempranas}</td>
                    <td>{value.CNormales}</td>
                    <td>{value.CTardes}</td>
                    <td>{value.CeNormales}</td>
                    <td>{value.CeTardes}</td>
                </tr>
          </tbody>
            )})}
        </table>

*/