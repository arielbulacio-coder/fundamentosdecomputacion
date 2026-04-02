import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LockedContent from '../components/LockedContent';

const Memoria = () => {
  const [activeTab, setActiveTab] = useState('piramide');

  return (
    <LockedContent keyword="almacenamiento" title="Clase 4: Gestión y Jerarquía de Memoria">
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#eee', fontFamily: 'system-ui, sans-serif' }}>
        <style>{`
          .memoria-title {
            text-align: center;
            font-size: 2.5rem;
            background: linear-gradient(135deg, #a855f7, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 2rem;
          }
          .tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            justify-content: center;
          }
          .tab-btn {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: #fff;
            padding: 0.8rem 1.5rem;
            border-radius: 20px;
            cursor: pointer;
            transition: 0.3s;
            font-weight: bold;
          }
          .tab-btn.active {
            background: #a855f7;
            border-color: #a855f7;
            box-shadow: 0 0 15px rgba(168,85,247,0.4);
          }
          .mem-card {
            background: #111;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 2rem;
          }
          .piramide-layer {
            padding: 1rem;
            margin: 0.5rem auto;
            text-align: center;
            border-radius: 8px;
            font-weight: bold;
            color: #fff;
          }
          .layer-l1 { background: #ff4757; width: 40%; }
          .layer-l2 { background: #ffa502; width: 55%; }
          .layer-ram { background: #2ed573; width: 75%; }
          .layer-ssd { background: #1e90ff; width: 100%; }
        `}</style>

        <h1 className="memoria-title">Gestión y Jerarquía de Memoria</h1>
        
        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'piramide' ? 'active' : ''}`} onClick={() => setActiveTab('piramide')}>Pirámide de Memoria</button>
          <button className={`tab-btn ${activeTab === 'ramrom' ? 'active' : ''}`} onClick={() => setActiveTab('ramrom')}>RAM vs ROM</button>
          <button className={`tab-btn ${activeTab === 'cache' ? 'active' : ''}`} onClick={() => setActiveTab('cache')}>Caché y Memoria Virtual</button>
        </div>

        {activeTab === 'piramide' && (
          <div className="mem-card">
            <h2>La Pirámide de la Memoria</h2>
            <p>Relación entre Costo, Capacidad y Tiempo de Acceso. Cuanto más cerca está de la CPU, más rápida y costosa y con menos capacidad.</p>
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div className="piramide-layer layer-l1">Caché L1/L2 (La más rápida, Costo ↑↑↑, Capacidad ↓↓↓)</div>
              <div className="piramide-layer layer-l2">Caché L3</div>
              <div className="piramide-layer layer-ram">Memoria RAM (Volátil, Rápida, Capacidad media)</div>
              <div className="piramide-layer layer-ssd">Discos/SSD (Persistente, Lenta, Alta Capacidad)</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', opacity: 0.7, fontSize: '0.9rem' }}>
              <span>🔺 Cercanía a CPU / Mayor Velocidad</span>
              <span>Mayor Almacenamiento / Permanente 🔻</span>
            </div>
          </div>
        )}

        {activeTab === 'ramrom' && (
          <div className="mem-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h2 style={{color: '#2ed573'}}>RAM (Volátil)</h2>
              <p>Random Access Memory</p>
              <ul>
                <li>Almacenamiento dinámico de datos en ejecución.</li>
                <li><strong>Volátil:</strong> Pierde toda su información al perder el suministro eléctrico.</li>
                <li>Mantiene abiertos el Sistema Operativo, las pestañas del navegador y los programas actuales.</li>
              </ul>
            </div>
            <div>
              <h2 style={{color: '#ff4757'}}>ROM / EEPROM (Persistente)</h2>
              <p>Read Only Memory / Flash</p>
              <ul>
                <li>Firmware y rutinas críticas de arranque (ej: BIOS / UEFI).</li>
                <li><strong>No volátil:</strong> Mantiene la información sin energía.</li>
                <li>Discos de estado sólido (SSD) y discos duros (HDD) también entran en la categoría de almacenamiento persistente usado para archivos de largo plazo.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'cache' && (
          <div className="mem-card">
            <h2>Optimización del Rendimiento</h2>
            
            <h3 style={{ color: '#ffa502', marginTop: '1.5rem' }}>Memoria Caché</h3>
            <p>Memoria ultrarrápida integrada en o muy cerca de la CPU para evitar el cuello de botella de leer desde la RAM. Cuanto más cerca está físicamente la memoria del núcleo del procesador, menor es la latencia eléctrica.</p>
            <ul>
              <li><strong>L1 (Nivel 1):</strong> Dentro del núcleo de la CPU. Pequeña pero inmediata.</li>
              <li><strong>L2 (Nivel 2):</strong> Generalmente compartida por uno o varios núcleos.</li>
              <li><strong>L3 (Nivel 3):</strong> Compartida por todo el procesador. Más grande pero algo más lenta.</li>
            </ul>

            <h3 style={{ color: '#1e90ff', marginTop: '2rem' }}>Memoria Virtual (Swap/Paging)</h3>
            <p>Es una técnica crucial. Cuando la RAM física se llena, el Sistema Operativo utiliza parte del disco rígido (SSD/HDD) para "simular" más RAM.</p>
            <ul>
              <li>Mueve los programas inactivos (por ejemplo una ventana minimizada) al disco.</li>
              <li>Libera espacio en la RAM real para la tarea que estás realizando activamente en primer plano.</li>
              <li><em>Consecuencia:</em> Si la PC debe recurrir a la memoria virtual frecuentemente, se volverá muy lenta porque el disco duro es infinitamente más lento que la RAM.</li>
            </ul>
          </div>
        )}
      </div>
    </LockedContent>
  );
};

export default Memoria;
