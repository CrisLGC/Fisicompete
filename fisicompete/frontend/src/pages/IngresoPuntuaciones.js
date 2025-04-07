import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IngresoPuntuaciones = () => {
  const [participantes, setParticipantes] = useState([]); // Lista de participantes
  const [jueces, setJueces] = useState([]); // Lista de jueces
  const [selectedParticipante, setSelectedParticipante] = useState(''); // Participante seleccionado
  const [selectedJuez, setSelectedJuez] = useState(''); // Juez seleccionado
  const [simetria, setSimetria] = useState(0); // Puntuación de simetría
  const [definicion, setDefinicion] = useState(0); // Puntuación de definición
  const [comentarios, setComentarios] = useState(''); // Comentarios del juez
  const [errors, setErrors] = useState({}); // Estado para manejar errores

  // Obtener la lista de participantes y jueces al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const participantesResponse = await axios.get('http://localhost:8000/api/participantes/');
        setParticipantes(participantesResponse.data);

        const juecesResponse = await axios.get('http://localhost:8000/api/jueces/');
        setJueces(juecesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Validar los campos del formulario
  const validate = () => {
    const newErrors = {};
    if (!selectedParticipante) newErrors.selectedParticipante = 'Debe seleccionar un participante.';
    if (!selectedJuez) newErrors.selectedJuez = 'Debe seleccionar un juez.';
    if (simetria < 0 || simetria > 10) newErrors.simetria = 'La puntuación de simetría debe estar entre 0 y 10.';
    if (definicion < 0 || definicion > 10) newErrors.definicion = 'La puntuación de definición debe estar entre 0 y 10.';
    if (!comentarios.trim()) newErrors.comentarios = 'Los comentarios son obligatorios.';
    return newErrors;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/puntuaciones/', {
        participante: parseInt(selectedParticipante, 10),  // Convertir a número
        juez: parseInt(selectedJuez, 10),  // Convertir a número
        simetria: parseFloat(simetria),
        definicion: parseFloat(definicion),
        comentarios: comentarios,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Puntuación enviada exitosamente!');
      console.log(response.data);
    } catch (error) {
      console.error("Error enviando la puntuación:", error);
      alert("Hubo un error al enviar la puntuación. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h1 className="text-center">Ingreso de Puntuaciones</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Selección de Participante */}
            <div className="mb-3">
              <label className="form-label">Seleccione un Participante</label>
              <select
                className="form-select"
                value={selectedParticipante}
                onChange={(e) => setSelectedParticipante(e.target.value)}
                required
              >
                <option value="">Seleccione...</option>
                {participantes.map((participante) => (
                  <option key={participante.id} value={participante.id}>
                    {participante.nombre} (Categoría: {participante.categoria})
                  </option>
                ))}
              </select>
              {errors.selectedParticipante && <small className="text-danger">{errors.selectedParticipante}</small>}
            </div>

            {/* Selección de Juez */}
            <div className="mb-3">
              <label className="form-label">Seleccione un Juez</label>
              <select
                className="form-select"
                value={selectedJuez}
                onChange={(e) => setSelectedJuez(e.target.value)}
                required
              >
                <option value="">Seleccione...</option>
                {jueces.map((juez) => (
                  <option key={juez.id} value={juez.id}>
                    {juez.nombre}
                  </option>
                ))}
              </select>
              {errors.selectedJuez && <small className="text-danger">{errors.selectedJuez}</small>}
            </div>

            {/* Puntuación de Simetría */}
            <div className="mb-3">
              <label className="form-label">Puntuación de Simetría (0-10)</label>
              <input
                type="number"
                className="form-control"
                min="0"
                max="10"
                step="0.1"
                value={simetria}
                onChange={(e) => setSimetria(e.target.value)}
                required
              />
              {errors.simetria && <small className="text-danger">{errors.simetria}</small>}
            </div>

            {/* Puntuación de Definición */}
            <div className="mb-3">
              <label className="form-label">Puntuación de Definición (0-10)</label>
              <input
                type="number"
                className="form-control"
                min="0"
                max="10"
                step="0.1"
                value={definicion}
                onChange={(e) => setDefinicion(e.target.value)}
                required
              />
              {errors.definicion && <small className="text-danger">{errors.definicion}</small>}
            </div>

            {/* Comentarios */}
            <div className="mb-3">
              <label className="form-label">Comentarios</label>
              <textarea
                className="form-control"
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                required
              />
              {errors.comentarios && <small className="text-danger">{errors.comentarios}</small>}
            </div>

            {/* Botón de Envío */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Enviar Puntuación
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IngresoPuntuaciones;