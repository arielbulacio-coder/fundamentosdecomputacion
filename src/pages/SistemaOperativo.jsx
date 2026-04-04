import { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import {
  Server, Cpu, Database, Layout,
  CheckCircle, Activity, RefreshCw, Plus, PlayCircle
} from 'lucide-react';

const OS_QUESTS = [
  { q: '¿Qué es un Sistema Operativo?', opts: ['Un programa para navegar por internet', 'Software que administra los recursos de hardware y sirve de base para las aplicaciones', 'Un tipo de hardware especial', 'Una base de datos'], a: 1, exp: 'Es el intermediario crítico entre el usuario/aplicaciones y los fierros de la computadora.' },
  { q: '¿Cuál es la función del Kernel (Núcleo)?', opts: ['Dibujar las ventanas en la pantalla', 'Gestionar directamente la CPU, la memoria y los dispositivos', 'Cifrar archivos', 'Instalar juegos'], a: 1, exp: 'Es la parte central y más protegida del SO que tiene control absoluto del hardware.' },
  { q: 'El "Modo Usuario" se diferencia del "Modo Kernel" por:', opts: ['Tiene más colores', 'Las aplicaciones no tienen acceso directo al hardware por razones de seguridad', 'Es más rápido', 'Solo funciona con mouse'], a: 1, exp: 'Previene que un error en una aplicación (como Chrome) cuelgue todo el sistema.' },
  { q: '¿Qué es un Proceso en un SO?', opts: ['Un archivo guardado', 'Un programa en ejecución que consume recursos (CPU, RAM)', 'Una carpeta', 'Un virus'], a: 1, exp: 'Cuando haces clic en un icono, el programa pasa de ser algo estático en disco a ser un proceso vivo en RAM.' },
  { q: 'La "Planificación de la CPU" sirve para:', opts: ['Bajar el brillo', 'Decidir qué proceso usa el procesador en cada momento para que parezca que todos corren a la vez', 'Organizar los archivos', 'Medir la batería'], a: 1, exp: 'Es el algoritmo que crea la ilusión de la multitarea.' },
  { q: '¿Qué es el Sistema de Archivos (File System)?', opts: ['Un programa de oficina', 'La forma en que el SO organiza y almacena los datos en el disco (ej: NTFS, FAT32, ext4)', 'Una lista de contactos', 'El explorador de internet'], a: 1, exp: 'Determina cómo se nombran, guardan y recuperan los archivos.' },
  { q: '¿Qué sucede durante una "Llamada al Sistema" (System Call)?', opts: ['Te llaman por teléfono', 'Una aplicación pide un servicio protegido al Kernel (como leer un archivo)', 'Se apaga la PC', 'Se reinicia el router'], a: 1, exp: 'Es el puente legal que cruzan las apps para hablar con el hardware.' },
  { q: 'La técnica de "Paginación" en memoria sirve para:', opts: ['Hacer que el libro sea más corto', 'Dividir la memoria en trozos fijos para evitar la fragmentación externa', 'Cargar más rápido las páginas web', 'Tener más disco'], a: 1, exp: 'Permite que un proceso no necesite estar contiguo en toda la memoria RAM.' },
  { q: '¿Qué es el Interbloqueo (Deadlock)?', opts: ['Cuando se rompe el teclado', 'Una situación donde dos procesos se esperan mutuamente para liberar un recurso y nadie avanza', 'Un virus que bloquea carpetas', 'Cuando se llena el disco'], a: 1, exp: 'Es el "abrazo mortal" que congela procesos.' },
  { q: '¿Cuál es la función de los Controladores (Drivers)?', opts: ['Manejar camiones', 'Software que enseña al SO cómo hablar con un hardware específico (ej: impresora o GPU)', 'Acelerar la PC', 'Bajar drivers de red'], a: 1, exp: 'Sin ellos, el SO no sabría qué señales enviar a cada dispositivo diferente.' },
  { q: '¿Qué significa que un SO sea Multitarea?', opts: ['Que tiene muchas carpetas', 'Que puede ejecutar (o parecer que ejecuta) varios procesos de forma simultánea', 'Que es para muchos usuarios', 'Que es muy grande'], a: 1, exp: 'Permite escuchar música mientras escribes y descargas archivos.' },
  { q: 'La Interfaz de Línea de Comandos (CLI) es:', opts: ['Una pantalla con fotos', 'Una interfaz basada exclusivamente en texto donde el usuario escribe órdenes', 'El cable de video', 'Un tipo de procesador'], a: 1, exp: 'Es más eficiente y potente para administradores de sistemas (ej: Terminal, CMD).' },
  { q: '¿Qué es un Hilo (Thread)?', opts: ['Un cable de conexión', 'La unidad de ejecución más pequeña dentro de un proceso', 'Una parte del disco', 'Un mensaje de chat'], a: 1, exp: 'Un solo proceso (como un navegador) puede tener muchos hilos trabajando a la vez.' },
  { q: 'El "Spooling" se ejemplifica comúnmente con:', opts: ['Mirar un video', 'La cola de impresión que guarda los trabajos en disco hasta que la impresora esté lista', 'Mover carpetas', 'Instalar Windows'], a: 1, exp: 'Permite que la CPU se libere rápido aunque el periférico sea lento.' },
  { q: 'Un Sistema Operativo de Tiempo Real (RTOS) es vital en:', opts: ['Oficinas', 'Sistemas críticos donde el tiempo de respuesta debe ser exacto (ej: frenos de autos, satélites)', 'Juegos casuales', 'Escuelas'], a: 1, exp: 'Aquí un retraso de milisegundos puede ser fatal.' },
  { q: '¿Qué es la Shell del sistema?', opts: ['El caparazón del disco', 'El intérprete de comandos que sirve de interfaz entre el usuario y el Kernel', 'Un tipo de virus', 'El cooler del CPU'], a: 1, exp: 'Ejemplos son Bash en Linux o PowerShell en Windows.' },
  { q: 'El "Monolithic Kernel" (Núcleo Monolítico) se caracteriza por:', opts: ['Ser muy pequeño', 'Tener todos los servicios del SO (drivers, redes) dentro del espacio de memoria del Kernel', 'No tener drivers', 'Ser virtual'], a: 1, exp: 'Es el diseño de Linux: muy rápido pero un error en un driver puede tirar todo el sistema.' },
  { q: '¿Qué es una Interrupción de Software (Trap/Exception)?', opts: ['Que se cuelgue la PC', 'Una señal generada por un error (dividir por cero) o una petición especial de una app', 'Un mensaje de WhatsApp', 'Un cortocircuito'], a: 1, exp: 'El SO toma el control para manejar la situación o cerrar la app problemática.' },
  { q: 'La Gestión de E/S (Entrada/Salida) en un SO usa "Buffering" para:', opts: ['Limpiar el disco', 'Sincronizar dispositivos de diferentes velocidades almacenando datos intermedios en RAM', 'Aumentar el volumen', 'Cargar fotos'], a: 1, exp: 'Evita que el sistema espere a cada bit que viene de un dispositivo lento.' },
  { q: '¿Cuál es la función del Gestor de Arranque (Bootloader) en sistemas con varios SO?', opts: ['Borrar el disco', 'Permitir al usuario elegir qué sistema operativo cargar (ej: Windows o Ubuntu)', 'Instalar actualizaciones', 'Mejorar el rendimiento'], a: 1, exp: 'Permite el famoso "Dual Boot".' }
];

const PROCESS_COLORS = ['#9333ea', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
const QUANTUM = 2;

const runRoundRobin = (processes) => {
  const procs = processes.map((p, i) => ({
    ...p, id: i, remaining: p.burst, start: -1, finish: -1
  }));
  const gantt = [];
  let time = 0;
  const queue = [...procs.map(p => ({ ...p }))];

  while (queue.some(p => p.remaining > 0)) {
    let executed = false;
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].remaining > 0) {
        const slice = Math.min(QUANTUM, queue[i].remaining);
        if (queue[i].start === -1) queue[i].start = time;
        gantt.push({ id: queue[i].id, name: queue[i].name, start: time, end: time + slice, color: queue[i].color });
        time += slice;
        queue[i].remaining -= slice;
        if (queue[i].remaining === 0) queue[i].finish = time;
        executed = true;
      }
    }
    if (!executed) break;
  }

  const stats = queue.map(p => ({
    name: p.name,
    color: p.color,
    burst: p.burst,
    finish: p.finish,
    turnaround: p.finish,
    waiting: p.finish - p.burst
  }));

  return { gantt, stats, totalTime: time };
};

