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
import '../styles/signup.css'

const defaultTheme = createTheme();

export default function Login() {
    const URI = "http://54.224.159.196:8080/comidas/login/";

    const [Usuario, setUsuario] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const navigate = useNavigate();

    //procedimiento para iniciar sesión
    const login = async (e) => {
        e.preventDefault();
        if(Usuario !== "" && Contraseña !== "") {
          const res = await axios.post(URI + Usuario, {Usuario: Usuario, Contraseña: Contraseña});
          if(res.data.length == 0) {
              alert("El usuario/contraseña no existen");
          } 
          if({Usuario} == 'admin' && {Contraseña} == 'aquino') {
            navigate('/admin');
          } 
          else {
              const cookie = new Cookies();
              cookie.set('usuario', {Usuario}, {path: '/', expires: 0});
              cookie.set('contraseña', {Contraseña}, {path: '/', expires: 0});
              navigate('/home');
              console.log(res.data);
          }
        }
        else {
          alert("No has introducido los datos");
        }
        
    }

    /*
    //Para redirigir a otras páginas
    const navigateTo = url => async() => {
      navigate('/' + url);
    }*/
    
    function Copyright(props) {
    return (
      <Typography variant="body2" color="white" align="center" {...props}>
        {'Copyright © '}
          AlbalatEat
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
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} backgroundColor="#205c9c" square>
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
          <Box component="form" noValidate onSubmit={login} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              placeholder="Nombre de Usuario"
              name="text"
              value={Usuario}
              autoComplete="email"
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
              autoComplete="current-password"
              InputLabelProps={{className: "textfield__label"}}
              sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                opacity: '80%'
              }}
              onChange={(e) => setContraseña(e.target.value)}
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
              Entrar
            </Button>
            <div className='container'>
              <div className='item'>
                <Link href="/signup" variant="body2" color="rgb(255,255,255)">
                  {"¿Aún no tienes cuenta? Regístrate"}
                </Link>
              </div>
            </div>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
  </div>
  );

}
