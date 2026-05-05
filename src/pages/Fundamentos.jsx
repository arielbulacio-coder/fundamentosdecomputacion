import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Cpu, Landmark, History, Database, Power, Share2, Server, Shield,
    Box, ArrowRight, BookOpen
} from 'lucide-react';

const UnitGrid = ({ cards }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
        {cards.map((card) => (
            <Link to={card.path} key={card.title} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div whileHover={{ y: -4, borderColor: card.color }} style={{
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    transition: 'all 0.2s'
                }}>
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
);

const Fundamentos = () => {
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

    const ar = [
        { title: 'Arquitectura 3D', desc: 'Explorá Von Neumann, jerarquía de memoria y la CPU como modelos navegables en 3D.', icon: <Box />, path: '/ar-arquitectura', color: '#8b5cf6' },
        { title: 'Ensamblaje PC (RA)', desc: 'Armá una computadora paso a paso usando la cámara del celular.', icon: <Box />, path: '/ar-ensamblaje', color: '#ec4899' },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem 4rem' }}>
            <header style={{ textAlign: 'center', padding: '3rem 0 2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#e8f0fb', borderRadius: '30px', padding: '0.5rem 1.25rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '0.5px' }}
                >
                    <BookOpen size={14} />
                    <span style={{ background: 'var(--primary)', color: '#fff', borderRadius: '20px', padding: '0.2rem 0.75rem', fontSize: '0.7rem' }}>MATERIA</span>
                    Fundamentos de Computación
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--text-main)', fontWeight: 900, marginBottom: '0.75rem', letterSpacing: '-1px', lineHeight: 1.1 }}
                >
                    Plan completo
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    style={{ fontSize: '1.1rem', color: 'var(--text-light)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}
                >
                    Las 4 unidades del programa de la UNPilar, organizadas en 11 clases interactivas.
                    Hardware, sociedad, datos, sistemas y seguridad — todo con simulación y experimentación.
                </motion.p>
            </header>

            {/* Unidad 1 */}
            <section style={{ marginBottom: '3.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: '#fff', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '1px' }}>UNIDAD 1</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Arquitectura y Evolución</h3>
                </div>
                <UnitGrid cards={unidad1} />
            </section>

            {/* Unidad 2 */}
            <section style={{ marginBottom: '3.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ padding: '0.5rem 1rem', background: '#00f2ff', color: '#000', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '1px' }}>UNIDAD 2</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Sistemas e Impacto</h3>
                </div>
                <UnitGrid cards={unidad2} />
            </section>

            {/* Unidad 3 */}
            <section style={{ marginBottom: '3.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '1px' }}>UNIDAD 3</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Representación y Lógica</h3>
                </div>
                <UnitGrid cards={unidad3} />
            </section>

            {/* Unidad 4 */}
            <section style={{ marginBottom: '3.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '1px' }}>UNIDAD 4</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Sistemas y Seguridad</h3>
                </div>
                <UnitGrid cards={unidad4} />
            </section>

            {/* AR */}
            <section style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ padding: '0.5rem 1rem', background: '#8b5cf6', color: '#fff', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '1px' }}>3D Y RA</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Simuladores inmersivos</h3>
                </div>
                <UnitGrid cards={ar} />
            </section>

            <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '20px' }}>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', maxWidth: '640px', margin: '0 auto 1rem' }}>
                    ¿Preferís ver la portada del sitio con todas las herramientas?
                </p>
                <Link to="/" style={{ background: 'var(--primary)', color: '#fff', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    Volver a SimuTec <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
};

export default Fundamentos;
