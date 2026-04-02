import LockedContent from '../components/LockedContent';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const C = {
  primary: '#004a99',
  secondary: '#0066cc',
  accent: '#e6f0ff',
  cpu: '#004a99',
  mem: '#0066cc',
  io: '#2ecc71',
  busA: '#004a99',
  busD: '#3498db',
  busC: '#95a5a6',
};

const QUESTIONS = [
  { q:'¿Quién propuso la arquitectura que usa una sola memoria para datos e instrucciones?', opts:['John von Neumann','Alan Turing','Blaise Pascal','Ada Lovelace'], a:0, exp:'Von Neumann la describió en 1945.' },
  { q:'¿Qué realiza la ALU?', opts:['Almacena archivos','Controla periféricos','Enfría la CPU','Cálculos matemáticos y lógicos'], a:3, exp:'La ALU es el motor de cálculo de la CPU.' },
  { q:'¿Qué componente coordina el flujo dentro de la CPU?', opts:['RAM','Disco Rígido','Unidad de Control','Bus de Datos'], a:2, exp:'La UC actúa como director de orquesta del sistema.' },
  { q:'El "cuello de botella de Von Neumann" se debe a…', opts:['Falta de RAM','Bus compartido entre instrucciones y datos','Calor de la CPU','Monitor lento'], a:1, exp:'CPU y Memoria comparten el mismo bus, limitando la velocidad.' },
  { q:'¿Qué bus apunta la posición de memoria a leer?', opts:['Bus de Datos','Bus de Control','Bus USB','Bus de Direcciones'], a:3, exp:'Bus de Direcciones: indica la ubicación en RAM.' },
  { q:'¿Qué registro guarda la dirección de la próxima instrucción?', opts:['Program Counter (PC)','Acumulador','Instruction Register','Stack Pointer'], a:0, exp:'PC apunta siempre a la instrucción siguiente.' },
  { q:'¿Qué contiene el Instruction Register (IR)?', opts:['La dirección PC','El resultado de la ALU','La instrucción actual','La dirección de E/S'], a:2, exp:'IR guarda el código de operación mientras la UC lo decodifica.' },
  { q:'Primera fase del ciclo de instrucción:', opts:['Decode','Fetch','Execute','Store'], a:1, exp:'Fetch: traer la instrucción desde RAM a la CPU.' },
  { q:'¿Qué bus lleva la señal "Lectura/Escritura"?', opts:['Bus de Control','Bus de Datos','Bus de Direcciones','Bus Serial'], a:0, exp:'Bus de Control: sincroniza todo el sistema.' },
  { q:'¿Dónde residen programas antes de ejecutarse?', opts:['Monitor','Solo el PC','La ALU','RAM (Memoria Principal)'], a:3, exp:'Datos e instrucciones se cargan en RAM para ser procesados.' },
  { q:'¿Qué arquitectura separa la memoria de datos e instrucciones?', opts:['Von Neumann','x86','Harvard','RISC'], a:2, exp:'Harvard usa buses independientes, evitando el cuello de botella.' },
  { q:'¿Qué parte de la CPU activa la operación correcta en la ALU?', opts:['Reloj','Registro de Estado','Unidad de Control','Caché'], a:2, exp:'La UC decodifica y envía señales a la ALU.' },
  { q:'¿Qué sucede en la fase "Write-back" / Store?', opts:['El resultado se guarda en memoria o registros','Se apaga la PC','Se borra la RAM','Se pide nueva dirección'], a:0, exp:'Es el paso final donde el resultado queda registrado.' },
  { q:'¿El bus de datos es bidireccional?', opts:['No, solo va a la CPU','Solo en PCs viejas','Depende del SO','Sí, permite lectura y escritura'], a:3, exp:'Debe permitir que la información entre y salga de la CPU.' },
  { q:'¿Qué registro guarda el resultado temporal de la ALU?', opts:['Program Counter','RAM','Acumulador','BIOS'], a:2, exp:'El acumulador guarda el resultado inmediato de la operación.' },
  { q:'La RAM en este modelo es…', opts:['Permanente','Mecánica','Solo lectura','Volátil'], a:3, exp:'Volátil: los datos se pierden sin suministro eléctrico.' },
  { q:'¿Aumentar solo la velocidad de CPU resuelve el cuello de botella?', opts:['No, se necesita mayor ancho de banda en el bus','Sí, siempre','Sí, con un i7','Depende de la GPU'], a:0, exp:'De nada sirve una CPU veloz si el bus es lento y estrecho.' },
  { q:'¿Qué bus determina la cantidad máxima de memoria direccionable?', opts:['Bus de Datos','Bus de Direcciones','Bus de Control','Bus USB'], a:1, exp:'El ancho del bus de direcciones (32/64 bits) define el límite.' },
  { q:'¿Cómo se comunica el sistema con teclado y pantalla?', opts:['UC directamente','Unidad de Entrada/Salida','Caché L1','Buses internos'], a:1, exp:'Los periféricos se conectan a la Unidad de E/S.' },
  { q:'Unidad mínima de información que viaja por los buses:', opts:['Byte','Paquete','Bit','Kilobyte'], a:2, exp:'Un bit (0 ó 1) es la unidad fundamental de la transferencia digital.' }
];

