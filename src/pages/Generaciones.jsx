import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import { 
  History, Milestone, Cpu, Zap, Activity, Info, 
  Database, Server, Globe, Bot, Play, RefreshCw, BarChart, HardDrive
} from 'lucide-react';
import '../styles/GeneracionesSim.css';

// ─── QUIZ DATA (Standard 20 questions) ───────────────────────────────
const GEN_QUESTS = [
  { q: '¿Qué componente electrónico usaba la primera generación de computadoras?', opts: ['Transistores', 'Circuitos Integrados', 'Válvulas de vacío', 'Microchips'], a: 2, exp: 'Eran enormes, generaban mucho calor y se quemaban frecuentemente.' },
  { q: '¿Cuál fue el invento que dio inicio a la segunda generación?', opts: ['Pantalla táctil', 'El transistor (1947)', 'El mouse', 'El diskette'], a: 1, exp: 'El transistor reemplazó a las válvulas, siendo más pequeño, rápido y frío.' },
  { q: 'La tercera generación se caracteriza por el uso de:', opts: ['Válvulas', 'Inteligencia Artificial', 'Circuitos Integrados (Chips)', 'Redes sociales'], a: 2, exp: 'Permitieron meter cientos de componentes en una sola pieza de silicio.' },
  { q: 'El microprocesador define a la:', opts: ['Primera Gen', 'Segunda Gen', 'Tercera Gen', 'Cuarta Generación'], a: 3, exp: 'Nació con el Intel 4004 (1971), integrando todo el CPU en un solo chip.' },
  { q: '¿Cuál de estas fue una de las primeras computadoras programables electrónicas?', opts: ['Macintosh', 'Commodore 64', 'ENIAC', 'Deep Blue'], a: 2, exp: 'ENIAC (1946) ocupaba una habitación entera y usaba miles de válvulas.' },
  { q: '¿Quién es considerada la primera programadora de la historia?', opts: ['Grace Hopper', 'Ada Lovelace', 'Bill Gates', 'Alan Turing'], a: 1, exp: 'Escribió el primer algoritmo para la Máquina Analítica de Babbage.' },
  { q: 'La Quinta Generación se enfoca principalmente en:', opts: ['Hacer computadoras más grandes', 'IA, computación cuántica y procesamiento paralelo', 'Usar más transistores', 'Borrar Internet'], a: 1, exp: 'Busca imitar el razonamiento humano y manejar problemas masivos.' },
  { q: '¿Qué dice la Ley de Moore?', opts: ['Que el precio baja cada mes', 'Que la cantidad de transistores en un chip se duplica cada 2 años aprox.', 'Que todo software falla', 'Que la batería dura menos'], a: 1, exp: 'Ha sido la regla que ha impulsado el avance tecnológico por décadas.' },
  { q: '¿Cuál fue el precursor de Internet nacido en la era de los mainframes?', opts: ['Google', 'Facebook', 'ARPANET', 'Netflix'], a: 2, exp: 'Creado por el Departamento de Defensa de EE.UU. en los 60s.' },
  { q: 'Jack Kilby y Robert Noyce son famosos por inventar:', opts: ['El mouse', 'El Circuito Integrado', 'El monitor de color', 'El teclado'], a: 1, exp: 'Kilby de TI y Noyce de Fairchild/Intel lo inventaron casi simultáneamente en 1958.' },
  { q: 'La "Pascalina" era una máquina:', opts: ['Electrónica', 'Mecánica de suma y resta', 'De vapor', 'De aire'], a: 1, exp: 'Inventada por Blaise Pascal en el siglo XVII.' },
  { q: 'Herman Hollerith diseñó la máquina tabuladora para el censo de EE.UU. usando:', opts: ['Discos rígidos', 'Tarjetas perforadas', 'Niveles de agua', 'Luz láser'], a: 1, exp: 'Su empresa fue una de las que luego formaría IBM.' },
  { q: '¿En qué generación aparecieron por primera vez los Sistemas Operativos?', opts: ['1ra', '2da', '3ra', '4ta'], a: 2, exp: 'Con el O/S 360 de IBM en la era de los circuitos integrados.' },
  { q: 'El primer lenguaje de alto nivel ampliamente usado fue:', opts: ['Python', 'JavaScript', 'FORTRAN', 'Java'], a: 2, exp: 'Surgió a finales de los 50 para cálculos científicos e ingeniería.' },
  { q: '¿Qué invento de Xerox PARC revolucionó el uso de las computadoras en la 4ta Gen?', opts: ['La impresora', 'La Interfaz Gráfica de Usuario (GUI) y el mouse', 'El cable de red', 'El escáner'], a: 1, exp: 'Apple y Microsoft luego popularizaron estas ideas en el Macintosh y Windows.' },
  { q: '¿Cuál era el principal problema de las computadoras de 1ra Generación?', opts: ['No tenían juegos', 'Su gran tamaño, alto consumo y frecuentes fallas de las válvulas', 'Eran muy baratas', 'No tenían teclado'], a: 1, exp: 'Literalmente atraían "bugs" (bichos) que causaban cortocircuitos.' },
  { q: 'La tecnología VLSI (Very Large Scale Integration) permitió:', opts: ['Instalar Windows XP', 'Poner miles de transistores en un chip de la 4ta Gen', 'Limpiar el monitor', 'Tener Wi-Fi'], a: 1, exp: 'Fue la evolución que permitió el nacimiento del microprocesador moderno.' },
  { q: '¿Qué computadora lideró el inicio de la computación personal hogareña en 1975?', opts: ['iPhone', 'IBM PC', 'Altair 8800', 'NASA Apollo Computer'], a: 2, exp: 'Se vendía como un kit para armar y usaba el Intel 8080.' },
  { q: 'Alan Turing es conocido mundialmente por:', opts: ['Vender computadoras', 'Sentar las bases teóricas de la computación e IA', 'Pintar cuadros', 'Inventar el Wi-Fi'], a: 1, exp: 'Su máquina teórica define qué es lo que una computadora puede o no puede calcular.' },
  { q: '¿Qué caracteriza la arquitectura Neuman-Ullman o computación actual?', opts: ['Unidad de control, memoria y ALU separados', 'Todo mezclado', 'Solo memoria', 'Uso de vapor'], a: 0, exp: 'Es el modelo estándar que seguimos usando desde hace 70 años.' }
];

