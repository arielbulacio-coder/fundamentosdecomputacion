import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Server, Cpu, Database, User, Shield, Info, 
  Layers, RefreshCw, Terminal, Activity, FileCode
} from 'lucide-react';

const SO_QUESTS = [
  { q: '¿Cuál es la función principal de un Sistema Operativo (SO)?', opts: ['Solo servir para jugar', 'Actuar como intermediario entre el usuario y el hardware', 'Reemplazar el procesador', 'Ser una aplicación de diseño'], a: 1, exp: 'El SO administra los recursos físicos para que las aplicaciones puedan ejecutarse de forma ordenada.' },
  { q: '¿Cuál es la diferencia entre el Modo Usuario y el Modo Kernel?', opts: ['El color de fondo', 'El Kernel tiene acceso privilegiado al hardware, el Usuario no por seguridad', 'El Modo Usuario es más rápido', 'No existen estos modos'], a: 1, exp: 'El Kernel es el núcleo confiable; aislarlo previene que un programa fallido rompa todo el sistema.' },
  { q: 'La gestión de procesos en el SO sirve para:', opts: ['Hacer que la PC se apague rápido', 'Alternar de forma rápida el uso de la CPU entre varios programas (multitarea)', 'Instalar nuevos juegos', 'Limpiar el teclado'], a: 1, exp: 'Permite la ilusión de que muchos programas corren al mismo tiempo (multiprogramación).' },
  { q: '¿Qué componente del SO se encarga de que un programa no acceda a la memoria de otro?', opts: ['Gestor de Memoria', 'Interfaz Gráfica', 'Navegador Web', 'Calculadora'], a: 0, exp: 'La protección de memoria es vital para la estabilidad y seguridad del sistema.' },
  { q: 'Un sistema operativo que permite que varios usuarios trabajen simultáneamente se llama:', opts: ['Monousuario', 'Multiusuario', 'Sistema de solo lectura', 'Antivirus'], a: 1, exp: 'Sistemas como Linux o Windows Server están diseñados para este fin.' }
];

