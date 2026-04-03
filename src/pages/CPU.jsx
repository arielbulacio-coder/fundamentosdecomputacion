import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Cpu, Zap, Activity, Clock, Layers, Database, 
  Settings, ChevronRight, Play, Info, CheckCircle
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

const CPU_STAGES = [
  { id: 'fetch', name: 'Fetch (Búsqueda)', desc: 'La UC trae la instrucción desde la memoria RAM hacia el IR.', icon: <Database /> },
  { id: 'decode', name: 'Decode (Decodificación)', desc: 'La UC interpreta los 0s y 1s para saber qué operación hacer.', icon: <Layers /> },
  { id: 'execute', name: 'Execute (Ejecución)', desc: 'La ALU realiza el cálculo o la operación lógica solicitada.', icon: <Play /> }
];

const CPU = () => {
  const [cycle, setCycle] = useState('idle');
  const [stepIdx, setStepIdx] = useState(0);

  const startCycle = () => {
    setCycle('running');
    setStepIdx(0);
  };

  useEffect(() => {
    if (cycle === 'running') {
      const timer = setInterval(() => {
        setStepIdx(prev => {
          if (prev >= CPU_STAGES.length - 1) {
            setCycle('complete');
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [cycle]);

  return (
    <LockedContent keyword="fetch" title="Clase 3: El Cerebro del Sistema" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              CPU: El Director de Orquesta
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde el contador de programa hasta la ALU. Entiende cómo billones de transistores ejecutan cada clic de tu mouse.
            </p>
          </motion.div>
        </header>

        {/* Simulador de Ciclo Fetch-Decode-Execute */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#1e293b', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Clock color="#3b82f6" /> Ciclo de Instrucción
              </h2>
              
              <div style={{ marginBottom: '3rem' }}>
                {CPU_STAGES.map((s, i) => (
                  <motion.div 
                    key={s.id}
                    animate={{ 
                      opacity: cycle === 'running' && i === stepIdx ? 1 : 0.4,
                      x: cycle === 'running' && i === stepIdx ? 20 : 0,
                      scale: cycle === 'running' && i === stepIdx ? 1.05 : 1
                    }}
                    style={{ 
                      padding: '1.5rem', 
                      borderRadius: '20px', 
                      background: cycle === 'running' && i === stepIdx ? '#3b82f620' : 'transparent',
                      borderLeft: `5px solid ${cycle === 'running' && i === stepIdx ? '#3b82f6' : '#334155'}`,
                      marginBottom: '1rem'
                    }}
                  >
                    <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 800 }}>{s.name}</h4>
                    {cycle === 'running' && i === stepIdx && <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>{s.desc}</p>}
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={startCycle}
                disabled={cycle === 'running'}
                style={{ 
                  width: '100%', 
                  background: '#3b82f6', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '1.25rem', 
                  borderRadius: '20px', 
                  fontWeight: 900, 
                  cursor: cycle === 'running' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  fontSize: '1rem'
                }}
              >
                {cycle === 'running' ? 'Procesando...' : <><Play size={18} /> Iniciar Pulso de Reloj</>}
              </button>
            </div>

            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/cpu_architecture_modern_1775235433327.png" 
                alt="CPU Internals" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(59,130,246,0.2)' }} 
              />
              <AnimatePresence>
                {cycle === 'running' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    style={{ position: 'absolute', inset: 0, borderRadius: '50px', border: '4px solid #3b82f6', boxShadow: 'inset 0 0 100px rgba(59,130,246,0.4)' }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Anatomía Ampliada */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 900 }}>Las Piezas del Rompecabezas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { Icon: Activity, color: '#3b82f6', title: 'Unidad de Control (UC)', desc: 'Es el cerebro táctico. Decodifica las instrucciones y genera señales de control para que el resto de los componentes sepan qué hacer.' },
              { Icon: Zap, color: '#f59e0b', title: 'Aritmético-Lógica (ALU)', desc: 'La fuerza bruta. Realiza sumas, restas y comparaciones lógicas (Si A > B). Todo cálculo matemático pasa por aquí.' },
              { Icon: Database, color: '#10b981', title: 'Registros Internos', desc: 'Pequeñas celdas de memoria super-rápidas donde se guardan los datos intermedios de cada operación. El PC y el IR son vitales.' },
              { Icon: Layers, color: '#8b5cf6', title: 'Memoria Caché', desc: 'Un buffer entre la CPU y la RAM. Almacena los datos que se usan frecuentemente para evitar cuellos de botella con la lentitud de la RAM.' },
              { Icon: Clock, color: '#ef4444', title: 'Reloj del Sistema', desc: 'Marca el ritmo al que late el procesador. Un pulso de reloj permite dar un "paso" en el ciclo de ejecución.' },
              { Icon: Settings, color: '#94a3b8', title: 'Instruction Set (ISA)', desc: 'El conjunto de instrucciones que la CPU es capaz de entender (ej: Sumar, Mover, Saltar). El software usa este lenguaje.' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <item.Icon size={32} color={item.color} style={{ marginBottom: '1.25rem' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #3b82f6', boxShadow: '0 30px 60px rgba(59,130,246,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Cpu size={52} color="#3b82f6" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: El Procesador</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>20 preguntas para certificar tu conocimiento sobre el corazón de la informática.</p>
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
    </LockedContent>
  );
};

export default CPU;
