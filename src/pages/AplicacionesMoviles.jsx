import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Smartphone, BookOpen, Layers, Code, Zap, Database, Camera,
    ShieldCheck, Sparkles, Navigation, List, ExternalLink, ArrowRight,
    GraduationCap, Calendar, Users, CheckCircle2, FileText, Download,
    FolderGit2, Rocket, Award, Cpu, ShieldAlert, BookMarked
} from 'lucide-react';

const AplicacionesMoviles = () => {
    const [selectedTab, setSelectedTab] = useState('unidades'); // 'unidades' | 'proyecto' | 'evaluacion' | 'bibliografia'

    const unidades = [
        {
            num: 'UNIDAD 1',
            title: 'Fundamentos de React Native y Expo',
            color: '#0284c7',
            desc: 'Configuración del entorno, arquitectura híbrida vs nativa, componentes básicos, listas optimizadas y navegación basada en archivos.',
            clases: [
                {
                    code: '1.1',
                    name: 'Entorno de trabajo y primera pantalla',
                    topics: [
                        'Arquitectura: Bridge vs New Architecture (Fabric & TurboModules)',
                        'Expo SDK vs React Native CLI: pros y contras',
                        'Flujo de desarrollo con Expo Go y emuladores',
                        'JSX, TypeScript básico y StyleSheet',
                        'Modelo de cajas móvil y Flexbox nativo'
                    ],
                    preset: 'flexbox',
                    simulatorTag: 'Simular Flexbox'
                },
                {
                    code: '1.2',
                    name: 'Componentes, estado y listas',
                    topics: [
                        'Estado local con useState y ciclo de renderizado',
                        'FlatList vs ScrollView: reciclado y virtualización de celdas',
                        'keyExtractor y optimización de listas',
                        'Eventos de interacción: onPress, onChangeText',
                        'Renderizado condicional en mobile'
                    ],
                    preset: 'flatlist',
                    simulatorTag: 'Simular Listas'
                },
                {
                    code: '1.3',
                    name: 'Navegación con Expo Router',
                    topics: [
                        'Filosofía file-based routing en aplicaciones móviles',
                        'Configuración de Stack de navegación y cabeceras',
                        'Pestañas inferiores con Tabs y layouts _layout.tsx',
                        'Paso de parámetros y rutas dinámicas [id].tsx',
                        'Estructura recomendada: grupos (tabs) y (auth)'
                    ],
                    preset: 'router',
                    simulatorTag: 'Simular Router'
                }
            ]
        },
        {
            num: 'UNIDAD 2',
            title: 'Funcionalidades e Integración de Datos',
            color: '#10b981',
            desc: 'Estado global, consumo de APIs REST, validación tipada con Zod, formularios móviles y acceso a sensores nativos del smartphone.',
            clases: [
                {
                    code: '2.1',
                    name: 'Estado global y trabajo en equipo',
                    topics: [
                        'El problema del Prop Drilling en árboles complejos',
                        'Zustand: creación de stores tipados vs Context API',
                        'Persistencia de estado en storage local',
                        'Estrategia de ramas Git (main, develop, feature-*)',
                        'Flujo de Pull Requests y code reviews en equipo'
                    ],
                    preset: 'state',
                    simulatorTag: 'Simular Estado'
                },
                {
                    code: '2.2',
                    name: 'Datos remotos y APIs (Preparación Firebase)',
                    topics: [
                        'useEffect: ciclo de vida, dependencias y función de cleanup',
                        'Manejo de estados: loading, error y data',
                        'Consumo de APIs REST con fetch y Axios',
                        'Custom hooks para desacoplar lógica de datos',
                        'Inicialización y tipado de firebase.ts'
                    ],
                    preset: 'state',
                    simulatorTag: 'Simular Hooks'
                },
                {
                    code: '2.3',
                    name: 'Formularios, validación y UX mobile',
                    topics: [
                        'TextInput: tipos de teclado, returnKeyType y autocapitalize',
                        'React Hook Form con Controller en componentes nativos',
                        'Validación de esquemas con Zod (@hookform/resolvers/zod)',
                        'KeyboardAvoidingView en iOS vs comportamiento en Android',
                        'Manejo de errores visuales y accesibilidad'
                    ],
                    preset: 'form',
                    simulatorTag: 'Simular Zod'
                },
                {
                    code: '2.4',
                    name: 'Hardware del dispositivo',
                    topics: [
                        'Sistema de permisos en runtime (iOS plist / Android manifest)',
                        'expo-camera y expo-image-picker: captura y selección',
                        'expo-location: geolocalización en primer plano',
                        'Notificaciones locales con expo-notifications',
                        'expo-secure-store vs AsyncStorage para credenciales'
                    ],
                    preset: 'hardware',
                    simulatorTag: 'Simular Sensores'
                }
            ]
        },
        {
            num: 'UNIDAD 3',
            title: 'Producción, Performance y Despliegue',
            color: '#8b5cf6',
            desc: 'Backend en tiempo real con Firebase, optimización con Reanimated a 60fps, pruebas unitarias y compilación de APKs en la nube con EAS.',
            clases: [
                {
                    code: '3.1',
                    name: 'Autenticación real y Backend con Firebase',
                    topics: [
                        'Firebase Auth: registro y login email/password',
                        'Firestore: CRUD (addDoc, updateDoc, deleteDoc)',
                        'Consultas en tiempo real reactivas con onSnapshot',
                        'Subida de archivos a Firebase Storage',
                        'Reglas de seguridad (Security Rules) con auth.uid'
                    ],
                    preset: 'firebase',
                    simulatorTag: 'Simular Firestore'
                },
                {
                    code: '3.2',
                    name: 'Performance, animaciones y testing',
                    topics: [
                        'React.memo, useMemo y useCallback para evitar re-renders',
                        'Shopify FlashList como alternativa de ultra rendimiento',
                        'Reanimated 3: animaciones fluidas en el UI Thread a 60 FPS',
                        'Testing unitario de hooks y componentes con Jest',
                        'Accesibilidad (A11y): etiquetas para lectores de pantalla'
                    ],
                    preset: 'animations',
                    simulatorTag: 'Simular Reanimated'
                },
                {
                    code: '3.3',
                    name: 'Build, deploy y demo final',
                    topics: [
                        'EAS Build: configuración de eas.json y builds en la nube',
                        'Generación de binarios APK (Android) e IPA (iOS TestFlight)',
                        'Actualizaciones Over-The-Air (OTA) con Expo Updates',
                        'CI/CD básico para testing con GitHub Actions',
                        'Preparación de metadatos, capturas e íconos de Stores'
                    ],
                    preset: 'flexbox',
                    simulatorTag: 'Ver Simulador'
                },
                {
                    code: '3.4',
                    name: 'Capítulo Bonus: Desarrolladores "Augmented" e IA',
                    topics: [
                        'Google Project IDX & Antigravity en desarrollo mobile',
                        'Pair programming con LLMs (Gemini / Claude) para React Native',
                        'Generación de tipados TypeScript y boilerplate de Expo',
                        'Debugging asistido de errores nativos en la consola Metro',
                        'Refactoring y buenas prácticas asistidas por IA'
                    ],
                    preset: 'router',
                    simulatorTag: 'Explorar'
                }
            ]
        }
    ];

    const bibliografiaLibros = [
        {
            titulo: 'Learning React Native: Building Native Mobile Apps with JavaScript',
            autor: 'Bonnie Eisenman',
            editorial: "O'Reilly Media",
            año: '2017 (2da Ed.)',
            enlace: 'https://drive.google.com/drive/folders/1hncg2yaLaeh2pYkR6XtptH_cumJroPPQ',
            rol: 'Lectura Base',
            desc: 'Fundamentos de la arquitectura puente, componentes nativos y ciclo de vida de aplicaciones móviles con JavaScript.'
        },
        {
            titulo: 'Learning React: Modern Patterns for Developing React Apps',
            autor: 'Alex Banks & Eve Porcello',
            editorial: "O'Reilly Media",
            año: '2020 (2da Ed.)',
            enlace: 'https://drive.google.com/drive/folders/1hncg2yaLaeh2pYkR6XtptH_cumJroPPQ',
            rol: 'Complementaria',
            desc: 'Patrones funcionales modernos, hooks personalizados y manejo inmutable de estado que aplican directamente a React Native.'
        },
        {
            titulo: 'Diseñando Apps para móviles',
            autor: 'Javier Cuello & José Vittone',
            editorial: 'Edición de autor',
            año: '2013 / Actualizado',
            enlace: 'https://drive.google.com/drive/folders/1hncg2yaLaeh2pYkR6XtptH_cumJroPPQ',
            rol: 'Lectura UX/UI',
            desc: 'Guía esencial en español sobre ergonomía de interfaces móviles, patrones de interacción táctil y zonas de alcance del pulgar.'
        },
        {
            titulo: 'Ingeniería del Software',
            autor: 'Ian Sommerville',
            editorial: 'Pearson Educación',
            año: '2011 (9na Ed.)',
            enlace: 'https://drive.google.com/drive/folders/1hncg2yaLaeh2pYkR6XtptH_cumJroPPQ',
            rol: 'Metodología',
            desc: 'Procesos ágiles, control de versiones, pruebas de software y ciclo de vida para el desarrollo en equipo.'
        },
        {
            titulo: 'Análisis y Diseño de Sistemas',
            autor: 'Kenneth E. Kendall & Julie E. Kendall',
            editorial: 'Pearson Educación',
            año: '2011 (8va Ed.)',
            enlace: 'https://drive.google.com/drive/folders/1hncg2yaLaeh2pYkR6XtptH_cumJroPPQ',
            rol: 'Diseño de Requisitos',
            desc: 'Modelado de requisitos, diagramas de interacción y especificación funcional de sistemas de información.'
        }
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem 4rem' }}>

            {/* HERO DEL CURSO */}
            <header style={{ textAlign: 'center', padding: '3.5rem 0 2.5rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.45rem 1.25rem', background: 'rgba(2,132,199,0.1)', border: '1px solid rgba(2,132,199,0.25)', borderRadius: '999px', color: '#0284c7', fontWeight: 800, fontSize: '0.78rem', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                    <GraduationCap size={16} /> Universidad Nacional de Pilar • Ciclo 2026
                </motion.div>

                <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 1rem', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                    Creación de Aplicaciones Móviles con <span style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>React Native & Expo</span>
                </h1>

                <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', maxWidth: '820px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                    Tecnicatura Universitaria en Desarrollo de Software • <strong>64 hs presenciales/virtuales</strong> + <strong>24 hs de tutoría</strong>.
                    Dictado por el <strong>Lic. Ariel Bulacio</strong>.
                </p>

                {/* Métricas y Datos Clave */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: '#64748b' }}>
                        <Calendar size={16} color="#0284c7" />
                        <span>4 horas semanales</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: '#64748b' }}>
                        <FolderGit2 size={16} color="#10b981" />
                        <span>Proyecto con Git y PRs</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: '#64748b' }}>
                        <Smartphone size={16} color="#8b5cf6" />
                        <span>Expo SDK 51 + Expo Go</span>
                    </div>
                </div>

                {/* Acceso Rápido al Simulador */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                        to="/simulador-react-native"
                        style={{
                            background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                            color: '#fff',
                            textDecoration: 'none',
                            padding: '0.85rem 1.75rem',
                            borderRadius: '14px',
                            fontWeight: 800,
                            fontSize: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            boxShadow: '0 10px 25px rgba(2,132,199,0.35)'
                        }}
                    >
                        <Smartphone size={20} /> Abrir Simulador Móvil en Vivo
                    </Link>

                    <a
                        href="https://drive.google.com/drive/folders/1hncg2yaLaeh2pYkR6XtptH_cumJroPPQ"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            background: '#fff',
                            border: '1px solid #cbd5e1',
                            color: '#1e293b',
                            textDecoration: 'none',
                            padding: '0.85rem 1.5rem',
                            borderRadius: '14px',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Download size={18} /> Carpeta de Bibliografía en Drive
                    </a>
                </div>
            </header>

            {/* BARRA DE PESTAÑAS */}
            <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #e2e8f0', marginBottom: '2.5rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[
                    { id: 'unidades', label: 'Programa de Unidades & Clases', icon: <BookOpen size={18} /> },
                    { id: 'proyecto', label: 'Proyecto Integrador Continuo', icon: <Rocket size={18} /> },
                    { id: 'evaluacion', label: 'Régimen de Evaluación', icon: <Award size={18} /> },
                    { id: 'bibliografia', label: 'Bibliografía Oficial', icon: <BookMarked size={18} /> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.9rem 1.4rem',
                            background: 'none',
                            border: 'none',
                            borderBottom: '3px solid',
                            borderColor: selectedTab === tab.id ? '#0284c7' : 'transparent',
                            color: selectedTab === tab.id ? '#0284c7' : '#64748b',
                            fontWeight: selectedTab === tab.id ? '800' : '600',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* TAB 1: UNIDADES Y CLASES */}
            {selectedTab === 'unidades' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {unidades.map(u => (
                        <section key={u.num} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            {/* Cabecera de la Unidad */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                                <span style={{ padding: '0.35rem 0.85rem', background: u.color, color: '#fff', borderRadius: '8px', fontWeight: 900, fontSize: '0.78rem', letterSpacing: '1px' }}>
                                    {u.num}
                                </span>
                                <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 900, margin: 0, color: '#0f172a' }}>
                                    {u.title}
                                </h2>
                            </div>
                            <p style={{ color: '#64748b', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '850px' }}>
                                {u.desc}
                            </p>

                            {/* Grilla de Clases */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                                {u.clases.map(c => (
                                    <div
                                        key={c.code}
                                        style={{
                                            background: '#f8fafc',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '16px',
                                            padding: '1.5rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            gap: '1rem'
                                        }}
                                    >
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: u.color }}>CLASE {c.code}</span>
                                                <Link
                                                    to={`/simulador-react-native?preset=${c.preset}`}
                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: '800', color: '#0284c7', background: 'rgba(2,132,199,0.08)', padding: '3px 8px', borderRadius: '6px', textDecoration: 'none' }}
                                                >
                                                    <Smartphone size={12} /> {c.simulatorTag}
                                                </Link>
                                            </div>

                                            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.75rem', color: '#1e293b' }}>
                                                {c.name}
                                            </h3>

                                            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.85rem', lineHeight: 1.6 }}>
                                                {c.topics.map((t, idx) => (
                                                    <li key={idx} style={{ marginBottom: '4px' }}>{t}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                                            <Link
                                                to={`/simulador-react-native?preset=${c.preset}`}
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: '700', color: u.color, textDecoration: 'none' }}
                                            >
                                                <span>Experimentar código</span>
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </motion.div>
            )}

            {/* TAB 2: PROYECTO INTEGRADOR */}
            {selectedTab === 'proyecto' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <Rocket size={28} color="#0284c7" />
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: '#0f172a' }}>
                                Proyecto Integrador Continuo
                            </h2>
                        </div>

                        <p style={{ color: '#475569', lineHeight: 1.65, fontSize: '1rem', maxWidth: '800px', marginBottom: '2rem' }}>
                            Los alumnos desarrollarán una aplicación móvil completa en grupos de 2 a 3 integrantes a lo largo de todo el cuatrimestre, aplicando la metodología <strong>PBL (Project-Based Learning)</strong> con flujo real de trabajo en GitHub (ramas, Pull Requests y Code Reviews).
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0284c7', background: 'rgba(2,132,199,0.1)', padding: '3px 8px', borderRadius: '6px' }}>FASE 1 • SEMANA 4</span>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.6rem 0', color: '#1e293b' }}>Estructura & Navegación</h3>
                                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                                    Repositorio en GitHub, arquitectura de carpetas, Expo Router con tabs y stack funcional, maquetado con Flexbox y datos mock en FlatList.
                                </p>
                            </div>

                            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '3px 8px', borderRadius: '6px' }}>FASE 2 • SEMANA 8</span>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.6rem 0', color: '#1e293b' }}>Estado & Formularios Zod</h3>
                                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                                    Integración de Zustand para estado global, formularios validados con Zod, manejo de teclado móvil y acceso a un sensor nativo (cámara o GPS).
                                </p>
                            </div>

                            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', padding: '3px 8px', borderRadius: '6px' }}>FASE 3 • SEMANA 14</span>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.6rem 0', color: '#1e293b' }}>Firebase & Demo Day</h3>
                                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                                    Autenticación, persistencia en Firestore en tiempo real, microanimaciones con Reanimated, generación de APK con EAS y presentación en vivo.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* TAB 3: RÉGIMEN DE EVALUACIÓN */}
            {selectedTab === 'evaluacion' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <Award size={28} color="#0284c7" />
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: '#0f172a' }}>
                                Criterios y Régimen de Aprobación
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0284c7', margin: '0 0 0.5rem' }}>
                                    ⭐ Promoción Directa
                                </h3>
                                <ul style={{ paddingLeft: '1.2rem', color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                                    <li>Asistencia mínima del <strong>75%</strong> a clases.</li>
                                    <li>Calificación mínima de <strong>7 (siete)</strong> puntos en el Parcial 1 (individual escrito).</li>
                                    <li>Calificación mínima de <strong>7 (siete)</strong> puntos en el Parcial 2 (Proyecto Integrador y Demo Day).</li>
                                    <li>Aprobación del 100% de las entregas de laboratorio y Pull Requests.</li>
                                </ul>
                            </div>

                            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981', margin: '0 0 0.5rem' }}>
                                    📋 Regularidad y Examen Final
                                </h3>
                                <ul style={{ paddingLeft: '1.2rem', color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                                    <li>Asistencia mínima del <strong>70%</strong>.</li>
                                    <li>Calificación entre <strong>4 (cuatro) y 6 (seis)</strong> puntos en instancias evaluativas.</li>
                                    <li>Derecho a rendir examen final integrador en las fechas ordinarias de la UNPilar.</li>
                                    <li>Instancia de recuperación para cada examen parcial.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* TAB 4: BIBLIOGRAFÍA OFICIAL */}
            {selectedTab === 'bibliografia' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(2,132,199,0.05)', border: '1px solid rgba(2,132,199,0.2)', borderRadius: '20px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.15rem', fontWeight: 800, color: '#0284c7' }}>
                                📁 Repositorio de Libros en Google Drive
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
                                Todos los libros de la cátedra digitalizados para libre consulta de los estudiantes.
                            </p>
                        </div>
                        <a
                            href="https://drive.google.com/drive/folders/1hncg2yaLaeh2pYkR6XtptH_cumJroPPQ"
                            target="_blank"
                            rel="noreferrer"
                            style={{ background: '#0284c7', color: '#fff', textDecoration: 'none', padding: '0.6rem 1.25rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                        >
                            <ExternalLink size={16} /> Abrir Carpeta Google Drive
                        </a>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                        {bibliografiaLibros.map((b, idx) => (
                            <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.72rem', fontWeight: '800', background: '#f1f5f9', color: '#0284c7', padding: '2px 8px', borderRadius: '4px' }}>
                                            {b.rol}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{b.año}</span>
                                    </div>

                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#0f172a' }}>
                                        {b.titulo}
                                    </h4>
                                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.75rem' }}>
                                        {b.autor} • {b.editorial}
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                                        {b.desc}
                                    </p>
                                </div>

                                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                                    <a
                                        href={b.enlace}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0284c7', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                                    >
                                        <span>Consultar en Google Drive</span>
                                        <ExternalLink size={13} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* CALL TO ACTION INFERIOR */}
            <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '2.5rem', background: 'linear-gradient(135deg, #090e1a 0%, #030712 100%)', color: '#fff', borderRadius: '24px', border: '1px solid #1e293b' }}>
                <Smartphone size={36} color="#38bdf8" style={{ marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.5rem' }}>
                    ¿Listo para poner a prueba el código?
                </h3>
                <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Ingresa al simulador interactivo para probar Flexbox, estados, navegación Expo Router, validación Zod y conexión Firebase en tiempo real.
                </p>
                <Link
                    to="/simulador-react-native"
                    style={{
                        background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.85rem 2rem',
                        borderRadius: '12px',
                        fontWeight: 800,
                        fontSize: '1rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 10px 25px rgba(2,132,199,0.4)'
                    }}
                >
                    <Sparkles size={18} /> Lanzar Simulador Móvil
                </Link>
            </div>
        </div>
    );
};

export default AplicacionesMoviles;
