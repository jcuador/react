import React from 'react';
import axios from 'axios';
import Moment from 'moment';
import {useNavigate} from 'react-router-dom'
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';



const AdminResidentes = () => {
    const URI = "http://54.224.159.196:8080/comidas/login/";
    const URI2 = "http://54.224.159.196:8080/comidas/profile/";
    const [vector, setVector] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filterColumn, setFilterColumn] = useState('');
    const [tableData, setTableData] = useState([]);
    const [nameData, setNameData] = useState([]);
    const navigate = useNavigate();

    //Se invoca una función que puede modificar el estado de las constantes definidas arriba
    useEffect(() => {
      getUsers();
    }, [])

    const navigateTo = url => async() => {
      navigate('/' + url);
    }

    //procedimiento llamar a todos los desayunos, comidas y cenas de un día en concreto
    const getUsers = async() => {
      
      //conseguimos a todos los residentes
      const residentes = await axios.get(URI);

      //creamos un vector para volcar los datos
      var vec = [];
      
      //creamos un vector con los datos modificables de cada usuario
      for(var i = 0; i < residentes.data.length; i++) {
        vec[i] = {'Usuario':residentes.data[i].Usuario, 'Nombre' : residentes.data[i].Nombre, 'Habitación': residentes.data[i].Habitación, 'Email': residentes.data[i].Email, 'Régimen': residentes.data[i].Régimen};
      }

      //actualizamos nuestro vector con la info del vector auxiliar local
      setVector(vec);
      setTableData(vec.map((value) => [value.Nombre, value.Habitación, value.Email, value.Régimen]));
      setNameData(vec.map((value) => value.Usuario));
      console.log(vec);
    } 

  const handleCellChange = (event, rowIndex, columnIndex) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][columnIndex] = event.target.value;
    setTableData(updatedData);
  };

  const handleDeleteRow = async (index) => {
    if (nameData && nameData.length > index) {
      const username = nameData[index];
      await axios.delete(URI + username);
      const updatedData = tableData.filter((_, i) => i !== index);
      const updatedNameData = nameData.filter((_, i) => i !== index);
      setTableData(updatedData);
      setNameData(updatedNameData);
    }
  };
  

  const filteredData = filterColumn
    ? tableData.filter((row) =>
        row[filterColumn].toString().toLowerCase().includes(filterText.toLowerCase())
      )
    : tableData;

    const handleInfo = async() => {
      nameData.map(async (username, i) => {
        await axios.put(URI2 + username, {Usuario: username, Nombre: tableData[i][0], Email: tableData[i][2], Habitación: tableData[i][1], Régimen: tableData[i][3]});
      });
      navigate('/admin');
    };
    

  return (
    <div className="container">
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Nombre y Apellidos</th>
            <th>Habitación</th>
            <th>Email</th>
            <th>Régimen</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <input
                    type="text"
                    className="form-control"
                    value={cell}
                    onChange={(event) => handleCellChange(event, index, cellIndex)}
                  />
                </td>
              ))}
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteRow(index)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleInfo}>
        Guardar cambios
      </button>
    </div>
  );
    

}

export default AdminResidentes;



/*

const URI = "http://localhost:8081/comidas/login/";
    const URI2 = "http://localhost:8081/comidas/profile/";
    const [vector, setVector] = useState([]);
    const navigate = useNavigate();

    //Se invoca una función que puede modificar el estado de las constantes definidas arriba
    useEffect(() => {
      getUsers();
    }, [])

    const navigateTo = url => async() => {
      navigate('/' + url);
    }

    //procedimiento llamar a todos los desayunos, comidas y cenas de un día en concreto
    const getUsers = async() => {
      
      //conseguimos a todos los residentes
      const residentes = await axios.get(URI);

      //creamos un vector para volcar los datos
      var vec = [];
      
      //creamos un vector con los datos modificables de cada usuario
      for(var i = 0; i < residentes.data.length; i++) {
        vec[i] = {'Usuario':residentes.data[i].Usuario, 'Nombre' : residentes.data[i].Nombre, 'Habitación': residentes.data[i].Habitación, 'Email': residentes.data[i].Email};
      }

      //actualizamos nuestro vector con la info del vector auxiliar local
      setVector(vec);
      console.log(vec);
    }



  const [filterText, setFilterText] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [tableData, setTableData] = useState([]);
  const [nameData] = useState([]);

  vector.map((value, i) => {
    tableData.push([value.Nombre, value.Habitación, value.Email]);
    nameData.push(value.Usuario);
  })

  const handleRemove = (index) => async() => {
    axios.delete(URI + nameData[index]);
    window.location.reload();
  };

  const filteredData = filterColumn
    ? tableData.filter((row) =>
        row[filterColumn].toString().toLowerCase().includes(filterText.toLowerCase())
      )
    : tableData;

    const handleCellChange = (event, rowIndex, columnIndex) => {
      const updatedData = [...tableData];
      updatedData[rowIndex][columnIndex] = event.target.value;
      setTableData(updatedData);
    };
  
    const handleDeleteRow = (index) => {
      const updatedData = [...tableData];
      updatedData[index].hidden = true;
      setTableData(updatedData);
    };

  const handleInfo = async() => {
    vector.map(async (value,i) => {
        await axios.put(URI2 + value.Usuario, {Usuario: vector.Usuario, Nombre: tableData[i][0], Email: tableData[i][2], Habitación: tableData[i][1]});
    })
    //const res = await axios.put(URI + myjson.Usuario, {Usuario: myjson.Usuario, Contraseña: Contraseña, Email: Email, Habitación: Habitación});
    //navigate('/home');
    console.log(tableData[0].Email);
  }

  return (
    <div className="container">
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Nombre y Apellidos</th>
            <th>Habitación</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={cell}
                    onChange={(event) => {
                      handleCellChange(event, rowIndex, cellIndex)
                      //tableData[rowIndex][cellIndex] = event.target.value;
                      // Aquí puedes realizar cualquier acción adicional con los datos actualizados
                    }}
                  />
                </td>
              ))}
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteRow(rowIndex)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleInfo}>
        Guardar cambios
      </button>
    </div>
  );





*/