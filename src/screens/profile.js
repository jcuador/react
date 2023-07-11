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

export default function Profile() {
    const URI = "http://54.224.159.196:8080/comidas/profile/";
    const URI2 = "http://54.224.159.196:8080/comidas/login/";

    const [Usuario, setUsuario] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const [Email, setEmail] = useState('');
    const [Habitación, setHabitación] = useState('');
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

    //procedimiento para traer la información
    const getData = async() => {
        //Obtenemos los datos para el usuario
        const res = await axios.get(URI2 + myjson.Usuario);
        console.log(res.data[0]);
        setUsuario(res.data[0].Usuario);
        setEmail(res.data[0].Email);
        setContraseña(res.data[0].Contraseña);
        setHabitación(res.data[0].Habitación)
    }

    //procedimiento para iniciar sesión
    const updateProfile = async (e) => {
        e.preventDefault()
        const res = await axios.put(URI + myjson.Usuario, {Usuario: myjson.Usuario, Contraseña: Contraseña, Email: Email, Habitación: Habitación});
        navigate('/home');
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
          <Box component="form" noValidate onSubmit={updateProfile} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email"
              name="email"
              value={Email}
              autoComplete="email"
              autoFocus
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
              name="password"
              value={Contraseña}
              placeholder="Contraseña"
              type="text"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="habitacion"
              value={Habitación}
              placeholder="Habitación"
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
              Actualizar Perfil
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
