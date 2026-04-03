import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { Binary, Type, Image as ImageIcon, Music, RefreshCw, Info, Database, Globe } from 'lucide-react';

const REPRESENTACION_QUESTS = [
  { q: '¿Cuál es la base del sistema Hexadecimal?', opts: ['Base 2', 'Base 8', 'Base 10', 'Base 16'], a: 3, exp: 'El hexadecimal usa 16 símbolos (0-9 y A-F).' },
  { q: '¿Qué estándar de codificación permite representar casi todos los caracteres de todos los idiomas del mundo?', opts: ['ASCII', 'Unicode', 'Binario puro', 'BCD'], a: 1, exp: 'Unicode fue creado para superar las limitaciones del ASCII de 128 o 256 caracteres.' },
  { q: 'En binario, el número decimal 5 se representa como:', opts: ['101', '110', '111', '011'], a: 0, exp: '4 (2^2) + 0 (2^1) + 1 (2^0) = 101.' },
  { q: '¿Cómo "entiende" una computadora una imagen?', opts: ['Como un conjunto de pinceladas', 'Como una matriz de números que representan colores (píxeles)', 'Como un archivo de texto con nombres de colores', 'No las entiende, solo las proyecta'], a: 1, exp: 'Cada píxel tiene un valor numérico (RGB) que la computadora procesa.' },
  { q: 'La digitalización del sonido implica:', opts: ['Grabar en una cinta', 'Convertir ondas analógicas en muestras numéricas (muestreo)', 'Gritar fuerte al micrófono', 'Usar parlantes'], a: 1, exp: 'El muestreo captura la amplitud de la onda sonora a intervalos regulares.' }
];

