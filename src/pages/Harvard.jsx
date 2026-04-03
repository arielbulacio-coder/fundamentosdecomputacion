import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import { 
  Cpu, Zap, Database, Smartphone, Info, 
  CheckCircle, RefreshCw, BarChart, HardDrive
} from 'lucide-react';

const HARV_QUESTS = [
  { q: '¿Qué diferencia a la Arquitectura Harvard del modelo Von Neumann?', opts: ['Tiene más RAM', 'Separa físicamente la memoria de programa y la de datos', 'No usa CPU', 'Usa un solo bus para todo'], a: 1, exp: 'Esta separación física permite el acceso en paralelo.' },
  { q: '¿Cuál es la principal ventaja de tener buses independientes?', opts: ['Ahorrar cables', 'Permite leer una instrucción y un dato simultáneamente', 'Evita el calor', 'Hace que la PC sea más liviana'], a: 1, exp: 'Al no competir por el bus, se elimina el "cuello de botella".' },
  { q: '¿Dónde es más común encontrar arquitectura Harvard pura hoy?', opts: ['En Servidores Cloud', 'En Microcontroladores (ej: Arduino, PIC)', 'En consolas Xbox', 'En Supercomputadoras'], a: 1, exp: 'Es ideal para sistemas embebidos donde la velocidad y simplicidad son clave.' },
  { q: 'En Harvard, la memoria de programa suele ser:', opts: ['Flash (No volátil)', 'RAM (Volátil)', 'Solo disco', 'Caché'], a: 0, exp: 'El código se queda grabado aunque se quite la energía.' },
  { q: '¿Qué es la Arquitectura Harvard Modificada?', opts: ['Un modelo roto', 'Cachés L1 divididos pero memoria principal unificada', 'Un bus de 1 bit', 'Uso de cinta magnética'], a: 1, exp: 'Es el híbrido que usan casi todos los procesadores modernos (Intel/AMD/ARM).' },
  { q: 'Un DSP (Procesador Digital de Señales) usa Harvard para:', opts: ['Gastar menos luz', 'Procesar audio/video en tiempo real sin pausas', 'Tener más colores', 'Instalar juegos'], a: 1, exp: 'El acceso paralelo es vital para procesar muestras sin detener la ejecución.' },
  { q: 'En el Harvard del Arduino ATmega328, el bus de instrucciones es de:', opts: ['8 bits', '16 bits', '1 bit', '64 bits'], a: 1, exp: 'Tiene un ancho diferente al de datos para optimizar el set de instrucciones.' },
  { q: '¿Cuál es una desventaja de Harvard pura?', opts: ['Es muy lenta', 'Inflexibilidad de memoria (el espacio de código no se puede usar para datos)', 'Usa mucha batería', 'No soporta internet'], a: 1, exp: 'Al estar separadas, no se puede redistribuir el espacio libre dinámicamente.' },
  { q: '¿Qué significa que el bus de programa sea de "Solo Lectura" en ejecución?', opts: ['Que no funciona', 'Que la CPU no puede modificar el código mientras corre (seguridad)', 'Que no tiene cables de salida', 'Que es una pantalla'], a: 1, exp: 'Previene ataques y errores que corrompan el programa activo.' },
  { q: '¿Por qué Harvard es determinista?', opts: ['Porque es muy vieja', 'Porque el tiempo de acceso no depende de si se está leyendo un dato o no', 'Porque lo dice Von Neumann', 'Porque usa transistores'], a: 1, exp: 'Garantiza tiempos de respuesta fijos, esencial para frenos ABS o satélites.' },
  { q: 'En una CPU moderna, la división Harvard ocurre en la caché:', opts: ['L1', 'L2', 'L3', 'VRAM'], a: 0, exp: 'L1 está pegada al core y suele estar dividida en L1-Instrucciones y L1-Datos.' },
  { q: '¿Qué familia de micros popularizó en 1970 la arquitectura Harvard?', opts: ['Intel 8086', 'Microchip PIC', 'Zilog Z80', 'Motorola 68k'], a: 1, exp: 'Los PIC fueron de los primeros en usar Harvard masivamente.' },
  { q: 'Si una CPU moderna no tuviera Harvard interna (L1 unificada):', opts: ['Sería más rápida', 'El rendimiento caería drásticamente por colisiones en el bus', 'Tendría más RAM', 'No pasaría nada'], a: 1, exp: 'Sin la separación L1, la CPU pasaría mucho tiempo esperando al bus.' },
  { q: 'Harvard permite el paralelismo de bajo nivel llamado:', opts: ['Multitarea', 'Pipelining', 'Dual-Boot', 'Streaming'], a: 1, exp: 'Al separar buses, las etapas del pipeline fluyen mejor.' },
  { q: '¿Cómo identifica el programador de Arduino que es Harvard?', opts: ['Por el color', 'Porque usa comandos diferentes para Flash (PROGMEM) y RAM', 'No se puede saber', 'Por la velocidad'], a: 1, exp: 'Al ser memorias separadas, se direccionan de forma distinta en bajo nivel.' },
  { q: '¿Cuál es el bus "extra" que tiene Harvard respecto a Von Neumann?', opts: ['El de energía', 'Un Bus de Direcciones y Datos exclusivo para instrucciones', 'El bus USB', 'El de video'], a: 1, exp: 'Duplica los buses para no tener que compartirlos.' },
  { q: 'En sistemas críticos, Harvard es más seguro porque:', opts: ['Es más barata', 'El aislamiento físico impide desbordamientos de búfer hacia el código', 'No usa WiFi', 'Se apaga antes'], a: 1, exp: 'Un dato malicioso en la RAM no puede sobrescribir fácilmente el bus de programa.' },
  { q: 'Un procesador ARM Cortex-A usa Harvard en su:', opts: ['Batería', 'Núcleo / Fase de Fetch y ejecución', 'Monitor', 'Teclado'], a: 1, exp: 'La eficiencia ARM se basa en esta separación de alto rendimiento.' },
  { q: '¿Qué arquitectura usarías para un sensor de temperatura simple (baja ram)?', opts: ['Von Neumann', 'Harvard', 'Híbrida', 'Nube'], a: 1, exp: 'Harvard pura es la opción más eficiente y barata para micros pequeños.' },
  { q: '¿Qué sucede si un Qubit fuera Harvard?', opts: ['Explota', 'No tiene sentido (otra física)', 'Sería más rápido', 'Nada'], a: 1, exp: 'Estamos hablando de arquitectura digital clásica; el mundo cuántico opera distinto.' }
];

