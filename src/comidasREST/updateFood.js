import React from 'react';
import axios from 'axios'
import { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'

const CompUpdateFood = () => {

    const URI = "http://54.224.159.196:8080/comidas/"

    const [User, setUser] = useState('');
    const [Day, setDay] = useState('');
    const [Food, setFood] = useState('');
    const [Turn, setTurn] = useState('');
    const [Id, setId] = useState('');
    const navigate = useNavigate();

    //Para acceder a las cookies
    const cookies = new Cookies();

    //Para convertir la cookie en JSON
    var json = JSON.stringify(cookies.get('usuario'));

    //Para convertir el JSON en un objeto de JS
    var myjson = JSON.parse(json);

    //Se invoca una función que puede modificar el estado de las constantes definidas arriba
    useEffect(() => {
        getData();
    }, [])

    var preFood;
    var preDay;
    var preTurn;

    //procedimiento para obtener comidas
    const getData = async() =>  {
        const res = await axios.get(URI + myjson.Usuario);
        preDay = res.data[0].Day;
        preFood = res.data[0].Food;
        preTurn = res.data[0].Turn;
        setFood(res.data[0].Food);
        setDay(res.data[0].Day);
        setTurn(res.data[0].Turn);
        setId(res.data[0].id);
        console.log(res.data[0].id);
    }

    //procedimiento guardar
    const update = async (e) => {
        
        e.preventDefault();

        console.log(URI+Id);
        //Para crear la comida 
        await axios.put(URI + Id, {User: myjson.User, Day: Day, Food: Food, Turn: Turn});

        //console.log(myjson.Usuario);
        //navigate('/');
    }

    return (
        <div className='general form'>
            <div className='form1'>
                <form onSubmit={update}>
                    <label>{Day}</label>
                    <input type='text' value={Food} onChange={(e) => setFood(e.target.value)}/>
                    <input type='text' value={Turn} onChange={(e) => setTurn(e.target.value)}/>
                    <input type='submit'value='Enviar'/>
                </form>
            </div>
        </div>
    )
}

export default CompUpdateFood;
