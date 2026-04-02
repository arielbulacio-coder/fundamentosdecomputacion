import LockedContent from '../components/LockedContent';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const C = {
  primary: '#004a99',
  secondary: '#0066cc',
  accent: '#e6f0ff',
  harv: '#f39c12',
  cpu: '#004a99',
  mem: '#0066cc',
  io: '#27ae60',
};

const QUESTIONS = [
  { q:'¿En qué se diferencia principalmente la arquitectura Harvard del modelo de Von Neumann?', opts:['En tener memorias separadas para datos e instrucciones','En usar más transistores','En no tener buses','En el tipo de procesador'], a:0, exp:'Harvard separa físicamente la memoria de programa y la memoria de datos, con buses independientes.' },
  { q:'¿Cuál de estos dispositivos usa típicamente arquitectura Harvard?', opts:['Una PC de escritorio','Un laptop con Windows','Un microcontrolador Arduino','Un servidor web'], a:2, exp:'El ATmega328 de Arduino usa arquitectura Harvard pura con Flash separada de RAM.' },
  { q:'¿Qué ventaja principal ofrece Harvard sobre Von Neumann?', opts:['Menor costo','Usa menos energía','Tiene más RAM','Puede acceder a instrucciones y datos simultáneamente'], a:3, exp:'Al tener buses separados, puede leer instrucciones y datos al mismo tiempo, sin cuello de botella.' },
  { q:'¿Qué tipo de memoria usa Harvard para guardar el programa en microcontroladores?', opts:['Memoria Flash (ROM)','RAM volátil','Disco rígido','Memoria caché'], a:0, exp:'Los programas se graban en Flash/ROM persistente, mientras los datos van en la RAM interna.' },
  { q:'¿Qué es la "Arquitectura Harvard Modificada"?', opts:['Una variante con dos núcleos','Una arquitectura sin unidad de control','Una variante que permite acceder a instrucciones como datos en ciertos contextos','Una versión que unifica los buses de direcciones'], a:2, exp:'Harvard Modificada usa cachés L1 divididos (instrucciones y datos) pero memoria principal unificada.' },
  { q:'¿Qué procesador popular en smartphones usa una variante de arquitectura Harvard?', opts:['Intel x86','PowerPC','AMD Ryzen','ARM Cortex'], a:3, exp:'Los procesadores ARM Cortex-A usan Harvard Modificada con cachés L1 separados.' },
  { q:'En un microcontrolador Harvard, la memoria de programa es típicamente…', opts:['Volátil y borrable','Solo en RAM','No volátil (Flash/EEPROM)','Parte del bus de datos'], a:2, exp:'Flash persiste el programa sin energía, a diferencia de la RAM.' },
  { q:'¿Cómo conecta Harvard la CPU con sus dos memorias separadas?', opts:['Un único bus compartido','Conexión inalámbrica','Dos buses independientes (uno por memoria)','Solo por interrupciones'], a:2, exp:'Bus de instrucciones separado del bus de datos: esto elimina el cuello de botella.' },
  { q:'¿Qué significa que la memoria de programa en Harvard sea de "solo lectura" durante ejecución?', opts:['Que el programa no puede modificarse a sí mismo en ejecución','Que no puede ejecutar nada','Que la CPU no puede leerla','Que no hay datos'], a:0, exp:'El programa en Flash es leído por la CPU, pero no puede sobrescribirse en tiempo de ejecución.' },
  { q:'¿Qué aplicación industrial usa comúnmente arquitectura Harvard pura?', opts:['Servidores de base de datos','Computadoras de escritorio','Videoconsolas modernas','Sistemas de control embebido (PLCs, DSP)'], a:3, exp:'PLCs y DSPs para control de motores y procesamiento de señales usan Harvard por su velocidad predecible.' },
  { q:'¿Por qué Harvard es preferida en sistemas de tiempo real (RTOS)?', opts:['Porque es más barata','Porque usa menos energía','Porque el tiempo de acceso a instrucciones es constante y predecible','Por su compatibilidad con Windows'], a:2, exp:'El acceso simultáneo garantiza tiempos de respuesta deterministas, crítico en RTOS.' },
  { q:'¿Qué familia de microcontroladores de Microchip usa arquitectura Harvard?', opts:['ARM','PIC','MIPS','RISC-V'], a:1, exp:'Los PIC tienen bus de instrucciones de 14/16 bits separado del bus de datos de 8 bits.' },
  { q:'En la arquitectura Harvard Modificada de un procesador moderno, ¿qué tiene separado?', opts:['Los cachés L1 de instrucciones y datos','Los registros de la ALU','El disco rígido y la RAM','La pantalla y el teclado'], a:0, exp:'Caché L1 dividido: L1-I (instrucciones) y L1-D (datos). A partir de L2, es unificado.' },
  { q:'¿Cuál es la desventaja principal de Harvard pura frente a Von Neumann?', opts:['Es más lenta','La memoria de instrucciones no puede usarse para datos aunque esté libre','No puede ejecutar programas','No tiene buses'], a:1, exp:'En Harvard pura, si el programa es pequeño y sobra memoria de instrucciones, ese espacio no puede usarse para datos.' },
  { q:'¿Qué tipo de procesamiento se beneficia MÁS de la arquitectura Harvard?', opts:['Procesamiento de señales de audio/video en tiempo real','Edición de documentos de texto','Navegación web','Gestión de bases de datos'], a:0, exp:'El DSP Harvard puede procesar muestras de audio/video continuamente sin detener la CPU.' },
  { q:'¿Por qué Arduino puede ejecutar código sin sistema operativo?', opts:['Porque usa Windows embebido','Porque el programa vive en Flash y se ejecuta directamente','Porque la arquitectura Harvard separa el programa del SO','Porque no tiene RAM'], a:1, exp:'El programa en Flash se ejecuta directamente al encender: no necesita cargarse en RAM ni OS.' },
  { q:'Un DSP de audio usa Harvard porque…', opts:['Es más barato','Usa menos energía','El bus de instrucciones no compite con el de muestras de audio dando máxima velocidad','Tiene más memoria'], a:2, exp:'El DSP puede leer la siguiente instrucción mientras transfiere muestras de audio: paralelismo total.' },
  { q:'¿En qué nivel de caché de una CPU moderna se implementa Harvard Modificada?', opts:['L3','L1','L2','Ninguna'], a:1, exp:'Caché L1 está dividido: L1-I (instrucciones) y L1-D (datos). A partir de L2, la caché es unificada.' },
  { q:'¿Qué sucede si un programa en Harvard intenta escribir en su propia memoria de instrucciones?', opts:['Ejecuta el dato como instrucción','Se borra la RAM','Genera un error o excepción de hardware','Se apaga el sistema'], a:2, exp:'Los microcontroladores Harvard lanzan una excepción, ya que el bus de programa es de solo lectura en ejecución.' },
  { q:'¿Cuál describe mejor los procesadores modernos (Intel, AMD, ARM)?', opts:['Harvard pura por su simplicidad','Von Neumann porque es más barata','Harvard Modificada: cachés L1 separados, memoria principal unificada','Ninguna de las dos se usa hoy'], a:2, exp:'Todos los procesadores modernos usan Harvard Modificada internamente para aprovechar lo mejor de ambos mundos.' }
];