const Harvard = () => {
  return (
    <LockedContent keyword="paralelo" title="Clase 2B: El Modelo de Alto Rendimiento" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Arquitectura Harvard
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              La solución al cuello de botella. Descubre cómo la separación física de buses permite el verdadero paralelismo en sistemas críticos.
            </p>
          </motion.div>
        </header>

        {/* Diagrama Interactivo Harvard */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ background: '#111', padding: '4rem', borderRadius: '55px', border: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
             
             <div style={{ background: '#0f172a', padding: '3rem', borderRadius: '40px', border: '1px solid #8b5cf630' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#8b5cf6', marginBottom: '2rem', textAlign: 'center' }}>Topología Harvard Pura</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                   {/* PROGRAM MEMORY */}
                   <div style={{ width: '100%', padding: '1.5rem', background: '#1e293b', border: '2px solid #8b5cf6', borderRadius: '15px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#8b5cf6' }}>MEMORIA DE PROGRAMA (FLASH)</span>
                      <div style={{ marginTop: '0.5rem', fontSize: '1.2rem', fontWeight: 900 }}>0x4E: MOV R1, #10</div>
                   </div>

                   {/* BUSES */}
                   <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 2rem' }}>
                      <div style={{ width: '10px', height: '60px', background: '#8b5cf6', boxShadow: '0 0 10px #8b5cf6', borderRadius: '5px' }} />
                      <div style={{ width: '10px', height: '60px', background: '#ec4899', boxShadow: '0 0 10px #ec4899', borderRadius: '5px' }} />
                   </div>

                   {/* CPU */}
                   <div style={{ width: '140px', height: '140px', background: '#020617', border: '3px solid #fff', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem', position: 'relative' }}>
                      CPU
                      <div style={{ position: 'absolute', top: '-25px', left: '10px', fontSize: '0.6rem', color: '#8b5cf6' }}>BUS INSTR</div>
                      <div style={{ position: 'absolute', top: '-25px', right: '10px', fontSize: '0.6rem', color: '#ec4899' }}>BUS DATA</div>
                   </div>

                   {/* DATA MEMORY */}
                   <div style={{ width: '100%', padding: '1.5rem', background: '#1e293b', border: '2px solid #ec4899', borderRadius: '15px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ec4899' }}>MEMORIA DE DATOS (RAM)</span>
                      <div style={{ marginTop: '0.5rem', fontSize: '1.2rem', fontWeight: 900 }}>D0x10: 255</div>
                   </div>
                </div>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>Arquitecturas Especializadas</h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                   {[
                     { t: 'Paralelismo Real', d: 'La CPU lee el código de una memoria mientras opera datos de la otra. No hay esperas.' },
                     { t: 'Predictibilidad', d: 'Tiempos de ejecución fijos. Ideal para sistemas de seguridad industrial y automotriz.' },
                     { t: 'Optimización de Ancho', d: 'El bus de instrucciones puede ser de 14 bits y el de datos de 8 bits. Eficiencia total.' }
                   ].map((item, i) => (
                     <div key={i} style={{ padding: '1.5rem', background: '#1e293b', borderRadius: '20px', borderLeft: '4px solid #8b5cf6' }}>
                        <h4 style={{ fontWeight: 800, margin: 0 }}>{item.t}</h4>
                        <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#94a3b8' }}>{item.d}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* Aplicaciones Modernas */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 900 }}>¿Dónde vive Harvard hoy?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { Icon: Smartphone, color: '#8b5cf6', title: 'Smartphones (ARM)', desc: 'Los cores ARM usan Harvard Modificada: cachés L1 de instrucciones y datos separadas para evitar conflictos.' },
              { Icon: Database, color: '#ec4899', title: 'Microcontroladores', desc: 'Arduino (AVR) y PIC son 100% Harvard. El código vive en Flash y los datos en RAM con buses propios.' },
              { Icon: Zap, color: '#f59e0b', title: 'DSP y Audio', desc: 'Los procesadores de señal digital requieren procesar muestras continuas de audio/video sin detenciones del bus.' }
            ].map((item, i) => (
              <div key={i} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <item.Icon size={32} color={item.color} style={{ marginBottom: '1.25rem' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <RepasoClave
          accentColor="#8b5cf6"
          title="Arquitectura Harvard"
          facts={[
            { icon: '🚀', term: 'Velocidad', def: 'Mayor rendimiento al permitir acceso en paralelo a buses físicos distintos.' },
            { icon: '🧱', term: 'Aislamiento', def: 'Seguridad física: el flujo de datos no puede contaminar el flujo de instrucciones fácilmente.' },
            { icon: '📐', term: 'Personalización', def: 'Permite anchos de bus distintos para instrucciones y datos (ej: 14 bits vs 8 bits).' },
            { icon: '🏭', term: 'DSPs', def: 'Digital Signal Processors. El estándar para procesamiento de señales en tiempo real.' },
            { icon: '🤖', term: 'Arduino/PIC', def: 'Ejemplos clásicos de aplicaciones actuales en robótica y control industrial.' },
            { icon: '⚙️', term: 'Híbrido Moderno', def: 'La mayoría de los CPUs potentes usan Harvard en Caché y Von Neumann en RAM.' },
          ]}
        />

        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #8b5cf6', boxShadow: '0 30px 60px rgba(139,92,246,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Zap size={52} color="#8b5cf6" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Modelo Harvard</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>Certifica tu dominio del paralelismo arquitectónico con 20 preguntas aleatorias.</p>
          </div>
          <QuizBlock 
            questions={HARV_QUESTS} 
            accentColor="#8b5cf6"
            clase="Clase 2: Arquitecturas"
            unidad="Unidad 1"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default Harvard;