const PHASES = ['IDLE','FETCH','DECODE','EXECUTE','STORE'];
const PHASE_INFO = {
  IDLE:    { label:'⏸ Listo',    bus:null,   log:'💡 Sistema listo. Presioná "▶ Iniciar Ciclo".' },
  FETCH:   { label:'📡 FETCH',   bus:'addr', log:'📡 FETCH: PC envía la dirección por el BUS DE DIRECCIONES.' },
  DECODE:  { label:'🧠 DECODE',  bus:'data', log:'📥 DECODE: La instrucción llega a CPU por el BUS DE DATOS.' },
  EXECUTE: { label:'⚡ EXECUTE', bus:'ctrl', log:'⚡ EXECUTE: La ALU opera. BUS DE CONTROL activo.' },
  STORE:   { label:'💾 STORE',   bus:'data', log:'💾 STORE: El resultado se escribe. BUS DE DATOS activo.' },
};
const MEM = ['LOAD 42','ADD 15','SUB 07','STR 57','MUL 03','CMP 10','JMP 0A','HLT 00'];

const VonNeumann = () => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [log,      setLog]      = useState(PHASE_INFO.IDLE.log);
  const [cycles,   setCycles]   = useState(0);
  const [pc,       setPc]       = useState(0);

  const [started, setStarted] = useState(false);
  const [qIdx,    setQIdx]    = useState(0);
  const [score,   setScore]   = useState(0);
  const [chosen,  setChosen]  = useState(null);
  const [done,    setDone]    = useState(false);

  const phase  = PHASES[phaseIdx];
  const pInfo  = PHASE_INFO[phase];
  const activeB = pInfo.bus;

  const advancePhase = () => {
    const next = (phaseIdx + 1) % PHASES.length;
    const nextPhase = PHASES[next];
    setPhaseIdx(next);
    setLog(PHASE_INFO[nextPhase].log);
    if (nextPhase === 'IDLE') { setCycles(c => c+1); setPc(p => (p+1)%8); }
  };

  const pick = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === QUESTIONS[qIdx].a) setScore(s => s+1);
  };
  const next = () => {
    if (qIdx + 1 < QUESTIONS.length) { setQIdx(q => q+1); setChosen(null); }
    else setDone(true);
  };
  const reset = () => { setQIdx(0); setScore(0); setChosen(null); setDone(false); setStarted(false); };

  const busColor = (key) => activeB === key
    ? (key==='addr' ? C.busA : key==='data' ? C.busD : C.busC)
    : 'rgba(0,0,0,0.06)';

  return (
    <>
      <style>{`
        .vn-page { padding:1rem; max-width:1100px; margin:0 auto; font-family:system-ui,sans-serif; color:var(--text); }
        .vn-page * { box-sizing:border-box; }
        .vn-h1 { text-align:center; font-size:clamp(1.5rem,4vw,2.2rem); font-weight:900; margin:0 0 0.25rem; color: var(--primary); }
        .vn-sub { text-align:center; opacity:0.6; font-size:0.9rem; margin-bottom:1.5rem; }
        .vn-section-title { text-align:center; font-size:clamp(1.2rem,3vw,1.5rem); font-weight:900; margin:2rem 0 1.25rem; color: var(--primary); }

        .vn-sim-box { background:#fff; border:1px solid var(--border); border-radius:20px; padding:1.25rem; margin-bottom:1.5rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); }
        .vn-grid { display:grid; grid-template-columns:1fr 60px 1fr; gap:0.75rem; align-items:start; }
        .vn-buses { display:flex; flex-direction:column; justify-content:center; gap:1.8rem; padding:1.5rem 0; height:100%; }
        .vn-bus-track { height:8px; border-radius:4px; position:relative; transition:background 0.4s,box-shadow 0.4s; }
        .vn-bus-label { position:absolute; top:-16px; left:50%; transform:translateX(-50%); font-size:0.5rem; font-weight:800; white-space:nowrap; opacity:0.8; }
        .vn-comp { border-radius:14px; padding:0.9rem; display:flex; flex-direction:column; gap:0.5rem; border:1.5px solid; min-height:200px; }
        .vn-reg { display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; padding:0.3rem 0.5rem; background:rgba(0,0,0,0.02); border-radius:6px; gap:0.5rem; border: 1px solid rgba(0,0,0,0.05); }
        .vn-mem-row { display:flex; justify-content:space-between; font-size:0.7rem; padding:3px 6px; border-radius:4px; }
        .vn-chip { flex:1; text-align:center; padding:0.2rem; border-radius:6px; font-size:0.7rem; }
        .vn-io { grid-column:1/4; display:flex; justify-content:space-around; align-items:center;
          background:rgba(46,204,113,0.03); border:1.5px solid #2ecc71; border-radius:12px; padding:0.6rem; margin-top:0.25rem; }
        .vn-io-sep { width:2px; height:36px; background:rgba(46,204,113,0.4); }
        .vn-io-block { text-align:center; }
        .vn-io-block small { display:block; font-size:0.6rem; color:#27ae60; font-weight:800; }
        .vn-ctrl { display:flex; flex-direction:column; gap:0.6rem; margin-top:1rem; }
        .vn-ctrl-row { display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap; }
        .vn-log { flex:1; background:#f8fafc; border-radius:10px; padding:0.6rem 1rem; font-family:monospace; font-size:0.78rem; border-left:4px solid var(--primary); min-height:40px; color:var(--primary); }
        .vn-badge { padding:0.25rem 0.8rem; border-radius:20px; font-size:0.72rem; font-weight:800; background:#fff; border:1px solid var(--border); white-space:nowrap; }
        .vn-bus-pills { display:flex; gap:0.5rem; flex-wrap:wrap; }
        .vn-pill { padding:3px 10px; border-radius:20px; font-size:0.7rem; font-weight:700; color:#fff; transition:opacity 0.3s; }
        .btn-vn-p { cursor:pointer; padding:0.6rem 1.2rem; border-radius:12px; font-weight:800; font-size:0.88rem; border:none; background:var(--primary); color:#fff; transition:transform .15s; }
        .btn-vn-p:hover { transform:scale(1.04); filter:brightness(1.1); }

        .vn-edu-card { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; align-items:center;
          background:#fff; border:1px solid var(--border); border-radius:20px; padding:1.5rem; margin-bottom:1.25rem; }
        .vn-edu-card-alt { direction:rtl; }
        .vn-edu-card-alt > * { direction:ltr; }
        .vn-edu-img-wrap { border-radius:14px; overflow:hidden; }
        .vn-edu-img { width:100%; height:auto; display:block; border-radius:14px; border:1px solid var(--border); }
        .vn-edu-text h3 { margin:0 0 0.75rem; font-size:1.05rem; }
        .vn-edu-text p { font-size:0.88rem; line-height:1.6; opacity:0.9; margin:0 0 0.6rem; }
        .vn-edu-text ul { font-size:0.85rem; line-height:1.7; opacity:0.85; margin:0; padding-left:1.2rem; }
        .vn-cycle-steps { display:flex; flex-direction:column; gap:0.5rem; margin:0.75rem 0; }
        .vn-cycle-step { display:flex; gap:0.75rem; align-items:flex-start; padding:0.6rem; background:rgba(0,0,0,0.02); border-radius:10px; border-left:3px solid; }
        .vn-cycle-step span:first-child { font-weight:800; white-space:nowrap; font-size:0.82rem; }
        .vn-cycle-step span:last-child { font-size:0.82rem; opacity:0.85; }

        .vn-apps { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1rem; margin-bottom:1.5rem; }
        .vn-app-card { background:#fff; border:1px solid var(--border); border-radius:14px; overflow:hidden; display:flex; flex-direction:column; }
        .vn-app-img { width:100%; height:140px; object-fit:cover; border-bottom:1px solid var(--border); }
        .vn-app-body { padding:0.9rem; flex:1; display:flex; flex-direction:column; gap:0.4rem; }
        .vn-app-note { font-size:0.78rem; opacity:0.7; padding:0.5rem; border-radius:8px; background:var(--accent); border-left:3px solid var(--primary); margin-top:auto; }

        .vn-quiz-box { background:#fff; border:1px solid var(--border); border-top:4px solid var(--primary); border-radius:20px; padding:1.25rem; }
        .vn-progress { height:5px; background:var(--accent); border-radius:3px; margin-bottom:1.25rem; }
        .vn-progress-fill { height:100%; border-radius:3px; background:var(--primary); transition:width .3s; }
        .vn-q-text { font-size:1rem; font-weight:700; margin-bottom:1.25rem; line-height:1.5; }
        .vn-options { display:flex; flex-direction:column; gap:0.6rem; }
        .vn-opt { width:100%; display:flex; align-items:flex-start; gap:0.75rem; background:#fff; border:1.5px solid var(--border); border-radius:12px;
          padding:0.85rem 1rem; color:var(--text); cursor:pointer; text-align:left; font-size:0.9rem; line-height:1.4; transition:all 0.2s; }
        .vn-opt:hover:not(:disabled) { background:var(--accent); border-color:var(--primary); }
        .vn-opt.correct { background:rgba(34,197,94,.1) !important; border-color:#22c55e !important; color:#1b5e20 !important; }
        .vn-opt.wrong   { background:rgba(239,68,68,.1)  !important; border-color:#ef4444 !important; color:#b71c1c !important; }
        .vn-opt-letter  { flex-shrink:0; opacity:0.45; font-weight:900; font-size:0.85rem; }
        .vn-feedback { margin-top:1rem; padding:1rem; border-radius:12px; background:var(--accent); font-size:0.85rem; line-height:1.5; border-left:4px solid; }

        .hv-cta { background:var(--accent); border:1px solid var(--primary); border-radius:16px; padding:1.5rem; text-align:center; margin:2rem 0; }
        .hv-cta h3 { color:var(--primary); margin:0 0 0.5rem; }
        .hv-cta p { opacity:0.8; margin:0 0 1rem; font-size:0.9rem; }
        .btn-hv-cta { cursor:pointer; padding:0.7rem 2rem; border-radius:12px; font-weight:800; font-size:0.9rem; border:none; background:var(--primary); color:#fff; text-decoration:none; display:inline-block; transition:transform .15s; }

        @media (max-width:650px) {
          .vn-page { padding:0.75rem; }
          .vn-sim-box { padding:0.9rem; }
          .vn-grid { grid-template-columns:1fr; gap:0.75rem; }
          .vn-buses { flex-direction:row; height:50px; padding:0; gap:0.75rem; align-items:center; }
          .vn-bus-track { flex:1; height:8px; }
          .vn-bus-label { top:-14px; }
          .vn-io { grid-column:1; }
          .vn-comp { min-height:auto; }
          .vn-ctrl-row { flex-direction:column; align-items:center; }
          .vn-log { width:100%; }
          .vn-edu-card { grid-template-columns:1fr; }
          .vn-edu-card-alt { direction:ltr; }
          .vn-q-text { font-size:0.95rem; }
          .vn-opt { font-size:0.85rem; padding:0.75rem; }
          .vn-apps { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="vn-page">
        <h1 className="vn-h1">Arquitectura Von Neumann</h1>
        <p className="vn-sub">Memoria compartida · Un solo bus · El estándar de la industria</p>

        <h2 className="vn-section-title">⚙️ Simulador del Ciclo de Instrucción</h2>
        <div className="vn-sim-box">
          <div className="vn-grid">
            <div className="vn-comp" style={{ borderColor:C.cpu, background:'rgba(0,74,153,0.02)' }}>
              <h3 style={{ color:C.cpu, margin:0, fontSize:'0.95rem', fontWeight:800 }}>🖥 CPU</h3>
              <div className="vn-reg"><span>PC</span><code>0x{pc.toString(16).padStart(2,'0').toUpperCase()}</code></div>
              <div className="vn-reg"><span>IR</span><code>{phase!=='IDLE'&&phase!=='FETCH' ? MEM[pc] : '???'}</code></div>
              <div className="vn-reg"><span>ACC</span><code>{phase==='STORE' ? 57 : '0'}</code></div>
              <div style={{ display:'flex', gap:'0.5rem', marginTop:'0.5rem' }}>
                {['ALU','UC'].map(l=>(
                  <span key={l} className="vn-chip" style={{ background:C.accent, border:`1px solid ${C.cpu}40`, color:C.cpu, fontWeight:800 }}>{l}</span>
                ))}
              </div>
            </div>
            <div className="vn-buses">
              {[{k:'addr',c:C.busA,l:'Dir.'},{k:'data',c:C.busD,l:'Datos'},{k:'ctrl',c:C.busC,l:'Ctrl.'}].map(b=>(
                <div key={b.k} className="vn-bus-track" style={{ background:busColor(b.k), boxShadow:activeB===b.k?`0 0 10px ${b.c}40`:'none' }}>
                  <span className="vn-bus-label" style={{ color:activeB===b.k?b.c:'rgba(0,0,0,.3)' }}>{b.l}</span>
                </div>
              ))}
            </div>
            <div className="vn-comp" style={{ borderColor:C.mem, background:'rgba(0,102,204,0.02)' }}>
              <h3 style={{ color:C.mem, margin:0, fontSize:'0.95rem', fontWeight:800 }}>💾 RAM (Unificada)</h3>
              {MEM.map((v,i)=>(
                <div key={i} className="vn-mem-row" style={{ background:i===pc?C.accent:'rgba(0,0,0,0.02)', borderRadius:4 }}>
                  <code>0x{i.toString(16).padStart(2,'0').toUpperCase()}</code><code>{v}</code>
                </div>
              ))}
            </div>
            <div className="vn-io">
              <div className="vn-io-block"><small>ENTRADA</small><span style={{ fontSize:'1.4rem' }}>⌨️🖱️</span></div>
              <div className="vn-io-sep"/>
              <div className="vn-io-block"><small>SALIDA</small><span style={{ fontSize:'1.4rem' }}>🖥️🔊</span></div>
            </div>
          </div>
          <div className="vn-ctrl">
            <div className="vn-ctrl-row">
              <button className="btn-vn-p" onClick={advancePhase}>{phase==='IDLE'?'▶ Iniciar Ciclo':'⏭ Siguiente Paso'}</button>
              <span className="vn-badge" style={{ color:C.primary }}>{pInfo.label}</span>
              <span className="vn-badge" style={{ marginLeft:'auto' }}>Ciclos: {cycles}</span>
            </div>
            <div className="vn-log">{log}</div>
            <div className="vn-bus-pills">
              {[{k:'addr',l:'Direcciones',c:C.busA},{k:'data',l:'Datos',c:C.busD},{k:'ctrl',l:'Control',c:C.busC}].map(b=>(
                <span key={b.k} className="vn-pill" style={{ background:b.c, opacity:activeB===b.k?1:0.3 }}>{b.l}</span>
              ))}
            </div>
          </div>
        </div>

        <h2 className="vn-section-title">📚 Conceptos Clave</h2>
        <div className="vn-edu-card">
          <div className="vn-edu-img-wrap">
            <img src="/assets/vn_diagram.png" alt="Diagrama Von Neumann" className="vn-edu-img"/>
          </div>
          <div className="vn-edu-text">
            <h3 style={{ color:C.cpu }}>🖥 La Arquitectura</h3>
            <p>Define tres subsistemas principales conectados por buses:</p>
            <ul>
              <li><strong style={{color:C.cpu}}>CPU</strong>: Procesa datos (ALU) y coordina tareas (UC).</li>
              <li><strong style={{color:C.mem}}>Memoria Principal</strong>: Almacena datos e instrucciones.</li>
              <li><strong style={{color:C.io}}>Unidad E/S</strong>: Comunica con el exterior.</li>
            </ul>
            <p style={{opacity:0.7, fontSize:'0.85rem', padding:'0.75rem', background:C.accent, borderRadius:12, marginTop:'1rem', borderLeft:'4px solid ' + C.primary}}>
              💡 Innovación: El "programa almacenado" permite que la misma máquina ejecute cualquier tarea sin cambiar el hardware.
            </p>
          </div>
        </div>

        <div className="vn-edu-card vn-edu-card-alt">
          <div className="vn-edu-text">
            <h3 style={{ color:C.mem }}>🔄 El Ciclo de Instrucción</h3>
            <div className="vn-cycle-steps">
              {[
                {fase:'📡 FETCH',   color:C.busA, desc:'Traer la instrucción desde la RAM a la CPU.'},
                {fase:'🧠 DECODE',  color:C.primary, desc:'La Unidad de Control interpreta la orden.'},
                {fase:'⚡ EXECUTE', color:C.secondary,  desc:'La ALU realiza la operación real.'},
                {fase:'💾 STORE',   color:'#2ecc71',   desc:'Guardar el resultado en memoria o registros.'},
              ].map(f=>(
                <div key={f.fase} className="vn-cycle-step" style={{ borderLeftColor:f.color }}>
                  <span style={{ color:f.color }}>{f.fase}</span><span>{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="vn-edu-img-wrap">
            <img src="/assets/vn_cycle.png" alt="Ciclo de instrucción" className="vn-edu-img"/>
          </div>
        </div>

        <div className="vn-edu-card">
          <div className="vn-edu-img-wrap">
            <img src="/assets/vn_bottleneck.png" alt="Cuello de botella" className="vn-edu-img"/>
          </div>
          <div className="vn-edu-text">
            <h3 style={{ color:'#e74c3c' }}>⚠️ El Cuello de Botella</h3>
            <p>Ocurre porque la CPU es extremadamente rápida mientras que la RAM es lenta. Al usar un único bus, solo se puede mover un dato a la vez.</p>
            <div style={{ background:'rgba(231,76,60,0.1)', border:'1px solid rgba(231,76,60,0.3)', borderRadius:12, padding:'1rem' }}>
              <p style={{ margin:0, fontSize:'0.85rem', color:'#c0392b' }}><strong>Soluciones:</strong> Memorias Caché (L1, L2, L3) y buses de alta velocidad (DDR5).</p>
            </div>
          </div>
        </div>

        <h2 className="vn-section-title">🌍 Aplicaciones Reales</h2>
        <div className="vn-apps">
          {[
            { title:'Computadoras (PC/Mac)', color:C.cpu, img:'vn_pc.png', desc:'Casi todas las computadoras de uso general usan Von Neumann por su flexibilidad de carga.', note:'💻 Tu PC gestiona Office, Navegador y Spotify en la misma RAM.' },
            { title:'Servidores', color:C.mem, img:'vn_diagram.png', desc:'La capacidad de manejar gigabytes de datos e instrucciones dinámicamente es clave.', note:'🖥 Los centros de datos de Google y Amazon corren bajo este modelo.' },
            { title:'Consolas de Juego', color:'#9b59b6', img:'vn_cycle.png', desc:'Sistemas modernos como PS5 usan arquitectura Von Neumann con Memoria Unificada.', note:'🎮 CPU y GPU comparten el mismo canal de alta velocidad.' },
          ].map((app,i)=>(
            <div key={i} className="vn-app-card">
              <img src={`/assets/${app.img}`} alt={app.title} className="vn-app-img"/>
              <div className="vn-app-body">
                <span style={{ fontWeight:800, color:app.color }}>{app.title}</span>
                <p style={{ fontSize:'0.82rem', opacity:0.8, margin:0 }}>{app.desc}</p>
                <div className="vn-app-note" style={{ borderLeftColor:app.color }}>{app.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="hv-cta">
          <h3>🔬 ¿Quieres profundizar más?</h3>
          <p>La Arquitectura Harvard soluciona el cuello de botella separando las memorias. ¡Explora el siguiente módulo!</p>
          <Link to="/harvard" className="btn-hv-cta">Ver Arquitectura Harvard →</Link>
        </div>

        <div className="vn-quiz-box">
          {!started ? (
            <div style={{ textAlign:'center', padding:'2rem' }}>
              <h2 style={{ color:C.primary, marginBottom:'1rem' }}>Desafío Von Neumann</h2>
              <p style={{ opacity:0.7, marginBottom:'2rem' }}>Pon a prueba tus conocimientos con este test de 20 preguntas.</p>
              <button className="btn-vn-p" onClick={()=>setStarted(true)}>Comenzar Test</button>
            </div>
          ) : done ? (
            <div style={{ textAlign:'center', padding:'2rem' }}>
              <h2 style={{ color:C.primary }}>Puntaje: {score} / {QUESTIONS.length}</h2>
              <p style={{ opacity:0.7, marginBottom:'2rem' }}>{score >= 16 ? '¡Excelente! Eres un experto en Von Neumann.' : 'Sigue repasando para perfeccionar tus conocimientos.'}</p>
              <button className="btn-vn-p" onClick={reset}>Reintentar</button>
            </div>
          ) : (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
                <span style={{ fontWeight:800, color:C.primary }}>Pregunta {qIdx+1} / {QUESTIONS.length}</span>
                <span style={{ fontWeight:700 }}>Aciertos: {score}</span>
              </div>
              <div className="vn-progress"><div className="vn-progress-fill" style={{ width:`${((qIdx+1)/QUESTIONS.length)*100}%` }}/></div>
              <p className="vn-q-text">{QUESTIONS[qIdx].q}</p>
              <div className="vn-options">
                {QUESTIONS[qIdx].opts.map((opt,i)=>{
                  let cls='vn-opt';
                  if(chosen!==null){ if(i===QUESTIONS[qIdx].a) cls+=' correct'; else if(chosen===i) cls+=' wrong'; }
                  return (
                    <button key={i} className={cls} disabled={chosen!==null} onClick={()=>pick(i)}>
                      <span className="vn-opt-letter">{String.fromCharCode(65+i)}.</span>{opt}
                    </button>
                  );
                })}
              </div>
              {chosen!==null && (
                <div className="vn-feedback" style={{ borderColor: chosen===QUESTIONS[qIdx].a?'#22c55e':'#ef4444' }}>
                  <strong>{chosen===QUESTIONS[qIdx].a?'✅ ¡Bien hecho!':'❌ No es correcto.'}</strong> {QUESTIONS[qIdx].exp}
                  <button className="btn-vn-p" style={{ marginTop:'1.5rem', width:'100%' }} onClick={next}>
                    {qIdx+1 < QUESTIONS.length ? 'Siguiente Pregunta' : 'Ver Resultados'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VonNeumann;
