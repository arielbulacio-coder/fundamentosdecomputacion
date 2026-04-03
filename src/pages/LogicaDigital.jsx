import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { Cpu, Scale, Brain, Zap, Filter, Info, ChevronRight, Unlock, Lock } from 'lucide-react';

const LOGICA_QUESTS = [
  { q: '¿Cuál es la función de una compuerta AND?', opts: ['Solo da 1 si todas las entradas son 1', 'Da 1 si al menos una entrada es 1', 'Invierte la entrada', 'Da 0 siempre'], a: 0, exp: 'AND (Y) requiere que ambas condiciones sean verdaderas para dar un resultado positivo.' },
  { q: '¿Qué es una "burbuja de filtro" en redes sociales?', opts: ['Un error de conexión', 'Un estado donde el algoritmo solo te muestra información parecida a tus gustos previos', 'Una protección contra virus', 'Un círculo de amigos cerrado'], a: 1, exp: 'Los algoritmos usan lógica booleana y probabilidad para mostrarte lo que ya te gusta, limitando tu visión del mundo.' },
  { q: '¿Qué componente del procesador traduce niveles eléctricos a datos lógicos?', opts: ['Disco rígido', 'Conjunto de instrucciones (ISA)', 'Cables externos', 'Monitor'], a: 1, exp: 'La ISA permite que el software se comunique con el hardware digital.' },
  { q: 'En ética de automatización, si un algoritmo toma una decisión sesgada:', opts: ['No importa, es una máquina', 'La culpa es del usuario', 'La responsabilidad recae en quienes lo diseñaron y los datos de entrenamiento', 'Se debe borrar Internet'], a: 2, exp: 'La tecnología no es neutra; refleja los sesgos de sus creadores y de la sociedad.' },
  { q: '¿Qué es un "Algoritmo Social"?', opts: ['Un paso a paso para cocinar', 'Un conjunto de reglas lógicas que deciden qué contenidos priorizar para cada usuario', 'Una red de cables de fibra óptica', 'Un grupo de personas que hablan'], a: 1, exp: 'Los algoritmos sociales moldean lo que vemos y cómo pensamos.' }
];

