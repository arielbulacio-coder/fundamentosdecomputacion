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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
