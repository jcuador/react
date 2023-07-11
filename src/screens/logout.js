import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'
import '../styles/login.css'


function Logout() {

  //Para acceder a las cookies
  const cookies = new Cookies();

  //Para poder redirigir a la página de inicio sesión
  const navigate = useNavigate();

  //Para eliminar la cookie al cerrar sesión
  cookies.remove('usuario', { path: '/' , domain: "100.27.19.134"});
  cookies.remove('contraseña', { path: '/' , domain: "100.27.19.134"});
  console.log('Funciona?')

  useEffect(() => {
    navigate('/login');
    }, [])

}

export default Logout;