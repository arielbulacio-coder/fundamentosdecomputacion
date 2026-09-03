import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
    Smartphone, Code, Cpu, Sparkles, BookOpen, ArrowLeft,
    CheckCircle2, Layers, Zap, Terminal, ExternalLink, HelpCircle
} from 'lucide-react';
import ReactNativeSimulator, { SIMULATOR_PRESETS } from '../components/ReactNativeSimulator';

const SimuladorReactNative = () => {
    const [searchParams] = useSearchParams();
    const initialPreset = searchParams.get('preset') || 'flexbox';
    const [activeTab, setActiveTab] = useState('simulador'); // 'simulador' | 'cheatsheet' | 'arquitectura'

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1rem 4rem' }}>
            {/* Breadcrumb & Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <Link
                    to="/aplicaciones-moviles"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none' }}
                >
                    <ArrowLeft size={16} /> Volver al Programa de Aplicaciones Móviles
                </Link>

                <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
                    <button
                        onClick={() => setActiveTab('simulador')}
                        style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            background: activeTab === 'simulador' ? '#0284c7' : 'transparent',
                            color: activeTab === 'simulador' ? '#fff' : '#64748b'
                        }}
                    >
                        📱 Simulador en Vivo
                    </button>
                    <button
                        onClick={() => setActiveTab('arquitectura')}
                        style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            background: activeTab === 'arquitectura' ? '#0284c7' : 'transparent',
                            color: activeTab === 'arquitectura' ? '#fff' : '#64748b'
                        }}
                    >
                        ⚡ Arquitectura Interna
                    </button>
                    <button
                        onClick={() => setActiveTab('cheatsheet')}
                        style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            background: activeTab === 'cheatsheet' ? '#0284c7' : 'transparent',
                            color: activeTab === 'cheatsheet' ? '#fff' : '#64748b'
                        }}
                    >
                        📖 Guía Rápida de Componentes
                    </button>
                </div>
            </div>

            {/* Encabezado Principal */}
            <header style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(2,132,199,0.1)', border: '1px solid rgba(2,132,199,0.25)', borderRadius: '999px', color: '#0284c7', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <Sparkles size={14} /> Laboratorio Interactivo de Desarrollo Móvil
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem', letterSpacing: '-1px' }}>
                    Simulador React Native & Expo
                </h1>
                <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: '850px', margin: 0, lineHeight: 1.6 }}>
                    Experimenta en tiempo real con componentes nativos, layouts flexibles, navegación Expo Router, formularios validados con Zod, base de datos Firebase y sensores de hardware dentro de un smartphone simulado.
                </p>
            </header>

            {/* TAB CONTENT: SIMULADOR */}
            {activeTab === 'simulador' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <ReactNativeSimulator initialPreset={initialPreset} />

                    {/* Guía Rápida para el Alumno */}
                    <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0284c7', fontWeight: '800', marginBottom: '0.5rem' }}>
                                <Smartphone size={18} />
                                <span>1. Probar en tu propio celular</span>
                            </div>
                            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                                Instala <strong>Expo Go</strong> desde Google Play o App Store. Haz clic en <em>"Abrir en Expo Snack"</em> y escanea el código QR para correr la app en tu teléfono físico sin cables.
                            </p>
                        </div>

                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: '800', marginBottom: '0.5rem' }}>
                                <Terminal size={18} />
                                <span>2. Consola de Depuración</span>
                            </div>
                            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                                Cada acción, toque y cambio de estado dispara eventos en la consola Metro Bundler simulada, mostrando el ciclo de renderizado y las mutaciones.
                            </p>
                        </div>

                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8b5cf6', fontWeight: '800', marginBottom: '0.5rem' }}>
                                <Zap size={18} />
                                <span>3. Proyecto Integrador</span>
                            </div>
                            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                                Combina estos módulos para tu entrega del Parcial 2: autenticación con Firebase, navegación en pestañas y cámara integrada.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* TAB CONTENT: ARQUITECTURA (Bridge vs New Architecture) */}
            {activeTab === 'arquitectura' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>
                            ¿Cómo funciona React Native por dentro?
                        </h2>
                        <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            A diferencia de Flutter (que dibuja sus propios píxeles con Skia o Impeller) o Ionic (que corre dentro de un WebView HTML), <strong>React Native ejecuta componentes 100% nativos del sistema operativo (UIKit en iOS y Android Views en Android)</strong> gobernados por código JavaScript/TypeScript.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                            {/* Arquitectura Clásica */}
                            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', background: '#e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: '6px' }}>HISTÓRICO</span>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.6rem 0 0.4rem', color: '#1e293b' }}>El Puente Asíncrono (The Bridge)</h3>
                                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                                    JavaScript y el código nativo (Java/Obj-C) se comunicaban serializando mensajes JSON a través de un puente asíncrono. En listas con miles de elementos o animaciones complejas, este puente podía congestionarse causando caídas de frames.
                                </p>
                            </div>

                            {/* Nueva Arquitectura */}
                            <div style={{ background: 'rgba(2,132,199,0.04)', border: '1px solid #0284c7', borderRadius: '14px', padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', background: '#0284c7', color: '#fff', padding: '2px 8px', borderRadius: '6px' }}>NUEVA ARQUITECTURA (ACTUAL)</span>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.6rem 0 0.4rem', color: '#0284c7' }}>JSI, Hermes & Fabric</h3>
                                <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                                    <strong>JavaScript Interface (JSI):</strong> Permite que JavaScript sostenga referencias a objetos nativos C++ en memoria y los invoque directamente de forma síncrona sin serializar JSON.
                                    <br /><br />
                                    <strong>Hermes:</strong> Motor JS optimizado por Meta para arranque instantáneo y mínimo consumo de RAM.
                                    <br /><br />
                                    <strong>Fabric Render & TurboModules:</strong> Renderizador nativo concurrente y carga bajo demanda de módulos nativos.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* TAB CONTENT: CHEATSHEET */}
            {activeTab === 'cheatsheet' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { tag: 'View', equiv: 'div', desc: 'Contenedor universal con flexbox habilitado por defecto.' },
                        { tag: 'Text', equiv: 'span / p', desc: 'En RN todo texto DEBE ir dentro de un componente <Text> obligatoriamente.' },
                        { tag: 'TextInput', equiv: 'input', desc: 'Campo de texto con control de teclado numérico, email o contraseña.' },
                        { tag: 'TouchableOpacity', equiv: 'button', desc: 'Elemento táctil con respuesta de opacidad al presionar.' },
                        { tag: 'FlatList', equiv: 'ul / virtual scroll', desc: 'Lista virtualizada con memoria reciclable de alto rendimiento.' },
                        { tag: 'Image', equiv: 'img', desc: 'Carga de imágenes locales con require() o remotas con source={{ uri }}.' },
                        { tag: 'ScrollView', equiv: 'div con scroll', desc: 'Contenedor con desplazamiento simple para pantallas con poco contenido.' },
                        { tag: 'KeyboardAvoidingView', equiv: 'Nativo', desc: 'Ajusta la interfaz cuando el teclado virtual del teléfono se abre.' },
                    ].map(c => (
                        <div key={c.tag} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <code style={{ fontSize: '1rem', fontWeight: '800', color: '#0284c7', background: 'rgba(2,132,199,0.08)', padding: '2px 8px', borderRadius: '6px' }}>&lt;{c.tag} /&gt;</code>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Web: &lt;{c.equiv}&gt;</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>{c.desc}</p>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default SimuladorReactNative;
