import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Shield, Cpu, Settings, Database, Activity, 
  Terminal, Globe, HardDrive, Layers, Maximize2,
  RefreshCw, Play, ArrowRight, CheckCircle
} from 'lucide-react';

const OS_QUESTS = [
  { q: '¿Qué es el "Kernel" de un Sistema Operativo?', opts: ['La pantalla de inicio', 'El núcleo que gestiona directamente el hardware y la memoria', 'Un navegador web', 'Un virus'], a: 1, exp: 'El Kernel es la parte fundamental del SO que actúa de puente entre software y hardware.' },
  { q: '¿Cuál es la función principal de la Gestión de Memoria?', opts: ['Borrar archivos viejos', 'Asignar espacio en RAM a cada programa sin que choquen', 'Aumentar la velocidad del disco', 'Limpiar el monitor'], a: 1, exp: 'Sin gestión de memoria, los programas intentarían usar el mismo espacio y el sistema colapsaría.' },
  { q: '¿Qué es la Memoria Virtual?', opts: ['RAM comprada por internet', 'Espacio del disco usado como si fuera RAM cuando esta se llena', 'Memoria que no existe', 'Un chip especial'], a: 1, exp: 'Permite ejecutar programas más grandes que la RAM física disponible.' },
  { q: '¿Qué hace el Planificador (Scheduler) de la CPU?', opts: ['Organiza el calendario', 'Decide qué programa usa el procesador en cada milisegundo', 'Apaga la PC', 'Busca actualizaciones'], a: 1, exp: 'Permite la multitarea, repartiendo el tiempo de CPU entre muchos procesos.' },
  { q: '¿Cuál es un ejemplo de un Sistema Operativo de código abierto?', opts: ['Windows 11', 'macOS', 'Linux (Ubuntu/Debian)', 'iOS'], a: 2, exp: 'Linux permite que cualquier persona vea y modifique su código fuente.' }
];

const SistemaOperativo = () => {
  const [activeLayer, setActiveLayer] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const layers = [
    { title: 'Hardware', desc: 'CPU, RAM, Discos y Periféricos en la base de todo.', Icon: HardDrive, color: '#94a3b8' },
    { title: 'Controladores', desc: 'Software que enseña al SO cómo hablar con el hardware específico.', Icon: Activity, color: '#f59e0b' },
    { title: 'Kernel', desc: 'El corazón. Gestiona procesos, memoria y archivos con acceso total.', Icon: Shield, color: '#ef4444' },
    { title: 'Shell / UI', desc: 'La interfaz (escritorio o terminal) donde el usuario da órdenes.', Icon: Terminal, color: '#16a34a' },
    { title: 'Aplicaciones', desc: 'Navegadores, editores y juegos en la capa más externa.', Icon: Globe, color: '#3b82f6' }
  ];

  return (
    <LockedContent keyword="kernel" title="Clase 10: El Sistema Operativo" unit={4}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #3b82f6, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              El Sistema Operativo
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              El maestro de orquesta de tu computadora. Gestionando millones de eventos por segundo para que todo parezca simple.
            </p>
          </motion.div>
        </header>

        {/* Capas del SO */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2rem', color: '#3b82f6' }}>Arquitectura de Capas</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                Un Sistema Operativo moderno se organiza en capas concéntricas. Cada una protege y abstrae la complejidad de la capa inferior.
              </p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {layers.map((layer, i) => (
                  <motion.div 
                    key={i}
                    onMouseEnter={() => setActiveLayer(i)}
                    style={{ 
                      padding: '1.5rem', borderRadius: '20px', border: '1.5px solid',
                      borderColor: activeLayer === i ? layer.color : 'rgba(255,255,255,0.05)',
                      background: activeLayer === i ? layer.color + '10' : '#1e293b',
                      cursor: 'pointer', transition: '0.3s'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <div style={{ color: layer.color }}><layer.Icon size={24} /></div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{layer.title}</h4>
                        {activeLayer === i && <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.5rem' }}>{layer.desc}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/operating_system_layers_glass_1775235566953.png" 
                alt="OS Layers" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(59,130,246,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 30%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Gestión de Recursos */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>Funciones de Control</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {[
              { icon: <Cpu />, title: 'Procesos', color: '#ef4444', desc: 'Multitarea: el SO reparte ráfagas de CPU entre todos los programas para que parezca que corren a la vez.' },
              { icon: <Database />, title: 'Memoria', color: '#3b82f6', desc: 'Aislamiento: asegura que Chrome no pueda leer ni escribir en el espacio de memoria de Word.' },
              { icon: <HardDrive />, title: 'Sist. Archivos', color: '#16a34a', desc: 'Abstracción de datos: organiza ceros y unos en carpetas y archivos legibles para el humano.' }
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
              <Settings size={56} color="#3b82f6" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Prueba de Administración</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Sabes cómo el Kernel mantiene el orden en el hardware?</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: 'linear-gradient(to right, #3b82f6, #16a34a)', color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem'
                }}
              >
                Comenzar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {OS_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 4 ? '🚀 ¡Administrador de Sistemas nivel Kernel!' : '📚 Revisa la sección de Memoria Virtual.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: '#3b82f6', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>PROCESO {qIdx + 1} / {OS_QUESTS.length}</span>
                <span>CPU OK: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{OS_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {OS_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === OS_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === OS_QUESTS[qIdx].a ? '#22c55e' : '#ef4444') : (chosen !== null && i === OS_QUESTS[qIdx].a ? '#22c55e' : 'transparent'),
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
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{OS_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < OS_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: '#3b82f6', color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < OS_QUESTS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
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

export default SistemaOperativo;
