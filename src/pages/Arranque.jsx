import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Power, Settings, Layout, 
  RefreshCw, Cpu, Activity, 
  HardDrive
} from 'lucide-react';

const BOOT_QUESTS = [
  { q: '¿Qué es el POST (Power-On Self-Test)?', opts: ['Un mensaje en redes sociales', 'Un autodiagnóstico del hardware al encender la PC', 'Un tipo de memoria', 'El nombre del monitor'], a: 1, exp: 'El POST verifica que los componentes críticos (CPU, RAM, etc.) funcionen antes de arrancar.' },
  { q: '¿Dónde reside tradicionalmente la BIOS/UEFI?', opts: ['En el disco rígido', 'En la memoria RAM', 'En un chip de memoria no volátil (ROM/Flash) en la placa base', 'En la nube'], a: 2, exp: 'Es un firmware persistente que arranca el hardware inicial antes que cualquier disco.' },
  { q: '¿Qué función cumple el Bootloader?', opts: ['Dibujar el fondo de pantalla', 'Cargar el núcleo (Kernel) del Sistema Operativo en RAM', 'Aumentar el voltaje', 'Limpiar el disco'], a: 1, exp: 'El Bootloader busca y ejecuta el sistema operativo encontrado en el disco.' },
  { q: '¿Cuál es la diferencia principal entre BIOS y UEFI?', opts: ['No hay diferencia', 'UEFI es el sucesor moderno que permite discos más grandes y arranque seguro', 'BIOS es más rápida', 'UEFI solo sirve para Linux'], a: 1, exp: 'UEFI reemplazó a BIOS con mejores capacidades, seguridad e interfaz gráfica.' },
  { q: '¿Cuál es el último paso del arranque?', opts: ['Cargar el POST', 'La inicialización del kernel y el inicio de los servicios de usuario', 'Escribir en el teclado', 'Encender el LED de encendido'], a: 1, exp: 'Una vez el Kernel toma el control, el SO está listo para que el usuario inicie sesión.' },
  { q: '¿Qué sucede si el POST detecta una falla crítica en la memoria RAM?', opts: ['La pantalla se pone azul', 'El sistema emite pitidos de error y se detiene el proceso', 'Se borra el disco duro', 'Se apaga el aire acondicionado'], a: 1, exp: 'Sin RAM funcional, el procesador no puede operar, por lo que el firmware detiene el arranque para proteger el hardware.' },
  { q: '¿A qué componente se le llama comúnmente "Firmware"?', opts: ['A la caja de la PC', 'Al Sistema Operativo', 'Al software básico embebido en el chip BIOS/UEFI', 'Al navegador Chrome'], a: 2, exp: 'El firmware es el nexo directo entre el hardware y el software de alto nivel.' },
  { q: '¿Cuál es el orden correcto de la secuencia de arranque?', opts: ['Kernel -> POST -> BIOS', 'POST -> BIOS/UEFI -> Bootloader -> Kernel', 'Bootloader -> RAM -> POST', 'BIOS -> Desktop -> POST'], a: 1, exp: 'El hardware se prueba primero (POST), luego se busca el arranque (Firmware), se carga el cargador (Bootloader) y finalmente el núcleo (Kernel).' }
];

const Arranque = () => {
  const [bootStep, setBootStep] = useState(0);

  const steps = [
    { title: 'POST (Self-Test)', desc: 'Verificación del hardware: CPU, RAM y Video deben estar OK.', icon: <Cpu />, color: '#ef4444' },
    { title: 'Firmware (BIOS/UEFI)', desc: 'Localiza el dispositivo de arranque (Disco, USB, etc.).', icon: <Settings />, color: '#f59e0b' },
    { title: 'Bootloader', desc: 'El programa que sabe cómo despertar al Sistema Operativo.', icon: <Layout />, color: '#3b82f6' },
    { title: 'Kernel Init', desc: 'El SO toma el control total y carga los drivers finales.', icon: <RefreshCw />, color: '#16a34a' }
  ];

  return (
    <LockedContent keyword="encendido" title="Clase 5: Hardware y Arranque" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #ef4444, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Hardware y Boot
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde que pulsas el botón hasta que aparece el escritorio. Los milisegundos más críticos de la informática.
            </p>
          </motion.div>
        </header>

        {/* Simulador de Arranque */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#1e293b', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2rem', color: '#ef4444' }}>Secuencia de Encendido</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    onClick={() => setBootStep(i)}
                    style={{ 
                      padding: '1.5rem', borderRadius: '20px', border: '1.5px solid',
                      borderColor: bootStep === i ? step.color : 'rgba(255,255,255,0.05)',
                      background: bootStep === i ? step.color + '10' : 'transparent',
                      cursor: 'pointer', transition: '0.3s'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <div style={{ color: bootStep === i ? step.color : '#475569' }}>{step.icon}</div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{step.title}</h4>
                        {bootStep === i && <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>{step.desc}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button 
                onClick={() => setBootStep((bootStep + 1) % 4)}
                style={{ marginTop: '2.5rem', background: steps[bootStep].color, color: '#000', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
              >
                <Power size={20} /> Avanzar Proceso
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/pc_boot_process_bios_glow_1775235626969.png" 
                alt="Boot Process" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(239,68,68,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Diagnóstico */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
            <div>
              <Activity color="#ef4444" size={40} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>El rol del POST</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                ¿Has oído pitidos al encender una PC? Son códigos de error del POST. Si la RAM falla o la GPU no se detecta, el sistema avisa antes de intentar cargar cualquier software.
              </p>
            </div>
            <div>
              <HardDrive color="#3b82f6" size={40} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Evolución: UEFI</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                UEFI no solo es más moderno que la BIOS azul clásica; también protege el sistema contra virus de arranque (Bootkits) mediante el Arranque Seguro (Secure Boot).
              </p>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #ef4444', boxShadow: '0 30px 60px rgba(239,68,68,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Power size={52} color="#ef4444" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: Encendido</h2>
          </div>
          <QuizBlock 
            questions={BOOT_QUESTS} 
            accentColor="#ef4444"
            clase="Clase 5: Arranque"
            unidad="Unidad 1"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default Arranque;
