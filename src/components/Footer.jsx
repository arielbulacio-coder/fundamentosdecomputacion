import React from 'react';
import { CircuitBoard } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      background: '#f8fafc', 
      padding: '3rem 1rem', 
      borderTop: '1px solid var(--border)',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', 
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
          }}>
            <CircuitBoard size={28} color="#fff" />
          </div>
        </div>
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem', fontSize: '1.5rem', fontWeight: 900 }}>SimuTec</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
          Simuladores Tecnológicos para el Aprendizaje
        </p>
        <div style={{ display: 'inline-block', background: '#e8f0fb', borderRadius: '20px', padding: '0.35rem 1.25rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '2rem' }}>
          Materia activa: Fundamentos de Computación
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>
            SimuTec · Plataforma de Simuladores Tecnológicos
          </p>
          <div style={{ marginTop: '1rem' }}>
            <a href="https://www.activsoft.com.ar" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>
              Desarrollado por Activsoft
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
