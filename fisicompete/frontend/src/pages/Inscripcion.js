import React, { useState } from 'react';
import axios from 'axios';

const Inscripcion = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    genero: '',
    peso: '',
    categoria: '',
    experiencia: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/participantes/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Inscripción exitosa!');
      console.log(response.data);
    } catch (error) {
      console.error("Error en la inscripción:", error);
      alert("Hubo un error en la inscripción. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h1 className="text-center">Inscripción</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Edad</label>
              <input
                type="number"
                name="edad"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Género</label>
              <select
                name="genero"
                className="form-select"
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Peso (kg)</label>
              <input
                type="number"
                name="peso"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <input
                type="text"
                name="categoria"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Experiencia</label>
              <textarea
                name="experiencia"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Inscribirse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inscripcion;