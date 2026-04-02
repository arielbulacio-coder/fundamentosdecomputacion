import LockedContent from '../components/LockedContent';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const C = {
  cpu: '#00f2ff',
  alu: '#7000ff',
  uc: '#ff007a',
  mem: '#a855f7',
  clock: '#f59e0b',
  bg: '#0d0d10',
  border: 'rgba(255,255,255,0.1)'
};

const ISA_DATA = [
  { type: 'RISC', full: 'Reduced Instruction Set Computer', key: 'Simple y rápido', examples: 'ARM (celulares), Apple M1/M2/M3', icon: '📱' },
  { type: 'CISC', full: 'Complex Instruction Set Computer', key: 'Complejo y potente', examples: 'Intel x86, AMD Ryzen (PCs)', icon: '🖥️' }
];

const QUESTIONS = [
  { q: '¿Qué componente es el encargado de realizar comparaciones lógicas (SI/NO)?', opts: ['Unidad de Control', 'ALU', 'Memoria RAM', 'Disco Rígido'], a: 1, exp: 'La ALU (Unidad Aritmético-Lógica) realiza cálculos y operaciones lógicas.' },
  { q: '¿Cuál es el "director de orquesta" que coordina el flujo de datos?', opts: ['ALU', 'Registros', 'Unidad de Control', 'Reloj'], a: 2, exp: 'La UC interpreta las instrucciones y dirige al resto de los componentes.' },
  { q: 'La fase FETCH consiste en:', opts: ['Ejecutar la suma', 'Buscar la instrucción en la memoria', 'Guardar el resultado', 'Decodificar el código'], a: 1, exp: 'Fetch es el primer paso: traer la instrucción desde la RAM a la CPU.' },
  { q: '¿Qué arquitectura usa Apple Silicon (M1/M2) y la mayoría de los celulares?', opts: ['CISC', 'RISC', 'Harvard', 'Von Neumann Puro'], a: 1, exp: 'Los chips modernos de alta eficiencia suelen usar RISC (como ARM).' },
  { q: '¿Para qué sirve el Reloj del Sistema?', opts: ['Para dar la hora', 'Para sincronizar las operaciones de la CPU', 'Para enfriar el procesador', 'Para medir la carga de batería'], a: 1, exp: 'El reloj genera pulsos eléctricos que marcan el ritmo de cada paso del procesador.' },
  { q: '¿En qué registro se guarda la dirección de la PRÓXIMA instrucción?', opts: ['Acumulador', 'IR (Registro de Instrucción)', 'PC (Contador de Programa)', 'ALU'], a: 2, exp: 'El PC (Program Counter) siempre apunta a la dirección de memoria que sigue.' },
  { q: '¿Qué sucede en la fase de Decodificación (Decode)?', opts: ['Se suma 1+1', 'La UC traduce el código binario en señales de control', 'Se borra la RAM', 'Se envía el dato al monitor'], a: 1, exp: 'La UC "entiende" qué debe hacer el procesador analizando el código de la instrucción.' },
  { q: 'ISA significa:', opts: ['Internal System Architecture', 'Instruction Set Architecture', 'Internet Standard Access', 'Integrated Software Application'], a: 1, exp: 'ISA es el conjunto de instrucciones que definen el lenguaje del hardware.' },
  { q: '¿Qué significa que un procesador corre a 3.5 GHz?', opts: ['Que tiene 3.5 GB de RAM', 'Que realiza 3.500 millones de ciclos por segundo', 'Que consume 3.5 Watts', 'Que tiene 3 núcleos y medio'], a: 1, exp: 'Giga (mil millones) Hertz (ciclos por segundo) define la frecuencia del reloj.' },
  { q: 'En la arquitectura CISC, las instrucciones suelen ser:', opts: ['Todas del mismo tamaño', 'Variables en tamaño y complejidad', 'Muy simples y rápidas', 'Solo de lectura'], a: 1, exp: 'CISC usa instrucciones potentes que pueden requerir varios ciclos para ejecutarse.' },
  { q: '¿Qué registro contiene la instrucción que se está ejecutando actualmente?', opts: ['PC', 'IR (Instruction Register)', 'ACC', 'Stack Pointer'], a: 1, exp: 'El IR guarda el código de la operación mientras está siendo procesada por la UC.' },
  { q: '¿Qué sucede si aumentamos la frecuencia del reloj (Overclocking)?', opts: ['La CPU se vuelve más lenta', 'La CPU procesa más instrucciones pero genera más calor', 'La RAM se duplica mágicamente', 'Se borra el disco duro'], a: 1, exp: 'A mayor frecuencia, más velocidad, pero también mayor consumo de energía y calor.' },
  { q: '¿Cuál es la función principal de los Registros?', opts: ['Almacenar archivos permanentes', 'Almacenamiento temporal ultra-rápido dentro de la CPU', 'Conectarse a internet', 'Enfriar el silicio'], a: 1, exp: 'Los registros son las memorias más rápidas del sistema, ubicadas dentro del mismo chip CPU.' },
  { q: 'En RISC, para compensar la simplicidad de las instrucciones se utiliza:', opts: ['Instrucciones más largas', 'Pipelining (segmentación) y más registros', 'Cables de cobre más gruesos', 'Menos transistores'], a: 1, exp: 'RISC basa su potencia en ejecutar muchas instrucciones simples de forma simultánea (paralelismo).' },
  { q: '¿Qué bus transporta las señales de "lectura" o "escritura" hacia la RAM?', opts: ['Bus de Datos', 'Bus de Direcciones', 'Bus de Control', 'Bus USB'], a: 2, exp: 'El Bus de Control coordina qué acción debe realizar la memoria o los periféricos.' },
  { q: '¿Cuál es el último paso del ciclo de instrucción común?', opts: ['Fetch', 'Decode', 'Write-back / Store', 'Power Off'], a: 2, exp: 'Write-back guarda el resultado en un registro o de vuelta en la memoria principal.' },
  { q: 'Un "Ciclo de Máquina" se compone de:', opts: ['Solo una suma', 'La ejecución completa de una instrucción (Fetch-Decode-Execute)', 'Un segundo de tiempo real', 'El encendido de la PC'], a: 1, exp: 'Es el proceso completo desde que se busca la instrucción hasta que se termina de ejecutar.' },
  { q: '¿Qué componente decide si una instrucción es un salto (JUMP) o una suma?', opts: ['ALU', 'Unidad de Control', 'Monitor', 'Teclado'], a: 1, exp: 'La UC decodifica el código de operación para saber qué camino debe seguir el flujo.' },
  { q: 'La RAM es necesaria porque los registros de la CPU son:', opts: ['Muy lentos', 'Limitados en espacio (solo unos pocos bytes)', 'Transparentes', 'De solo lectura'], a: 1, exp: 'La CPU solo puede guardar unos pocos datos en sus registros; el resto debe estar en la RAM.' },
  { q: '¿Qué arquitectura prioriza el bajo consumo de energía?', opts: ['CISC (x86)', 'RISC (ARM)', 'Ambas por igual', 'Ninguna'], a: 1, exp: 'RISC, al tener instrucciones simples, requiere circuitos menos complejos y consume menos energía.' }
];