const Harvard = () => {
  const [qIdx,   setQIdx]   = useState(0);
  const [score,  setScore]  = useState(0);
  const [chosen, setChosen] = useState(null);
  const [done,   setDone]   = useState(false);
  const [started,setStarted]= useState(false);

  const examples = [
    { title:'Arduino (ATmega328)', color:C.harv, img:'vn_arduino.png', imgAlt:'Arduino con arquitectura Harvard',
      desc:'El Arduino UNO tiene 32 KB de Flash para el programa y 2 KB de RAM para datos, con buses separados.',
      note:'🔬 El ATmega328 puede leer la siguiente instrucción de Flash mientras accede a datos en RAM simultáneamente.' },
    { title:'Microcontroladores PIC', color:'#27ae60', img:'vn_diagram.png', imgAlt:'PIC Harvard',
      desc:'Arquitectura Harvard pura: bus de instrucciones de 14 bits separado del bus de datos de 8 bits.',
      note:'🏭 Muy populares en el control industrial por su simplicidad y bajo costo.' },
    { title:'ARM Cortex (Smartphones)', color:C.mem, img:'vn_smartphone.png', imgAlt:'Smartphone ARM',
      desc:'Usan Harvard Modificada: cachés L1 divididos (Instrucciones y Datos) para máximo rendimiento.',
      note:'📱 El chip Apple A17 o los Snapdragon modernos usan este modelo para ahorrar energía.' },
    { title:'Procesadores DSP', color:'#e74c3c', img:'vn_dsp.png', imgAlt:'DSP Harvard',
      desc:'Procesamiento de señal de audio y video en tiempo real sin interrupciones.',
      note:'🎵 Paralelismo total para cálculos matemáticos continuos.' },
  ];

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

  return (
    <>
      <style>{`
        .hv-page { padding:1rem; max-width:1100px; margin:0 auto; font-family:system-ui,sans-serif; color:var(--text); }
        .hv-page * { box-sizing:border-box; }
        .hv-h1 { text-align:center; font-size:clamp(1.5rem,4vw,2.4rem); font-weight:900; margin:0 0 0.25rem; color: var(--primary); }
        .hv-sub { text-align:center; opacity:0.6; font-size:0.9rem; margin-bottom:1.5rem; }
        .hv-section-title { text-align:center; font-size:clamp(1.2rem,3vw,1.5rem); font-weight:900; margin:2rem 0 1.25rem; color: var(--primary); }

        .hv-diagram-box { background:#fff; border:1px solid var(--border); border-radius:20px; padding:1.5rem; margin-bottom:1.5rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); }
        .hv-grid { display:grid; grid-template-columns:1fr 60px 1fr; gap:1rem; align-items:center; }
        .hv-comp { border-radius:14px; padding:1rem; border:1.5px solid; display:flex; flex-direction:column; gap:0.5rem; }
        .hv-mem-block { border-radius:10px; padding:0.6rem 0.75rem; font-size:0.8rem; display:flex; justify-content:space-between; background:rgba(0,0,0,0.02); }
        .hv-buses { display:flex; flex-direction:column; justify-content:center; gap:1.5rem; height:100%; }
        .hv-bus { height:8px; border-radius:4px; position:relative; }
        .hv-bus-lbl { position:absolute; top:-16px; left:50%; transform:translateX(-50%); font-size:0.5rem; font-weight:800; white-space:nowrap; }
        .hv-io { grid-column:1/4; display:flex; justify-content:space-around; align-items:center;
          border:1.5px solid #27ae60; background:rgba(39,174,96,0.03); border-radius:12px; padding:0.6rem; margin-top:0.25rem; }
        .hv-io-block { text-align:center; }
        .hv-io-block small { display:block; font-size:0.6rem; color:#27ae60; font-weight:800; }

        .hv-compare { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem; }
        .hv-compare-box { background:#fff; border:1.5px solid; border-radius:16px; padding:1.25rem; }
        .hv-compare-box ul { font-size:0.85rem; line-height:1.8; opacity:0.85; margin:0; padding-left:1.2rem; }

        .hv-img-row { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:1.25rem; margin-bottom:1.5rem; }
        .hv-img-card { background:#fff; border:1px solid var(--border); border-radius:16px; overflow:hidden; }
        .hv-img-card img { width:100%; height:200px; object-fit:cover; border-bottom: 1px solid var(--border); }
        .hv-img-caption { padding:0.75rem 1rem; font-size:0.82rem; opacity:0.8; }

        .hv-examples { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:1.25rem; margin-bottom:2rem; }
        .hv-example { background:#fff; border:1px solid var(--border); border-radius:16px; overflow:hidden; display:flex; flex-direction:column; }
        .hv-example-img { width:100%; height:160px; object-fit:cover; border-bottom:1px solid var(--border); }
        .hv-example-body { padding:1rem; display:flex; flex-direction:column; gap:0.5rem; flex:1; }
        .hv-example-note { font-size:0.78rem; opacity:0.7; padding:0.5rem; border-radius:8px; background:var(--accent); border-left:3px solid var(--primary); margin-top:auto; }

        .hv-quiz-box { background:#fff; border:1px solid var(--border); border-top:4px solid var(--primary); border-radius:20px; padding:1.25rem; }
        .hv-progress { height:5px; background:var(--accent); border-radius:3px; margin-bottom:1.25rem; }
        .hv-progress-fill { height:100%; border-radius:3px; background:var(--primary); transition:width .3s; }
        .hv-q-text { font-size:1rem; font-weight:700; margin-bottom:1.25rem; line-height:1.5; }
        .hv-options { display:flex; flex-direction:column; gap:0.6rem; }
        .hv-opt { width:100%; display:flex; align-items:flex-start; gap:0.75rem; background:#fff; border:1.5px solid var(--border); border-radius:12px;
          padding:0.85rem 1rem; color:var(--text); cursor:pointer; text-align:left; font-size:0.9rem; line-height:1.4; transition:all 0.2s; }
        .hv-opt:hover:not(:disabled) { background:var(--accent); border-color:var(--primary); }
        .hv-opt.correct { background:rgba(34,197,94,.1) !important; border-color:#22c55e !important; color:#1b5e20 !important; }
        .hv-opt.wrong   { background:rgba(239,68,68,.1)  !important; border-color:#ef4444 !important; color:#b71c1c !important; }
        .btn-hv { cursor:pointer; padding:0.6rem 1.4rem; border-radius:12px; font-weight:800; font-size:0.9rem; border:none; background:var(--primary); color:#fff; transition:transform .15s; }

        @media(max-width:650px){
          .hv-diagram-box { padding:0.9rem; }
          .hv-grid { grid-template-columns:1fr; }
          .hv-buses { flex-direction:row; height:45px; gap:0.75rem; align-items:center; }
          .hv-bus { flex:1; height:8px; }
          .hv-bus-lbl { top:-14px; }
          .hv-io { grid-column:1; }
          .hv-compare { grid-template-columns:1fr; }
          .hv-q-text { font-size:0.95rem; }
          .hv-opt { font-size:0.85rem; padding:0.75rem; }
        }
      `}</style>

      <div className="hv-page">
        <h1 className="hv-h1">Arquitectura Harvard</h1>
        <p className="hv-sub">Memorias separadas · Buses independientes · Máximo rendimiento</p>

        <h2 className="hv-section-title">🔬 Diagrama de Arquitectura Harvard</h2>
        <div className="hv-diagram-box">
          <div className="hv-grid">
            <div className="hv-comp" style={{ borderColor:C.cpu, background:'rgba(0,74,153,0.02)' }}>
              <h3 style={{ color:C.cpu, margin:0, fontSize:'0.95rem', fontWeight:800 }}>🖥 CPU</h3>
              {[['PC (Program Counter)','0x00'],['IR (Instrucción)','LOAD'],['ACC (Acumulador)','42']].map(([k,v])=>(
                <div key={k} className="hv-mem-block">
                  <span style={{ fontSize:'0.72rem', opacity:0.8 }}>{k}</span><code style={{ fontSize:'0.72rem' }}>{v}</code>
                </div>
              ))}
              <div style={{ display:'flex', gap:'0.5rem', marginTop:'0.4rem' }}>
                {['ALU','UC'].map(l=>(
                  <span key={l} style={{ flex:1, textAlign:'center', padding:'0.2rem', borderRadius:6, background:C.accent, border:`1px solid ${C.cpu}40`, color:C.cpu, fontSize:'0.7rem', fontWeight:800 }}>{l}</span>
                ))}
              </div>
            </div>

            <div className="hv-buses">
              <div className="hv-bus" style={{ background:C.harv }}>
                <span className="hv-bus-lbl" style={{ color:C.harv }}>Bus Instruc.</span>
              </div>
              <div className="hv-bus" style={{ background:C.cpu }}>
                <span className="hv-bus-lbl" style={{ color:C.cpu }}>Bus Datos</span>
              </div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              <div className="hv-comp" style={{ borderColor:C.harv, background:'rgba(243,156,18,0.02)' }}>
                <h3 style={{ color:C.harv, margin:0, fontSize:'0.88rem', fontWeight:800 }}>📂 Programa (Flash)</h3>
                {['LOAD 42','ADD 15','SUB 07','STR 57'].map((v,i)=>(
                  <div key={i} className="hv-mem-block" style={{ background: i===0?C.accent:'rgba(0,0,0,0.02)' }}>
                    <code style={{ fontSize:'0.7rem' }}>0x{i.toString(16).padStart(2,'0').toUpperCase()}</code>
                    <code style={{ fontSize:'0.7rem' }}>{v}</code>
                  </div>
                ))}
              </div>
              <div className="hv-comp" style={{ borderColor:C.cpu, background:'rgba(0,102,204,0.02)' }}>
                <h3 style={{ color:C.cpu, margin:0, fontSize:'0.88rem', fontWeight:800 }}>💾 Datos (RAM)</h3>
                {['42','15','57','72'].map((v,i)=>(
                  <div key={i} className="hv-mem-block">
                    <code style={{ fontSize:'0.7rem' }}>D0x0{i}</code>
                    <code style={{ fontSize:'0.7rem' }}>{v}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="hv-io">
              <div className="hv-io-block"><small>ENTRADA</small><span style={{ fontSize:'1.3rem' }}>⌨️🖱️</span></div>
              <div style={{ width:2, height:32, background:'rgba(39,174,96,0.3)' }}/>
              <div className="hv-io-block"><small>SALIDA</small><span style={{ fontSize:'1.3rem' }}>🖥️🔊</span></div>
            </div>
          </div>
        </div>

        <div style={{ background:C.accent, border:`1px solid ${C.primary}30`, borderRadius:16, padding:'1.25rem', marginBottom:'1.5rem' }}>
          <p style={{ margin:0, fontSize:'0.9rem', lineHeight:1.7 }}>
            🚀 <strong>Eficiencia Total:</strong> Al separar físicamente las memorias, la CPU puede buscar la siguiente instrucción <em>al mismo tiempo</em> que guarda datos en RAM. Esto duplica el ancho de banda efectivo comparado con Von Neumann.
          </p>
        </div>

        <h2 className="hv-section-title">⚖️ Comparativa: Harvard vs. Von Neumann</h2>
        <div className="hv-compare">
          <div className="hv-compare-box" style={{ borderColor:C.cpu }}>
            <h3 style={{ color:C.cpu }}>⚙️ Von Neumann</h3>
            <ul>
              <li>Bus de datos e instrucciones compartido.</li>
              <li>Memoria unificada (flexibilidad).</li>
              <li>Presenta Cuello de Botella.</li>
              <li>Hardware más simple y económico.</li>
              <li>Ideal para Computadoras Personales.</li>
            </ul>
          </div>
          <div className="hv-compare-box" style={{ borderColor:C.harv }}>
            <h3 style={{ color:C.harv }}>🔬 Harvard</h3>
            <ul>
              <li>Buses independientes y simultáneos.</li>
              <li>Memorias separadas físicamente.</li>
              <li>Elimina el cuello de botella.</li>
              <li>Hardware especializado y eficiente.</li>
              <li>Ideal para Microcontroladores y DSPs.</li>
            </ul>
          </div>
        </div>

        <h2 className="hv-section-title">🖼 Referencias Visuales</h2>
        <div className="hv-img-row">
          {[
            { img:'vn_arduino.png', l:'Arduino UNO: Harvard Pura' },
            { img:'vn_smartphone.png', l:'Smartphone: Harvard Modificada' },
            { img:'vn_dsp.png', l:'DSP: Procesamiento de Señal' },
            { img:'vn_vs_harvard.png', l:'Comparación Estructural' }
          ].map((item,i)=>(
            <div key={i} className="hv-img-card">
              <img src={`/assets/${item.img}`} alt={item.l}/>
              <div className="hv-img-caption">{item.l}</div>
            </div>
          ))}
        </div>

        <h2 className="hv-section-title">🌍 Aplicaciones Reales</h2>
        <div className="hv-examples">
          {examples.map((ex,i)=>(
            <div key={i} className="hv-example">
              <img src={`/assets/${ex.img}`} alt={ex.imgAlt} className="hv-example-img"/>
              <div className="hv-example-body">
                <span style={{ fontWeight:800, color:ex.color }}>{ex.title}</span>
                <p style={{ fontSize:'0.83rem', opacity:0.8, margin:0 }}>{ex.desc}</p>
                <div className="hv-example-note" style={{ borderLeftColor:ex.color }}>{ex.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="hv-quiz-box">
          {!started ? (
            <div style={{ textAlign:'center', padding:'2rem' }}>
              <h2 style={{ color:C.primary, marginBottom:'1rem' }}>Desafío Harvard</h2>
              <p style={{ opacity:0.7, marginBottom:'2rem' }}>Pon a prueba tus conocimientos sobre buses separados y rendimiento.</p>
              <button className="btn-hv" onClick={()=>setStarted(true)}>Comenzar Test</button>
            </div>
          ) : done ? (
            <div style={{ textAlign:'center', padding:'2rem' }}>
              <h2 style={{ color:C.primary }}>Puntaje: {score} / {QUESTIONS.length}</h2>
              <p style={{ opacity:0.7, marginBottom:'2rem' }}>{score >= 15 ? '¡Excelente! Dominas los conceptos de Harvard.' : 'Sigue practicando para ser un experto.'}</p>
              <button className="btn-hv" onClick={reset}>Reintentar</button>
            </div>
          ) : (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
                <span style={{ fontWeight:800, color:C.primary }}>Pregunta {qIdx+1} / {QUESTIONS.length}</span>
                <span style={{ fontWeight:700 }}>Aciertos: {score}</span>
              </div>
              <div className="hv-progress"><div className="hv-progress-fill" style={{ width:`${((qIdx+1)/QUESTIONS.length)*100}%` }}/></div>
              <p className="hv-q-text">{QUESTIONS[qIdx].q}</p>
              <div className="hv-options">
                {QUESTIONS[qIdx].opts.map((opt,i)=>{
                  let cls='hv-opt';
                  if(chosen!==null){ if(i===QUESTIONS[qIdx].a) cls+=' correct'; else if(chosen===i) cls+=' wrong'; }
                  return (
                    <button key={i} className={cls} disabled={chosen!==null} onClick={()=>pick(i)}>
                      <span className="hv-opt-letter">{String.fromCharCode(65+i)}.</span>{opt}
                    </button>
                  );
                })}
              </div>
              {chosen!==null && (
                <div className="hv-feedback" style={{ borderColor: chosen===QUESTIONS[qIdx].a?'#22c55e':'#ef4444' }}>
                  <strong>{chosen===QUESTIONS[qIdx].a?'✅ ¡Correcto!':'❌ No es cierto.'}</strong> {QUESTIONS[qIdx].exp}
                  <button className="btn-hv" style={{ marginTop:'1.5rem', width:'100%', border:'1px solid var(--border)' }} onClick={next}>
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

export default Harvard;
