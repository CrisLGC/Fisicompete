// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inscripcion from './pages/Inscripcion';
import Resultados from './pages/Resultados';
import Navbar from './components/Navbar';
import IngresoPuntuaciones from './pages/IngresoPuntuaciones';
import AddJuezForm from './components/AddJuezForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inscripcion />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/puntuaciones" element={<IngresoPuntuaciones />} />
        <Route path="/jueces" element={<AddJuezForm />} />
      </Routes>
    </Router>
  );
}

export default App;
