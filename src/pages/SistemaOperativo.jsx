import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { Layers, Monitor, Cpu, HardDrive, Globe, Settings, Terminal, Database, Zap, Shield } from 'lucide-react';

const QUESTIONS = [
  { q: '¿Cuál es la función principal del Kernel del Sistema Operativo?', opts: ['Mostrar el escritorio', 'Gestionar el acceso al hardware y coordinar los procesos del sistema', 'Reproducir audio', 'Navegar por internet'], a: 1, exp: 'El Kernel es el núcleo del SO: gestiona la CPU, la memoria, los dispositivos de E/S y la seguridad de acceso al hardware.' },
  { q: '¿Qué es el "scheduling" (planificación de procesos)?', opts: ['Programar alarmas del sistema', 'El algoritmo que decide qué proceso usa la CPU en cada momento', 'Formatear el disco', 'Ordenar archivos alfabéticamente'], a: 1, exp: 'El scheduler asigna tiempo de CPU a los procesos usando algoritmos como Round Robin, FIFO o por prioridades.' },
  { q: '¿Qué tipo de Sistema Operativo usa la mayoría de los smartphones actuales?', opts: ['DOS (Disk Operating System)', 'UNIX monousuario', 'Móvil (Android/iOS), basado en Linux/Darwin', 'Windows 95'], a: 2, exp: 'Android se basa en el kernel Linux; iOS/iPadOS se basan en Darwin, derivado de BSD/Unix.' },
  { q: 'La "memoria virtual" en los Sistemas Operativos permite:', opts: ['Agregar más RAM física automáticamente', 'Usar espacio de disco como extensión de la RAM para ejecutar más programas', 'Acelerar el procesador', 'Guardar contraseñas'], a: 1, exp: 'La memoria virtual usa una partición del disco (swap/paginación) para simular más RAM, aunque es mucho más lenta.' },
  { q: '¿Qué es un "proceso zombie" en Linux/Unix?', opts: ['Un proceso con virus', 'Un proceso que terminó pero cuya entrada en la tabla de procesos aún existe', 'Un proceso que consume el 100% de la CPU', 'Un archivo corrupto'], a: 1, exp: 'Un proceso zombie ejecutó exit() pero su padre no leyó su código de salida. Ocupa una entrada en la tabla de procesos sin consumir CPU/memoria.' },
  { q: 'El sistema de archivos FAT32 tiene como limitación principal:', opts: ['No funciona en Windows', 'No permite crear carpetas', 'Solo soporta archivos de máximo 4 GB', 'No permite más de 10 archivos'], a: 2, exp: 'FAT32 tiene un límite de 4 GB por archivo. Para discos modernos se usa NTFS (Windows) o exFAT (compatibilidad universal).' },
  { q: '¿Qué diferencia a un Sistema Operativo de tiempo real (RTOS) de uno de propósito general?', opts: ['El RTOS es más bonito', 'El RTOS garantiza respuesta en un tiempo máximo predecible, crítico para sistemas embebidos', 'El RTOS solo corre en supercomputadoras', 'No hay diferencia'], a: 1, exp: 'En sistemas como control de vuelos, marcapasos o frenos ABS, el SO debe responder en microsegundos garantizados. FreeRTOS y VxWorks son ejemplos.' },
  { q: '¿Qué es la "virtualización" en el contexto de los Sistemas Operativos?', opts: ['Crear efectos visuales en el escritorio', 'Ejecutar múltiples SOs independientes sobre un mismo hardware físico mediante un hypervisor', 'Comprimir archivos', 'Sincronizar archivos con la nube'], a: 1, exp: 'Hypervisores como VMware, VirtualBox o KVM permiten ejecutar Linux, Windows y otros SOs simultáneamente en el mismo hardware.' }
];

