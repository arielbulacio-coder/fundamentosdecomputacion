import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Binary, Hash, FileJson, Music, Video, 
  Database, Info, CheckCircle, RefreshCcw, 
  ArrowRight, Maximize2
} from 'lucide-react';

const DATA_QUESTS = [
  { q: '¿Cuál es la base del sistema binario?', opts: ['Base 10', 'Base 2 (0 y 1)', 'Base 16', 'Base 8'], a: 1, exp: 'Los circuitos digitales solo entienden dos estados: encendido (1) y apagado (0).' },
  { q: '¿Cuántos bits hay en un Byte?', opts: ['4 bits', '16 bits', '8 bits', '1024 bits'], a: 2, exp: '8 bits forman un Byte, la unidad mínima de almacenamiento direccionable.' },
  { q: 'El sistema "Hexadecimal" es base:', opts: ['10', '2', '16', '60'], a: 2, exp: 'Usa dígitos del 0 al 9 y letras de A hasta F para representar 4 bits por carácter.' },
  { q: '¿Qué es el código ASCII?', opts: ['Un lenguaje de programación', 'Un estándar de representación de caracteres de texto como números', 'Un tipo de procesador', 'Un virus'], a: 1, exp: 'Permite que la letra "A" sea guardada como el número 65 en binario.' },
  { q: 'Un "GigaByte" (GB) equivale aproximadamente a:', opts: ['1000 Bytes', '1.000.000 Bytes', '1.000.000.000 Bytes', '8 bits'], a: 2, exp: 'Aproximadamente mil millones de bytes (o 1024 Megabytes).' }
];

const RepresentacionDatos = () => {
  const [num, setNum] = useState(42);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  return (
    <LockedContent keyword="binario" title="Clase 8: Representación de la Información" unit={3}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Representación de Datos
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde el bit solitario hasta el multimedia HD. Entiende cómo la computadora traduce la realidad a un lenguaje puramente matemático.
            </p>
          </motion.div>
        </header>

        {/* Conversor Interactivo */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#1e293b', padding: '3rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', color: '#10b981' }}>Traductor de Base</h2>
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.75rem', color: '#64748b', fontWeight: 800 }}>VALOR DECIMAL:</label>
                <input 
                  type="number" 
                  value={num} 
                  onChange={(e) => setNum(parseInt(e.target.value) || 0)} 
                  style={{ width: '100%', background: '#0f172a', border: '2px solid #10b981', borderRadius: '15px', padding: '1.5rem', color: '#fff', fontSize: '2rem', fontWeight: 900 }}
                />
              </div>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981' }}>BINARIO (BASE 2)</span>
                    <Binary size={16} color="#10b981" />
                  </div>
                  <code style={{ fontSize: '1.4rem', wordBreak: 'break-all', display: 'block' }}>{num.toString(2).padStart(8, '0')}</code>
                </div>
                <div style={{ padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981' }}>HEXADECIMAL (BASE 16)</span>
                    <Hash size={16} color="#10b981" />
                  </div>
                  <code style={{ fontSize: '1.4rem' }}>{num.toString(16).toUpperCase()}</code>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/data_representation_binary_glow_1775235586514.png" 
                alt="Binary Flow" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(16,185,129,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Tipos de Datos */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>¿Cómo se codifica el mundo?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {[
              { icon: <FileJson />, title: 'Texto', color: '#10b981', desc: 'Sistemas como ASCII o UTF-8 asignan un número binario único a cada letra del alfabeto.' },
              { icon: <Music />, title: 'Audio', color: '#3b82f6', desc: 'Muestreo de ondas sonoras: se toman miles de medidas por segundo y se guardan como números.' },
              { icon: <Video />, title: 'Imágenes', color: '#ef4444', desc: 'Píxeles: cada punto tiene una combinación de Rojo, Verde y Azul (RGB), guardada en binario.' }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: item.color, marginBottom: '1.5rem' }}>{React.cloneElement(item.icon, { size: 40, style: { margin: '0 auto' } })}</div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', fontWeight: 800 }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #10b981', boxShadow: '0 30px 60px rgba(16,185,129,0.1)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <Binary size={56} color="#10b981" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Prueba de Binario</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Hablas el lenguaje de la máquina? Supera este test de codificación.</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: 'linear-gradient(to right, #10b981, #3b82f6)', color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem'
                }}
              >
                Comenzar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {DATA_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 4 ? '🚀 ¡Traductor Binario Certificado!' : '📚 Revisa el sistema de base 2 y reintenta.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: '#10b981', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>BIT {qIdx + 1} / {DATA_QUESTS.length}</span>
                <span>BYTES OK: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{DATA_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {DATA_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === DATA_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === DATA_QUESTS[qIdx].a ? '#22c55e' : '#ef4444') : (chosen !== null && i === DATA_QUESTS[qIdx].a ? '#22c55e' : 'transparent'),
                      color: '#fff',
                      transition: '0.3s'
                    }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
              <AnimatePresence>
                {chosen !== null && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', borderLeft: '10px solid #10b981' }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{DATA_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < DATA_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: '#10b981', color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < DATA_QUESTS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>
    </LockedContent>
  );
};

export default RepresentacionDatos;
