import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Cpu, Settings, Activity, 
  RefreshCw, Clock
} from 'lucide-react';

const CPU_QUESTS = [
  { q: '¿Qué componente de la CPU realiza las operaciones matemáticas?', opts: ['Unidad de Control', 'ALU (Unidad Aritmético-Lógica)', 'Memoria RAM', 'Bus de Datos'], a: 1, exp: 'La ALU es el motor de cálculo del procesador encargado de sumas, restas y comparaciones.' },
  { q: '¿Cuál es la función de los Registros?', opts: ['Guardar archivos permanentemente', 'Almacenamiento ultra-rápido y temporal dentro de la CPU', 'Enfriar la placa base', 'Conectar a Internet'], a: 1, exp: 'Los registros guardan los datos inmediatos con los que la ALU está operando en cada nanosegundo.' },
  { q: '¿Qué marca el ritmo de procesamiento de la CPU?', opts: ['El tamaño del disco', 'La cantidad de núcleos', 'El Reloj (Clock)', 'El sistema operativo'], a: 2, exp: 'El reloj sincroniza todas las operaciones de la CPU mediante pulsos eléctricos constantes.' },
  { q: 'El ciclo FDE significa:', opts: ['Fast Data Entry', 'Fetch, Decode, Execute', 'Final Digital Edition', 'File Data Error'], a: 1, exp: 'Es el proceso cíclico universal: buscar la instrucción, interpretarla y realizar la acción.' },
  { q: '¿Qué hace la Unidad de Control (UC)?', opts: ['Suma números', 'Dirige el flujo de datos y coordina los otros componentes', 'Muestra imágenes', 'Ninguna'], a: 1, exp: 'La UC es el "director de orquesta" que indica a cada componente cuándo actuar.' },
  { q: '¿En qué unidad se mide la velocidad del reloj de un procesador actual?', opts: ['MegaBytes (MB)', 'GigaHertz (GHz)', 'Watts (W)', 'Píxeles (px)'], a: 1, exp: '1 GHz significa que el procesador puede realizar mil millones de ciclos de reloj por segundo.' },
  { q: '¿Qué componente de la ALU permite realizar comparaciones lógicas como "A es mayor que B"?', opts: ['Unidad de Punto Flotante', 'Circuitos de comparación lógica', 'Disco Duro', 'Memoria ROM'], a: 1, exp: 'La ALU tiene circuitos específicos para álgebra booleana y comparaciones binarias.' },
  { q: '¿Qué sucede durante la fase de "Decode" (Decodificación)?', opts: ['Se borra la memoria', 'Se apaga la CPU', 'Se interpreta el código binario para saber qué instrucción ejecutar', 'Se imprime un documento'], a: 2, exp: 'La Unidad de Control traduce el código de operación (opcode) en señales eléctricas para los demás componentes.' }
];

const CPU = () => {
  const [fdeStep, setFdeStep] = useState(0);

  const steps = [
    { title: 'Fetch (Búsqueda)', desc: 'La CPU busca la siguiente instrucción en la memoria RAM y la trae a sus registros internos.', color: '#3b82f6' },
    { title: 'Decode (Decodificación)', desc: 'La Unidad de Control interpreta qué operación debe realizar (ej: una suma o un salto).', color: '#f59e0b' },
    { title: 'Execute (Ejecución)', desc: 'La ALU realiza el cálculo o la acción solicitada. El ciclo vuelve a empezar.', color: '#16a34a' }
  ];

  return (
    <LockedContent keyword="procesador" title="Clase 3: La Unidad Central de Procesamiento" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #3b82f6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              El Cerebro: La CPU
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Descubre el componente más complejo creado por el hombre. Miles de millones de transistores trabajando en perfecta sincronía.
            </p>
          </motion.div>
        </header>

        {/* Simulador FDE */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#1e293b', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2rem', color: '#3b82f6' }}>Ciclo de Instrucción (FDE)</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                Cada segundo, tu procesador repite este ciclo miles de millones de veces (GigaHertz).
              </p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {steps.map((step, i) => (
                  <div 
                    key={i}
                    onClick={() => setFdeStep(i)}
                    style={{ 
                      padding: '1.5rem', borderRadius: '20px', border: '1.5px solid',
                      borderColor: fdeStep === i ? step.color : 'rgba(255,255,255,0.05)',
                      background: fdeStep === i ? step.color + '10' : 'transparent',
                      cursor: 'pointer', transition: '0.3s', fontWeight: 700
                    }}
                  >
                    {step.title}
                    {fdeStep === i && <p style={{ fontSize: '0.85rem', fontWeight: 400, color: '#94a3b8', marginTop: '0.5rem' }}>{step.desc}</p>}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setFdeStep((fdeStep + 1) % 3)}
                style={{ marginTop: '2.5rem', background: steps[fdeStep].color, color: '#000', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
              >
                <RefreshCw size={20} /> Avanzar Ciclo
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/cpu_architecture_modern_1775235433327.png" 
                alt="CPU Architecture" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(59,130,246,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Componentes Internos */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>Anatomía del Procesador</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {[
              { icon: <Settings />, title: 'U. de Control', color: '#ef4444', desc: 'Decodifica instrucciones y coordina todos los demás componentes.' },
              { icon: <Activity />, title: 'ALU', color: '#16a34a', desc: 'Realiza cálculos aritméticos y decisiones lógicas (sí/no).' },
              { icon: <Clock />, title: 'Reloj', color: '#3b82f6', desc: 'Sincroniza cada paso del procesador con pulsos eléctricos.' }
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
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #3b82f6', boxShadow: '0 30px 60px rgba(59,130,246,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Cpu size={52} color="#3b82f6" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: El Procesador</h2>
          </div>
          <QuizBlock 
            questions={CPU_QUESTS} 
            accentColor="#3b82f6"
            clase="Clase 3: Procesador"
            unidad="Unidad 1"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default CPU;
