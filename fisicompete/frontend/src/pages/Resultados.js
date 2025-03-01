// src/pages/Resultados.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Resultados = () => {
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/participantes/');
        setParticipantes(response.data);
      } catch (error) {
        console.error("Error fetching participantes:", error);
      }
    };

    fetchParticipantes();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h1 className="text-center">Resultados</h1>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Género</th>
                <th>Peso</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {participantes.map((participante) => (
                <tr key={participante.id}>
                  <td>{participante.nombre}</td>
                  <td>{participante.edad}</td>
                  <td>{participante.genero}</td>
                  <td>{participante.peso}</td>
                  <td>{participante.categoria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Resultados;