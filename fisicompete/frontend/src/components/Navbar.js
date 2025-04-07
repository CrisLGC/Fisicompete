// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FisicoCompete</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inscripción</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/resultados">Resultados</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/puntuaciones">Ingreso de Puntuaciones</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jueces">Añadir Juez</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;