import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import { 
  Cpu, Zap, Activity, Clock, Layers, Database, 
  Settings, ChevronRight, Play, Info, CheckCircle, RefreshCw
} from 'lucide-react';

const CPU_QUESTS = [
  { q: '¿Qué significan las siglas CPU?', opts: ['Control Power Unit', 'Central Processing Unit', 'Computer Primary User', 'Central Peripheral Unit'], a: 1, exp: 'Es el procesador central que ejecuta las instrucciones.' },
  { q: '¿Cuál es la función principal de la ALU (Unidad Aritmético-Lógica)?', opts: ['Controlar el teclado', 'Realizar cálculos matemáticos y comparaciones lógicas', 'Guardar archivos', 'Gestionar la conexión a Internet'], a: 1, exp: 'La ALU hace las sumas, restas y operaciones AND/OR/NOT.' },
  { q: 'La Unidad de Control (UC) se encarga de:', opts: ['Generar calor', 'Coordinar el flujo de datos y decodificar instrucciones', 'Almacenar datos permanentemente', 'Suministrar energía'], a: 1, exp: 'Es el "director de orquesta" del procesador.' },
  { q: '¿Qué es un Registro en el contexto de la CPU?', opts: ['Un libro de visitas', 'Un espacio de almacenamiento masivo', 'Una pequeña celda de memoria de altísima velocidad dentro del procesador', 'Un bus de datos externo'], a: 2, exp: 'Son las memorias más rápidas de toda la computadora.' },
  { q: '¿Qué hace el Registro Contador de Programa (PC)?', opts: ['Cuenta cuántas fotos tienes', 'Apunta a la dirección de la siguiente instrucción a ejecutar', 'Mide la velocidad del ventilador', 'Borra la memoria al apagar'], a: 1, exp: 'Esencial para que el procesador sepa qué sigue.' },
  { q: '¿Cuáles son las 3 etapas del ciclo de instrucción?', opts: ['Guardar, Borrar, Leer', 'Input, Process, Output', 'Fetch, Decode, Execute', 'Copy, Paste, Undo'], a: 2, exp: 'Búsqueda de la instrucción, decodificación por la UC y ejecución por la ALU.' },
  { q: 'La velocidad de reloj se mide comúnmente en:', opts: ['Watts', 'Gigabytes', 'GigaHertz (GHz)', 'Megapíxeles'], a: 2, exp: 'Representa cuántos millones o miles de millones de ciclos de rloj ocurren por segundo.' },
  { q: 'Un procesador Multi-core tiene:', opts: ['Más memoria RAM', 'Múltiples núcleos de procesamiento independientes en un mismo chip', 'Muchos cables', 'Un solo núcleo muy grande'], a: 1, exp: 'Permite el verdadero procesamiento paralelo.' },
  { q: 'De las memorias Caché, ¿cuál es la más pequeña pero más rápida?', opts: ['L1', 'L2', 'L3', 'VRAM'], a: 0, exp: 'L1 está integrada directamente en los núcleos del procesador.' },
  { q: '¿Qué es el Registro de Instrucción (IR)?', opts: ['Donde se guardan los resultados', 'Donde se almacena la instrucción que se está ejecutando actualmente', 'Un registro de errores', 'Un contador de clics'], a: 1, exp: 'Mantiene temporalmente la instrucción mientras es decodificada.' },
  { q: 'El Bus de Direcciones sirve para:', opts: ['Enviar datos', 'Transportar la ubicación de memoria donde se quiere leer o escribir', 'Suministrar electricidad', 'Conectar el monitor'], a: 1, exp: 'Es un bus unidireccional (de la CPU a la memoria).' },
  { q: '¿Qué significa el término "Word size" (Tamaño de palabra) en una CPU?', opts: ['La cantidad de páginas de Word abiertas', 'La cantidad de bits que la CPU puede procesar en una sola operación (ej: 64 bits)', 'El tamaño físico del chip', 'El número de palabras en el manual'], a: 1, exp: 'Determina cuánta memoria RAM se puede direccionar y el ancho de los registros.' },
  { q: '¿Qué es el Pipelining?', opts: ['Un tipo de tubería para enfriamiento líquido', 'Una técnica para ejecutar múltiples instrucciones en diferentes etapas simultáneamente', 'El proceso de fabricar el silicio', 'Una forma de piratear software'], a: 1, exp: 'Mejora la eficiencia al no esperar que una instrucción termine del todo para empezar la siguiente.' },
  { q: '¿Qué es el ISA (Instruction Set Architecture)?', opts: ['Un modelo de placa madre', 'El conjunto de instrucciones que un procesador entiende (ej: x86, ARM)', 'Un software de diseño', 'La marca del procesador'], a: 1, exp: 'Es el "lenguaje" que el hardware expone al software.' },
  { q: '¿Qué indica el TDP (Thermal Design Power)?', opts: ['La velocidad máxima', 'La potencia térmica máxima que el sistema de enfriamiento debe ser capaz de disipar', 'La resolución de pantalla', 'El precio del envío'], a: 1, exp: 'Vital para elegir el cooler adecuado.' },
  { q: 'El Hyper-threading permite:', opts: ['Duplicar la velocidad del reloj', 'Que un núcleo físico maneje dos hilos de ejecución lógicos', 'Tener más disco rígido', 'Conectar dos teclados'], a: 1, exp: 'Aprovecha los tiempos muertos del procesador para hacer más tareas.' },
  { q: '¿Qué hace el Registro de Estado (Flags)?', opts: ['Muestra el país del fabricante', 'Almacena condiciones de la última operación (ej: si el resultado fue cero)', 'Controla el volumen', 'Calcula la fecha'], a: 1, exp: 'Permite los saltos condicionales en programación (IF/ELSE).' },
  { q: '¿Qué es el "Clock Cycle"?', opts: ['Una marca de bicicletas', 'El tiempo entre dos pulsos del oscilador de reloj', 'El tiempo de garantía', 'La vida útil del CPU'], a: 1, exp: 'La unidad de tiempo más pequeña del procesador.' },
  { q: 'El proceso de litografía (ej: 7nm) indica:', opts: ['El peso del chip', 'El tamaño de los transistores (a menor tamaño, más eficiencia)', 'La cantidad de cores', 'El tipo de silicio'], a: 1, exp: 'A menor escala nanométrica, menos consumo y más potencia.' },
  { q: '¿Qué es el Overclocking?', opts: ['Bajar la velocidad para ahorrar luz', 'Forzar al procesador a funcionar a una velocidad superior a la de fábrica', 'Limpiar el procesador', 'Instalar más RAM'], a: 1, exp: 'Aumenta el rendimiento pero genera más calor y puede reducir la vida útil.' }
];

