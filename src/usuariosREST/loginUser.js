import React from 'react';
import axios from 'axios'
import { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'

const CompLoginUser = () => {

    const URI = "http://54.224.159.196:8080/comidas/login/";

    const [Usuario, setUsuario] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const navigate = useNavigate();

    //procedimiento para iniciar sesión
    const login = async (e) => {
        e.preventDefault();
        const res = await axios.post(URI + Usuario, {Usuario: Usuario, Contraseña: Contraseña});
        if(res.data.length == 0) {
            navigate('/');
        } else {
            const cookie = new Cookies();
            cookie.set('usuario', {Usuario}, {path: '/', expires: 0});
            cookie.set('contraseña', {Contraseña}, {path: '/', expires: 0});
            console.log(res.data);
        }
        
    }

    return (
        <div className='general form'>
            <div className='form1'>
                <form onSubmit={login}>
                    <input type='text' value={Usuario} onChange={(e) => setUsuario(e.target.value)}/>
                    <input type='password' value={Contraseña} onChange={(e) => setContraseña(e.target.value)}/>
                    <input type='submit'value='Enviar'/>
                </form>
            </div>
        </div>
    )
}

export default CompLoginUser;
