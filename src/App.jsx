import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import VonNeumann from './pages/VonNeumann';
import Harvard from './pages/Harvard';
import Generaciones from './pages/Generaciones';
import CPU from './pages/CPU';
import Memoria from './pages/Memoria';
import Arranque from './pages/Arranque';
import SociedadSoftware from './pages/SociedadSoftware';
import CulturaDigital from './pages/CulturaDigital';
import RepresentacionDatos from './pages/RepresentacionDatos';
import LogicaDigital from './pages/LogicaDigital';
import SistemaOperativo from './pages/SistemaOperativo';
import SeguridadInformatica from './pages/SeguridadInformatica';

function App() {
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <main style={{ flex: 1, padding: '2rem 1rem 4rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generaciones" element={<Generaciones />} />
          <Route path="/von-neumann" element={<VonNeumann />} />
          <Route path="/harvard" element={<Harvard />} />
          <Route path="/cpu" element={<CPU />} />
          <Route path="/memoria" element={<Memoria />} />
          <Route path="/arranque" element={<Arranque />} />
          <Route path="/sociedad-software" element={<SociedadSoftware />} />
          <Route path="/cultura-digital" element={<CulturaDigital />} />
          <Route path="/representacion-datos" element={<RepresentacionDatos />} />
          <Route path="/logica-digital" element={<LogicaDigital />} />
          <Route path="/sistema-operativo" element={<SistemaOperativo />} />
          <Route path="/seguridad-informatica" element={<SeguridadInformatica />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
