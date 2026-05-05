import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, Snowflake, Utensils, Mail, Compass, RotateCcw,
    AlertTriangle, BookOpen, ChevronRight, Activity
} from 'lucide-react';

const COLORS = {
    base: '#09090c',
    accent: '#b45354',
    sky: '#7b98ab',
    deep: '#35446a',
    paper: '#f0ece5'
};

// ─── ESTRUCTURA DEL JUEGO ─────────────────────────────────────────────
const SCENES = {
    intro: {
        chapter: 'Prólogo',
        title: 'Otoño 1982 · Buenos Aires',
        text: 'Tenés 18 años. Acabás de empezar el Servicio Militar Obligatorio en Campo de Mayo. Una mañana, entre formaciones y limpieza, anuncian por altavoz: "Hoy todos los conscriptos forman para una misión especial". Te entregan un casco, un FAL viejo, y un boleto de avión hacia el sur.',
        choices: [
            { label: 'Subo al avión sin preguntar. Cumplo mi deber.', next: 'avion', effects: { miedo: +1, conviccion: +2 } },
            { label: 'Le pregunto al sargento a dónde vamos.', next: 'pregunta_sgto', effects: { miedo: +0, conviccion: +1, info: +2 } },
            { label: 'Intento avisarle a mi mamá antes de partir.', next: 'mama', effects: { miedo: +2, empatia: +1, conviccion: -1 } }
        ]
    },
    avion: {
        chapter: '1',
        title: 'Vuelo al sur',
        text: 'El Hércules está repleto y ruidoso. Los muchachos cantan la Marcha de Malvinas. Algunos nunca habían salido de su provincia ni habían visto la nieve. Mirando por la ventanilla descubrís el Atlántico Sur oscuro e infinito. Te reparten una hoja de papel.',
        choices: [
            { label: 'Escribo: "No te preocupes mami, vuelvo pronto."', next: 'islas', effects: { empatia: +2 } },
            { label: 'Escribo todo lo que siento: el miedo a lo desconocido.', next: 'islas', effects: { empatia: +3, miedo: +2 } },
            { label: 'Guardo la hoja en el bolsillo de mi chaqueta. No escribo.', next: 'islas', effects: { miedo: +1 } }
        ]
    },
    pregunta_sgto: {
        chapter: '1',
        title: 'En el cuartel',
        text: '"Vamos a recuperar nuestras Malvinas, soldado. Los ingleses las ocupan desde hace 149 años y las vamos a recuperar." El sargento te mira fijo y severo. "¿Alguna duda?"',
        info: 'La ocupación británica data del 3 de enero de 1833. La decisión militar de 1982 fue tomada por la Junta Dictatorial liderada por Galtieri sin consultar al pueblo, usándola también para calmar el descontento social.',
        choices: [
            { label: 'Saludo firme y avanzo hacia la formación.', next: 'avion', effects: { conviccion: +2, info: +1 } },
            { label: 'Me quedo callado, mirando al suelo.', next: 'avion', effects: { miedo: +1, info: +1 } }
        ]
    },
    mama: {
        chapter: '1',
        title: 'Sin opción',
        text: 'No hay teléfono fijo libre y hay orden estricta de no difundir movimientos de tropas. La fila al único teléfono público es de cien personas. Tu mamá no se entera hasta tres días después cuando lo dicen por cadena nacional.',
        choices: [
            { label: 'Subir al avión con angustia contenida.', next: 'avion', effects: { miedo: +1, salud: -1 } }
        ]
    },
    islas: {
        chapter: '2',
        title: 'Puerto Argentino',
        text: 'Al bajar sentís que el viento te corta el rostro. Hace 2°C y garúa llovizna helada. Todo huele a turba húmeda y combustible. Te asignan junto a tu sección la defensa del Monte Tumbledown. La orden es clara: hay que cavar en la piedra.',
        info: 'El suelo malvinense retiene el agua (turbera). Al cavar trincheras ("pozos de zorro"), el agua subterránea inundaba el foso, obligando a los soldados a vivir empapados a temperaturas bajo cero.',
        choices: [
            { label: 'Pico la piedra rápido para armar una buena defensa.', next: 'guardia_nocturna', effects: { conviccion: +2, hambre: +1 } },
            { label: 'Ayudo primero a los compañeros que no tienen palas.', next: 'guardia_nocturna', effects: { empatia: +3, conviccion: +1, hambre: +1 } },
            { label: 'Cavo despacio, tratando de conservar la poca energía.', next: 'guardia_nocturna', effects: { miedo: +1, frio: +2 } }
        ]
    },
    guardia_nocturna: {
        chapter: '3',
        title: 'Primera Guardia',
        text: '2AM. Tu turno de vigilancia. Estás solo en la intemperie. La humedad se cuela en los huesos y la campera militar parece de papel. Escuchás a lo lejos cañoneos navales.',
        choices: [
            { label: 'Abrazo mi fusil para tratar de no temblar.', next: 'amigo', effects: { frio: +2, miedo: +2 } },
            { label: 'Me pongo a pensar en la cocina caliente de mi casa.', next: 'amigo', effects: { empatia: +1, frio: +2, hambre: +1 } },
            { label: 'Intento mantener la visión enfocada en el horizonte.', next: 'amigo', effects: { conviccion: +1, frio: +1 } }
        ]
    },
    amigo: {
        chapter: '4',
        title: 'Ramón',
        text: 'Al día siguiente descubrís que tu compañero de pozo es Ramón, de Corrientes. Nunca en su vida había sentido tanto frío. "Mi novia me preparó pulóveres, pero no me dejaron traerlos", cuenta riendo para no llorar. Por la noche sintonizan una radio en onda corta con un receptor a pilas.',
        info: 'Para contrarrestar la censura del gobierno dictatorial argentino que decía "Estamos ganando", los soldados a menudo escuchaban radios uruguayas o la BBC (Radio Carve de Montevideo era muy escuchada) para entender la realidad del terreno.',
        choices: [
            { label: 'Sintonizo radio de Argentina. Necesito buenas noticias.', next: 'hambre', effects: { conviccion: +2, info: -2 } },
            { label: 'Sintonizo una radio de afuera (BBC/Uruguay).', next: 'hambre', effects: { conviccion: -1, info: +3, miedo: +1 } },
            { label: 'Apago la radio. No me importa lo que digan allá lejos.', next: 'hambre', effects: {} }
        ]
    },
    hambre: {
        chapter: '5',
        title: 'La logística rota',
        text: 'Pasaron 9 días. La "ración de combate" (mate cocido y un caldo de oveja aguado) llega fría y tarde, si es que llega. La artillería enemiga cortó los suministros. Un grupo planea bajar al pueblo de noche para robar comida del depósito de los oficiales.',
        info: 'El desabastecimiento fue drástico y las diferencias de provisiones entre oficiales de alto rango y suboficiales/conscriptos crearon graves tensiones y sufrimiento (desnutrición).',
        choices: [
            { label: 'Me uno al grupo. La necesidad es más fuerte.', next: 'castigo', effects: { hambre: -2, miedo: +2 } },
            { label: 'Decido aguantar. Es peligroso si nos descubren.', next: 'ataque_aereo_previo', effects: { hambre: +3, conviccion: +1 } },
            { label: 'Le doy lo último que me queda a Ramón, que está peor.', next: 'ataque_aereo_previo', effects: { empatia: +4, hambre: +4 } }
        ]
    },
    castigo: {
        chapter: '5',
        title: 'Descubiertos',
        text: 'En plena madrugada, los sorprende una patrulla. Un cabo los reprende a gritos y castiga a uno de tus compañeros a ser "estaqueado" en la intemperie helada.',
        info: 'Los estaqueamientos constituyeron torturas graves y fueron documentados como crímenes por veteranos tiempo después, mostrando la crueldad interna en algunos mandos autoritarios.',
        choices: [
            { label: 'Trato de cubrir a mi compañero durante la noche.', next: 'ataque_aereo_previo', effects: { empatia: +3, miedo: +1, frio: +2 } },
            { label: 'Trago saliva y guardo mi frustración para sobrevivir.', next: 'ataque_aereo_previo', effects: { miedo: +2, info: +2 } }
        ]
    },
    ataque_aereo_previo: {
        chapter: '6',
        title: 'Fuego naval',
        text: 'Mayo avanza. Los británicos han desembarcado en San Carlos y avanzan. Por las noches, barcos británicos lanzan cañonazos de artillería sobre sus posiciones de manera constante para quebrar la moral y no dejarlos dormir.',
        choices: [
            { label: 'Tapo mis oídos y rezo.', next: 'hospital_campana', effects: { miedo: +3 } },
            { label: 'Me asomo para intentar ver de dónde disparan.', next: 'hospital_campana', effects: { conviccion: +2, miedo: +1 } },
            { label: 'Acuno a Ramón, que entró en pánico.', next: 'hospital_campana', effects: { empatia: +3 } }
        ]
    },
    hospital_campana: {
        chapter: '7',
        title: 'Congelamiento',
        text: 'Amanece y no sentís los dedos de los pies. Están negros. Te llevan caminando a la fuerza al hospital de campaña de Puerto Argentino. Allí ves a decenas de chicos como vos.',
        info: 'El "Pie de trinchera" se causaba por la humedad permanente, inmovilidad y congelamiento. Generó múltiples amputaciones que hubieran sido evitables con el abrigo que las familias enviaban al continente pero jamás llegó a las islas.',
        choices: [
            { label: 'Pido volver a mi pozo. Está Ramón ahí y viene el ataque final.', next: 'medios', effects: { conviccion: +3, empatia: +2, frio: -1 } },
            { label: 'Dejo que los médicos me atiendan y descansar un poco.', next: 'medios', effects: { frio: -3, hambre: -1 } }
        ]
    },
    medios: {
        chapter: '8',
        title: 'Revistas del continente',
        text: 'En el centro de salud ves una revista "Gente" llegada desde el continente. La tapa muestra sonrisas y dice "ESTAMOS GANANDO". En el centro de la revista hay listas de donaciones millonarias que nunca vieron.',
        choices: [
            { label: 'Lloro de impotencia. Alguien nos mintió.', next: 'final_ataque', effects: { info: +3, miedo: +1 } },
            { label: 'Tiro la revista. Acá la única verdad es el plomo que viene.', next: 'final_ataque', effects: { conviccion: +1, empatia: -1 } }
        ]
    },
    final_ataque: {
        chapter: '9',
        title: 'La Batalla Final',
        text: 'Noche del 13 al 14 de junio. Monte Longdon, Dos Hermanas y Tumbledown. Todo es fuego intenso, bengalas que iluminan como el día blanco y cuerpos cayendo.',
        info: 'Los enfrentamientos cuerpo a cuerpo en los cerros perimetrales fueron de altísima carnicería. Algunos grupos resistieron hasta agotar municiones contra tropas de élite y paracaidistas británicos que avanzaban en la noche.',
        choices: [
            { label: 'Soporto la posición y devuelvo el fuego.', next: 'rendicion', effects: { conviccion: +4, miedo: +3 } },
            { label: 'Trato de replegar al grupo a una posición segura.', next: 'rendicion', effects: { empatia: +2, info: +2 } },
            { label: 'Todo es caos. Sigo a mi compañero a ciegas.', next: 'rendicion', effects: { miedo: +4 } }
        ]
    },
    rendicion: {
        chapter: '10',
        title: 'Fin',
        text: 'Humo sobre Puerto Argentino. La orden es romper las armas y rendirse. El General Menéndez firmó la capitulación. Caminás hacia el galpón inglés para ser tomado prisionero. Terminó. 74 días que cambiaron para siempre quién eras.',
        info: 'Saldo del conflicto: 649 caídos argentinos. Fueron capturados, registrados y poco a poco devueltos al continente en barcos transatlánticos (como el Canberra) y vuelos.',
        choices: [
            { label: 'Cerrar los ojos, respirar la paz de estar vivo.', next: 'regreso', effects: { empatia: +1 } },
            { label: 'Sentir vergüenza de haber perdido.', next: 'regreso', effects: { conviccion: -2 } },
            { label: 'Jurar que nadie los va a olvidar.', next: 'regreso', effects: { info: +3, conviccion: +2 } }
        ]
    },
    regreso: {
        chapter: 'Epílogo',
        title: 'La vuelta',
        text: 'Desembarcan en Madryn un día a escondidas, en micros sin parar porque el gobierno teme el fracaso expuesto. Tu madre dejó tu cama intacta. Pero los primeros años fueron los de la Desmalvinización y el olvido profundo. El Estado les dio la espalda.',
        info: 'Más de 500 veteranos argentinos se suicidaron en las tres décadas posteriores a 1982 a causa del trastorno por estrés postraumático, falta de reconocimiento social e incapacidad psicológica para reinsertarse laboralmente.',
        choices: [
            { label: 'Descubrir cómo el viaje me ha marcado →', next: 'final', effects: {} }
        ]
    }
};

