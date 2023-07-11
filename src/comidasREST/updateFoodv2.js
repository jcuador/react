import React from 'react';
import axios from 'axios'
import { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'
import Moment from 'moment'

const CompUpdateFoodv2 = () => {

    const URI = "http://54.224.159.196:8080/comidas/"

    const [User, setUser] = useState('');
    const [Day, setDay] = useState('');
    const [vector, setVector] = useState([]);
    const navigate = useNavigate();

    //Para ver cuántos días se han de mostrar
    var repeat = 0;

    //Para acceder a las cookies
    const cookies = new Cookies();

    //Para convertir la cookie en JSON
    var json = JSON.stringify(cookies.get('usuario'));

    //Para convertir el JSON en un objeto de JS
    var myjson = JSON.parse(json);

    //Se invoca una función que puede modificar el estado de las constantes definidas arriba
    useEffect(() => {
        var today = new Date().getDay()+1; 
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
        var year = today.getFullYear();
        var month = today.getMonth()+1;
        var day = today.getDate()+ 1 + number;
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
            var breakfast = document.getElementById('brk' + i).value;
            var launch = document.getElementById('lau' + i).value;
            var dinner = document.getElementById('din' + i).value;

            axios.put(URI + myjson.Usuario + '/' + dia + '/' + 1, {User: myjson.Usuario, Day: Moment(dia, 'YYYY-MM-DD').add(1, 'days'), Food: 1, Turn: breakfast});
            axios.put(URI + myjson.Usuario + '/' + dia + '/' + 2, {User: myjson.Usuario, Day: Moment(dia, 'YYYY-MM-DD').add(1, 'days'), Food: 2, Turn: launch});
            axios.put(URI + myjson.Usuario + '/' + dia + '/' + 3, {User: myjson.Usuario, Day: Moment(dia, 'YYYY-MM-DD').add(1, 'days'), Food: 3, Turn: dinner});
            /*
            //Desayuno
            var res = axios.get(URI + myjson.Usuario + '/' + dia + '/' + 1);
            if(res == null) {axios.post(URI, {User: myjson.Usuario, Day: Moment(dia, 'YYYY-MM-DD').add(1, 'days'), Food: 1, Turn: breakfast});}
            else {axios.put(URI + myjson.Usuario + '/' + dia + '/' + 1, {Turn: breakfast})}

            //Comida
            var res = axios.get(URI + myjson.Usuario + '/' + dia + '/' + 2);
            if(res == null) {axios.post(URI, {User: myjson.Usuario, Day: Moment(dia, 'YYYY-MM-DD').add(1, 'days'), Food: 2, Turn: launch});}
            else {axios.put(URI + myjson.Usuario + '/' + dia + '/' + 2, {Turn: launch})}

            //Cena
            var res = axios.get(URI + myjson.Usuario + '/' + dia + '/' + 3);
            if(res == null) {axios.post(URI, {User: myjson.Usuario, Day: Moment(dia, 'YYYY-MM-DD').add(1, 'days'), Food: 3, Turn: dinner});}
            else {axios.put(URI + myjson.Usuario + '/' + dia + '/' + 3, {Turn: dinner})}*/
        }

        //navigate('/comidas');
        //navigate('/comidas/updatev2');
    }

        //console.log(myjson.Usuario);
    


    return (
        <form onSubmit={update}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Día</th>
                            <th>Desayuno</th>
                            <th>Comida</th>
                            <th>Cena</th>
                        </tr>
                    </thead>
                    <tbody>
                    {vector.map((value,i) => {
                        var brk = 'brk' + i;
                        var lau = 'lau' + i;
                        var din = 'din' + i;
                        return (
                        <tr>
                            <td>{value.Dia}</td>
                            <td><input type='text' id={brk} defaultValue={value.Desayuno} /></td>
                            <td><input type='text' id={lau} defaultValue={value.Comida} /></td>
                            <td><input type='text' id={din} defaultValue={value.Cena} /></td>
                        </tr>
                        )})}
                    </tbody>
                </table><input type='submit' value='Enviar' id='btn'/>
        </form>
    )

}

export default CompUpdateFoodv2;
