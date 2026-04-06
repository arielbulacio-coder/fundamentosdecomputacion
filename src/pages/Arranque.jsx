import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import { 
  Power, Zap, Activity, ShieldCheck, Database, 
  Settings, ChevronRight, Info, CheckCircle, Smartphone, ExternalLink, HardDrive, Play, RefreshCw, Terminal
} from 'lucide-react';

const BOOT_QUESTS = [
  { q: '¿Qué significa BIOS?', opts: ['Binary Input Operational System', 'Basic Input/Output System', 'Boot Integrated Output System', 'Battery Internal Optional Sync'], a: 1, exp: 'Es el primer programa que corre el procesador al encenderse.' },
  { q: '¿Cuál es la función del POST (Power-On Self-Test)?', opts: ['Cargar el navegador', 'Verificar que el hardware básico funcione correctamente', 'Borrar el disco rígido', 'Instalar drivers'], a: 1, exp: 'Chequea la CPU, la RAM y la tarjeta gráfica antes de intentar arrancar.' },
  { q: '¿Qué es el UEFI respecto al BIOS?', opts: ['Una versión vieja del BIOS', 'El sucesor moderno del BIOS (soporta discos grandes y arranque seguro)', 'Un virus de arranque', 'Un tipo de memoria RAM'], a: 1, exp: 'UEFI ofrece una interfaz gráfica, soporte para ratón y discos de más de 2.2 TB.' },
  { q: '¿Qué sucede durante la etapa del "Bootloader"?', opts: ['Se apaga la PC', 'Se busca y carga el núcleo (Kernel) del sistema operativo en memoria', 'Se limpia el polvo del procesador', 'Se descarga una actualización'], a: 1, exp: 'Es un pequeño programa alojado en el MBR o partición EFI.' },
  { q: '¿Para qué sirve la pila de botón (CMOS Battery) en la placa madre?', opts: ['Para dar energía al CPU', 'Para mantener la hora y los ajustes del BIOS cuando la PC está apagada', 'Para que el mouse sea inalámbrico', 'No tiene utilidad real'], a: 1, exp: 'Si esta pila se gasta, la PC pierde la hora y la configuración cada vez que se desenchufa.' },
  { q: '¿Qué es el "Reset Vector"?', opts: ['Una dirección de mail', 'La ubicación fija de memoria donde el CPU siempre busca su primera instrucción al encenderse', 'Un error de hardware', 'El botón de reset'], a: 1, exp: 'Es el punto de partida físico del procesador.' },
  { q: '¿Qué significa el término "Interrupciones" (IRQ)?', opts: ['Que se corta la luz', 'Señales que permiten al hardware pedir la atención inmediata del CPU', 'Publicidad en el arranque', 'Errores fatales'], a: 1, exp: 'Permite que un teclado, disco o red interrumpan al CPU para que procese un dato urgente.' },
  { q: 'El proceso DMA (Direct Memory Access) permite que:', opts: ['El usuario entre a la RAM', 'Dispositivos transfieran datos directamente a la RAM sin usar constantemente al CPU', 'La PC se conecte a internet gratis', 'El disco dure más'], a: 1, exp: 'Libera al CPU de tareas de movimiento de datos masivos.' },
  { q: '¿Qué es el MBR (Master Boot Record)?', opts: ['El disco más grande', 'El primer sector del disco que indica dónde está el sistema operativo', 'Un tipo de memoria caché', 'La marca de la placa madre'], a: 1, exp: 'Es el estándar antiguo de particionamiento (máximo 4 particiones primarias).' },
  { q: '¿Qué es GPT comparado con MBR?', opts: ['Un error de tipeo', 'Un esquema de particionamiento más robusto y moderno para UEFI', 'Un procesador de Inteligencia Artificial', 'Un cable de conexión'], a: 1, exp: 'GUID Partition Table: soporta discos enormes y 128 particiones.' },
  { q: '¿Qué sucede si el POST falla y escuchas una serie de "Beeps"?', opts: ['La PC está feliz', 'Hay un error de hardware específico (ej: falta la memoria RAM)', 'Indica que el SO ya cargó', 'Es música de bienvenida'], a: 1, exp: 'Cada código de pitidos indica qué componente está fallando.' },
  { q: 'El "Arranque Seguro" (Secure Boot) sirve para:', opts: ['Poner contraseña al Windows', 'Asegurar que solo se ejecute software firmado digitalmente y confiable durante el inicio', 'Esconder archivos', 'Acelerar el WiFi'], a: 1, exp: 'Previene que rootkits o malware tomen el control antes que el Sistema Operativo.' },
  { q: '¿Qué componente carga los drivers y servicios después del Kernel?', opts: ['El BIOS', 'El proceso de inicialización del Sistema Operativo', 'El usuario', 'La placa de video'], a: 1, exp: 'Configuran el software para hablar con el hardware específico del equipo.' },
  { q: 'La RAM se limpia totalmente durante el proceso de:', opts: ['Cerrar el navegador', 'Un arranque en frío (Cold Boot)', 'Abrir un archivo', 'Suspender la PC'], a: 1, exp: 'Al quitar la energía, los capacitores se descargan y los datos se pierden.' },
  { q: '¿Qué es la "Prioridad de Arranque"?', opts: ['La velocidad del procesador', 'El orden en que el BIOS busca el Sistema Operativo (ej: 1° USB, 2° Disco)', 'El precio del equipo', 'El orden de las teclas'], a: 1, exp: 'Se puede cambiar en el SETUP del BIOS para formatear la PC desde un pendrive.' },
  { q: '¿Qué es "Overclocking" desde el BIOS?', opts: ['Limpiar la PC', 'Aumentar el voltaje y la frecuencia del reloj por encima de los valores de fábrica', 'Actualizar el Windows', 'Bajar el brillo'], a: 1, exp: 'Aumenta el desempeño pero puede causar inestabilidad si no se enfría bien.' },
  { q: '¿Cuál es la función del puente norte (Northbridge) históricamente?', opts: ['Conectar el mouse', 'Comunicar al CPU con la RAM y la tarjeta de video de alta velocidad', 'Controlar los puertos USB', 'Suministrar energía'], a: 1, exp: 'Hoy en día estas funciones están integradas dentro del propio procesador.' },
  { q: '¿Qué sucede en la etapa de Login?', opts: ['El BIOS termina', 'El sistema operativo solicita credenciales y carga el entorno de usuario', 'Se verifica la RAM', 'Se busca el Kernel'], a: 1, exp: 'Es el paso final del proceso de arranque visible para el usuario.' },
  { q: '¿Qué puerto se usa comúnmente para tarjetas de video modernas y SSDs NVMe?', opts: ['SATA', 'PCI Express (PCIe)', 'USB 2.0', 'Serial Port'], a: 1, exp: 'Ofrece el mayor ancho de banda y latencia más baja.' },
  { q: '¿Qué pasa si cambias el modo de disco de "IDE" a "AHCI" en el BIOS después de instalar Windows?', opts: ['La PC vuela', 'Es probable que el sistema no arranque y dé un pantallazo azul (BSOD)', 'Se borran las fotos', 'No pasa nada'], a: 1, exp: 'El cambio de drivers de almacenamiento requiere que el SO esté preparado.' }
];