const SistemaOperativo = () => {
  const [activeLayer, setActiveLayer] = useState(null);

  const layers = [
    { title: 'Aplicaciones', color: '#3b82f6', desc: 'Chrome, Word, juegos. Todo lo que usás a diario.' },
    { title: 'Shell / Interfaz', color: '#8b5cf6', desc: 'Bash, PowerShell, escritorio gráfico. El puente entre usuario y SO.' },
    { title: 'Sistema Operativo', color: '#f59e0b', desc: 'Kernel, gestión de procesos, memoria y dispositivos.' },
    { title: 'Controladores', color: '#ef4444', desc: 'Drivers que traducen entre el SO y el hardware específico.' },
    { title: 'Hardware', color: '#10b981', desc: 'CPU, RAM, discos, pantalla. La capa física real.' }
  ];

  return (
    <LockedContent keyword="kernel" title="Clase 10: Sistema Operativo" unit={4}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Sistema Operativo
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              El director invisible. Gestiona cada ciclo de CPU, cada byte de RAM y cada dispositivo de tu computadora sin que lo notes.
            </p>
          </motion.div>
        </header>

        {/* Capas del SO */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#1e293b', padding: '3rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', color: '#3b82f6' }}>Modelo de Capas</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {layers.map((layer, i) => (
                  <motion.div
                    key={i}
                    onMouseEnter={() => setActiveLayer(i)}
                    onMouseLeave={() => setActiveLayer(null)}
                    style={{ padding: '1.5rem', borderRadius: '20px', border: '1.5px solid', borderColor: activeLayer === i ? layer.color : 'rgba(255,255,255,0.05)', background: activeLayer === i ? layer.color + '15' : '#0f172a', cursor: 'pointer', transition: '0.3s' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem' }}>{layer.title}</span>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: layer.color }} />
                    </div>
                    {activeLayer === i && <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.75rem' }}>{layer.desc}</p>}
                  </motion.div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img src="/assets/operating_system_layers_glass_1775235566953.png" alt="OS Layers" style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(59,130,246,0.2)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Teoria Expandida */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>Funciones Críticas del SO</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { Icon: Cpu, color: '#3b82f6', title: 'Gestión de Procesos', desc: 'El scheduler asigna tiempo de CPU mediante algoritmos como Round Robin. Garantiza que ningún proceso monopolice el procesador.' },
              { Icon: Database, color: '#8b5cf6', title: 'Gestión de Memoria', desc: 'Asigna bloques de RAM a los procesos, gestiona la memoria virtual (swap) y protege la memoria de un proceso de ser accedida por otro.' },
              { Icon: HardDrive, color: '#f59e0b', title: 'Sistema de Archivos', desc: 'Organiza datos en jerarquías de directorios. Sistemas como NTFS, ext4, APFS proveen permisos, journaling y cifrado nativo.' },
              { Icon: Globe, color: '#10b981', title: 'Gestión de Red', desc: 'Implementa la pila TCP/IP, gestiona sockets, interfaces de red y garantiza el flujo ordenado de paquetes de datos.' },
              { Icon: Shield, color: '#ef4444', title: 'Seguridad y Permisos', desc: 'Control de acceso por roles (root/admin, usuario, invitado), listas de control de acceso (ACL) y aislamiento de procesos.' },
              { Icon: Terminal, color: '#94a3b8', title: 'Llamadas al Sistema', desc: 'Los programas solicitan servicios al Kernel mediante syscalls (open, read, write, fork). Son la API reservada del hardware.' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <item.Icon size={32} color={item.color} style={{ marginBottom: '1.25rem' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* OS Comparison */}
        <section style={{ marginBottom: '6rem', background: '#111', padding: '4rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 900 }}>Los Grandes Sistemas Operativos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Windows', kernel: 'NT Kernel', cuota: '~70% desktop', color: '#0ea5e9', desc: 'Dominante en escritorio corporativo. NTFS, Active Directory, PowerShell.' },
              { name: 'Linux', kernel: 'Monolítico modular', cuota: '~100% servidores', color: '#f59e0b', desc: 'Open source, base de Android, servidores web y supercomputadoras.' },
              { name: 'macOS / iOS', kernel: 'Darwin (XNU)', cuota: '~25% laptop premium', color: '#ef4444', desc: 'Base BSD + Mach microkernel. Ecosistema Apple, M-series chips.' }
            ].map((os, i) => (
              <div key={i} style={{ padding: '2.5rem', background: os.color + '10', borderRadius: '30px', border: `1.5px solid ${os.color}30` }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: os.color, marginBottom: '0.5rem' }}>{os.name}</h3>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem', fontWeight: 700 }}>Kernel: {os.kernel} · {os.cuota}</div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>{os.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #3b82f6', boxShadow: '0 30px 60px rgba(59,130,246,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Layers size={52} color="#3b82f6" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: Sistema Operativo</h2>
          </div>
          <QuizBlock
            questions={QUESTIONS}
            accentColor="#3b82f6"
            clase="Clase 10: Sistema Operativo"
            unidad="Unidad 4"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default SistemaOperativo;
