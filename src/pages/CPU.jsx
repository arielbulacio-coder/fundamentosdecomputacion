import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Cpu, Zap, Activity, Database, Terminate, 
  Play, RotateCcw, ChevronRight, Info, ShieldCheck,
  Smartphone, Monitor, Laptop
} from 'lucide-react';

const C = {
  cpu: '#00f2ff',
  alu: '#7000ff',
  uc: '#ff007a',
  mem: '#a855f7',
  clock: '#f59e0b',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc',
  accent: '#3b82f6'
};

const QUESTIONS = [
  { q: '¿Qué componente es el encargado de realizar comparaciones lógicas (SI/NO)?', opts: ['Unidad de Control', 'ALU', 'Memoria RAM', 'Disco Rígido'], a: 1, exp: 'La ALU (Unidad Aritmético-Lógica) realiza cálculos y operaciones lógicas.' },
  { q: '¿Cuál es el "director de orquesta" que coordina el flujo de datos?', opts: ['ALU', 'Registros', 'Unidad de Control', 'Reloj'], a: 2, exp: 'La UC interpreta las instrucciones y dirige al resto de los componentes.' },
  { q: 'La fase FETCH consiste en:', opts: ['Ejecutar la suma', 'Buscar la instrucción en la memoria', 'Guardar el resultado', 'Decodificar el código'], a: 1, exp: 'Fetch es el primer paso: traer la instrucción desde la RAM a la CPU.' },
  { q: '¿Qué arquitectura usa Apple Silicon (M1/M2) y la mayoría de los celulares?', opts: ['CISC', 'RISC', 'Harvard', 'Von Neumann Puro'], a: 1, exp: 'Los chips modernos de alta eficiencia suelen usar RISC (como ARM).' },
  { q: '¿Para qué sirve el Reloj del Sistema?', opts: ['Para dar la hora', 'Para sincronizar las operaciones de la CPU', 'Para enfriar el procesador', 'Para medir la carga de batería'], a: 1, exp: 'El reloj genera pulsos eléctricos que marcan el ritmo de cada paso del procesador.' },
  { q: '¿En qué registro se guarda la dirección de la PRÓXIMA instrucción?', opts: ['Acumulador', 'IR (Registro de Instrucción)', 'PC (Contador de Programa)', 'ALU'], a: 2, exp: 'El PC (Program Counter) siempre apunta a la dirección de memoria que sigue.' },
  { q: '¿Qué sucede en la fase de Decodificación (Decode)?', opts: ['Se suma 1+1', 'La UC traduce el código binario en señales de control', 'Se borra la RAM', 'Se envía el dato al monitor'], a: 1, exp: 'La UC "entiende" qué debe hacer el procesador analizando el código de la instrucción.' },
  { q: 'ISA significa:', opts: ['Internal System Architecture', 'Instruction Set Architecture', 'Internet Standard Access', 'Integrated Software Application'], a: 1, exp: 'ISA es el conjunto de instrucciones que definen el lenguaje del hardware.' },
  { q: '¿Qué significa que un procesador corre a 3.5 GHz?', opts: ['Que tiene 3.5 GB de RAM', 'Que realiza 3.500 millones de ciclos por segundo', 'Que consume 3.5 Watts', 'Que tiene 3 núcleos y medio'], a: 1, exp: 'Giga (mil millones) Hertz (ciclos por segundo) define la frecuencia del reloj.' },
  { q: 'En la arquitectura CISC, las instrucciones suelen ser:', opts: ['Todas del mismo tamaño', 'Variables en tamaño y complejidad', 'Muy simples y rápidas', 'Solo de lectura'], a: 1, exp: 'CISC usa instrucciones potentes que pueden requerir varios ciclos para ejecutarse.' }
];

const PHASES = ['IDLE', 'FETCH', 'DECODE', 'EXECUTE', 'STORE'];
const PHASE_INFO = {
  IDLE: { label: '💤 Reposo', log: '💡 El procesador está listo. Inicia un nuevo ciclo FDE.', color: '#94a3b8' },
  FETCH: { label: '📡 FETCH', color: C.cpu, log: '📡 FETCH: Traemos la instrucción desde la RAM al Registro de Instrucción (IR).' },
  DECODE: { label: '🧠 DECODE', color: C.uc, log: '🧠 DECODE: La UC analiza el código binario de la instrucción para saber qué hacer.' },
  EXECUTE: { label: '⚙️ EXECUTE', color: C.alu, log: '⚙️ EXECUTE: La ALU realiza la operación matemática o lógica solicitada.' },
  STORE: { label: '💾 STORE', color: C.mem, log: '💾 STORE: El resultado se almacena en el Acumulador o se guarda en memoria.' }
};

