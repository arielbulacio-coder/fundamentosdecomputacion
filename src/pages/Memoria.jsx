import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Database, Zap, Save, RefreshCw, Layers, 
  Cpu, HardDrive, Info, CheckCircle, 
  ArrowRight, Maximize2
} from 'lucide-react';

const MEM_QUESTS = [
  { q: '¿Qué significa que la memoria RAM sea "volátil"?', opts: ['Que es muy rápida', 'Que pierde los datos al apagar la energía', 'Que puede explotar', 'Que se puede mover'], a: 1, exp: 'La RAM necesita electricidad para mantener la información; es almacenamiento temporal.' },
  { q: '¿Cuál es la memoria más rápida de la computadora?', opts: ['Memoria RAM', 'Disco Rígido (HDD)', 'Registros de la CPU', 'Memoria Caché'], a: 2, exp: 'Los registros están dentro de la CPU y operan a su misma velocidad.' },
  { q: '¿Para qué sirve la memoria Caché?', opts: ['Para guardar fotos', 'Para acelerar el acceso a datos usados frecuentemente', 'Para conectar el mouse', 'Para enfriar el procesador'], a: 1, exp: 'La caché guarda copias de datos de la RAM para que la CPU no tenga que esperar tanto.' },
  { q: '¿En qué nivel de la jerarquía está el Disco Rígido?', opts: ['Nivel 1 (más rápido)', 'Nivel Intermedio', 'Nivel de Almacenamiento Masivo (lento/barato)', 'Dentro de la CPU'], a: 2, exp: 'El disco es lento comparado con la RAM pero muy grande y no volátil.' },
  { q: 'La jerarquía de memoria busca el equilibrio entre:', opts: ['Color y forma', 'Velocidad, capacidad y costo', 'Software y Hardware', 'Ninguna'], a: 1, exp: 'Buscamos tener mucha capacidad barata (disco) y poca capacidad ultra-rápida (registros/caché).' }
];

const Memoria = () => {
  const [activeLevel, setActiveLevel] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const levels = [
    { title: 'Registros', speed: 'Extrema (1 ciclo)', capacity: 'Bytes', Icon: Cpu, color: '#ef4444' },
    { title: 'Caché (L1-L3)', speed: 'Muy Alta', capacity: 'MegaBytes', Icon: zap, color: '#f59e0b' },
    { title: 'Memoria RAM', speed: 'Alta', capacity: 'GigaBytes', Icon: RefreshCw, color: '#3b82f6' },
    { title: 'Disco (SSD/HDD)', speed: 'Baja', capacity: 'TeraBytes', Icon: HardDrive, color: '#16a34a' }
  ];

  return (
    <LockedContent keyword="jerarquia" title="Clase 4: Jerarquía de Memoria" unit={2}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #ef4444, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Jerarquía de Memoria
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              De los registros a la nube. Entiende por qué no toda la memoria es igual y cómo se organiza para optimizar el rendimiento.
            </p>
          </motion.div>
        </header>

        {/* Pirámide de Memoria */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2rem', color: '#ef4444' }}>La Pirámide del Rendimiento</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                A medida que subimos en la pirámide, la memoria es más rápida y costosa. A medida que bajamos, ganamos capacidad pero perdemos velocidad.
              </p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {levels.map((lvl, i) => (
                  <motion.div 
                    key={i}
                    onMouseEnter={() => setActiveLevel(i)}
                    style={{ 
                      padding: '1.5rem', borderRadius: '20px', border: '1.5px solid',
                      borderColor: activeLevel === i ? lvl.color : 'rgba(255,255,255,0.05)',
                      background: activeLevel === i ? lvl.color + '10' : '#1e293b',
                      cursor: 'pointer', transition: '0.3s'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <div style={{ color: lvl.color }}><lvl.Icon size={24} /></div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{lvl.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Capacidad: {lvl.capacity} | Velocidad: {lvl.speed}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/memory_hierarchy_pyramid_1775235453344.png" 
                alt="Memory Pyramid" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(239,68,68,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Conceptos Críticos */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
            <div>
              <Zap color="#f59e0b" size={40} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Localidad de Referencia</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                La CPU tiende a usar datos que están cerca unos de otros (localidad espacial) o datos que usó recientemente (localidad temporal). La Caché explota esto para ser eficiente.
              </p>
            </div>
            <div>
              <Save color="#3b82f6" size={40} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Persistencia</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                La memoria principal es volátil, pero el almacenamiento secundario (discos) es persistente. Ambos son necesarios para el equilibrio del sistema.
              </p>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #ef4444', boxShadow: '0 30px 60px rgba(239,68,68,0.1)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <Database size={56} color="#ef4444" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Prueba de Memoria</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Sabes dónde se guardan tus datos en cada instante?</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: 'linear-gradient(to right, #ef4444, #f59e0b)', color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem'
                }}
              >
                Comenzar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {MEM_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 4 ? '🚀 ¡Especialista en Almacenamiento!' : '📚 Revisa el concepto de volatilidad y reintenta.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: '#ef4444', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>NIVEL {qIdx + 1} / {MEM_QUESTS.length}</span>
                <span>CACHE OK: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{MEM_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {MEM_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === MEM_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === MEM_QUESTS[qIdx].a ? '#22c55e' : '#ef4444') : (chosen !== null && i === MEM_QUESTS[qIdx].a ? '#22c55e' : 'transparent'),
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
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', borderLeft: '10px solid #ef4444' }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{MEM_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < MEM_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: '#ef4444', color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < MEM_QUESTS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
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

export default Memoria;
