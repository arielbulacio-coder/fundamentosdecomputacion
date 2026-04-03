import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Database, Users, Settings, Share2, Layers, 
  Code, PlayCircle, Info, CheckCircle, 
  Briefcase, Cloud, Shield, Globe
} from 'lucide-react';

const C = {
  info: '#0ea5e9',
  software: '#8b5cf6',
  people: '#ec4899',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc'
};

const SOCIEDAD_QUESTS = [
  { q: '¿Cuál es el componente del Sistema de Información que incluye a los usuarios y administradores?', opts: ['Software', 'Datos', 'Personas / Humanware', 'Hardware'], a: 2, exp: 'El factor humano es esencial para que la información tenga sentido y propósito.' },
  { q: 'En el ciclo de vida de la información, el "Procesamiento" sirve para:', opts: ['Borrar los datos', 'Convertir datos brutos en información útil', 'Vender la PC', 'Descargar virus'], a: 1, exp: 'Procesar implica transformar datos aislados en conocimiento accionable.' },
  { q: 'El Software de Base tiene como función principal:', opts: ['Editar fotos', 'Gestionar el hardware y servir de plataforma a otros programas', 'Jugar online', 'Escribir documentos'], a: 1, exp: 'El Sistema Operativo es el ejemplo principal de software de base.' },
  { q: '¿Qué es un Sistema de Información (SI)?', opts: ['Un conjunto de cables', 'Cualquier software de juegos', 'Conjunto de componentes interrelacionados que recolectan, procesan y distribuyen información', 'Una base de datos de Excel únicamente'], a: 2, exp: 'Un SI es mucho más que tecnología; incluye procesos y personas.' },
  { q: 'Un compilador o un IDE (entorno de desarrollo) se clasifica como:', opts: ['Software de Base', 'Software de Aplicación', 'Software de Desarrollo / Programación', 'Hardware'], a: 2, exp: 'Son herramientas usadas por programadores para crear nuevo software.' }
];

const SociedadSoftware = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const steps = [
    { title: 'Captura/Entrada', desc: 'Recolección de datos brutos desde sensores, teclados o formularios.', icon: <PlayCircle /> },
    { title: 'Procesamiento', desc: 'Transformación de datos mediante algoritmos y lógica de negocio.', icon: <Settings /> },
    { title: 'Almacenamiento', desc: 'Guardado persistente en bases de datos o sistemas de archivos.', icon: <Database /> },
    { title: 'Distribución', desc: 'Presentación de la información final al usuario o envío a otros sistemas.', icon: <Share2 /> }
  ];

  return (
    <LockedContent keyword="ecosistema" title="Clase 6: Sociedad y Software" unit={3}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: C.text }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: `linear-gradient(to right, ${C.info}, ${C.software})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Sociedad y Software
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde el dato aislado hasta la orquestación global. Entiende cómo el software actúa como el tejido que conecta nuestra civilización moderna.
            </p>
          </motion.div>
        </header>

        {/* Componentes del SI e Imagen */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { icon: <Users />, title: 'Humanware', color: C.people, desc: 'Usuarios y admins.' },
                { icon: <Layers />, title: 'Hardware', color: C.info, desc: 'Soporte físico.' },
                { icon: <Code />, title: 'Software', color: C.software, desc: 'Lógica aplicada.' },
                { icon: <Database />, title: 'Dataware', color: '#10b981', desc: 'Combustible informativo.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  style={{ background: C.card, padding: '2rem', borderRadius: '30px', border: '1.5px solid rgba(255,255,255,0.05)', textAlign: 'center' }}
                >
                  <div style={{ color: item.color, marginBottom: '1rem' }}>{React.cloneElement(item.icon, { size: 24, style: { margin: '0 auto' } })}</div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>{item.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/sociedad_software_networks.png" 
                alt="Social Networks" 
                style={{ width: '100%', borderRadius: '40px', boxShadow: `0 20px 50px ${C.software}20` }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, transparent 40%, ${C.bg} 100%)`, borderRadius: '40px' }} />
            </div>
          </div>
        </section>

        {/* Ciclo de Vida interactivo */}
        <section style={{ marginBottom: '6rem', background: '#111', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 900 }}>Ciclo de la Información</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                onMouseEnter={() => setActiveStep(i)}
                style={{ 
                  display: 'flex', gap: '2rem', padding: '2rem', borderRadius: '30px',
                  background: activeStep === i ? '#ffffff05' : 'transparent',
                  border: activeStep === i ? `2px solid ${C.info}` : '1.5px solid #ffffff05',
                  transition: '0.3s', cursor: 'pointer'
                }}
              >
                <div style={{ color: activeStep === i ? C.info : '#475569' }}>{React.cloneElement(step.icon, { size: 32 })}</div>
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{step.title}</h4>
                  <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: `3px solid ${C.info}`, boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <Globe size={56} color={C.info} style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Desafío de Sociedad</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Cómo interactúan los componentes en nuestro ecosistema?</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: C.info, color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem'
                }}
              >
                Comenzar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {SOCIEDAD_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 4 ? '🚀 ¡Analista Digital Nivel Pro!' : '📚 Revisa los componentes del Humanware.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: C.info, color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: C.info, fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>NODO {qIdx + 1} / {SOCIEDAD_QUESTS.length}</span>
                <span>SCO: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{SOCIEDAD_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {SOCIEDAD_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === SOCIEDAD_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === SOCIEDAD_QUESTS[qIdx].a ? '#22c55e' : '#ff4757') : (chosen !== null && i === SOCIEDAD_QUESTS[qIdx].a ? '#22c55e' : 'transparent'),
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
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', borderLeft: `10px solid ${C.info}` }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{SOCIEDAD_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < SOCIEDAD_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: C.info, color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < SOCIEDAD_QUESTS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
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

export default SociedadSoftware;
