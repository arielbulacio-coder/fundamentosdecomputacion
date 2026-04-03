import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import { 
  Cpu, Zap, Database, ArrowRightLeft, Layers, 
  Settings, ChevronRight, Info, CheckCircle, Smartphone, Play, RefreshCw, Box
} from 'lucide-react';

const VN_QUESTS = [
  { q: '¿Cuál es la característica principal de la Arquitectura Von Neumann?', opts: ['Memoria separada para datos e instrucciones', 'Memoria compartida (unificada) para datos e instrucciones', 'No usa memoria RAM', 'Solo tiene una ALU'], a: 1, exp: 'Este modelo permitió que el hardware fuera flexible y pudiera ejecutar cualquier software cargado en memoria.' },
  { q: '¿En qué consiste el "Cuello de Botella" de Von Neumann?', opts: ['Que el CPU se calienta', 'Que el bus de datos es compartido, limitando la velocidad de transferencia entre CPU y Memoria', 'Que no hay suficiente disco rígido', 'Que el mouse es lento'], a: 1, exp: 'Al usar un solo bus para todo, no se puede leer una instrucción y un dato simultáneamente.' },
  { q: 'La Arquitectura Harvard se diferencia porque:', opts: ['Es más vieja', 'Usa memorias físicamente separadas para instrucciones y para datos', 'No tiene ALU', 'Solo tiene 1 bit'], a: 1, exp: 'Esto permite que el procesador lea la siguiente instrucción mientras accede a los datos de la anterior (Paralelismo).' },
  { q: '¿Qué componente de Von Neumann coordina todo el sistema?', opts: ['La ALU', 'La Unidad de Control', 'El Monitor', 'El Disco Rígido'], a: 1, exp: 'La UC es el "director" que interpreta el código y manda señales al resto.' },
  { q: '¿Cuál de estos modelos es el estándar para las computadoras de propósito general (PCs)?', opts: ['Von Neumann', 'Harvard Puro', 'Dual Core', 'Quantum'], a: 0, exp: 'Por simplicidad y costos, las PCs usan Von Neumann en su estructura principal.' },
  { q: '¿Dónde se utiliza principalmente la arquitectura Harvard hoy en día?', opts: ['En Excel', 'En microcontroladores (Arduino, PIC) y dentro de las cachés de los procesadores modernos', 'En servidores de Google', 'No se usa'], a: 1, exp: 'Es ideal para sistemas de tiempo real y alta eficiencia.' },
  { q: 'En el modelo Von Neumann, el programa es tratado como:', opts: ['Hardware', 'Datos (almacenados en la misma memoria)', 'Un video', 'Electricidad'], a: 1, exp: 'Es el concepto de "Programa Almacenado".' },
  { q: '¿Cuál es una ventaja de la Arquitectura Harvard?', opts: ['Menos cables', 'Mayor velocidad debido al acceso paralelo a memoria', 'Es más barata', 'Usa menos RAM'], a: 1, exp: 'Al tener buses separados para código y datos, no hay competencia por el bus.' },
  { q: '¿Qué es la "Arquitectura Harvard Modificada"?', opts: ['Un modelo roto', 'Un híbrido donde el CPU tiene cachés Harvard pero la memoria externa es Von Neumann', 'Un procesador de 1 bit', 'La que usan los celulares viejos'], a: 1, exp: 'Es lo que usan casi todos los CPUs modernos (i7, Ryzen) para maximizar rendimiento.' },
  { q: '¿Qué bus de Von Neumann es bidireccional?', opts: ['Bus de Direcciones', 'Bus de Datos', 'Bus de Instrucciones', 'Ninguno'], a: 1, exp: 'El bus de datos debe poder enviar y recibir información de la memoria.' },
  { q: 'El Bus de Direcciones en Von Neumann sirve para:', opts: ['Suministrar energía', 'Indicar al sistema qué celda de memoria se quiere acceder', 'Conectar el teclado', 'Identificar al usuario'], a: 1, exp: 'Solo la CPU pone direcciones en este bus (unidireccional).' },
  { q: '¿Quién propuso formalmente el modelo de Programa Almacenado en 1945?', opts: ['Steve Jobs', 'Alan Turing', 'John Von Neumann', 'Bill Gates'], a: 2, exp: 'Su reporte sobre el EDVAC sentó las bases de toda la computación moderna.' },
  { q: '¿Cuál es una desventaja de la arquitectura Harvard "Pura"?', opts: ['Es muy lenta', 'El espacio de memoria no utilizado para código no puede usarse para datos (inflexibilidad)', 'No deja navegar por internet', 'Solo usa un bus'], a: 1, exp: 'Al estar físicamente separadas, no se puede compartir el espacio dinámicamente.' },
  { q: 'El componente encargado de hacer cálculos en ambos modelos es:', opts: ['La RAM', 'La ALU (Unidad Aritmético-Lógica)', 'El SSD', 'La Placa de Video'], a: 1, exp: 'Suma, resta, AND, OR, etc.' },
  { q: '¿Qué es el "Bus de Control"?', opts: ['Para manejar el volumen', 'Transporta señales para coordinar actividades (Lectura, Escritura, Interrupciones)', 'El que conecta el mouse', 'Para prender la PC'], a: 1, exp: 'Sincroniza todas las partes del sistema.' },
  { q: '¿Cuántos buses principales tiene la arquitectura Von Neumann mínima?', opts: ['1', '3 (Datos, Direcciones, Control)', '10', '5'], a: 1, exp: 'Estos tres buses forman el sistema de comunicación central.' },
  { q: 'En Harvard, ¿se puede leer un dato mientras se busca la instrucción?', opts: ['No, hay que esperar', 'Sí, porque los canales de comunicación son independientes', 'Solo si hay mucha RAM', 'Depende del sistema operativo'], a: 1, exp: 'Es el beneficio clave del paralelismo Harvard.' },
  { q: '¿Qué es la "Memoria Principal" en estos modelos?', opts: ['El disco rígido', 'La memoria RAM', 'El monitor', 'El microprocesador'], a: 1, exp: 'Donde residen los programas y datos en ejecución.' },
  { q: '¿Cuál de estos dispositivos es una Unidad de Entrada/Salida (I/O) en el modelo VN?', opts: ['La ALU', 'El Teclado', 'El Registro PC', 'La CACHE'], a: 1, exp: 'Permite la comunicación con el mundo exterior.' },
  { q: '¿Por qué Von Neumann es más simple de fabricar?', opts: ['Porque usa menos silicio', 'Porque requiere menos pines de conexión en el procesador al compartir el bus de memoria', 'Porque es más vieja', 'Porque no usa cables'], a: 1, exp: 'Menos buses implican menos complejidad física en la placa madre y el chip.' }
];

