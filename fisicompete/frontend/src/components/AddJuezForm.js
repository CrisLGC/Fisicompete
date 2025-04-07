import React, { useState } from 'react';
import axios from 'axios';

const AddJuezForm = () => {
    const [nombre, setNombre] = useState('');
    const [credenciales, setCredenciales] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoJuez = { nombre, credenciales };

        try {
            await axios.post('http://localhost:8000/api/jueces/', nuevoJuez);
            alert('Juez añadido correctamente');
            setNombre('');
            setCredenciales('');
        } catch (error) {
            console.error('Error al añadir juez', error);
            alert('Hubo un error al añadir el juez');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Añadir Juez</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="credenciales" className="form-label">Credenciales:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="credenciales"
                        value={credenciales}
                        onChange={(e) => setCredenciales(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Añadir Juez</button>
            </form>
        </div>
    );
};

export default AddJuezForm;