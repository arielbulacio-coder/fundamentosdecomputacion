import React, { useState } from 'react';

const LockedContent = ({ keyword, title, children }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [attempt, setAttempt] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attempt.toLowerCase().trim() === keyword.toLowerCase().trim()) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setAttempt('');
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#00f2ff' }}>🔒 Contenido Bloqueado</h2>
      <p style={{ marginBottom: '2rem', fontSize: '1.2rem', opacity: 0.8 }}>
        Para acceder a la clase <strong>{title}</strong>, ingresá la palabra clave.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
        <input 
          type="text" 
          value={attempt} 
          onChange={(e) => setAttempt(e.target.value)}
          placeholder="Palabra Clave" 
          style={{
            flex: 1,
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            fontSize: '1rem'
          }}
        />
        <button type="submit" style={{
          padding: '1rem 2rem',
          borderRadius: '12px',
          border: 'none',
          background: 'linear-gradient(135deg, #00f2ff, #7000ff)',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Desbloquear
        </button>
      </form>
      {error && <p style={{ color: '#ff007a', marginTop: '1rem', fontWeight: 'bold' }}>❌ Palabra clave incorrecta.</p>}
    </div>
  );
};

export default LockedContent;
