import React, { useState, useEffect, useRef } from 'react';
import './Generaciones.css';

const GENERACIONES = [
  {
    id: 1,
    nombre: '1ª Generación',
    periodo: '1940 – 1956',
    tecnologia: 'Válvulas de Vacío',
    color: '#004a99',
    glow: 'rgba(0,74,153,0.4)',
    emoji: '💡',
    icon: 'ENIAC',
    descripcion:
      'Computadoras que utilizaban tubos de vacío como interruptores electrónicos. Eran enormes, consumían cantidades masivas de energía y generaban mucho calor. Se programaban en lenguaje de máquina.',
    datos: [
      { label: 'Tamaño', valor: '~167 m²', icon: '📐' },
      { label: 'Peso', valor: '~27 toneladas', icon: '⚖️' },
      { label: 'Consumo', valor: '150 kW', icon: '⚡' },
      { label: 'Velocidad', valor: '5.000 op/seg', icon: '🚀' },
      { label: 'Memoria', valor: 'Tarjetas perforadas', icon: '💾' },
    ],
    ejemplos: ['ENIAC (1945)', 'EDVAC', 'IBM 701'],
    curiosidad: '¡La ENIAC necesitaba 18.000 válvulas! Atribuido a Grace Hopper, el término "bug" se popularizó en esta era al encontrar una polilla en un relé.',
    simulacion: 'valvulas'
  },
  {
    id: 2,
    nombre: '2ª Generación',
    periodo: '1956 – 1964',
    tecnologia: 'Transistores',
    color: '#0066cc',
    glow: 'rgba(0,102,204,0.4)',
    emoji: '🔬',
    icon: 'IBM 1401',
    descripcion:
      'El transistor reemplazó a las válvulas de vacío. Fue un salto masivo en confiabilidad y reducción de tamaño. Aparecen los lenguajes de alto nivel como COBOL y FORTRAN.',
    datos: [
      { label: 'Tamaño', valor: 'Habitación', icon: '📐' },
      { label: 'Peso', valor: '~1 tonelada', icon: '⚖️' },
      { label: 'Consumo', valor: '~5 kW', icon: '⚡' },
      { label: 'Velocidad', valor: '1 M op/seg', icon: '🚀' },
      { label: 'Memoria', valor: 'Núcleos magnéticos', icon: '💾' },
    ],
    ejemplos: ['IBM 1401', 'CDC 1604', 'PDP-1'],
    curiosidad: 'Los transistores permitieron que las computadoras fueran comerciales para empresas, no solo para gobiernos.',
    simulacion: 'transistor'
  },
  {
    id: 3,
    nombre: '3ª Generación',
    periodo: '1964 – 1971',
    tecnologia: 'Circuitos Integrados',
    color: '#3498db',
    glow: 'rgba(52,152,219,0.4)',
    emoji: '🔧',
    icon: 'IBM 360',
    descripcion:
      'Múltiples transistores en una sola placa de silicio. Nace la industria del software estandarizado y los sistemas operativos modernos con multiprogramación.',
    datos: [
      { label: 'Tamaño', valor: 'Escritorio grande', icon: '📐' },
      { label: 'Velocidad', valor: '10 M op/seg', icon: '🚀' },
      { label: 'Consumo', valor: '500 W', icon: '⚡' },
    ],
    ejemplos: ['IBM System/360', 'PDP-8', 'CDC 6600'],
    curiosidad: 'Jack Kilby y Robert Noyce inventaron el chip casi al mismo tiempo. Kilby ganó el Nobel por ello años después.',
    simulacion: 'chip'
  },
  {
    id: 4,
    nombre: '4ª Generación',
    periodo: '1971 – Presente',
    tecnologia: 'Microprocesadores',
    color: '#2980b9',
    glow: 'rgba(41,128,185,0.4)',
    emoji: '💻',
    icon: 'Intel 4004',
    descripcion:
      'Toda la CPU en un único chip de silicio. Inicia la era de la computación personal (PC), las interfaces gráficas y la conectividad global (Internet).',
    datos: [
      { label: 'Tamaño', valor: 'Bolsillo / Laptop', icon: '📐' },
      { label: 'Velocidad', valor: 'GHz (billones)', icon: '🚀' },
      { label: 'Capacidad', valor: 'GB - TB', icon: '💾' },
    ],
    ejemplos: ['Apple II', 'IBM PC', 'Macintosh'],
    curiosidad: 'El Intel 4004 tenía 2.300 transistores. Un procesador moderno de hoy puede tener más de 100.000 millones.',
    simulacion: 'cpu'
  },
  {
    id: 5,
    nombre: '5ª Generación',
    periodo: '1980 – Presente',
    tecnologia: 'Inteligencia Artificial',
    color: '#1a5276',
    glow: 'rgba(26,82,118,0.4)',
    emoji: '🧠',
    icon: 'IA',
    descripcion:
      'Basada en el procesamiento paralelo masivo y la Inteligencia Artificial. Lenguaje natural, redes neuronales y robótica avanzada definen esta era.',
    datos: [
      { label: 'Paradigma', valor: 'Aprendizaje Automático', icon: '🧠' },
      { label: 'Velocidad', valor: 'Petaflops', icon: '🚀' },
      { label: 'Interfaz', valor: 'Voz / Natural', icon: '🗣️' },
    ],
    ejemplos: ['IA Generativa', 'Supercomputadoras', 'Watson'],
    curiosidad: 'Deep Blue venciendo a Kasparov en 1997 fue el primer gran hito público de esta generación.',
    simulacion: 'neural'
  },
  {
    id: 6,
    nombre: 'Futuro',
    periodo: '2020 – ∞',
    tecnologia: 'Computación Cuántica',
    color: '#00a8ff',
    glow: 'rgba(0,168,255,0.4)',
    emoji: '⚛️',
    icon: 'Qubit',
    descripcion:
      'Superposición y entrelazamiento. Los qubits permiten resolver problemas de optimización y criptografía que las computadoras clásicas tardarían milenios.',
    datos: [
      { label: 'Unidad', valor: 'Qubit', icon: '⚛️' },
      { label: 'Temperatura', valor: '-273.15 °C', icon: '🌡️' },
      { label: 'Estado', valor: 'Investigación', icon: '🔬' },
    ],
    curiosidad: 'Una computadora cuántica de pocos qubits puede ser más potente que la supercomputadora más grande del mundo para ciertas tareas.',
    simulacion: 'quantum'
  }
];

