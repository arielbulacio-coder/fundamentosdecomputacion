import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Compass, Eye, Smartphone, ArrowLeft, Info } from 'lucide-react';

const COLORS = {
    base: '#09090c',
    accent: '#b45354',
    sky: '#7b98ab',
    deep: '#35446a',
    paper: '#f0ece5'
};

// Hotspots: cada uno representa un objeto/lugar con su info histórica
const HOTSPOTS = [
    {
        id: 'flag',
        position: [0, 1.5, 0],
        color: '#75aadb',
        label: 'Bandera Argentina',
        title: 'Bandera y soberanía',
        body: 'El 2 de abril de 1982, las fuerzas argentinas izaron la bandera en Puerto Argentino tras la "Operación Rosario". La Constitución Nacional Argentina (1994) declara que recuperar las islas es un objetivo permanente e irrenunciable de la Nación.'
    },
    {
        id: 'helmet',
        position: [-3, 0.4, 1.5],
        color: '#3b3b3b',
        label: 'Casco / Trinchera',
        title: 'La trinchera y el frío',
        body: 'Los conscriptos cavaban "pozos de zorro" en suelo congelado. Sin equipamiento adecuado, el frío extremo (entre 0° y -10°C, con viento), la humedad y la nieve provocaron pie de trinchera, hipotermia y desnutrición. Muchos soldados tenían 18 o 19 años.'
    },
    {
        id: 'letter',
        position: [3, 0.2, 1.2],
        color: '#f0ece5',
        label: 'Carta',
        title: 'Cartas a casa',
        body: 'Las cartas eran el único canal humano. Se censuraban antes de salir y muchas no llegaron jamás. "Mami, mandame chocolate", escribió un soldado de 19 años. Las familias guardaron esas cartas como reliquia. Son el corazón emocional de esta experiencia.'
    },
    {
        id: 'belgrano',
        position: [-2, 0.3, -3],
        color: '#1565c0',
        label: 'ARA Gral. Belgrano',
        title: 'Hundimiento del Belgrano',
        body: 'El 2 de mayo de 1982, el submarino británico HMS Conqueror torpedeó al crucero ARA General Belgrano fuera de la zona de exclusión declarada. Murieron 323 marinos argentinos. Es uno de los episodios más dolorosos y polémicos de la guerra.'
    },
    {
        id: 'media',
        position: [2.5, 0.3, -2.5],
        color: '#b45354',
        label: 'Manipulación mediática',
        title: '"Estamos ganando"',
        body: 'Los medios oficiales argentinos repetían "Estamos ganando" mientras la guerra se perdía. Tapas de revistas, partes de prensa y noticieros construyeron una falsa victoria. La rendición del 14 de junio sorprendió a muchos argentinos.'
    },
    {
        id: 'memorial',
        position: [0, 0.3, 4],
        color: '#7b98ab',
        label: 'Memorial',
        title: 'Cementerio de Darwin',
        body: 'En el Cementerio de Darwin descansan los caídos argentinos. Hasta 2017, decenas de tumbas tenían la inscripción "Soldado argentino solo conocido por Dios". Gracias al trabajo del Equipo Argentino de Antropología Forense, hoy muchas familias pueden ir a despedir a sus seres queridos.'
    }
];

// 🌍 Plataforma del diorama (las islas)
const Island = () => (
    <group>
        <mesh receiveShadow position={[0, -0.55, 0]}>
            <cylinderGeometry args={[6, 6.5, 0.5, 32]} />
            <meshStandardMaterial color="#3a4a3a" roughness={0.95} />
        </mesh>
        <mesh receiveShadow position={[0, -0.3, 0]}>
            <cylinderGeometry args={[5.5, 5.5, 0.05, 32]} />
            <meshStandardMaterial color="#5a6b4f" roughness={0.95} />
        </mesh>
        {/* mar alrededor */}
        <mesh position={[0, -0.85, 0]}>
            <cylinderGeometry args={[12, 12, 0.4, 32]} />
            <meshStandardMaterial color={COLORS.deep} roughness={0.5} metalness={0.3} />
        </mesh>
        {/* algunas rocas/colinas */}
        {[
            [-2.5, -0.1, -1.5, 0.5],
            [3, 0, -2, 0.7],
            [-3.5, -0.1, 2, 0.6],
            [1.5, 0, 3.5, 0.8]
        ].map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]} receiveShadow castShadow>
                <sphereGeometry args={[r, 12, 8]} />
                <meshStandardMaterial color="#54624d" roughness={0.9} />
            </mesh>
        ))}
    </group>
);

