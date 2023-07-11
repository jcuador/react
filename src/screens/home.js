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

const defaultTheme = createTheme();


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

function Home() {
  const navigate = useNavigate();

  const navigateTo = url => async() => {
    navigate('/' + url);
  }

  //Para acceder a las cookies
  const cookies = new Cookies();

  //Para convertir la cookie en JSON
  var json = JSON.stringify(cookies.get('usuario'));

  //Verificamos que el usuario esté registrado
  if(json==null) {
      window.location.href='/login';
  } else {
  
  return (
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
            MENÚ
          </Typography>
          <Box component="form" noValidate onSubmit={''} sx={{ mt: 1 }}>

            <Button onClick={navigateTo('comidas')} className="btnHome"
              style={{
                borderRadius: 15,
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
              PEDIR COMIDAS
            </Button>

            <Button onClick={navigateTo('semana')} className="btnHome"
              style={{
                borderRadius: 15,
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
              VER COMIDAS
            </Button>

            <Button onClick={navigateTo('profile')} className="btnHome"
              style={{
                borderRadius: 15,
                backgroundColor: "white",
                padding: "15px",
                fontSize: "18px",
                color: "#184598"
            }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              MODIFICAR DATOS
            </Button>
            

            <Button onClick={navigateTo('horarios')} className="btnHome"
              style={{
                borderRadius: 15,
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
              HORARIOS
            </Button>

            <Button onClick={navigateTo('logout')} className="btnHome"
              style={{
                borderRadius: 15,
                backgroundColor: "red",
                padding: "15px",
                fontSize: "18px",
                color: ""
            }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              CERRAR SESIÓN
            </Button>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
  );
}
}

export default Home;