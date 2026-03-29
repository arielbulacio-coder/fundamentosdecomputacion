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

// Subcomponent Simulator (simplified version of the Simutec logic)
const Simulador = ({ type }) => {
  return (
    <div className="interactive-sim">
      {type === 'valvulas' && <div className="sim-placeholder">🔌 [Módulo de Válvulas Activo]</div>}
      {type === 'transistor' && <div className="sim-placeholder">🔬 [Módulo de Transistores Activo]</div>}
      {type === 'cpu' && <div className="sim-placeholder">💻 [Ciclo de CPU Activo]</div>}
      {type === 'quantum' && <div className="sim-placeholder">⚛️ [Superposición Activa]</div>}
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>Este simulador representa la tecnología clave de la era {type}.</p>
    </div>
  );
};

export default Generaciones;
