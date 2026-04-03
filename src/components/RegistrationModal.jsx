import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, User, Hash, BookOpen, Award } from 'lucide-react';

const API_BASE = typeof window !== 'undefined' 
  ? (window.__FUNDAMENTOS_API__ || '/api')
  : '/api';

const RegistrationModal = ({ isOpen, onClose, score, total, clase, unidad }) => {
  const [form, setForm] = useState({ numero_comision: '', dni: '', apellido: '', nombres: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const porcentaje = Math.round((score / total) * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/evaluaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          clase,
          unidad,
          puntaje: score,
          total
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.mensaje);
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al registrar.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('No se pudo conectar con el servidor. Reintentá más tarde.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
          }}
          onClick={(e) => e.target === e.currentTarget && status === 'success' && onClose()}
        >
          <motion.div
            initial={{ scale: 0.85, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 40 }}
            style={{
              background: '#1e293b', borderRadius: '40px', padding: '3rem',
              maxWidth: '560px', width: '100%', boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
              border: '2px solid rgba(34,197,94,0.3)'
            }}
          >
            {/* Score badge */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <Award size={52} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                ¡Aprobaste!
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, background: 'linear-gradient(to right, #22c55e, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0.5rem 0' }}>
                {score} / {total}
              </div>
              <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '20px', padding: '0.75rem 2rem', display: 'inline-block', color: '#22c55e', fontWeight: 800, fontSize: '1.1rem' }}>
                {porcentaje}% de respuestas correctas
              </div>
            </div>

            {status === 'success' ? (
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={48} color="#22c55e" style={{ margin: '0 auto 1.5rem' }} />
                <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>¡Registro Completado!</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{message}</p>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '1rem' }}>
                  Tu resultado ha sido guardado. El docente puede consultarlo en el registro de la comisión.
                </p>
                <button
                  onClick={onClose}
                  style={{ marginTop: '2rem', background: '#22c55e', color: '#000', border: 'none', padding: '1rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
                  Completá tus datos para que el docente registre tu aprobación.
                </p>

                {[
                  { key: 'numero_comision', label: 'Número de Comisión', icon: <BookOpen size={16} />, placeholder: 'Ej: 2025-A, Comisión 3...' },
                  { key: 'dni', label: 'DNI', icon: <Hash size={16} />, placeholder: 'Ej: 30123456' },
                  { key: 'apellido', label: 'Apellido', icon: <User size={16} />, placeholder: 'Ej: GARCÍA' },
                  { key: 'nombres', label: 'Nombres', icon: <User size={16} />, placeholder: 'Ej: Juan Carlos' },
                ].map(({ key, label, icon, placeholder }) => (
                  <div key={key} style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {icon} {label}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                      style={{
                        width: '100%', background: '#0f172a', border: '2px solid rgba(255,255,255,0.1)',
                        borderRadius: '14px', padding: '1rem 1.25rem', color: '#fff', fontSize: '1rem',
                        outline: 'none', transition: '0.2s', boxSizing: 'border-box',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#22c55e'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                ))}

                {status === 'error' && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '1rem', color: '#ef4444', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%', background: status === 'loading' ? '#334155' : 'linear-gradient(to right, #22c55e, #3b82f6)',
                    color: '#fff', border: 'none', padding: '1.25rem', borderRadius: '20px',
                    fontWeight: 900, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    fontSize: '1.1rem', transition: '0.3s'
                  }}
                >
                  {status === 'loading' ? 'Registrando...' : 'Registrar mi Aprobación 🎓'}
                </button>

                <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.75rem', marginTop: '1rem' }}>
                  Al registrarte, declarás que los datos ingresados son verídicos.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
