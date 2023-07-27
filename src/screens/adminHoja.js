import React from 'react';
import axios from 'axios';
import Moment from 'moment';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import '../styles/adminHoja.css'



const AdminHoja = () => {

    const URI = "http://54.224.159.196:8080/comidas/daily/"


    //Obtenemos el día
    const [varURL, setvarURL] = useState(useParams().day);
    const [vector, setVector] = useState([]);
    const [vector2, setVector2] = useState([]);

    //Se invoca una función que puede modificar el estado de las constantes definidas arriba
    useEffect(() => {
      getDayFoods();
      getDayFoods2();
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
        vec[i] = {'Usuario': residentes.data[i].Usuario, 'Nombre' : residentes.data[i].Nombre, 'Habitación' : residentes.data[i].Habitación, 'Desayuno': '', 'Comida': '', 'Cena': '', 'Régimen': residentes.data[i].Régimen};
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

    //procedimiento llamar a todos los desayunos, comidas y cenas de un día en concreto
    const getDayFoods2 = async() => {

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
        setVector2(vec);
      }

    const data = [];
    
    vector.map((value,i) => {
        data.push([(value.Nombre).toString(), (value.Desayuno).toString(), (value.Comida).toString(), (value.Cena).toString(), (value.Régimen).toString()]);
    });
  
    return (
    <html>
        <head>
          <meta charset="UTF-8"/>
          <title>Tabla Bootstrap para imprimir en A4</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"/>
        </head>
        <body class="bodyhoja">
          <div>
            <h2>Residentes</h2>
            <table class="table hoja">
              <thead>
                <tr>
                  <th scope="col" colspan="2">Residentes</th>
                  <th scope="col" colspan="2">Desayuno</th>
                  <th scope="col" colspan="3">Comida</th>
                  <th scope="col" colspan="2">Cena</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="1">Hab.</td>
                  <td colspan="1">Nombre</td>
                  <td colspan="1">Temprano</td>
                  <td colspan="1">Normal</td>
                  <td colspan="1">Temprano</td>
                  <td colspan="1">Normal</td>
                  <td colspan="1">Tarde</td>
                  <td colspan="1">Normal</td>
                  <td colspan="1">Tarde</td>
                  <td>Régimen</td>
                </tr>

                {vector.map((val, index) => {
                    return(
                        <tr>
                    <td colspan="1">{val.Habitación}</td>
                    <td colspan="1">{val.Nombre}</td>
                    {val.Desayuno == 1 ? 
                        <td colspan="1">X</td> :
                        <td colspan="1"></td>
                    }
                    {val.Desayuno == 2 ? 
                        <td colspan="1">X</td> :
                        <td colspan="1"></td>
                    }
                    {val.Comida == 1 ? 
                        <td colspan="1">X</td> :
                        <td colspan="1"></td>
                    }
                    {val.Comida == 2 ? 
                        <td colspan="1">X</td> :
                        <td colspan="1"></td>
                    }
                    {val.Comida == 3 ? 
                        <td colspan="1">X</td> :
                        <td colspan="1"></td>
                    }
                    {val.Cena == 2 ? 
                        <td colspan="1">X</td> :
                        <td colspan="1"></td>
                    }
                    {val.Cena == 3 ? 
                        <td colspan="1">X</td> :
                        <td colspan="1"></td>
                    }
                    <td>{val.Régimen}</td>
                  </tr>

                    );
                })}
              </tbody>
            </table>

            <h2>Total comensales</h2>
            <table class="table hoja">
              <thead>
                <tr>
                  <th scope="col" colspan="2">Desayuno</th>
                  <th scope="col" colspan="3">Comida</th>
                  <th scope="col" colspan="2">Cena</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <td colspan="1">Temprano</td>
                  <td colspan="1">Normal</td>
                  <td colspan="1">Temprano</td>
                  <td colspan="1">Normal</td>
                  <td colspan="1">Tarde</td>
                  <td colspan="1">Normal</td>
                  <td colspan="1">Tarde</td>
                </tr>

                {vector2.map((val, index) => {
                    return (
                        <tr>
                            <td colspan="1">{val.DTempranos}</td>
                            <td colspan="1">{val.DNormales}</td>
                            <td colspan="1">{val.CTempranas}</td>
                            <td colspan="1">{val.CNormales}</td>
                            <td colspan="1">{val.CTardes}</td>
                            <td colspan="1">{val.CeNormales}</td>
                            <td colspan="1">{val.CeTardes}</td>
                        </tr>
                    );
                })}
                
              </tbody>
            </table>

            <h2>Regímenes</h2>
            <table class="table hoja">
              <thead>
                <tr>
                  <th scope="col" colspan="3">Residentes</th>
                  <th scope="col" colspan="2">Desayuno</th>
                  <th scope="col" colspan="3">Comida</th>
                  <th scope="col" colspan="2">Cena</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <td colspan="1">Hab.</td>
                  <td colspan="1">Nombre</td>
                  <td colspan="1">Régimen</td>
                  <td colspan="1">Temprano</td>
                  <td colspan="1">Normal</td>
                  <td colspan="1">Temprano</td>
                  <td colspan="1">Normal</td>
                  <td colspan="1">Tarde</td>
                  <td colspan="1">Normal</td>
                  <td colspan="1">Tarde</td>
                </tr>

                {vector.map((val, index) => {
                    return (
                    <>
                    {val.Régimen !== 0 ?
                            <tr>
                        <td colspan="1">{val.Habitación}</td>
                        <td colspan="1">{val.Nombre}</td>
                        <td colspan="1">{val.Régimen}</td>
                        {val.Desayuno == 1 ? 
                            <td colspan="1">X</td> :
                            <td colspan="1"></td>
                        }
                        {val.Desayuno == 2 ? 
                            <td colspan="1">X</td> :
                            <td colspan="1"></td>
                        }
                        {val.Comida == 1 ? 
                            <td colspan="1">X</td> :
                            <td colspan="1"></td>
                        }
                        {val.Comida == 2 ? 
                            <td colspan="1">X</td> :
                            <td colspan="1"></td>
                        }
                        {val.Comida == 3 ? 
                            <td colspan="1">X</td> :
                            <td colspan="1"></td>
                        }
                        {val.Cena == 2 ? 
                            <td colspan="1">X</td> :
                            <td colspan="1"></td>
                        }
                        {val.Cena == 3 ? 
                            <td colspan="1">X</td> :
                            <td colspan="1"></td>
                        }
                      </tr> : 
                      <></>
                    }
                    </>
                    );
                    })}
                
              </tbody>
            </table>

          </div>
        </body>
        </html>
        


    );
      
}

export default AdminHoja;

/*
<style>
            @media print {
              
              body {
                width: 210mm;
                height: 297mm;
                margin: 0;
                padding: 0;
              }
              
              .table {
                font-size: 10pt;
              }
              
              .table td, .table th {
                word-wrap: break-word;
                max-width: 50mm;
              }
            }
          </style>


*/