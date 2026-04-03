import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Cloud, Radio, Cpu, Share2, Globe, Laptop, 
  Users, CheckCircle, Smartphone, Rocket,
  RefreshCcw, Play, ArrowRight, Activity
} from 'lucide-react';

const C = {
  cloud: '#2ed573',
  transform: '#00f2ff',
  collab: '#a855f7',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc'
};

const CULTURA_QUESTS = [
  { q: '¿Qué es el Software como Servicio (SaaS)?', opts: ['Un software que se descarga en un CD', 'Un modelo de distribución donde el software se accede vía internet sin instalación local', 'Un virus informático', 'Hardware para servidores'], a: 1, exp: 'Ejemplos de SaaS son Google Workspace, Spotify o Netflix.' },
  { q: 'La "Transformación Digital" consiste en:', opts: ['Solo comprar computadoras nuevas', 'Cambiar el logo de la empresa', 'Integrar tecnología digital en todas las áreas de un negocio para cambiar su forma de operar', 'Usar menos electricidad'], a: 2, exp: 'Es un cambio cultural y de procesos potenciado por la tecnología.' },
  { q: '¿Qué tecnología permitió el trabajo colaborativo en tiempo real?', opts: ['Disco rígido mecánico', 'Cables de cobre básicos', 'Computación en la nube (Cloud Computing)', 'El mouse'], a: 2, exp: 'La nube permite que múltiples personas editen un mismo archivo simultáneamente.' },
  { q: 'Un impacto crítico de la informática en la industria actual es:', opts: ['La automatización de procesos mediante robótica e IA', 'Que las fábricas sean más grandes', 'Que los empleados usen mejores uniformes', 'Ninguno'], a: 0, exp: 'La automatización reduce errores y aumenta masivamente la productividad.' },
  { q: '¿Qué define a la "Cultura Digital"?', opts: ['Saber usar Excel únicamente', 'Conjunto de prácticas, costumbres e interacciones sociales que se realizan a través de medios digitales', 'Coleccionar computadoras viejas', 'Escribir rápido en el teclado'], a: 1, exp: 'Es cómo la sociedad se comporta y se relaciona en el entorno digital.' }
];

const ticsEvolution = [
  { title: 'Escritorio', desc: 'Sistemas aislados y almacenamiento físico.', icon: <Laptop /> },
  { title: 'Conectividad', desc: 'Aparición de internet y navegación global.', icon: <Globe /> },
  { title: 'Nube & Móvil', desc: 'Acceso ubicuo desde cualquier dispositivo.', icon: <Cloud /> },
  { title: 'Inteligencia', desc: 'Sistemas autónomos e hiperconectividad.', icon: <Radio /> }
];

const CulturaDigital = () => {
  const [activeEra, setActiveEra] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  return (
    <LockedContent keyword="transformacion" title="Clase 7: Cultura Digital" unit={3}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: C.text }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: `linear-gradient(to right, ${C.cloud}, ${C.transform})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Cultura Digital
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde la PC aislada hasta la hiperconectividad global. Entiende cómo la tecnología redefine nuestra forma de vivir y trabajar.
            </p>
          </motion.div>
        </header>

        {/* Evolución TICs e Imagen */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/cultura_digital_transformation.png" 
                alt="Digital Transformation" 
                style={{ width: '100%', borderRadius: '40px', boxShadow: `0 20px 50px ${C.transform}20` }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, transparent 40%, ${C.bg} 100%)`, borderRadius: '40px' }} />
            </div>
            <div style={{ background: C.card, padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2.5rem', textAlign: 'center' }}>Hitos Tecnológicos</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {ticsEvolution.map((era, i) => (
                  <motion.div 
                    key={i}
                    onMouseEnter={() => setActiveEra(i)}
                    style={{ 
                      padding: '1.5rem', borderRadius: '25px', border: '1px solid',
                      borderColor: i === activeEra ? C.cloud : 'rgba(255,255,255,0.05)',
                      background: i === activeEra ? C.cloud + '10' : 'transparent',
                      transition: '0.3s', cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <div style={{ color: i === activeEra ? C.cloud : '#475569' }}>{React.cloneElement(era.icon, { size: 24 })}</div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{era.title}</h4>
                        {activeEra === i && <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>{era.desc}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Transformación Digital */}
        <section style={{ marginBottom: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
          <div style={{ background: 'linear-gradient(135deg, ' + C.card + ', #000)', padding: '4rem', borderRadius: '45px', borderLeft: `8px solid ${C.transform}` }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: C.transform }}>Transformación Digital</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
              No es solo comprar tecnología; es repensar el modelo de negocio para centrarse en los datos, la agilidad y la colaboración ubicua.
            </p>
          </div>

          <div style={{ background: C.card, padding: '4rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <Rocket size={56} color={C.cloud} style={{ margin: '0 auto 2rem' }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem' }}>Impacto Industrial</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
              La <strong>Industria 4.0</strong> conecta sensores, robots e IA para crear procesos de producción infinitamente más eficientes.
            </p>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: `3px solid ${C.cloud}`, boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <Globe size={56} color={C.cloud} style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Desafío de Cultura</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Qué tan preparado estás para la economía digital del siglo XXI?</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: C.cloud, color: '#000', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem'
                }}
              >
                Comenzar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {CULTURA_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 4 ? '🚀 ¡Ciudadano Digital nivel Avanzado!' : '📚 Revisa la sección de SaaS y Nube.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: C.cloud, color: '#000', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: C.cloud, fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>NODO {qIdx + 1} / {CULTURA_QUESTS.length}</span>
                <span>SCO: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{CULTURA_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {CULTURA_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === CULTURA_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === CULTURA_QUESTS[qIdx].a ? '#22c55e' : '#ff4757') : (chosen !== null && i === CULTURA_QUESTS[qIdx].a ? '#22c55e' : 'transparent'),
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
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', borderLeft: `10px solid ${C.cloud}` }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{CULTURA_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < CULTURA_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: C.cloud, color: '#000', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < CULTURA_QUESTS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
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

export default CulturaDigital;