const DEFAULT_PROCESSES = [
  { name: 'P1', burst: 5 },
  { name: 'P2', burst: 3 },
  { name: 'P3', burst: 7 },
  { name: 'P4', burst: 2 },
];

const RING_LAYERS = [
  { ring: 'Ring 0', name: 'Kernel', color: '#9333ea', bg: '#9333ea15', icon: '⚛️', desc: 'Acceso total al hardware. Ejecuta drivers, gestiona interrupciones, controla la MMU y el scheduler. Un bug aquí cuelga todo el sistema.' , ejemplos: ['Controladores de disco', 'Gestión de memoria física', 'Manejo de interrupciones', 'Scheduler de procesos'] },
  { ring: 'Ring 1-2', name: 'SO — Servicios', color: '#4f46e5', bg: '#4f46e515', icon: '🔧', desc: 'En la práctica, la mayoría de los SO modernos (Linux, Windows) usan solo Ring 0 y Ring 3. Los rings intermedios fueron diseñados para hipervisores y virtualización.' , ejemplos: ['Hipervisores (VMware, Hyper-V)', 'Algunos drivers en VMs', 'En Linux/Win: raramente usados'] },
  { ring: 'Ring 3', name: 'Aplicaciones de Usuario', color: '#3b82f6', bg: '#3b82f615', icon: '👤', desc: 'Todo el software de usuario. No tiene acceso directo al hardware. Debe pedir servicios al Kernel mediante System Calls. Un crash aquí solo mata esa app.' , ejemplos: ['Tu navegador Chrome', 'Microsoft Word', 'Spotify, Photoshop', 'Cualquier app que descargás'] },
];

