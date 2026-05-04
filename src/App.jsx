import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
import PortalDocente from './pages/PortalDocente';
import ArquitecturaAR from './pages/ArquitecturaAR';
import AREnsamblaje from './pages/AREnsamblaje';
import ProyectoMalvinas from './pages/ProyectoMalvinas';
import MalvinasRA from './pages/MalvinasRA';
import MalvinasEvaluacion from './pages/MalvinasEvaluacion';
import MalvinasJuegoSerio from './pages/MalvinasJuegoSerio';

// The portal takes over the full screen (no NavBar/Footer)
function AppLayout() {
  const location = useLocation();
  const isPortal = location.pathname === '/portal-docente'
    || location.pathname === '/ar-arquitectura'
    || location.pathname === '/ar-ensamblaje'
    || location.pathname === '/proyecto-malvinas/ra';

  if (isPortal) {
    return (
      <Routes>
        <Route path="/portal-docente" element={<PortalDocente />} />
        <Route path="/ar-arquitectura" element={<ArquitecturaAR />} />
        <Route path="/ar-ensamblaje" element={<AREnsamblaje />} />
        <Route path="/proyecto-malvinas/ra" element={<MalvinasRA />} />
      </Routes>
    );
  }

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
          <Route path="/ar-arquitectura" element={<ArquitecturaAR />} />
          <Route path="/proyecto-malvinas" element={<ProyectoMalvinas />} />
          <Route path="/proyecto-malvinas/evaluacion" element={<MalvinasEvaluacion />} />
          <Route path="/proyecto-malvinas/juego" element={<MalvinasJuegoSerio />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}

export default App;
