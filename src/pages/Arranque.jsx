import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Power, Cpu, HardDrive, Smartphone, Monitor, 
  Zap, Info, CheckCircle, RefreshCcw, Bell,
  Activity, ArrowRight, ShieldCheck, Database
} from 'lucide-react';

const C = {
  boot: '#00f2ff',
  io: '#a855f7',
  interrupt: '#ff4757',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc'
};

const BOOT_QUESTS = [
  { q: '¿Qué significa POST?', opts: ['Power-On Self-Test', 'Primary Operating System Tool', 'Point Of Service Terminal', 'Processor Optimization Start'], a: 0, exp: 'POST es la prueba inicial que hace el firmware para verificar la salud del hardware.' },
  { q: '¿Cuál es la función del BIOS/UEFI?', opts: ['Navegar por internet', 'Inicializar el hardware y buscar el gestor de arranque', 'Instalar juegos', 'Limpiar el disco'], a: 1, exp: 'Es el primer software que corre al encender la PC.' },
  { q: '¿Qué es una Interrupción (Interrupt)?', opts: ['Un error fatal', 'Un choque eléctrico para apagar la PC', 'Una señal de hardware para que la CPU atienda un evento', 'Un virus'], a: 2, exp: 'Permite que el hardware (como el teclado) detenga a la CPU para ser procesado.' },
  { q: 'El "Kernel" del Sistema Operativo se carga en:', opts: ['La Memoria RAM', 'El monitor', 'El cable de red', 'La fuente de poder'], a: 0, exp: 'Para ejecutarse, el núcleo del SO debe estar en la RAM.' },
  { q: '¿Qué es el "Bootloader"?', opts: ['Un programa para descargar archivos', 'El gestor que carga el Sistema Operativo', 'Un virus de arranque', 'Un tipo de disco'], a: 1, exp: 'Ejemplos son GRUB o Windows Boot Manager.' }
];

const steps = [
  { title: 'PC Apagada', desc: 'Presiona Iniciar para encender el sistema.', action: 'Energizar' },
  { title: '1. POST', desc: 'El firmware (BIOS/UEFI) despierta y verifica que haya memoria RAM, CPU funcional y periféricos esenciales básicos.', action: 'Test Hardware' },
  { title: '2. Búsqueda de Gestor', desc: 'La BIOS busca en los discos (SSD/HDD/USB) un "Bootloader" o Gestor de Arranque (ej: GRUB, Windows Boot Manager).', action: 'Cargar Bootloader' },
  { title: '3. Kernel Init', desc: 'El núcleo del SO se carga en la memoria RAM y asume el control absoluto del hardware.', action: 'Iniciar SO' },
  { title: '4. Interfaz Lista', desc: 'El sistema carga la interfaz gráfica, lanza los servicios y empieza a responder al usuario.', action: 'Misión Completa' }
];

