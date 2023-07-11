import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//importamos bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

//Crea la raíz desde la que se muestran nuestros componentes
const root = ReactDOM.createRoot(document.getElementById('root'));

//Renderiza la aplicación
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



//Para volver al modo restrictivo
// <React.StrictMode>
//    <App/>
// </React.StrictMode>