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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Limpiar errores al cambiar el valor
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.edad || formData.edad < 18) newErrors.edad = 'La edad debe ser un número mayor o igual a 18.';
    if (!formData.genero) newErrors.genero = 'El género es obligatorio.';
    if (!formData.peso || formData.peso <= 0) newErrors.peso = 'El peso debe ser un número positivo.';
    if (!formData.categoria.trim()) newErrors.categoria = 'La categoría es obligatoria.';
    if (!formData.experiencia.trim()) newErrors.experiencia = 'La experiencia es obligatoria.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
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
              {errors.nombre && <small className="text-danger">{errors.nombre}</small>}
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
              {errors.edad && <small className="text-danger">{errors.edad}</small>}
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
              {errors.genero && <small className="text-danger">{errors.genero}</small>}
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
              {errors.peso && <small className="text-danger">{errors.peso}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select
                name="categoria"
                className="form-select"
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una categoría...</option>
                <option value="Junior">Junior</option>
                <option value="Men's physique">Men's physique</option>
                <option value="Físico Clásico">Físico Clásico</option>
                <option value="Open">Open</option>
                <option value="Femenino Bikini">Femenino Bikini</option>
                <option value="Femenino Wellness">Femenino Wellness</option>
              </select>
              {errors.categoria && <small className="text-danger">{errors.categoria}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label">Experiencia</label>
              <textarea
                name="experiencia"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.experiencia && <small className="text-danger">{errors.experiencia}</small>}
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