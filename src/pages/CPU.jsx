import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Cpu, Settings, Database, Activity, 
  Terminal, Globe, HardDrive, Layers, Maximize2,
  RefreshCw, Play, ArrowRight, CheckCircle,
  Zap, Info, CheckSquare, Clock
} from 'lucide-react';

const CPU_QUESTS = [
  { q: '¿Qué componente de la CPU realiza las operaciones matemáticas?', opts: ['Unidad de Control', 'ALU (Unidad Aritmético-Lógica)', 'Memoria RAM', 'Bus de Datos'], a: 1, exp: 'La ALU es el motor de cálculo del procesador.' },
  { q: '¿Cuál es la función de los Registros?', opts: ['Guardar archivos permanentemente', 'Almacenamiento ultra-rápido y temporal dentro de la CPU', 'Enfriar la placa base', 'Conectar a Internet'], a: 1, exp: 'Los registros guardan los datos inmediatos con los que la ALU está operando.' },
  { q: '¿Qué marca el ritmo de procesamiento de la CPU?', opts: ['El tamaño del disco', 'La cantidad de núcleos', 'El Reloj (Clock)', 'El sistema operativo'], a: 2, exp: 'El reloj sincroniza todas las operaciones de la CPU mediante pulsos eléctricos.' },
  { q: 'El ciclo FDE significa:', opts: ['Fast Data Entry', 'Fetch, Decode, Execute', 'Final Digital Edition', 'File Data Error'], a: 1, exp: 'Es el proceso cíclico de buscar, decodificar y ejecutar cada instrucción.' },
  { q: '¿Qué hace la Unidad de Control (UC)?', opts: ['Suma números', 'Dirige el flujo de datos y coordina los otros componentes', 'Muestra imágenes', 'Ninguna'], a: 1, exp: 'La UC es el "director de orquesta" de la CPU.' }
];

const CPU = () => {
  const [fdeStep, setFdeStep] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const steps = [
    { title: 'Fetch (Búsqueda)', desc: 'La CPU busca la siguiente instrucción en la memoria RAM y la trae a sus registros internos.', color: '#3b82f6' },
    { title: 'Decode (Decodificación)', desc: 'La Unidad de Control interpreta qué operación debe realizar (ej: una suma o un salto).', color: '#f59e0b' },
    { title: 'Execute (Ejecución)', desc: 'La ALU realiza el cálculo o la acción solicitada. El ciclo vuelve a empezar.', color: '#16a34a' }
  ];

  return (
    <LockedContent keyword="procesador" title="Clase 3: La Unidad Central de Procesamiento" unit={2}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #3b82f6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              El Cerebro: La CPU
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Descubre el componente mas complejo creado por el hombre. Miles de millones de transistores trabajando en perfecta sincronía.
            </p>
          </motion.div>
        </header>

        {/* Simulador FDE */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#1e293b', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2rem', color: '#3b82f6' }}>Ciclo de Instrucción (FDE)</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                Cada segundo, tu procesador repite este ciclo miles de millones de veces (GigaHertz).
              </p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {steps.map((step, i) => (
                  <div 
                    key={i}
                    onClick={() => setFdeStep(i)}
                    style={{ 
                      padding: '1.5rem', borderRadius: '20px', border: '1.5px solid',
                      borderColor: fdeStep === i ? step.color : 'rgba(255,255,255,0.05)',
                      background: fdeStep === i ? step.color + '10' : 'transparent',
                      cursor: 'pointer', transition: '0.3s', fontWeight: 700
                    }}
                  >
                    {step.title}
                    {fdeStep === i && <p style={{ fontSize: '0.85rem', fontWeight: 400, color: '#94a3b8', marginTop: '0.5rem' }}>{step.desc}</p>}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setFdeStep((fdeStep + 1) % 3)}
                style={{ marginTop: '2.5rem', background: steps[fdeStep].color, color: '#000', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
              >
                <RefreshCw size={20} /> Avanzar Ciclo
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/cpu_architecture_modern_1775235433327.png" 
                alt="CPU Architecture" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(59,130,246,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Componentes Internos */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>Anatomía del Procesador</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {[
              { icon: <Settings />, title: 'U. de Control', color: '#ef4444', desc: 'Decodifica instrucciones y coordina todos los demás componentes.' },
              { icon: <Activity />, title: 'ALU', color: '#16a34a', desc: 'Realiza cálculos aritméticos y decisiones lógicas (sí/no).' },
              { icon: <Clock />, title: 'Reloj', color: '#3b82f6', desc: 'Sincroniza cada paso del procesador con pulsos eléctricos.' }
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
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #3b82f6', boxShadow: '0 30px 60px rgba(59,130,246,0.1)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <Cpu size={56} color="#3b82f6" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Prueba de Arquitectura</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Entiendes cómo funciona el corazón de la computadora?</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: 'linear-gradient(to right, #3b82f6, #a855f7)', color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem'
                }}
              >
                Comenzar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {CPU_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 4 ? '🚀 ¡Ingeniero de Hardware nivel Junior!' : '📚 Revisa los componentes de la ALU e intenta de nuevo.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: '#3b82f6', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>REGISTRO {qIdx + 1} / {CPU_QUESTS.length}</span>
                <span>ACIERTOS: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{CPU_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {CPU_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === CPU_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === CPU_QUESTS[qIdx].a ? '#22c55e' : '#ef4444') : (chosen !== null && i === CPU_QUESTS[qIdx].a ? '#22c55e' : 'transparent'),
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
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', borderLeft: '10px solid #3b82f6' }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{CPU_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < CPU_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: '#3b82f6', color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < CPU_QUESTS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
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

export default CPU;