const CPU = () => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [pc, setPc] = useState(0);
  const [ir, setIr] = useState('---');
  const [acc, setAcc] = useState(0);
  const [clockPulse, setClockPulse] = useState(false);
  const [log, setLog] = useState(PHASE_INFO.IDLE.log);
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const currentPhase = PHASES[phaseIdx];
  const info = PHASE_INFO[currentPhase];

  const advancePhase = () => {
    setClockPulse(true);
    setTimeout(() => setClockPulse(false), 400);

    const next = (phaseIdx + 1) % PHASES.length;
    setPhaseIdx(next);
    setLog(PHASE_INFO[PHASES[next]].log);

    if (PHASES[next] === 'FETCH') {
      setIr(`ADD #${pc + 1}`);
    }
    if (PHASES[next] === 'EXECUTE') {
      setAcc(prev => (prev + 5) % 256);
    }
    if (PHASES[next] === 'IDLE') {
      setPc(prev => (prev + 1) % 16);
    }
  };

  return (
    <LockedContent keyword="procesador" title="Clase 3: El Cerebro (CPU)" unit={2}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: C.text }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #00f2ff, #7000ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Arquitectura del Procesador
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              El corazón de silicio donde billones de transistores orquestan la realidad digital que ves cada segundo.
            </p>
          </motion.div>
        </header>

        {/* Simulador FDE */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            <div style={{ background: C.card, padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={18} color={clockPulse ? C.clock : '#334155'} />
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#64748b', letterSpacing: '1px' }}>CLOCK PULSE</span>
              </div>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <motion.div animate={{ borderColor: currentPhase === 'DECODE' ? C.uc : 'rgba(255,255,255,0.1)' }} style={{ padding: '2rem', borderRadius: '25px', border: '2px solid', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: C.uc }}>
                    <span style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>UNIDAD DE CONTROL</span>
                    <Activity size={18} />
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.6 }}>Decodifica instrucciones y coordina buses.</p>
                </motion.div>

                <motion.div animate={{ borderColor: currentPhase === 'EXECUTE' ? C.alu : 'rgba(255,255,255,0.1)' }} style={{ padding: '2rem', borderRadius: '25px', border: '2px solid', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: C.alu, marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>ALU / REGISTROS</span>
                    <Cpu size={20} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ background: '#000', padding: '0.8rem', borderRadius: '12px', textAlign: 'center' }}>
                      <small style={{ display: 'block', opacity: 0.4, fontSize: '0.55rem', fontWeight: 900 }}>ACC</small>
                      <span style={{ fontSize: '1.2rem', fontFamily: 'monospace', fontWeight: 700 }}>{acc}</span>
                    </div>
                    <div style={{ background: '#000', padding: '0.8rem', borderRadius: '12px', textAlign: 'center' }}>
                      <small style={{ display: 'block', opacity: 0.4, fontSize: '0.55rem', fontWeight: 900 }}>PC</small>
                      <span style={{ fontSize: '1.2rem', fontFamily: 'monospace', fontWeight: 700 }}>{pc}</span>
                    </div>
                  </div>
                  <div style={{ background: '#000', padding: '0.8rem', borderRadius: '12px', textAlign: 'center', marginTop: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <small style={{ display: 'block', opacity: 0.4, fontSize: '0.55rem', fontWeight: 900 }}>IR (Instruction Register)</small>
                    <span style={{ fontSize: '1rem', fontFamily: 'monospace', fontWeight: 700, color: C.cpu }}>{ir}</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '40px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: info.color + '20', color: info.color, padding: '0.75rem', borderRadius: '16px' }}>
                    <Info size={24} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Fase: {info.label}</h3>
                </div>
                <p style={{ margin: 0, color: '#94a3b8', lineHeight: 1.7, fontSize: '1.05rem', minHeight: '80px' }}>
                  {log}
                </p>
                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={advancePhase}
                    style={{ flex: 1, background: 'linear-gradient(to right, #00f2ff, #7000ff)', border: 'none', padding: '1.4rem', borderRadius: '22px', color: '#fff', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.1rem' }}
                  >
                    <Play size={20} fill="currentColor" /> AVANZAR CICLO
                  </motion.button>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setPhaseIdx(0); setPc(0); setIr('---'); setAcc(0); setLog(PHASE_INFO.IDLE.log); }}
                    style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '1.4rem', borderRadius: '22px', color: '#fff', cursor: 'pointer' }}
                  >
                    <RotateCcw size={22} />
                  </motion.button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ padding: '2rem', background: '#000', borderRadius: '30px', border: '1px solid rgba(0,242,255,0.2)' }}>
                  <Smartphone size={32} color={C.cpu} style={{ marginBottom: '1rem' }} />
                  <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800 }}>Arquitectura RISC</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.6 }}>Eficiente y simple. Domina celulares y procesadores Apple M1/2/3.</p>
                </div>
                <div style={{ padding: '2rem', background: '#000', borderRadius: '30px', border: '1px solid rgba(112,0,255,0.2)' }}>
                  <Monitor size={32} color={C.alu} style={{ marginBottom: '1rem' }} />
                  <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800 }}>Arquitectura CISC</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.6 }}>Potente y compleja. El estándar de Intel y AMD para PCs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: '2px solid rgba(0,242,255,0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <ShieldCheck size={56} color={C.cpu} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 900 }}>Prueba de Arquitectura</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Comprendes cómo se mueve la información dentro del silicio?</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: 'linear-gradient(to right, #00f2ff, #7000ff)', color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem',
                  boxShadow: '0 15px 30px rgba(0,242,255,0.2)'
                }}
              >
                Comenzar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {QUESTIONS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 7 ? '🚀 Dominas el hardware.' : '🔧 Sigue explorando los registros.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: 'linear-gradient(to right, #00f2ff, #7000ff)', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Desafío</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: C.cpu, fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>REGISTRO {qIdx + 1} / {QUESTIONS.length}</span>
                <span>ACIERTOS: {score}</span>
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
                      background: chosen === i ? (i === QUESTIONS[qIdx].a ? '#22c55e' : '#ef4444') : (chosen !== null && i === QUESTIONS[qIdx].a ? '#22c55e' : 'transparent'),
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
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', borderLeft: `8px solid ${C.cpu}` }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{QUESTIONS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < QUESTIONS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: 'linear-gradient(to right, #00f2ff, #7000ff)', color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < QUESTIONS.length ? 'Siguiente Instrucción' : 'Finalizar Proceso'}
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