// 🚩 Hotspot interactivo
const Hotspot = ({ data, onSelect, selected }) => {
    const ref = useRef();
    const [hover, setHover] = useState(false);

    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y = data.position[1] + Math.sin(state.clock.elapsedTime * 1.5 + data.position[0]) * 0.08;
            ref.current.rotation.y += 0.005;
        }
    });

    return (
        <group position={data.position} ref={ref}>
            <mesh
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={() => onSelect(data)}
                castShadow
            >
                <sphereGeometry args={[0.25, 24, 24]} />
                <meshStandardMaterial
                    color={data.color}
                    emissive={data.color}
                    emissiveIntensity={hover || selected ? 0.7 : 0.25}
                    roughness={0.4}
                />
            </mesh>
            <mesh onClick={() => onSelect(data)}>
                <ringGeometry args={[0.32, 0.42, 32]} />
                <meshBasicMaterial color={data.color} transparent opacity={0.4} side={2} />
            </mesh>
            <Text
                position={[0, 0.65, 0]}
                fontSize={0.18}
                color={COLORS.paper}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.01}
                outlineColor="#000"
            >
                {data.label}
            </Text>
        </group>
    );
};

// Niebla y atmósfera
const Atmosphere = () => (
    <>
        <fog attach="fog" args={[COLORS.base, 8, 25]} />
        <ambientLight intensity={0.4} />
        <directionalLight
            position={[5, 8, 5]}
            intensity={0.7}
            color="#bcd0e0"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 3, -5]} color={COLORS.accent} intensity={0.4} />
        <Stars radius={50} depth={20} count={1500} factor={2} fade />
    </>
);