const SYSCALLS = [
  { label: '📂 Abrir archivo', steps: ['App llama a open("/foto.jpg")', 'System Call → crossing Ring 3→0', 'Kernel verifica permisos en el filesystem', 'Kernel solicita datos al controlador de disco', '← Devuelve descriptor de archivo a la app'] },
  { label: '🌐 Leer de red', steps: ['App llama a recv(socket)', 'System Call → crossing Ring 3→0', 'Kernel consulta el buffer de red', 'Driver de NIC mueve datos a RAM (DMA)', '← Devuelve bytes recibidos a la app'] },
  { label: '🖥️ Mostrar ventana', steps: ['App llama a DrawWindow()', 'System Call → crossing Ring 3→0', 'Kernel envía comandos al driver de video', 'GPU actualiza el framebuffer en VRAM', '← Confirma renderizado'] },
];

const ModoRingSim = () => {
  const [selectedRing, setSelectedRing] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);
  const [showCallSteps, setShowCallSteps] = useState(false);

  const handleCall = (i) => {
    setSelectedCall(i);
    setShowCallSteps(true);
    setTimeout(() => setShowCallSteps(false), 4000);
  };

  return (
    <div style={{ background: '#0f172a', padding: '3rem', borderRadius: '40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        {/* Diagrama de Rings */}
        <div>
          <h3 style={{ fontWeight: 900, marginBottom: '1.5rem', color: '#94a3b8', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Anillos de Privilegio</h3>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {RING_LAYERS.map((r, i) => (
              <div key={i} onClick={() => setSelectedRing(selectedRing === i ? null : i)}
                style={{ padding: `${1.5 + i * 0.3}rem 1.5rem`, borderRadius: '20px', border: `2px solid`, cursor: 'pointer', transition: '0.3s',
                  borderColor: selectedRing === i ? r.color : `${r.color}40`,
                  background: selectedRing === i ? r.bg : '#1e293b',
                  borderLeft: `5px solid ${r.color}` }}>
                <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: r.color, letterSpacing: '1px' }}>{r.ring}</span>
                      <span style={{ fontWeight: 900, fontSize: '1rem' }}>{r.name}</span>
                    </div>
                    {selectedRing === i && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 0.75rem' }}>{r.desc}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {r.ejemplos.map((ej, j) => <span key={j} style={{ background: `${r.color}20`, color: r.color, borderRadius: '8px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 700 }}>{ej}</span>)}
                        </div>
                      </div>
                    )}
                  </div>
                  <span style={{ color: '#475569', fontSize: '0.8rem' }}>{selectedRing === i ? '▲' : '▼'}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1rem', background: '#1e293b', padding: '1rem 1.5rem', borderRadius: '15px', borderLeft: '4px solid #ef4444' }}>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.82rem' }}>
              <strong style={{ color: '#ef4444' }}>Clave:</strong> Linux y Windows usan solo Ring 0 (kernel) y Ring 3 (apps). Un programa de usuario <em>nunca</em> puede acceder directamente al hardware — debe pasar por una System Call.
            </p>
          </div>
        </div>

        {/* System Call Simulator */}
        <div>
          <h3 style={{ fontWeight: 900, marginBottom: '1.5rem', color: '#94a3b8', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Simulador de System Call</h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Elegí una acción de usuario y mirá cómo cruza la frontera hacia el Kernel:</p>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {SYSCALLS.map((sc, i) => (
              <button key={i} onClick={() => handleCall(i)} style={{
                padding: '1rem 1.5rem', borderRadius: '15px', border: '2px solid',
                borderColor: selectedCall === i ? '#9333ea' : '#1e293b',
                background: selectedCall === i ? '#9333ea20' : '#1e293b',
                color: '#f8fafc', cursor: 'pointer', fontWeight: 800, textAlign: 'left', fontSize: '0.95rem'
              }}>{sc.label}</button>
            ))}
          </div>
          {selectedCall !== null && (
            <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {SYSCALLS[selectedCall].steps.map((step, j) => (
                  <motion.div key={j} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.15 }}
                    style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ color: j === 1 ? '#ef4444' : j === SYSCALLS[selectedCall].steps.length - 1 ? '#10b981' : '#9333ea', fontWeight: 900, minWidth: '20px', fontSize: '0.9rem' }}>{j === 1 ? '⚡' : j === SYSCALLS[selectedCall].steps.length - 1 ? '✓' : `${j+1}.`}</span>
                    <span style={{ color: j === 1 ? '#ef4444' : j === SYSCALLS[selectedCall].steps.length - 1 ? '#10b981' : '#94a3b8', fontSize: '0.85rem', fontWeight: j === 1 ? 800 : 400 }}>{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SchedulerSimulator = () => {
  const [processes, setProcesses] = useState(
    DEFAULT_PROCESSES.map((p, i) => ({ ...p, color: PROCESS_COLORS[i] }))
  );
  const [result, setResult] = useState(null);
  const [newName, setNewName] = useState('');
  const [newBurst, setNewBurst] = useState(4);

  const simulate = () => {
    setResult(runRoundRobin(processes));
  };

  const reset = () => {
    setProcesses(DEFAULT_PROCESSES.map((p, i) => ({ ...p, color: PROCESS_COLORS[i] })));
    setResult(null);
  };

  const addProcess = () => {
    if (processes.length >= 5) return;
    const name = newName.trim() || `P${processes.length + 1}`;
    setProcesses(ps => [...ps, { name, burst: Math.max(1, Math.min(10, newBurst)), color: PROCESS_COLORS[ps.length] }]);
    setNewName('');
  };

  const removeProcess = (i) => {
    setProcesses(ps => ps.filter((_, idx) => idx !== i));
    setResult(null);
  };

  const updateBurst = (i, val) => {
    setProcesses(ps => ps.map((p, idx) => idx === i ? { ...p, burst: Math.max(1, Math.min(10, val)) } : p));
    setResult(null);
  };

  return (
    <div style={{ background: '#111', padding: '4rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)', marginBottom: '6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Activity color="#9333ea" size={42} style={{ margin: '0 auto 1rem' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Simulador de Planificación Round Robin</h2>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
          Define procesos con su tiempo de ráfaga (burst). El algoritmo reparte la CPU en turnos de <strong style={{ color: '#9333ea' }}>quantum = {QUANTUM} unidades</strong> de forma circular.
        </p>
      </div>

      {/* Tabla de procesos */}
      <div style={{ background: '#0f172a', borderRadius: '25px', padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontWeight: 800, color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Procesos en Cola</h3>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {processes.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#1e293b', padding: '0.75rem 1.25rem', borderRadius: '15px', borderLeft: `5px solid ${p.color}` }}>
              <span style={{ fontWeight: 900, color: p.color, minWidth: '30px' }}>{p.name}</span>
              <span style={{ color: '#64748b', fontSize: '0.85rem', flex: 1 }}>Burst:</span>
              <input
                type="number" min="1" max="10" value={p.burst}
                onChange={e => updateBurst(i, parseInt(e.target.value) || 1)}
                style={{ width: '60px', background: '#0f172a', border: `1px solid ${p.color}40`, borderRadius: '8px', padding: '0.4rem 0.5rem', color: '#fff', fontSize: '0.95rem', fontWeight: 800, textAlign: 'center' }}
              />
              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>ut</span>
              <button onClick={() => removeProcess(i)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '1.1rem', padding: '0 0.25rem' }}>✕</button>
            </div>
          ))}
        </div>

        {/* Agregar proceso */}
        {processes.length < 5 && (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <input
              placeholder="Nombre"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              style={{ width: '80px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0.6rem 0.75rem', color: '#fff', fontSize: '0.85rem' }}
            />
            <input
              type="number" min="1" max="10" value={newBurst}
              onChange={e => setNewBurst(parseInt(e.target.value) || 1)}
              style={{ width: '70px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0.6rem 0.75rem', color: '#fff', fontSize: '0.85rem', textAlign: 'center' }}
            />
            <span style={{ color: '#64748b', fontSize: '0.8rem' }}>ut</span>
            <button onClick={addProcess} style={{ background: '#9333ea30', color: '#9333ea', border: '1px solid #9333ea40', padding: '0.6rem 1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Plus size={14} /> Agregar
            </button>
          </div>
        )}
      </div>

      {/* Botones */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <button
          onClick={simulate}
          style={{ background: 'linear-gradient(to right, #4f46e5, #9333ea)', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '20px', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <PlayCircle size={20} /> Simular Round Robin
        </button>
        <button
          onClick={reset}
          style={{ background: '#1e293b', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)', padding: '1rem 2rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <RefreshCw size={16} /> Reiniciar
        </button>
      </div>

      {/* Resultado */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Diagrama de Gantt */}
          <h3 style={{ fontWeight: 800, color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Diagrama de Gantt</h3>
          <div style={{ background: '#0f172a', borderRadius: '20px', padding: '1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
            <div style={{ display: 'flex', minWidth: 'max-content', gap: 0 }}>
              {result.gantt.map((g, i) => (
                <div key={i} style={{
                  width: `${(g.end - g.start) * 40}px`,
                  background: g.color + '33',
                  border: `2px solid ${g.color}`,
                  borderRadius: '8px',
                  textAlign: 'center',
                  padding: '0.75rem 0.25rem',
                  margin: '0 2px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: g.color,
                  minWidth: '36px'
                }}>
                  {g.name}
                  <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, marginTop: '0.25rem' }}>
                    {g.start}-{g.end}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', marginTop: '0.5rem' }}>
              {result.gantt.map((g, i) => (
                <div key={i} style={{ width: `${(g.end - g.start) * 40}px`, margin: '0 2px', fontSize: '0.65rem', color: '#334155', textAlign: 'left', minWidth: '36px' }}>
                  {g.start}
                </div>
              ))}
              <div style={{ fontSize: '0.65rem', color: '#334155' }}>{result.totalTime}</div>
            </div>
          </div>

          {/* Tabla de estadísticas */}
          <h3 style={{ fontWeight: 800, color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Estadísticas</h3>
          <div style={{ background: '#0f172a', borderRadius: '20px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#1e293b' }}>
                  {['Proceso', 'Burst', 'Finalización', 'Turnaround', 'Espera'].map(h => (
                    <th key={h} style={{ padding: '1rem', textAlign: 'center', color: '#64748b', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.stats.map((s, i) => (
                  <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center', fontWeight: 800, color: s.color }}>{s.name}</td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#f8fafc' }}>{s.burst} ut</td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#f8fafc' }}>{s.finish} ut</td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#a78bfa' }}>{s.turnaround} ut</td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: s.waiting > 0 ? '#f59e0b' : '#22c55e' }}>{s.waiting} ut</td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid rgba(255,255,255,0.08)', background: '#1e293b' }}>
                  <td colSpan={3} style={{ padding: '0.85rem 1rem', textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontWeight: 700 }}>Promedio</td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#a78bfa', fontWeight: 800 }}>
                    {(result.stats.reduce((s, p) => s + p.turnaround, 0) / result.stats.length).toFixed(1)} ut
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#f59e0b', fontWeight: 800 }}>
                    {(result.stats.reduce((s, p) => s + p.waiting, 0) / result.stats.length).toFixed(1)} ut
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const SistemaOperativo = () => {
  return (
    <LockedContent keyword="kernel" title="Clase 10: El Corazón del Software" unit={4}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #4f46e5, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Sistemas Operativos
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              El gestor de recursos definitivo. Entiende cómo el software toma control del hardware para crear el entorno que usas cada día.
            </p>
          </motion.div>
        </header>

        {/* Teoría Ampliada: Capas del Sistema */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
             {[
               { title: 'Nucleo / Kernel', icon: <Cpu />, color: '#9333ea', desc: 'Es la parte vital. Maneja la memoria, el tiempo del procesador (Scheduling) y el acceso a los periféricos de forma segura.' },
               { title: 'Gestión de Procesos', icon: <Activity />, color: '#4f46e5', desc: 'Un programa es algo muerto en disco. El SO lo convierte en un Proceso vivo, asignándole recursos y tiempo de ejecución.' },
               { title: 'Sistema de Archivos', icon: <Database />, color: '#3b82f6', desc: 'Organiza la información en estructuras lógicas (directorios/archivos) sobre estructuras físicas (sectores del disco).' },
               { title: 'Interfaz de Usuario', icon: <Layout />, color: '#10b981', desc: 'Ya sea gráfica (GUI) o de texto (CLI), es la capa que permite al ser humano comunicarse con el complejo mundo binario.' }
             ].map((layer, i) => (
               <div key={i} style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '40px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: layer.color, marginBottom: '1.25rem' }}>{layer.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{layer.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>{layer.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Modelo de Capas Visual Ampliado */}
        <section style={{ marginBottom: '6rem', background: '#111', padding: '5rem 3.5rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                 <h2 style={{ fontSize: '2.3rem', fontWeight: 900, marginBottom: '2rem' }}>Jerarquía de Abstracción</h2>
                 <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.1rem' }}>
                   El Sistema Operativo nos oculta la complejidad del hardware. Para una aplicación, guardar un archivo es una simple orden (System Call), mientras que para el SO implica mover cabezales de disco o enviar voltajes a celdas SSD.
                 </p>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
                    {[
                      { l: 'Memoria Virtual', d: 'Engaña a las apps con más recursos.' },
                      { l: 'Multiprogramación', d: 'Muchos procesos en una sola CPU.' },
                      { l: 'Protección', d: 'Nadie toca la memoria de otro.' },
                      { l: 'Planificación', d: 'Justicia en el uso del procesador.' }
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#1e293b', padding: '1rem', borderRadius: '15px' }}>
                         <CheckCircle size={18} color="#9333ea" />
                         <div>
                            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{item.l}:</span>
                            <span style={{ color: '#64748b', fontSize: '0.85rem' }}> {item.d}</span>
                         </div>
                      </li>
                    ))}
                 </ul>
              </div>
              <div style={{ position: 'relative' }}>
                 <img
                   src="/assets/operating_system_layers_glass_1775235566953.png"
                   alt="OS Layers Architecture"
                   style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(147,51,234,0.3)' }}
                 />
                 <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
              </div>
           </div>
        </section>

        {/* Modo Usuario vs Kernel */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Anillos de Privilegio: Modo Kernel vs Usuario</h2>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem', maxWidth: '750px', margin: '0.5rem auto 0' }}>
              Los procesadores modernos implementan niveles de privilegio (rings) para aislar el SO de las aplicaciones. Hacé clic en cada ring o simulá una System Call para ver cómo funciona el puente entre ambos mundos.
            </p>
          </div>
          <ModoRingSim />
        </section>

        {/* Simulador Round Robin */}
        <SchedulerSimulator />

        <RepasoClave
          accentColor="#9333ea"
          title="Sistemas Operativos"
          facts={[
            { icon: '🔑', term: 'Kernel (Núcleo)', def: 'Corazón del SO con acceso total al hardware. Opera en Modo Kernel. Gestiona CPU, memoria RAM y periféricos.' },
            { icon: '🏃', term: 'Proceso vs Hilo', def: 'Proceso: programa en ejecución con su propia RAM y recursos. Hilo (Thread): unidad de ejecución mínima dentro de un proceso.' },
            { icon: '🔄', term: 'Scheduling / Planificación', def: 'Decide qué proceso usa la CPU en cada momento. Algoritmos: Round Robin (turnos), FCFS (llegada), SJF (más corto primero).' },
            { icon: '🔒', term: 'Deadlock (Abrazo Mortal)', def: 'Dos o más procesos se esperan mutuamente para liberar un recurso, bloqueándose indefinidamente. Requiere 4 condiciones de Coffman.' },
            { icon: '🗂️', term: 'Paginación', def: 'Divide la memoria en páginas de tamaño fijo para evitar fragmentación externa. Base del funcionamiento de la memoria virtual.' },
            { icon: '📞', term: 'System Call', def: 'Puente legal entre aplicaciones (Modo Usuario) y el Kernel. Las apps solicitan servicios del SO sin acceder al hardware directamente.' },
          ]}
        />

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #9333ea', boxShadow: '0 30px 60px rgba(147,51,234,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Server size={52} color="#9333ea" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Sistemas Operativos</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>20 preguntas para validar tu conocimiento sobre la gestión de recursos del sistema.</p>
          </div>
          <QuizBlock
            questions={OS_QUESTS}
            accentColor="#9333ea"
            clase="Clase 10: Sistemas Operativos"
            unidad="Unidad 4"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default SistemaOperativo;
