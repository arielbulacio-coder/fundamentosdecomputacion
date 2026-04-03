import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Box, Cpu, Settings, Database, Activity, 
  Terminal, Globe, HardDrive, Layers, Maximize2,
  RefreshCw, Play, ArrowRight, CheckCircle,
  Zap, Info, CheckSquare
} from 'lucide-react';

const LOGIC_QUESTS = [
  { q: '¿Qué entrada produce una salida 1 en una compuerta "AND"?', opts: ['1 y 1', '1 y 0', '0 y 0', 'Ninguna'], a: 0, exp: 'AND solo da verdadero si ambas entradas son verdaderas.' },
  { q: '¿Qué hace la compuerta "NOT"?', opts: ['Suma las entradas', 'Multiplica las entradas', 'Invierte la entrada (0->1, 1->0)', 'Apaga el sistema'], a: 2, exp: 'NOT es una negación lógica.' },
  { q: '¿Cuál es el resultado de (1 OR 0)?', opts: ['0', '1', 'Error', 'Depende del voltaje'], a: 1, exp: 'OR da verdadero si al menos una entrada es verdadera.' },
  { q: 'El Álgebra de Boole es la base de:', opts: ['La medicina', 'Los circuitos digitales y la programación', 'La cocina', 'La historia'], a: 1, exp: 'George Boole definió las bases de la lógica binaria moderna.' },
  { q: '¿Qué es una tabla de verdad?', opts: ['Un libro de filosofía', 'Una representación de todas las salidas posibles de una compuerta', 'Una lista de contraseñas', 'Un componente físico'], a: 1, exp: 'Permite visualizar el comportamiento lógico de cualquier combinación de entradas.' }
];

const LogicaDigital = () => {
  const [inA, setInA] = useState(0);
  const [inB, setInB] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const andOut = inA && inB;
  const orOut = inA || inB;
  const notA = inA ? 0 : 1;

  return (
    <LockedContent keyword="boole" title="Clase 9: Lógica Digital" unit={3}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Álgebra de Boole y Lógica
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Los ladrillos del pensamiento digital. Cómo simples compuertas construyen la inteligencia de cualquier procesador.
            </p>
          </motion.div>
        </header>

        {/* Simulador de Compuertas */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#1e293b', padding: '3rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', color: '#f59e0b' }}>Banco de Pruebas Lógicas</h2>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', justifyContent: 'center' }}>
                <button onClick={() => setInA(inA ? 0 : 1)} style={{ background: inA ? '#eab308' : '#334155', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer' }}>A: {inA}</button>
                <button onClick={() => setInB(inB ? 0 : 1)} style={{ background: inB ? '#eab308' : '#334155', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer' }}>B: {inB}</button>
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontWeight: 800 }}>AND (A ∧ B)</span>
                  <span style={{ color: andOut ? '#22c55e' : '#64748b', fontWeight: 900 }}>Resultado: {andOut}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontWeight: 800 }}>OR (A ∨ B)</span>
                  <span style={{ color: orOut ? '#22c55e' : '#64748b', fontWeight: 900 }}>Resultado: {orOut}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontWeight: 800 }}>NOT A (¬A)</span>
                  <span style={{ color: notA ? '#22c55e' : '#64748b', fontWeight: 900 }}>Resultado: {notA}</span>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/digital_logic_gates_neon_1775235547550.png" 
                alt="Digital Logic Gates" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(234,179,8,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Impacto y Ética */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
            <div>
              <Zap color="#f59e0b" size={40} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Lógica y Circuitos</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Cualquier programa complejo se reduce a miles de millones de estas operaciones básicas. La ALU de la CPU es esencialmente una red masiva de compuertas AND, OR y NOT.
              </p>
            </div>
            <div style={{ background: '#0f172a', padding: '3rem', borderRadius: '40px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}><Box size={24} color="#f59e0b" /> Tabla de Verdad (AND)</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                  <tr style={{ color: '#f59e0b', fontSize: '0.9rem' }}>
                    <th style={{ padding: '1rem' }}>A</th>
                    <th style={{ padding: '1rem' }}>B</th>
                    <th style={{ padding: '1rem' }}>Y (OUT)</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '1rem', opacity: 0.8 }}>
                  <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}><td>0</td><td>0</td><td>0</td></tr>
                  <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}><td>0</td><td>1</td><td>0</td></tr>
                  <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}><td>1</td><td>0</td><td>0</td></tr>
                  <tr style={{ background: 'rgba(234,179,8,0.1)' }}><td>1</td><td>1</td><td>1</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #f59e0b', boxShadow: '0 30px 60px rgba(234,179,8,0.1)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <CheckSquare size={56} color="#f59e0b" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Prueba de Lógica</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Puedes predecir la salida de un circuito digital?</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: 'linear-gradient(to right, #f59e0b, #ef4444)', color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem'
                }}
              >
                Comenzar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {LOGIC_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 4 ? '🚀 ¡Pensamiento Lógico nivel Boole!' : '📚 Revisa el simulador y las tablas de verdad.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: '#f59e0b', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>ESTADO {qIdx + 1} / {LOGIC_QUESTS.length}</span>
                <span>OK: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{LOGIC_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {LOGIC_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === LOGIC_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === LOGIC_QUESTS[qIdx].a ? '#22c55e' : '#ef4444') : (chosen !== null && i === LOGIC_QUESTS[qIdx].a ? '#22c55e' : 'transparent'),
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
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', borderLeft: '10px solid #f59e0b' }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{LOGIC_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < LOGIC_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: '#f59e0b', color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < LOGIC_QUESTS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
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

export default LogicaDigital;
