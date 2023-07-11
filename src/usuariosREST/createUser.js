import React from 'react';
import axios from 'axios'
import { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const CompCreateUser = () => {

    const URI = "http://54.224.159.196:8080/comidas/login"

    const [Usuario, setUsuario] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Email, setEmail] = useState('');
    const [Habitación, setHabitación] = useState('');
    const navigate = useNavigate();

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI, {Usuario: Usuario, Contraseña: Contraseña, Email: Email, Nombre: Nombre, Habitación: Habitación});
        navigate('/');
    }

    return (
        <div className='general form'>
            <div className='form1'>
                <form onSubmit={store}>
                    <input type='text' value={Usuario} onChange={(e) => setUsuario(e.target.value)}/>
                    <input type='password' value={Contraseña} onChange={(e) => setContraseña(e.target.value)}/>
                    <input type='text' value={Nombre} onChange={(e) => setNombre(e.target.value)}/>
                    <input type='email' value={Email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type='number' value={Habitación} onChange={(e) => setHabitación(e.target.value)}/>
                    <input type='submit'value='Enviar'/>
                </form>
            </div>
        </div>
    )
}

export default CompCreateUser;
