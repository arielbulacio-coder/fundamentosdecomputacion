import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Cpu, Database, LayoutGrid, Sliders, Play, 
  RotateCcw, Info, CheckCircle, Smartphone, 
  Laptop, Monitor, Activity, ArrowRight
} from 'lucide-react';

const C = {
  primary: '#0ea5e9',
  secondary: '#6366f1',
  danger: '#ef4444',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc'
};

const QUESTIONS = [
  { q: '¿Quién propuso la arquitectura que usa una sola memoria para datos e instrucciones?', opts: ['John von Neumann', 'Alan Turing', 'Blaise Pascal', 'Ada Lovelace'], a: 0, exp: 'Von Neumann la describió en 1945, sentando las bases de la computación moderna.' },
  { q: '¿Qué realiza la ALU?', opts: ['Almacena archivos', 'Controla periféricos', 'Enfría la CPU', 'Cálculos matemáticos y lógicos'], a: 3, exp: 'La Unidad Aritmético-Lógica es el procesador matemático del sistema.' },
  { q: '¿Qué componente coordina el flujo dentro de la CPU?', opts: ['RAM', 'Disco Rígido', 'Unidad de Control', 'Bus de Datos'], a: 2, exp: 'La Unidad de Control es el cerebro que dirige el ciclo de instrucción.' },
  { q: 'El "cuello de botella de Von Neumann" se debe a…', opts: ['Falta de RAM', 'Bus compartido entre instrucciones y datos', 'Calor de la CPU', 'Monitor lento'], a: 1, exp: 'Al usar un solo camino para todo, la CPU debe esperar a que los datos lleguen de la memoria.' },
  { q: '¿Qué bus apunta la posición de memoria a leer?', opts: ['Bus de Datos', 'Bus de Control', 'Bus USB', 'Bus de Direcciones'], a: 3, exp: 'El bus de direcciones indica el "número de puerta" donde están los datos.' }
];

const phases = [
  { id: 'IDLE', label: 'Inactivo', color: '#94a3b8' },
  { id: 'FETCH', label: 'Búsqueda', color: C.primary },
  { id: 'DECODE', label: 'Decodificación', color: C.secondary },
  { id: 'EXECUTE', label: 'Ejecución', color: '#f59e0b' },
  { id: 'STORE', label: 'Escritura', color: '#10b981' }
];

const VonNeumann = () => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const nextPhase = () => {
    setPhaseIdx((prev) => (prev + 1) % phases.length);
    if (phaseIdx === phases.length - 1) setCycles(c => c + 1);
  };

  return (
    <LockedContent keyword="arquitectura" title="Clase 2: Modelo de Von Neumann" unit={2}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: C.text }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: `linear-gradient(to right, ${C.primary}, ${C.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Modelo de Von Neumann
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              El "ADN" de la computación moderna. Descubre cómo una sola memoria unificada revolucionó la flexibilidad de las máquinas.
            </p>
          </motion.div>
        </header>

        {/* Simulador Interactivo */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1.5rem', color: C.primary }}>Simulador de Ciclo</h2>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                  Observa cómo la CPU interactúa con la RAM a través de los buses. Cada paso es vital para procesar una sola instrucción.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                  <button 
                    onClick={nextPhase}
                    style={{ background: C.primary, color: '#fff', border: 'none', padding: '1.25rem 2.5rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                  >
                    <Play size={20} /> Siguiente Paso
                  </button>
                  <button 
                    onClick={() => {setPhaseIdx(0); setCycles(0);}}
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', padding: '1.25rem', borderRadius: '20px', cursor: 'pointer' }}
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {phases.map((p, i) => (
                    <div 
                      key={p.id}
                      style={{ 
                        padding: '0.75rem 1.25rem', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 800,
                        background: i === phaseIdx ? p.color : 'rgba(255,255,255,0.02)',
                        color: i === phaseIdx ? '#000' : '#475569',
                        transition: '0.3s'
                      }}
                    >
                      {p.label}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#000', padding: '3rem', borderRadius: '40px', border: '2px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: C.primary, marginBottom: '0.5rem' }}><Cpu size={32} /></div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.5 }}>CPU</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: C.secondary, marginBottom: '0.5rem' }}><Database size={32} /></div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.5 }}>RAM</span>
                  </div>
                </div>
                {/* Visualización de Buses */}
                <div style={{ height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', position: 'relative' }}>
                  <motion.div 
                    animate={{ background: phaseIdx === 1 ? C.primary : 'rgba(255,255,255,0.05)' }}
                    style={{ height: '6px', borderRadius: '3px' }} 
                  />
                  <motion.div 
                    animate={{ background: (phaseIdx === 2 || phaseIdx === 4) ? C.secondary : 'rgba(255,255,255,0.05)' }}
                    style={{ height: '6px', borderRadius: '3px' }} 
                  />
                  <motion.div 
                    animate={{ background: phaseIdx === 3 ? '#f59e0b' : 'rgba(255,255,255,0.05)' }}
                    style={{ height: '6px', borderRadius: '3px' }} 
                  />
                  <div style={{ position: 'absolute', top: '-1.5rem', width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', fontWeight: 900, opacity: 0.3 }}>
                    <span>DIRECCIONES</span>
                    <span>DATOS</span>
                    <span>CONTROL</span>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, color: C.primary }}>
                  Ciclos Completados: {cycles}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* El "Cuello de Botella" */}
        <section style={{ marginBottom: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          <div style={{ background: C.card, padding: '3.5rem', borderRadius: '45px', borderLeft: `8px solid ${C.danger}` }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: C.danger }}>El Cuello de Botella</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
              Al usar un solo bus para instrucciones y datos, la CPU (que es veloz) debe esperar a que la RAM (que es lenta) termine de enviar la información. Es como tener un motor de Ferrari pero una carretera de carril único.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1.25rem' }}>Soluciones Modernas</h3>
            <ul style={{ display: 'grid', gap: '1rem', padding: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><CheckCircle size={18} color={C.primary} /> Niveles de Memoria Caché (L1, L2, L3)</li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><CheckCircle size={18} color={C.primary} /> Predictores de Salto en la CPU</li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><CheckCircle size={18} color={C.primary} /> Buses Multi-canal de alta velocidad</li>
            </ul>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: `2px solid ${C.primary}40`, boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <LayoutGrid size={56} color={C.primary} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Prueba de Fundamentos</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>Demuestra que entiendes el flujo de datos que mueve al mundo.</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: C.primary, color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem',
                  boxShadow: `0 15px 30px ${C.primary}30`
                }}
              >
                Comenzar Test
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {QUESTIONS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 4 ? '🎓 ¡Maestro de la Arquitectura!' : '📚 Sigue practicando los componentes internos.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: C.primary, color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: C.primary, fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>REGISTRO {qIdx + 1} / {QUESTIONS.length}</span>
                <span>SCO: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{QUESTIONS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {QUESTIONS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === QUESTIONS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === QUESTIONS[qIdx].a ? '#22c55e' : '#ff4757') : (chosen !== null && i === QUESTIONS[qIdx].a ? '#22c55e' : 'transparent'),
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
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', borderLeft: `10px solid ${C.primary}` }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{QUESTIONS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < QUESTIONS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: C.primary, color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < QUESTIONS.length ? 'Siguiente Instrucción' : 'Ver Resultados'}
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

export default VonNeumann;
