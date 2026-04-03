import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Cpu, Database, LayoutGrid, Play, 
  RotateCcw, CheckCircle, Zap,
  Layers, HardDrive
} from 'lucide-react';

const C = {
  primary: '#0ea5e9',
  secondary: '#6366f1',
  danger: '#ef4444',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc'
};

const QUESTIONS = [
  { q: '¿Quién propuso la arquitectura que usa una sola memoria para datos e instrucciones?', opts: ['John von Neumann', 'Alan Turing', 'Blaise Pascal', 'Ada Lovelace'], a: 0, exp: 'Von Neumann la describió en 1945, sentando las bases de la computación moderna.' },
  { q: '¿Qué realiza la ALU?', opts: ['Almacena archivos', 'Controla periféricos', 'Enfría la CPU', 'Cálculos matemáticos y lógicos'], a: 3, exp: 'La Unidad Aritmético-Lógica es el procesador matemático del sistema.' },
  { q: '¿Qué componente coordina el flujo dentro de la CPU?', opts: ['RAM', 'Disco Rígido', 'Unidad de Control', 'Bus de Datos'], a: 2, exp: 'La Unidad de Control es el cerebro que dirige el ciclo de instrucción.' },
  { q: 'El "cuello de botella de Von Neumann" se debe a…', opts: ['Falta de RAM', 'Bus compartido entre instrucciones y datos', 'Calor de la CPU', 'Monitor lento'], a: 1, exp: 'Al usar un solo camino para todo, la CPU debe esperar a que los datos lleguen de la memoria.' },
  { q: '¿Qué bus apunta la posición de memoria a leer?', opts: ['Bus de Datos', 'Bus de Control', 'Bus USB', 'Bus de Direcciones'], a: 3, exp: 'El bus de direcciones indica el "número de puerta" donde están los datos.' },
  { q: '¿Cómo se llama el bus que transporta los datos reales procesados?', opts: ['Bus de Direcciones', 'Bus de Control', 'Bus de Datos', 'Bus Serial'], a: 2, exp: 'El bus de datos es la autopista por donde viaja la información entre la CPU y la memoria.' },
  { q: '¿Cuál es el concepto clave del "Programa Almacenado"?', opts: ['Guardar programas en CD', 'Instrucciones y datos en la misma memoria principal', 'Tener mucha RAM', 'Usar internet'], a: 1, exp: 'Permite que la computadora sea flexible y pueda ejecutar cualquier tarea cambiando el software sin modificar el hardware.' },
  { q: '¿Qué componente guarda resultados temporales de alta velocidad en la CPU?', opts: ['Registros', 'Disco SSD', 'Monitor', 'Teclado'], a: 0, exp: 'Los registros son las celdas de memoria más rápidas y caras, ubicadas dentro del procesador.' }
];

const phases = [
  { id: 'IDLE', label: 'Inactivo', color: '#94a3b8' },
  { id: 'FETCH', label: 'Búsqueda (Fetch)', color: C.primary, desc: 'La CPU trae la instrucción desde la memoria RAM.' },
  { id: 'DECODE', label: 'Decodificación', color: C.secondary, desc: 'La Unidad de Control interpreta qué operación realizar.' },
  { id: 'EXECUTE', label: 'Ejecución', color: '#f59e0b', desc: 'La ALU realiza el cálculo o la operación lógica.' },
  { id: 'STORE', label: 'Escritura', color: '#10b981', desc: 'El resultado se guarda de nuevo en la memoria o registros.' }
];

const VonNeumann = () => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [cycles, setCycles] = useState(0);

  const nextPhase = () => {
    setPhaseIdx((prev) => (prev + 1) % phases.length);
    if (phaseIdx === phases.length - 1) setCycles(c => c + 1);
  };

  return (
    <LockedContent keyword="arquitectura" title="Clase 2: Modelo de Von Neumann" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: C.text }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: `linear-gradient(to right, ${C.primary}, ${C.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Modelo de Von Neumann
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              El "ADN" de la computación moderna. Descubre cómo una sola memoria unificada revolucionó la flexibilidad de las máquinas.
            </p>
          </motion.div>
        </header>

        {/* Simulador Interactivo */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1.5rem', color: C.primary }}>Simulador de Ciclo</h2>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                   <button 
                    onClick={nextPhase}
                    style={{ background: C.primary, color: '#fff', border: 'none', padding: '1.25rem 2.5rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                  >
                    <Play size={20} /> Siguiente Paso
                  </button>
                  <button 
                    onClick={() => {setPhaseIdx(0); setCycles(0);}}
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', padding: '1.25rem', borderRadius: '20px', cursor: 'pointer' }}
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>
                <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.02)' }}>
                  <h4 style={{ color: phases[phaseIdx].color, fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{phases[phaseIdx].label}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>{phases[phaseIdx].desc || 'Esperando inicio de ciclo.'}</p>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '1rem' }}>Ciclos completados: {cycles}</p>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <img 
                  src="/assets/vn_diagram.png" 
                  alt="Von Neumann Diagram" 
                  style={{ width: '100%', borderRadius: '40px', boxShadow: `0 20px 50px ${C.primary}20` }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, transparent 20%, ${C.bg} 100%)`, borderRadius: '40px' }} />
              </div>
            </div>
          </div>
        </section>

        {/* El "Cuello de Botella" */}
        <section style={{ marginBottom: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          <div style={{ background: C.card, padding: '3.5rem', borderRadius: '45px', borderLeft: `8px solid ${C.danger}` }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: C.danger }}>El Cuello de Botella</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
              Al usar un solo bus para instrucciones y datos, la CPU debe esperar a que la RAM envíe la información. Es el límite físico fundamental de esta arquitectura.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1.25rem' }}>¿Cómo lo solucionamos hoy?</h3>
            <ul style={{ display: 'grid', gap: '1rem', padding: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><CheckCircle size={18} color={C.primary} /> Niveles de Memoria Caché L1/L2/L3 (Puente rápido)</li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><CheckCircle size={18} color={C.primary} /> Arquitecturas híbridas (Caché separada para instrucciones)</li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><CheckCircle size={18} color={C.primary} /> Pipelining (Procesar varias fases a la vez)</li>
            </ul>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: `3px solid ${C.primary}`, boxShadow: '0 30px 60px rgba(14,165,233,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Cpu size={52} color={C.primary} style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: Modelo Von Neumann</h2>
          </div>
          <QuizBlock 
            questions={QUESTIONS} 
            accentColor={C.primary}
            clase="Clase 2: Modelo Von Neumann"
            unidad="Unidad 1"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default VonNeumann;
