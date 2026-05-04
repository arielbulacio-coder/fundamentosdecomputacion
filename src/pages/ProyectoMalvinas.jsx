import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Compass, Users, Target, Tv, Image as ImageIcon, Linkedin, Newspaper,
    Activity, Video, HelpCircle, Wrench, Mic2, AlertTriangle, Camera, Mail,
    Palette, Type, Snowflake, Archive, Heart, FileText,
    BookOpen, ClipboardList, Gamepad2, Box, Calendar, Flag, ChevronRight,
    Edit3, ExternalLink
} from 'lucide-react';

// Extrae el videoId de cualquier URL de YouTube común
const extractYouTubeId = (input) => {
    if (!input) return '';
    const trimmed = input.trim();
    if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;
    const m = trimmed.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : '';
};

// Paleta del moodboard
const COLORS = {
    base: '#09090c',     // negro humo
    accent: '#b45354',   // terracota / sangre seca
    sky: '#7b98ab',      // azul gris frío
    deep: '#35446a',     // azul atlántico profundo
    paper: '#f0ece5'     // papel viejo / archivo
};

const SECTION = {
    container: {
        background: COLORS.paper,
        color: COLORS.base,
        padding: '2.5rem 1.25rem',
        borderRadius: '18px',
        marginBottom: '1.5rem',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04)'
    },
    title: {
        fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif',
        fontWeight: 700,
        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
        color: COLORS.deep,
        marginTop: 0,
        marginBottom: '0.5rem',
        letterSpacing: '-0.5px'
    },
    subtitle: {
        fontFamily: '"Public Sans", -apple-system, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontSize: '0.7rem',
        fontWeight: 700,
        color: COLORS.accent,
        marginBottom: '0.5rem'
    },
    body: {
        fontFamily: '"Public Sans", -apple-system, sans-serif',
        fontSize: '1rem',
        lineHeight: 1.65,
        color: COLORS.base
    }
};