const LogicaDigital = () => {
  const [selectedGate, setSelectedGate] = useState('AND');
  const [in1, setIn1] = useState(0);
  const [in2, setIn2] = useState(0);

  const getResult = () => {
    if (selectedGate === 'AND') return in1 && in2;
    if (selectedGate === 'OR') return in1 || in2;
    return in2 === 0 ? (in1 === 1 ? 0 : 1) : (in1 === 1 ? 0 : 1); // Simplificando NOT para propósitos de UI
  };

  const getGateResult = (g, a, b) => {
    if(g === 'AND') return a && b;
    if(g === 'OR') return a || b;
    if(g === 'XOR') return a !== b ? 1 : 0;
    return 0;
  }

  const currentResult = getGateResult(selectedGate, in1, in2);

  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  return (
    <LockedContent keyword="etica_digital" title="Clase 9: Lógica Digital y Ética" unit={3}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#1e293b' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Lógica Digital y Dimensión Ética
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#475569' }}>
              Desde las compuertas físicas en el silicio hasta los algoritmos que deciden nuestra visión del mundo.
            </p>
          </motion.div>
        </header>

        {/* Simulador de Compuertas */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div style={{ background: '#fff', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid #f1f5f9', boxShadow: '0 20px 40px -10px rgba(99,102,241,0.05)' }}>
              <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '2rem', fontWeight: 800 }}>Laboratorio Lógico</h2>
              <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.7, marginBottom: '3rem' }}>
                Interactúa con los niveles eléctricos. El procesador combina billones de estas operaciones por segundo para ejecutar el software.
              </p>
              
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                {['AND', 'OR', 'XOR'].map(gate => (
                  <button 
                    key={gate}
                    onClick={() => setSelectedGate(gate)}
                    style={{ 
                      flex: 1, padding: '1rem', borderRadius: '18px', border: 'none', fontWeight: 800, cursor: 'pointer',
                      background: selectedGate === gate ? '#6366f1' : '#f8fafc',
                      color: selectedGate === gate ? '#fff' : '#64748b',
                      transition: '0.3s', fontSize: '0.9rem'
                    }}
                  >
                    GATE {gate}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', background: '#f8fafc', padding: '2.5rem', borderRadius: '30px', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[in1, in2].map((val, idx) => (
                    <motion.button 
                      key={idx}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => idx === 0 ? setIn1(in1 ? 0 : 1) : setIn2(in2 ? 0 : 1)} 
                      style={{ 
                        width: '70px', height: '70px', borderRadius: '22px', border: 'none', cursor: 'pointer',
                        background: val ? '#22c55e' : '#cbd5e1', color: '#fff', fontSize: '1.5rem', fontWeight: 900,
                        boxShadow: val ? '0 10px 20px rgba(34,197,94,0.3)' : 'none', transition: '0.3s'
                      }}
                    >
                      {val}
                    </motion.button>
                  ))}
                </div>
                
                <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '20px', border: '2px solid #e2e8f0', fontWeight: 900, color: '#6366f1', fontSize: '1.3rem', zIndex: 1 }}>
                  {selectedGate}
                </div>

                <div style={{ position: 'relative' }}>
                  <ChevronRight color="#cbd5e1" size={48} />
                </div>

                <div style={{ 
                  width: '90px', height: '90px', borderRadius: '50%', 
                  background: currentResult ? '#6366f1' : '#f1f5f9', 
                  color: currentResult ? '#fff' : '#cbd5e1', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '2.8rem', fontWeight: 900, transition: '0.4s',
                  boxShadow: currentResult ? '0 15px 30px rgba(99,102,241,0.4)' : 'none'
                }}>
                  {currentResult}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '35px', border: '1.5px solid #f1f5f9' }}>
                <Zap color="#f59e0b" size={36} style={{ marginBottom: '1.5rem' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Set de Instrucciones (ISA)</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>El lenguaje secreto que permite al programador mover bits entre registros y memoria.</p>
              </div>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '35px', border: '1.5px solid #f1f5f9' }}>
                <Brain color="#6366f1" size={36} style={{ marginBottom: '1.5rem' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Cerebro Eléctrico</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>La unidad de control orquesta el flujo de energía para que los datos lleguen al lugar correcto.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sesgos y Ética */}
        <section style={{ marginBottom: '6rem', background: '#0f172a', padding: '5rem 3rem', borderRadius: '55px', color: '#fff', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <Filter color="#ec4899" size={42} />
                <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: 0 }}>Algoritmos Sociales</h2>
              </div>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#94a3b8', marginBottom: '2.5rem' }}>
                Los algoritmos no son neutros. IF (Historico_Usuario == X) THEN (Priorizar_Contenido_X). Esta lógica aparentemente simple crea <strong>burbujas de filtro</strong> que polarizan sociedades enteras.
              </p>
              <div style={{ padding: '2.5rem', background: 'rgba(236,72,153,0.05)', borderRadius: '35px', borderLeft: '6px solid #ec4899' }}>
                <Scale color="#ec4899" size={32} style={{ marginBottom: '1.25rem' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>El Sesgo Automatizado</h3>
                <p style={{ margin: 0, color: '#e2e8f0', fontSize: '1rem', lineHeight: 1.7, opacity: 0.9 }}>
                  Si un sistema es entrenado con datos del pasado que incluyen prejuicios, la máquina "aprenderá" a ser injusta de forma sistemática y veloz.
                </p>
              </div>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '4rem', borderRadius: '45px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 900, textAlign: 'center', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Reglas de Oro</h3>
              <div style={{ display: 'grid', gap: '2.5rem' }}>
                {[
                  { id: '01', title: 'Responsabilidad', desc: 'El programador es el garante ético de lo que su código decide.' },
                  { id: '02', title: 'Transparencia', desc: 'El usuario tiene derecho a saber por qué un algoritmo lo clasifica.' },
                  { id: '03', title: 'Pluralidad', desc: 'Fomentar la diversidad frente al pensamiento único algorítmico.' }
                ].map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '1.5rem' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ec4899', height: 'fit-content' }}>{item.id}</div>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', fontWeight: 800 }}>{item.title}</h4>
                      <p style={{ margin: 0, opacity: 0.6, fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#fff', padding: '4rem', borderRadius: '50px', border: '1.5px solid #e2e8f0', boxShadow: '0 30px 60px rgba(0,0,0,0.05)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <Brain size={56} color="#6366f1" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2.6rem', marginBottom: '1rem', fontWeight: 900, color: '#1e293b' }}>Análisis Crítico</h2>
              <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '3rem' }}>Demuestra tu comprensión sobre la lógica y sus consecuencias sociales.</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: 'linear-gradient(to right, #6366f1, #ec4899)', color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem',
                  boxShadow: '0 15px 30px rgba(99,102,241,0.2)'
                }}
              >
                Comenzar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Resultados: {score} / {LOGICA_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#64748b', marginBottom: '3rem' }}>{score >= 4 ? '🚀 Visión Sistémica lograda.' : '💡 Sigue explorando los cables y las ideas.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Desafío</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: '#6366f1', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>ANALIZANDO {qIdx + 1} / {LOGICA_QUESTS.length}</span>
                <span>PUNTOS: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.7rem', color: '#0f172a', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{LOGICA_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {LOGICA_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10 }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === LOGICA_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid #f1f5f9', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === LOGICA_QUESTS[qIdx].a ? '#22c55e' : '#ec4899') : (chosen !== null && i === LOGICA_QUESTS[qIdx].a ? '#22c55e' : '#fff'),
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
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3rem', background: '#f8fafc', borderRadius: '40px', borderLeft: '10px solid #ec4899' }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#475569' }}>{LOGICA_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < LOGICA_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: '#ec4899', color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < LOGICA_QUESTS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
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