const STAGES = [
  { id: 'IDLE', label: 'IDLE', desc: 'Esperando inicio del ciclo.' },
  { id: 'FETCH_ADDR', label: 'FETCH: ADDRESS', desc: 'Colocando dirección del PC en el Bus de Direcciones.' },
  { id: 'FETCH_DATA', label: 'FETCH: DATA', desc: 'Leyendo instrucción de Memoria al Bus de Datos.' },
  { id: 'DECODE', label: 'DECODE', desc: 'La Unidad de Control interpreta la instrucción.' },
  { id: 'EXECUTE', label: 'EXECUTE', desc: 'La ALU o Registros ejecutan la operación.' },
  { id: 'STORE', label: 'STORE', desc: 'Guardando el resultado si es necesario.' }
];

const VonNeumann = () => {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  const nextStep = () => {
    if (running) return;
    setRunning(true);
    setStep(0);
    let curr = 0;
    const interval = setInterval(() => {
      curr++;
      if (curr < STAGES.length) {
        setStep(curr);
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 1200);
  };

  return (
    <LockedContent keyword="harvard" title="Clase 2: Modelos Arquitectónicos" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #0088ff, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Von Neumann vs Harvard
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Los dos pilares de la computación digital. Entiende las diferencias entre el modelo de bus compartido y el sistema de canales paralelos.
            </p>
          </motion.div>
        </header>

        {/* Simulador de Ciclo de Bus Von Neumann */}
        <section style={{ marginBottom: '6rem' }}>
           <div style={{ background: '#111', padding: '4rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '3rem' }}>Simulador de Ciclo de Bus (Von Neumann)</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '4rem', position: 'relative' }}>
                 {/* CPU CARD */}
                 <div style={{ width: '250px', padding: '2rem', background: '#0f172a', border: '2px solid #0088ff', borderRadius: '25px', textAlign: 'center' }}>
                    <Cpu color="#0088ff" size={40} style={{ margin: '0 auto 1rem' }} />
                    <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>C.P.U.</div>
                    <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>Registros: PC=0x01, ACC=42</div>
                 </div>

                 {/* BUSES CONNECTOR */}
                 <div style={{ flex: 1, position: 'relative', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '0 2rem' }}>
                    <div style={{ height: '4px', background: step === 1 ? '#0088ff' : '#1e293b', width: '100%', position: 'relative', boxShadow: step === 1 ? '0 0 10px #0088ff' : 'none' }}>
                       <span style={{ position: 'absolute', top: '-20px', left: '0', fontSize: '0.6rem', color: '#64748b' }}>BUS DIRECCIONES</span>
                       {step === 1 && <motion.div initial={{ left: 0 }} animate={{ left: '100%' }} transition={{ duration: 1 }} style={{ position: 'absolute', top: '-5px', width: '10px', height: '14px', background: '#0088ff', borderRadius: '2px' }} />}
                    </div>
                    <div style={{ height: '4px', background: step === 2 ? '#3b82f6' : '#1e293b', width: '100%', position: 'relative', boxShadow: step === 2 ? '0 0 10px #3b82f6' : 'none' }}>
                       <span style={{ position: 'absolute', top: '-20px', left: '0', fontSize: '0.6rem', color: '#64748b' }}>BUS DATOS (Bidireccional)</span>
                       {step === 2 && <motion.div initial={{ right: 0 }} animate={{ right: '100%' }} transition={{ duration: 1 }} style={{ position: 'absolute', top: '-5px', width: '10px', height: '14px', background: '#3b82f6', borderRadius: '2px' }} />}
                    </div>
                 </div>

                 {/* RAM CARD */}
                 <div style={{ width: '250px', padding: '2rem', background: '#0f172a', border: '2px solid #3b82f6', borderRadius: '25px', textAlign: 'center' }}>
                    <Database color="#3b82f6" size={40} style={{ margin: '0 auto 1rem' }} />
                    <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>RAM (Unificada)</div>
                    <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>[0x01] : LOAD 42</div>
                 </div>
              </div>

              <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '25px', margin: '0 auto 3rem', maxWidth: '600px' }}>
                 <div style={{ fontSize: '0.8rem', color: '#0088ff', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '2px' }}>{STAGES[step].label}</div>
                 <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>{STAGES[step].desc}</p>
              </div>

              <button onClick={nextStep} disabled={running} style={{
                 background: '#0088ff', color: '#fff', border: 'none', padding: '1.25rem 3rem', borderRadius: '20px',
                 fontWeight: 900, fontSize: '1.1rem', cursor: running ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto'
              }}>
                 {running ? <RefreshCw className="spin" /> : <Play />} Iniciar Ciclo de Instrucción
              </button>
           </div>
        </section>

        {/* Comparativa Visual Ampliada */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
          {/* Von Neumann Side */}
          <section style={{ background: '#1e293b', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(0,136,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1rem', background: '#0088ff20', borderRadius: '15px' }}><Cpu color="#0088ff" /></div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Von Neumann</h2>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '2.5rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
              El modelo que define a tu PC. Utiliza un <strong style={{ color: '#0088ff' }}>solo espacio de memoria</strong> para guardar tanto las instrucciones del programa como los datos resultantes.
            </p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {[
                'Bus Compartido (Más económico)',
                'Programa Almacenado (Flexibilidad total)',
                'Cuello de botella de Von Neumann',
                'Instrucciones y Datos en una sola RAM'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#0f172a', padding: '1.25rem', borderRadius: '15px' }}>
                  <CheckCircle size={18} color="#0088ff" />
                  <span style={{ fontWeight: 600 }}>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Harvard Side */}
          <section style={{ background: '#1e293b', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(139,92,246,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1rem', background: '#8b5cf620', borderRadius: '15px' }}><Zap color="#8b5cf6" /></div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Arquitectura Harvard</h2>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '2.5rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
              Diseñada para la velocidad. Utiliza <strong style={{ color: '#8b5cf6' }}>caminos separados</strong> para instrucción y datos, permitiendo acceso doble simultáneo.
            </p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {[
                'Buses Independientes (Alto rendimiento)',
                'Acceso paralelo a instrucciones y datos',
                'Sin cuello de botella de bus',
                'Ideal en Microcontroladores y Caches'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#0f172a', padding: '1.25rem', borderRadius: '15px' }}>
                  <CheckCircle size={18} color="#8b5cf6" />
                  <span style={{ fontWeight: 600 }}>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Teoría Ampliada: La Dualidad Moderna */}
        <section style={{ marginBottom: '6rem', background: '#111', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            <div style={{ padding: '2rem' }}>
               <h3 style={{ fontSize: '2.3rem', fontWeight: 900, marginBottom: '1.5rem', color: '#fff' }}>El Modelo Híbrido</h3>
               <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                 Tus procesadores actuales (Intel/ARM) no son puramente uno u otro. Usan <strong style={{ color: '#3b82f6' }}>Harvard Interno</strong> (L1 Cache dividida) para máxima velocidad dentro del núcleo, pero se comunican con la RAM externa mediante un modelo <strong style={{ color: '#3b82f6' }}>Von Neumann</strong> unificado por simplicidad.
               </p>
            </div>
            <div style={{ position: 'relative' }}>
               <img 
                 src="/assets/harvard_architecture_split_neon_1775235605987.png" 
                 alt="Architecture Comparison" 
                 style={{ width: '100%', borderRadius: '40px', boxShadow: '0 20px 50px rgba(59,130,246,0.3)' }} 
               />
            </div>
          </div>
        </section>

        <RepasoClave
          accentColor="#3b82f6"
          title="Von Neumann vs Harvard"
          facts={[
            { icon: '🧠', term: 'Von Neumann', def: 'Memoria unificada para datos e instrucciones. Base de la mayoría de las PCs. Concepto de "programa almacenado" (1945).' },
            { icon: '⚠️', term: 'Bottleneck de Von Neumann', def: 'El bus compartido crea un cuello de botella: CPU y memoria compiten por el mismo canal.' },
            { icon: '🏫', term: 'Harvard Pura', def: 'Buses físicos separados para instrucciones y datos. Permite acceso simultáneo.' },
            { icon: '⚙️', term: 'Harvard Modificada', def: 'Híbrido moderno: caché separada internamente + RAM unificada externamente.' },
            { icon: '📡', term: 'Buses', def: 'Direcciones (donde), Datos (qué) y Control (cuándo). El sistema circulatorio digital.' },
            { icon: '💾', term: 'Programa Almacenado', def: 'Las instrucciones coexisten en la RAM como si fueran datos, permitiendo reprogramación dinámica.' },
          ]}
        />

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #3b82f6', boxShadow: '0 30px 60px rgba(59,130,246,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <ArrowRightLeft size={52} color="#3b82f6" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Modelos de Computación</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>Valida tu dominio de las arquitecturas Von Neumann y Harvard con 20 preguntas.</p>
          </div>
          <QuizBlock 
            questions={VN_QUESTS} 
            accentColor="#3b82f6"
            clase="Clase 2: Arquitecturas"
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

export default VonNeumann;