// ─── RECONSTRUCTED SIMULATORS ──────────────────────────────────────────

const SimulacionValvulas = () => {
  const [encendidas, setEncendidas] = useState([true, false, true, false, true, false]);
  useEffect(() => {
    const interval = setInterval(() => {
      setEncendidas((prev) => prev.map(() => Math.random() > 0.4));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sim-container">
      <h4 className="sim-title">🔌 Laboratorio: Válvulas de Vacío (1945)</h4>
      <p className="sim-desc">Cada válvula actúa como interruptor electrónico. ENIAC usaba 18,000 para procesar 1 y 0.</p>
      <div className="valvulas-grid">
        {encendidas.map((on, i) => (
          <div key={i} className={`valvula ${on ? 'valvula-on' : 'valvula-off'}`} onClick={() => setEncendidas(prev => prev.map((v, idx) => idx === i ? !v : v))}>
            <div className="valvula-tubo">
              <div className="valvula-filamento" style={{ opacity: on ? 1 : 0.1 }} />
              <div className="valvula-glow" style={{ opacity: on ? 1 : 0 }} />
            </div>
            <div className="valvula-bit">{on ? '1' : '0'}</div>
          </div>
        ))}
      </div>
      <p className="sim-info">Valor Binario actual: <strong>{encendidas.map(v => v ? '1' : '0').join('')}</strong></p>
    </div>
  );
};

const SimulacionTransistor = () => {
  const [voltaje, setVoltaje] = useState(0.3);
  const estaEncendido = voltaje >= 0.7;
  return (
    <div className="sim-container">
      <h4 className="sim-title">🔬 Laboratorio: El Transistor (1956)</h4>
      <p className="sim-desc">Controla el flujo de electrones. Supera el umbral de 0.7V para cerrar el circuito (BIT 1).</p>
      <div className="transistor-diagram">
        <div className="trans-wire" style={{ background: estaEncendido ? '#f59e0b' : '#334155' }} />
        <div className="trans-chip" style={{ boxShadow: estaEncendido ? '0 0 30px #f59e0b' : 'none' }}>PNP</div>
        <div className="trans-wire" style={{ background: estaEncendido ? '#f59e0b' : '#334155' }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <input type="range" min="0" max="1.2" step="0.1" value={voltaje} onChange={(e) => setVoltaje(parseFloat(e.target.value))} style={{ width: '100%', maxWidth: '300px' }} />
        <p style={{ fontWeight: 800, color: estaEncendido ? '#f59e0b' : '#64748b', marginTop: '1rem' }}>
          Voltaje: {voltaje.toFixed(1)}V - {estaEncendido ? '✅ CONDUCIENDO (1)' : '❌ CORTE (0)'}
        </p>
      </div>
    </div>
  );
};

const SimulacionChip = () => {
  const info = {
    '4004': { count: 12, color: '#3b82f6', label: '2.300 transistores (1971)' },
    'M1': { count: 30, color: '#8b5cf6', label: '16.000 Millones (2020)' }
  };
  const [mode, setMode] = useState('4004');
  return (
    <div className="sim-container">
      <h4 className="sim-title">🔧 Evolución del Microchip (VLSI)</h4>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={() => setMode('4004')} className="sim-btn" style={{ background: mode === '4004' ? '#3b82f6' : '#1e293b' }}>Intel 4004</button>
        <button onClick={() => setMode('M1')} className="sim-btn" style={{ background: mode === 'M1' ? '#8b5cf6' : '#1e293b' }}>Apple M1</button>
      </div>
      <div className="chip-visual">
         <div className="chip-body" style={{ borderColor: info[mode].color, gridTemplateColumns: `repeat(${info[mode].count}, 1fr)` }}>
            {Array.from({ length: info[mode].count ** 2 }).map((_, i) => (
              <div key={i} className="chip-cell" style={{ '--chip-color': info[mode].color }} />
            ))}
         </div>
         <p style={{ fontWeight: 800, color: info[mode].color }}>{info[mode].label}</p>
      </div>
    </div>
  );
};

const SimulacionQuantum = () => {
  const [angle, setAngle] = useState(0);
  const [measured, setMeasured] = useState(null);
  useEffect(() => {
    if (measured === null) {
      const interval = setInterval(() => setAngle(a => (a + 5) % 360), 30);
      return () => clearInterval(interval);
    }
  }, [measured]);
  return (
    <div className="sim-container" style={{ border: '1px solid #00f2ff30' }}>
      <h4 className="sim-title" style={{ color: '#00f2ff' }}>⚛️ Qubit: Superposición Cuántica</h4>
      <p className="sim-desc">Hasta que no lo mides, el qubit es 1 y 0 al mismo tiempo.</p>
      <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {measured === null ? (
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px dashed #00f2ff', animation: 'spin 2s linear infinite', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 900, color: '#00f2ff' }}>Ψ</div>
          </div>
        ) : (
          <div style={{ fontSize: '3rem', fontWeight: 900, color: '#00f2ff' }}>|{measured}⟩</div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={() => setMeasured(Math.random() > 0.5 ? 1 : 0)} className="sim-btn" style={{ background: '#00f2ff', color: '#000' }}>Medir Qubit</button>
        <button onClick={() => setMeasured(null)} className="sim-btn" style={{ background: 'transparent', border: '1px solid #00f2ff', color: '#00f2ff' }}>Reset</button>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ───────────────────────────────────────────────────────

const Generaciones = () => {
  const [activeTab, setActiveTab] = useState(0);

  const GEN_DATA = [
    { 
      id: 1, 
      gen: '1ra Generación', 
      year: '1940-1956', 
      tech: 'Válvula de Vacío', 
      icon: <Zap />, 
      component: <SimulacionValvulas />, 
      color: '#f59e0b',
      desc: 'Computadoras del tamaño de una casa (ENIAC/UNIVAC). Programadas en lenguaje de máquina puro. Uso de tarjetas perforadas.',
      stats: [
        { label: 'Tamaño', valor: '~167 m²', icon: '📐' },
        { label: 'Peso', valor: '~27 toneladas', icon: '⚖️' },
        { label: 'Consumo', valor: '150 kW', icon: '⚡' },
        { label: 'Velocidad', valor: '5.000 op/seg', icon: '🚀' },
      ],
      curiosidad: '¡La ENIAC necesitaba 18.000 válvulas de vacío! Cuando una fallaba, toda la computadora se detenía.'
    },
    { 
      id: 2, 
      gen: '2da Generación', 
      year: '1956-1963', 
      tech: 'Transistores', 
      icon: <Milestone />, 
      component: <SimulacionTransistor />, 
      color: '#3b82f6',
      desc: 'Menor tamaño y calor. Aparecen COBOL y FORTRAN. Nace el concepto de memoria científica y los primeros mainframes.',
      stats: [
        { label: 'Tamaño', valor: 'Habitación', icon: '📐' },
        { label: 'Peso', valor: '~1 tonelada', icon: '⚖️' },
        { label: 'Consumo', valor: '~5 kW', icon: '⚡' },
        { label: 'Velocidad', valor: '1 M op/seg', icon: '🚀' },
      ],
      curiosidad: 'Los transistores son 1.000 veces más pequeños que las válvulas de vacío y consumen 100 veces menos energía.'
    },
    { 
      id: 3, 
      gen: '3ra Generación', 
      year: '1964-1971', 
      tech: 'Circuitos Integrados', 
      icon: <Cpu />, 
      component: <SimulacionChip />, 
      color: '#8b5cf6',
      desc: 'Pastillas de silicio con múltiples transistores. Aparece el monitor, teclado y sistemas operativos.',
      stats: [
        { label: 'Tamaño', valor: 'Escritorio grande', icon: '📐' },
        { label: 'Peso', valor: '~100 kg', icon: '⚖️' },
        { label: 'Consumo', valor: '~500 W', icon: '⚡' },
        { label: 'Velocidad', valor: '10 M op/seg', icon: '🚀' },
      ],
      curiosidad: 'Un solo chip integrado podía reemplazar docenas de transistores discretos. Nace la familia IBM 360.'
    },
    { 
      id: 4, 
      gen: '4ta Generación', 
      year: '1971-Presente', 
      tech: 'Microprocesadores', 
      icon: <Database />, 
      component: <SimulacionChip />, 
      color: '#ec4899',
      desc: 'Nace la PC personal. Integración VLSI. Llegan las GUIs, Internet y la conexión global móvil.',
      stats: [
        { label: 'Tamaño', valor: 'Bolsillo / PC', icon: '📐' },
        { label: 'Peso', valor: 'Gramos', icon: '⚖️' },
        { label: 'Consumo', valor: '5 W – 300 W', icon: '⚡' },
        { label: 'Velocidad', valor: 'GHz (miles de M)', icon: '🚀' },
      ],
      curiosidad: 'La Ley de Moore predijo que los transistores en un chip se duplicarían cada 2 años. ¡Se cumplió por décadas!'
    },
    { 
      id: 5, 
      gen: '5ta Generación', 
      year: 'Futuro / IA', 
      tech: 'Sist. Inteligentes', 
      icon: <Bot />, 
      component: <SimulacionQuantum />, 
      color: '#00f2ff',
      desc: 'Inteligencia Artificial, procesamiento paralelo masivo y búsqueda del lenguaje natural.',
      stats: [
        { label: 'Paradigma', valor: 'IA + Machine Learning', icon: '🧠' },
        { label: 'Interfaz', valor: 'Voz / Natural', icon: '🗣️' },
        { label: 'Consumo', valor: 'Optimización IA', icon: '⚡' },
        { label: 'Velocidad', valor: 'Petaflops', icon: '🚀' },
      ],
      curiosidad: 'En 1997, Deep Blue venció a Kasparov en ajedrez. Hoy, modelos como GPT-4 imitan el razonamiento humano.'
    },
    { 
      id: 6, 
      gen: 'Generación Futura', 
      year: '2024+', 
      tech: 'C. Cuántica y Bio', 
      icon: <Bot />, 
      component: <SimulacionQuantum />, 
      color: '#2ed573',
      desc: 'Qubits en superposición y computación biológica con ADN. Problemas casi imposibles resueltos en minutos.',
      stats: [
        { label: 'Unidad', valor: 'Qubit (0 y 1 a la vez)', icon: '⚛️' },
        { label: 'Estado', valor: 'Investigación', icon: '🔬' },
        { label: 'Bio-comp', valor: 'ADN como memoria', icon: '🧬' },
        { label: 'Velocidad', valor: 'Exponencial', icon: '🚀' },
      ],
      curiosidad: '¡Usa partículas subatómicas para procesar información a velocidades que desafían la física clásica!'
    }
  ];

  return (
    <LockedContent keyword="valvula" title="Clase 1: El Viaje Evolutivo" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #3b82f6, #00f2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Generaciones de Computadoras
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde las válvulas termoiónicas hasta los qubits entrelazados. Un viaje interactivo por la evolución tecnológica (SimuTec v2.4).
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '3rem' }}>
            <img
              src="/assets/generations_info.png"
              alt="Línea cronológica de generaciones de computadoras"
              style={{ width: '100%', maxWidth: '900px', borderRadius: '30px', boxShadow: '0 20px 60px rgba(59,130,246,0.2)', border: '1.5px solid rgba(59,130,246,0.2)' }}
            />
          </motion.div>
        </header>

        {/* Simuladores Interactivos Seleccionables */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ background: '#1e293b', borderRadius: '45px', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <Activity color="#3b82f6" /> Estaciones de Experimentación
            </h2>
            
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              {GEN_DATA.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  style={{
                    flex: '1', minWidth: '180px', padding: '1.5rem', borderRadius: '25px', background: activeTab === i ? `${g.color}15` : '#0f172a',
                    border: `2px solid ${activeTab === i ? g.color : 'transparent'}`, color: activeTab === i ? g.color : '#64748b', cursor: 'pointer',
                    transition: '0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>{g.icon}</div>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{g.gen}</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{g.tech}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }} 
                transition={{ duration: 0.4 }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2.5rem', alignItems: 'start' }} className="mobile-stack">
                  <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: GEN_DATA[activeTab].color, marginBottom: '1rem' }}>
                      {GEN_DATA[activeTab].gen} ({GEN_DATA[activeTab].year})
                    </h3>
                    <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2rem' }}>
                      {GEN_DATA[activeTab].desc}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                      {GEN_DATA[activeTab].stats.map((s, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: GEN_DATA[activeTab].color, fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                            {s.icon} {s.label}
                          </div>
                          <div style={{ fontSize: '1rem', fontWeight: 700 }}>{s.valor}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ background: `${GEN_DATA[activeTab].color}10`, border: `1px solid ${GEN_DATA[activeTab].color}30`, borderRadius: '20px', padding: '1.5rem', display: 'flex', gap: '1rem' }}>
                      <div style={{ fontSize: '1.5rem' }}>💡</div>
                      <div>
                        <strong style={{ display: 'block', color: GEN_DATA[activeTab].color, marginBottom: '0.25rem' }}>Curiosidad</strong>
                        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{GEN_DATA[activeTab].curiosidad}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ position: 'sticky', top: '100px' }}>
                    {GEN_DATA[activeTab].component}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Resumen Histórico Extendido */}
        <section style={{ marginBottom: '6rem', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '20px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, #3b82f6, transparent)', opacity: 0.3 }} />
          {[
            { gen: '1ra Generación', year: '1940-1956', tech: 'Válvulas', icon: <Zap />, desc: 'Computadoras del tamaño de una casa (ENIAC/UNIVAC). Programadas en lenguaje de máquina puro. Uso de tarjetas perforadas y tambores magnéticos.', color: '#f59e0b' },
            { gen: '2da Generación', year: '1956-1963', tech: 'Transistores', icon: <Milestone />, desc: 'Menor tamaño y calor. Aparecen COBOL y FORTRAN. Nace el concepto de memoria científica y los primeros mainframes comerciales.', color: '#3b82f6' },
            { gen: '3ra Generación', year: '1964-1971', tech: 'Chips (CI)', icon: <Cpu />, desc: 'Circuitos integrados en pastillas de silicio. Nace el monitor, el teclado y los sistemas operativos de tiempo compartido.', color: '#8b5cf6' },
            { gen: '4ta Generación', year: '1971-Presente', tech: 'Microprocesadores', icon: <Database />, desc: 'Nace la PC. Integración VLSI (billones de transistores). Llegan las GUIs, Internet y la conexión global movil.', color: '#ec4899' },
            { gen: '5ta Generación', year: 'Futuro', tech: 'IA y Cuántica', icon: <Bot />, desc: 'Aprendizaje automático profundo, redes neuronales e informática que busca imitar la cognición humana.', color: '#00f2ff' }
          ].map((item, i) => (
            <motion.div key={i} style={{ marginBottom: '3rem', paddingLeft: '4rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '10px', top: '0', width: '25px', height: '25px', borderRadius: '50%', background: item.color, border: '4px solid #0f172a' }} />
              <div style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontWeight: 900, color: item.color }}>{item.gen} ({item.year})</h3>
                <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6 }}>{item.tech}</p>
                <p style={{ margin: 0, color: '#94a3b8', lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <section style={{ marginBottom: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '3rem' }}>
          {[
            { Icon: History, color: '#f59e0b', title: 'Ley de Moore', desc: 'La observación de que la potencia se duplica mientras el tamaño y costo bajan a la mitad cada 2 años. El motor del siglo XX.' },
            { Icon: Globe, color: '#10b981', title: 'Ubicuidad Digital', desc: 'Con la 4ta generación, la informática pasó de laboratorios militares a estar en cada bolsillo y objeto del planeta.' }
          ].map((item, i) => (
            <div key={i} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.04)' }}>
               <item.Icon size={32} color={item.color} style={{ marginBottom: '1.25rem' }} />
               <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
               <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.desc}</p>
            </div>
          ))}
        </section>

        <RepasoClave
          accentColor="#3b82f6"
          title="Historia de la Computación"
          facts={[
            { icon: '💡', term: 'Válvulas (1ª Gen)', def: 'Consumían mucha energía y generaban gran calor. Fallaban constantemente. (1940-1956).' },
            { icon: '⚡', term: 'Transistores (2ª Gen)', def: 'Inventado en Bell Labs. Reemplazó a la válvula por ser frío, rápido y pequeño. Inicio de la computación comercial.' },
            { icon: '🔬', term: 'Circuito Integrado (3ª Gen)', def: 'Pastilla de silicio con múltiples transistores. Permitió miniaturizar computadoras al tamaño de escritorios.' },
            { icon: '🖥️', term: 'Microprocesador (4ª Gen)', def: 'Toda la CPU en un solo chip. Dio inicio a la era de las PCs y la informática personal masiva.' },
            { icon: '🤖', term: 'IA y Quantum (5ª Gen)', def: 'Sistemas que aprenden y qubits que operan en superposición. El límite de la física clásica.' },
            { icon: '📏', term: 'Miniaturización', def: 'Proceso constante de reducción de tamaño. De metros a nanómetros en menos de 70 años.' },
          ]}
        />

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: 'clamp(1.5rem, 4vw, 4rem)', borderRadius: '50px', border: '3px solid #3b82f6', boxShadow: '0 30px 60px rgba(59,130,246,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <History size={52} color="#3b82f6" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Historia y Evolución</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>Certifica tu conocimiento histórico con 20 preguntas aleatorias.</p>
          </div>
          <QuizBlock 
            questions={GEN_QUESTS} 
            accentColor="#3b82f6"
            clase="Clase 1: Evolución"
            unidad="Unidad 1"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default Generaciones;
