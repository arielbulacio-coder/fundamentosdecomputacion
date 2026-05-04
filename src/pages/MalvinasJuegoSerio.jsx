import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, Snowflake, Utensils, Mail, Compass, RotateCcw,
    AlertTriangle, BookOpen, ChevronRight
} from 'lucide-react';

const COLORS = {
    base: '#09090c',
    accent: '#b45354',
    sky: '#7b98ab',
    deep: '#35446a',
    paper: '#f0ece5'
};

// ─── ESTRUCTURA DEL JUEGO ─────────────────────────────────────────────
// El jugador encarna a Lautaro, un conscripto de 18 años de Buenos Aires,
// enviado a Malvinas en abril de 1982. Cada decisión tiene impacto en sus
// stats y revela información histórica/emocional real.
// ─────────────────────────────────────────────────────────────────────

const SCENES = {
    intro: {
        chapter: 'Prólogo',
        title: 'Otoño 1982 · Buenos Aires',
        text: 'Tenés 18 años. Acabás de empezar el Servicio Militar Obligatorio en Campo de Mayo. Una mañana, entre formaciones y limpieza, anuncian por altavoz: "Hoy todos los conscriptos forman para una misión especial". Te entregan un casco, un FAL y un boleto de avión hacia el sur.',
        choices: [
            { label: 'Subo al avión sin preguntar.', next: 'avion', effects: { miedo: +1, conviccion: +2 } },
            { label: 'Le pregunto al sargento qué está pasando.', next: 'pregunta_sgto', effects: { miedo: +0, conviccion: +1, info: +1 } },
            { label: 'Le pido a mi mamá que me venga a buscar.', next: 'mama', effects: { miedo: +2, conviccion: -1 } }
        ]
    },
    avion: {
        chapter: '1',
        title: 'Vuelo al sur',
        text: 'El avión Hércules está repleto. Los muchachos cantan "Vamos a ganar". Algunos nunca vieron nieve. Mirando por la ventanilla descubrís un océano que jamás imaginaste tan oscuro. Te entregan una hoja para escribir a tu familia.',
        choices: [
            { label: 'Escribo: "No te preocupes mami, vuelvo pronto."', next: 'islas', effects: { empatia: +2 } },
            { label: 'Escribo todo lo que siento, sin filtro.', next: 'islas', effects: { empatia: +3, miedo: +1 } },
            { label: 'Guardo la hoja en blanco. No sé qué decir.', next: 'islas', effects: { miedo: +1 } }
        ]
    },
    pregunta_sgto: {
        chapter: '1',
        title: 'En el cuartel',
        text: '"Vamos a recuperar las Malvinas, soldado. Los británicos ocupan nuestras islas desde 1833 y los vamos a echar." El sargento te mira fijo. "¿Algún problema?" Algunos compañeros agachan la cabeza. Otros aplauden.',
        info: 'En 1833 Gran Bretaña ocupó militarmente las islas, expulsando a las autoridades argentinas. La Constitución de 1994 declara la recuperación como "objetivo permanente e irrenunciable".',
        choices: [
            { label: 'Saludo y subo al avión.', next: 'avion', effects: { conviccion: +1, info: +1 } },
            { label: 'Pregunto si estamos preparados.', next: 'avion', effects: { miedo: +1, info: +1 } }
        ]
    },
    mama: {
        chapter: '1',
        title: 'Sin opción',
        text: 'No hay teléfono disponible. La cola al telefonito es de tres horas. Te formás igual. Tu mamá no se entera hasta días después por la radio. Te subís al avión con el corazón apretado.',
        choices: [
            { label: 'Continuar', next: 'avion', effects: {} }
        ]
    },
    islas: {
        chapter: '2',
        title: 'Llegada — Puerto Argentino',
        text: 'Bajás del avión y el viento te corta la cara. Hace 4°C y llueve casi horizontal. Todo huele a humedad y combustible. Un sargento divide al grupo: unos van a defender el aeropuerto, otros a las colinas. Te toca cavar un "pozo de zorro" sobre Mount Tumbledown.',
        info: 'Los pozos de zorro eran trincheras individuales cavadas en el suelo congelado. Sin abrigo adecuado, los conscriptos sufrieron pie de trinchera, hipotermia y desnutrición.',
        choices: [
            { label: 'Cavo profundo y rápido. Cuanto antes me cubra, mejor.', next: 'frio', effects: { conviccion: +2, frio: -1 } },
            { label: 'Ayudo primero al compañero que tiembla.', next: 'frio', effects: { empatia: +3, conviccion: +1 } },
            { label: 'Me siento agotado. Lo hago a media máquina.', next: 'frio', effects: { miedo: +1, frio: +2 } }
        ]
    },
    frio: {
        chapter: '3',
        title: 'La primera noche',
        text: 'A las 23:00 la temperatura es de -3°C. La carpa filtra agua. Tenés un pulóver de tu mamá debajo del uniforme. Tu compañero Ramón, de Misiones, nunca vio nieve en su vida. La radio del oficial dice: "Operación exitosa. Todo marcha según el plan".',
        choices: [
            { label: 'Le doy mi pulóver a Ramón.', next: 'amigo', effects: { empatia: +3, frio: +2 } },
            { label: 'Comparto un mate con Ramón.', next: 'amigo', effects: { empatia: +2 } },
            { label: 'Me duermo abrazado al fusil.', next: 'amigo', effects: { miedo: +1 } }
        ]
    },
    amigo: {
        chapter: '4',
        title: 'Un amigo del sur',
        text: 'En los días siguientes, Ramón se convierte en tu amigo. Aprendés que tiene una hermana enferma y una novia que lo espera. "Si volvemos vivos —te dice— te invito a mi pueblo. Hay un río donde se pesca dorado." Esa noche, a la luz de una vela, escuchan radio inglesa. Hablan en otro idioma pero el tono no es el mismo que en casa.',
        info: 'Las radios británicas (BBC) transmitían información militar real, mientras los medios oficiales argentinos repetían "Estamos ganando".',
        choices: [
            { label: 'Le creo a la radio inglesa.', next: 'realidad', effects: { conviccion: -1, info: +2 } },
            { label: 'Le creo a la radio argentina.', next: 'realidad', effects: { conviccion: +2, info: -1 } },
            { label: 'No entiendo nada. Apago.', next: 'realidad', effects: {} }
        ]
    },
    realidad: {
        chapter: '5',
        title: 'La comida',
        text: 'Llevás 12 días sin una comida caliente. La logística no llegó. Un compañero abre la lata de un oficial y come a escondidas. El sargento lo encuentra. Lo "estaquean" a la intemperie tres horas. Cuando lo levantan, no puede caminar.',
        info: 'Los "estaqueamientos" están denunciados como crímenes de lesa humanidad por veteranos sobrevivientes. Algunos oficiales castigaban así a soldados hambrientos.',
        choices: [
            { label: 'Voy a verlo cuando los oficiales se duermen.', next: 'medios', effects: { empatia: +3, miedo: +1 } },
            { label: 'Bajo la mirada y obedezco.', next: 'medios', effects: { miedo: +2 } },
            { label: 'Me planto frente al sargento.', next: 'medios', effects: { conviccion: +3, miedo: +2 } }
        ]
    },
    medios: {
        chapter: '6',
        title: 'La carta de mamá',
        text: 'Llega correo después de tres semanas. Tu mamá te escribió. "Hijo, en la TV dicen que vas ganando. Estoy orgullosa. Te mando chocolate y un escapulario. Volvé pronto." Adentro hay una foto de tu perro. Atrás, ella escribió: "Te esperamos para la pizza del sábado".',
        choices: [
            { label: 'Lloro. Sin disimular.', next: 'final_ataque', effects: { empatia: +3 } },
            { label: 'Guardo todo en el bolsillo del corazón.', next: 'final_ataque', effects: { empatia: +2 } },
            { label: 'Le respondo: "Mami, no es como dicen".', next: 'final_ataque', effects: { empatia: +2, info: +2 } }
        ]
    },
    final_ataque: {
        chapter: '7',
        title: 'La noche del 13 de junio',
        text: 'Los británicos avanzan sobre Tumbledown. Ramón está a tu lado. El frío, el hambre y la falta de balas son insostenibles. Una bengala ilumina el cielo. Escuchás morteros muy cerca. Tu sargento grita: "Aguantar".',
        choices: [
            { label: 'Aguanto la posición.', next: 'rendicion', effects: { conviccion: +3, miedo: +2 } },
            { label: 'Cubro a Ramón con mi cuerpo.', next: 'rendicion', effects: { empatia: +5 } },
            { label: 'Disparo todo lo que tengo.', next: 'rendicion', effects: { conviccion: +1, miedo: +1 } }
        ]
    },
    rendicion: {
        chapter: '8',
        title: '14 de junio · Rendición',
        text: 'Despertás con el sol gris. El silencio es raro: ya no se escuchan disparos. Llega la orden por la radio. El General Menéndez firmó la rendición. Te formás en columna junto a miles de compañeros. Tirás el FAL al barro. Caminás hacia el puerto, prisionero. Estás vivo. Ramón también. La guerra duró 74 días.',
        info: 'El 14 de junio de 1982 el general Mario Benjamín Menéndez firmó la rendición ante las fuerzas británicas. Murieron 649 argentinos. Cientos de veteranos se suicidaron en los años posteriores por falta de contención psicológica del Estado.',
        choices: [
            { label: 'Continuar al regreso →', next: 'regreso', effects: {} }
        ]
    },
    regreso: {
        chapter: 'Epílogo',
        title: 'Volver',
        text: 'Te bajan de un barco en Puerto Madryn de noche y a escondidas. El gobierno militar prefirió no hacer un recibimiento. Tu mamá te espera con la pizza del sábado de hace tres meses, fría. Nadie te pregunta. La gente cruza la calle cuando ve el uniforme.\n\nDurante años no podrás hablar. Ramón sí: en su pueblo lo reciben con un asado. Te llama todos los meses. Cuando lo escuchás, lloran los dos sin decir nada.',
        info: 'El "desmalvinizar" fue una política de silencio que llevó al ostracismo a los veteranos. Recién en 2007 se reconoció oficialmente el papel del Equipo Argentino de Antropología Forense en identificar a los caídos del Cementerio de Darwin.',
        choices: [
            { label: 'Ver mi recorrido emocional →', next: 'final', effects: {} }
        ]
    }
};

const initialStats = {
    miedo: 0,
    conviccion: 0,
    empatia: 0,
    info: 0,
    frio: 0
};

const STAT_META = {
    miedo: { label: 'Miedo', color: '#9c27b0', icon: AlertTriangle },
    conviccion: { label: 'Convicción', color: COLORS.accent, icon: Compass },
    empatia: { label: 'Empatía', color: '#43a047', icon: Heart },
    info: { label: 'Información', color: COLORS.sky, icon: BookOpen },
    frio: { label: 'Frío sufrido', color: '#1565c0', icon: Snowflake }
};

const MalvinasJuegoSerio = () => {
    const [sceneId, setSceneId] = useState('intro');
    const [stats, setStats] = useState(initialStats);
    const [path, setPath] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [finished, setFinished] = useState(false);
    const sceneRef = useRef(null);

    // scroll to top of card when scene changes
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
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem 4rem', fontFamily: '"Public Sans", sans-serif' }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');`}</style>
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    style={{
                        background: `linear-gradient(135deg, ${COLORS.base}, ${COLORS.deep})`,
                        color: COLORS.paper,
                        borderRadius: '22px',
                        padding: '2.5rem 1.5rem',
                        marginTop: '1rem',
                        textAlign: 'center'
                    }}
                >
                    <Heart size={48} color={COLORS.accent} />
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '4px', color: COLORS.accent, fontWeight: 800, marginTop: '0.5rem' }}>Tu recorrido</div>
                    <h1 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '0.5rem 0' }}>
                        {reflection.title}
                    </h1>
                    <p style={{ maxWidth: '650px', margin: '1rem auto', opacity: 0.95, lineHeight: 1.7, fontSize: '1.05rem' }}>
                        {reflection.text}
                    </p>
                </motion.div>

                <section style={{ background: COLORS.paper, color: COLORS.base, borderRadius: '18px', padding: '1.75rem', marginTop: '1.5rem' }}>
                    <h2 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', color: COLORS.deep, marginTop: 0 }}>Tus marcas internas</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
                        {Object.entries(STAT_META).map(([k, m]) => {
                            const v = stats[k] || 0;
                            const max = 12;
                            const pct = Math.min(100, Math.max(0, (v / max) * 100));
                            const Icon = m.icon;
                            return (
                                <div key={k} style={{ background: '#fff', border: `1px solid ${m.color}33`, borderRadius: '12px', padding: '0.85rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: m.color, fontWeight: 800, fontSize: '0.9rem' }}>
                                        <Icon size={16} /> {m.label}
                                    </div>
                                    <div style={{ marginTop: '0.4rem', height: '8px', background: '#eef0f3', borderRadius: '999px', overflow: 'hidden' }}>
                                        <div style={{ width: `${pct}%`, height: '100%', background: m.color, transition: 'width 0.4s' }} />
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: '1.4rem', marginTop: '0.3rem' }}>{v}</div>
                                </div>
                            );
                        })}
                    </div>

                    <h2 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', color: COLORS.deep, marginTop: '2rem' }}>Recorrido de decisiones</h2>
                    <ol style={{ paddingLeft: '1.25rem', lineHeight: 1.7 }}>
                        {path.map((p, i) => (
                            <li key={i} style={{ marginBottom: '0.4rem' }}>
                                <span style={{ color: COLORS.accent, fontWeight: 700 }}>{SCENES[p.sceneId]?.title || p.sceneId}:</span> {p.label}
                            </li>
                        ))}
                    </ol>

                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(53,68,106,0.07)', borderRadius: '12px', borderLeft: `4px solid ${COLORS.deep}` }}>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: COLORS.accent, fontWeight: 800 }}>Para reflexionar</div>
                        <p style={{ margin: '0.4rem 0 0', lineHeight: 1.6 }}>
                            Este juego es una ficción didáctica basada en testimonios reales. Cada personaje representa cientos de jóvenes que vivieron la guerra en carne propia. Recordarlos es honrarlos. Hablar de Malvinas es construir país.
                        </p>
                    </div>

                    <button onClick={restart} style={{ marginTop: '1.5rem', padding: '0.85rem 1.25rem', background: COLORS.accent, color: COLORS.paper, border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <RotateCcw size={16} /> Volver a empezar
                    </button>
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
                padding: '1.25rem 1.5rem',
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                <div>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '3px', color: COLORS.accent, fontWeight: 800 }}>
                        Juego serio · Malvinas en primera persona
                    </div>
                    <h1 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', margin: '0.25rem 0 0', fontWeight: 700 }}>
                        Capítulo {scene.chapter}: {scene.title}
                    </h1>
                </div>
                <button onClick={restart} title="Reiniciar" style={{ background: 'rgba(240,236,229,0.1)', border: `1px solid ${COLORS.paper}`, color: COLORS.paper, borderRadius: '999px', padding: '0.4rem 0.85rem', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <RotateCcw size={14} /> Reiniciar
                </button>
            </header>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                {Object.entries(STAT_META).map(([k, m]) => {
                    const v = stats[k] || 0;
                    const Icon = m.icon;
                    return (
                        <div key={k} style={{
                            background: '#fff',
                            border: `1px solid ${m.color}55`,
                            color: m.color,
                            borderRadius: '999px',
                            padding: '0.3rem 0.65rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                        }}>
                            <Icon size={12} /> {m.label}: {v}
                        </div>
                    );
                })}
            </div>

            {/* Scene */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={sceneId}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    ref={sceneRef}
                    style={{
                        background: COLORS.paper,
                        color: COLORS.base,
                        borderRadius: '20px',
                        padding: '2rem 1.5rem',
                        marginTop: '0.75rem'
                    }}
                >
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: COLORS.base, whiteSpace: 'pre-line', margin: 0, fontFamily: '"Public Sans", sans-serif' }}>
                        {scene.text}
                    </p>

                    {scene.info && (
                        <div style={{ marginTop: '1rem' }}>
                            <button onClick={() => setShowInfo(s => !s)} style={{ background: 'rgba(53,68,106,0.1)', border: `1px dashed ${COLORS.deep}`, color: COLORS.deep, borderRadius: '8px', padding: '0.4rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                                <BookOpen size={14} /> {showInfo ? 'Ocultar' : 'Ver'} contexto histórico
                            </button>
                            {showInfo && (
                                <div style={{ marginTop: '0.6rem', padding: '0.85rem 1rem', background: 'rgba(53,68,106,0.08)', borderLeft: `3px solid ${COLORS.deep}`, borderRadius: '8px', fontSize: '0.9rem', color: COLORS.base, lineHeight: 1.6 }}>
                                    {scene.info}
                                </div>
                            )}
                        </div>
                    )}

                    <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {scene.choices.map((c, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ x: 4, background: COLORS.deep, color: COLORS.paper }}
                                onClick={() => choose(c)}
                                style={{
                                    background: '#fff',
                                    color: COLORS.base,
                                    border: `2px solid ${COLORS.deep}`,
                                    borderRadius: '12px',
                                    padding: '0.85rem 1rem',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    textAlign: 'left',
                                    fontFamily: 'inherit',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '0.5rem'
                                }}
                            >
                                <span>{c.label}</span>
                                <ChevronRight size={16} />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const generateReflection = (stats) => {
    const { empatia, miedo, info, conviccion } = stats;

    if (empatia >= 10) {
        return {
            title: 'Caminaste con el corazón abierto',
            text: 'Tus decisiones priorizaron al otro: al amigo del sur, a la madre que escribe, al compañero que tiembla. Esa empatía es lo que sostiene la memoria de Malvinas. La guerra no fue de banderas: fue de pibes. Honrarlos es seguir hablando de ellos.'
        };
    }
    if (info >= 5 && conviccion >= 5) {
        return {
            title: 'Pensaste con cabeza fría y patria caliente',
            text: 'Buscaste información, dudaste de los relatos oficiales y sostuviste tu convicción sin dejar de mirar críticamente. Esa es la actitud que necesita la causa Malvinas hoy: defender la soberanía con conocimiento.'
        };
    }
    if (miedo >= 5) {
        return {
            title: 'El miedo te acompañó · y eso también es honesto',
            text: 'Tener miedo en una guerra es lo más humano del mundo. Los pibes de Malvinas lo tuvieron. Que vos lo hayas reconocido es el primer paso para entenderlos. Nadie va a la guerra valiente: la valentía se construye al lado de los compañeros.'
        };
    }
    return {
        title: 'Cruzaste el sur en una pieza',
        text: 'Salir vivo no es ganar. Volver y poder contarlo, sí. Que esta experiencia de juego haya servido para que recuerdes: detrás de cada caído hay una madre, un perro, una pizza del sábado. Recordarlos es honrarlos.'
    };
};

export default MalvinasJuegoSerio;
