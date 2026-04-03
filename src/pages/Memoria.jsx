import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import { 
  Database, Zap, Save, Trash2, Cpu, 
  Layers, HardDrive, Info, ShieldCheck, 
  ChevronRight, RefreshCw, Smartphone, Laptop
} from 'lucide-react';

const C = {
  ram: '#2ed573',
  rom: '#ff4757',
  cache: '#ffa502',
  virtual: '#1e90ff',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc',
  accent: '#a855f7'
};

const MEMORY_QUESTS = [
  { q: '¿Qué tipo de memoria se vacía al apagar la computadora?', opts: ['SSD', 'RAM', 'ROM', 'Disco Duro'], a: 1, exp: 'La RAM es volátil; necesita energía para mantener los datos.' },
  { q: 'En la pirámide de memoria, ¿cuál es el nivel más cercano a la CPU?', opts: ['RAM', 'Disco Rígido', 'Caché L1', 'SSD'], a: 2, exp: 'La Caché L1 está integrada en el mismo núcleo del procesador.' },
  { q: '¿Qué significa ROM?', opts: ['Random Only Memory', 'Read Only Memory', 'Return Operating Memory', 'Rapid Online Monitor'], a: 1, exp: 'Read Only Memory es memoria de solo lectura que mantiene el firmware.' },
  { q: '¿Para qué sirve la Memoria Virtual?', opts: ['Para acelerar internet', 'Para simular más RAM usando el disco rígido', 'Para mejorar los gráficos', 'Para borrar la caché'], a: 1, exp: 'El SO usa el disco como extensión de la RAM cuando esta se llena.' },
  { q: '¿Qué tecnología de almacenamiento es más rápida?', opts: ['HDD (Disco Mecánico)', 'NVMe SSD', 'Cinta Magnética', 'CD-ROM'], a: 1, exp: 'Los SSD NVMe usan el bus PCIe para velocidades ultra-altas.' },
  { q: 'La cercanía física al núcleo importa porque:', opts: ['Se ve más lindo', 'Reduce la latencia de las señales eléctricas', 'Ayuda a enfriar', 'No importa'], a: 1, exp: 'Menor distancia significa menor tiempo de viaje de la señal.' }
];

