// src/pages/Resultados.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Resultados = () => {
  const [puntuaciones, setPuntuaciones] = useState([]); // Lista de puntuaciones

  // Obtener las puntuaciones al cargar el componente
  useEffect(() => {
    const fetchPuntuaciones = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/puntuaciones/');
        setPuntuaciones(response.data);
      } catch (error) {
        console.error("Error fetching puntuaciones:", error);
      }
    };

    fetchPuntuaciones();
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
                <th>Participante</th>
                <th>Juez</th>
                <th>Simetría</th>
                <th>Definición</th>
                <th>Comentarios</th>
              </tr>
            </thead>
            <tbody>
              {puntuaciones.map((puntuacion) => (
                <tr key={puntuacion.id}>
                  <td>{puntuacion.participante_nombre}</td>
                  <td>{puntuacion.juez_nombre}</td>
                  <td>{puntuacion.simetria}</td>
                  <td>{puntuacion.definicion}</td>
                  <td>{puntuacion.comentarios}</td>
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