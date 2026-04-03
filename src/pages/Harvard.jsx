import React from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Box, Cpu, Database, Laptop, 
  Smartphone, Monitor, CheckCircle,
  Activity
} from 'lucide-react';

const C = {
  primary: '#3b82f6',
  secondary: '#06b6d4',
  accent: '#a855f7',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc'
};

const QUESTIONS = [
  { q: '¿En qué se diferencia principalmente la arquitectura Harvard del modelo de Von Neumann?', opts: ['En tener memorias separadas para datos e instrucciones', 'En usar más transistores', 'En no tener buses', 'En el tipo de procesador'], a: 0, exp: 'Harvard separa físicamente la memoria de programa y la memoria de datos, con buses independientes.' },
  { q: '¿Cuál de estos dispositivos usa típicamente arquitectura Harvard?', opts: ['Una PC de escritorio', 'Un laptop con Windows', 'Un microcontrolador Arduino', 'Un servidor web'], a: 2, exp: 'El ATmega328 de Arduino usa arquitectura Harvard pura con Flash separada de RAM.' },
  { q: '¿Qué ventaja principal ofrece Harvard sobre Von Neumann?', opts: ['Menor costo', 'Usa menos energía', 'Tiene más RAM', 'Puede acceder a instrucciones y datos simultáneamente'], a: 3, exp: 'Al tener buses separados, puede leer instrucciones y datos al mismo tiempo, sin cuello de botella.' },
  { q: '¿Qué tipo de memoria usa Harvard para guardar el programa en microcontroladores?', opts: ['Memoria Flash (ROM)', 'RAM volátil', 'Disco rígido', 'Memoria caché'], a: 0, exp: 'Los programas se graban en Flash/ROM persistente, mientras los datos van en la RAM interna.' },
  { q: '¿Qué es la "Arquitectura Harvard Modificada"?', opts: ['Una variante con dos núcleos', 'Una arquitectura sin unidad de control', 'Una variante que permite acceder a instrucciones como datos en ciertos contextos', 'Una versión que unifica los buses de direcciones'], a: 2, exp: 'Harvard Modificada usa cachés L1 divididos (instrucciones y datos) pero memoria principal unificada.' },
  { q: '¿Cuál es el principal inconveniente de la arquitectura Harvard para computadoras de propósito general?', opts: ['Es muy lenta', 'El doble de cableado y buses aumenta el costo y complejidad del hardware principal', 'No permite instalar Windows', 'Consume demasiada RAM'], a: 1, exp: 'Tener buses físicos separados para todo el sistema es caro, por eso en PCs se prefiere Von Neumann con cachés Harvard.' },
  { q: '¿Qué componente de la arquitectura Harvard permite realizar lecturas paralelas?', opts: ['La unidad de control dual', 'Buses de direcciones y datos independientes para cada memoria', 'El uso de discos SSD', 'La conexión a internet'], a: 1, exp: 'Al tener juegos de cables independientes, no hay competencia por el bus entre datos e instrucciones.' },
  { q: 'En un sistema Harvard, ¿se puede borrar accidentalmente el programa mientras se guardan datos?', opts: ['Sí, siempre', 'Solo si no hay batería', 'No, porque están en memorias físicas o lógicas distintas y protegidas', 'Depende del monitor'], a: 2, exp: 'La separación física o de permisos impide que las constantes del programa sean sobrescritas por variables de datos.' }
];

const Harvard = () => {
  return (
    <LockedContent keyword="arquitectura" title="Clase 2 suplemento: Harvard" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: C.text }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: `linear-gradient(to right, ${C.primary}, ${C.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Arquitectura Harvard
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Buses paralelos y memorias divididas: la fórmula de alta velocidad para microcontroladores y procesadores de alto rendimiento.
            </p>
          </motion.div>
        </header>

        {/* Comparativa y Diagrama */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: C.card, padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem' }}>El fin del cuello de botella</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                Al separar físicamente las memorias de programa y datos, la CPU puede leer la siguiente instrucción mientras está guardando un resultado en RAM. <strong>Paralelismo total.</strong>
              </p>
              <div style={{ background: '#000', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(6,182,212,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: C.secondary }}>
                    <Activity size={18} />
                    <span style={{ fontWeight: 800, fontSize: '0.7rem', letterSpacing: '1px' }}>BUS PROGRAMA</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: C.accent }}>
                    <Activity size={18} />
                    <span style={{ fontWeight: 800, fontSize: '0.7rem', letterSpacing: '1px' }}>BUS DATOS</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
                  <Box size={35} color={C.secondary} />
                  <Database size={35} color={C.accent} />
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.5, textAlign: 'center' }}>Caminos paralelos = Máxima velocidad.</p>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/harvard_architecture_split_neon_1775235605987.png" 
                alt="Harvard Architecture" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(6,182,212,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Aplicaciones */}
        <section style={{ marginBottom: '6rem', background: 'rgba(255,255,255,0.02)', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>Dominio en el Mundo Embebido</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {[
              { icon: <Smartphone />, title: 'Microcontroladores', color: C.primary, desc: 'Arduino (AVR) y PIC usan Harvard pura para garantizar respuesta inmediata.' },
              { icon: <Laptop />, title: 'Procesadores ARM', color: C.secondary, desc: 'Chips Apple M3 y Snapdragon usan Harvard Modificada con cachés L1 divididos.' },
              { icon: <Monitor />, title: 'DSPs de Audio', color: C.accent, desc: 'Procesan ondas de sonido en tiempo real sin pausas por buses compartidos.' }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: item.color, marginBottom: '1.5rem' }}>{React.cloneElement(item.icon, { size: 40, style: { margin: '0 auto' } })}</div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', fontWeight: 800 }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: `3px solid ${C.secondary}`, boxShadow: '0 30px 60px rgba(6,182,212,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <CheckCircle size={52} color={C.secondary} style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: Arquitectura Harvard</h2>
          </div>
          <QuizBlock 
            questions={QUESTIONS} 
            accentColor={C.secondary}
            clase="Clase 2: Arquitectura Harvard"
            unidad="Unidad 1"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default Harvard;