const PlatformCard = ({ icon: Icon, name, description, objective, color }) => (
    <motion.div
        whileHover={{ y: -4 }}
        style={{
            background: '#fff',
            border: `1px solid rgba(9,9,12,0.08)`,
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        }}
    >
        <div style={{
            width: '46px', height: '46px', borderRadius: '12px',
            background: color || COLORS.deep, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <Icon size={22} />
        </div>
        <h4 style={{ fontFamily: '"Public Sans", sans-serif', margin: 0, fontWeight: 800, color: COLORS.deep, fontSize: '1.05rem' }}>{name}</h4>
        <p style={{ fontFamily: '"Public Sans", sans-serif', margin: 0, fontSize: '0.9rem', color: COLORS.base, lineHeight: 1.5 }}>{description}</p>
        <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px dashed rgba(9,9,12,0.15)' }}>
            <span style={{ ...SECTION.subtitle, fontSize: '0.65rem', color: COLORS.sky }}>Objetivo</span>
            <p style={{ fontFamily: '"Public Sans", sans-serif', margin: 0, fontSize: '0.85rem', fontWeight: 600, color: COLORS.deep }}>{objective}</p>
        </div>
    </motion.div>
);

const StageCard = ({ num, title, icon: Icon, description, objective }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4 }}
        style={{
            display: 'flex',
            gap: '1rem',
            background: '#fff',
            border: `1px solid rgba(9,9,12,0.08)`,
            borderRadius: '14px',
            padding: '1.25rem',
            position: 'relative'
        }}
    >
        <div style={{
            flexShrink: 0,
            width: '64px',
            height: '64px',
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.deep})`,
            borderRadius: '14px',
            color: COLORS.paper,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontWeight: 900
        }}>
            <Icon size={20} />
            <span style={{ fontSize: '0.7rem', fontFamily: '"Public Sans", sans-serif' }}>#{num}</span>
        </div>
        <div style={{ flex: 1 }}>
            <h4 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', margin: 0, color: COLORS.deep, fontSize: '1.2rem', fontWeight: 700 }}>{title}</h4>
            <p style={{ fontFamily: '"Public Sans", sans-serif', margin: '0.4rem 0', fontSize: '0.95rem', color: COLORS.base, lineHeight: 1.55 }}>{description}</p>
            <p style={{
                fontFamily: '"Public Sans", sans-serif',
                margin: 0,
                fontSize: '0.85rem',
                color: COLORS.accent,
                fontWeight: 600,
                paddingTop: '0.5rem',
                borderTop: '1px dashed rgba(9,9,12,0.12)'
            }}>
                <span style={{ fontWeight: 800 }}>→ Objetivo:</span> {objective}
            </p>
        </div>
    </motion.div>
);

const ColorSwatch = ({ hex, name }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.4rem' }}>
        <div style={{
            width: '100%',
            height: '90px',
            background: hex,
            borderRadius: '12px',
            border: '1px solid rgba(9,9,12,0.1)'
        }} />
        <div>
            <div style={{ fontFamily: '"Public Sans", sans-serif', fontSize: '0.85rem', fontWeight: 700, color: COLORS.base }}>{name}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: COLORS.sky }}>{hex}</div>
        </div>
    </div>
);

const ConceptChip = ({ icon: Icon, label }) => (
    <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: '#fff',
        border: `1px solid ${COLORS.deep}`,
        color: COLORS.deep,
        borderRadius: '999px',
        padding: '0.4rem 0.9rem',
        fontFamily: '"Public Sans", sans-serif',
        fontSize: '0.85rem',
        fontWeight: 600
    }}>
        <Icon size={14} /> {label}
    </div>
);

// Card que linkea a un módulo (RA, Juego, Evaluación)
const ModuleCard = ({ to, icon: Icon, badge, title, subtitle, gradient }) => (
    <motion.div whileHover={{ y: -4, scale: 1.01 }}>
        <Link to={to} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{
                background: gradient,
                color: '#f0ece5',
                borderRadius: '18px',
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 30px -10px rgba(9,9,12,0.4)',
                minHeight: '180px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <div>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#b45354', fontWeight: 800, marginBottom: '0.4rem' }}>{badge}</div>
                    <h3 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
                        {title}
                    </h3>
                    <p style={{ fontFamily: '"Public Sans", sans-serif', fontSize: '0.9rem', margin: '0.5rem 0 0', opacity: 0.92, lineHeight: 1.5 }}>{subtitle}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <Icon size={28} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        Entrar <ChevronRight size={14} />
                    </span>
                </div>
                {/* glow grain */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '4px 4px', pointerEvents: 'none' }} />
            </div>
        </Link>
    </motion.div>
);

const ProyectoMalvinas = () => {
    // Video de YouTube — el docente puede pegar cualquier URL
    const [videoUrl, setVideoUrl] = useState('');
    const [editingVideo, setEditingVideo] = useState(false);
    useEffect(() => {
        const saved = localStorage.getItem('malvinas_yt_video');
        if (saved) setVideoUrl(saved);
    }, []);
    const videoId = extractYouTubeId(videoUrl);
    const saveVideo = (val) => {
        setVideoUrl(val);
        localStorage.setItem('malvinas_yt_video', val);
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                .malvinas-hero-grain {
                    background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
                    background-size: 4px 4px;
                }
                .img-glow {
                    box-shadow: 0 10px 30px -10px rgba(9,9,12,0.3);
                    transition: transform 0.4s ease;
                }
                .img-glow:hover {
                    transform: scale(1.02);
                }
            `}</style>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem 4rem' }}>

                {/* HERO */}
                <header style={{
                    background: `linear-gradient(180deg, rgba(9,9,12,0.85) 0%, rgba(53,68,106,0.95) 100%), url('/malvinas_hero.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: COLORS.paper,
                    borderRadius: '22px',
                    padding: 'clamp(2.5rem, 8vw, 5rem) clamp(1.25rem, 4vw, 3rem)',
                    marginTop: '1rem',
                    marginBottom: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.4)'
                }} className="malvinas-hero-grain">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            display: 'inline-block',
                            padding: '0.35rem 1rem',
                            background: 'rgba(180,83,84,0.15)',
                            border: `1px solid ${COLORS.accent}`,
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            letterSpacing: '3px',
                            fontFamily: '"Public Sans", sans-serif',
                            fontWeight: 700,
                            color: COLORS.accent,
                            textTransform: 'uppercase',
                            marginBottom: '1.25rem',
                            backdropFilter: 'blur(4px)'
                        }}
                    >
                        Proyecto educativo transmedia
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        style={{
                            fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif',
                            fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
                            fontWeight: 700,
                            margin: 0,
                            letterSpacing: '-1px',
                            lineHeight: 1.05,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}
                    >
                        Malvinas
                        <br />
                        <span style={{ color: COLORS.accent, fontStyle: 'italic' }}>en primera persona</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        style={{
                            fontFamily: '"Public Sans", sans-serif',
                            fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                            maxWidth: '780px',
                            marginTop: '1.5rem',
                            color: COLORS.paper,
                            opacity: 0.95,
                            lineHeight: 1.6
                        }}
                    >
                        Stand inmersivo itinerante que circula por clubes, ferias culturales, escuelas y municipios del Gran Buenos Aires.
                        Una propuesta diseñada para que la memoria no sea una fecha, sino una experiencia viva que construye identidad.
                    </motion.p>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                        {[
                            { label: 'Edad', value: '10–17 años' },
                            { label: 'Duración', value: '~2 horas' },
                            { label: 'Formato', value: 'Stand itinerante' },
                            { label: 'Región', value: 'Gran Buenos Aires' }
                        ].map(({ label, value }) => (
                            <div key={label} style={{
                                background: 'rgba(240,236,229,0.08)',
                                border: '1px solid rgba(240,236,229,0.2)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '14px',
                                padding: '0.7rem 1.25rem',
                                fontFamily: '"Public Sans", sans-serif'
                            }}>
                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: COLORS.sky, marginBottom: '0.2rem' }}>{label}</div>
                                <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>{value}</div>
                            </div>
                        ))}
                    </div>
                </header>

                {/* MÓDULOS DIGITALES (RA, EVALUACIÓN, JUEGO SERIO) */}
                <section style={{ marginBottom: '1.5rem' }}>
                    <div style={{ ...SECTION.subtitle, color: COLORS.accent, paddingLeft: '0.25rem' }}>Experiencia transmedia</div>
                    <h2 style={{ ...SECTION.title, color: COLORS.deep, marginBottom: '1rem', paddingLeft: '0.25rem' }}>Módulos digitales del proyecto</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                        <ModuleCard
                            to="/proyecto-malvinas/ra"
                            icon={Box}
                            badge="Realidad Aumentada"
                            title="Diorama Malvinas"
                            subtitle="Escena 3D inmersiva con 6 hotspots históricos. Funciona en celular con giroscopio."
                            gradient={`linear-gradient(135deg, ${COLORS.base} 0%, ${COLORS.deep} 100%)`}
                        />
                        <ModuleCard
                            to="/proyecto-malvinas/juego"
                            icon={Gamepad2}
                            badge="Juego serio"
                            title="En primera persona"
                            subtitle="Sos Lautaro, conscripto de 18 años. 9 capítulos de decisiones, contexto histórico y reflexión final."
                            gradient={`linear-gradient(135deg, ${COLORS.deep} 0%, ${COLORS.accent} 100%)`}
                        />
                        <ModuleCard
                            to="/proyecto-malvinas/evaluacion"
                            icon={ClipboardList}
                            badge="Evaluación · 15 min"
                            title="20 preguntas"
                            subtitle="Cuestionario cronometrado con datos del estudiante, revisión y export CSV/JSON al final."
                            gradient={`linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.sky} 100%)`}
                        />
                    </div>
                </section>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    {/* CONCEPTO */}
                    <section style={{ ...SECTION.container, margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={SECTION.subtitle}>Concepto</div>
                        <h2 style={SECTION.title}>Memoria viva, experiencia inmersiva</h2>
                        <p style={SECTION.body}>
                            Las formas tradicionales de enseñar historia suelen sentirse lejanas para los jóvenes.
                            <strong> Malvinas en primera persona</strong> propone un recorrido participativo y emocional 
                            que conecta a las nuevas generaciones con el conflicto desde una perspectiva humana y crítica.
                        </p>
                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <ConceptChip icon={Archive} label="Archivo" />
                            <ConceptChip icon={Snowflake} label="Frío" />
                            <ConceptChip icon={Heart} label="Identidad" />
                        </div>
                    </section>
                    
                    <div style={{ borderRadius: '22px', overflow: 'hidden', height: '100%', minHeight: '300px' }}>
                        <img 
                            src="/malvinas_activacion.png" 
                            alt="Activación Colimba" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            className="img-glow"
                        />
                    </div>
                </div>

                {/* ESTRATEGIA TRANSMEDIA */}
                <section style={SECTION.container}>
                    <div style={SECTION.subtitle}>Estrategia transmedia</div>
                    <h2 style={SECTION.title}>De lo físico a lo digital</h2>
                    <p style={{ ...SECTION.body, marginBottom: '1.5rem' }}>
                        La experiencia física en el stand funciona como eje narrativo que se expande a plataformas digitales, 
                        creando un ecosistema de contenidos adaptados a cada red social.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                        <PlatformCard
                            icon={Tv}
                            name="TikTok"
                            description="Videos breves, dinámicos e inmersivos."
                            objective="Adolescentes."
                            color="#111"
                        />
                        <PlatformCard
                            icon={Video}
                            name="YouTube"
                            description="Documental síntesis del recorrido."
                            objective="Comunicación integral."
                            color="#FF0000"
                        />
                        <PlatformCard
                            icon={ImageIcon}
                            name="Instagram"
                            description="Contenido visual y emocional."
                            objective="Familias y comunidad."
                            color={COLORS.accent}
                        />
                        <PlatformCard
                            icon={Linkedin}
                            name="LinkedIn"
                            description="Enfoque pedagógico e institucional."
                            objective="Docentes y sponsors."
                            color="#0A66C2"
                        />
                    </div>
                </section>

                {/* ESCALETA DEL RECORRIDO DETALLADA */}
                <section style={SECTION.container}>
                    <div style={SECTION.subtitle}>El Recorrido Experiencial</div>
                    <h2 style={SECTION.title}>8 Momentos: Una Jornada de Memoria</h2>
                    <p style={{ ...SECTION.body, marginBottom: '2rem' }}>
                        La experiencia está diseñada como un arco narrativo que comienza en el cuerpo, 
                        pasa por la reflexión crítica y culmina en la conexión humana más profunda.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {/* Columna 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '14px', borderLeft: `5px solid ${COLORS.accent}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <Activity size={24} color={COLORS.accent} />
                                    <h4 style={{ margin: 0, fontFamily: '"Public Sans", sans-serif', fontWeight: 800 }}>1. Activación: La "Colimba"</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: COLORS.base }}>
                                    Circuito de obstáculos físico y sensorial. Los alumnos deben colaborar para superar tareas de esfuerzo coordinativo.
                                </p>
                                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: COLORS.deep }}>
                                    CONCEPTOS: Disciplina, Cuerpo, Grupo.
                                </div>
                            </div>

                            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '14px', borderLeft: `5px solid ${COLORS.deep}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <Video size={24} color={COLORS.deep} />
                                    <h4 style={{ margin: 0, fontFamily: '"Public Sans", sans-serif', fontWeight: 800 }}>2. El Relato del Comienzo</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: COLORS.base }}>
                                    Proyección envolvente sobre las causas geopolíticas y el clima social de abril de 1982.
                                </p>
                                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: COLORS.deep }}>
                                    CONCEPTOS: Historia, Contexto, Territorio.
                                </div>
                            </div>

                            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '14px', borderLeft: `5px solid ${COLORS.sky}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <HelpCircle size={24} color={COLORS.sky} />
                                    <h4 style={{ margin: 0, fontFamily: '"Public Sans", sans-serif', fontWeight: 800 }}>3. Desafío de Saberes</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: COLORS.base }}>
                                    Trivia interactiva por equipos mediante tablets. No es competencia, es construcción de conocimiento.
                                </p>
                                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: COLORS.deep }}>
                                    CONCEPTOS: Datos, Verdad, Participación.
                                </div>
                            </div>

                            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '14px', borderLeft: `5px solid ${COLORS.accent}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <Wrench size={24} color={COLORS.accent} />
                                    <h4 style={{ margin: 0, fontFamily: '"Public Sans", sans-serif', fontWeight: 800 }}>4. Taller de Supervivencia</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: COLORS.base }}>
                                    Laboratorio de diseño donde deben crear una solución técnica para el frío extremo con materiales reciclados.
                                </p>
                                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: COLORS.deep }}>
                                    CONCEPTOS: Creatividad, Escasez, Resiliencia.
                                </div>
                            </div>
                        </div>

                        {/* Imagen Central / Collage */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                            <div style={{ borderRadius: '22px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }}>
                                <img src="/malvinas_collage.png" alt="Etapas del recorrido" style={{ width: '100%', display: 'block' }} />
                            </div>
                            <div style={{ background: COLORS.deep, padding: '1rem', borderRadius: '14px', color: '#fff', textAlign: 'center' }}>
                                <span style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Experiencia Total</span>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>120 Minutos de Inmersión</div>
                            </div>
                        </div>

                        {/* Columna 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '14px', borderLeft: `5px solid ${COLORS.deep}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <Mic2 size={24} color={COLORS.deep} />
                                    <h4 style={{ margin: 0, fontFamily: '"Public Sans", sans-serif', fontWeight: 800 }}>5. La Voz del Soldado</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: COLORS.base }}>
                                    Presentación de los proyectos. Cada grupo defiende su "herramienta" frente al resto.
                                </p>
                                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: COLORS.deep }}>
                                    CONCEPTOS: Discurso, Empoderamiento, Oratoria.
                                </div>
                            </div>

                            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '14px', borderLeft: `5px solid ${COLORS.accent}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <AlertTriangle size={24} color={COLORS.accent} />
                                    <h4 style={{ margin: 0, fontFamily: '"Public Sans", sans-serif', fontWeight: 800 }}>6. Laboratorio de Medios</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: COLORS.base }}>
                                    Análisis de las "Fake News" de 1982. ¿Por qué nos dijeron que íbamos ganando?
                                </p>
                                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: COLORS.deep }}>
                                    CONCEPTOS: Crítica, Información, Manipulación.
                                </div>
                            </div>

                            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '14px', borderLeft: `5px solid ${COLORS.sky}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <Camera size={24} color={COLORS.sky} />
                                    <h4 style={{ margin: 0, fontFamily: '"Public Sans", sans-serif', fontWeight: 800 }}>7. Corresponsal del Hoy</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: COLORS.base }}>
                                    Producción de un micro-documental en video contando la guerra desde su propia mirada digital.
                                </p>
                                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: COLORS.deep }}>
                                    CONCEPTOS: Narrativa, Tecnología, Puente Generacional.
                                </div>
                            </div>

                            <div style={{ background: COLORS.base, padding: '1.5rem', borderRadius: '14px', borderLeft: `5px solid ${COLORS.paper}`, color: COLORS.paper }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <Mail size={24} color={COLORS.paper} />
                                    <h4 style={{ margin: 0, fontFamily: '"Public Sans", sans-serif', fontWeight: 800 }}>8. El Cierre: La Carta</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9 }}>
                                    Silencio profundo. Lectura de una carta real y escritura de una respuesta personal al pasado.
                                </p>
                                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: COLORS.accent }}>
                                    CONCEPTOS: Emoción, Humanidad, Nunca Más.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MOODBOARD */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ borderRadius: '22px', overflow: 'hidden' }}>
                        <img 
                            src="/malvinas_carta.png" 
                            alt="Archivo y Memoria" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            className="img-glow"
                        />
                    </div>
                    <section style={{ ...SECTION.container, background: COLORS.base, color: COLORS.paper, margin: 0 }}>
                        <div style={{ ...SECTION.subtitle, color: COLORS.accent }}>Moodboard</div>
                        <h2 style={{ ...SECTION.title, color: COLORS.paper }}>Estética de archivo</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                {[COLORS.base, COLORS.accent, COLORS.sky, COLORS.paper].map(c => (
                                    <div key={c} style={{ width: '100%', height: '40px', background: c, borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} />
                                ))}
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <div style={{ ...SECTION.subtitle, color: COLORS.sky, fontSize: '0.6rem', marginBottom: '0.5rem' }}>Tipografías</div>
                                <div style={{ fontFamily: '"EFCO Brookshire", serif', fontSize: '1.8rem', fontStyle: 'italic', color: COLORS.paper }}>EFCO Brookshire</div>
                                <div style={{ fontFamily: '"Public Sans", sans-serif', fontSize: '1.2rem', fontWeight: 800, color: COLORS.sky }}>Public Sans</div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                <ConceptChip icon={Archive} label="Archivo" />
                                <ConceptChip icon={Heart} label="Identidad" />
                                <ConceptChip icon={Users} label="Juventud" />
                            </div>
                        </div>
                    </section>
                </div>

                {/* CONTEXTO HISTÓRICO AMPLIADO */}
                <section style={{ ...SECTION.container, background: COLORS.paper }}>
                    <div style={SECTION.subtitle}>Contexto histórico</div>
                    <h2 style={SECTION.title}>De la herencia colonial a la guerra</h2>
                    <p style={SECTION.body}>
                        La cuestión Malvinas no comienza en 1982 ni se cierra el 14 de junio de ese año. Es un proceso de soberanía,
                        memoria y reparación que atraviesa <strong>casi dos siglos</strong>.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                        {[
                            { year: '1493 → 1810', title: 'Herencia española', body: 'Las islas formaban parte del Virreinato del Río de la Plata. Tras la independencia (1816), Argentina hereda esos territorios por el principio de uti possidetis iuris.' },
                            { year: '1820 → 1832', title: 'Soberanía argentina', body: 'David Jewett toma posesión formal en nombre de las Provincias Unidas (1820). Luis Vernet establece una colonia con familias y ganado.' },
                            { year: '3 de enero 1833', title: 'Ocupación británica', body: 'La corbeta HMS Clio expulsa a las autoridades argentinas e instaura un gobierno colonial. El reclamo argentino comienza ese mismo día.' },
                            { year: '1965', title: 'Resolución 2065 ONU', body: 'La Asamblea General reconoce la disputa de soberanía e insta a las partes a negociar. Argentina y Reino Unido inician décadas de negociación inconclusa.' },
                            { year: '2 de abril 1982', title: 'Operación Rosario', body: 'La dictadura militar argentina, en crisis económica y social, ordena el desembarco. Las islas vuelven a izar la bandera argentina por 74 días.' },
                            { year: '1 al 25 de mayo 1982', title: 'Operaciones bélicas', body: '1 de mayo: bombardeo Vulcan al aeropuerto. 2 de mayo: hundimiento del ARA General Belgrano (323 muertos). 25 de mayo: hundimiento del HMS Sheffield por misil Exocet.' },
                            { year: '14 de junio 1982', title: 'Rendición', body: 'El General Mario Benjamín Menéndez firma el cese del fuego en Puerto Argentino. Caen 649 argentinos, 255 británicos y 3 isleños.' },
                            { year: '1983 → 2003', title: 'Desmalvinización', body: 'Política de silencio: el Estado oculta a los veteranos. Cientos se suicidan en los años posteriores por la falta de contención psicológica y reconocimiento.' },
                            { year: '1994', title: 'Constitución Nacional', body: 'La Disposición Transitoria Primera declara que la recuperación de las Islas Malvinas es objetivo permanente e irrenunciable de la Nación Argentina.' },
                            { year: '2017 → presente', title: 'Identificación de los caídos', body: 'El Equipo Argentino de Antropología Forense identifica más de 110 cuerpos en el Cementerio de Darwin. Las familias pueden volver a despedir a sus seres queridos.' }
                        ].map((item, i) => (
                            <div key={i} style={{ background: '#fff', border: `1px solid rgba(9,9,12,0.08)`, borderRadius: '12px', padding: '1rem', borderLeft: `4px solid ${COLORS.accent}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: COLORS.accent, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.4rem' }}>
                                    <Calendar size={12} /> {item.year}
                                </div>
                                <h4 style={{ fontFamily: '"Public Sans", sans-serif', margin: 0, fontWeight: 800, color: COLORS.deep, fontSize: '1rem' }}>{item.title}</h4>
                                <p style={{ fontFamily: '"Public Sans", sans-serif', fontSize: '0.85rem', margin: '0.4rem 0 0', color: COLORS.base, lineHeight: 1.55 }}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* COSTO HUMANO Y REFLEXIONES */}
                <section style={{ ...SECTION.container, background: COLORS.base, color: COLORS.paper }}>
                    <div style={{ ...SECTION.subtitle, color: COLORS.accent }}>Costo humano y reflexión</div>
                    <h2 style={{ ...SECTION.title, color: COLORS.paper }}>Más allá de los números</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginTop: '1.25rem' }}>
                        {[
                            { n: '649', label: 'Soldados argentinos caídos en combate' },
                            { n: '+500', label: 'Suicidios de veteranos en la posguerra' },
                            { n: '255', label: 'Soldados británicos caídos' },
                            { n: '74', label: 'Días que duró la guerra' },
                            { n: '18-19', label: 'Edad promedio de los conscriptos' },
                            { n: '1833', label: 'Año de la ocupación británica original' }
                        ].map((s, i) => (
                            <div key={i} style={{ background: 'rgba(240,236,229,0.05)', border: '1px solid rgba(240,236,229,0.12)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                                <div style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', fontSize: '2rem', fontWeight: 700, color: COLORS.accent, lineHeight: 1 }}>{s.n}</div>
                                <div style={{ fontSize: '0.78rem', color: COLORS.sky, marginTop: '0.4rem', lineHeight: 1.4 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                        {[
                            {
                                titulo: 'No fue una causa, fueron pibes.',
                                texto: 'Detrás de cada caído hay una madre que lo esperaba con la cena, un perro durmiendo en la cama, una novia que escribió cartas que nunca llegaron. Recordarlos como personas es la primera forma de honra.'
                            },
                            {
                                titulo: 'La guerra como cortina',
                                texto: 'La dictadura militar (1976-1983), en crisis económica y de legitimidad, usó la recuperación de Malvinas como herramienta política. La causa es justa; la guerra impuesta a esos pibes, no.'
                            },
                            {
                                titulo: 'Pensamiento crítico de los medios',
                                texto: 'Mientras se perdía la guerra, las tapas de revistas decían "Estamos ganando". Discutir Malvinas hoy es también discutir cómo se construyen los relatos mediáticos sobre cualquier conflicto.'
                            },
                            {
                                titulo: 'Soberanía pacífica',
                                texto: 'La Argentina sostiene el reclamo por vías diplomáticas. La memoria escolar, las experiencias inmersivas y el conocimiento histórico son parte de esa defensa cultural permanente.'
                            }
                        ].map((r, i) => (
                            <div key={i} style={{ background: 'rgba(240,236,229,0.05)', borderLeft: `3px solid ${COLORS.accent}`, padding: '1.25rem', borderRadius: '10px' }}>
                                <h4 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', fontStyle: 'italic', margin: 0, color: COLORS.paper, fontSize: '1.2rem', fontWeight: 700 }}>
                                    {r.titulo}
                                </h4>
                                <p style={{ fontFamily: '"Public Sans", sans-serif', margin: '0.5rem 0 0', fontSize: '0.92rem', lineHeight: 1.65, color: COLORS.paper, opacity: 0.92 }}>
                                    {r.texto}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* VIDEO YOUTUBE */}
                <section style={{ ...SECTION.container }}>
                    <div style={SECTION.subtitle}>Material audiovisual</div>
                    <h2 style={SECTION.title}>Video documental</h2>
                    <p style={{ ...SECTION.body, marginBottom: '1rem' }}>
                        El docente puede pegar acá la URL de un video de YouTube sobre Malvinas para enriquecer la experiencia.
                        Sugeridos: documentales de Canal Encuentro, "Iluminados por el fuego" (Tristán Bauer), testimonios del CECIM (Centro de Excombatientes Islas Malvinas).
                    </p>

                    {!videoId || editingVideo ? (
                        <div style={{ background: '#fff', border: `2px dashed ${COLORS.deep}`, borderRadius: '12px', padding: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, color: COLORS.deep, marginBottom: '0.4rem' }}>
                                URL o ID de YouTube
                            </label>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <input
                                    type="text"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    defaultValue={videoUrl}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { saveVideo(e.target.value); setEditingVideo(false); } }}
                                    style={{ flex: 1, minWidth: '220px', padding: '0.65rem 0.85rem', borderRadius: '8px', border: `1px solid ${COLORS.sky}`, fontSize: '0.9rem', fontFamily: 'inherit' }}
                                    id="malvinas-yt-input"
                                />
                                <button
                                    onClick={() => { const v = document.getElementById('malvinas-yt-input').value; saveVideo(v); setEditingVideo(false); }}
                                    style={{ background: COLORS.deep, color: COLORS.paper, border: 'none', borderRadius: '8px', padding: '0.65rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}
                                >
                                    Cargar video
                                </button>
                            </div>
                            <div style={{ marginTop: '0.85rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.75rem', color: COLORS.deep, fontWeight: 700 }}>Búsquedas sugeridas:</span>
                                {[
                                    'Malvinas+Canal+Encuentro+documental',
                                    'Iluminados+por+el+fuego+trailer',
                                    'CECIM+Malvinas+testimonios',
                                    'Malvinas+causa+nacional'
                                ].map(q => (
                                    <a key={q} href={`https://www.youtube.com/results?search_query=${q}`} target="_blank" rel="noreferrer"
                                        style={{ fontSize: '0.75rem', color: COLORS.accent, textDecoration: 'none', background: 'rgba(180,83,84,0.1)', padding: '0.2rem 0.6rem', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                        {q.replace(/\+/g, ' ')} <ExternalLink size={11} />
                                    </a>
                                ))}
                            </div>
                            <p style={{ fontSize: '0.78rem', color: COLORS.base, marginTop: '0.85rem', marginBottom: 0, opacity: 0.7 }}>
                                Acepta URL completa, formato youtu.be o solo el ID de 11 caracteres. Se guarda en este dispositivo.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '14px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(9,9,12,0.25)' }}>
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                                    title="Video Malvinas"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                />
                            </div>
                            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.78rem', color: COLORS.base, opacity: 0.7 }}>
                                    Reproduciendo videoId: <code style={{ background: '#eef0f3', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{videoId}</code>
                                </span>
                                <button onClick={() => setEditingVideo(true)} style={{ background: 'transparent', border: `1px solid ${COLORS.deep}`, color: COLORS.deep, borderRadius: '8px', padding: '0.4rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <Edit3 size={12} /> Cambiar video
                                </button>
                            </div>
                        </>
                    )}
                </section>

                {/* CIERRE */}
                <section style={{
                    background: COLORS.deep,
                    color: COLORS.paper,
                    borderRadius: '18px',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <motion.p 
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        style={{
                            fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif',
                            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                            fontStyle: 'italic',
                            margin: 0,
                            color: COLORS.paper,
                            lineHeight: 1.4,
                            zIndex: 2,
                            position: 'relative'
                        }}
                    >
                        "Que las nuevas generaciones no aprendan Malvinas como una fecha, sino como una experiencia."
                    </motion.p>
                    <div style={{ position: 'absolute', top: '-20%', left: '-10%', opacity: 0.1, color: '#fff' }}>
                        <Compass size={300} />
                    </div>
                </section>

            </div>
        </>
    );
};

export default ProyectoMalvinas;
