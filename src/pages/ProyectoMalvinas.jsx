import React from 'react';
import { motion } from 'framer-motion';
import {
    Compass, Users, Target, Tv, Image as ImageIcon, Linkedin, Newspaper,
    Activity, Video, HelpCircle, Wrench, Mic2, AlertTriangle, Camera, Mail,
    Palette, Type, Snowflake, Archive, Heart, FileText
} from 'lucide-react';

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

const ProyectoMalvinas = () => {
    return (
        <>
            {/* Carga la fuente Public Sans desde Google Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                .malvinas-hero-grain {
                    background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
                    background-size: 4px 4px;
                }
            `}</style>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem 4rem' }}>

                {/* HERO */}
                <header style={{
                    background: `linear-gradient(180deg, ${COLORS.base} 0%, ${COLORS.deep} 100%)`,
                    color: COLORS.paper,
                    borderRadius: '22px',
                    padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 3vw, 2.5rem)',
                    marginTop: '1rem',
                    marginBottom: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden'
                }} className="malvinas-hero-grain">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            display: 'inline-block',
                            padding: '0.35rem 0.9rem',
                            border: `1px solid ${COLORS.accent}`,
                            borderRadius: '999px',
                            fontSize: '0.7rem',
                            letterSpacing: '3px',
                            fontFamily: '"Public Sans", sans-serif',
                            fontWeight: 700,
                            color: COLORS.accent,
                            textTransform: 'uppercase',
                            marginBottom: '1.25rem'
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
                            fontSize: 'clamp(2.4rem, 6.5vw, 4.4rem)',
                            fontWeight: 700,
                            margin: 0,
                            letterSpacing: '-1px',
                            lineHeight: 1.05
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
                            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                            maxWidth: '720px',
                            marginTop: '1.25rem',
                            color: COLORS.paper,
                            opacity: 0.92,
                            lineHeight: 1.5
                        }}
                    >
                        Stand inmersivo itinerante que circula por clubes, ferias culturales, escuelas y municipios del Gran Buenos Aires.
                        Una propuesta para que los contenidos sobre Malvinas no solo informen, sino que generen reflexión, emoción e identidad.
                    </motion.p>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                        {[
                            { label: 'Edad', value: '10–17 años' },
                            { label: 'Duración', value: '~2 horas' },
                            { label: 'Formato', value: 'Stand itinerante' },
                            { label: 'Región', value: 'Gran Buenos Aires' }
                        ].map(({ label, value }) => (
                            <div key={label} style={{
                                background: 'rgba(240,236,229,0.06)',
                                border: '1px solid rgba(240,236,229,0.15)',
                                borderRadius: '12px',
                                padding: '0.6rem 1rem',
                                fontFamily: '"Public Sans", sans-serif'
                            }}>
                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: COLORS.sky }}>{label}</div>
                                <div style={{ fontWeight: 800, color: COLORS.paper, fontSize: '1rem' }}>{value}</div>
                            </div>
                        ))}
                    </div>
                </header>

                {/* CONCEPTO */}
                <section style={SECTION.container}>
                    <div style={SECTION.subtitle}>Concepto</div>
                    <h2 style={SECTION.title}>Memoria viva, experiencia inmersiva</h2>
                    <p style={SECTION.body}>
                        Las formas tradicionales de enseñar historia suelen sentirse lejanas o poco significativas para quienes hoy
                        están atravesados por contenidos digitales y experiencias dinámicas. <strong>Malvinas en primera persona</strong>
                        propone una experiencia inmersiva, participativa y emocional que conecta a los jóvenes con la guerra desde
                        una perspectiva humana, crítica y reflexiva.
                    </p>
                </section>

                {/* PÚBLICO Y OBJETIVO */}
                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    <div style={{ ...SECTION.container, marginBottom: 0 }}>
                        <Users size={28} color={COLORS.accent} />
                        <h3 style={{ ...SECTION.title, fontSize: '1.4rem', marginTop: '0.5rem' }}>Público objetivo</h3>
                        <p style={SECTION.body}>
                            Niños y adolescentes de entre <strong>10 y 17 años</strong> del Gran Buenos Aires.
                            Edades en las que el contenido digital, dinámico y participativo construye identidad.
                        </p>
                    </div>
                    <div style={{ ...SECTION.container, marginBottom: 0 }}>
                        <Target size={28} color={COLORS.accent} />
                        <h3 style={{ ...SECTION.title, fontSize: '1.4rem', marginTop: '0.5rem' }}>Objetivo general</h3>
                        <p style={SECTION.body}>
                            Crear una experiencia <strong>inmersiva, participativa y emocional</strong> que permita conectar a los jóvenes
                            con la Guerra de Malvinas desde una perspectiva humana, crítica y reflexiva.
                        </p>
                    </div>
                    <div style={{ ...SECTION.container, marginBottom: 0 }}>
                        <Compass size={28} color={COLORS.accent} />
                        <h3 style={{ ...SECTION.title, fontSize: '1.4rem', marginTop: '0.5rem' }}>Formato</h3>
                        <p style={SECTION.body}>
                            <strong>Stand inmersivo itinerante</strong> con recorrido experiencial de aproximadamente <strong>2 horas</strong>,
                            pensado para circular por clubes, ferias culturales, escuelas y municipios.
                        </p>
                    </div>
                </section>

                {/* ESTRATEGIA TRANSMEDIA */}
                <section style={SECTION.container}>
                    <div style={SECTION.subtitle}>Estrategia transmedia</div>
                    <h2 style={SECTION.title}>De lo físico a lo digital</h2>
                    <p style={{ ...SECTION.body, marginBottom: '1.5rem' }}>
                        La experiencia física funciona como eje principal y luego se expande a distintas plataformas digitales mediante
                        producciones específicas para cada audiencia.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                        <PlatformCard
                            icon={Tv}
                            name="TikTok"
                            description="Videos breves, dinámicos e inmersivos sobre momentos clave del stand."
                            objective="Alcanzar adolescentes."
                            color="#000"
                        />
                        <PlatformCard
                            icon={Tv}
                            name="YouTube"
                            description="Pieza audiovisual que sintetiza el proyecto: recorrido, actividades y reflexiones."
                            objective="Comunicar la experiencia integralmente."
                            color="#FF0000"
                        />
                        <PlatformCard
                            icon={ImageIcon}
                            name="Instagram & Facebook"
                            description="Contenido visual y cercano: clips, fotos y frases de la experiencia."
                            objective="Llegar a familias y público local."
                            color={COLORS.accent}
                        />
                        <PlatformCard
                            icon={Linkedin}
                            name="LinkedIn"
                            description="Publicación profesional sobre proceso educativo y competencias aplicadas."
                            objective="Alcanzar docentes y profesionales."
                            color="#0A66C2"
                        />
                        <PlatformCard
                            icon={Newspaper}
                            name="Prensa"
                            description="Gacetilla institucional que presenta el proyecto como propuesta innovadora."
                            objective="Visibilidad, municipios y sponsors."
                            color={COLORS.deep}
                        />
                    </div>
                </section>

                {/* ESCALETA DEL RECORRIDO */}
                <section style={SECTION.container}>
                    <div style={SECTION.subtitle}>Escaleta del recorrido</div>
                    <h2 style={SECTION.title}>8 momentos, una experiencia</h2>
                    <p style={{ ...SECTION.body, marginBottom: '1.5rem' }}>
                        Una secuencia diseñada para activar el cuerpo, ubicar históricamente, despertar el pensamiento crítico y
                        cerrar con una conexión emocional en primera persona.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        <StageCard num="1" title='Activación — "Colimba"' icon={Activity}
                            description="Circuito físico breve con ejercicios de alta energía."
                            objective="Activar al grupo desde lo corporal y emocional, romper la lógica tradicional del aula y generar predisposición y atención." />
                        <StageCard num="2" title="Video introductorio" icon={Video}
                            description="Proyección audiovisual de 3 a 5 minutos sobre el contexto político, geográfico y social de la Guerra de Malvinas."
                            objective="Situar históricamente a los participantes." />
                        <StageCard num="3" title="Trivia grupal" icon={HelpCircle}
                            description="Juego de preguntas verdadero o falso sobre el contenido del video."
                            objective="Reforzar contenidos de forma dinámica e interactiva." />
                        <StageCard num="4" title="Herramienta de supervivencia" icon={Wrench}
                            description="Diseño de una herramienta útil para el contexto de las islas con materiales simples."
                            objective="Comprender las condiciones del entorno y estimular el pensamiento creativo." />
                        <StageCard num="5" title="Mini exposición" icon={Mic2}
                            description="Cada grupo presenta su herramienta y explica su funcionamiento."
                            objective="Desarrollar habilidades de comunicación y construcción de discurso." />
                        <StageCard num="6" title="La falsa victoria" icon={AlertTriangle}
                            description="Actividad sobre el rol de los medios durante el conflicto y la manipulación informativa."
                            objective="Fomentar el pensamiento crítico sobre los relatos mediáticos." />
                        <StageCard num="7" title="Corresponsales de guerra" icon={Camera}
                            description="Creación de una noticia (video o audio) contando aquello que creen que no se mostró durante la guerra."
                            objective="Aplicar una mirada crítica en la producción de contenidos y narrativas." />
                        <StageCard num="8" title="Cierre emocional" icon={Mail}
                            description="Lectura de una carta familiar y escritura de una respuesta en primera persona."
                            objective="Promover empatía y conexión emocional con los protagonistas del conflicto." />
                    </div>
                </section>

                {/* MOODBOARD */}
                <section style={{
                    ...SECTION.container,
                    background: COLORS.base,
                    color: COLORS.paper
                }}>
                    <div style={{ ...SECTION.subtitle, color: COLORS.accent }}>Moodboard</div>
                    <h2 style={{ ...SECTION.title, color: COLORS.paper }}>Estética sobria, emocional, inmersiva</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                        <ColorSwatch hex="#09090c" name="Negro humo" />
                        <ColorSwatch hex="#b45354" name="Terracota" />
                        <ColorSwatch hex="#7b98ab" name="Azul gris frío" />
                        <ColorSwatch hex="#35446a" name="Atlántico profundo" />
                        <ColorSwatch hex="#f0ece5" name="Papel archivo" />
                    </div>

                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <div style={{ ...SECTION.subtitle, color: COLORS.sky, marginBottom: '0.75rem' }}>
                                <Type size={14} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
                                Tipografías
                            </div>
                            <div style={{
                                background: 'rgba(240,236,229,0.05)',
                                border: '1px solid rgba(240,236,229,0.12)',
                                padding: '1.25rem',
                                borderRadius: '12px'
                            }}>
                                <div style={{
                                    fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif',
                                    fontSize: '2.2rem',
                                    fontWeight: 700,
                                    fontStyle: 'italic',
                                    color: COLORS.paper
                                }}>EFCO Brookshire</div>
                                <div style={{ fontFamily: '"Public Sans", sans-serif', fontSize: '0.85rem', color: COLORS.sky, marginBottom: '0.75rem' }}>Display — títulos, citas, voz protagonista</div>

                                <div style={{ fontFamily: '"Public Sans", sans-serif', fontSize: '1.6rem', fontWeight: 800, color: COLORS.paper }}>Public Sans</div>
                                <div style={{ fontFamily: '"Public Sans", sans-serif', fontSize: '0.85rem', color: COLORS.sky }}>Texto corrido — claridad, lectura prolongada</div>
                            </div>
                        </div>

                        <div>
                            <div style={{ ...SECTION.subtitle, color: COLORS.sky, marginBottom: '0.75rem' }}>
                                <Palette size={14} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
                                Conceptos visuales
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <ConceptChip icon={Archive} label="Archivo histórico" />
                                <ConceptChip icon={Snowflake} label="Frío y aislamiento" />
                                <ConceptChip icon={FileText} label="Memoria" />
                                <ConceptChip icon={Users} label="Juventud" />
                                <ConceptChip icon={Compass} label="Inmersión" />
                                <ConceptChip icon={Heart} label="Identidad argentina" />
                                <ConceptChip icon={Mic2} label="Primera persona" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* CIERRE */}
                <section style={{
                    background: COLORS.deep,
                    color: COLORS.paper,
                    borderRadius: '18px',
                    padding: '2rem 1.5rem',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif',
                        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                        fontStyle: 'italic',
                        margin: 0,
                        color: COLORS.paper,
                        lineHeight: 1.4
                    }}>
                        "Que las nuevas generaciones no aprendan Malvinas como una fecha, sino como una experiencia."
                    </p>
                </section>

            </div>
        </>
    );
};

export default ProyectoMalvinas;