const BOOT_STAGES = [
  { id: 'POWER', label: '1. POWER ON', icon: <Power />, desc: 'Suministro eléctrico activado. Los voltajes se estabilizan.' },
  { id: 'POST', label: '2. P.O.S.T.', icon: <CheckCircle />, desc: 'BIOS verifica Hardware crítico: CPU, RAM y Video.' },
  { id: 'BIOS', label: '3. BIOS/UEFI', icon: <Settings />, desc: 'Se cargan ajustes y se inicializan buses (PCIe, USB).' },
  { id: 'BOOTLOADER', label: '4. BOOTLOADER', icon: <HardDrive />, desc: 'Buscando el sector de arranque en el Disco (MBR/EFI).' },
  { id: 'KERNEL', label: '5. KERNEL', icon: <Database />, desc: 'El sistema operativo se carga y toma el control absoluto.' },
  { id: 'DONE', label: '6. READY', icon: <Smartphone />, desc: 'Desktop listo para el usuario.' }
];

const Arranque = () => {
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);

  const startBoot = () => {
    if (running) return;
    setRunning(true);
    setStage(0);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < BOOT_STAGES.length) {
        setStage(current);
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 1500);
  };

  return (
    <LockedContent keyword="bios" title="Clase 5: Iniciando el Sistema" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #ff4757, #ff6b81)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Hardware y Arranque
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde el pulso eléctrico hasta el escritorio de Windows. Descubre el complejo ballet de hardware y software que ocurre en los primeros segundos de encendido.
            </p>
          </motion.div>
        </header>

        {/* Simulador de Arranque */}
        <section style={{ marginBottom: '6rem' }}>
           <div style={{ background: '#111', padding: 'clamp(1.5rem, 4vw, 4rem)', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <Terminal size={40} color="#ff4757" style={{ margin: '0 auto 1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2.5rem' }}>Secuenciador de Inicio</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                 {BOOT_STAGES.map((s, i) => (
                   <div key={s.id} style={{
                      padding: '1.5rem 1rem', borderRadius: '20px', border: '2px solid', transition: '0.3s',
                      borderColor: stage >= i ? '#ff4757' : '#1e293b',
                      background: stage === i ? '#ff475720' : '#0f172a',
                      opacity: stage >= i ? 1 : 0.3
                   }}>
                      <div style={{ color: stage >= i ? '#ff4757' : '#475569', marginBottom: '0.5rem' }}>{s.icon}</div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 900 }}>{s.label}</div>
                   </div>
                 ))}
              </div>

              <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '25px', marginBottom: '2.5rem', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <AnimatePresence mode="wait">
                    <motion.p key={stage} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>
                       {BOOT_STAGES[stage].desc}
                    </motion.p>
                 </AnimatePresence>
              </div>

              <button onClick={startBoot} disabled={running} style={{
                 background: '#ff4757', color: '#fff', border: 'none', padding: '1.25rem 3rem', borderRadius: '20px',
                 fontWeight: 900, fontSize: '1.1rem', cursor: running ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto'
              }}>
                 {running ? <RefreshCw className="spin" /> : <Play />} {stage === 5 ? 'Reiniciar Secuencia' : 'Iniciar Sistema'}
              </button>
           </div>
        </section>

        {/* Teoría Ampliada */}
        <section style={{ marginBottom: '6rem' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '3rem' }}>
              {[
                { title: 'El POST', icon: <ShieldCheck />, color: '#ff4757', desc: 'Power-On Self-Test. El diagnóstico inicial que asegura que la CPU, la memoria y la tarjeta gráfica están vivas.' },
                { title: 'MBR vs GPT', icon: <Database />, color: '#3b82f6', desc: 'Master Boot Record es el estándar clásico. GPT es el moderno que permite discos de petabytes y 128 particiones.' },
                { icon: <ExternalLink />, title: 'Controladores', color: '#10b981', desc: 'Son los traductores. Permiten que el Sistema Operativo sepa cómo usar cada marca y modelo de hardware diferente.' }
              ].map((s, i) => (
                <div key={i} style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '40px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: s.color, marginBottom: '1.5rem' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{s.title}</h3>
                  <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{s.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <RepasoClave
          accentColor="#ff4757"
          title="Hardware y Arranque"
          facts={[
            { icon: '🔌', term: 'Pasos de Inicio', def: 'Power On → POST → BIOS/UEFI → Bootloader → Kernel → SO habilitado.' },
            { icon: '🧬', term: 'BIOS/UEFI', def: 'Basic Input/Output System. El firmware encargado de despertar el hardware.' },
            { icon: '🔍', term: 'POST', def: 'Autodiagnóstico inicial. Si falla, la PC emite códigos de error (BEEP codes).' },
            { icon: '🗺️', term: 'Particionamiento', def: 'MBR (Legacy) vs GPT (Moderno). GPT es necesario para Windows 11 y discos grandes.' },
            { icon: '🔋', term: 'CMOS/Pila', def: 'Mantiene la hora y los ajustes del BIOS cuando la PC no recibe energía externa.' },
            { icon: '👮', term: 'Secure Boot', def: 'Función UEFI que solo deja arrancar software firmado digitalmente por seguridad.' },
          ]}
        />

        <section style={{ background: '#1e293b', padding: 'clamp(1.5rem, 4vw, 4rem)', borderRadius: '50px', border: '3px solid #ff4757', boxShadow: '0 30px 60px rgba(255,71,87,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Zap size={52} color="#ff4757" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Arranque</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>20 preguntas para validar tu dominio sobre los puertos, buses y el proceso de inicio del hardware.</p>
          </div>
          <QuizBlock 
            questions={BOOT_QUESTS} 
            accentColor="#ff4757"
            clase="Clase 5: Hardware y Arranque"
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

export default Arranque;
