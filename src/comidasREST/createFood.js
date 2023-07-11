import React from 'react';
import axios from 'axios'
import { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'

const CompCreateFood = () => {

    const URI = "http://54.224.159.196:8080/comidas"

    const [User, setUser] = useState('');
    const [Day, setDay] = useState('');
    const [Food, setFood] = useState('');
    const [Turn, setTurn] = useState('');
    const navigate = useNavigate();

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault();
        //Para acceder a las cookies
        const cookies = new Cookies();

        //Para convertir la cookie en JSON
        var json = JSON.stringify(cookies.get('usuario'));

        //Para convertir el JSON en un objeto de JS
        var myjson = JSON.parse(json);

        setDay(new Date());

        //Para crear la comida 
        await axios.post(URI, {User: myjson.Usuario, Day: Day, Food: Food, Turn: Turn});

        //console.log(myjson.Usuario);
        //navigate('/');
    }

    //procedimiento generar número de inputs en función del día de la semana
    function inputByDate(number) {
        let input = (
            <form onSubmit={store}>
                <input type='number' value={Food} placeholder='Comida' onChange={(e) => setFood(e.target.value)}/>
                <input type='number' value={Turn} placeholder='Turno' onChange={(e) => setTurn(e.target.value)}/>
                <input type='submit'value='Enviar'/>
            </form>
        );

        return input;
    }
    
    //obtenemos el día de hoy
    var today = new Date().getDay();

    //para el Lunes (1) -> 3
    //para el Martes (2) -> 2
    //para el Miércoles (3) -> 1
    //para el Jueves (4) -> 4
    //para el Viernes (5) -> 3
    //para el Sábado (6) -> 2
    //para el Domingo (0) -> 1 
    function generate() {
        let repeat = [];
        if(today == 1 || today == 5) {for(var i = 0; i < 3; i++) {repeat.push(inputByDate(i));}} 
        else if(today == 2 || today == 6) {for(var i = 0; i < 2; i++) {repeat.push(inputByDate(i));}}
        else if(today == 0 || today == 3) {for(var i = 0; i < 1; i++) {repeat.push(inputByDate(i));}}
        else {for(var i = 0; i < 4; i++) {repeat.push(inputByDate(i));}}
        return repeat;
    }
    

    return (
        <div className='general form'>
            <div className='form1'>
                {generate()}
            </div>
        </div>
    )
}

export default CompCreateFood;