const MalvinasRA = () => {
    const [selected, setSelected] = useState(null);
    const [info, setInfo] = useState(null);
    const [orientationEnabled, setOrientationEnabled] = useState(false);
    const [hasOrientation, setHasOrientation] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
            setHasOrientation(true);
        }
    }, []);

    const requestOrientation = async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const perm = await DeviceOrientationEvent.requestPermission();
                if (perm === 'granted') setOrientationEnabled(true);
            } catch (e) { console.warn(e); }
        } else {
            setOrientationEnabled(true);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: COLORS.base, color: COLORS.paper, fontFamily: '"Public Sans", sans-serif' }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');`}</style>

            {/* Header overlay */}
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10,
                padding: '1rem 1.25rem',
                background: 'linear-gradient(180deg, rgba(9,9,12,0.85), rgba(9,9,12,0))',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                pointerEvents: 'none'
            }}>
                <a href="/proyecto-malvinas" style={{ pointerEvents: 'auto', textDecoration: 'none', color: COLORS.paper, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(240,236,229,0.12)', padding: '0.5rem 0.85rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, backdropFilter: 'blur(8px)' }}>
                    <ArrowLeft size={16} /> Volver al proyecto
                </a>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pointerEvents: 'none' }}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '3px', color: COLORS.accent, fontWeight: 800 }}>Realidad Aumentada</div>
                    <div style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', fontSize: '1.4rem', fontWeight: 700, fontStyle: 'italic' }}>Diorama Malvinas</div>
                </div>
            </header>

            {/* Canvas 3D */}
            <Canvas
                shadows
                camera={{ position: [0, 4, 9], fov: 55 }}
                style={{ width: '100vw', height: '100vh' }}
            >
                <color attach="background" args={[COLORS.base]} />
                <Suspense fallback={null}>
                    <Atmosphere />
                    <Island />
                    {HOTSPOTS.map(h => (
                        <Hotspot key={h.id} data={h} onSelect={(d) => { setSelected(d.id); setInfo(d); }} selected={selected === h.id} />
                    ))}
                    {/* Cartel central */}
                    <Text
                        position={[0, 3, 0]}
                        fontSize={0.5}
                        color={COLORS.paper}
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.02}
                        outlineColor="#000"
                    >
                        ATLÁNTICO SUR
                    </Text>
                    <Text
                        position={[0, 2.55, 0]}
                        fontSize={0.22}
                        color={COLORS.accent}
                        anchorX="center"
                        anchorY="middle"
                    >
                        Tocá las esferas para explorar
                    </Text>
                </Suspense>
                <OrbitControls
                    enablePan={false}
                    minDistance={6}
                    maxDistance={16}
                    minPolarAngle={0.3}
                    maxPolarAngle={Math.PI / 2 - 0.1}
                    autoRotate={!orientationEnabled}
                    autoRotateSpeed={0.3}
                />
            </Canvas>

            {/* Panel de info al seleccionar hotspot */}
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10,
                padding: '1rem',
                pointerEvents: info ? 'auto' : 'none'
            }}>
                <motion.div
                    initial={false}
                    animate={{ y: info ? 0 : 200, opacity: info ? 1 : 0 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                    style={{
                        maxWidth: '720px', margin: '0 auto',
                        background: 'rgba(9,9,12,0.92)',
                        backdropFilter: 'blur(16px)',
                        border: `1px solid ${COLORS.deep}`,
                        borderRadius: '18px',
                        padding: '1.25rem 1.5rem',
                        color: COLORS.paper
                    }}
                >
                    {info && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: info.color, fontWeight: 800 }}>
                                        Hotspot
                                    </div>
                                    <h3 style={{ fontFamily: '"EFCO Brookshire", "Playfair Display", Georgia, serif', margin: '0.25rem 0 0', fontSize: '1.5rem', fontStyle: 'italic' }}>
                                        {info.title}
                                    </h3>
                                </div>
                                <button onClick={() => { setInfo(null); setSelected(null); }} style={{ background: 'transparent', border: `1px solid ${COLORS.paper}`, color: COLORS.paper, borderRadius: '999px', padding: '0.3rem 0.7rem', cursor: 'pointer', fontSize: '0.75rem' }}>
                                    Cerrar ✕
                                </button>
                            </div>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.55, marginTop: '0.6rem', marginBottom: 0, color: COLORS.paper }}>
                                {info.body}
                            </p>
                        </>
                    )}
                </motion.div>
            </div>

            {/* Controles inferior izquierda */}
            <div style={{ position: 'fixed', bottom: '1rem', left: '1rem', zIndex: 10, display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                {hasOrientation && !orientationEnabled && (
                    <button onClick={requestOrientation} style={{ background: COLORS.accent, color: COLORS.paper, border: 'none', borderRadius: '999px', padding: '0.55rem 0.9rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 14px rgba(0,0,0,0.4)' }}>
                        <Smartphone size={14} /> Modo giroscopio
                    </button>
                )}
                <div style={{ background: 'rgba(9,9,12,0.6)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '0.6rem 0.85rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: COLORS.sky }}>
                    <Eye size={14} /> {orientationEnabled ? 'Movés el celular para mirar' : 'Arrastrá para girar · pellizcá para zoom'}
                </div>
            </div>

            {/* Mini-leyenda con todos los hotspots */}
            <div style={{
                position: 'fixed',
                top: '4.5rem',
                right: '1rem',
                zIndex: 10,
                background: 'rgba(9,9,12,0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '14px',
                padding: '0.85rem',
                maxWidth: '220px',
                fontSize: '0.78rem',
                border: `1px solid ${COLORS.deep}`
            }}>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: COLORS.sky, fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Compass size={12} /> Hotspots
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {HOTSPOTS.map(h => (
                        <button key={h.id} onClick={() => { setSelected(h.id); setInfo(h); }} style={{
                            background: selected === h.id ? `${h.color}33` : 'transparent',
                            color: COLORS.paper,
                            border: `1px solid ${selected === h.id ? h.color : 'transparent'}`,
                            borderRadius: '8px',
                            padding: '0.35rem 0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            textAlign: 'left'
                        }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: h.color, flexShrink: 0 }} />
                            {h.label}
                        </button>
                    ))}
                </div>
                <div style={{ marginTop: '0.6rem', paddingTop: '0.5rem', borderTop: '1px dashed rgba(255,255,255,0.15)', fontSize: '0.7rem', color: COLORS.sky, display: 'flex', alignItems: 'flex-start', gap: '0.3rem' }}>
                    <Info size={12} style={{ flexShrink: 0, marginTop: '2px' }} /> Tocá una esfera o un nombre para explorar.
                </div>
            </div>
        </div>
    );
};

export default MalvinasRA;
