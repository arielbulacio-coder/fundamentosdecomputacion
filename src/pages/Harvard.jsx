import React from 'react';

const C = {
  primary: '#004a99',
  secondary: '#0066cc',
  accent: '#e6f0ff',
  orange: '#f97316'
};

const Harvard = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: C.primary, fontSize: '2rem', fontWeight: 900 }}>Arquitectura Harvard</h2>
        <p style={{ color: 'var(--text-light)' }}>Buses independientes para datos e instrucciones: eficiencia en alto rendimiento.</p>
      </header>

      <div style={{ 
        background: '#f8fafc',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {/* Harvard Diagram Mockup */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1.5fr', gap: '2rem', alignItems: 'center', width: '100%' }}>
          <div style={{ background: 'white', border: `2px solid ${C.primary}`, borderRadius: '16px', padding: '2rem', textAlign: 'center', fontWeight: 800 }}>
            <span style={{ color: C.primary, fontSize: '1.5rem' }}>CPU</span>
          </div>

          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4rem' }}>
            <div style={{ height: '8px', background: C.secondary, borderRadius: '4px', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-20px', fontSize: '0.6rem', fontWeight: 800 }}>BUS INST.</span>
            </div>
            <div style={{ height: '8px', background: C.orange, borderRadius: '4px', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-20px', fontSize: '0.6rem', fontWeight: 800 }}>BUS DATOS</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'white', border: `2px solid ${C.secondary}`, borderRadius: '12px', padding: '1rem', textAlign: 'center', fontSize: '0.8rem' }}>
              <strong>ROM / FLASH</strong><br/>Memoria de Programa
            </div>
            <div style={{ background: 'white', border: `2px solid ${C.orange}`, borderRadius: '12px', padding: '1rem', textAlign: 'center', fontSize: '0.8rem' }}>
              <strong>RAM</strong><br/>Memoria de Datos
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '0.9rem', lineHeight: '1.7' }}>
          <p><strong>¿Por qué es superior en ciertos casos?</strong> A diferencia de Von Neumann, la arquitectura Harvard puede leer una instrucción nueva al mismo tiempo que lee o escribe datos. Esto elimina el "cuello de botella" y es la razón por la que se usa en casi todos los microcontroladores (como <strong>Arduino</strong>) y procesadores de señales digitales (DSP).</p>
        </div>
      </div>

      <section style={{ marginTop: '4rem' }}>
        <h3 style={{ color: C.primary, marginBottom: '2rem', textAlign: 'center' }}>Comparativa: Harvard vs Von Neumann</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px' }}>
            <h4 style={{ color: C.primary, marginBottom: '0.75rem' }}>Von Neumann</h4>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem' }}>
              <li>Memoria única compartida.</li>
              <li>Bus de datos compartido.</li>
              <li>Más flexible y económica.</li>
              <li>Usada en PCs y Servidores.</li>
            </ul>
          </div>
          <div style={{ padding: '1.5rem', background: '#fff7ed', borderRadius: '16px', border: '1px solid #ffedd5' }}>
            <h4 style={{ color: C.orange, marginBottom: '0.75rem' }}>Harvard</h4>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem' }}>
              <li>Memorias separadas físicamente.</li>
              <li>Buses dedicados simultáneos.</li>
              <li>Mayor velocidad de ejecución.</li>
              <li>Usada en Microcontroladores y DSPs.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Harvard;