const Arranque = () => {
  const [bootStep, setBootStep] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  return (
    <LockedContent keyword="firmware" title="Clase 5: Arranque e Interrupciones" unit={2}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: C.text }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: `linear-gradient(to right, ${C.boot}, ${C.io})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Interfaz de Hardware y Arranque
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde el primer pulso eléctrico hasta el escritorio interactivo. El baile coordinado entre Firmware, Kernel y Periféricos.
            </p>
          </motion.div>
        </header>

        {/* Simulador de Arranque */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: '1.5px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={bootStep}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    style={{ marginBottom: '2.5rem' }}
                  >
                    <div style={{ 
                      width: '120px', height: '120px', borderRadius: '50%', background: bootStep > 0 ? C.boot + '20' : 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: `2px solid ${bootStep > 0 ? C.boot : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: bootStep > 0 ? `0 0 40px ${C.boot}20` : 'none'
                    }}>
                      {bootStep === 0 && <Power size={48} opacity={0.3} />}
                      {bootStep === 1 && <Cpu size={48} color={C.boot} />}
                      {bootStep === 2 && <ShieldCheck size={48} color={C.boot} />}
                      {bootStep === 3 && <Database size={48} color={C.boot} />}
                      {bootStep === 4 && <Monitor size={48} color={C.boot} />}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1.25rem' }}>{steps[bootStep].title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>{steps[bootStep].desc}</p>
                
                <button 
                  onClick={() => setBootStep(b => (b + 1) % steps.length)}
                  style={{ 
                    background: bootStep === steps.length - 1 ? C.interrupt : C.boot, color: bootStep === steps.length - 1 ? '#fff' : '#000',
                    border: 'none', padding: '1.25rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0 auto'
                  }}
                >
                  {bootStep === steps.length - 1 ? <RefreshCcw size={20} /> : <ArrowRight size={20} />}
                  {steps[bootStep].action}
                </button>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {steps.map((step, i) => (
                  <div 
                    key={i}
                    style={{ 
                      padding: '1.25rem 2rem', borderRadius: '20px', border: '1.5px solid',
                      borderColor: i === bootStep ? C.boot : 'rgba(255,255,255,0.03)',
                      background: i === bootStep ? C.boot + '10' : 'transparent',
                      color: i === bootStep ? C.text : '#475569',
                      transition: '0.3s', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '1rem'
                    }}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i <= bootStep ? C.boot : '#334155' }} />
                    {step.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Entrada/Salida e Interrupciones */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            <div style={{ background: C.card, padding: '3.5rem', borderRadius: '45px', border: `1.5px solid ${C.io}30` }}>
              <div style={{ background: C.io + '15', color: C.io, padding: '1.25rem', borderRadius: '25px', width: 'fit-content', marginBottom: '2rem' }}>
                <Zap size={32} />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>E/S (I/O)</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
                El flujo de datos con el mundo exterior. La CPU usa <strong>puertos</strong> y <strong>controladores</strong> para hablar con el teclado, el disco o la red.
              </p>
              <div style={{ background: '#000', padding: '1.5rem', borderRadius: '20px', fontSize: '0.9rem', opacity: 0.7 }}>
                <Info size={16} /> <strong>Polling:</strong> Método antiguo e ineficiente donde la CPU pregunta constantemente "¿tienes datos para mí?".
              </div>
            </div>

            <div style={{ background: C.card, padding: '3.5rem', borderRadius: '45px', border: `1.5px solid ${C.interrupt}30` }}>
              <div style={{ background: C.interrupt + '15', color: C.interrupt, padding: '1.25rem', borderRadius: '25px', width: 'fit-content', marginBottom: '2rem' }}>
                <Bell size={32} />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Interrupciones</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
                El método moderno. Un periférico envía una señal eléctrica (<strong>IRQ</strong>) para forzar a la CPU a pausar su tarea y atenderlo de inmediato.
              </p>
              <div style={{ background: '#000', padding: '1.5rem', borderRadius: '20px', fontSize: '0.9rem', opacity: 0.7 }}>
                <Activity size={16} /> <strong>Multitarea:</strong> Las interrupciones permiten que el mouse se mueva fluido aunque el procesador esté al 100%.
              </div>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: `2px solid ${C.boot}40`, boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <CheckCircle size={56} color={C.boot} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Desafío de Firmware</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Eres capaz de diagnosticar un fallo de POST?</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: C.boot, color: '#000', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem',
                  boxShadow: `0 15px 30px ${C.boot}30`
                }}
              >
                Comenzar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {BOOT_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 4 ? '🚀 ¡Sistema Operativo Cargado con éxito!' : '🔧 Error de POST. Revisa la documentación del BIOS.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: C.boot, color: '#000', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: C.boot, fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>SECTOR {qIdx + 1} / {BOOT_QUESTS.length}</span>
                <span>OK: {score}</span>
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
                      background: chosen === i ? (i === BOOT_QUESTS[qIdx].a ? '#22c55e' : '#ff4757') : (chosen !== null && i === BOOT_QUESTS[qIdx].a ? '#22c55e' : 'transparent'),
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
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', borderLeft: `10px solid ${C.boot}` }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{BOOT_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < BOOT_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: C.boot, color: '#000', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
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
