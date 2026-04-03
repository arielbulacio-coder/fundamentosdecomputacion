import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      background: '#f8fafc', 
      padding: '3rem 1rem', 
      borderTop: '1px solid var(--border)',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <img src="/logo_unpilar.png" alt="UNPilar Logo" style={{ height: '50px', marginBottom: '1.5rem', filter: 'grayscale(1)' }} />
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem', fontSize: '1.5rem', fontWeight: 900 }}>SimuUnpilar</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
          Recursos Interactivos para el Aprendizaje
        </p>
        <div style={{ display: 'inline-block', background: '#e8f0fb', borderRadius: '20px', padding: '0.35rem 1.25rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '2rem' }}>
          Materia activa: Fundamentos de Computación
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>Equipo Docente:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-light)' }}>
            <span>Patricia Castilla</span>
            <span>Paola Antonetti</span>
            <span>Ariel Bulacio</span>
          </div>
          <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '1.5rem' }}>
            Universidad Nacional de Pilar · Universidad Tecnológica Nacional
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
