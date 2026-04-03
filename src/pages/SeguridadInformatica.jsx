import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Lock, Eye, CheckCircle, ShieldCheck, Database, 
  Scale, AlertTriangle, Key, RefreshCw, Users,
  Terminal, Fingerprint, Globe, Shield
} from 'lucide-react';

const SECURITY_QUESTS = [
  { q: '¿Qué significa la "I" en la Tríada CIA de la seguridad?', opts: ['Inteligencia', 'Integridad', 'Internet', 'Identificación'], a: 1, exp: 'Integridad significa asegurar que los datos no han sido modificados de forma no autorizada.' },
  { q: '¿Cuál es un ejemplo de amenaza a la "Confidencialidad"?', opts: ['Un fallo en el suministro eléctrico', 'Un hacker robando una base de datos de contraseñas', 'Un error de software', 'Un virus que ralentiza la PC'], a: 1, exp: 'Confidencialidad asegura que solo las personas autorizadas vean los datos.' },
  { q: 'La "Disponibilidad" se ve comprometida por:', opts: ['Un ataque de denegación de servicio (DDoS)', 'El cifrado de archivos', 'El uso de contraseñas fuertes', 'Tener una PC nueva'], a: 0, exp: 'Disponibilidad asegura que los sistemas estén listos cuando el usuario los necesite.' },
  { q: '¿Cuál es la Tríada completa de la Seguridad Informática?', opts: ['Confidencialidad, Integridad y Disponibilidad', 'Control, Identidad y Autoridad', 'Cables, Internet y Aplicaciones', 'Software, Hardware y Datos'], a: 0, exp: 'CIA (Confidentiality, Integrity, Availability) es el modelo fundamental.' }
];

const SeguridadInformatica = () => {
  const [activeCIA, setActiveCIA] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const ciaTriad = [
    { id: 'C', title: 'Confidencialidad', desc: 'Prevenir que personas no autorizadas accedan a los datos. Cifrado y control de accesos.', Icon: Lock, color: '#ef4444' },
    { id: 'I', title: 'Integridad', desc: 'Asegurar que la información sea exacta y no haya sido alterada. Hashing y firmas digitales.', Icon: ShieldCheck, color: '#16a34a' },
    { id: 'A', title: 'Disponibilidad', desc: 'Garantizar que los sistemas estén accesibles. Protege contra fallos y ataques DoS.', Icon: RefreshCw, color: '#3b82f6' }
  ];

  const vulnerabilidades = [
    { title: 'Social Engineering', type: 'Factor Humano', desc: 'Engañar al usuario (phishing). El eslabón más débil.', Icon: Users },
    { title: 'Malware & Ransomware', type: 'Software Malicioso', desc: 'Programas diseñados para dañar o secuestrar datos.', Icon: AlertTriangle },
    { title: 'Zero-Day Flaws', type: 'Bugs Técnicos', desc: 'Debilidades desconocidas antes de que exista un parche.', Icon: Terminal }
  ];

  return (
    <LockedContent keyword="seguridad" title="Clase 11: Seguridad Informática" unit={4}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #ef4444, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Seguridad, Privacidad y Ética
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              En la era de la información, proteger los datos es proteger la libertad. Conoce los pilares que sustentan la confianza digital.
            </p>
          </motion.div>
        </header>

        {/* Tríada CIA */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {ciaTriad.map((item, i) => (
                <motion.div 
                  key={i}
                  onMouseEnter={() => setActiveCIA(i)}
                  style={{ 
                    padding: '2rem', borderRadius: '30px', border: '1.5px solid',
                    borderColor: activeCIA === i ? item.color : 'rgba(255,255,255,0.05)',
                    background: activeCIA === i ? item.color + '10' : '#1e293b',
                    cursor: 'pointer', transition: '0.3s'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ color: item.color }}><item.Icon size={32} /></div>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{item.title}</h3>
                      {activeCIA === i && <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.5rem' }}>{item.desc}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <img 
                src="/assets/cyber_security_shield_cia_1775235507133.png" 
                alt="CIA Triad Shield" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(239,68,68,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Amenazas */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>Ciberamenazas Modernas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {vulnerabilidades.map((v, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: '#ef4444', marginBottom: '1.5rem' }}><v.Icon size={40} style={{ margin: '0 auto' }} /></div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', fontWeight: 800 }}>{v.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #ef4444', boxShadow: '0 30px 60px rgba(239,68,68,0.1)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <Shield size={56} color="#ef4444" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Desafío de Ciberseguridad</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Qué tan preparado estás para defender los datos en un mundo hostil?</p>
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
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {SECURITY_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 3 ? '🛡️ Certificación: Defensor de la Privacidad' : '🔧 Fallos crírticos en el firewall. Revisa los conceptos de la CIA.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: '#ef4444', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>NIVEL {qIdx + 1} / {SECURITY_QUESTS.length}</span>
                <span>ESCUDO: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{SECURITY_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {SECURITY_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === SECURITY_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === SECURITY_QUESTS[qIdx].a ? '#22c55e' : '#ef4444') : (chosen !== null && i === SECURITY_QUESTS[qIdx].a ? '#22c55e' : 'transparent'),
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
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{SECURITY_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < SECURITY_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: '#ef4444', color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < SECURITY_QUESTS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
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

export default SeguridadInformatica;