const PHASE_LABELS = ['IDLE', 'FETCH', 'DECODE', 'EXECUTE', 'WRITE-BACK'];
const PHASE_DESCS = {
  IDLE: 'Esperando siguiente orden...',
  FETCH: 'Buscando instrucción en la dirección PC: 0x0A...',
  DECODE: 'LA UC interpreta el código de operación: ADD R1, R2...',
  EXECUTE: 'La ALU realiza la suma binaria de los registros...',
  'WRITE-BACK': 'Guardando el resultado final en el ACUMULADOR (ACC).'
};

const ISA_DATA = [
  { type: 'RISC', full: 'Reduced Instruction Set Computer', key: 'Simple y rápido', examples: 'ARM (celulares), Apple M1/M2/M3', icon: '📱' },
  { type: 'CISC', full: 'Complex Instruction Set Computer', key: 'Complejo y potente', examples: 'Intel x86, AMD Ryzen (PCs)', icon: '🖥️' }
];

// ─── CPU PAGE ───────────────────────────────────────────────────────

const CPU = () => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [pc, setPc] = useState(10);
  const [acc, setAcc] = useState(0);
  const [ir, setIr] = useState('---');
  const [running, setRunning] = useState(false);

  const currentPhase = PHASE_LABELS[phaseIdx];

  const advance = () => {
    if (running) return;
    setRunning(true);
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < PHASE_LABELS.length) {
        setPhaseIdx(idx);
        // Effects per phase
        if (PHASE_LABELS[idx] === 'FETCH') setIr('0x10110');
        if (PHASE_LABELS[idx] === 'EXECUTE') setAcc(prev => (prev + 1) % 255);
        if (PHASE_LABELS[idx] === 'WRITE-BACK') setPc(prev => prev + 1);
      } else {
        clearInterval(interval);
        setRunning(false);
        setPhaseIdx(0);
      }
    }, 1200);
  };

  return (
    <LockedContent keyword="fetch" title="Clase 3: El Cerebro del Sistema" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              CPU: El Director de Orquesta (v2.2)
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde el contador de programa hasta la ALU. Entiende cómo billones de transistores ejecutan cada instrucción en nanosegundos.
            </p>
          </motion.div>
        </header>

        {/* Simulador Avanzado Reconstruido */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ background: '#111', padding: '4rem', borderRadius: '55px', border: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
             
             <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', color: '#3b82f6', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   <Clock /> Ciclo de Procesamiento
                </h2>
                
                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                   {PHASE_LABELS.map((p, i) => (
                     <div key={p} style={{
                        padding: '1.25rem', borderRadius: '20px', borderLeft: '4px solid', transition: '0.3s',
                        borderColor: phaseIdx === i ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                        background: phaseIdx === i ? '#3b82f610' : '#1e293b50',
                        opacity: phaseIdx === i ? 1 : 0.4,
                        transform: phaseIdx === i ? 'translateX(10px)' : 'none'
                     }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <span style={{ fontWeight: 900, fontSize: '0.9rem' }}>{p}</span>
                           {phaseIdx === i && <Activity size={16} color="#3b82f6" />}
                        </div>
                        {phaseIdx === i && <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0.5rem 0 0' }}>{PHASE_DESCS[p]}</p>}
                     </div>
                   ))}
                </div>

                <button onClick={advance} disabled={running} style={{
                   width: '100%', background: '#3b82f6', color: '#fff', border: 'none', padding: '1.25rem',
                   borderRadius: '20px', fontWeight: 900, cursor: running ? 'not-allowed' : 'pointer', fontSize: '1rem', display: 'flex', justifyContent: 'center', gap: '10px'
                }}>
                   {running ? <RefreshCw className="spin" size={20} /> : <><Play size={20} /> Iniciar Secuencia</>}
                </button>
             </div>

             <div style={{ background: '#0f172a', padding: '3rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#3b82f6', marginBottom: '2rem', textAlign: 'center' }}>Registros Internos (Die)</h3>
                
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                   {[
                     { label: 'PC (Program Counter)', val: `0x${pc.toString(16).padStart(4, '0').toUpperCase()}`, color: '#10b981' },
                     { label: 'IR (Instruction Register)', val: ir, color: '#3b82f6' },
                     { label: 'ACC (Acumulador)', val: acc, color: '#ec4899', big: true }
                   ].map((reg, i) => (
                     <div key={i} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, marginBottom: '0.5rem' }}>{reg.label}</div>
                        <div style={{
                           fontSize: reg.big ? '2.5rem' : '1.5rem', fontWeight: 900, color: reg.color, fontFamily: 'monospace'
                        }}>{reg.val}</div>
                     </div>
                   ))}
                </div>

                <div style={{ marginTop: '2.5rem', padding: '1rem', background: '#020617', borderRadius: '15px', textAlign: 'center' }}>
                   <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 800 }}>ALU STATUS: </span>
                   <span style={{ fontSize: '0.8rem', color: phaseIdx === 3 ? '#10b981' : '#64748b' }}>
                      {phaseIdx === 3 ? 'SUMANDO DATOS...' : 'EN ESPERA'}
                   </span>
                </div>
             </div>

          </div>
        </section>

        {/* Sección de Teoría Restante (Manteniendo el diseño moderno) */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 900 }}>Anatomía del Procesador</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { Icon: Activity, color: '#3b82f6', title: 'Unidad de Control', desc: 'Coordina el flujo de datos. Decodifica las instrucciones y genera las señales de habilitación para el resto.' },
              { Icon: Zap, color: '#f59e0b', title: 'ALU', desc: 'El músculo del sistema. Realiza cada suma, resta y comparación lógica necesaria para que tu código funcione.' },
              { Icon: Layers, color: '#8b5cf6', title: 'Pipeline', desc: 'Técnica que permite procesar varias instrucciones a la vez, solapando las fases de Fetch, Decode y Execute.' }
            ].map((item, i) => (
              <div key={i} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <item.Icon size={32} color={item.color} style={{ marginBottom: '1.25rem' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conjunto de Instrucciones (ISA) */}
        <section style={{ marginBottom: '6rem', background: '#0f172a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '40px', padding: '3rem' }}>
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1.2 }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1.5rem' }}>📖 Conjunto de Instrucciones (ISA)</h2>
              <p style={{ opacity: 0.8, lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.1rem' }}>El ISA es la "interfaz" entre el software y el hardware. Define qué operaciones puede hacer la CPU directamente. Existen dos filosofías principales:</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="mobile-stack">
                {ISA_DATA.map(item => (
                  <div key={item.type} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.05)`, borderRadius: '25px', padding: '1.5rem' }}>
                    <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>{item.icon}</div>
                    <strong style={{ color: '#3b82f6', fontSize: '1.3rem', display: 'block' }}>{item.type}</strong>
                    <div style={{fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem'}}>{item.full}</div>
                    <p style={{fontSize: '0.95rem', margin: '0.5rem 0', opacity: 0.8}}>{item.key}</p>
                    <em style={{fontSize: '0.8rem', opacity: 0.6}}>Ej: {item.examples}</em>
                  </div>
                ))}
              </div>
            </div>
            <img src="/assets/cpu_internals.png" alt="ISA Diagram" style={{ width: '100%', maxWidth: '400px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
        </section>

        {/* Reloj del Sistema */}
        <section style={{ marginBottom: '6rem', display: 'flex', gap: '3rem', alignItems: 'center', background: 'linear-gradient(to right, rgba(245,158,11,0.05), transparent)', padding: '3rem', borderRadius: '40px', borderLeft: `6px solid #f59e0b` }} className="mobile-stack">
          <img src="/assets/cpu_clock.png" alt="Clock Signal" style={{ width: '180px', borderRadius: '20px' }} />
          <div>
            <h2 style={{ color: '#f59e0b', margin: 0, fontSize: '2.5rem', fontWeight: 900 }}>⏱️ El Reloj: El Latido del Sistema</h2>
            <p style={{ margin: '1rem 0', fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.7 }}>
              La CPU no corre de forma continua, sino a "pulsos". Cada pulso del reloj permite avanzar un pequeño paso en la ejecución de una instrucción.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '15px' }}>
                <strong style={{ color: '#f59e0b' }}>Hertz (Hz):</strong> 1 pulso por segundo.
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '15px' }}>
                <strong style={{ color: '#f59e0b' }}>Gigahertz (GHz):</strong> ¡Mil millones de pulsos por segundo!
              </div>
            </div>
          </div>
        </section>

        <RepasoClave
          accentColor="#3b82f6"
          title="El Procesador (CPU)"
          facts={[
            { icon: '🔄', term: 'Ciclo FDE', def: 'Fetch (traer instrucción) → Decode (interpretar) → Execute (ejecutar). Se repite billones de veces por segundo.' },
            { icon: '🧮', term: 'ALU', def: 'Realiza cálculos aritméticos y decisiones lógicas basándose en bits.' },
            { icon: '⚡', term: 'Reloj del Sistema', def: 'Marca el pulso. 1 GHz significa 1.000 millones de ciclos de procesamiento por segundo.' },
            { icon: '📦', term: 'Registros', def: 'Memoria ultrarrápida integrada en el silicio para guardar datos inmediatos.' },
            { icon: '🏙️', term: 'Arquitectura ISA', def: 'El lenguaje que el hardware "entiende". Define qué instrucciones puede ejecutar (RISC/CISC).' },
            { icon: '🏗️', term: 'Pipelining', def: 'Segmentación de instrucciones para aumentar el rendimiento sin subir la frecuencia de reloj.' },
          ]}
        />

        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #3b82f6', boxShadow: '0 30px 60px rgba(59,130,246,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Cpu size={52} color="#3b82f6" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: El Procesador</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>Valida tus conocimientos sobre la CPU con 20 preguntas aleatorias.</p>
          </div>
          <QuizBlock 
            questions={CPU_QUESTS} 
            accentColor="#3b82f6"
            clase="Clase 3: Proceso Central"
            unidad="Unidad 1"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>

       <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </LockedContent>
  );
};

export default CPU;