const QUESTIONS = [
  { q: '¿Qué tecnología usaba la primera generación?', opts: ['Circuitos Integrados', 'Transistores', 'Válvulas de Vacío', 'Microchips'], a: 2 },
  { q: '¿Qué componente reemplazó a las válvulas en la 2da generación?', opts: ['Microprocesador', 'Transistor', 'Caché', 'Válvula 2.0'], a: 1 },
  { q: '¿Quiénes inventaron el circuito integrado?', opts: ['Gates y Jobs', 'Kilby y Noyce', 'Turing y Von Neumann', 'Moore y Bardeen'], a: 1 },
  { q: '¿Cuál fue el primer microprocesador comercial?', opts: ['Intel 8086', 'Intel 4004', 'MOS 6502', 'i9'], a: 1 },
  { q: 'La 3ra generación introdujo los...', opts: ['Transistores', 'Tubos de vacío', 'Circuitos Integrados', 'Qubits'], a: 2 },
  { q: '¿Qué generación dio origen a la Computación Personal (PC)?', opts: ['Primera', 'Tercera', 'Cuarta', 'Segunda'], a: 2 },
  { q: '¿En qué generación aparece el concepto de Inteligencia Artificial como eje central?', opts: ['Tercera', 'Quinta', 'Sexta (Futuro)', 'Cuarta'], a: 1 },
  { q: '¿Qué es un Qubit?', opts: ['Un bit muy pequeño', 'Un bit con superposición', 'Un bit de 1950', 'Un registro de CPU'], a: 1 },
  { q: '¿Quién fundó Intel y formuló la ley sobre la densidad de transistores?', opts: ['Bill Gates', 'Steve Wozniak', 'Gordon Moore', 'Ada Lovelace'], a: 2 },
  { q: '¿Qué computadora de 1ra gen era del tamaño de una habitación?', opts: ['Apple I', 'Macintosh', 'ENIAC', 'IBM PC'], a: 2 },
  { q: '¿Qué lenguajes de alto nivel surgieron en la 2da generación?', opts: ['Python y Java', 'Javascript y PHP', 'COBOL y FORTRAN', 'Ensamblador'], a: 2 },
  { q: '¿En qué año se lanzó el IBM PC marcando la 4ta generación?', opts: ['1945', '1981', '1971', '2000'], a: 1 },
  { q: '¿Qué temperatura requiere un procesador cuántico moderno?', opts: ['100 °C', '0 °C', '-273 °C (Cero Absoluto)', '25 °C'], a: 2 },
  { q: '¿Cuál es la principal característica de la "5ta generación"?', opts: ['Válvulas baratas', 'Procesamiento paralelo e IA', 'Uso exclusivo de tarjetas', 'Menos memoria'], a: 1 },
  { q: '¿Qué es el "cuello de botella de Von Neumann"?', opts: ['Mucho calor', 'Gasto de luz', 'Lentitud por el bus compartido', 'CPU muy grande'], a: 2 },
  { q: 'Los transistores permitieron reducir el tamaño de las computadoras...', opts: ['Un 10%', 'Un 50%', 'Dramáticamente (de m² a cm²)', 'Nada'], a: 2 },
  { q: '¿A qué generación pertenece el descubrimiento de la técnica de multiprogramación?', opts: ['Primera', 'Segunda', 'Tercera', 'Cuarta'], a: 2 },
  { q: '¿Qué tecnología habilita la miniaturización de la 4ta generación?', opts: ['LSI y VLSI', 'Válvulas nano', 'Cables de oro', 'Caché external'], a: 0 },
  { q: '¿Qué genera mucho calor en la 1ra generación?', opts: ['El teclado', 'Las válvulas de vacío', 'El aire acondicionado', 'Los transistores'], a: 1 },
  { q: 'En el futuro, ¿qué unidad reemplazará al bit clásico?', opts: ['El byte', 'El tera', 'El Qubit', 'El bit 2.0'], a: 2 },
];

