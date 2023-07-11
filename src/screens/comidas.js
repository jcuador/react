import * as React from 'react';
import $, { event } from 'jquery'; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Moment from 'moment'
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { RadioGroup } from '@headlessui/react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { useEffect, useState, Fragment} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import '../styles/comidas.css'  


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

function Comidas() {


    const URI = "http://54.224.159.196:8080/comidas/"

    const [User, setUser] = useState('');
    const [Day, setDay] = useState('');
    const [vector, setVector] = useState([]);   
    const [value, setValue] = React.useState("a");
    const navigate = useNavigate();
    var namesConst = [];

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

    //Se invoca una función que puede modificar el estado de las constantes definidas arriba
    useEffect(() => {
        var today = new Date().getDay(); 
        if(today == 0 || today == 3) {repeat = 1;}
        else if(today == 2 || today == 6) {repeat = 2;}
        else if(today == 1 || today == 5) {repeat = 3;}
        else {repeat = 4;}
        for(var i = 0; i < repeat; i++) {
            setTimeout(getData(i), 3000);
        }

    }, [])

    

    //procedimiento para obtener comidas de un día concreto para un usuario concreto
    const getData = async(number) =>  {

        //Obtenemos el día indicado. Number hace referencia al día actual sumándole number días
        var today = new Date();
        today.setDate(today.getDate() + number + 1);
        var year = today.getFullYear();
        var month = today.getMonth()+1;
        var day = today.getDate();
        var fecha = year + '-' + month + '-' + day;

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
    }
    
    //procedimiento guardar
    const update = (e) => {
        
        //you call e.preventDefault() in the handleSubmit function so you don't accidentally navigate elsewhere
        e.preventDefault();


        //Actualizamos para cada día todas las comidas
        for(var i = 0; i < vector.length; i++) {

            //Obtenemos para cada iteración los valores de los inputs correspondientes
            var dia = vector[i].Dia;
            var groupIdB = "group_" + i + "_0";
            var groupIdL = "group_" + i + "_1";
            var groupIdD = "group_" + i + "_2";

            if(document.querySelector('input[name=' + groupIdB +']:checked') !== null) {
                var breakfast = document.querySelector('input[name=' + groupIdB +']:checked').value;
            } else {var breakfast = 0;}

            if(document.querySelector('input[name=' + groupIdL +']:checked') !== null) {
                var launch = document.querySelector('input[name=' + groupIdL +']:checked').value;
            } else {var launch = 0;}
            
            if(document.querySelector('input[name=' + groupIdD +']:checked') !== null) {
                var dinner = document.querySelector('input[name=' + groupIdD +']:checked').value;
            } else {var dinner = 0;}
            
            

            console.log(breakfast);
            console.log(launch);
            console.log(dinner);
            

            axios.put(URI + myjson.Usuario + '/' + dia + '/' + 1, {User: myjson.Usuario, Day: Moment(dia, 'YYYY-MM-DD').add(1, 'days'), Food: 1, Turn: breakfast});
            axios.put(URI + myjson.Usuario + '/' + dia + '/' + 2, {User: myjson.Usuario, Day: Moment(dia, 'YYYY-MM-DD').add(1, 'days'), Food: 2, Turn: launch});
            axios.put(URI + myjson.Usuario + '/' + dia + '/' + 3, {User: myjson.Usuario, Day: Moment(dia, 'YYYY-MM-DD').add(1, 'days'), Food: 3, Turn: dinner});

            navigate('/home');
        }
    }

    var actuals = [];

    const onChangeValue = (i,j) => (e) => {
        // Do something
        actuals[i][j] = e.target.value;
        console.log("Actual is now: " + actuals[i+j]);
    }

    const onClicking = (i,j) => (e) => {
        // Do something
        console.log("Is " + e.target.value + " = " + actuals[i][j] + "?");
        if(e.target.value == actuals[i][j]) {e.target.checked = false; actuals[i][j]=-1;}
    }

    const onClickingDefault = (i,j) => (e) => {
        // Do something
        console.log("Is " + e.target.value + " = " + actuals[i][j] + "?");
        if(e.target.value == actuals[i][j] || actuals[i][j] == 0) {e.target.checked = false; actuals[i][j]=-1;}
    }    


    return (
        <div className='container customedFood'>
                <form onSubmit={update}>
            {vector.map((value, i) => {
                //Devuelve día por día
                //Para cada día habrá que crear un vector que contenga el turno de desayuno, comida y cena
                var turnos = [value.Desayuno, value.Comida, value.Cena];
                var dia = new Date(value.Dia).getDay();
                var ndia = new Date(value.Dia).getDate();
                var nmes = new Date(value.Dia).getMonth();
                var nombresS = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
                var nombresM = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
                return (
                    <div>
                        <table className='table'>
                            <tr><th scope='col' colspan='4'>{nombresS[dia]}, {ndia} de {nombresM[nmes]}</th></tr>
                    {turnos.map((turno, j) => {
                        //Devuelve turno por turno
                        //Para cada turno habrá que hacer un form con 3 radio buttons con valores 1, 2 y 3 (depende) y labels Temprano, Normal, Tarde
                        //El valor escogido por defecto será el que indique la variable turno
                        //Se debe poder deseleccionar
                        //Cada botón tiene que tener un id único. Para que no se repitan, tendrán un id compuesto por 'btn' + 'i' + 'j'
                        //Habrá que configurar el formulario de tal modo que cuando se haga click en enviar todos los formularios presenten se envíen
                        //¡¡Adelante!!
                        console.log(turno);
                        //Para cada iteración los ids cambian
                        var temprano = "temp" + "_" + i + "_" + j;
                        var normal = "norm" + "_" + i + "_" + j;
                        var tarde = "tarde" + "_" + i + "_" + j;
                        var group = "group" + "_" + i + "_" + j;
                        actuals[i] = [0,0,0];
                        return (
                            <div>
                                <tr>
                            {j == 0 ? <td>Desayuno</td> : (<></>)}
                            {j == 1 ? <td>Comida</td> : (<></>)}
                            {j == 2 ? <td>Cena</td> : <></>}
    
                            <fieldset id={group} onChange={onChangeValue(i,j)}>
                                <td>
                                {j == 2 ? 
                                <p id='txt'>Tempranoooo</p> : 
                                <>
                                {turno == 1 ? 
                                    (<input type="radio" value='1' name={group} id={temprano} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                    : (<input type="radio" value='1' name={group} id={temprano} onClick={onClicking(i,j)} />)
                                }
                                <label for={temprano}>Temprano</label>
                                </>}
                                </td>
        
                                <td>
                                {turno == 2 ? 
                                    (<input type="radio" value='2' name={group} id={normal} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                    : (<input type="radio" value='2' name={group} id={normal} onClick={onClicking(i,j)}/>)
                                }
                                <label for={normal}>Normal</label>
                                </td>
    
                                <td>
                                {j == 0 ?
                                <p id='txt'>Tardeeee</p> :
                                <>
                                {turno == 3 ? 
                                    (<input type="radio" value='3' name={group} id={tarde} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                    : (<input type="radio" value='3' name={group} id={tarde} onClick={onClicking(i,j)}/>)
                                }
                                 <label for={tarde}>Tarde</label>
                                </>
                                }
                                </td>                            
                                
                            </fieldset>
                            </tr>
                            </div>
                        )})}
                        </table>
                        </div>
                )})}
                    <button type="submit" id='subBtn' value="Submit">Enviar</button>
                    
                </form>
          </div>
      );

    }

export default Comidas;



/*
return (
        <div className='container customedFood'>
                <form onSubmit={update}>
            {vector.map((value, i) => {
                //Devuelve día por día
                //Para cada día habrá que crear un vector que contenga el turno de desayuno, comida y cena
                var turnos = [value.Desayuno, value.Comida, value.Cena];
                var dia = new Date(value.Dia).getDay();
                var ndia = new Date(value.Dia).getDate();
                var nmes = new Date(value.Dia).getMonth();
                var nombresS = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
                var nombresM = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
                return (
                    <div>
                        <table className='table'>
                            <tr><th scope='col' colspan='4'>{nombresS[dia]}, {ndia} de {nombresM[nmes]}</th></tr>
                    {turnos.map((turno, j) => {
                        //Devuelve turno por turno
                        //Para cada turno habrá que hacer un form con 3 radio buttons con valores 1, 2 y 3 (depende) y labels Temprano, Normal, Tarde
                        //El valor escogido por defecto será el que indique la variable turno
                        //Se debe poder deseleccionar
                        //Cada botón tiene que tener un id único. Para que no se repitan, tendrán un id compuesto por 'btn' + 'i' + 'j'
                        //Habrá que configurar el formulario de tal modo que cuando se haga click en enviar todos los formularios presenten se envíen
                        //¡¡Adelante!!
                        console.log(turno);
                        //Para cada iteración los ids cambian
                        var temprano = "temp" + "_" + i + "_" + j;
                        var normal = "norm" + "_" + i + "_" + j;
                        var tarde = "tarde" + "_" + i + "_" + j;
                        var group = "group" + "_" + i + "_" + j;
                        actuals[i] = [0,0,0];
                        return (
                            <div>
                                <tr>
                            {j == 0 ? <td>Desayuno</td> : (<></>)}
                            {j == 1 ? <td>Comida</td> : (<></>)}
                            {j == 2 ? <td>Cena</td> : <></>}
    
                            <fieldset id={group} onChange={onChangeValue(i,j)}>
                                <td>
                                {j == 2 ? 
                                <p id='txt'>Tempranoooo</p> : 
                                <>
                                {turno == 1 ? 
                                    (<input type="radio" value='1' name={group} id={temprano} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                    : (<input type="radio" value='1' name={group} id={temprano} onClick={onClicking(i,j)} />)
                                }
                                <label for={temprano}>Temprano</label>
                                </>}
                                </td>
        
                                <td>
                                {turno == 2 ? 
                                    (<input type="radio" value='2' name={group} id={normal} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                    : (<input type="radio" value='2' name={group} id={normal} onClick={onClicking(i,j)}/>)
                                }
                                <label for={normal}>Normal</label>
                                </td>
    
                                <td>
                                {j == 0 ?
                                <p id='txt'>Tardeeee</p> :
                                <>
                                {turno == 3 ? 
                                    (<input type="radio" value='3' name={group} id={tarde} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                    : (<input type="radio" value='3' name={group} id={tarde} onClick={onClicking(i,j)}/>)
                                }
                                 <label for={tarde}>Tarde</label>
                                </>
                                }
                                </td>                            
                                
                            </fieldset>
                            </tr>
                            </div>
                        )})}
                        </table>
                        </div>
                )})}
                    <button type="submit" id='subBtn' value="Submit">Enviar</button>
                    
                </form>
          </div>
      );
}




*/















/*

return (
    <div className='container'>
      <div className='item1'>
            <form onSubmit={update}>
        {vector.map((value, i) => {
            //Devuelve día por día
            //Para cada día habrá que crear un vector que contenga el turno de desayuno, comida y cena
            var turnos = [value.Desayuno, value.Comida, value.Cena];
            var dia = new Date(value.Dia).getDay();
            var ndia = new Date(value.Dia).getDate();
            var nmes = new Date(value.Dia).getMonth();
            var nombresS = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
            var nombresM = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
            return (
                <div className='table-responsive'>
                    <table className='table'>
                        <tr><th scope='col' colspan='4'>{nombresS[dia]}, {ndia} de {nombresM[nmes]}</th></tr>
                {turnos.map((turno, j) => {
                    //Devuelve turno por turno
                    //Para cada turno habrá que hacer un form con 3 radio buttons con valores 1, 2 y 3 (depende) y labels Temprano, Normal, Tarde
                    //El valor escogido por defecto será el que indique la variable turno
                    //Se debe poder deseleccionar
                    //Cada botón tiene que tener un id único. Para que no se repitan, tendrán un id compuesto por 'btn' + 'i' + 'j'
                    //Habrá que configurar el formulario de tal modo que cuando se haga click en enviar todos los formularios presenten se envíen
                    //¡¡Adelante!!
                    console.log(turno);
                    //Para cada iteración los ids cambian
                    var temprano = "temp" + "_" + i + "_" + j;
                    var normal = "norm" + "_" + i + "_" + j;
                    var tarde = "tarde" + "_" + i + "_" + j;
                    var group = "group" + "_" + i + "_" + j;
                    actuals[i] = [0,0,0];
                    return (
                        <div className = 'FoodForm'>
                            <tr>
                        {j == 0 ? <td>Desayuno</td> : (<></>)}
                        {j == 1 ? <td>Comida</td> : (<></>)}
                        {j == 2 ? <td>Cena</td> : <></>}

                        <fieldset id={group} onChange={onChangeValue(i,j)}>
                            <td>
                            {j == 2 ? 
                            <p id='txt'>Tempranoooo</p> : 
                            <>
                            {turno == 1 ? 
                                (<input type="radio" value='1' name={group} id={temprano} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                : (<input type="radio" value='1' name={group} id={temprano} onClick={onClicking(i,j)} />)
                            }
                            <label for={temprano}>Temprano</label>
                            </>}
                            </td>
    
                            <td>
                            {turno == 2 ? 
                                (<input type="radio" value='2' name={group} id={normal} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                : (<input type="radio" value='2' name={group} id={normal} onClick={onClicking(i,j)}/>)
                            }
                            <label for={normal}>Normal</label>
                            </td>

                            <td>
                            {j == 0 ?
                            <p id='txt'>Tardeeee</p> :
                            <>
                            {turno == 3 ? 
                                (<input type="radio" value='3' name={group} id={tarde} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                : (<input type="radio" value='3' name={group} id={tarde} onClick={onClicking(i,j)}/>)
                            }
                             <label for={tarde}>Tarde</label>
                            </>
                            }
                            </td>                            
                            
                        </fieldset>
                        </tr>
                        </div>
                    )})}
                    </table>
                    </div>
            )})}
                <button type="submit" id='subBtn' value="Submit">Enviar</button>
                
            </form>
        </div>
      </div>
  );




*/

/*

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
            <form onSubmit={update}>
        {vector.map((value, i) => {
            //Devuelve día por día
            //Para cada día habrá que crear un vector que contenga el turno de desayuno, comida y cena
            var turnos = [value.Desayuno, value.Comida, value.Cena];
            var dia = new Date(value.Dia).getDay();
            var ndia = new Date(value.Dia).getDate();
            var nmes = new Date(value.Dia).getMonth();
            var nombresS = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
            var nombresM = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
            return (
                <div>
                    <table>
                        <tr><th scope='col' colspan='4'>{nombresS[dia]}, {ndia} de {nombresM[nmes]}</th></tr>
                {turnos.map((turno, j) => {
                    //Devuelve turno por turno
                    //Para cada turno habrá que hacer un form con 3 radio buttons con valores 1, 2 y 3 (depende) y labels Temprano, Normal, Tarde
                    //El valor escogido por defecto será el que indique la variable turno
                    //Se debe poder deseleccionar
                    //Cada botón tiene que tener un id único. Para que no se repitan, tendrán un id compuesto por 'btn' + 'i' + 'j'
                    //Habrá que configurar el formulario de tal modo que cuando se haga click en enviar todos los formularios presenten se envíen
                    //¡¡Adelante!!
                    console.log(turno);
                    //Para cada iteración los ids cambian
                    var temprano = "temp" + "_" + i + "_" + j;
                    var normal = "norm" + "_" + i + "_" + j;
                    var tarde = "tarde" + "_" + i + "_" + j;
                    var group = "group" + "_" + i + "_" + j;
                    actuals[i] = [0,0,0];
                    return (
                        <div class = 'FoodForm'>
                            <tr>
                        {j == 0 ? <td>Desayuno</td> : (<></>)}
                        {j == 1 ? <td>Comida</td> : (<></>)}
                        {j == 2 ? <td>Cena</td> : <></>}

                        <fieldset id={group} onChange={onChangeValue(i,j)}>
                            <td>
                            {j == 2 ? 
                            <></> : 
                            <>
                            {turno == 1 ? 
                                (<input type="radio" value='1' name={group} id={temprano} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                : (<input type="radio" value='1' name={group} id={temprano} onClick={onClicking(i,j)} />)
                            }
                            <label for={temprano}>Temprano</label>
                            </>}
                            </td>
    
                            <td>
                            {turno == 2 ? 
                                (<input type="radio" value='2' name={group} id={normal} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                : (<input type="radio" value='2' name={group} id={normal} onClick={onClicking(i,j)}/>)
                            }
                            <label for={normal}>Normal</label>
                            </td>

                            <td>
                            {j == 0 ?
                            <></> :
                            <>
                            {turno == 3 ? 
                                (<input type="radio" value='3' name={group} id={tarde} onClick={onClickingDefault(i,j)} defaultChecked/>)
                                : (<input type="radio" value='3' name={group} id={tarde} onClick={onClicking(i,j)}/>)
                            }
                             <label for={tarde}>Tarde</label>
                            </>
                            }
                            </td>                            
                            
                        </fieldset>
                        </tr>
                        </div>
                    )})}
                    </table>
                    </div>
            )})}
                <button type="submit" id='subBtn' value="Submit">Enviar</button>
                
            </form>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
  </div>




*/