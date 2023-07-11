import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'
import '../styles/signup.css'

const defaultTheme = createTheme();

export default function SignUp() {
    const URI = "http://54.224.159.196:8080/comidas/login/";

    const [Usuario, setUsuario] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const [Email, setEmail] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Habitación, setHabitación] = useState('');
    const navigate = useNavigate();

    //procedimiento para iniciar sesión
    const signup = async (e) => {
        e.preventDefault()
        const res = await axios.post(URI, {Usuario: Usuario, Contraseña: Contraseña, Email: Email, Nombre: Nombre, Habitación: Habitación});
        if(res.data.length == 0) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }
    
    function Copyright(props) {
    return (
      <Typography variant="body2" color="white" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          AlbalatEat
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  return (
    <div className='labels'>
    <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={12} component={Paper} elevation={6} backgroundColor= '#205c9c' square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={require('../media/albalat_logo.png')} width='10%' height='10%'/>
          <Typography component="h1" variant="h5" color='white'>
            ALBALAT EAT
          </Typography>
          <Box component="form" noValidate onSubmit={signup} sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              placeholder="Nombre de Usuario"
              name="text"
              value={Usuario}
              autoFocus
              InputLabelProps={{className: "textfield__label"}}
              sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                opacity: '80%'
              }}
              onChange={(e) => setUsuario(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={Contraseña}
              placeholder="Contraseña"
              type="password"
              id="password"
              InputLabelProps={{className: "textfield__label"}}
              sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                opacity: '80%'
              }}
              onChange={(e) => setContraseña(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              value={Nombre}
              placeholder="Nombre y Apellidos"
              type="text"
              id="name"
              InputLabelProps={{className: "textfield__label"}}
              sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                opacity: '80%'
              }}
              onChange={(e) => setNombre(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              value={Email}
              placeholder="Email"
              type="email"
              id="email"
              InputLabelProps={{className: "textfield__label"}}
              sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                opacity: '80%'
              }}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="habitacion"
              value={Habitación}
              placeholder="Nº Habitación"
              type="number"
              id="habitacion"
              InputLabelProps={{className: "textfield__label"}}
              sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                opacity: '80%'
              }}
              onChange={(e) => setHabitación(e.target.value)}
            />

            <Button
              style={{
                borderRadius: 3,
                backgroundColor: "white",
                padding: "15px",
                fontSize: "18px",
                color: "#184598"
            }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              REGISTRARSE
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
  </div>
  );

}
