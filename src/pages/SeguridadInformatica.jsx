import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Lock, Eye, CheckCircle, ShieldCheck, Database, 
  Scale, AlertTriangle, Key, RefreshCw, Users,
  Terminal, Fingerprint, Globe
} from 'lucide-react';

const SECURITY_QUESTS = [
  { q: '¿Qué significa la "I" en la Tríada CIA de la seguridad?', opts: ['Inteligencia', 'Integridad', 'Internet', 'Identificación'], a: 1, exp: 'Integridad significa asegurar que los datos no han sido modificados de forma no autorizada durante su almacenamiento o transmisión.' },
  { q: '¿Cuál es un ejemplo de amenaza a la "Confidencialidad"?', opts: ['Un fallo en el suministro eléctrico', 'Un hacker robando una base de datos de contraseñas', 'Un error de software que borra archivos', 'Un virus que ralentiza la PC'], a: 1, exp: 'Confidencialidad asegura que solo las personas autorizadas vean los datos.' },
  { q: 'La "Disponibilidad" se ve comprometida por:', opts: ['Un ataque de denegación de servicio (DDoS)', 'El cifrado de archivos', 'El uso de contraseñas fuertes', 'Tener una PC nueva'], a: 0, exp: 'Disponibilidad asegura que los sistemas y datos estén listos para el usuario legítimo cuando los necesite.' },
  { q: '¿Qué responsabilidad ética tiene un programador respecto a los datos personales?', opts: ['Venderlos al mejor postor', 'Protegerlos mediante cifrado y cumplir leyes de privacidad', 'No usarlos para ninguna función', 'Ignorarlos por completo'], a: 1, exp: 'El programador es el guardián técnico de la privacidad ajena; debe actuar con responsabilidad legal y moral.' },
  { q: '¿Cuál es la Tríada completa de la Seguridad Informática?', opts: ['Confidencialidad, Integridad y Disponibilidad', 'Control, Identidad y Autoridad', 'Cables, Internet y Aplicaciones', 'Software, Hardware y Datos'], a: 0, exp: 'CIA (Confidentiality, Integrity, Availability) es el modelo fundamental para evaluar la seguridad.' }
];