const SistemaOperativo = () => {
  const [activeTab, setActiveTab] = useState(0);

  const functions = [
    { title: 'Gestión de Procesos', desc: 'Controla el ciclo de vida de los programas: creación, planificación de CPU y finalización.', icon: <Activity />, color: '#4f46e5' },
    { title: 'Gestión de Memoria', desc: 'Asigna y protege espacios de RAM para cada aplicación, gestionando la memoria virtual.', icon: <Database />, color: '#3b82f6' },
    { title: 'Gestión de Periféricos', desc: 'Actúa de puente con hardware externo mediante controladores (Drivers) específicos.', icon: <Terminal />, color: '#0ea5e9' },
    { title: 'Gestión de Archivos', desc: 'Organiza la persistencia de datos en estructuras jerárquicas y seguras en disco.', icon: <FileCode />, color: '#6366f1' }
  ];

  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  return (
    <LockedContent keyword="kernel" title="Clase 10: Sistemas Operativos" unit={4}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#1e293b' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', background: 'linear-gradient(to right, #4f46e5, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Sistemas Operativos
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#475569' }}>
              El software base que transforma un conjunto de circuitos en una herramienta funcional y segura para el ser humano.
            </p>
          </motion.div>
        </header>

        {/* Piedras Angulares del SO */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2.2rem', textAlign: 'center', color: '#111827', marginBottom: '4rem', fontWeight: 800 }}>Piedras Angulares</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {functions.map((func, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10, boxShadow: `0 25px 50px -12px ${func.color}20` }} 
                style={{ background: '#fff', padding: '3rem', borderRadius: '35px', border: '1.5px solid #f1f5f9', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                <div style={{ background: func.color + '10', color: func.color, width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '1.8rem' }}>
                  {func.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{func.title}</h3>
                <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6 }}>{func.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ring Layers - Protección del Sistema */}
        <section style={{ marginBottom: '6rem', background: '#0f172a', padding: '5rem 3rem', borderRadius: '50px', color: '#fff', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} style={{ position: 'absolute', inset: 0, border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: 'linear' }} style={{ position: 'absolute', inset: '40px', border: '2px dashed rgba(79,70,229,0.3)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                  <Shield size={64} color={activeTab === 1 ? '#ef4444' : '#4f46e5'} />
                  <span style={{ fontWeight: 900, letterSpacing: '2px', fontSize: '1.2rem' }}>RING 0</span>
                </div>
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '1.5rem', background: 'linear-gradient(to right, #4f46e5, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Privilegios y Jerarquías
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#94a3b8', marginBottom: '3rem' }}>
                Para garantizar la estabilidad, el SO divide el entorno en capas de privilegios. Las aplicaciones no pueden tocar el hardware directamente.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <button 
                  onClick={() => setActiveTab(0)}
                  style={{ 
                    padding: '1.5rem', borderRadius: '22px', border: 'none', textAlign: 'left', fontWeight: 800, cursor: 'pointer',
                    background: activeTab === 0 ? '#4f46e5' : 'rgba(255,255,255,0.03)',
                    color: '#fff',
                    transition: '0.3s', display: 'flex', alignItems: 'center', gap: '1rem'
                  }}
                >
                  <User size={24} /> Modo Usuario (Aplicaciones)
                </button>
                <button 
                  onClick={() => setActiveTab(1)}
                  style={{ 
                    padding: '1.5rem', borderRadius: '22px', border: 'none', textAlign: 'left', fontWeight: 800, cursor: 'pointer',
                    background: activeTab === 1 ? '#ef4444' : 'rgba(255,255,255,0.03)',
                    color: '#fff',
                    transition: '0.3s', display: 'flex', alignItems: 'center', gap: '1rem'
                  }}
                >
                  <Shield size={24} /> Modo Kernel (Núcleo Confiable)
                </button>
              </div>
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '25px', borderLeft: `6px solid ${activeTab === 0 ? '#4f46e5' : '#ef4444'}` }}
              >
                <p style={{ margin: 0, lineHeight: 1.7, fontSize: '0.95rem' }}>
                  {activeTab === 0 
                    ? "Los programas de usuario tienen un 'muro' que les impide dañar otros procesos o el hardware. Cada vez que necesitan un recurso, deben 'golpear la puerta' del Kernel mediante System Calls."
                    : "El Kernel tiene acceso total. Gestiona la memoria virtual, los registros del procesador y las interrupciones. Un solo error aquí provoca que todo el sistema colapse (BSOD / Kernel Panic)."}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#f8fafc', padding: '4rem', borderRadius: '50px', border: '2px solid #e2e8f0' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <Terminal size={56} color="#4f46e5" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2.5rem', margin: '1rem 0', fontWeight: 900, color: '#0f172a' }}>Maestría en Sistemas</h2>
              <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Comprendes la arquitectura lógica que gobierna tu computadora?</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: 'linear-gradient(to right, #4f46e5, #0ea5e9)', color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem',
                  boxShadow: '0 15px 30px rgba(79,70,229,0.3)'
                }}
              >
                Comenzar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Puntaje: <span style={{ color: '#4f46e5' }}>{score}</span> / {SO_QUESTS.length}</h2>
              <p style={{ fontSize: '1.3rem', color: '#64748b', marginBottom: '3rem' }}>{score >= 4 ? '🚀 Nivel Administrador: Acceso Concedido.' : '🔧 Acceso Denegado: Se requiere más estudio.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '20px', fontWeight: 800, cursor: 'pointer' }}>Reiniciar</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: '#4f46e5', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>PROCESO {qIdx + 1} DE {SO_QUESTS.length}</span>
                <span>SCO: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.7rem', color: '#0f172a', marginBottom: '3rem', lineHeight: 1.5, fontWeight: 800 }}>{SO_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {SO_QUESTS[qIdx].opts.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === SO_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.75rem', textAlign: 'left', borderRadius: '25px', border: '2px solid #f1f5f9', cursor: 'pointer', fontSize: '1.15rem', fontWeight: 600,
                      background: chosen === i ? (i === SO_QUESTS[qIdx].a ? '#22c55e' : '#ef4444') : (chosen !== null && i === SO_QUESTS[qIdx].a ? '#22c55e' : '#fff'),
                      color: chosen !== null ? '#fff' : '#1e293b',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: chosen === i ? 'none' : '0 10px 15px -3px rgba(0,0,0,0.05)'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {chosen !== null && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '3.5rem', padding: '2.5rem', background: '#fff', borderRadius: '30px', borderLeft: '8px solid #4f46e5', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.1rem', color: '#475569' }}>{SO_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < SO_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: '#4f46e5', color: '#fff', width: '100%', border: 'none', padding: '1.4rem', borderRadius: '20px', fontWeight: 900, marginTop: '2.5rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < SO_QUESTS.length ? 'Siguiente Desafío' : 'Finalizar Proceso'}
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