const initialStats = {
    miedo: 0,
    conviccion: 0,
    empatia: 0,
    info: 0,
    frio: 0,
    hambre: 0
};

const STAT_META = {
    empatia: { label: 'Empatía y Vínculo', color: '#43a047', icon: Heart },
    conviccion: { label: 'Convicción', color: COLORS.accent, icon: Compass },
    miedo: { label: 'Miedo / Trauma', color: '#9c27b0', icon: AlertTriangle },
    info: { label: 'Conciencia Crítica', color: COLORS.sky, icon: BookOpen },
    frio: { label: 'Daño Físico (Frío)', color: '#3b82f6', icon: Snowflake },
    hambre: { label: 'Desnutrición', color: '#f59e0b', icon: Utensils },
};

const MalvinasJuegoSerio = () => {
    const [sceneId, setSceneId] = useState('intro');
    const [stats, setStats] = useState(initialStats);
    const [path, setPath] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [finished, setFinished] = useState(false);
    const sceneRef = useRef(null);

    useEffect(() => {
        if (sceneRef.current) sceneRef.current.scrollTop = 0;
    }, [sceneId]);

    const scene = SCENES[sceneId];

    const choose = (choice) => {
        const eff = choice.effects || {};
        setStats((s) => {
            const next = { ...s };
            for (const k of Object.keys(eff)) next[k] = (next[k] || 0) + eff[k];
            return next;
        });
        setPath((p) => [...p, { sceneId, label: choice.label }]);
        setShowInfo(false);

        if (choice.next === 'final') {
            setFinished(true);
        } else {
            setSceneId(choice.next);
        }
    };

    const restart = () => {
        setSceneId('intro');
        setStats(initialStats);
        setPath([]);
        setShowInfo(false);
        setFinished(false);
    };

    if (finished) {
        const reflection = generateReflection(stats);
        return (
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem 4rem', fontFamily: '"Public Sans", sans-serif' }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');`}</style>
                
                {/* Cabecera de fin de juego */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    style={{
                        background: `linear-gradient(135deg, ${COLORS.base}, ${COLORS.deep})`,
                        color: COLORS.paper,
                        borderRadius: '22px',
                        padding: '3rem 2rem',
                        marginTop: '1rem',
                        textAlign: 'center'
                    }}
                >
                    <Heart size={42} color={COLORS.accent} />
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px', color: COLORS.accent, fontWeight: 800, marginTop: '1rem' }}>Despliegue Finalizado</div>
                    <h1 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0.5rem 0 1rem', lineHeight: 1.1 }}>
                        {reflection.title}
                    </h1>
                    <p style={{ maxWidth: '750px', margin: '0 auto', opacity: 0.95, lineHeight: 1.8, fontSize: '1.1rem' }}>
                        {reflection.text}
                    </p>
                </motion.div>

                {/* Dashboard de resumen visual dos columnas */}
                <section style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 2fr)', gap: '2rem', marginTop: '2rem' }}>
                    
                    {/* Izquierda: Imagen del soldado de Malvinas */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <div style={{ borderRadius: '18px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', height: '100%', minHeight: '400px' }}>
                            <img src="/malvinas_soldado_reflexion.png" alt="Soldado en postguerra reflexionando" style={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'cover', display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(9,9,12,0.95) 10%, transparent)', padding: '3rem 1.5rem 1.5rem' }}>
                                <p style={{ color: COLORS.accent, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 0.5rem' }}>LA MEMORIA ACTIVA</p>
                                <p style={{ color: COLORS.paper, margin: 0, fontSize: '0.95rem', lineHeight: 1.5, opacity: 0.9 }}>
                                    Entender Malvinas es ir mucho más allá del hecho bélico. Es abrazar el dolor e incorporar la disputa pacífica desde nuestra identidad.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Derecha: Stats y decisiones */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        
                        <div style={{ background: COLORS.paper, padding: '2rem', borderRadius: '18px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', color: COLORS.deep, marginTop: 0, fontSize: '1.6rem' }}>Tus Marcas de Guerra</h2>
                            <p style={{ fontSize: '0.85rem', color: COLORS.base, opacity: 0.7, marginBottom: '1.5rem' }}>Perfil psicológico y físico según tus elecciones.</p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
                                {Object.entries(STAT_META).map(([k, m]) => {
                                    const v = stats[k] || 0;
                                    const max = 15;
                                    const pct = Math.min(100, Math.max(0, (v / max) * 100));
                                    const Icon = m.icon;
                                    return (
                                        <div key={k} style={{ background: '#fff', border: `1px solid ${m.color}33`, borderRadius: '12px', padding: '0.85rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: m.color, fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                                                <Icon size={14} /> {m.label}
                                            </div>
                                            <div style={{ marginTop: '0.6rem', height: '6px', background: '#eef0f3', borderRadius: '999px', overflow: 'hidden' }}>
                                                <div style={{ width: `${pct}%`, height: '100%', background: m.color, transition: 'width 0.4s' }} />
                                            </div>
                                            <div style={{ fontWeight: 900, fontSize: '1.6rem', marginTop: '0.3rem', color: COLORS.base }}>
                                                {v} <span style={{ fontSize: '0.75rem', opacity: 0.4, fontWeight: 500 }}>/{max}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ background: '#fff', padding: '2rem', borderRadius: '18px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: `1px solid rgba(9,9,12,0.05)` }}>
                            <h2 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', color: COLORS.deep, marginTop: 0, fontSize: '1.6rem' }}>Hoja de Ruta</h2>
                            <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '1rem' }}>
                                <ol style={{ paddingLeft: '1rem', margin: 0, color: COLORS.base }}>
                                    {path.map((p, i) => (
                                        <li key={i} style={{ marginBottom: '0.6rem', fontSize: '0.85rem', lineHeight: 1.5, borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.6rem' }}>
                                            <div style={{ color: COLORS.accent, fontWeight: 800, letterSpacing: '0.5px' }}>{SCENES[p.sceneId]?.title || `CAP ${i}`}</div>
                                            <div style={{ opacity: 0.9 }}>{p.label}</div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            
                            <button onClick={restart} style={{ 
                                marginTop: '1.5rem', width: '100%', padding: '1rem', background: COLORS.accent, 
                                color: COLORS.paper, border: 'none', borderRadius: '12px', fontWeight: 800, 
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                transition: 'all 0.2s', boxShadow: '0 5px 15px rgba(180, 83, 84, 0.4)'
                            }}>
                                <RotateCcw size={18} /> Reintentar Experiencia
                            </button>
                        </div>
                    </motion.div>
                </section>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem 4rem', fontFamily: '"Public Sans", sans-serif' }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');`}</style>
            
            <header style={{
                background: `linear-gradient(135deg, ${COLORS.base}, ${COLORS.deep})`,
                color: COLORS.paper,
                borderRadius: '20px',
                padding: '1.5rem 2rem',
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                boxShadow: '0 10px 30px rgba(9,9,12,0.2)'
            }}>
                <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', color: COLORS.paper, background: 'rgba(180,83,84,0.6)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 800 }}>
                        <Activity size={12}/> Juego de Decisiones
                    </div>
                    <h1 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', margin: '0.5rem 0 0', fontWeight: 700 }}>
                        {scene.chapter}: {scene.title}
                    </h1>
                </div>
                <button onClick={restart} title="Reiniciar" style={{ background: 'rgba(240,236,229,0.05)', border: `1px solid rgba(240,236,229,0.2)`, color: COLORS.paper, borderRadius: '999px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                    <RotateCcw size={16} /> Reiniciar
                </button>
            </header>

            {/* Stats en tiempo real */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {Object.entries(STAT_META).map(([k, m]) => {
                    const v = stats[k] || 0;
                    if(v <= 0) return null; // Solo mostrar las que tengan puntos para más inmersión
                    const Icon = m.icon;
                    return (
                        <div key={k} style={{
                            background: '#fff',
                            border: `1px solid ${m.color}33`,
                            color: m.color,
                            borderRadius: '999px',
                            padding: '0.4rem 0.85rem',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}>
                            <Icon size={14} /> {m.label}: {v}
                        </div>
                    );
                })}
            </div>

            {/* Scene Body */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={sceneId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    ref={sceneRef}
                    style={{
                        background: '#fff',
                        border: '1px solid rgba(9,9,12,0.08)',
                        color: COLORS.base,
                        borderRadius: '24px',
                        padding: '2.5rem',
                        marginTop: '1.5rem',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
                    }}
                >
                    <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: COLORS.base, whiteSpace: 'pre-line', margin: 0 }}>
                        {scene.text}
                    </p>

                    {scene.info && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <button onClick={() => setShowInfo(s => !s)} style={{ background: 'transparent', border: `1px solid ${COLORS.deep}40`, color: COLORS.deep, borderRadius: '999px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                                <BookOpen size={16} /> {showInfo ? 'Ocultar bitácora histórica' : 'Abrir contexto histórico'}
                            </button>
                            <AnimatePresence>
                                {showInfo && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                                        <div style={{ marginTop: '0.8rem', padding: '1.25rem', background: '#f5fbff', borderLeft: `4px solid ${COLORS.deep}`, borderRadius: '0 12px 12px 0', fontSize: '0.95rem', color: COLORS.deep, lineHeight: 1.6, fontWeight: 500 }}>
                                            {scene.info}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    <div style={{ borderTop: `1px dashed rgba(9,9,12,0.1)`, margin: '2rem 0', }} />

                    <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: COLORS.base, opacity: 0.6, letterSpacing: '1px', marginBottom: '1rem', fontWeight: 800 }}>
                        ¿Qué hacés?
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {scene.choices.map((c, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ x: 6, background: COLORS.deep, color: COLORS.paper, borderColor: COLORS.deep }}
                                onClick={() => choose(c)}
                                style={{
                                    background: COLORS.paper,
                                    color: COLORS.base,
                                    border: `1px solid rgba(9,9,12,0.15)`,
                                    borderRadius: '16px',
                                    padding: '1.2rem',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    textAlign: 'left',
                                    fontFamily: 'inherit',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '1rem',
                                    transition: 'all 0.2s ease-out'
                                }}
                            >
                                <span style={{ flex: 1, lineHeight: 1.4 }}>{c.label}</span>
                                <div style={{ minWidth: '32px', height: '32px', borderRadius: '50%', background: 'rgba(9,9,12,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ChevronRight size={18} />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const generateReflection = (stats) => {
    const { empatia, miedo, info, conviccion, frio, hambre } = stats;

    if (empatia >= 7) {
        return {
            title: 'Caminaste con el corazón abierto',
            text: 'Tus decisiones priorizaron al compañero. La empatía es lo que sostiene la memoria de Malvinas. La guerra no fue solo un choque bélico: afectó a pibes como vos. Honrarlos es seguir cuidando esa memoria.'
        };
    }
    if (info >= 6 && conviccion >= 4) {
        return {
            title: 'Peleaste con conciencia social',
            text: 'Dudaste de los relatos oficiales y descubriste la dura verdad logística y mediática, pero sostuviste tu puesto. Hoy defender a Malvinas es exactamente eso: usar el pensamiento crítico y el conocimiento histórico.'
        };
    }
    if (frio >= 5 || hambre >= 3) {
        return {
            title: 'El flagelo del clima y la desidia',
            text: 'Sentiste en tu cuerpo virtual lo peor de Tumbledown. La inmensa mayoría del daño a los soldados argentinos no fue por fuego inglés, sino por el abandono logístico. Tu historia es un reclamo permanente.'
        };
    }
    if (miedo >= 6) {
        return {
            title: 'Miedo humano: la verdad de la guerra',
            text: 'Nadie va a una guerra valiente. Tu recorrido fue profundamente sincero. Reconocer el miedo, el frío extremo y la ansiedad bajo el fuego naval es la única manera realista de hablar de la trágica guerra de 1982.'
        };
    }
    
    return {
        title: '74 Días en la Inmensidad',
        text: 'Sobreviviste a las Islas. Tu paso por San Carlos / Tumbledown resume el caos táctico. Detrás del armamento existían personas con emociones complejas. Esta reflexión es un pequeño homenaje a quienes no volvieron.'
    };
};

export default MalvinasJuegoSerio;
