import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import { Database, Zap, Server, ShieldCheck, BarChart, RefreshCw, PlayCircle } from 'lucide-react';

const MEM_QUESTS = [
  { q: '¿Qué significa RAM?', opts: ['Read Access Memory', 'Random Access Memory', 'Rapid Advanced Memory', 'Root Alpha Memory'], a: 1, exp: 'Es una memoria de acceso aleatorio, lo que significa que se puede leer cualquier punto con la misma velocidad.' },
  { q: 'La memoria RAM es de tipo:', opts: ['Persistente', 'No volátil', 'Volátil (se borra al apagar)', 'Mecánica'], a: 2, exp: 'Al quitar la energía, los datos guardados en la RAM desaparecen.' },
  { q: '¿Cuál es la función principal de la ROM?', opts: ['Guardar fotos', 'Acelerar juegos', 'Contener las instrucciones de arranque (BIOS/UEFI)', 'Reemplazar al disco rígido'], a: 2, exp: 'Read Only Memory: no se borra al apagar y contiene el firmware básico.' },
  { q: 'En la jerarquía de memoria, a medida que nos alejamos del CPU:', opts: ['La memoria es más rápida', 'La memoria es más barata y de mayor capacidad, pero más lenta', 'La memoria desaparece', 'No hay cambios'], a: 1, exp: 'Los registros son lo más rápido/caro; el disco es lo más lento/barato.' },
  { q: '¿Cuál es la ventaja de la memoria Caché?', opts: ['Es la más grande', 'Reduce el tiempo de espera del CPU al guardar datos frecuentemente usados', 'Es más barata que la RAM', 'No necesita energía'], a: 1, exp: 'Sirve de puente entre la altísima velocidad del CPU y la relativa lentitud de la RAM.' },
  { q: '¿Qué es la Memoria Virtual?', opts: ['Memoria en la nube', 'Una técnica que usa espacio de disco como si fuera RAM', 'Un simulador de memoria', 'Memoria de video'], a: 1, exp: 'Permite ejecutar programas que requieren más RAM de la que el sistema tiene físicamente.' },
  { q: 'El "Swapping" (Intercambio) consiste en:', opts: ['Cambiar una RAM por otra', 'Mover páginas de memoria entre la RAM y el archivo de paginación en el disco', 'Reiniciar la computadora', 'Duplicar archivos'], a: 1, exp: 'Es el proceso que realiza el SO para gestionar la memoria virtual.' },
  { q: '¿Qué significa que una memoria sea EEPROM o Flash?', opts: ['Que es muy vieja', 'Que es no volátil pero puede borrarse y reprogramarse eléctricamente', 'Que es solo para video', 'Que es mecánica'], a: 1, exp: 'Es el tipo de memoria que usan los pendrives y los chips de BIOS modernos.' },
  { q: '¿Qué es la Latencia de memoria?', opts: ['La capacidad total', 'El tiempo que tarda en responder a una solicitud de datos', 'El peso físico del módulo', 'El precio'], a: 1, exp: 'A menor latencia, más rápido fluyen los datos hacia el procesador.' },
  { q: 'La diferencia entre SRAM (Caché) y DRAM (RAM convencional) es:', opts: ['SRAM es más lenta', 'SRAM es más rápida y no necesita refresco constante, pero es más cara', 'DRAM no usa electricidad', 'Ninguna'], a: 1, exp: 'DRAM (Dynamic) necesita refrescarse miles de veces por segundo, lo que la hace más lenta que SRAM (Static).' },
  { q: '¿Cuál es el ancho de banda habitual de una memoria DDR5 modernísima?', opts: ['~1 GB/s', '~50-100 GB/s', '~1 MB/s', '~10 TB/s'], a: 1, exp: 'DDR5 permite transferencias masivas de datos para alimentar procesadores de muchos núcleos.' },
  { q: 'El Bus de Datos en la memoria determina:', opts: ['Cuánta RAM se puede poner', 'Cuántos bits se pueden transferir simultáneamente', 'El color de los cables', 'La marca del fabricante'], a: 1, exp: 'Un bus de 64 bits puede mover 8 bytes al mismo tiempo.' },
  { q: '¿Qué sucede cuando hay un "Memory Leak" (Fuga de memoria)?', opts: ['Se sale el líquido del cooler', 'Un programa reserva RAM y no la libera, agotándola con el tiempo', 'Se rompe el disco rígido', 'Entra un virus'], a: 1, exp: 'Es un bug de software que degrada el rendimiento del sistema gradualmente.' },
  { q: 'La memoria ECC (Error Correcting Code) se usa principalmente en:', opts: ['Consolas de juegos', 'Servidores y estaciones de trabajo críticas', 'Calculadoras', 'Teléfonos viejos'], a: 1, exp: 'Detecta y corrige bits que cambian accidentalmente por interferencias cósmicas o eléctricas.' },
  { q: '¿Qué es la VRAM?', opts: ['Memoria para virus', 'Memoria de video dedicada para la GPU', 'Memoria virtual externa', 'RAM de baja velocidad'], a: 1, exp: 'Video Random Access Memory: almacena texturas y frames de imagen.' },
  { q: 'El estándar NVMe permite:', opts: ['Usar CDs más rápido', 'Que los discos SSD se comuniquen directo con la CPU vía bus PCIe', 'Ahorrar mucha batería', 'Tener más puertos USB'], a: 1, exp: 'Maximiza el rendimiento de los discos de estado sólido eliminando el cuello de botella del puerto SATA.' },
  { q: '¿Qué es un "Page Fault" (Fallo de página)?', opts: ['Un error al imprimir', 'Cuando el SO busca un dato en RAM y no lo encuentra (está en el disco)', 'Cuando se borra un archivo', 'Un error de ortografía'], a: 1, exp: 'El SO debe entonces traer ese dato del disco a la RAM, lo cual es lento.' },
  { q: '¿Cuál es la función del Controlador de Memoria (MMU)?', opts: ['Controlar el cooler', 'Traducir direcciones de memoria lógica a física y gestionar permisos', 'Instalar Windows', 'Escanear virus'], a: 1, exp: 'Protege la memoria de un proceso para que otros no la dañen.' },
  { q: 'Los registros del CPU se encuentran en el nivel más ______ de la jerarquía:', opts: ['Bajo', 'Medio', 'Externo', 'Alto (Nivel 0)'], a: 3, exp: 'Están en la punta de la pirámide: son lo más rápido y escaso que existe.' },
  { q: '¿Qué significa que la memoria ROM sea "no volátil"?', opts: ['Que puede explotar', 'Que no pierde su contenido al quitar la alimentación eléctrica', 'Que es líquida', 'Que vuela muy rápido'], a: 1, exp: 'Es ideal para guardar el BIOS o el firmware de control.' }
];

