import React from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Power, Zap, Activity, ShieldCheck, Database, 
  Settings, ChevronRight, Info, CheckCircle, Smartphone, ExternalLink, HardDrive
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

const Arranque = () => {
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

        {/* El Proceso de Arranque Step-by-Step Ampliado */}
        <section style={{ marginBottom: '6rem' }}>
           <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '4rem', textAlign: 'center' }}>Los 5 Segundos Críticos</h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              {[
                { step: '1', title: 'Energía y POST', icon: <Power />, desc: 'La fuente activa los voltajes y el CPU ejecuta el POST desde el BIOS para validar que la RAM, el Video y el Procesador estén presentes.' },
                { step: '2', title: 'Setup y BIOS/UEFI', icon: <Settings />, desc: 'Se cargan las configuraciones del usuario (orden de booteo, velocidad de RAM). El sistema inicializa periféricos básicos.' },
                { step: '3', title: 'Búsqueda del Bootloader', icon: <HardDrive />, desc: 'Se lee el primer sector del disco elegido para encontrar el cargador de arranque (como GRUB o Windows Boot Manager).' },
                { step: '4', title: 'Carga del Kernel', icon: <Database />, desc: 'El programa más importante del Sistema Operativo se copia a la RAM y toma el mando absoluto del hardware.' },
                { step: '5', title: 'Entorno de Usuario', icon: <Smartphone />, desc: 'Se cargan los controladores (drivers), servicios de red internos y finalmente la pantalla de bienvenida o Login.' }
              ].map((s, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '40px', border: '1.5px solid rgba(255,255,255,0.05)', position: 'relative' }}
                >
                  <div style={{ position: 'absolute', top: '-15px', left: '30px', width: '40px', height: '40px', background: '#ff4757', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, boxShadow: '0 5px 15px rgba(255,71,87,0.4)' }}>{s.step}</div>
                  <div style={{ color: '#ff4757', marginBottom: '1.5rem' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{s.title}</h3>
                  <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{s.desc}</p>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Teoría Ampliada: Puertos e Interrupciones */}
        <section style={{ marginBottom: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
           <div style={{ background: '#111', padding: '4rem', borderRadius: '50px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: '#ff4757' }}>Interrupciones (IRQ)</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                El procesador no adivina cuándo presionas una tecla. El hardware envía una <strong>Interrupción</strong> que congela temporalmente la tarea actual de la CPU para atender al dispositivo. Es la base de los sistemas multi-tarea modernos.
              </p>
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#1e293b', borderRadius: '20px', borderLeft: '5px solid #ff4757' }}>
                 <p style={{ margin: 0, fontSize: '0.9rem', color: '#fff', fontWeight: 700 }}>Dato Pro:</p>
                 <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>El DMA permite que el disco duro mande un archivo a la RAM sin que la CPU tenga que mover cada byte manualmente.</p>
              </div>
           </div>
           
           <div style={{ position: 'relative' }}>
              <img 
                src="/assets/pc_boot_process_bios_glow_1775235626969.png" 
                alt="PC Boot Process" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(255,71,87,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
           </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #ff4757', boxShadow: '0 30px 60px rgba(255,71,87,0.1)' }}>
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
    </LockedContent>
  );
};

export default Arranque;