const RepresentacionDatos = () => {
  const [num, setNum] = useState(64);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const getBinary = (n) => (n >>> 0).toString(2).padStart(8, '0');
  const getHex = (n) => (n >>> 0).toString(16).toUpperCase().padStart(2, '0');

  return (
    <LockedContent keyword="binario" title="Clase 8: Representación de Datos" unit={3}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#1e293b' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Codificación de la Información
            </h1>
            <p style={{ opacity: 0.7, fontSize: '1.25rem', maxWidth: '850px', margin: '0 auto', color: '#475569', lineHeight: 1.7 }}>
              ¿Cómo viajan los bits para convertirse en las ideas, sonidos e imágenes que vemos cada día? Bienvenido al lenguaje del silicio.
            </p>
          </motion.div>
        </header>

        {/* Laboratorio de Sistemas Numéricos */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#fff', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid #f1f5f9', boxShadow: '0 25px 50px -12px rgba(59,130,246,0.08)' }}>
              <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1.5rem', fontWeight: 800 }}>Sistemas de Base</h2>
              <p style={{ lineHeight: 1.8, color: '#64748b', marginBottom: '3rem', fontSize: '1.05rem' }}>
                Para la máquina solo existe el <strong>paso de corriente (1)</strong> o la <strong>ausencia (0)</strong>. Como humanos, usamos el sistema decimal (base 10) y hexadecimal (base 16) para simplificar la lectura.
              </p>
              
              <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '35px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 900, color: '#3b82f6', fontSize: '0.9rem', letterSpacing: '1px' }}>VALOR DECIMAL</span>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>{num}</span>
                </div>
                <input 
                  type="range" min="0" max="255" value={num} onChange={(e) => setNum(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#3b82f6', height: '8px', borderRadius: '4px', cursor: 'pointer', marginBottom: '3rem' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <motion.div key={num + 'bin'} initial={{ scale: 0.95 }} animate={{ scale: 1 }} style={{ padding: '1.5rem', background: '#fff', borderRadius: '22px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                    <small style={{ display: 'block', opacity: 0.5, fontWeight: 800, marginBottom: '0.5rem', fontSize: '0.65rem' }}>BINARIO (BASE 2)</small>
                    <code style={{ fontSize: '1.3rem', fontWeight: 900, color: '#3b82f6', letterSpacing: '2px' }}>{getBinary(num)}</code>
                  </motion.div>
                  <motion.div key={num + 'hex'} initial={{ scale: 0.95 }} animate={{ scale: 1 }} style={{ padding: '1.5rem', background: '#fff', borderRadius: '22px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                    <small style={{ display: 'block', opacity: 0.5, fontWeight: 800, marginBottom: '0.5rem', fontSize: '0.65rem' }}>HEX (BASE 16)</small>
                    <code style={{ fontSize: '1.3rem', fontWeight: 900, color: '#06b6d4' }}>0x{getHex(num)}</code>
                  </motion.div>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', background: '#fff', padding: '2rem', borderRadius: '30px', border: '1.5px solid #f1f5f9' }}>
                <div style={{ padding: '1rem', background: '#eff6ff', borderRadius: '18px', color: '#3b82f6' }}><Database size={30} /></div>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800 }}>Unidades de Medida</h4>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748b', lineHeight: 1.5 }}>Bit, Byte (8 bits), Kilobyte, Megabyte... La escala es exponencial.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', background: '#fff', padding: '2rem', borderRadius: '30px', border: '1.5px solid #f1f5f9' }}>
                <div style={{ padding: '1rem', background: '#ecfeff', borderRadius: '18px', color: '#06b6d4' }}><Globe size={30} /></div>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800 }}>Estándares Globales</h4>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748b', lineHeight: 1.5 }}>El ASCII dio paso al Unicode, permitiendo que todas las culturas y lenguajes coexistan en bits.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Digitalización Multimedia */}
        <section style={{ marginBottom: '6rem', background: '#0f172a', padding: '5rem 3rem', borderRadius: '55px', color: '#fff' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900, background: 'linear-gradient(to right, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Traduciendo el Universo Físico
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {[
              { icon: <Type size={40} />, title: 'Texto y Semántica', color: '#3b82f6', desc: 'Mapeo de símbolos a números. Unicode permite más de 140,000 caracteres, incluyendo jeroglíficos y emojis.' },
              { icon: <ImageIcon size={40} />, title: 'Imágenes y Píxeles', color: '#06b6d4', desc: 'Matrices de colores RGB. Cada píxel es un conjunto de valores numéricos que definen la luz.' },
              { icon: <Music size={40} />, title: 'Frecuencia y Sonido', color: '#3b82f6', desc: 'Muestreo analógico: convertimos la vibración del aire en una serie continua de datos numéricos.' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -12, background: 'rgba(255,255,255,0.05)' }} 
                style={{ padding: '3.5rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.08)', transition: '0.3s', textAlign: 'center' }}
              >
                <div style={{ color: item.color, marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', fontWeight: 800 }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#fff', padding: '4rem', borderRadius: '50px', border: '1.5px solid #e2e8f0', boxShadow: '0 30px 60px rgba(0,0,0,0.05)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <Binary size={56} color="#3b82f6" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2.6rem', marginBottom: '1rem', fontWeight: 900, color: '#1e293b' }}>Desafío de Codificación</h2>
              <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Eres capaz de pensar como una máquina?</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: 'linear-gradient(to right, #3b82f6, #06b6d4)', color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem',
                  boxShadow: '0 15px 30px rgba(59,130,246,0.2)'
                }}
              >
                Iniciar Test
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', color: '#0f172a' }}>Puntaje: {score} / {REPRESENTACION_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#64748b', marginBottom: '3rem' }}>{score >= 4 ? '🎉 ¡Felicidades! Hablas el lenguaje binario.' : '🔍 A seguir explorando las bases de la codificación.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Evaluación</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: '#3b82f6', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>PREGUNTA {qIdx + 1} / {REPRESENTACION_QUESTS.length}</span>
                <span>SCO: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{REPRESENTACION_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {REPRESENTACION_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10 }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === REPRESENTACION_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid #f1f5f9', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === REPRESENTACION_QUESTS[qIdx].a ? '#22c55e' : '#ef4444') : (chosen !== null && i === REPRESENTACION_QUESTS[qIdx].a ? '#22c55e' : '#fff'),
                      color: chosen !== null ? '#fff' : '#1e293b',
                      transition: '0.3s'
                    }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
              <AnimatePresence>
                {chosen !== null && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3rem', background: '#f8fafc', borderRadius: '40px', borderLeft: '10px solid #3b82f6' }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#475569' }}>{REPRESENTACION_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < REPRESENTACION_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: '#3b82f6', color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < REPRESENTACION_QUESTS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
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
