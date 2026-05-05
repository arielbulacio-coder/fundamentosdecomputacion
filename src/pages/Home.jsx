import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Box, Gamepad2, GraduationCap, Lightbulb, ArrowRight, Glasses, TestTube,
    BookOpen, Users, ClipboardList, Flag, Sparkles, Compass, FileSpreadsheet,
    Award, MessageCircle, MonitorSmartphone
} from 'lucide-react';

const Home = () => {

    const studentTools = [
        { icon: <Gamepad2 size={28} color="#a855f7" />, title: 'Juegos serios', desc: 'Viví los contenidos en primera persona. Tomá decisiones que cambian la historia y aprendé sin darte cuenta.' },
        { icon: <Sparkles size={28} color="#ffb84d" />, title: 'Trivias y quizzes', desc: 'Repasos rápidos, evaluaciones cronometradas y partidas grupales. Cada respuesta refuerza el aprendizaje.' },
        { icon: <Box size={28} color="#00f2ff" />, title: 'Realidad Aumentada', desc: 'Llevá objetos 3D al espacio que te rodea con la cámara del celular. Inspeccioná piezas, escenas y dispositivos.' },
        { icon: <Glasses size={28} color="#7c3aed" />, title: 'Realidad Virtual', desc: 'Sumergite en escenas históricas y técnicas como si estuvieras adentro. Tu cuerpo aprende, no solo tus ojos.' },
        { icon: <TestTube size={28} color="#ff4757" />, title: 'Simuladores interactivos', desc: 'Tocá variables, conectá cables, observá resultados. Comprendé el porqué y no solo el qué.' },
        { icon: <Compass size={28} color="#2ed573" />, title: 'Contenido transmedia', desc: 'Tecnología, ciencia, historia e identidad — entrelazados en experiencias que se viven, no se memorizan.' },
    ];

    const teacherTools = [
        { icon: <ClipboardList size={26} color="#3b82f6" />, title: 'Evaluaciones automáticas', desc: '20 preguntas cronometradas, datos del estudiante, revisión por pregunta y export CSV/JSON con un click.' },
        { icon: <FileSpreadsheet size={26} color="#10b981" />, title: 'Reportes y consolidados', desc: 'Resultados acumulados por dispositivo. Ideal para tomar examen en clase y descargar las planillas.' },
        { icon: <BookOpen size={26} color="#f59e0b" />, title: 'Recursos didácticos', desc: 'Cada simulador trae teoría, contexto histórico y disparadores de reflexión listos para el aula.' },
        { icon: <Award size={26} color="#ef4444" />, title: 'Soporte al docente', desc: 'Portal docente con materiales, guías, y la posibilidad de adaptar el ritmo a cada grupo.' },
    ];

    const destinations = [
        {
            to: '/fundamentos',
            icon: <BookOpen size={26} />,
            badge: 'Materia',
            title: 'Fundamentos de la Computación',
            desc: 'Las 4 unidades de la UNPilar: arquitectura, sistemas, datos y seguridad. 11 clases interactivas + simuladores 3D/RA.',
            gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
        },
        {
            to: '/proyecto-malvinas',
            icon: <Flag size={26} />,
            badge: 'Transmedia',
            title: 'Proyecto Malvinas',
            desc: 'Stand inmersivo + diorama 3D, juego serio, evaluación cronometrada y video documental. Memoria viva, en primera persona.',
            gradient: 'linear-gradient(135deg, #09090c 0%, #b45354 100%)'
        }
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem 4rem' }}>

            {/* HERO */}
            <header style={{ textAlign: 'center', padding: '4rem 0 3rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.55rem 1.25rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '999px', color: '#3b82f6', fontWeight: 800, fontSize: '0.78rem', marginBottom: '1.75rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}
                >
                    <Lightbulb size={14} /> Aprender como en el nuevo siglo
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)', color: 'var(--text-main)', fontWeight: 900, marginBottom: '1.25rem', lineHeight: 1.05, letterSpacing: '-2px' }}
                >
                    Bienvenido a <span style={{ background: 'linear-gradient(135deg, #00f2ff, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SimuTec</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '780px', margin: '0 auto 1rem', lineHeight: 1.65 }}
                >
                    Una plataforma de <strong>ayuda al estudiante</strong> con todas las herramientas inmersivas del siglo XXI:
                    juegos serios, trivias, realidad aumentada y virtual, simuladores y contenidos transmedia
                    de tecnología, ciencia, historia e identidad.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontSize: '1.05rem', color: 'var(--text-light)', maxWidth: '720px', margin: '0 auto 2.25rem', lineHeight: 1.6, fontStyle: 'italic' }}
                >
                    "El contenido no se memoriza. Se vive en primera persona."
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <Link to="/fundamentos" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', color: '#fff', textDecoration: 'none', padding: '1rem 1.75rem', borderRadius: '14px', fontWeight: 800, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 25px rgba(59,130,246,0.3)' }}>
                        <BookOpen size={18} /> Fundamentos
                    </Link>
                    <Link to="/proyecto-malvinas" style={{ background: 'linear-gradient(135deg, #09090c, #b45354)', color: '#f0ece5', textDecoration: 'none', padding: '1rem 1.75rem', borderRadius: '14px', fontWeight: 800, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 25px rgba(180,83,84,0.3)' }}>
                        <Flag size={18} /> Proyecto Malvinas
                    </Link>
                </motion.div>
            </header>

            {/* DESTINOS DESTACADOS */}
            <section style={{ marginBottom: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--primary)', fontWeight: 800 }}>Experiencias activas</span>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 900, margin: '0.4rem 0 0', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
                        ¿Por dónde empezar?
                    </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {destinations.map((d, i) => (
                        <motion.div key={i} whileHover={{ y: -5, scale: 1.01 }}>
                            <Link to={d.to} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                <div style={{
                                    background: d.gradient,
                                    color: '#fff',
                                    borderRadius: '20px',
                                    padding: '2rem',
                                    minHeight: '220px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.25)'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', opacity: 0.8, fontWeight: 800, marginBottom: '0.5rem' }}>{d.badge}</div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0 0 0.6rem', letterSpacing: '-0.5px' }}>{d.title}</h3>
                                        <p style={{ fontSize: '0.95rem', margin: 0, opacity: 0.95, lineHeight: 1.6 }}>{d.desc}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
                                        {d.icon}
                                        <span style={{ fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem' }}>
                                            Entrar <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* PARA EL ESTUDIANTE */}
            <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Users size={28} color="#a855f7" />
                    <div>
                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#a855f7', fontWeight: 800 }}>Para el estudiante</span>
                        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, margin: '0.2rem 0 0', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
                            6 formas de aprender en primera persona
                        </h2>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    {studentTools.map((t, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                        >
                            <div style={{ background: 'rgba(255,255,255,0.05)', width: '54px', height: '54px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {t.icon}
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>{t.title}</h3>
                            <p style={{ color: 'var(--text-dim)', lineHeight: 1.55, fontSize: '0.9rem', margin: 0 }}>{t.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* PARA EL DOCENTE */}
            <section style={{ marginBottom: '4rem', background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.18)', borderRadius: '24px', padding: '2.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <GraduationCap size={28} color="#3b82f6" />
                    <div>
                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#3b82f6', fontWeight: 800 }}>Para el docente</span>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', fontWeight: 900, margin: '0.2rem 0 0', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
                            Soporte didáctico integral
                        </h2>
                    </div>
                </div>
                <p style={{ color: 'var(--text-light)', lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: '720px' }}>
                    SimuTec no reemplaza al aula: la potencia. Cada experiencia incluye recursos preparados para usar en clase, evaluaciones automáticas con datos individuales y consolidados, y disparadores de reflexión.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    {teacherTools.map((t, i) => (
                        <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                {t.icon}
                                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#1e293b' }}>{t.title}</h3>
                            </div>
                            <p style={{ color: '#475569', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>{t.desc}</p>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Link to="/portal-docente" style={{ background: '#3b82f6', color: '#fff', textDecoration: 'none', padding: '0.75rem 1.25rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <MonitorSmartphone size={16} /> Acceso Portal Docente
                    </Link>
                    <Link to="/proyecto-malvinas/evaluacion" style={{ background: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6', textDecoration: 'none', padding: '0.75rem 1.25rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <ClipboardList size={16} /> Probar evaluación de muestra
                    </Link>
                </div>
            </section>

            {/* CIERRE / MANIFIESTO */}
            <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#f8fafc', borderRadius: '24px', padding: 'clamp(2rem, 5vw, 3.5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <MessageCircle size={36} color="#00f2ff" style={{ marginBottom: '1rem' }} />
                <p style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.7rem)', fontWeight: 700, lineHeight: 1.5, maxWidth: '760px', margin: '0 auto', letterSpacing: '-0.5px' }}>
                    El conocimiento se aprende como se vive: <span style={{ color: '#00f2ff' }}>haciendo</span>, <span style={{ color: '#a855f7' }}>jugando</span>, <span style={{ color: '#ffb84d' }}>sintiendo</span> y <span style={{ color: '#2ed573' }}>compartiendo</span>.
                </p>
                <p style={{ marginTop: '1rem', color: '#94a3b8', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Bienvenido a una plataforma donde la tecnología, la ciencia y la historia se enseñan en primera persona.
                </p>
            </section>
        </div>
    );
};

export default Home;
