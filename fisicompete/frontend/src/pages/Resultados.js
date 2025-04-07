// src/pages/Resultados.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Resultados = () => {
  const [puntuaciones, setPuntuaciones] = useState([]); // Lista de puntuaciones
  const [participantes, setParticipantes] = useState([]); // Lista de participantes
  const [ganadores, setGanadores] = useState({}); // Ganadores por categoría

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

    const fetchParticipantes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/participantes/');
        setParticipantes(response.data);
      } catch (error) {
        console.error("Error fetching participantes:", error);
      }
    };

    fetchPuntuaciones();
    fetchParticipantes();
  }, []);

  // Obtener la categoría del participante
  const obtenerCategoria = (participanteNombre) => {
    const participante = participantes.find(p => p.nombre === participanteNombre);
    return participante ? participante.categoria : 'Desconocida';
  };

  // Calcular los ganadores por categoría
  useEffect(() => {
    if (puntuaciones.length > 0 && participantes.length > 0) {
      const categorias = {};

      puntuaciones.forEach((puntuacion) => {
        const categoria = obtenerCategoria(puntuacion.participante_nombre);
        if (!categorias[categoria]) {
          categorias[categoria] = [];
        }
        categorias[categoria].push(puntuacion);
      });

      const ganadoresPorCategoria = {};
      Object.keys(categorias).forEach((categoria) => {
        const participantesCategoria = categorias[categoria];
        const ganador = participantesCategoria.reduce((max, actual) =>
          (actual.simetria + actual.definicion > max.simetria + max.definicion ? actual : max)
        );
        ganadoresPorCategoria[categoria] = ganador.participante_nombre;
      });

      setGanadores(ganadoresPorCategoria);
    }
  }, [puntuaciones, participantes]);

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
                <th>Categoría</th> {/* Nueva columna */}
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
                  <td>{obtenerCategoria(puntuacion.participante_nombre)}</td> {/* Categoría del participante */}
                  <td>{puntuacion.comentarios}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <h3>Ganadores por Categoría</h3>
            <ul>
              {Object.keys(ganadores).map((categoria) => (
                <li key={categoria}>
                  <strong>{categoria}:</strong> {ganadores[categoria]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultados;