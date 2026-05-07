import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, Snowflake, Utensils, Compass, RotateCcw,
    AlertTriangle, BookOpen, ChevronRight, Activity, HeartPulse
} from 'lucide-react';

const COLORS = {
    base: '#09090c',
    accent: '#b45354',
    sky: '#7b98ab',
    deep: '#35446a',
    paper: '#f0ece5'
};

// ─── ILUSTRACIONES SVG (fallback cuando una escena no tiene .img) ────
// Cada `kind` es una composición simple, evocativa, en la paleta del moodboard.
const SceneIllustration = ({ kind = 'default' }) => {
    const W = 800, H = 280;
    const baseProps = {
        viewBox: `0 0 ${W} ${H}`,
        preserveAspectRatio: 'xMidYMid slice',
        style: { width: '100%', height: '100%', display: 'block' }
    };

    // Fondo común con grano sutil
    const Background = ({ from = COLORS.base, to = COLORS.deep }) => (
        <>
            <defs>
                <linearGradient id={`bg-${kind}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={from} />
                    <stop offset="100%" stopColor={to} />
                </linearGradient>
                <pattern id={`grain-${kind}`} width="3" height="3" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.4" fill={COLORS.paper} opacity="0.04" />
                </pattern>
            </defs>
            <rect x="0" y="0" width={W} height={H} fill={`url(#bg-${kind})`} />
            <rect x="0" y="0" width={W} height={H} fill={`url(#grain-${kind})`} />
        </>
    );

    switch (kind) {
        case 'home': // Casa familia, mesa con dos sillas
            return (
                <svg {...baseProps}>
                    <Background from="#1a1f2e" to={COLORS.deep} />
                    {/* ventana al fondo con luna */}
                    <rect x="540" y="40" width="180" height="140" fill={COLORS.base} stroke={COLORS.sky} strokeWidth="2" opacity="0.6" />
                    <line x1="630" y1="40" x2="630" y2="180" stroke={COLORS.sky} strokeWidth="1" opacity="0.4" />
                    <line x1="540" y1="110" x2="720" y2="110" stroke={COLORS.sky} strokeWidth="1" opacity="0.4" />
                    <circle cx="600" cy="80" r="22" fill={COLORS.paper} opacity="0.7" />
                    {/* mesa */}
                    <rect x="180" y="180" width="380" height="14" fill={COLORS.accent} opacity="0.5" />
                    <rect x="200" y="194" width="8" height="60" fill={COLORS.accent} opacity="0.4" />
                    <rect x="540" y="194" width="8" height="60" fill={COLORS.accent} opacity="0.4" />
                    {/* dos platos */}
                    <ellipse cx="280" cy="180" rx="40" ry="8" fill={COLORS.paper} opacity="0.85" />
                    <ellipse cx="460" cy="180" rx="40" ry="8" fill={COLORS.paper} opacity="0.85" />
                    {/* lámpara colgante */}
                    <line x1="370" y1="0" x2="370" y2="80" stroke={COLORS.sky} strokeWidth="1" opacity="0.4" />
                    <ellipse cx="370" cy="90" rx="40" ry="14" fill="#ffd28a" opacity="0.3" />
                    <ellipse cx="370" cy="86" rx="20" ry="6" fill="#ffd28a" />
                </svg>
            );

        case 'plane': // Hércules y nubes
            return (
                <svg {...baseProps}>
                    <Background from={COLORS.base} to={COLORS.deep} />
                    {/* nubes */}
                    {[100, 300, 600].map((x, i) => (
                        <ellipse key={i} cx={x} cy={80 + i * 30} rx={70 + i * 20} ry={14} fill={COLORS.paper} opacity={0.08 + i * 0.04} />
                    ))}
                    {/* Hércules */}
                    <g transform="translate(360 130)">
                        <ellipse cx="0" cy="0" rx="120" ry="20" fill={COLORS.paper} opacity="0.85" />
                        <rect x="-30" y="-32" width="50" height="20" fill={COLORS.paper} opacity="0.85" rx="4" />
                        <polygon points="-120,0 -160,-25 -120,-15" fill={COLORS.paper} opacity="0.7" />
                        <polygon points="120,0 145,-15 120,-12" fill={COLORS.paper} opacity="0.85" />
                        <rect x="-40" y="-15" width="100" height="6" fill={COLORS.deep} opacity="0.5" />
                        {/* hélices */}
                        {[-50, -10, 30, 70].map(x => (
                            <circle key={x} cx={x} cy="0" r="4" fill={COLORS.accent} />
                        ))}
                    </g>
                    <text x="60" y="50" fill={COLORS.paper} fontSize="14" fontStyle="italic" opacity="0.5" fontFamily="Georgia">Atlántico Sur — abril 1982</text>
                </svg>
            );

        case 'arrival': // Puerto Argentino, montañas y bandera
            return (
                <svg {...baseProps}>
                    <Background from="#1d2538" to={COLORS.sky} />
                    {/* niebla baja */}
                    <ellipse cx="400" cy="220" rx="500" ry="50" fill={COLORS.paper} opacity="0.18" />
                    {/* montañas */}
                    <polygon points="0,200 200,100 380,180 600,80 800,200 800,280 0,280" fill={COLORS.base} opacity="0.85" />
                    <polygon points="0,230 250,140 500,200 800,150 800,280 0,280" fill={COLORS.deep} opacity="0.7" />
                    {/* bandera argentina */}
                    <g transform="translate(620 80)">
                        <rect x="0" y="0" width="3" height="120" fill={COLORS.paper} />
                        <rect x="3" y="2" width="80" height="14" fill="#75aadb" />
                        <rect x="3" y="16" width="80" height="14" fill={COLORS.paper} />
                        <rect x="3" y="30" width="80" height="14" fill="#75aadb" />
                    </g>
                </svg>
            );

        case 'cold': // Trinchera + nieve
            return (
                <svg {...baseProps}>
                    <Background from={COLORS.base} to="#1a2b3a" />
                    {/* Copos */}
                    {Array.from({ length: 30 }).map((_, i) => (
                        <circle
                            key={i}
                            cx={Math.random() * W}
                            cy={Math.random() * H}
                            r={Math.random() * 2 + 0.5}
                            fill={COLORS.paper}
                            opacity={Math.random() * 0.7 + 0.3}
                        />
                    ))}
                    {/* trinchera silueta */}
                    <path d={`M 0 ${H} L 150 200 L 320 220 L 480 195 L 660 215 L 800 200 L 800 ${H} Z`} fill={COLORS.base} />
                    {/* soldado en pozo */}
                    <g transform="translate(380 150)">
                        <ellipse cx="0" cy="60" rx="34" ry="10" fill={COLORS.base} opacity="0.6" />
                        <rect x="-12" y="20" width="24" height="36" fill={COLORS.deep} opacity="0.85" />
                        <circle cx="0" cy="14" r="11" fill={COLORS.deep} opacity="0.85" />
                        {/* casco */}
                        <path d="M -13 12 Q 0 -2 13 12 Z" fill={COLORS.base} />
                    </g>
                    <text x="60" y="50" fill={COLORS.sky} fontSize="13" opacity="0.6" fontFamily="Georgia" fontStyle="italic">Mount Tumbledown · -2°C</text>
                </svg>
            );

        case 'friend': // Dos siluetas hombro con hombro
            return (
                <svg {...baseProps}>
                    <Background from={COLORS.deep} to="#1f2940" />
                    {/* fogata simulada */}
                    <ellipse cx="400" cy="240" rx="60" ry="10" fill={COLORS.accent} opacity="0.4" />
                    <ellipse cx="400" cy="225" rx="20" ry="14" fill="#ff8a4a" opacity="0.9" />
                    <ellipse cx="400" cy="218" rx="10" ry="10" fill="#ffd28a" />
                    {/* dos soldados */}
                    {[330, 470].map((cx, i) => (
                        <g key={i} transform={`translate(${cx} 130)`}>
                            <rect x="-22" y="30" width="44" height="60" fill={COLORS.base} />
                            <circle cx="0" cy="20" r="16" fill={COLORS.base} />
                            <path d="M -18 18 Q 0 0 18 18 Z" fill={COLORS.accent} opacity="0.85" />
                        </g>
                    ))}
                    {/* mate compartido */}
                    <ellipse cx="400" cy="170" rx="6" ry="3" fill={COLORS.paper} opacity="0.7" />
                </svg>
            );

        case 'radio': // Radio antigua con ondas
            return (
                <svg {...baseProps}>
                    <Background from={COLORS.base} to={COLORS.deep} />
                    {[60, 90, 120, 150].map((r, i) => (
                        <circle key={i} cx={400} cy={140} r={r} fill="none" stroke={COLORS.accent} strokeWidth="1.5" opacity={0.7 - i * 0.15} />
                    ))}
                    <g transform="translate(370 110)">
                        <rect x="0" y="0" width="60" height="60" rx="6" fill="#3a2818" stroke={COLORS.accent} strokeWidth="2" />
                        <rect x="6" y="8" width="48" height="22" fill="#1a1208" stroke="#7c5e3e" strokeWidth="1" />
                        <text x="30" y="24" textAnchor="middle" fill={COLORS.accent} fontSize="9" fontFamily="monospace">BBC 9410</text>
                        <circle cx="14" cy="44" r="4" fill="#7c5e3e" />
                        <circle cx="46" cy="44" r="4" fill="#7c5e3e" />
                        <line x1="30" y1="-15" x2="30" y2="0" stroke={COLORS.paper} strokeWidth="1" />
                        <circle cx="30" cy="-15" r="2" fill={COLORS.paper} />
                    </g>
                </svg>
            );

        case 'hunger': // Plato vacío + galleta
            return (
                <svg {...baseProps}>
                    <Background from={COLORS.base} to="#1f1a17" />
                    <ellipse cx="400" cy="180" rx="140" ry="22" fill={COLORS.paper} opacity="0.85" />
                    <ellipse cx="400" cy="178" rx="120" ry="14" fill={COLORS.base} opacity="0.4" />
                    {/* galleta soldada */}
                    <rect x="370" y="160" width="55" height="14" rx="2" fill="#c0a880" />
                    {[378, 388, 398, 408, 418].map(x => (
                        <circle key={x} cx={x} cy="167" r="1" fill="#7c5e3e" />
                    ))}
                    <text x="400" y="80" textAnchor="middle" fill={COLORS.accent} fontSize="14" opacity="0.6" fontStyle="italic" fontFamily="Georgia">Día 9 sin pan caliente</text>
                </svg>
            );

        case 'punishment': // Estaqueamiento — figura abierta en cruz sobre tierra fría
            return (
                <svg {...baseProps}>
                    <Background from="#0a0a0e" to="#1a1d24" />
                    {[100, 250, 550, 700].map((x, i) => (
                        <circle key={i} cx={x} cy={Math.random() * H} r={1.5} fill={COLORS.paper} opacity="0.4" />
                    ))}
                    {/* tierra */}
                    <ellipse cx="400" cy="240" rx="380" ry="40" fill={COLORS.deep} opacity="0.4" />
                    {/* figura tirada en cruz */}
                    <g transform="translate(400 200)" opacity="0.85">
                        <line x1="-90" y1="0" x2="90" y2="0" stroke={COLORS.accent} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                        <line x1="0" y1="-30" x2="0" y2="30" stroke={COLORS.accent} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                        <rect x="-12" y="-22" width="24" height="48" fill={COLORS.base} />
                        <circle cx="0" cy="-30" r="9" fill={COLORS.base} />
                        <line x1="-90" y1="0" x2="-12" y2="0" stroke={COLORS.base} strokeWidth="6" />
                        <line x1="12" y1="0" x2="90" y2="0" stroke={COLORS.base} strokeWidth="6" />
                        {/* estacas */}
                        {[-90, 90, 0, 0].map((x, i) => (
                            <line key={i} x1={x} y1={i < 2 ? -6 : i === 2 ? -36 : 32} x2={x} y2={i < 2 ? 8 : i === 2 ? -22 : 46} stroke="#7c5e3e" strokeWidth="2" />
                        ))}
                    </g>
                </svg>
            );

        case 'naval_fire': // Mar oscuro con flash de cañonazo
            return (
                <svg {...baseProps}>
                    <Background from={COLORS.base} to="#0a1828" />
                    {/* mar */}
                    <path d={`M 0 200 Q 200 190 400 200 T 800 200 L 800 ${H} L 0 ${H} Z`} fill={COLORS.deep} opacity="0.85" />
                    {/* horizonte */}
                    <line x1="0" y1="200" x2="800" y2="200" stroke={COLORS.sky} strokeWidth="1" opacity="0.5" />
                    {/* barco lejano */}
                    <g transform="translate(180 180)">
                        <rect x="0" y="0" width="60" height="14" fill={COLORS.base} />
                        <polygon points="0,0 -8,0 0,-4" fill={COLORS.base} />
                        <rect x="20" y="-18" width="6" height="18" fill={COLORS.base} />
                        <rect x="36" y="-12" width="4" height="12" fill={COLORS.base} />
                    </g>
                    {/* fogonazo */}
                    <circle cx="240" cy="170" r="50" fill={COLORS.accent} opacity="0.4" />
                    <circle cx="240" cy="170" r="22" fill="#ffd28a" />
                    <circle cx="240" cy="170" r="8" fill={COLORS.paper} />
                    {/* trayectoria */}
                    <path d="M 240 170 Q 460 60 660 110" stroke={COLORS.accent} strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.7" />
                </svg>
            );

        case 'hospital': // Cruz roja sobre carpa de campaña
            return (
                <svg {...baseProps}>
                    <Background from="#1a1f2a" to={COLORS.deep} />
                    {/* carpa */}
                    <polygon points="200,200 600,200 540,90 260,90" fill={COLORS.paper} opacity="0.85" />
                    <polygon points="200,200 260,90 240,90 180,200" fill={COLORS.paper} opacity="0.6" />
                    <line x1="200" y1="200" x2="600" y2="200" stroke={COLORS.base} strokeWidth="2" />
                    {/* cruz */}
                    <rect x="380" y="120" width="40" height="14" fill={COLORS.accent} />
                    <rect x="392" y="105" width="14" height="44" fill={COLORS.accent} />
                    <text x="400" y="240" textAnchor="middle" fill={COLORS.paper} fontSize="13" fontFamily="Georgia" fontStyle="italic" opacity="0.7">Hospital de campaña — Puerto Argentino</text>
                </svg>
            );

        case 'media': // Tapa de revista "ESTAMOS GANANDO"
            return (
                <svg {...baseProps}>
                    <Background from="#1a1d28" to={COLORS.deep} />
                    {/* revista inclinada */}
                    <g transform="translate(400 140) rotate(-8)">
                        <rect x="-90" y="-110" width="180" height="220" fill={COLORS.paper} stroke={COLORS.base} strokeWidth="2" />
                        <rect x="-90" y="-110" width="180" height="32" fill={COLORS.accent} />
                        <text x="0" y="-90" textAnchor="middle" fill={COLORS.paper} fontSize="16" fontWeight="900" fontFamily="Georgia">GENTE</text>
                        <text x="0" y="-50" textAnchor="middle" fill={COLORS.base} fontSize="14" fontWeight="800" fontFamily="Arial">ESTAMOS</text>
                        <text x="0" y="-30" textAnchor="middle" fill={COLORS.accent} fontSize="20" fontWeight="900" fontFamily="Arial">GANANDO</text>
                        <ellipse cx="0" cy="40" rx="50" ry="40" fill={COLORS.sky} opacity="0.4" />
                        <text x="0" y="100" textAnchor="middle" fill={COLORS.base} fontSize="9">— el sueño de un país —</text>
                    </g>
                </svg>
            );

        case 'battle': // Cerro de noche con bengalas
            return (
                <svg {...baseProps}>
                    <Background from="#0a0a14" to="#1a1f2e" />
                    {/* bengalas */}
                    {[150, 380, 600].map((cx, i) => (
                        <g key={i}>
                            <circle cx={cx} cy={50 + i * 12} r="40" fill="#ffd28a" opacity="0.18" />
                            <circle cx={cx} cy={50 + i * 12} r="14" fill="#ffd28a" opacity="0.7" />
                            <circle cx={cx} cy={50 + i * 12} r="4" fill={COLORS.paper} />
                        </g>
                    ))}
                    {/* cerro */}
                    <polygon points="0,280 250,160 480,200 700,140 800,210 800,280" fill={COLORS.base} />
                    <polygon points="0,280 100,210 250,260 480,250 800,280" fill={COLORS.deep} opacity="0.6" />
                    {/* destellos de fuego */}
                    {[180, 320, 540, 680].map((x, i) => (
                        <circle key={i} cx={x} cy={170 + (i * 7) % 30} r="3" fill={COLORS.accent} />
                    ))}
                </svg>
            );

        case 'surrender': // Bandera blanca + fusil quebrado
            return (
                <svg {...baseProps}>
                    <Background from="#1a1f2e" to={COLORS.base} />
                    {/* humo */}
                    <ellipse cx="400" cy="220" rx="500" ry="60" fill={COLORS.paper} opacity="0.1" />
                    {/* mástil con bandera blanca */}
                    <line x1="500" y1="40" x2="500" y2="220" stroke={COLORS.paper} strokeWidth="2" />
                    <path d="M 500 50 Q 580 60 600 90 Q 580 100 500 90 Z" fill={COLORS.paper} opacity="0.85" />
                    {/* fusil quebrado en el barro */}
                    <g transform="translate(280 220) rotate(-25)">
                        <rect x="0" y="-3" width="80" height="6" fill={COLORS.base} />
                        <rect x="80" y="-2" width="40" height="4" fill={COLORS.base} />
                        <rect x="115" y="-6" width="20" height="14" fill={COLORS.base} />
                        {/* fractura */}
                        <line x1="60" y1="-3" x2="65" y2="3" stroke={COLORS.accent} strokeWidth="2" />
                    </g>
                    <text x="400" y="260" textAnchor="middle" fill={COLORS.paper} fontSize="14" fontStyle="italic" fontFamily="Georgia" opacity="0.85">14 de junio de 1982</text>
                </svg>
            );

        case 'prisoner': // Alambre de púas + sello
            return (
                <svg {...baseProps}>
                    <Background from={COLORS.base} to="#1a1f24" />
                    {/* alambres */}
                    {[80, 130, 180].map((y, i) => (
                        <g key={i}>
                            <line x1="0" y1={y} x2="800" y2={y - 8} stroke={COLORS.paper} strokeWidth="1.5" opacity="0.7" />
                            {Array.from({ length: 12 }).map((_, j) => (
                                <g key={j} transform={`translate(${60 + j * 60} ${y - j * 0.7})`}>
                                    <line x1="-8" y1="-8" x2="8" y2="8" stroke={COLORS.paper} strokeWidth="1" opacity="0.6" />
                                    <line x1="-8" y1="8" x2="8" y2="-8" stroke={COLORS.paper} strokeWidth="1" opacity="0.6" />
                                </g>
                            ))}
                        </g>
                    ))}
                    {/* sello */}
                    <g transform="translate(620 220) rotate(-12)">
                        <rect x="-70" y="-22" width="140" height="44" fill="none" stroke={COLORS.accent} strokeWidth="3" />
                        <text x="0" y="6" textAnchor="middle" fill={COLORS.accent} fontWeight="900" fontFamily="Georgia" fontSize="18">PW · 1982</text>
                    </g>
                </svg>
            );

        case 'return': // Colectivo en ruta
            return (
                <svg {...baseProps}>
                    <Background from={COLORS.deep} to="#1a1f28" />
                    {/* ruta */}
                    <path d="M 0 220 Q 400 230 800 220" stroke={COLORS.paper} strokeWidth="2" fill="none" />
                    <path d="M 80 230 L 120 230 M 200 230 L 240 230 M 320 230 L 360 230 M 440 230 L 480 230 M 560 230 L 600 230 M 680 230 L 720 230" stroke={COLORS.paper} strokeWidth="3" />
                    {/* colectivo */}
                    <g transform="translate(380 170)">
                        <rect x="-50" y="-20" width="100" height="40" rx="6" fill={COLORS.accent} />
                        <rect x="-46" y="-14" width="20" height="14" fill={COLORS.sky} opacity="0.7" />
                        <rect x="-22" y="-14" width="20" height="14" fill={COLORS.sky} opacity="0.7" />
                        <rect x="2" y="-14" width="20" height="14" fill={COLORS.sky} opacity="0.7" />
                        <rect x="26" y="-14" width="20" height="14" fill={COLORS.sky} opacity="0.7" />
                        <circle cx="-30" cy="22" r="8" fill={COLORS.base} />
                        <circle cx="30" cy="22" r="8" fill={COLORS.base} />
                    </g>
                    {/* luna */}
                    <circle cx="650" cy="60" r="20" fill={COLORS.paper} opacity="0.5" />
                </svg>
            );

        case 'reunion': // Encuentro de veteranos años después
            return (
                <svg {...baseProps}>
                    <Background from={COLORS.paper} to="#d4cdbf" />
                    {/* dos siluetas dándose la mano */}
                    {[280, 520].map((cx, i) => (
                        <g key={i} transform={`translate(${cx} 100)`}>
                            <rect x="-30" y="40" width="60" height="100" fill={COLORS.deep} />
                            <circle cx="0" cy="25" r="22" fill={COLORS.base} />
                            <line x1={i === 0 ? 30 : -30} y1="80" x2="400" y2="120" stroke={COLORS.base} strokeWidth="3" />
                        </g>
                    ))}
                    {/* manos dándose */}
                    <circle cx="400" cy="220" r="18" fill={COLORS.accent} />
                    <text x="400" y="260" textAnchor="middle" fill={COLORS.deep} fontSize="14" fontStyle="italic" fontFamily="Georgia">"Volveríamos a ese frío si fuera a abrazarte."</text>
                </svg>
            );

        case 'mail': // Carta y sobre
            return (
                <svg {...baseProps}>
                    <Background from={COLORS.base} to="#1f1a17" />
                    <g transform="translate(400 140) rotate(-6)">
                        {/* sobre */}
                        <rect x="-110" y="-70" width="220" height="140" fill={COLORS.paper} stroke={COLORS.base} strokeWidth="2" />
                        <polygon points="-110,-70 0,0 110,-70" fill="#dccdb5" />
                        <line x1="-110" y1="70" x2="0" y2="0" stroke={COLORS.base} strokeWidth="1.5" />
                        <line x1="110" y1="70" x2="0" y2="0" stroke={COLORS.base} strokeWidth="1.5" />
                        {/* sello */}
                        <rect x="60" y="-58" width="38" height="44" fill={COLORS.accent} />
                        <text x="79" y="-30" textAnchor="middle" fill={COLORS.paper} fontSize="9" fontWeight="900">CORREO</text>
                        {/* trazo de tinta */}
                        <text x="-90" y="-30" fill={COLORS.deep} fontSize="13" fontStyle="italic" fontFamily="Georgia">Para mi hijo</text>
                    </g>
                </svg>
            );

        default: // genérico — silueta + escarapela
            return (
                <svg {...baseProps}>
                    <Background />
                    <circle cx="400" cy="140" r="80" fill={COLORS.accent} opacity="0.3" />
                    <circle cx="400" cy="140" r="50" fill={COLORS.sky} opacity="0.5" />
                    <circle cx="400" cy="140" r="20" fill={COLORS.paper} />
                </svg>
            );
    }
};

// ─── ESTRUCTURA DEL JUEGO ─────────────────────────────────────────────
const SCENES = {
    intro: {
        img: '/malvinas_hero.png',
        chapter: 'Prólogo',
        title: 'Otoño 1982 · Buenos Aires',
        text: 'Tenés 18 años. Acabás de empezar el Servicio Militar Obligatorio en Campo de Mayo. Una mañana de abril, entre formaciones y limpieza de cuarteles, anuncian por altavoz: "Hoy todos los conscriptos forman para una misión especial". Te entregan un casco verde, un fusil FAL viejo, y un boleto de avión hacia el sur.\n\nEl sargento te grita el apellido. Hay nervios pero también orgullo en el aire. Algunos compañeros se ríen para no llorar. Tu cuerpo no termina de entender qué está pasando.',
        choices: [
            { label: 'Subo al avión sin preguntar. Cumplo mi deber.', next: 'casa_familia', effects: { miedo: +1, conviccion: +2 } },
            { label: 'Le pregunto al sargento a dónde vamos exactamente.', next: 'pregunta_sgto', effects: { miedo: 0, conviccion: +1, info: +2 } },
            { label: 'Intento avisarle a mi mamá antes de partir.', next: 'casa_familia', effects: { miedo: +2, empatia: +1, conviccion: -1 } }
        ]
    },

    casa_familia: {
        kind: 'home',
        chapter: '0',
        title: 'La cena que no fue',
        text: 'Esa noche, mientras esperás el llamado a la formación final, te acordás de la última cena del domingo. Mamá había hecho milanesas con puré. Tu hermana chica te contaba un chiste de la escuela y vos no te reíste porque ya estabas pensando en el cuartel.\n\nAhora, sentado en el catre, con la mochila a tus pies, te das cuenta: no le diste el beso de despedida. No te despediste de tu perro. No le respondiste el último mensaje a tu novia.\n\nMañana muy temprano partís en avión.',
        choices: [
            { label: 'Escribo una carta breve y le pido al cabo que la envíe.', next: 'avion', effects: { empatia: +3, salud: +1 } },
            { label: 'Cierro los ojos. Pienso en mamá calentándome la leche.', next: 'avion', effects: { empatia: +2, miedo: +1 } },
            { label: 'Me prometo volver vivo para terminar lo que dejé sin terminar.', next: 'avion', effects: { conviccion: +3, salud: +1 } }
        ]
    },

    pregunta_sgto: {
        kind: 'default',
        chapter: '1',
        title: 'En el cuartel',
        text: '"Vamos a recuperar nuestras Malvinas, soldado. Los ingleses las ocupan desde hace 149 años y las vamos a recuperar." El sargento te mira fijo y severo. "¿Alguna duda?"\n\nUn par de compañeros tuyos asienten con orgullo. Otros tragan saliva. Vos pensás en el mapa que te mostró el profesor de Geografía en quinto año: dos islas grises en una esquina del Atlántico, lejos de todo.',
        info: 'La ocupación británica data del 3 de enero de 1833. La decisión militar de 1982 fue tomada por la Junta Dictatorial liderada por Galtieri sin consultar al pueblo, en parte para canalizar el descontento social por la crisis económica y los crímenes del régimen.',
        choices: [
            { label: 'Saludo firme y avanzo hacia la formación.', next: 'casa_familia', effects: { conviccion: +2, info: +1 } },
            { label: 'Me quedo callado, mirando al suelo.', next: 'casa_familia', effects: { miedo: +1, info: +1 } }
        ]
    },

    avion: {
        img: '/malvinas_activacion.png',
        chapter: '1',
        title: 'Vuelo al sur',
        text: 'El Hércules está repleto y ruidoso. Sus turbinas vibran toda la chapa del fuselaje. Los muchachos cantan la Marcha de Malvinas; algunos cuatro veces, cinco. Hay risas nerviosas, alguien hace bromas pesadas, un suboficial reza en voz baja.\n\nMirás por la ventanilla circular descubriendo, a través de un colchón de nubes blancas, el Atlántico Sur oscuro e infinito. Algunos en este avión nunca habían salido de su provincia. Algunos nunca habían visto la nieve. Algunos no van a volver.\n\nUn cabo te reparte una hoja en blanco. "Si querés escribirle a tu vieja, escribile ahora. Después no se va a poder."',
        choices: [
            { label: 'Escribo: "No te preocupes mami, vuelvo pronto."', next: 'islas', effects: { empatia: +2 } },
            { label: 'Escribo todo lo que siento: el miedo, la nieve, la lejanía.', next: 'islas', effects: { empatia: +3, miedo: +2 } },
            { label: 'Guardo la hoja en blanco en el bolsillo interno.', next: 'islas', effects: { miedo: +1 } }
        ]
    },

    islas: {
        img: '/malvinas_carta.png',
        chapter: '2',
        title: 'Puerto Argentino',
        text: 'Al bajar la rampa del avión, el viento te corta la cara como si te hubieran tirado un balde de cuchillos. Hace 2°C. Llovizna helada y horizontal. Todo huele a turba húmeda y a combustible JP-1 derramado.\n\nTu sección es asignada a defender el Monte Tumbledown, un cerro pelado al oeste de Puerto Argentino. La orden es clara y categórica: hay que cavar pozos de zorro en la piedra. Los ingleses van a venir desde el mar; hay que esperarlos.\n\nUn cabo veterano te muestra el suelo: "Pico, pala, paciencia. Y cuidado con el agua subterránea."',
        info: 'El suelo malvinense es turbera: retiene el agua y al cavar trincheras ("pozos de zorro"), el agua subterránea inundaba el foso. Los soldados vivían empapados a temperaturas bajo cero, lo que provocó miles de casos de pie de trinchera y congelamientos.',
        choices: [
            { label: 'Pico la piedra rápido para armar una buena defensa.', next: 'guardia_nocturna', effects: { conviccion: +2, hambre: +1 } },
            { label: 'Ayudo primero a los compañeros que no tienen palas.', next: 'guardia_nocturna', effects: { empatia: +3, conviccion: +1, hambre: +1 } },
            { label: 'Cavo despacio, tratando de conservar la poca energía.', next: 'guardia_nocturna', effects: { miedo: +1, frio: +2 } }
        ]
    },

    guardia_nocturna: {
        kind: 'cold',
        chapter: '3',
        title: 'Primera Guardia',
        text: '2 AM. Tu turno de vigilancia. Estás solo en la intemperie. La humedad se cuela por los puños del capote y se mete en los huesos. La campera militar de mala calidad parece de papel mojado.\n\nA lo lejos escuchás el cañoneo naval británico contra la pista del aeropuerto. Cada estallido te hace temblar el suelo bajo las botas. Mirás las estrellas: en Buenos Aires nunca se veían tantas. Acá sí. Acá brillan como si fueran clavos en el techo del mundo.\n\nIntentás recordar el olor del café con leche de tu casa pero no lo lográs. El frío borra los olores antes que los recuerdos.',
        choices: [
            { label: 'Abrazo mi fusil para tratar de no temblar.', next: 'amigo', effects: { frio: +2, miedo: +2 } },
            { label: 'Me pongo a pensar en la cocina caliente de mi casa.', next: 'amigo', effects: { empatia: +1, frio: +2, hambre: +1 } },
            { label: 'Intento mantener la visión enfocada en el horizonte.', next: 'amigo', effects: { conviccion: +1, frio: +1 } }
        ]
    },

    amigo: {
        kind: 'friend',
        chapter: '4',
        title: 'Ramón',
        text: 'Al día siguiente descubrís que tu compañero de pozo es Ramón Antúnez, de un pueblo cerca de Goya, Corrientes. Tiene 19 años, una hermana enferma y una novia llamada Alicia que le tejió tres pulóveres de lana gruesa. "Pero no me dejaron traer ni uno", te cuenta riéndose para no llorar.\n\nA la noche, Ramón saca un transistor a pilas que escondió en la mochila bajo unas medias. Sintoniza onda corta. La señal viene y va con el viento. Una voz seca dice algo en inglés. Después llega un acento uruguayo: "Versión británica indica que el avance hacia Puerto Argentino es sostenido."',
        info: 'Para contrarrestar la censura del gobierno dictatorial argentino que insistía con "Estamos ganando", muchos soldados sintonizaban radios uruguayas (Radio Carve de Montevideo era muy escuchada) o la propia BBC para entender la realidad del terreno.',
        choices: [
            { label: 'Sintonizo radio de Argentina. Necesito buenas noticias.', next: 'oficial_humano', effects: { conviccion: +2, info: -2 } },
            { label: 'Sintonizo una radio de afuera (BBC/Uruguay).', next: 'oficial_humano', effects: { conviccion: -1, info: +3, miedo: +1 } },
            { label: 'Apago la radio. No me importa lo que digan allá lejos.', next: 'oficial_humano', effects: { empatia: +1 } }
        ]
    },

    oficial_humano: {
        kind: 'mail',
        chapter: '4',
        title: 'El Subteniente Mendoza',
        text: 'Al amanecer aparece en el pozo el Subteniente Carlos Mendoza, un cordobés de 24 años recién egresado del Colegio Militar. No es como los otros oficiales. Lleva la misma cara de cansancio que vos.\n\n"Pibes" — les dice — "vengo de la cocina del Estado Mayor. Me afané dos latas." Las pone sobre el barro: corned beef y duraznos en almíbar. "Compártanlas. Y si alguien pregunta, no me vieron."\n\nAntes de irse te aprieta el hombro y te dice: "Vos sos de Buenos Aires, ¿no? Tengo una novia ahí. Si no vuelvo, contale que la pensé hasta el final."',
        info: 'Hubo oficiales y suboficiales argentinos que se comportaron con dignidad y empatía hacia la tropa, contrastando con los casos documentados de maltrato. Muchos cayeron en combate junto a sus conscriptos. La memoria de Malvinas también es la de ellos.',
        choices: [
            { label: 'Le prometo que voy a buscar a su novia si vuelvo.', next: 'hambre', effects: { empatia: +4, conviccion: +1 } },
            { label: 'Le doy las gracias. Compartimos las latas con todo el pozo.', next: 'hambre', effects: { empatia: +3, hambre: -2 } },
            { label: 'Me como mi parte y guardo el resto para Ramón.', next: 'hambre', effects: { empatia: +2, hambre: -1 } }
        ]
    },

    hambre: {
        kind: 'hunger',
        chapter: '5',
        title: 'La logística rota',
        text: 'Pasaron 9 días desde la última ración caliente. La "ración de combate" — un mate cocido fingido y un caldo de oveja aguado — llega tarde y fría, si es que llega. La artillería enemiga cortó casi todos los suministros desde San Carlos.\n\nUn grupo del pozo de al lado planea una incursión nocturna a Puerto Argentino para robar comida del depósito reservado a los oficiales. "Allá hay corned beef, fideos, dulce de leche, vino", susurra uno con los ojos brillantes. "Está todo, pibe. Está todo."',
        info: 'El desabastecimiento fue dramático. Las diferencias de provisiones entre oficiales de alto rango y suboficiales/conscriptos crearon graves tensiones. La desnutrición aguda fue diagnosticada en cientos de soldados al volver al continente.',
        choices: [
            { label: 'Me uno al grupo. La necesidad es más fuerte.', next: 'castigo', effects: { hambre: -2, miedo: +2 } },
            { label: 'Decido aguantar. Es peligroso si nos descubren.', next: 'ataque_aereo_previo', effects: { hambre: +3, conviccion: +1 } },
            { label: 'Le doy lo último que me queda a Ramón, que está peor.', next: 'ataque_aereo_previo', effects: { empatia: +4, hambre: +4, salud: -1 } }
        ]
    },

    castigo: {
        kind: 'punishment',
        chapter: '5',
        title: 'Descubiertos',
        text: 'Madrugada. La incursión sale mal. Un cabo los sorprende a la vuelta y les arranca las latas de las manos. A uno de los pibes — Sosa, de Tucumán, 18 años — el cabo lo manda al "estaqueamiento": cuatro estacas en la tierra helada, las muñecas y los tobillos atados, la cara contra el barro mojado.\n\nLo dejan tres horas. Cuando lo desatan no se puede parar. Tiene los dedos azules y las venas explotadas en las piernas. Pasarán semanas hasta que la denuncia llegue a Buenos Aires.',
        info: 'Los estaqueamientos están documentados como tortura grave por veteranos sobrevivientes y constituyen causas judiciales abiertas. En 2023 la Cámara Federal de Comodoro Rivadavia los calificó formalmente como "delitos de lesa humanidad".',
        choices: [
            { label: 'Trato de cubrir a Sosa durante la noche con mi capote.', next: 'ataque_aereo_previo', effects: { empatia: +3, miedo: +1, frio: +2 } },
            { label: 'Trago saliva y guardo mi frustración para sobrevivir.', next: 'ataque_aereo_previo', effects: { miedo: +2, info: +2 } }
        ]
    },

    ataque_aereo_previo: {
        kind: 'naval_fire',
        chapter: '6',
        title: 'Fuego naval',
        text: 'Mayo avanza. Los británicos desembarcan en San Carlos el 21. Avanzan lento pero seguros. Las noches se vuelven una pesadilla de hierro: barcos británicos disparan andanadas de cañón naval sobre las posiciones argentinas para quebrar la moral y no dejarlos dormir.\n\nLos proyectiles silban sobre el techo de la trinchera. Cada uno suena como un tren cayendo del cielo. Algunos explotan a metros, otros a kilómetros. Nunca sabés cuál te va a tocar.\n\nRamón te aprieta el brazo. No habla. Tiene los ojos cerrados y la boca apretada. Vos sentís el corazón en las orejas.',
        choices: [
            { label: 'Tapo mis oídos y rezo.', next: 'paramedico', effects: { miedo: +3 } },
            { label: 'Me asomo para intentar ver de dónde disparan.', next: 'paramedico', effects: { conviccion: +2, miedo: +1 } },
            { label: 'Acuno a Ramón, que entró en pánico.', next: 'paramedico', effects: { empatia: +3 } }
        ]
    },

    paramedico: {
        kind: 'default',
        chapter: '6',
        title: 'Sangre joven',
        text: 'Antes del amanecer, una explosión muy cercana. Salen cuatro pibes corriendo del pozo de al lado. Tres traen al cuarto desmayado, sangrando del muslo. Le tiraron una andanada arriba.\n\nEl paramédico — un suboficial que en la vida civil era enfermero en Mar del Plata — corta el pantalón con tijera y aprieta. "Pinza, pinza, pinza", grita. No hay morfina. Le dan whisky de una petaca.\n\nEl chico abre los ojos. Pregunta por su mamá. El paramédico dice que sí, que ya viene, mientras ata el torniquete con desesperación.',
        info: 'Los paramédicos y enfermeros argentinos en Malvinas trabajaron con suministros mínimos en hospitales de campaña improvisados. Salvaron cientos de vidas con coraje y muchos cayeron junto a quienes intentaban salvar.',
        choices: [
            { label: 'Le tomo la mano al chico mientras lo trasladan.', next: 'hospital_campana', effects: { empatia: +3, miedo: +1 } },
            { label: 'Ayudo al paramédico cargando vendajes.', next: 'hospital_campana', effects: { empatia: +2, info: +1 } },
            { label: 'Vuelvo a mi pozo. No puedo soportar la imagen.', next: 'hospital_campana', effects: { miedo: +3, salud: -1 } }
        ]
    },

    hospital_campana: {
        kind: 'hospital',
        chapter: '7',
        title: 'Congelamiento',
        text: 'Amanece y al sacarte las botas no sentís los dedos del pie izquierdo. Cuando los ves, están negros. Negros como los de un cadáver. El sargento te ordena ir caminando hasta el hospital de campaña en Puerto Argentino. Cuatro kilómetros que se sienten cuarenta.\n\nAdentro hay decenas de pibes como vos. Algunos sin un dedo, otros sin un pie. Una enfermera de Catamarca te lava con agua tibia. Te dice algo en voz baja para que no la escuche el médico: "Mové los dedos así, así. Quizás todavía los podés salvar."\n\nMirás el techo de lona y entendés: esto que vivís no se lo van a creer en tu casa.',
        info: 'El "Pie de trinchera" se causaba por la humedad permanente, la inmovilidad y el congelamiento. Generó múltiples amputaciones que hubieran sido evitables con el abrigo que las familias enviaban al continente — pero las donaciones llamadas "Operación Lana" jamás llegaron en su mayoría a las islas.',
        choices: [
            { label: 'Pido volver a mi pozo. Está Ramón ahí y viene el ataque final.', next: 'medios', effects: { conviccion: +3, empatia: +2, frio: -1 } },
            { label: 'Dejo que los médicos me atiendan y descanso un poco.', next: 'medios', effects: { frio: -3, hambre: -1, salud: +2 } }
        ]
    },

    medios: {
        kind: 'media',
        chapter: '8',
        title: 'Revistas del continente',
        text: 'En la sala de espera del hospital ves una pila de revistas "Gente" llegada en un Hércules de logística. La tapa muestra a una madre sonriente con la foto de su hijo conscripto. El título grita en mayúsculas: "ESTAMOS GANANDO".\n\nAdentro hay listas de donaciones millonarias: golosinas, abrigos, cigarrillos, chocolates. Toneladas. Vos no comiste un chocolate en treinta días.\n\nUn compañero, sentado al lado tuyo, abre la revista. Lee los nombres. Después la cierra y mira al vacío. "Mi vieja debe estar leyendo esto ahora mismo en el living", dice.',
        choices: [
            { label: 'Lloro de impotencia. Alguien nos mintió todo este tiempo.', next: 'final_ataque', effects: { info: +3, miedo: +1 } },
            { label: 'Tiro la revista. Acá la única verdad es el plomo que viene.', next: 'final_ataque', effects: { conviccion: +1, empatia: -1 } },
            { label: 'Guardo una página para mostrarle a mi familia cuando vuelva.', next: 'final_ataque', effects: { info: +2, conviccion: +2 } }
        ]
    },

    final_ataque: {
        kind: 'battle',
        img: '/malvinas_collage.png',
        chapter: '9',
        title: 'La Batalla Final',
        text: 'Noche del 13 al 14 de junio de 1982. Monte Longdon, Dos Hermanas y Tumbledown caen uno tras otro. Todo es fuego intenso, bengalas británicas que iluminan los cerros como si fuera mediodía blanco, gritos en dos idiomas, disparos que pasan zumbando.\n\nVos y Ramón están atrincherados con el último cargador. A 200 metros se escucha la respiración del enemigo entre las piedras. Un compañero al lado tuyo grita "¡Viva la Patria!". Otro reza. Otro llora. Otro hace todas esas cosas a la vez.\n\nLa orden por radio es clara: aguantar hasta el último cartucho. Nadie te dice qué hacer después.',
        info: 'Los enfrentamientos cuerpo a cuerpo en los cerros perimetrales fueron de altísima intensidad. Algunos grupos resistieron hasta agotar municiones contra tropas de élite paracaidistas británicas que avanzaban en la noche con visión nocturna. Por la madrugada del 14 quedó claro que la posición era insostenible.',
        choices: [
            { label: 'Soporto la posición y devuelvo el fuego hasta el final.', next: 'rendicion', effects: { conviccion: +4, miedo: +3 } },
            { label: 'Trato de replegar al grupo a una posición segura.', next: 'rendicion', effects: { empatia: +2, info: +2 } },
            { label: 'Todo es caos. Sigo a Ramón a ciegas, lo tomo del brazo.', next: 'rendicion', effects: { miedo: +4, empatia: +2 } }
        ]
    },

    rendicion: {
        kind: 'surrender',
        chapter: '10',
        title: 'La rendición',
        text: 'Humo blanco sobre Puerto Argentino. La orden es romper las armas y rendirse. Vos rompés el cerrojo de tu fusil contra una roca. El golpe seco te suena como el cierre de un libro.\n\nEl General Menéndez firma la capitulación a las 23:30 horas. Caminás hacia el galpón gris donde te van a registrar como prisionero de guerra. Hay miles. Pibes mojados, sucios, hambrientos, callados. Un teniente inglés joven, casi de tu edad, te ofrece un cigarrillo. Lo aceptás.\n\nTerminó. 74 días que cambiaron para siempre quién eras.',
        info: 'Saldo del conflicto: 649 caídos argentinos, 255 británicos y 3 isleños. Los conscriptos argentinos fueron capturados, registrados en el Boletín de Cautivos y devueltos al continente en barcos transatlánticos como el Canberra y vuelos comerciales fletados.',
        choices: [
            { label: 'Cierro los ojos, respiro la paz de estar vivo.', next: 'prisionero', effects: { empatia: +1, salud: +1 } },
            { label: 'Siento vergüenza de haber perdido.', next: 'prisionero', effects: { conviccion: -2, miedo: +1 } },
            { label: 'Juro que nadie los va a olvidar.', next: 'prisionero', effects: { info: +3, conviccion: +2 } }
        ]
    },

    prisionero: {
        kind: 'prisoner',
        chapter: '10',
        title: 'Prisionero de guerra',
        text: 'Te alojan en el galpón de un frigorífico abandonado. Hay alambre de púas y guardias. Pero también — para tu sorpresa — hay galletas inglesas con manteca, té caliente, primeros vendajes que no viste en 60 días. Un médico militar inglés te examina los pies y dice algo en su idioma; otro traduce: "Por suerte vas a conservarlos".\n\nA tu lado, Ramón duerme por primera vez en semanas. Tres horas seguidas. Cuando se despierta, te pregunta si esto es el cielo. "No, Ramón. Es el principio de la vuelta."\n\nDos días después los embarcan en el Canberra rumbo a Puerto Madryn.',
        info: 'El trato británico a los prisioneros argentinos fue mayoritariamente correcto y ajustado a la Convención de Ginebra. Para muchos conscriptos fue la primera comida caliente y atención médica decente en semanas. La Cruz Roja Internacional supervisó el proceso de repatriación.',
        choices: [
            { label: 'Le pido a Ramón que me prometa volver a vernos en libertad.', next: 'regreso', effects: { empatia: +3 } },
            { label: 'Hablo con el médico inglés en mi inglés básico de la escuela.', next: 'regreso', effects: { info: +2, salud: +1 } },
            { label: 'Me quedo callado. Ya no me salen palabras.', next: 'regreso', effects: { miedo: +2, salud: -1 } }
        ]
    },

    regreso: {
        kind: 'return',
        chapter: 'Epílogo',
        title: 'La vuelta del silencio',
        text: 'Desembarcan en Puerto Madryn una madrugada, a escondidas. El gobierno teme que los argentinos vean en sus propios ojos lo que pasó. No hay banderas, no hay diarios, no hay aplausos. Hay micros sin parar y rutas vacías hasta Bahía Blanca.\n\nEn casa, tu mamá dejó tu cama tendida intacta los 74 días. Pero esa misma semana, los vecinos cruzan a la otra vereda cuando te ven. La frase "héroe de Malvinas" tarda 25 años en pronunciarse en voz alta.\n\nLos primeros años son los del olvido oficial: la "desmalvinización". Te ofrecen un trabajo en una panadería; el dueño te dice "que lo de Malvinas no se diga acá, ¿no?". Te quedan los amigos del CECIM y las cartas de Ramón desde Corrientes.',
        info: 'Más de 500 veteranos argentinos se suicidaron en las décadas posteriores a 1982 por trastorno de estrés post-traumático, falta de reconocimiento social, abandono del Estado e incapacidad para reinsertarse. Hubo que esperar hasta 2007 para que la Pensión Vitalicia para Veteranos de Guerra fuera reformada significativamente.',
        choices: [
            { label: 'Me sumo al CECIM. Acompañar a otros me devuelve algo.', next: 'reencuentro', effects: { empatia: +3, info: +2 } },
            { label: 'Me encierro. No quiero hablar con nadie del tema.', next: 'reencuentro', effects: { miedo: +2, salud: -2 } },
            { label: 'Estudio. Quiero entender por qué pasó lo que pasó.', next: 'reencuentro', effects: { info: +4, conviccion: +1 } }
        ]
    },

    reencuentro: {
        kind: 'reunion',
        chapter: 'Epílogo II',
        title: '10 años después',
        text: '1992. La plaza San Martín de Buenos Aires está iluminada por velitas. Es el 10° aniversario. Ramón vino desde Corrientes en un colectivo de 18 horas. Te abraza fuerte. Tiene una hija nueva: Malvina. La trae en brazos.\n\n"Pibe", te dice apretando la frente contra la tuya. "Volveríamos a ese frío si fuera para abrazarnos."\n\nEn la plaza hay 649 velitas. Una por cada compañero. La de Sosa, de Tucumán, está en el medio. La encendiste vos. Ramón te aprieta la mano. Llueve fino. Nadie se va.',
        info: 'El CECIM (Centro de Excombatientes de las Islas Malvinas) y otras organizaciones de veteranos sostuvieron durante décadas el reclamo por reconocimiento, salud, educación y pensiones. Su trabajo militante y el aporte del Equipo Argentino de Antropología Forense permitieron, a partir de 2017, identificar a casi 120 caídos del Cementerio de Darwin.',
        choices: [
            { label: 'Descubrir cómo el viaje me ha marcado para siempre →', next: 'final', effects: {} }
        ]
    },

    // Mantenida por compatibilidad con runs anteriores
    mama: {
        chapter: '1',
        title: 'Sin opción',
        text: 'No hay teléfono fijo libre y hay orden estricta de no difundir movimientos de tropas. La fila al único teléfono público es de cien personas. Tu mamá no se entera hasta tres días después cuando lo dicen por cadena nacional.',
        choices: [
            { label: 'Subir al avión con angustia contenida.', next: 'avion', effects: { miedo: +1, salud: -1 } }
        ]
    }
};

const initialStats = {
    miedo: 0,
    conviccion: 0,
    empatia: 0,
    info: 0,
    frio: 0,
    hambre: 0,
    salud: 0
};

const STAT_META = {
    empatia: { label: 'Empatía', color: '#43a047', icon: Heart },
    conviccion: { label: 'Convicción', color: COLORS.accent, icon: Compass },
    miedo: { label: 'Miedo / Trauma', color: '#9c27b0', icon: AlertTriangle },
    info: { label: 'Conciencia crítica', color: COLORS.sky, icon: BookOpen },
    frio: { label: 'Daño por frío', color: '#3b82f6', icon: Snowflake },
    hambre: { label: 'Desnutrición', color: '#f59e0b', icon: Utensils },
    salud: { label: 'Reservas físicas', color: '#10b981', icon: HeartPulse }
};

// Interpretación narrativa por intensidad de cada stat
const interpretStat = (key, value) => {
    const high = value >= 7;
    const mid = value >= 4 && value < 7;
    if (key === 'empatia') return high ? 'Te acordás del nombre y el pueblo de cada compañero del pozo.' : mid ? 'Aprendiste a apretar manos en silencio.' : 'Volviste cerrado, cuesta hablar de lo de allá.';
    if (key === 'conviccion') return high ? 'Cada 2 de abril te ponés la escarapela y caminás a la plaza.' : mid ? 'Sostenés la causa pero ya sin grito.' : 'La palabra "patria" te sigue pesando.';
    if (key === 'miedo') return high ? 'Hay sonidos comunes que disparan recuerdos sin permiso.' : mid ? 'A veces te despertás de noche escuchando algo que no está.' : 'Manejaste el miedo. No siempre. Pero lo manejaste.';
    if (key === 'info') return high ? 'Mirás los noticieros sabiendo que la verdad puede esconderse.' : mid ? 'Aprendiste que ningún relato oficial es completo.' : 'Te cuesta confiar y eso es honesto.';
    if (key === 'frio') return high ? 'Tus dedos quedaron marcados. Te duelen al cambio de tiempo.' : mid ? 'En invierno usás dos pares de medias por costumbre.' : 'Tu cuerpo aguantó. Eso ya es una victoria.';
    if (key === 'hambre') return high ? 'Sabés exactamente cuánto pesa una galleta soldada.' : mid ? 'No tirás comida. Nunca.' : 'Te gusta cocinar para los demás.';
    if (key === 'salud') return high ? 'Tenés reservas. Caminás derecho. Volviste razonablemente entero.' : mid ? 'Tenés cicatrices visibles, pero te bancás el día.' : 'El cuerpo te pasa factura todavía.';
    return '';
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
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem 4rem', fontFamily: '"Public Sans", sans-serif' }}>
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
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px', color: COLORS.accent, fontWeight: 800, marginTop: '1rem' }}>Despliegue Finalizado · 74 días</div>
                    <h1 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0.5rem 0 1rem', lineHeight: 1.1 }}>
                        {reflection.title}
                    </h1>
                    <p style={{ maxWidth: '750px', margin: '0 auto', opacity: 0.95, lineHeight: 1.8, fontSize: '1.1rem' }}>
                        {reflection.text}
                    </p>
                </motion.div>

                {/* RESUMEN: Marcas de guerra */}
                <section style={{ marginTop: '2rem', background: COLORS.paper, borderRadius: '22px', padding: '2.25rem', boxShadow: '0 12px 30px rgba(9,9,12,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: COLORS.accent, color: COLORS.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Heart size={26} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', color: COLORS.accent, fontWeight: 800 }}>Resumen</div>
                            <h2 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', color: COLORS.deep, margin: '0.2rem 0 0', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                                Tus marcas de guerra
                            </h2>
                        </div>
                    </div>
                    <p style={{ color: COLORS.base, opacity: 0.75, marginBottom: '1.75rem', maxWidth: '700px', lineHeight: 1.6 }}>
                        Cada decisión tuya en los cerros dejó una huella distinta. Acá las leemos como las leerían 30 años después en una entrevista para un libro de historia oral.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                        {Object.entries(STAT_META).map(([k, m]) => {
                            const v = stats[k] || 0;
                            const max = 15;
                            const pct = Math.min(100, Math.max(0, (v / max) * 100));
                            const Icon = m.icon;
                            const intensity = v >= 7 ? 'Alta' : v >= 4 ? 'Media' : v > 0 ? 'Baja' : 'Sin marca';
                            return (
                                <motion.div
                                    key={k}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 + Object.keys(STAT_META).indexOf(k) * 0.06 }}
                                    style={{ background: '#fff', border: `1px solid ${m.color}33`, borderLeft: `4px solid ${m.color}`, borderRadius: '14px', padding: '1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: m.color, fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <Icon size={16} /> {m.label}
                                        </div>
                                        <div style={{ fontWeight: 900, fontSize: '1.4rem', color: COLORS.base }}>
                                            {v}<span style={{ fontSize: '0.7rem', opacity: 0.4, fontWeight: 500 }}>/{max}</span>
                                        </div>
                                    </div>
                                    <div style={{ height: '6px', background: '#eef0f3', borderRadius: '999px', overflow: 'hidden' }}>
                                        <div style={{ width: `${pct}%`, height: '100%', background: m.color, transition: 'width 0.6s' }} />
                                    </div>
                                    <div style={{ fontSize: '0.78rem', color: COLORS.base, fontStyle: 'italic', opacity: 0.85, lineHeight: 1.45 }}>
                                        <span style={{ color: m.color, fontWeight: 700, fontStyle: 'normal' }}>{intensity}.</span> {interpretStat(k, v)}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Hoja de ruta + reiniciar */}
                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '18px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: `1px solid rgba(9,9,12,0.05)` }}>
                        <h3 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', color: COLORS.deep, marginTop: 0, fontSize: '1.4rem' }}>Hoja de ruta</h3>
                        <p style={{ fontSize: '0.85rem', color: COLORS.base, opacity: 0.7, marginTop: 0 }}>Tus decisiones, en orden.</p>
                        <div style={{ maxHeight: '320px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                            <ol style={{ paddingLeft: '1rem', margin: 0, color: COLORS.base }}>
                                {path.map((p, i) => (
                                    <li key={i} style={{ marginBottom: '0.65rem', fontSize: '0.85rem', lineHeight: 1.5, borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.6rem' }}>
                                        <div style={{ color: COLORS.accent, fontWeight: 800, letterSpacing: '0.5px' }}>{SCENES[p.sceneId]?.chapter || '·'} — {SCENES[p.sceneId]?.title || ''}</div>
                                        <div style={{ opacity: 0.9 }}>{p.label}</div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    <div style={{
                        background: `linear-gradient(135deg, ${COLORS.base} 0%, ${COLORS.deep} 100%)`,
                        color: COLORS.paper,
                        padding: '2rem',
                        borderRadius: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.18)'
                    }}>
                        <div>
                            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', color: COLORS.accent, fontWeight: 800, marginBottom: '0.4rem' }}>Memoria activa</div>
                            <h3 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', fontSize: '1.6rem', fontStyle: 'italic', margin: 0, lineHeight: 1.25 }}>
                                "Que las nuevas generaciones no aprendan Malvinas como una fecha, sino como una experiencia."
                            </h3>
                            <p style={{ marginTop: '0.85rem', fontSize: '0.85rem', opacity: 0.85, lineHeight: 1.55 }}>
                                649 nombres en el Cementerio de Darwin. Más de 500 veteranos que se quitaron la vida en la posguerra. Cada decisión que vos acabás de tomar fue una decisión real para alguien.
                            </p>
                        </div>
                        <button onClick={restart} style={{
                            padding: '0.9rem 1rem',
                            background: COLORS.accent,
                            color: COLORS.paper,
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            fontSize: '0.95rem'
                        }}>
                            <RotateCcw size={18} /> Reintentar la experiencia
                        </button>
                    </div>
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
                        <Activity size={12} /> Juego de decisiones · Capítulo {scene.chapter}
                    </div>
                    <h1 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', margin: '0.5rem 0 0', fontWeight: 700 }}>
                        {scene.title}
                    </h1>
                </div>
                <button onClick={restart} title="Reiniciar" style={{ background: 'rgba(240,236,229,0.05)', border: `1px solid rgba(240,236,229,0.2)`, color: COLORS.paper, borderRadius: '999px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                    <RotateCcw size={16} /> Reiniciar
                </button>
            </header>

            {/* Stats activas */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {Object.entries(STAT_META).map(([k, m]) => {
                    const v = stats[k] || 0;
                    if (v <= 0) return null;
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
                        boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                        overflow: 'hidden'
                    }}
                >
                    {scene.img ? (
                        <div style={{ margin: '-2.5rem -2.5rem 2rem -2.5rem', height: '280px', overflow: 'hidden' }}>
                            <img src={scene.img} alt={`Ilustración del capítulo ${scene.chapter}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ) : scene.kind ? (
                        <div style={{ margin: '-2.5rem -2.5rem 2rem -2.5rem', height: '240px', overflow: 'hidden' }}>
                            <SceneIllustration kind={scene.kind} />
                        </div>
                    ) : null}

                    <p style={{ fontSize: '1.1rem', lineHeight: 1.85, color: COLORS.base, whiteSpace: 'pre-line', margin: 0 }}>
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

                    <div style={{ borderTop: `1px dashed rgba(9,9,12,0.1)`, margin: '2rem 0' }} />

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
    const { empatia, miedo, info, conviccion, frio, hambre, salud } = stats;

    if (empatia >= 9) {
        return {
            title: 'Caminaste con el corazón abierto',
            text: 'Tus decisiones priorizaron al compañero del pozo: a Ramón, al Subteniente Mendoza, al chico herido del paramédico. Esa empatía es lo que sostiene la memoria de Malvinas. La guerra no fue solo un choque bélico: afectó a pibes que en otra vida habrían sido tus amigos. Honrarlos es seguir cuidándolos en tu cabeza.'
        };
    }
    if (info >= 8 && conviccion >= 4) {
        return {
            title: 'Peleaste con conciencia social',
            text: 'Dudaste de los relatos oficiales y descubriste la dura verdad logística y mediática, pero sostuviste tu puesto hasta el final. Hoy defender Malvinas es exactamente eso: usar el pensamiento crítico y el conocimiento histórico, no la nostalgia bélica.'
        };
    }
    if (frio >= 7 || hambre >= 5) {
        return {
            title: 'El cuerpo recordará para siempre',
            text: 'Sentiste en tu cuerpo virtual lo peor de Tumbledown. La inmensa mayoría del daño a los soldados argentinos no fue por fuego inglés, sino por el abandono logístico y climático. Tu historia es un reclamo permanente contra la idea de que la guerra "se gana o se pierde" — la guerra siempre cobra precios que no aparecen en los partes oficiales.'
        };
    }
    if (miedo >= 8) {
        return {
            title: 'El miedo: la verdad humana de la guerra',
            text: 'Nadie va a una guerra valiente. Nadie. Tu recorrido fue profundamente sincero. Reconocer el miedo, el frío extremo, la ansiedad bajo el fuego naval, la incertidumbre de cada amanecer es la única manera realista de hablar de la trágica guerra de 1982. Esa honestidad es la que hace a un buen narrador de la historia.'
        };
    }
    if (salud <= -2) {
        return {
            title: 'Volviste roto, pero volviste',
            text: 'Te marcó duro. Te marcó el cuerpo y la cabeza. Pero estás. Y eso ya es una historia que hay que contar. Más de 500 veteranos no la contaron porque el Estado los abandonó. Que vos puedas sentarte y leer estas palabras es, también, un acto político.'
        };
    }

    return {
        title: '74 días en la inmensidad',
        text: 'Sobreviviste a las islas. Tu paso por Tumbledown resume el caos táctico, el frío, el hambre, la espera y las decisiones imposibles. Detrás de cada estadística existían personas con biografías complejas. Esta reflexión es un pequeño homenaje a quienes no volvieron y a quienes volvieron pero perdieron parte de sí mismos en el camino.'
    };
};

export default MalvinasJuegoSerio;
