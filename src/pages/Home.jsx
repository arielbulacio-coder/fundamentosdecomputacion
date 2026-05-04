import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Landmark, History, ArrowRight, Database, Power, Share2, Server, Shield } from 'lucide-react';

const Home = () => {
  const unidad1 = [
    { title: 'Clase 1: Generaciones', desc: 'Viaje por la evolución: válvulas, transistores, microprocesadores e IA.', icon: <History />, path: '/generaciones', color: '#0088ff' },
    { title: 'Clase 2: Von Neumann vs Harvard', desc: 'Los dos modelos arquitectónicos que definen la computación actual.', icon: <Landmark />, path: '/von-neumann', color: '#0066cc' },
    { title: 'Clase 3: Cerebro CPU', desc: 'Simulación del ciclo de instrucción (Fetch-Decode-Execute) y la ALU.', icon: <Cpu />, path: '/cpu', color: '#004a99' },
    { title: 'Clase 4: Gestión de Memoria', desc: 'Pirámide de jerarquía, RAM, Caché y Memoria Virtual.', icon: <Database />, path: '/memoria', color: '#a855f7' },
    { title: 'Clase 5: Hardware y Arranque', desc: 'Puertos de I/O, Interrupciones y el proceso BIOS/UEFI/POST.', icon: <Power />, path: '/arranque', color: '#ff4757' },
  ];

  const unidad2 = [
    { title: 'Clase 6: Sociedad y Software', desc: 'Sistemas de información, ciclo de vida de datos y clasificación de software.', icon: <Database />, path: '/sociedad-software', color: '#00f2ff' },
    { title: 'Clase 7: Transformación Digital', desc: 'Evolución de TICs, automatización industrial y colaboración en la nube.', icon: <Share2 />, path: '/cultura-digital', color: '#2ed573' },
  ];

  const unidad3 = [
    { title: 'Clase 8: Representación Datos', desc: 'Sistemas binarios, hexadecimales y cómo las máquinas entienden multimedia.', icon: <Database />, path: '/representacion-datos', color: '#3b82f6' },
    { title: 'Clase 9: Lógica y Ética', desc: 'Compuertas lógicas, algoritmos sociales, burbujas de filtro y ética digital.', icon: <Cpu />, path: '/logica-digital', color: '#6366f1' },
  ];

  const unidad4 = [
    { title: 'Clase 10: Sistemas Operativos', desc: 'Gestión de procesos, memoria y la diferencia entre modo usuario y kernel.', icon: <Server />, path: '/sistema-operativo', color: '#4f46e5' },
    { title: 'Clase 11: Seguridad y Ética', desc: 'Ciberseguridad, tríada CIA, amenazas comunes y el rol ético del programador.', icon: <Shield />, path: '/seguridad-informatica', color: '#ef4444' },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem' }}>
      <header style={{ textAlign: 'center', padding: '4rem 0 2.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#e8f0fb', borderRadius: '30px', padding: '0.5rem 1.25rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '0.5px' }}
        >
          <span style={{ background: 'var(--primary)', color: '#fff', borderRadius: '20px', padding: '0.2rem 0.75rem', fontSize: '0.7rem' }}>MATERIA</span>
          Fundamentos de Computación
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--primary)', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-1px' }}
        >
          SimuTec
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.1rem', color: 'var(--text-light)', maxWidth: '650px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}
        >
          Recursos interactivos para el aprendizaje. Simuladores, evaluaciones y contenido teórico para todas las unidades.
        </motion.p>
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}
        >
           v2.4 - SimuTec - Actualizado
        </motion.div>
      </header>

      {/* Unidad 1 */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: '#fff', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem' }}>UNIDAD 1</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0 }}>Arquitectura y Evolución</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
          {unidad1.map((card, idx) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              style={{ 
                background: 'white',
                border: '1.5px solid var(--border)',
                borderRadius: '28px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: card.color + '15', 
                color: card.color,
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {card.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>{card.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', flex: 1, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
              <Link to={card.path} style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                background: card.color,
                color: '#fff',
                padding: '1rem',
                borderRadius: '14px',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.9rem',
                marginTop: 'auto'
              }}>
                Explorar Clase <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Unidad 2 */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ padding: '0.5rem 1rem', background: '#00f2ff', color: '#000', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem' }}>UNIDAD 2</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0 }}>Sistemas e Impacto</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
          {unidad2.map((card, idx) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              style={{ 
                background: 'white',
                border: '1.5px solid var(--border)',
                borderRadius: '28px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: card.color + '15', 
                color: card.color,
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {card.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>{card.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', flex: 1, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
              <Link to={card.path} style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                background: card.color,
                color: '#fff',
                padding: '1rem',
                borderRadius: '14px',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.9rem',
                marginTop: 'auto'
              }}>
                Explorar Clase <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Unidad 3 */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem' }}>UNIDAD 3</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0 }}>Representación y Lógica</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
          {unidad3.map((card, idx) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              style={{ 
                background: 'white',
                border: '1.5px solid var(--border)',
                borderRadius: '28px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: card.color + '15', 
                color: card.color,
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {card.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>{card.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', flex: 1, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
              <Link to={card.path} style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                background: card.color,
                color: '#fff',
                padding: '1rem',
                borderRadius: '14px',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.9rem',
                marginTop: 'auto'
              }}>
                Explorar Clase <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Unidad 4 */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem' }}>UNIDAD 4</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0 }}>Sistemas y Seguridad</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
          {unidad4.map((card, idx) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              style={{ 
                background: 'white',
                border: '1.5px solid var(--border)',
                borderRadius: '28px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: card.color + '15', 
                color: card.color,
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {card.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>{card.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', flex: 1, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
              <Link to={card.path} style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                background: card.color,
                color: '#fff',
                padding: '1rem',
                borderRadius: '14px',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.9rem',
                marginTop: 'auto'
              }}>
                Explorar Clase <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