const Memoria = () => {
  const [activeTab, setActiveTab] = useState('piramide');
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const tabs = [
    { id: 'piramide', label: 'Jerarquía', icon: <Layers size={18} /> },
    { id: 'ramrom', label: 'RAM vs ROM', icon: <Database size={18} /> },
    { id: 'cache', label: 'Caché / Virtual', icon: <Cpu size={18} /> }
  ];

  return (
    <LockedContent keyword="almacenamiento" title="Clase 4: Gestión de Memoria" unit={2}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: C.text }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: `linear-gradient(to right, ${C.accent}, ${C.virtual})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Gestión y Jerarquía de Memoria
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde la velocidad lumínica de los registros hasta la persistencia masiva de los discos. El arte de equilibrar costo y rendimiento.
            </p>
          </motion.div>
        </header>

        {/* Navegación por Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ 
                padding: '1rem 1.8rem', borderRadius: '22px', border: 'none', cursor: 'pointer', fontWeight: 800,
                background: activeTab === tab.id ? C.accent : 'rgba(255,255,255,0.03)',
                color: activeTab === tab.id ? '#fff' : '#64748b',
                transition: '0.3s', display: 'flex', alignItems: 'center', gap: '0.75rem'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido Dinámico */}
        <div style={{ minHeight: '500px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'piramide' && (
              <motion.div key="pir" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: C.accent, marginBottom: '1.5rem' }}>La Pirámide</h2>
                      <p style={{ lineHeight: 1.8, color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                        No existe una memoria perfecta que sea infinita, barata y ultra-rápida. Por eso, las computadoras usan una estructura de niveles.
                      </p>
                      <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                          { l: 'Registros', d: 'Dentro de la CPU (Costo ↑↑, Vel ↑↑)', c: C.rom },
                          { l: 'Caché L1/L2', d: 'SRAM ultra-rápida (Vel ↑)', c: C.cache },
                          { l: 'RAM Principal', d: 'DRAM (Vel Media, Volátil)', c: C.ram },
                          { l: 'Almacenamiento', d: 'SSD/HDD (Vel ↓, Permanente)', c: C.virtual }
                        ].map((layer, i) => (
                          <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: layer.c }} />
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{layer.l}</div>
                              <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{layer.d}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                      {[
                        { w: '40%', bg: C.rom, l: 'CPU / Registros' },
                        { w: '60%', bg: C.cache, l: 'Caché Levels' },
                        { w: '80%', bg: C.ram, l: 'RAM (DRAM)' },
                        { w: '100%', bg: C.virtual, l: 'SSD / HDD' }
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ width: 0 }}
                          animate={{ width: item.w }}
                          style={{ background: item.bg, height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden' }}
                        >
                          {item.l}
                        </motion.div>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '1.5rem', opacity: 0.3, fontSize: '0.7rem', fontWeight: 900 }}>
                        <span>VELOCIDAD / COSTO ↑</span>
                        <span>CAPACIDAD / PERSISTENCIA ↑</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ramrom' && (
              <motion.div key="rr" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                  <div style={{ background: C.card, padding: '3.5rem', borderRadius: '45px', borderBottom: `8px solid ${C.ram}` }}>
                    <div style={{ background: C.ram + '15', color: C.ram, padding: '1.25rem', borderRadius: '25px', width: 'fit-content', marginBottom: '2rem' }}>
                      <RefreshCw size={32} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>RAM (DRAM)</h2>
                    <p style={{ lineHeight: 1.8, color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
                      Es el escritorio de trabajo. Aquí residen el código y los datos de las aplicaciones que estás usando <strong>ahora mismo</strong>.
                    </p>
                    <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: '1rem' }}>
                      <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.95rem' }}><Zap size={16} color={C.ram} /> <strong>Volátil:</strong> Si se corta la luz, los datos se borran.</li>
                      <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.95rem' }}><Activity size={16} color={C.ram} /> <strong>Acceso Aleatorio:</strong> Se lee igual de rápido en cualquier celda.</li>
                    </ul>
                  </div>

                  <div style={{ background: C.card, padding: '3.5rem', borderRadius: '45px', borderBottom: `8px solid ${C.rom}` }}>
                    <div style={{ background: C.rom + '15', color: C.rom, padding: '1.25rem', borderRadius: '25px', width: 'fit-content', marginBottom: '2rem' }}>
                      <ShieldCheck size={32} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>EEPROM / Flash</h2>
                    <p style={{ lineHeight: 1.8, color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
                      Es la memoria a largo plazo. Guarda el firmware (BIOS/UEFI) y tus archivos permanentes de forma segura.
                    </p>
                    <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: '1rem' }}>
                      <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.95rem' }}><Save size={16} color={C.rom} /> <strong>Persistente:</strong> Los datos se mantienen sin energía.</li>
                      <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.95rem' }}><Terminate size={16} color={C.rom} /> <strong>Firmware:</strong> Esencial para el arranque vital del sistema.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'cache' && (
              <motion.div key="cv" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div style={{ background: '#000', padding: '4rem', borderRadius: '50px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '35px', borderLeft: `8px solid ${C.cache}` }}>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', color: C.cache }}>El Cuello de Botella</h3>
                      <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.05rem', margin: 0 }}>
                        La CPU es billones de veces más rápida que la RAM. Para que el procesador no pierda tiempo esperando, se usa la <strong>Caché</strong>: pequeñas memorias de silicio dentro del propio chip CPU.
                      </p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '35px', borderLeft: `8px solid ${C.virtual}` }}>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', color: C.virtual }}>Memoria Virtual</h3>
                      <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.05rem', margin: 0 }}>
                        Cuando la RAM se llena, el Sistema Operativo usa parte del SSD para simular memoria física. Es un salvavidas que permite correr programas pesados, pero a costa de mucha lentitud.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Evaluación */}
        <section style={{ marginTop: '6rem', background: C.card, padding: '4rem', borderRadius: '50px', border: `2px solid ${C.accent}40`, boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
          {!quizStarted ? (
            <div style={{ textAlign: 'center' }}>
              <Database size={56} color={C.accent} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontWeight: 900 }}>Desafío de Memoria</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>¿Cómo orquestarías el flujo de datos para evitar cuellos de botella?</p>
              <button 
                onClick={() => setQuizStarted(true)} 
                style={{ 
                  background: C.accent, color: '#fff', border: 'none', 
                  padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem',
                  boxShadow: `0 15px 30px ${C.accent}30`
                }}
              >
                Iniciar Evaluación
              </button>
            </div>
          ) : finished ? (
            <div style={{ textAlign: 'center' }}>
              <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>{score} / {MEMORY_QUESTS.length}</motion.h2>
              <p style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '3rem' }}>{score >= 5 ? '🎓 ¡Nivel Administrador alcanzado!' : '📚 Sigue estudiando la topología de memoria.'}</p>
              <button onClick={() => { setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0); setChosen(null); }} style={{ background: C.accent, color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>Reiniciar Sesión</button>
            </div>
          ) : (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: C.accent, fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span>CELDA {qIdx + 1} / {MEMORY_QUESTS.length}</span>
                <span>SCO: {score}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '3.5rem', lineHeight: 1.5, fontWeight: 800 }}>{MEMORY_QUESTS[qIdx].q}</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {MEMORY_QUESTS[qIdx].opts.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => { if(chosen === null) { setChosen(i); if(i === MEMORY_QUESTS[qIdx].a) setScore(s => s + 1); } }}
                    style={{ 
                      padding: '1.8rem', textAlign: 'left', borderRadius: '25px', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                      background: chosen === i ? (i === MEMORY_QUESTS[qIdx].a ? '#22c55e' : '#ff4757') : (chosen !== null && i === MEMORY_QUESTS[qIdx].a ? '#22c55e' : 'transparent'),
                      color: '#fff',
                      transition: '0.3s'
                    }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
              <AnimatePresence>
                {chosen !== null && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '4rem', padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', borderLeft: `10px solid ${C.accent}` }}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.15rem', color: '#94a3b8' }}>{MEMORY_QUESTS[qIdx].exp}</p>
                    <button onClick={() => { if(qIdx + 1 < MEMORY_QUESTS.length) { setQIdx(qIdx + 1); setChosen(null); } else { setFinished(true); } }} style={{ background: C.accent, color: '#fff', width: '100%', border: 'none', padding: '1.5rem', borderRadius: '25px', fontWeight: 900, marginTop: '3rem', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {qIdx + 1 < MEMORY_QUESTS.length ? 'Siguiente Celda' : 'Finalizar Evaluación'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>
    </LockedContent>
  );
};

export default Memoria;
