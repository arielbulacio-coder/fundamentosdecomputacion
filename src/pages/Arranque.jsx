import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Power, Settings, Layout, Database, 
  Terminal, Globe, HardDrive, Layers, 
  RefreshCw, Play, ArrowRight, CheckCircle,
  Activity, Info, Cpu
} from 'lucide-react';

const BOOT_QUESTS = [
  { q: '¿Qué es el POST (Power-On Self-Test)?', opts: ['Un mensaje en redes sociales', 'Un autodiagnóstico del hardware al encender la PC', 'Un tipo de memoria', 'El nombre del monitor'], a: 1, exp: 'El POST verifica que los componentes críticos (CPU, RAM, etc.) funcionen antes de arrancar.' },
  { q: '¿Dónde reside tradicionalmente la BIOS/UEFI?', opts: ['En el disco rígido', 'En la memoria RAM', 'En un chip de memoria no volátil (ROM/Flash) en la placa base', 'En la nube'], a: 2, exp: 'Es un firmware persistente que arranca el hardware inicial.' },
  { q: '¿Qué función cumple el Bootloader?', opts: ['Dibujar el fondo de pantalla', 'Cargar el núcleo (Kernel) del Sistema Operativo en RAM', 'Aumentar el voltaje', 'Limpiar el disco'], a: 1, exp: 'El Bootloader busca y ejecuta el sistema operativo encontrado en el disco.' },
  { q: '¿Cuál es la diferencia principal entre BIOS y UEFI?', opts: ['No hay diferencia', 'UEFI es el sucesor moderno que permite discos más grandes y arranque seguro', 'BIOS es más rápida', 'UEFI solo sirve para Linux'], a: 1, exp: 'UEFI reemplazó a BIOS con mejores capacidades, seguridad e interfaz gráfica.' },
  { q: '¿Cuál es el último paso del arranque?', opts: ['Cargar el POST', 'La inicialización del kernel y el inicio de los servicios de usuario', 'Escribir en el teclado', 'Encender el LED de encendido'], a: 1, exp: 'Una vez el Kernel toma el control, el SO está listo para el usuario.' }
];

const Arranque = () => {
  const [bootStep, setBootStep] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const steps = [
    { title: 'POST (Self-Test)', desc: 'Verificación del hardware: CPU, RAM y Video deben estar OK.', icon: <Cpu />, color: '#ef4444' },
    { title: 'Firmware (BIOS/UEFI)', desc: 'Localiza el dispositivo de arranque (Disco, USB, etc.).', icon: <Settings />, color: '#f59e0b' },
    { title: 'Bootloader', desc: 'El programa que sabe cómo despertar al Sistema Operativo.', icon: <Layout />, color: '#3b82f6' },
    { title: 'Kernel Init', desc: 'El SO toma el control total y carga los drivers finales.', icon: <RefreshCw />, color: '#16a34a' }
  ];

  return (
    <LockedContent keyword="encendido" title="Clase 5: Hardware y Arranque" unit={2}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #ef4444, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Hardware y Boot
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde que pulsas el botón hasta que aparece el escritorio. Los milisegundos más críticos de la informática.
            </p>
          </motion.div>
        </header>

        {/* Simulador de Arranque */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#1e293b', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2rem', color: '#ef4444' }}>Secuencia de Encendido</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    onClick={() => setBootStep(i)}
                    style={{ 
                      padding: '1.5rem', borderRadius: '20px', border: '1.5px solid',
                      borderColor: bootStep === i ? step.color : 'rgba(255,255,255,0.05)',
                      background: bootStep === i ? step.color + '10' : 'transparent',
                      cursor: 'pointer', transition: '0.3s'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <div style={{ color: bootStep === i ? step.color : '#475569' }}>{React.cloneElement(step.icon, { size: 24 })}</div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{step.title}</h4>
                        {bootStep === i && <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>{step.desc}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button 
                onClick={() => setBootStep((bootStep + 1) % 4)}
                style={{ marginTop: '2.5rem', background: steps[bootStep].color, color: '#000', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
              >
                <Power size={20} /> Avanzar Proceso
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/pc_boot_process_bios_glow_1775235626969.png" 
                alt="Boot Process" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(239,68,68,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Diagnóstico */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
            <div>
              <Activity color="#ef4444" size={40} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>El rol del POST</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                ¿Has oído pitidos al encender una PC? Son códigos de error del POST. Si la RAM falla o la GPU no se detecta, el sistema avisa antes de intentar cargar cualquier software.
              </p>
            </div>
            <div>
              <HardDrive color="#3b82f6" size={40} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Evolución: UEFI</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                UEFI no solo es más bonito que la BIOS azul clásica; también protege el sistema contra virus de arranque (Bootkits) mediante el Arranque Seguro (Secure Boot).
              </p>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #ef4444', boxShadow: '0 30px 60px rgba(239,68,68,0.1)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <Power size={56} color="#ef4444" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Prueba de Arranque</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Sabes qué ocurre cuando pulsas el botón de encendido?</p>
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
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {BOOT_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 4 ? '🚀 ¡Especialista en Mantenimiento Pro!' : '📚 Revisa los pasos del POST y el Bootloader.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: '#ef4444', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>PASO {qIdx + 1} / {BOOT_QUESTS.length}</span>
                <span>BOOT OK: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{BOOT_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {BOOT_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === BOOT_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === BOOT_QUESTS[qIdx].a ? '#22c55e' : '#ef4444') : (chosen !== null && i === BOOT_QUESTS[qIdx].a ? '#22c55e' : 'transparent'),
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
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{BOOT_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < BOOT_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: '#ef4444', color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < BOOT_QUESTS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
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

export default Arranque;