const PHASES = ['IDLE', 'FETCH', 'DECODE', 'EXECUTE', 'STORE'];
const PHASE_INFO = {
  IDLE: { label: '⏸ En espera', log: '💡 Sistema listo. Presiona "▶ Iniciar Ciclo".' },
  FETCH: { label: '📡 FETCH', color: C.cpu, log: '📡 FETCH: Se busca la instrucción en RAM y se pone en el Registro de Instrucción (IR).' },
  DECODE: { label: '🧠 DECODE', color: C.uc, log: '🧠 DECODE: La Unidad de Control interpreta la instrucción y activa los circuitos necesarios.' },
  EXECUTE: { label: '⚡ EXECUTE', color: C.alu, log: '⚡ EXECUTE: La ALU realiza la operación matemática o lógica solicitada.' },
  STORE: { label: '💾 STORE', color: C.mem, log: '💾 STORE: El resultado se guarda en el Acumulador o se envía de vuelta a la memoria.' }
};

export default function CPU() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [pc, setPc] = useState(0);
  const [ir, setIr] = useState('---');
  const [acc, setAcc] = useState(0);
  const [clockPulse, setClockPulse] = useState(false);
  const [log, setLog] = useState(PHASE_INFO.IDLE.log);
  
  // Quiz states
  const [started, setStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [done, setDone] = useState(false);

  const currentPhase = PHASES[phaseIdx];
  const info = PHASE_INFO[currentPhase];

  const advancePhase = () => {
    setClockPulse(true);
    setTimeout(() => setClockPulse(false), 300);

    const next = (phaseIdx + 1) % PHASES.length;
    setPhaseIdx(next);
    setLog(PHASE_INFO[PHASES[next]].log);

    if (PHASES[next] === 'FETCH') {
      setIr(`INST ${pc + 1}`);
    }
    if (PHASES[next] === 'EXECUTE') {
      setAcc(prev => prev + 5); // Simulación de una suma constante
    }
    if (PHASES[next] === 'IDLE') {
      setPc(prev => (prev + 1) % 16);
    }
  };

  const pick = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === QUESTIONS[qIdx].a) setScore(s => s + 1);
  };

  const nextQ = () => {
    if (qIdx + 1 < QUESTIONS.length) {
      setQIdx(q => q + 1);
      setChosen(null);
    } else {
      setDone(true);
    }
  };

  const resetQuiz = () => {
    setQIdx(0);
    setScore(0);
    setChosen(null);
    setDone(false);
    setStarted(false);
  };

  const BASE = import.meta.env.BASE_URL || '/';

  return (
    <LockedContent keyword="procesador" title="Clase 3: CPU Motor de ejecución">
      <div className="cpu-page">
      <style>{`
        .cpu-page { padding: 2rem; max-width: 1200px; margin: 0 auto; color: #eee; font-family: 'Inter', system-ui, sans-serif; }
        .cpu-h1 { text-align: center; font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #00f2ff, #7000ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .cpu-sub { text-align: center; opacity: 0.7; margin-bottom: 3rem; }
        
        .section-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 2rem; margin-bottom: 3rem; align-items: start; }
        
        /* Simulación */
        .cpu-sim-container { background: #12121a; border: 1px solid ${C.border}; border-radius: 24px; padding: 2rem; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
        .cpu-die { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; border: 2px dashed rgba(0,242,255,0.2); padding: 1.5rem; border-radius: 16px; background: rgba(0,0,0,0.2); }
        .comp-box { padding: 1.2rem; border-radius: 14px; border: 1.5px solid; display: flex; flex-direction: column; gap: 0.5rem; transition: all 0.3s; position: relative; }
        .comp-box.active { transform: scale(1.02); box-shadow: 0 0 20px rgba(0,242,255,0.2); }
        .comp-title { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
        .reg-display { background: #000; padding: 0.5rem; border-radius: 8px; font-family: monospace; color: #00f2ff; display: flex; justify-content: space-between; font-size: 0.9rem; }
        
        .clock-pulse { position: absolute; top: -10px; right: 20px; width: 40px; height: 40px; border-radius: 50%; background: ${C.clock}; opacity: 0; transition: opacity 0.1s; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .clock-pulse.pulse { opacity: 1; animation: pulseEff 0.3s; }
        @keyframes pulseEff { 0% { transform: scale(0.8); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        
        .cpu-controls { margin-top: 2rem; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
        .log-box { flex: 1; background: #000; border-radius: 12px; padding: 1rem; font-size: 0.9rem; border-left: 4px solid #00f2ff; min-height: 50px; color: #7de8ff; line-height: 1.5; }
        .btn-step { background: linear-gradient(135deg, #00f2ff, #0099ff); color: #000; border: none; padding: 1rem 2rem; border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .btn-step:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .phase-badge { background: rgba(255,255,255,0.05); padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 800; border: 1px solid rgba(255,255,255,0.1); color: #00f2ff; }

        /* Conceptos */
        .info-card { background: #12121a; border: 1px solid ${C.border}; border-radius: 20px; padding: 1.5rem; margin-bottom: 2rem; }
        .info-card h3 { color: #00f2ff; margin-top: 0; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; }
        .info-card p { line-height: 1.6; opacity: 0.8; font-size: 0.95rem; }
        
        .isa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem; }
        .isa-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1rem; }
        .isa-item strong { color: #00f2ff; display: block; margin-bottom: 0.4rem; }
        
        .clock-section { display: flex; gap: 2rem; align-items: center; background: linear-gradient(to right, rgba(245,158,11,0.05), transparent); padding: 1.5rem; border-radius: 20px; border-left: 5px solid ${C.clock}; }
        .clock-img { width: 120px; border-radius: 12px; }

        /* Quiz */
        .quiz-container { background: #12121a; border: 1px solid ${C.border}; border-top: 4px solid #00f2ff; border-radius: 24px; padding: 2rem; margin-top: 4rem; }
        .quiz-opt { width: 100%; text-align: left; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 1.2rem; border-radius: 14px; color: #fff; margin-bottom: 0.75rem; cursor: pointer; transition: 0.2s; font-size: 1rem; }
        .quiz-opt:hover:not(:disabled) { background: rgba(0,242,255,0.07); border-color: #00f2ff; }
        .quiz-opt.correct { background: rgba(0, 255, 127, 0.15); border-color: #00ff7f; }
        .quiz-opt.wrong { background: rgba(255, 0, 122, 0.15); border-color: #ff007a; }
        
        @media (max-width: 850px) {
          .section-grid { grid-template-columns: 1fr; }
          .cpu-die { grid-template-columns: 1fr; }
          .isa-grid { grid-template-columns: 1fr; }
          .clock-section { flex-direction: column; text-align: center; }
        }
      `}</style>

      <div style={{ marginBottom: '1rem' }}>
        <Link to="/arquitectura-von-neumann" style={{ color: '#00f2ff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>← Volver a Arquitectura</Link>
      </div>

      <header>
        <h1 className="cpu-h1">La CPU: El Motor de Ejecución</h1>
        <p className="cpu-sub">Explora el cerebro electrónico que hace posible cada instrucción en tu computadora.</p>
      </header>

      <section className="section-grid">
        {/* Lado Izquierdo: Simulador */}
        <div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            ⚙️ Simulador de Ciclo Interno
          </h2>
          <div className="cpu-sim-container">
            <div className={`clock-pulse ${clockPulse ? 'pulse' : ''}`}>⚡</div>
            
            <div className="cpu-die">
              {/* Unidad de Control */}
              <div className="comp-box" style={{ borderColor: C.uc, background: currentPhase === 'DECODE' ? 'rgba(255,0,122,0.1)' : 'transparent' }}>
                <span className="comp-title" style={{ color: C.uc }}>Unidad de Control (UC)</span>
                <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Decodifica y dirige señales.</p>
                <div className="reg-display"><span>ESTADO:</span> <span>{currentPhase === 'DECODE' ? 'TRADUCIENDO...' : 'LISTO'}</span></div>
              </div>

              {/* ALU */}
              <div className="comp-box" style={{ borderColor: C.alu, background: currentPhase === 'EXECUTE' ? 'rgba(112,0,255,0.1)' : 'transparent' }}>
                <span className="comp-title" style={{ color: C.alu }}>Unidad Aritmético-Lógica (ALU)</span>
                <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Cálculos y lógica booleana.</p>
                <div className="reg-display"><span>OPERACIÓN:</span> <span>{currentPhase === 'EXECUTE' ? 'SUMAR (+)' : 'IDLE'}</span></div>
              </div>

              {/* Registros Internos */}
              <div className="comp-box" style={{ borderColor: C.cpu, gridColumn: 'span 2' }}>
                <span className="comp-title" style={{ color: C.cpu }}>Registros de Alta Velocidad</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <div className="reg-display"><span>PC:</span> <span>0x{pc.toString(16).padStart(4,'0').toUpperCase()}</span></div>
                  <div className="reg-display"><span>IR:</span> <span>{ir}</span></div>
                  <div className="reg-display" style={{ gridColumn: 'span 2', color: '#00ff7f' }}><span>ACUMULADOR (ACC):</span> <span>{acc}</span></div>
                </div>
              </div>
            </div>

            <div className="cpu-controls">
              <button className="btn-step" onClick={advancePhase}>
                {phaseIdx === 0 ? '▶ COMENZAR' : '⏭ SIGUIENTE PASO'}
              </button>
              <div className="phase-badge">{info.label}</div>
              <div className="log-box">{log}</div>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Explicaciones Rápidas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="info-card">
            <h3>⚡ El Ciclo de Instrucción</h3>
            <p>Todo lo que hace una computadora se divide en este ciclo infinito:</p>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', opacity: 0.9, lineHeight: '1.8' }}>
              <li><strong style={{color:C.cpu}}>FETCH</strong>: Se trae la instrucción desde la RAM.</li>
              <li><strong style={{color:C.uc}}>DECODE</strong>: La UC interpreta el binario.</li>
              <li><strong style={{color:C.alu}}>EXECUTE</strong>: La ALU opera los datos.</li>
              <li><strong style={{color:C.mem}}>STORE</strong>: Se guarda el resultado final.</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>🧠 ALU vs Unidad de Control</h3>
            <p>Si la computadora fuera un taller:</p>
            <p><strong>ALU:</strong> Es el obrero con las herramientas que hace el trabajo físico (sumar, comparar).</p>
            <p><strong>UC:</strong> Es el capataz que lee los planos y le dice al obrero qué herramienta usar y cuándo.</p>
          </div>
        </div>
      </section>

      {/* Conjunto de Instrucciones (ISA) */}
      <section className="info-card" style={{ background: 'rgba(0,242,255,0.02)' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <h2>📖 Conjunto de Instrucciones (ISA)</h2>
            <p>El ISA es la "interfaz" entre el software y el hardware. Define qué operaciones puede hacer la CPU directamente. Existen dos filosofías principales:</p>
            <div className="isa-grid">
              {ISA_DATA.map(item => (
                <div key={item.type} className="isa-item">
                  <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>{item.icon}</div>
                  <strong>{item.type} ({item.full})</strong>
                  <p style={{fontSize: '0.85rem', margin: '0.5rem 0'}}>{item.key}</p>
                  <em style={{fontSize: '0.8rem', opacity: 0.6}}>Ej: {item.examples}</em>
                </div>
              ))}
            </div>
          </div>
          <img src={`${BASE}assets/cpu_internals.png`} alt="ISA Diagram" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }} />
        </div>
      </section>

      {/* Reloj del Sistema */}
      <section className="clock-section" style={{ marginTop: '3rem' }}>
        <img src={`${BASE}assets/cpu_clock.png`} alt="Clock Signal" className="clock-img" />
        <div>
          <h2 style={{ color: C.clock, margin: 0, fontSize: '1.5rem' }}>⏱️ El Reloj: El Latido del Sistema</h2>
          <p style={{ margin: '0.5rem 0', opacity: 0.9 }}>
            La CPU no corre de forma continua, sino a "pulsos". Cada pulso del reloj permite avanzar un pequeño paso en la ejecución.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px' }}>
              <strong>Hertz (Hz):</strong> 1 pulso por segundo.
            </span>
            <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px' }}>
              <strong>Gigahertz (GHz):</strong> ¡Mil millones de pulsos por segundo!
            </span>
          </div>
        </div>
      </section>

      {/* Quiz Final */}
      <section className="quiz-container">
        {!started ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏆 Pon a prueba tu conocimiento</h2>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Responde 20 preguntas sobre el funcionamiento interno de la CPU.</p>
            <button className="btn-step" onClick={() => setStarted(true)}>COMENZAR TEST</button>
          </div>
        ) : done ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{score > 6 ? '🎓' : '📚'}</div>
            <h2>Puntaje: {score} / {QUESTIONS.length}</h2>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>{score > 6 ? '¡Eres un experto en CPUs!' : 'Buen intento, sigue repasando.'}</p>
            <button className="btn-step" onClick={resetQuiz}>REINTENTAR</button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: '800', color: '#00f2ff' }}>
              <span>PREGUNTA {qIdx + 1} DE {QUESTIONS.length}</span>
              <span>Puntaje: {score}</span>
            </div>
            <p style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1.5rem' }}>{QUESTIONS[qIdx].q}</p>
            <div className="quiz-options">
              {QUESTIONS[qIdx].opts.map((opt, i) => {
                let cls = 'quiz-opt';
                if (chosen !== null) {
                  if (i === QUESTIONS[qIdx].a) cls += ' correct';
                  else if (i === chosen) cls += ' wrong';
                }
                return (
                  <button key={i} className={cls} onClick={() => pick(i)} disabled={chosen !== null}>{opt}</button>
                );
              })}
            </div>
            {chosen !== null && (
              <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', borderLeft: '4px solid #00f2ff' }}>
                <p style={{ margin: 0, lineHeight: '1.6' }}>{QUESTIONS[qIdx].exp}</p>
                <button className="btn-step" style={{ marginTop: '1rem', width: '100%' }} onClick={nextQ}>
                  {qIdx + 1 < QUESTIONS.length ? 'SIGUIENTE' : 'VER RESULTADOS'}
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      <footer style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.4, fontSize: '0.8rem' }}>
        © 2026 SimuTec · Material Didáctico para Informática
      </footer>
          </div>
    </LockedContent>
  );
};