const Generaciones = () => {
  const [genActiva, setGenActiva] = useState(0);
  const [tab, setTab] = useState('info');
  const [progreso, setProgreso] = useState(new Set());
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const gen = GENERACIONES[genActiva];

  useEffect(() => {
    setProgreso(p => new Set([...p, gen.id]));
  }, [genActiva]);

  const nextQ = () => {
    if (qIdx + 1 < QUESTIONS.length) {
      setQIdx(q => q + 1);
      setChosen(null);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="gen-page">
      <header className="gen-header">
        <div className="gen-header-content">
          <h1 className="gen-title">Generaciones de Computadoras</h1>
          <p className="gen-subtitle">Un viaje interactivo desde los tubos al vacío hasta el futuro cuántico.</p>
          <div className="gen-progress-container">
            <div className="gen-progress-bar">
              <div className="gen-progress-fill" style={{ width: `${(progreso.size / GENERACIONES.length) * 100}%` }} />
            </div>
            <p className="gen-progress-text">{progreso.size} de {GENERACIONES.length} exploradas</p>
          </div>
        </div>
      </header>

      <div className="gen-layout">
        <aside className="gen-timeline">
          {GENERACIONES.map((g, i) => (
            <button key={g.id} className={`timeline-item ${i === genActiva ? 'active' : ''}`} onClick={() => {setGenActiva(i); setTab('info');}}>
              <span className="tl-emoji">{g.emoji}</span>
              <div className="tl-details">
                <span className="tl-name">{g.nombre}</span>
                <span className="tl-year">{g.periodo}</span>
              </div>
            </button>
          ))}
        </aside>

        <main className="gen-main">
          <div className="gen-card" style={{ '--gen-color': gen.color }}>
            <div className="gen-card-header">
              <div className="gen-badge">{gen.emoji}</div>
              <div>
                <h2>{gen.nombre}</h2>
                <p>{gen.tecnologia}</p>
              </div>
            </div>

            <div className="gen-tabs">
              <button className={tab === 'info' ? 'tab-active' : ''} onClick={() => setTab('info')}>Información</button>
              <button className={tab === 'sim' ? 'tab-active' : ''} onClick={() => setTab('sim')}>Simulador</button>
            </div>

            <div className="gen-content">
              {tab === 'info' ? (
                <div className="info-view">
                  <p className="description">{gen.descripcion}</p>
                  <div className="stats-grid">
                    {gen.datos.map((d, i) => (
                      <div key={i} className="stat-card">
                        <span className="stat-icon">{d.icon}</span>
                        <span className="stat-label">{d.label}</span>
                        <span className="stat-value">{d.valor}</span>
                      </div>
                    ))}
                  </div>
                  <div className="curiosity">
                    <strong>¿Sabías que?</strong>
                    <p>{gen.curiosidad}</p>
                  </div>
                </div>
              ) : (
                <div className="sim-view">
                  <Simulador type={gen.simulacion} />
                </div>
              )}
            </div>
          </div>

          {/* Unified Global Quiz Section */}
          <section className="global-quiz-section">
            <h2 className="section-title">🎓 Desafío Final: 20 Preguntas</h2>
            <div className="unified-quiz-card">
              {!quizStarted ? (
                <div className="quiz-start">
                  <p>Pon a prueba tus conocimientos sobre todas las generaciones de computación.</p>
                  <button className="btn-primary" onClick={() => setQuizStarted(true)}>Comenzar Test Global</button>
                </div>
              ) : finished ? (
                <div className="quiz-result">
                  <h3>Puntaje Final: {score} / {QUESTIONS.length}</h3>
                  <p>{score >= 15 ? '¡Excelente dominio de la historia!' : 'Sigue explorando las generaciones para mejorar.'}</p>
                  <button className="btn-primary" onClick={() => {setQuizStarted(false); setFinished(false); setQIdx(0); setScore(0);}}>Reiniciar</button>
                </div>
              ) : (
                <div className="quiz-active">
                  <div className="q-status">Pregunta {qIdx + 1} de {QUESTIONS.length} | ✅ {score}</div>
                  <h3>{QUESTIONS[qIdx].q}</h3>
                  <div className="options-grid">
                    {QUESTIONS[qIdx].opts.map((opt, i) => (
                      <button 
                        key={i} 
                        className={`opt-btn ${chosen === i ? (i === QUESTIONS[qIdx].a ? 'correct' : 'wrong') : ''}`}
                        onClick={() => { if(chosen === null) { setChosen(i); if(i === QUESTIONS[qIdx].a) setScore(s => s+1); } }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {chosen !== null && (
                    <button className="btn-next" onClick={nextQ}>Siguiente →</button>
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const SimulacionValvulas = () => {
  const [encendidas, setEncendidas] = useState([true, false, true, false, true, false]);
  useEffect(() => {
    const interval = setInterval(() => {
      setEncendidas(prev => prev.map(() => Math.random() > 0.3));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="sim-container">
      <h4 className="sim-title">🔌 Válvulas de Vacío (1ª Gen)</h4>
      <p className="sim-desc">Los interruptores originales. Generan calor y luz al procesar bits.</p>
      <div className="valvulas-grid">
        {encendidas.map((on, i) => (
          <div key={i} className={`valvula ${on ? 'valvula-on' : 'valvula-off'}`}>
            <div className="valvula-tubo"><div className="valvula-filamento" /><div className="valvula-glow" /></div>
            <div className="valvula-base">V{i + 1}</div>
            <div className={`valvula-bit ${on ? 'bit-1' : 'bit-0'}`}>{on ? '1' : '0'}</div>
          </div>
        ))}
      </div>
      <div className="sim-info">Patrón Binario: {encendidas.map(v => v ? '1' : '0').join('')}</div>
    </div>
  );
};

const SimulacionTransistor = () => {
  const [voltaje, setVoltaje] = useState(0.3);
  const on = voltaje >= 0.7;
  return (
    <div className="sim-container">
      <h4 className="sim-title">🔬 El Transistor (2ª Gen)</h4>
      <div className="transistor-diagram">
        <div className="trans-label">COLECTOR</div>
        <div className="trans-wire" style={{ background: on ? '#f39c12' : '#94a3b8' }} />
        <div className="trans-chip" style={{ background: on ? '#1e293b' : '#334155', boxShadow: on ? '0 0 20px #f39c1244' : 'none' }}>NPN</div>
        <div className="trans-wire" style={{ background: on ? '#f39c12' : '#94a3b8' }} />
        <div className="trans-label">EMISOR</div>
      </div>
      <div style={{ width: '100%', maxWidth: '200px' }}>
        <input type="range" min="0" max="1.2" step="0.1" value={voltaje} onChange={e => setVoltaje(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)' }} />
        <div style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '5px' }}>Voltaje Base: {voltaje.toFixed(1)}V</div>
      </div>
      <div className="trans-status" style={{ color: on ? '#16a34a' : '#dc2626', borderColor: on ? '#16a34a' : '#dc2626' }}>
        {on ? 'BIT 1: FLUJO ACTIVO' : 'BIT 0: CORTE'}
      </div>
    </div>
  );
};

const SimulacionChip = () => {
  const [densidad, setDensidad] = useState(6);
  return (
    <div className="sim-container">
      <h4 className="sim-title">🔧 Circuito Integrado (3ª Gen)</h4>
      <div className="chip-visual">
        <div className="chip-body">
          <div className="chip-grid" style={{ gridTemplateColumns: `repeat(${densidad}, 1fr)` }}>
            {Array.from({ length: densidad * densidad }).map((_, i) => (
              <div key={i} className="chip-cell" style={{ background: 'var(--primary)', animationDelay: `${i * 0.05}s` }} />
            ))}
          </div>
        </div>
        <div className="chip-info-box">
          <div className="chip-transistor-count">{(densidad * densidad * 64).toLocaleString()}</div>
          <div className="chip-transistor-label">Componentes por cm²</div>
          <input type="range" min="4" max="25" value={densidad} onChange={e => setDensidad(parseInt(e.target.value))} style={{ width: '100%', marginTop: '1rem', accentColor: 'var(--primary)' }} />
        </div>
      </div>
    </div>
  );
};

const SimulacionCPU = () => {
  const [stage, setStage] = useState(0);
  const stages = ['FETCH', 'DECODE', 'EXECUTE', 'WRITE-BACK'];
  useEffect(() => {
    const int = setInterval(() => setStage(s => (s + 1) % 4), 1200);
    return () => clearInterval(int);
  }, []);
  return (
    <div className="sim-container">
      <h4 className="sim-title">💻 Microprocesador (4ª Gen)</h4>
      <div className="cpu-diagram">
        {stages.map((name, i) => (
          <div key={name} className={`cpu-stage ${stage === i ? 'cpu-active' : ''}`} style={{ borderColor: stage === i ? 'var(--primary)' : 'var(--border)' }}>
            <div className="cpu-stage-name">{i + 1}. {name}</div>
            <div className="cpu-stage-data" style={{ color: stage === i ? 'var(--primary)' : 'var(--text-light)' }}>
              {i === 0 && '>>> 0x2F (LOAD)'}
              {i === 1 && '>>> MOV R1, #42'}
              {i === 2 && '>>> REG[1] = 42'}
              {i === 3 && '>>> OK / BUSY: 0'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SimulacionNeural = () => {
  const [val, setVal] = useState(0.7);
  return (
    <div className="sim-container">
      <h4 className="sim-title">🧠 Inteligencia Artificial (5ª Gen)</h4>
      <div className="neural-diagram">
        <div className="neural-node"><span className="neural-val">x1</span></div>
        <div style={{ height: '2px', width: '30px', background: 'var(--border)' }} />
        <div className="neural-node center-node" style={{ background: `radial-gradient(circle, var(--primary) ${val * 100}%, #1e293b)`, boxShadow: `0 0 20px rgba(0,74,153,${val})` }}>
          <span className="neural-val">Σ</span>
        </div>
        <div style={{ height: '2px', width: '30px', background: 'var(--border)' }} />
        <div className="neural-node" style={{ borderColor: val > 0.5 ? '#16a34a' : '#dc2626' }}>
          <span className="neural-val" style={{ color: val > 0.5 ? '#16a34a' : '#dc2626' }}>{val > 0.5 ? '1' : '0'}</span>
        </div>
      </div>
      <input type="range" min="0" max="1" step="0.1" value={val} onChange={e => setVal(parseFloat(e.target.value))} style={{ width: '150px', accentColor: 'var(--primary)' }} />
      <p className="sim-desc">Activación de Neurona Artificial</p>
    </div>
  );
};

const SimulacionQuantum = () => {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const anim = setInterval(() => setAngle(a => (a + 5) % 360), 50);
    return () => clearInterval(anim);
  }, []);
  return (
    <div className="sim-container">
      <h4 className="sim-title">⚛️ Computación Cuántica (Futuro)</h4>
      <div className="bloch-sphere-container">
        <svg width="150" height="150" viewBox="-80 -80 160 160">
          <circle cx="0" cy="0" r="70" fill="none" stroke="rgba(0,168,255,0.2)" strokeWidth="1" strokeDasharray="4" />
          <line x1="0" y1="-70" x2="0" y2="70" stroke="rgba(0,168,255,0.1)" strokeWidth="1" />
          <line x1="-70" y1="0" x2="70" y2="0" stroke="rgba(0,168,255,0.1)" strokeWidth="1" />
          <line x1="0" y1="0" x2={Math.cos(angle * Math.PI / 180) * 60} y2={Math.sin(angle * Math.PI / 180) * 60} stroke="#00a8ff" strokeWidth="3" strokeLinecap="round" />
          <circle cx={Math.cos(angle * Math.PI / 180) * 60} cy={Math.sin(angle * Math.PI / 180) * 60} r="6" fill="#00a8ff" />
        </svg>
      </div>
      <div className="quantum-formula">
        ψ = α|0⟩ + β|1⟩
        <span style={{ fontSize: '0.7rem', color: '#00a8ff' }}>Superposición Activa</span>
      </div>
    </div>
  );
};

const Simulador = ({ type }) => {
  switch (type) {
    case 'valvulas': return <SimulacionValvulas />;
    case 'transistor': return <SimulacionTransistor />;
    case 'chip': return <SimulacionChip />;
    case 'cpu': return <SimulacionCPU />;
    case 'neural': return <SimulacionNeural />;
    case 'quantum': return <SimulacionQuantum />;
    default: return <div className="sim-placeholder">Próximamente</div>;
  }
};

export default Generaciones;
