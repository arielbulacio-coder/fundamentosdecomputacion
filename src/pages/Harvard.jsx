import React from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import { 
  Box, Cpu, Database, Laptop, 
  Smartphone, Monitor, CheckCircle,
  Activity, Zap, ShieldCheck, Settings, Info
} from 'lucide-react';

const C = {
  primary: '#06b6d4',
  secondary: '#3b82f6',
  accent: '#a855f7',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc'
};

const QUESTIONS = [
  { q: '¿En qué se diferencia principalmente la arquitectura Harvard del modelo de Von Neumann?', opts: ['En tener memorias separadas para datos e instrucciones', 'En usar más transistores', 'En no tener buses', 'En el tipo de procesador'], a: 0, exp: 'Harvard separa físicamente la memoria de programa y la memoria de datos, con buses independientes.' },
  { q: '¿Cuál de estos dispositivos usa típicamente arquitectura Harvard pura?', opts: ['Una PC de escritorio', 'Un laptop con Windows', 'Un microcontrolador Arduino (AVR)', 'Un servidor web'], a: 2, exp: 'El ATmega328 de Arduino usa arquitectura Harvard pura con Flash separada de RAM.' },
  { q: '¿Qué ventaja principal ofrece Harvard sobre Von Neumann?', opts: ['Menor costo', 'Usa menos energía', 'Tiene más RAM', 'Puede acceder a instrucciones y datos simultáneamente'], a: 3, exp: 'Al tener buses separados, puede leer instrucciones y datos al mismo tiempo, sin cuello de botella.' },
  { q: '¿Qué tipo de memoria usa Harvard para guardar el programa en sistemas embebidos?', opts: ['Memoria Flash / ROM', 'RAM volátil', 'Disco rígido', 'Memoria caché'], a: 0, exp: 'Los programas se graban en memoria persistente, protegida del borrado accidental por datos.' },
  { q: '¿Qué es la "Arquitectura Harvard Modificada"?', opts: ['Una variante con dos núcleos', 'Una arquitectura sin unidad de control', 'Una arquitectura con cachés separadas pero memoria común unificada', 'Una versión que unifica los buses'], a: 2, exp: 'Es el estándar en CPUs modernos de alto rendimiento (Intel/ARM).' },
  { q: '¿Cuál es el principal inconveniente de la arquitectura Harvard pura para PCs?', opts: ['Es muy lenta', 'El doble de buses aumenta el costo y complejidad física del chip y la placa madre', 'No permite instalar Windows', 'Consume demasiada RAM'], a: 1, exp: 'Tener buses físicos separados para todo el sistema requiere muchos más pines y pistas de cobre.' },
  { q: '¿Qué componente permite realizar búsquedas de código y lecturas de datos en paralelo?', opts: ['La unidad de control dual', 'Buses de direcciones y datos independientes para cada memoria', 'El uso de discos SSD', 'La conexión a internet'], a: 1, exp: 'Al tener cables independientes para cada memoria, no hay competencia por el bus.' },
  { q: 'La arquitectura Harvard nació históricamente con la computadora:', opts: ['ENIAC', 'Harvard Mark I (1944)', 'IBM PC', 'Macintosh'], a: 1, exp: 'Desarrollada por Howard Aiken junto con IBM durante la 2da Guerra Mundial.' },
  { q: '¿Por qué la arquitectura Harvard es más segura contra ciertos ataques?', opts: ['Porque es secreta', 'Porque es imposible sobrescribir el código con datos de entrada maliciosos accidentalmente', 'Porque no usa internet', 'Porque tiene antivirus de hardware'], a: 1, exp: 'La separación física o lógica entre el bus de datos y el de instrucciones dificulta la inyección de código.' },
  { q: '¿Qué es un DSP (Procesador de Señales Digitales)?', opts: ['Un monitor de audio', 'Un tipo de procesador que usa Harvard para procesar señales en tiempo real eficientemente', 'Un software de música', 'Un cable de conexión'], a: 1, exp: 'Los DSPs (como los de tu placa de audio) procesan ondas matemáticas sin pausas de bus.' },
  { q: 'En Harvard, si el espacio de memoria de programa se llena pero hay RAM libre:', opts: ['El sistema usa la RAM para el programa', 'El sistema no puede usar la RAM para guardar instrucciones (inflexibilidad)', 'La PC vuela', 'Se borra todo'], a: 1, exp: 'Al ser memorias separadas, un espacio no puede usarse para compensar al otro fácilmente.' },
  { q: '¿Qué es el "Split L1 Cache"?', opts: ['Una memoria compartida', 'La división de la caché de nivel 1 en caché de Instrucciones y de Datos', 'Un tipo de disco', 'Una forma de particionar'], a: 1, exp: 'Es la aplicación del modelo Harvard dentro de CPUs Von Neumann modernos.' },
  { q: 'La arquitectura Harvard pura no es común en PCs porque:', opts: ['Es muy lenta', 'Requiere que el programador gestione dos memorias distintas físicamente', 'No tiene teclado', 'Solo funciona con Linux'], a: 1, exp: 'La gestión unificada de memoria es mucho más flexible para software general.' },
  { q: '¿Qué sucede si hay una colisión de bus en Von Neumann que en Harvard se evita?', opts: ['La PC explota', 'La CPU debe esperar a que el bus se libere para leer el siguiente dato (Stall)', 'Se apaga el monitor', 'No pasa nada'], a: 1, exp: 'En Harvard no hay competencia, por lo que el CPU siempre está alimentado de datos y código.' },
  { q: '¿Cuál de estos es un beneficio de Harvard en sistemas críticos?', opts: ['Menos cables', 'Determinismo y velocidad de respuesta fija', 'Es más barata', 'Usa menos energía'], a: 1, exp: 'Al no haber conflicto de bus, el tiempo de ejecución es más predecible.' },
  { q: '¿Cuántos buses de direcciones tiene una arquitectura Harvard pura?', opts: ['Uno', 'Dos (uno para cada memoria)', 'Tantos como registros', 'Ninguno'], a: 1, exp: 'Cada memoria tiene su propio bus de direccionalidad independiente.' },
  { q: 'La eficiencia de una CPU Harvard se ve maximizada cuando se usa con:', opts: ['Windows XP', 'Pipelining (Segmentación)', 'Mucho disco duro', 'Un monitor 4K'], a: 1, exp: 'Mientras una instrucción se ejecuta, la otra se está buscando en el bus paralelo.' },
  { q: '¿Qué empresa colaboró en la creación de la Harvard Mark I?', opts: ['Apple', 'Microsoft', 'IBM', 'Google'], a: 2, exp: 'Fue un proyecto conjunto entre la Universidad de Harvard e IBM en los años 40.' },
  { q: '¿Qué buscaba solucionar Howard Aiken con este modelo?', opts: ['Hacer juegos', 'Evitar la lentitud de leer instrucciones y datos de una sola fuente mecánica', 'Bajar el consumo de luz', 'Tener más colores'], a: 1, exp: 'Aiken quería una máquina de cálculo científica de alta velocidad.' },
  { q: 'En la actualidad, Apple y Qualcomm usan Harvard en sus chips de qué forma:', opts: ['Pura en todo el chip', 'Modificada con caches internos Harvard y memoria externa unificada', 'No la usan', 'Solo para la cámara'], a: 1, exp: 'Es la forma más eficiente de balancear costo y rendimiento extremo.' }
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
              La vía rápida de la información. Descubre por qué los microcontroladores y las memorias caché eligen la separación física para maximizar el rendimiento.
            </p>
          </motion.div>
        </header>

        {/* Teoría y Diagrama Recuperado */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: C.card, padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)', boxShadow: '0 30px 60px rgba(6,182,212,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', color: C.primary }}>Caminos Paralelos</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                A diferencia de Von Neumann, aquí la CPU no tiene que turnarse para leer código o guardar datos. Tiene un <strong>juego de cables (buses) independiente</strong> para cada memoria.
              </p>
              
              <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(6,182,212,0.2)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                         <Zap size={22} color={C.primary} />
                         <span style={{ fontWeight: 800 }}>BUS DE CÓDIGO</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Unidireccional</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                         <Activity size={22} color={C.accent} />
                         <span style={{ fontWeight: 800 }}>BUS DE DATOS</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Bidireccional</span>
                   </div>
                </div>
                <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', margin: '2rem 0' }} />
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center' }}>
                  Resultado: <strong>Cero interferencia</strong> y latencia reducida en el ciclo de ejecución.
                </p>
              </div>
            </div>
            
            <div style={{ position: 'relative' }}>
               <img 
                 src="/assets/harvard_architecture_split_neon_1775235605987.png" 
                 alt="Harvard vs Von Neumann" 
                 style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(6,182,212,0.3)' }} 
               />
               <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
               <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', background: C.card, padding: '1rem 2rem', borderRadius: '20px', border: `1px solid ${C.primary}` }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900 }}>Estructura Dividida</p>
               </div>
            </div>
          </div>
        </section>

        {/* Teoría Ampliada: Aplicaciones Modernas */}
        <section style={{ marginBottom: '6rem', background: C.card, padding: '5rem 3.5rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
           <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>¿Por qué no la usamos en todo?</h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
              {[
                { title: 'Costos de Fabricación', icon: <Settings />, desc: 'Tener dos sistemas de buses completos requiere casi el doble de pines físicos en el chip y más espacio en la placa madre.' },
                { title: 'Inflexibilidad de Memoria', icon: <Database />, desc: 'Si te quedas sin espacio de programa, no puedes "pedir prestado" a la RAM de datos, ya que están físicamente aisladas.' },
                { title: 'El Modelo Híbrido', icon: <Layers />, desc: 'Las CPUs modernas usan Harvard en sus cachés L1 internas para velocidad, pero Von Neumann para la RAM externa por economía.' },
                { title: 'Sistemas Embebidos', icon: <Smartphone />, desc: 'Donde la velocidad de respuesta es crítica y los programas son pequeños, Harvard pura sigue siendo el rey indiscutido.' }
              ].map((item, id) => (
                <div key={id} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ color: C.secondary, marginBottom: '1.5rem' }}>{item.icon}</div>
                   <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                   <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <RepasoClave
          accentColor="#06b6d4"
          title="Arquitectura Harvard"
          facts={[
            { icon: '🔀', term: 'Separación de Buses', def: 'Harvard usa buses físicos independientes para instrucciones y datos, permitiendo leerlos simultáneamente sin conflictos.' },
            { icon: '⚡', term: 'Ventaja de Velocidad', def: 'Al no competir por el mismo bus, el CPU puede buscar la próxima instrucción mientras ejecuta la actual.' },
            { icon: '🛡️', term: 'Ventaja de Seguridad', def: 'La separación impide que datos maliciosos en el área de datos modifiquen instrucciones del programa en ejecución.' },
            { icon: '🎯', term: 'DSP y Señales', def: 'Ideal para procesamiento de señales digitales (DSP): requiere velocidad constante y predecible para audio/video/comunicaciones.' },
            { icon: '🤖', term: 'Microcontroladores', def: 'Arduino (AVR), PIC y ARM Cortex-M implementan Harvard para control preciso y confiable de sistemas embebidos.' },
            { icon: '📜', term: 'Harvard Mark I (1944)', def: 'Máquina electromecánica diseñada por Howard Aiken en Harvard: primera implementación de esta arquitectura separada.' },
          ]}
        />

        {/* Evaluación */}
        <section style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: `3px solid ${C.primary}`, boxShadow: '0 30px 60px rgba(6,182,212,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Cpu size={52} color={C.primary} style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Harvard</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>20 preguntas para validar tu conocimiento sobre este modelo paralelo.</p>
          </div>
          <QuizBlock 
            questions={QUESTIONS} 
            accentColor={C.primary}
            clase="Clase 2 suplemento: Harvard"
            unidad="Unidad 1"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default Harvard;
