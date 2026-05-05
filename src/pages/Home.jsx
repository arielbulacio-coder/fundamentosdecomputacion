import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Landmark, History, ArrowRight, Database, Power, Share2, Server, Shield, Gamepad2, Box, GraduationCap, ChevronDown, ChevronUp, Glasses, TestTube, Lightbulb } from 'lucide-react';

const Home = () => {
  const [showFundamentos, setShowFundamentos] = useState(false);

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

  const features = [
    { icon: <Box size={32} color="#00f2ff" />, title: 'Realidad Aumentada y VR', desc: 'Superponé objetos 3D históricos o tecnológicos en tu mundo real. Aprendé manipulando el conocimiento con tus propias manos.' },
    { icon: <Gamepad2 size={32} color="#a855f7" />, title: 'Juegos Serios y Trivias', desc: 'Gamificamos el aprendizaje. Viví los contenidos históricos y científicos en primera persona tomando decisiones que cambian la historia.' },
    { icon: <TestTube size={32} color="#ff4757" />, title: 'Simuladores Interactivos', desc: 'Cambiá variables, conectá cables y observá los resultados en tiempo real sin riesgo. Entendé el "por qué" y no solo el "qué".' },
    { icon: <GraduationCap size={32} color="#2ed573" />, title: 'Soporte al Docente', desc: 'Paneles de seguimiento, rúbricas de evaluación automáticas, reportes directos en CSV y recursos didácticos listos para usar en el aula.' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', paddingBottom: '4rem' }}>
      {/* HERO SECTION REDISEÑADA */}
      <header style={{ textAlign: 'center', padding: '5rem 0 3rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ display: 'inline-flex', alignItems: 'center', justifyCenter: 'center', gap: '0.6rem', padding: '0.75rem 1.5rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '30px', color: '#3b82f6', fontWeight: 800, fontSize: '0.85rem', marginBottom: '2rem', letterSpacing: '1px', textTransform: 'uppercase' }}
        >
          <Lightbulb size={18} /> La Nueva Forma de Aprender
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', color: 'var(--text-main)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-2px' }}
        >
          Bienvenido a <span style={{ background: 'linear-gradient(135deg, #00f2ff, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SimuTec</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.25rem', color: 'var(--text-light)', maxWidth: '800px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}
        >
          Transformamos la educación para el siglo XXI. Una plataforma integral de ayuda al estudiante con todas las herramientas inmersivas disponibles: contenidos tecnológicos, científicos e históricos, vivos e interactivos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
            <a href="#experiencias" style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', color: '#fff', textDecoration: 'none', padding: '1rem 2rem', borderRadius: '14px', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 20px rgba(124,58,237,0.3)' }}>
                Descubrir Experiencias <ArrowRight size={20} />
            </a>
            <button onClick={() => setShowFundamentos(!showFundamentos)} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', border: '1px solid var(--border)', padding: '1rem 2rem', borderRadius: '14px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}>
                <Server size={20} /> Módulos de Materias
            </button>
        </motion.div>
      </header>

      {/* CARACTERÍSTICAS (FEATURES) GENERALES */}
      <section id="experiencias" style={{ marginBottom: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {features.map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                  <div style={{ background: 'rgba(255,255,255,0.05)', width: '64px', height: '64px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {feat.icon}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>{feat.title}</h3>
                  <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>{feat.desc}</p>
              </motion.div>
          ))}
      </section>

      {/* DESPLEGABLE DE MÓDULOS DE FUNDAMENTOS DE COMPUTACIÓN */}
      <AnimatePresence>
        {showFundamentos && (
            <motion.section 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
            >
                <div style={{ background: 'var(--glass-bg)', border: '1px solid #3b82f640', borderRadius: '24px', padding: '3rem', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <span style={{ background: '#3b82f6', color: '#fff', borderRadius: '20px', padding: '0.3rem 0.8rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Módulo Activo</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.5rem 0 0', letterSpacing: '-1px' }}>Fundamentos de Computación</h2>
                        </div>
                        <button onClick={() => setShowFundamentos(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 700 }}>
                            Contraer <ChevronUp size={16} />
                        </button>
                    </div>

                    {/* Unidad 1 */}
                    <div style={{ marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: '#fff', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem' }}>UNIDAD 1</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Arquitectura y Evolución</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                            {unidad1.map((card) => (
                                <Link to={card.path} key={card.title} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <motion.div whileHover={{ y: -4, borderColor: card.color }} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.2s' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '48px', height: '48px', background: card.color + '15', color: card.color, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {card.icon}
                                            </div>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{card.title}</h4>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Unidad 2 */}
                    <div style={{ marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.5rem 1rem', background: '#00f2ff', color: '#000', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem' }}>UNIDAD 2</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Sistemas e Impacto</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                            {unidad2.map((card) => (
                                <Link to={card.path} key={card.title} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <motion.div whileHover={{ y: -4, borderColor: card.color }} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.2s' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '48px', height: '48px', background: card.color + '15', color: card.color, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {card.icon}
                                            </div>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{card.title}</h4>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Unidad 3 */}
                    <div style={{ marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem' }}>UNIDAD 3</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Representación y Lógica</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                            {unidad3.map((card) => (
                                <Link to={card.path} key={card.title} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <motion.div whileHover={{ y: -4, borderColor: card.color }} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.2s' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '48px', height: '48px', background: card.color + '15', color: card.color, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {card.icon}
                                            </div>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{card.title}</h4>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Unidad 4 */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem' }}>UNIDAD 4</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Sistemas y Seguridad</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                            {unidad4.map((card) => (
                                <Link to={card.path} key={card.title} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <motion.div whileHover={{ y: -4, borderColor: card.color }} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.2s' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '48px', height: '48px', background: card.color + '15', color: card.color, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {card.icon}
                                            </div>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{card.title}</h4>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