const SeguridadInformatica = () => {
  const [activeCIA, setActiveCIA] = useState(null);

  const ciaTriad = [
    { id: 'C', title: 'Confidencialidad', desc: 'Prevenir que personas no autorizadas accedan a los datos. Se logra con cifrado, contraseñas fuertes (MFA) y un control de accesos riguroso.', icon: <Lock />, color: '#ef4444' },
    { id: 'I', title: 'Integridad', desc: 'Asegurar que la información sea exacta y no haya sido alterada por terceros. Se garantiza mediante algoritmos de hashing y firmas digitales.', icon: <ShieldCheck />, color: '#16a34a' },
    { id: 'A', title: 'Disponibilidad', desc: 'Garantizar que los sistemas y datos estén accesibles siempre que se necesiten. Protege contra ataques DoS y fallos críticos de hardware.', icon: <RefreshCw />, color: '#3b82f6' }
  ];

  const vulnerabilidades = [
    { title: 'Social Engineering', type: 'Factor Humano', desc: 'Engañar al usuario para que revele información sensible (phishing). Es el eslabón más débil de la cadena.', icon: <Users /> },
    { title: 'Malware & Ransomware', type: 'Software Malicioso', desc: 'Programas diseñados para espiar, dañar o secuestrar datos exigiendo un rescate monetario.', icon: <AlertTriangle /> },
    { title: 'Zero-Day Flaws', type: 'Vulnerabilidades Técnicas', desc: 'Bugs en el código antes de que exista un parche oficial. Permiten accesos no controlados al sistema.', icon: <Terminal /> }
  ];

  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  return (
    <LockedContent keyword="seguridad_total" title="Clase 11: Seguridad y Ética" unit={4}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: 'var(--text)' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', background: 'linear-gradient(to right, #ef4444, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Seguridad, Privacidad y Ética
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '800px', margin: '0 auto', lineHeight: 1.6, color: 'var(--text-light)' }}>
              En la era de la información, proteger los datos es proteger la libertad individual y la estabilidad social.
            </p>
          </motion.div>
        </header>

        {/* Tríada CIA Interactiva */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2.2rem', textAlign: 'center', color: '#ef4444', marginBottom: '4rem', fontWeight: 800 }}>
            La Tríada CIA: Pilares Fundamentales
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {ciaTriad.map((item, i) => (
              <motion.div 
                key={i} 
                onMouseEnter={() => setActiveCIA(i)}
                onMouseLeave={() => setActiveCIA(null)}
                whileHover={{ y: -10, boxShadow: `0 20px 40px ${item.color}15` }}
                style={{ 
                  background: '#fff', 
                  padding: '3rem', 
                  borderRadius: '35px', 
                  border: `2.5px solid ${activeCIA === i ? item.color : '#f1f1f1'}`,
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ color: item.color, marginBottom: '1.5rem' }}>
                  {React.cloneElement(item.icon, { size: 54 })}
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', color: '#1e293b', fontWeight: 900 }}>{item.title}</h3>
                <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.7 }}>{item.desc}</p>
                <div style={{ 
                  position: 'absolute', bottom: 0, left: 0, width: '100%', height: '6px', 
                  background: item.color, opacity: activeCIA === i ? 1 : 0.1, transition: '0.3s' 
                }} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Amenazas y Defensa */}
        <section style={{ marginBottom: '6rem', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', padding: '5rem 3rem', borderRadius: '50px', border: '1.5px solid #e2e8f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <AlertTriangle color="#ef4444" size={42} />
                <h2 style={{ fontSize: '2.2rem', color: '#0f172a', fontWeight: 900, margin: 0 }}>Riesgos Digitales</h2>
              </div>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#475569', marginBottom: '2.5rem' }}>
                Un sistema es tan fuerte como su eslabón más débil. Las ciberamenazas evolucionan constantemente, explotando tanto debilidades técnicas como psicológicas.
              </p>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {vulnerabilidades.map((v, i) => (
                  <motion.div key={i} whileHover={{ x: 10 }} style={{ display: 'flex', gap: '1.5rem', background: '#fff', padding: '1.75rem', borderRadius: '22px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <div style={{ color: '#ef4444' }}>{v.icon}</div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>{v.title}</h4>
                      <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '0.92rem', lineHeight: 1.5 }}><strong>{v.type}:</strong> {v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ background: '#0f172a', padding: '4rem', borderRadius: '45px', color: '#fff', boxShadow: '0 30px 60px -15px rgba(15,23,42,0.3)' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <Scale size={48} color="#f59e0b" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '2rem', fontWeight: 900 }}>Impacto Ético</h3>
              </div>
              <p style={{ lineHeight: 1.8, opacity: 0.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                Toda decisión tecnológica tiene una base ética. Como desarrolladores, somos los arquitectos de las reglas digitales.
              </p>
              <ul style={{ display: 'grid', gap: '1.5rem', listStyle: 'none', padding: 0 }}>
                {[
                  { text: 'Privacidad por Diseño', icon: <Fingerprint /> },
                  { text: 'Propiedad Intelectual y Licencias', icon: <Globe /> },
                  { text: 'Transparencia Algorítmica', icon: <Eye /> },
                  { text: 'Responsabilidad Social Técnica', icon: <Key /> }
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '1.05rem', background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '18px' }}>
                    <div style={{ color: '#f59e0b' }}>{item.icon}</div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#000', padding: '4rem', borderRadius: '50px', border: '3px solid #ef4444', color: '#fff', boxShadow: '0 40px 80px -20px rgba(239,68,68,0.2)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <ShieldCheck size={56} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2.6rem', margin: '1rem 0', fontWeight: 900 }}>Test de Ciberética</h2>
              <p style={{ opacity: 0.7, fontSize: '1.2rem', marginBottom: '3rem' }}>¿Posees los conocimientos necesarios para ser un defensor del ciberespacio?</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: 'linear-gradient(45deg, #ef4444, #f59e0b)', color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '24px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem',
                  boxShadow: '0 10px 30px rgba(239,68,68,0.4)'
                }}
              >
                Comenzar Evaluación
              </motion.button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.5 }} animate={{ scale: 1 }} style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{score >= 4 ? '🛡️ Certificación: Defensor' : '⚠️ Fallos Críticos Detectados'}</motion.h2>
              <div style={{ fontSize: '1.8rem', opacity: 0.8, marginBottom: '2.5rem', fontWeight: 600 }}>Puntaje Final: <span style={{ color: '#ef4444' }}>{score}</span> / {SECURITY_QUESTS.length}</div>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: 'transparent', color: '#ef4444', border: '2px solid #ef4444', padding: '1rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Test</button>
            </div>
          ) : (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: '#ef4444', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>PREGUNTA {qIdx + 1} DE {SECURITY_QUESTS.length}</span>
                <span>SCO: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '3rem', lineHeight: 1.5, fontWeight: 700 }}>{SECURITY_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {SECURITY_QUESTS[qIdx].opts.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === SECURITY_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.75rem', textAlign: 'left', borderRadius: '25px', border: '1.5px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.15rem', fontWeight: 600,
                      background: chosen === i ? (i === SECURITY_QUESTS[qIdx].a ? '#16a34a' : '#ef4444') : (chosen !== null && i === SECURITY_QUESTS[qIdx].a ? '#16a34a' : 'rgba(255,255,255,0.03)'),
                      color: '#fff', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: chosen === i ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {chosen !== null && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '3.5rem', padding: '2.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', borderLeft: '6px solid #ef4444' }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.1rem', opacity: 0.9 }}>{SECURITY_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < SECURITY_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: '#ef4444', color: '#fff', width: '100%', border: 'none', padding: '1.4rem', borderRadius: '20px', fontWeight: 900, marginTop: '2.5rem', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(239,68,68,0.2)' }}>
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