const CACHE_SIZE = 4;
const MEMORY_ADDRESSES = ['0x1A', '0x2B', '0x3C', '0x4D', '0x5E', '0x6F', '0x7A', '0x8B', '0x9C', '0xAD'];
const ACCESS_TIMES = { cache: 2, ram: 80, disk: 5000000 };

const CacheSimulator = () => {
  const [cache, setCache] = useState([]); // [{addr, data, useOrder}]
  const [log, setLog] = useState([]);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [useOrder, setUseOrder] = useState(0);
  const [lastAccess, setLastAccess] = useState(null);

  const requestData = useCallback(() => {
    const addr = MEMORY_ADDRESSES[Math.floor(Math.random() * MEMORY_ADDRESSES.length)];
    const hitIndex = cache.findIndex(c => c.addr === addr);

    if (hitIndex !== -1) {
      // Cache HIT
      const newOrder = useOrder + 1;
      const newCache = cache.map((c, i) =>
        i === hitIndex ? { ...c, useOrder: newOrder } : c
      );
      setCache(newCache);
      setUseOrder(newOrder);
      setHits(h => h + 1);
      setLastAccess({ addr, type: 'HIT', time: ACCESS_TIMES.cache });
      setLog(l => [{ addr, type: 'HIT', time: ACCESS_TIMES.cache, id: Date.now() }, ...l].slice(0, 6));
    } else {
      // Cache MISS — cargar desde RAM
      const newOrder = useOrder + 1;
      let newCache = [...cache];
      let evicted = null;

      if (newCache.length < CACHE_SIZE) {
        newCache.push({ addr, data: `Dato@${addr}`, useOrder: newOrder });
      } else {
        // LRU: evict the one with lowest useOrder
        const lruIdx = newCache.reduce((minI, c, i) => c.useOrder < newCache[minI].useOrder ? i : minI, 0);
        evicted = newCache[lruIdx].addr;
        newCache[lruIdx] = { addr, data: `Dato@${addr}`, useOrder: newOrder };
      }

      setCache(newCache);
      setUseOrder(newOrder);
      setMisses(m => m + 1);
      setLastAccess({ addr, type: 'MISS', time: ACCESS_TIMES.ram, evicted });
      setLog(l => [{ addr, type: 'MISS', time: ACCESS_TIMES.ram, evicted, id: Date.now() }, ...l].slice(0, 6));
    }
  }, [cache, useOrder]);

  const reset = () => {
    setCache([]);
    setLog([]);
    setHits(0);
    setMisses(0);
    setUseOrder(0);
    setLastAccess(null);
  };

  const total = hits + misses;
  const hitRate = total > 0 ? ((hits / total) * 100).toFixed(0) : 0;

  return (
    <div style={{ background: '#111', padding: '4rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)', marginBottom: '6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Cpu color="#ec4899" size={42} style={{ margin: '0 auto 1rem' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Simulador de Caché (LRU)</h2>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
          Presiona <strong style={{ color: '#ec4899' }}>Solicitar Dato</strong> para que la CPU pida una dirección de memoria aleatoria. La caché tiene <strong style={{ color: '#a855f7' }}>{CACHE_SIZE} bloques</strong> usando política de reemplazo <strong style={{ color: '#a855f7' }}>LRU</strong>.
        </p>
      </div>

      {/* Estado actual */}
      {lastAccess && (
        <motion.div
          key={lastAccess.addr + lastAccess.type + hits + misses}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: lastAccess.type === 'HIT' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: `2px solid ${lastAccess.type === 'HIT' ? '#22c55e' : '#ef4444'}`,
            borderRadius: '20px', padding: '1.5rem 2rem', marginBottom: '2rem', textAlign: 'center'
          }}
        >
          <span style={{ fontSize: '1.4rem', fontWeight: 900, color: lastAccess.type === 'HIT' ? '#22c55e' : '#ef4444' }}>
            {lastAccess.type === 'HIT' ? '✓ CACHE HIT' : '✗ CACHE MISS'}
          </span>
          <span style={{ color: '#94a3b8', marginLeft: '1.5rem' }}>
            Dirección: <strong style={{ color: '#fff' }}>{lastAccess.addr}</strong>
            {' — '}Tiempo de acceso: <strong style={{ color: lastAccess.type === 'HIT' ? '#22c55e' : '#f59e0b' }}>{lastAccess.time} ns</strong>
            {lastAccess.evicted && <span style={{ color: '#64748b' }}> — Desalojado: <strong>{lastAccess.evicted}</strong></span>}
          </span>
        </motion.div>
      )}

      {/* Caché slots + Log */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
        {/* Slots de caché */}
        <div>
          <h3 style={{ fontWeight: 800, marginBottom: '1rem', color: '#a855f7', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Bloques en Caché</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {Array.from({ length: CACHE_SIZE }).map((_, i) => {
              const slot = cache[i];
              const isLRU = slot && cache.length === CACHE_SIZE &&
                slot.useOrder === Math.min(...cache.map(c => c.useOrder));
              return (
                <div key={i} style={{
                  padding: '1rem 1.5rem',
                  background: slot ? '#1e293b' : '#0f172a',
                  borderRadius: '15px',
                  border: `1.5px solid ${slot ? (isLRU ? '#f59e0b50' : '#a855f730') : 'rgba(255,255,255,0.04)'}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 700 }}>Bloque {i}</span>
                  {slot ? (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, color: '#ec4899' }}>{slot.addr}</span>
                      {isLRU && cache.length === CACHE_SIZE && (
                        <span style={{ fontSize: '0.65rem', color: '#f59e0b', background: '#f59e0b20', padding: '2px 8px', borderRadius: '8px', fontWeight: 800 }}>LRU</span>
                      )}
                    </div>
                  ) : (
                    <span style={{ color: '#334155', fontSize: '0.8rem' }}>vacío</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Log de accesos */}
        <div>
          <h3 style={{ fontWeight: 800, marginBottom: '1rem', color: '#a855f7', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Historial de Accesos</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {log.length === 0 ? (
              <p style={{ color: '#334155', fontSize: '0.9rem', padding: '1rem' }}>Sin accesos aún. Presiona el botón.</p>
            ) : log.map((entry, i) => (
              <div key={entry.id} style={{
                padding: '0.8rem 1.2rem',
                background: '#0f172a',
                borderRadius: '12px',
                borderLeft: `4px solid ${entry.type === 'HIT' ? '#22c55e' : '#ef4444'}`,
                display: 'flex', justifyContent: 'space-between',
                opacity: 1 - i * 0.12
              }}>
                <span style={{ fontWeight: 700, color: entry.type === 'HIT' ? '#22c55e' : '#ef4444', fontSize: '0.8rem' }}>
                  {entry.type}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{entry.addr}</span>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{entry.time} ns</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Hits', value: hits, color: '#22c55e' },
          { label: 'Misses', value: misses, color: '#ef4444' },
          { label: 'Hit Rate', value: `${hitRate}%`, color: '#a855f7' }
        ].map(s => (
          <div key={s.label} style={{ background: '#1e293b', borderRadius: '20px', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Comparativa de tiempos */}
      <div style={{ background: '#0f172a', borderRadius: '20px', padding: '1.5rem 2rem', marginBottom: '2.5rem' }}>
        <h4 style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: '#64748b', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>Comparativa de Velocidad</h4>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Caché L1', time: '~2 ns', color: '#ec4899', bar: 100 },
            { label: 'RAM (DDR)', time: '~80 ns', color: '#a855f7', bar: 40 },
            { label: 'SSD NVMe', time: '~100 µs', color: '#6366f1', bar: 15 },
            { label: 'HDD', time: '~10 ms', color: '#334155', bar: 5 }
          ].map(m => (
            <div key={m.label} style={{ flex: '1', minWidth: '120px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>{m.label}</span>
                <span style={{ fontSize: '0.75rem', color: m.color, fontWeight: 800 }}>{m.time}</span>
              </div>
              <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${m.bar}%`, background: m.color, borderRadius: '4px', transition: '0.3s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botones */}
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <button
          onClick={requestData}
          style={{ background: 'linear-gradient(to right, #a855f7, #ec4899)', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '20px', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <PlayCircle size={20} /> Solicitar Dato
        </button>
        <button
          onClick={reset}
          style={{ background: '#1e293b', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)', padding: '1rem 2rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <RefreshCw size={16} /> Reiniciar
        </button>
      </div>
    </div>
  );
};

const Memoria = () => {
  return (
    <LockedContent keyword="jerarquia" title="Clase 4: Jerarquía y Gestión de Memoria" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Jerarquía de Memoria
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde los registros hasta la nube. Entiende cómo el sistema organiza los datos para velocidad máxima y capacidad infinita.
            </p>
          </motion.div>
        </header>

        {/* Pirámide de Jerarquía */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#1e293b', padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)', boxShadow: '0 30px 60px rgba(168,85,247,0.1)' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2rem', color: '#a855f7' }}>Orden de Magnitud</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { level: 'L0: Registros', speed: 'Rápido (<1ns)', cap: 'Bytes', color: '#ec4899' },
                  { level: 'L1: Caché L1', speed: '1-5ns', cap: 'KB', color: '#d946ef' },
                  { level: 'L2: Caché L2/L3', speed: '10-50ns', cap: 'MB', color: '#a855f7' },
                  { level: 'L3: RAM (DDR)', speed: '100ns', cap: 'GB', color: '#8b5cf6' },
                  { level: 'L4: SSD / Disco', speed: 'ms', cap: 'TB', color: '#6366f1' },
                  { level: 'L5: Remoto / Cinta', speed: 'Seg/Min', cap: 'PB', color: '#4f46e5' }
                ].map((l, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, x: 10 }}
                    style={{
                      padding: '1.25rem',
                      background: '#0f172a',
                      borderRadius: '15px',
                      borderLeft: `6px solid ${l.color}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0, fontWeight: 800 }}>{l.level}</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Capacidad: {l.cap}</p>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: l.color }}>{l.speed}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img
                src="/assets/memory_hierarchy_pyramid_1775235453344.png"
                alt="Memory Pyramid"
                style={{ width: '100%', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
              />
              <div style={{ marginTop: '2rem', background: '#0f172a', padding: '1.5rem', borderRadius: '25px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div>
                   <p style={{ color: '#ec4899', margin: 0, fontWeight: 900 }}>↑ VELOCIDAD</p>
                   <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Más cerca del núcleo</p>
                </div>
                <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />
                <div>
                   <p style={{ color: '#4f46e5', margin: 0, fontWeight: 900 }}>↓ CAPACIDAD</p>
                   <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Más espacio / Barato</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conceptos Ampliados */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 900 }}>Gestión de la Memoria</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
             {[
               { Icon: Zap, color: '#ec4899', title: 'Acceso Aleatorio (RAM)', desc: 'Permite leer cualquier dirección de memoria en el mismo tiempo exacto. Es vital para que la ejecución de programas no dependa de la ubicación física del dato.' },
               { Icon: ShieldCheck, color: '#a855f7', title: 'Memoria No Volátil (ROM)', desc: 'Chips como el EEPROM o Flash que no necesitan electricidad para mantener los datos. Guardan el BIOS/UEFI, el firmware y el arranque.' },
               { Icon: BarChart, color: '#8b5cf6', title: 'Memoria Virtual', desc: 'El Sistema Operativo engaña a las aplicaciones haciéndoles creer que hay más RAM de la real, usando el disco como extensión (Swap/Paginación).' },
               { Icon: Server, color: '#6366f1', title: 'Caché Intermedio', desc: 'SRAM ultra rápida que anticipa los datos que el CPU pedirá a continuación, basándose en la localidad espacial y temporal de las instrucciones.' }
             ].map((item, i) => (
               <div key={i} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <item.Icon size={32} color={item.color} style={{ marginBottom: '1.25rem' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                  <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Simulador de Caché */}
        <CacheSimulator />

        <RepasoClave
          accentColor="#a855f7"
          title="Jerarquía de Memoria"
          facts={[
            { icon: '🏆', term: 'Jerarquía L0→L5', def: 'Registros (<1ns) → Caché L1/L2/L3 (1-50ns) → RAM DDR (100ns) → SSD (µs) → HDD (ms) → Nube. Velocidad vs capacidad.' },
            { icon: '⚡', term: 'Caché (SRAM)', def: 'Static RAM: más rápida (~2-5ns), cara, no necesita refresco. Anticipa pedidos del CPU por localidad espacial y temporal.' },
            { icon: '🔄', term: 'RAM (DRAM)', def: 'Dynamic RAM: volátil, necesita refresco eléctrico constante (~100ns). Almacena todos los procesos activos del sistema.' },
            { icon: '🔒', term: 'ROM / Flash / EEPROM', def: 'No volátil. Conserva datos sin energía eléctrica. Usada para BIOS/UEFI, pendrives, SSDs. Puede regrabarse eléctricamente.' },
            { icon: '💻', term: 'Memoria Virtual + Swap', def: 'El SO usa espacio de disco como extensión de la RAM. El intercambio (swapping) es ~1000× más lento que la RAM real.' },
            { icon: '🔁', term: 'Política LRU', def: 'Least Recently Used: el bloque de caché menos accedido recientemente es el primero en ser reemplazado cuando la caché está llena.' },
          ]}
        />

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #a855f7', boxShadow: '0 30px 60px rgba(168,85,247,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Database size={52} color="#a855f7" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Jerarquías</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>Valida tu conocimiento sobre gestión de memoria con esta evaluación de 20 preguntas.</p>
          </div>
          <QuizBlock
            questions={MEM_QUESTS}
            accentColor="#a855f7"
            clase="Clase 4: Gestión de Memoria"
            unidad="Unidad 1"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default Memoria;
