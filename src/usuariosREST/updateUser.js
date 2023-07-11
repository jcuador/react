import React from 'react';
import axios from 'axios'
import { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'

const CompUpdateUser = () => {

    const URI = "http://54.224.159.196:8080/comidas/profile/"

    const [Usuario, setUsuario] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Email, setEmail] = useState('');
    const [Habitación, setHabitación] = useState('');
    const navigate = useNavigate();

    //procedimiento guardar
    const store = async (e) => {
        
        e.preventDefault()

        //Para acceder a las cookies
        const cookies = new Cookies();

        //Para convertir la cookie en JSON
        var cookiejson = JSON.stringify(cookies.get('usuario'));

        //Para convertir el JSON en un objeto de JS
        var cookieobj = JSON.parse(cookiejson);

        //Para hacer un put al servidor y actualizar los datos del usuario registrado
        await axios.put(URI + cookieobj.Usuario, {Contraseña: Contraseña, Email: Email});

        //navigate('/');
    }

    return (
        <div className='general form'>
            <div className='form1'>
                <form onSubmit={store}>
                    <input type='password' value={Contraseña} onChange={(e) => setContraseña(e.target.value)}/>
                    <input type='email' value={Email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type='submit'value='Enviar'/>
                </form>
            </div>
        </div>
    )
}

export default CompUpdateUser;
