import React, { useState } from 'react';
import { motion } from 'framer-motion';

const C = {
  primary: '#004a99',
  secondary: '#0066cc',
  accent: '#e6f0ff',
};

const VonNeumann = () => {
  const [phase, setPhase] = useState(0);
  const phases = ['IDLE', 'FETCH', 'DECODE', 'EXECUTE', 'STORE'];
  const log = [
    '💡 Listo para iniciar el ciclo.',
    '📡 FETCH: CPU solicita instrucción a la RAM.',
    '🧠 DECODE: Unidad de Control interpreta el comando.',
    '⚡ EXECUTE: La ALU realiza la operación matemática/lógica.',
    '💾 STORE: El resultado se guarda en memoria o registros.'
  ];

  const mem = ['LOAD 42', 'ADD 10', 'SUB 05', 'STORE 47', 'HALT'];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: C.primary, fontSize: '2rem', fontWeight: 900 }}>Arquitectura Von Neumann</h2>
        <p style={{ color: 'var(--text-light)' }}>El modelo de programa almacenado: instrucciones y datos comparten la misma memoria.</p>
      </header>

      <div style={{ 
        background: '#f8fafc',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem'
      }}>
        {/* CPU Simulator */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1rem', color: C.primary, marginBottom: '1rem' }}>🖥️ CPU Simulator</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: '#f1f5f9', borderRadius: '8px', fontSize: '0.8rem' }}>
              <span>Program Counter (PC)</span>
              <strong>0x00</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: '#f1f5f9', borderRadius: '8px', fontSize: '0.8rem' }}>
              <span>Instrucción (IR)</span>
              <strong>{phase > 1 ? mem[0] : '---'}</strong>
            </div>
            <div style={{ height: '4px', background: C.accent, borderRadius: '2px', margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '1rem', background: phase === 3 ? C.primary : '#fff', color: phase === 3 ? '#fff' : C.primary, border: `1px solid ${C.primary}`, borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800 }}>ALU</div>
              <div style={{ flex: 1, textAlign: 'center', padding: '1rem', background: phase === 2 ? C.primary : '#fff', color: phase === 2 ? '#fff' : C.primary, border: `1px solid ${C.primary}`, borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800 }}>UC</div>
            </div>
          </div>
        </div>

        {/* RAM Simulator */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1rem', color: C.primary, marginBottom: '1rem' }}>💾 RAM Unificada</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {mem.map((val, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '0.4rem 0.75rem', 
                fontSize: '0.75rem', 
                background: phase === 1 && i === 0 ? C.accent : 'transparent',
                borderRadius: '6px'
              }}>
                <code style={{ opacity: 0.5 }}>0x0{i}</code>
                <code>{val}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ gridColumn: '1/3', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => setPhase(prev => (prev + 1) % phases.length)}
            style={{ 
              background: C.primary, 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '12px', 
              fontWeight: 700 
            }}
          >
            {phase === 0 ? 'Iniciar Ciclo' : 'Siguiente Paso'}
          </button>
          <div style={{ flex: 1, background: '#000', color: '#0f0', padding: '0.75rem 1.25rem', fontFamily: 'monospace', borderRadius: '10px', fontSize: '0.8rem' }}>
            {log[phase]}
          </div>
        </div>
      </div>

      <section style={{ marginTop: '4rem' }}>
        <h3 style={{ color: C.primary, marginBottom: '1rem' }}>Características Principales</h3>
        <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingLeft: '1.2rem' }}>
          <li><strong>Memoria Unificada:</strong> No distingue entre datos e instrucciones.</li>
          <li><strong>Bus Compartido:</strong> Un solo camino para mover info (Causa del cuello de botella).</li>
          <li><strong>Secuencialidad:</strong> Ejecuta una instrucción tras otra de forma estricta.</li>
          <li><strong>Componentes:</strong> CPU (ALU + UC), Memoria y sistemas de E/S.</li>
        </ul>
      </section>
    </div>
  );
};

export default VonNeumann;
