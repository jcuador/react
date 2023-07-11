import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { useEffect, useState, Fragment, useLayoutEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'
import '../styles/semana.css'  
import { Label } from '@headlessui/react/dist/components/label/label';


const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        AlbalatEat
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Semana() {


    const URI = "http://54.224.159.196:8080/comidas/"

    const [User, setUser] = useState('');
    const [Day, setDay] = useState('');
    const [vector, setVector] = useState([]);   
    const [value, setValue] = React.useState("a");
    const navigate = useNavigate();
    var namesConst = [];
    var desayunos = [];
    var comidas = [];
    var cenas = [];

    //Para ver cuántos días se han de mostrar
    var repeat = 0;

    //Para acceder a las cookies
    const cookies = new Cookies();

    //Para convertir la cookie en JSON
    var json = JSON.stringify(cookies.get('usuario'));

    //Verificamos que el usuario esté registrado
    if(json==null) {
        window.location.href='/login';
    }

    //Para convertir el JSON en un objeto de JS
    var myjson = JSON.parse(json);

    useEffect(() => {
        const fetchData = async () => {
          for (let i = 0; i < 7; i++) {
            await getData(i);
          }
        };
      
        fetchData();
      }, []);

    //procedimiento para obtener comidas de un día concreto para un usuario concreto
    const getData = async(number) => {

            //Obtenemos el día indicado. Number hace referencia al día actual sumándole number días
            var today = new Date();
            today.setDate(today.getDate() + number);
            var year = today.getFullYear();
            var month = today.getMonth()+1;
            var day = today.getDate();
            var fecha = year + '-' + month + '-' + day;
            console.log(fecha);
            //Creamos un vector en el que introducir día, turno de desayuno, turno de comida y turno de cena
            let vec = {'Dia': fecha, 'Desayuno': '', 'Comida': '', 'Cena': ''};

            //Obtenemos todas las comidas de un día para un usuario
            const res = await axios.get(URI + fecha + '/' + myjson.Usuario);

            //Establecemos las opciones de desayuno, comida y cena del usuario para el día concreto
            for(var i = 0; i < res.data.length; i++) {
                var food = res.data[i].Food;
                var turn = res.data[i].Turn;
                if(food == 1) {vec.Desayuno = turn;}
                else if(food == 2) {vec.Comida = turn;}
                else {vec.Cena = turn;}
            }
            vec.Dia = fecha;
            vector.push(vec);
            setDay(fecha);
            console.log("Funciona" + vector.length);
            
    }

    return (
        <div className='table-responsive'>
        <ThemeProvider theme={defaultTheme}>
        <table class="table">
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    {vector.map((value, i) => {
                //Devuelve día por día
                //Para cada día habrá que crear un vector que contenga el turno de desayuno, comida y cena
                //Para cada día habrá que crear un header con el día y 
                var dia = new Date(value.Dia).getDay();
                var ndia = new Date(value.Dia).getDate();
                var nmes = new Date(value.Dia).getMonth();
                var nombresS = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
                var nombresM = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
                desayunos[i] = value.Desayuno;
                comidas[i] = value.Comida;
                cenas[i] = value.Cena;
                return (
                        <th scope='col'>{nombresS[dia]}, {ndia}</th>
                )})}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope='row'>Desayuno</th>
                    {desayunos.map((val, i) => {
                        console.log(val);
                        if(val == 1) {val = 'Temprano';}
                        else if(val == 2) {val = 'Normal';}
                        else if(val == 3) {val = 'Tarde';}
                        else {val = '-';}
                        return(
                            <td>
                                {val}
                            </td>
                        )
                    })}
                </tr>
                <tr>
                    <th scope='row'>Comida</th>
                    {comidas.map((val, i) => {
                        console.log(val);
                        if(val == 1) {val = 'Temprano';}
                        else if(val == 2) {val = 'Normal';}
                        else if(val == 3) {val = 'Tarde';}
                        else {val = '-';}
                        return(
                            <td>
                                {val}
                            </td>
                        )
                    })}
                </tr>
                <tr>
                    <th scope='row'>Cena</th>
                    {cenas.map((val, i) => {
                        console.log(val);
                        if(val == 1) {val = 'Temprano';}
                        else if(val == 2) {val = 'Normal';}
                        else if(val == 3) {val = 'Tarde';}
                        else {val = '-';}
                        return(
                            <td>
                                {val}
                            </td>
                        )
                    })}
                </tr>
                
                
            </tbody>
        </table>
        </ThemeProvider>
        </div>
    )

  
}

export default Semana;


/*return (
    <div>
    <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: '100vh'}}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={12} component={Paper} elevation={6} backgroundColor= 'white' square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white'
          }}
        >
        <table>
            <tr>
        {vector.map((value, i) => {
            //Devuelve día por día
            //Para cada día habrá que crear un vector que contenga el turno de desayuno, comida y cena
            //Para cada día habrá que crear un header con el día y 
            var dia = new Date(value.Dia).getDay();
            var ndia = new Date(value.Dia).getDate();
            var nmes = new Date(value.Dia).getMonth();
            var nombresS = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
            var nombresM = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
            desayunos[i] = value.Desayuno;
            comidas[i] = value.Comida;
            cenas[i] = value.Cena;
            return (
                <span>
                    <th>{nombresS[dia]}, {ndia}</th>
                </span>
            )})}
            </tr>

            <tr>
                {desayunos.map((val, i) => {
                    return(<td>{val}</td>)
                })}
            </tr>
            </table>
        </Box>
      </Grid>
    </Grid>
    </ThemeProvider>
  </div>
  );*/