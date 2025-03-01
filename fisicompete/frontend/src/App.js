// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inscripcion from './pages/Inscripcion';
import Resultados from './pages/Resultados';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inscripcion />} />
        <Route path="/resultados" element={<Resultados />} />
      </Routes>
    </Router>
  );
}

export default App;
