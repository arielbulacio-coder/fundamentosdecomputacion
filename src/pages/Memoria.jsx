import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Database, Zap, Save, RefreshCw, 
  Cpu, HardDrive
} from 'lucide-react';

const MEM_QUESTS = [
  { q: '¿Qué significa que la memoria RAM sea "volátil"?', opts: ['Que es muy rápida', 'Que pierde los datos al apagar la energía', 'Que puede explotar', 'Que se puede mover'], a: 1, exp: 'La RAM necesita electricidad para mantener la información; es almacenamiento temporal.' },
  { q: '¿Cuál es la memoria más rápida de la computadora?', opts: ['Memoria RAM', 'Disco Rígido (HDD)', 'Registros de la CPU', 'Memoria Caché'], a: 2, exp: 'Los registros están dentro de la CPU y operan a su misma velocidad.' },
  { q: '¿Para qué sirve la memoria Caché?', opts: ['Para guardar fotos', 'Para acelerar el acceso a datos usados frecuentemente', 'Para conectar el mouse', 'Para enfriar el procesador'], a: 1, exp: 'La caché guarda copias de datos de la RAM para que la CPU no tenga que esperar tanto tiempo de acceso.' },
  { q: '¿En qué nivel de la jerarquía está el Disco Rígido?', opts: ['Nivel 1 (más rápido)', 'Nivel Intermedio', 'Nivel de Almacenamiento Masivo (lento/barato)', 'Dentro de la CPU'], a: 2, exp: 'El disco es lento comparado con la RAM pero muy grande y no volátil.' },
  { q: 'La jerarquía de memoria busca el equilibrio entre:', opts: ['Color y forma', 'Velocidad, capacidad y costo', 'Software y Hardware', 'Ninguna'], a: 1, exp: 'Buscamos tener mucha capacidad barata (disco) y poca capacidad ultra-rápida (registros/caché).' },
  { q: '¿Qué es la "Localidad Temporal" en el uso de memoria?', opts: ['Guardar datos solo por 5 minutos', 'Tendencia a reutilizar datos que se usaron recientemente', 'Memoria que viaja en el tiempo', 'Borrar datos viejos'], a: 1, exp: 'Si la CPU usa un dato ahora, es muy probable que lo vuelva a usar en breves instantes; la Caché aprovecha esto.' },
  { q: '¿Cuál es la principal ventaja de un SSD frente a un HDD?', opts: ['Es más pesado', 'Usa discos giratorios', 'No tiene partes móviles y es mucho más rápido', 'Es más ruidoso'], a: 2, exp: 'Al ser memoria de estado sólido, el tiempo de acceso es casi instantáneo comparado con el mecánico HDD.' },
  { q: '¿Por qué no usamos solo memoria de tipo "Registros" o "L1" para todo?', opts: ['Porque no caben en la caja', 'Porque son extremadamente caras y ocupan mucho espacio físico en el chip', 'Porque Windows no las reconoce', 'Porque se calientan'], a: 1, exp: 'La tecnología de estas memorias (SRAM) es muy costosa; por eso usamos jerarquías combinadas.' }
];

const Memoria = () => {
  const [activeLevel, setActiveLevel] = useState(0);

  const levels = [
    { title: 'Registros', speed: 'Extrema (1 ciclo)', capacity: 'Bytes', Icon: Cpu, color: '#ef4444' },
    { title: 'Caché (L1-L3)', speed: 'Muy Alta', capacity: 'MegaBytes', Icon: Zap, color: '#f59e0b' },
    { title: 'Memoria RAM', speed: 'Alta', capacity: 'GigaBytes', Icon: RefreshCw, color: '#3b82f6' },
    { title: 'Disco (SSD/HDD)', speed: 'Baja', capacity: 'TeraBytes', Icon: HardDrive, color: '#16a34a' }
  ];

  return (
    <LockedContent keyword="jerarquia" title="Clase 4: Jerarquía de Memoria" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #ef4444, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Jerarquía de Memoria
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              De los registros al almacenamiento masivo. Entiende por qué no toda la memoria es igual y cómo se organiza para optimizar el rendimiento.
            </p>
          </motion.div>
        </header>

        {/* Pirámide de Memoria */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2rem', color: '#ef4444' }}>La Pirámide del Rendimiento</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                A medida que subimos en la pirámide, la memoria es más rápida y costosa. A medida que bajamos, ganamos capacidad pero perdemos velocidad.
              </p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {levels.map((lvl, i) => (
                  <motion.div 
                    key={i}
                    onMouseEnter={() => setActiveLevel(i)}
                    style={{ 
                      padding: '1.5rem', borderRadius: '20px', border: '1.5px solid',
                      borderColor: activeLevel === i ? lvl.color : 'rgba(255,255,255,0.05)',
                      background: activeLevel === i ? lvl.color + '10' : '#1e293b',
                      cursor: 'pointer', transition: '0.3s'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <div style={{ color: lvl.color }}><lvl.Icon size={24} /></div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{lvl.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Capacidad: {lvl.capacity} | Velocidad: {lvl.speed}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/memory_hierarchy_pyramid_1775235453344.png" 
                alt="Memory Pyramid" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(239,68,68,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Conceptos Críticos */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
            <div>
              <Zap color="#f59e0b" size={40} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Localidad de Referencia</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                La CPU tiende a usar datos que están cerca unos de otros (localidad espacial) o datos que usó recientemente (localidad temporal). La Caché explota esto para ser eficiente.
              </p>
            </div>
            <div>
              <Save color="#3b82f6" size={40} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Persistencia</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                La memoria principal es volátil, pero el almacenamiento secundario (discos) es persistente. Ambos son necesarios para el equilibrio del sistema.
              </p>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #ef4444', boxShadow: '0 30px 60px rgba(239,68,68,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Database size={52} color="#ef4444" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: Memorias</h2>
          </div>
          <QuizBlock 
            questions={MEM_QUESTS} 
            accentColor="#ef4444"
            clase="Clase 4: Memorias"
            unidad="Unidad 1"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default Memoria;
