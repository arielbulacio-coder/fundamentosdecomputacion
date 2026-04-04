import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import { Layers, Zap, Cpu, Settings, Smartphone, ArrowRightCircle, CheckCircle, Info, RefreshCw } from 'lucide-react';

const QUESTIONS = [
  { q: '¿Qué es una compuerta lógica?', opts: ['Una puerta física', 'Un circuito que realiza una operación lógica sobre una o más entradas binarias', 'Un tipo de procesador', 'Un cable'], a: 1, exp: 'Es el bloque básico de construcción de toda la electrónica digital.' },
  { q: 'En una compuerta AND (Y), ¿cuándo es la salida 1?', opts: ['Si alguna entrada es 1', 'Solo si todas las entradas son 1', 'Si las entradas son 0', 'Nunca'], a: 1, exp: 'Representa la conjunción: A y B deben ser verdaderos.' },
  { q: 'En una compuerta OR (O), ¿cuándo es la salida 1?', opts: ['Solo si todas las entradas son 1', 'Si al menos una de las entradas es 1', 'Solo si las entradas son 0', 'Si las entradas son iguales'], a: 1, exp: 'Representa la disyunción: A o B (o ambos) deben ser verdaderos.' },
  { q: '¿Qué hace una compuerta NOT (NO)?', opts: ['Suma las corrientes', 'Invierte el estado de la entrada (0→1 y 1→0)', 'Multiplica por 2', 'Corta la energía'], a: 1, exp: 'Es un inversor lógico.' },
  { q: 'La compuerta XOR (O Exclusiva) da 1 cuando:', opts: ['Las entradas son iguales', 'Las entradas son diferentes entre sí', 'Ambas son 1', 'Ambas son 0'], a: 1, exp: 'Es una "o exclusiva": A o B, pero no ambos.' },
  { q: '¿Qué compuerta se obtiene al colocar un NOT después de un AND?', opts: ['OR', 'NAND', 'NOR', 'XNOR'], a: 1, exp: 'Not-AND = NAND. Es una compuerta universal.' },
  { q: '¿Cuál es la tabla de verdad de una compuerta NOR?', opts: ['Lo opuesto a la AND', 'Lo opuesto a la OR (solo da 1 cuando todas son 0)', 'Igual a la XOR', 'Solo da 1 cuando todas son 1'], a: 1, exp: 'Not-OR = NOR. Solo da 1 si ninguna entrada está encendida.' },
  { q: 'El Álgebra de Boole es la base matemática de:', opts: ['La música digital', 'La lógica de compuertas y el diseño de circuitos digitales', 'La geometría', 'El dibujo técnico'], a: 1, exp: 'Operaciones AND (*), OR (+) y NOT (\').' },
  { q: 'Una compuerta "Universal" es aquella que:', opts: ['Solo se vende en un país', 'Puede ser usada para construir cualquier otra compuerta lógica (NAND y NOR)', 'Es muy grande', 'No necesita energía'], a: 1, exp: 'NAND y NOR son arquitectónicamente suficientes para construir una CPU entera.' },
  { q: '¿Cuántas combinaciones tiene la tabla de verdad de 3 entradas?', opts: ['3', '6', '8', '9'], a: 2, exp: '2^n = 2³ = 8 combinaciones únicas.' },
  { q: '¿Qué es un Sumador Completo (Full Adder)?', opts: ['Una calculadora científica', 'Un circuito digital que suma 3 bits (incluyendo el acarreo)', 'Una compuerta NOT', 'Un cable'], a: 1, exp: 'Es la unidad básica de cálculo de la ALU.' },
  { q: '¿Para qué sirve un Multiplexor (MUX)?', opts: ['Para multiplicar números', 'Para seleccionar una de varias entradas y enviarla a una sola salida', 'Para enfriar el chip', 'Para guardar archivos'], a: 1, exp: 'Actúa como un conmutador de datos controlado digitalmente.' },
  { q: '¿Qué es un Flip-Flop en lógica digital?', opts: ['Un tipo de zapatillas', 'Un circuito con memoria que guarda 1 bit de información', 'Un error de software', 'Un bus de datos'], a: 1, exp: 'Son la base de los registros y memorias caché (SRAM).' },
  { q: 'El retardo de propagación (Propagation Delay) es:', opts: ['El tiempo que tarda un switch en prender', 'El tiempo que tarda la salida en cambiar tras un cambio en la entrada', 'El precio del chip', 'La vida útil del componente'], a: 1, exp: 'Es el límite físico de la velocidad de un procesador.' },
  { q: '¿Qué diseño permite minimizar funciones lógicas de forma visual?', opts: ['Mapa de Karnaugh', 'Diagrama de flujo', 'Gráfico de barras', 'Plano eléctrico'], a: 0, exp: 'Permite simplificar circuitos complejos reduciendo el número de compuertas.' },
  { q: 'La lógica Tristate (Tercer estado) añade el estado de:', opts: ['Color', 'Alta Impedancia (Circuito abierto)', 'Humo', 'Error'], a: 1, exp: 'Permite desconectar eléctricamente un bus para que varios componentes lo compartan.' },
  { q: 'En lógica negativa (Active Low), el "1" lógico se representa con:', opts: ['5 Volts', '0 Volts (GND)', '10 Volts', 'Nada'], a: 1, exp: 'Se usa mucho en señales de reset o habilitación (Chip Select).' },
  { q: '¿Cuál es la función del Decodificador (Decoder)?', opts: ['Cuidar la CPU', 'Convertir un número binario de n bits en una salida activa de entre 2^n', 'Traducir idiomas', 'Limpiar el disco'], a: 1, exp: 'Se usa para seleccionar celdas de memoria o registros.' },
  { q: 'Un circuito combinacional se diferencia de uno secuencial porque:', opts: ['Es más rápido', 'Su salida depende solo de las entradas actuales (sin memoria)', 'Usa más cables', 'Tiene reloj'], a: 1, exp: 'Los secuenciales tienen memoria; los combinacionales no.' },
  { q: '¿Qué significa la sigla VLSI?', opts: ['Very Low System Integration', 'Very Large Scale Integration', 'Variable Logical Speed Intel', 'Video Logic System Interface'], a: 1, exp: 'Tecnología para integrar millones de transistores en un solo chip.' }
];

const GATES = {
  AND: (a, b) => a && b,
  OR: (a, b) => a || b,
  NOT: (a) => !a,
  XOR: (a, b) => a !== b,
  NAND: (a, b) => !(a && b),
  NOR: (a, b) => !(a || b)
};

const POSTS = [
  { id: 1, cat: 'Tecnología', texto: '🤖 IA supera a humanos en diagnóstico médico', tags: ['tech', 'ia'] },
  { id: 2, cat: 'Política', texto: '🏛️ Debate sobre regulación de redes sociales', tags: ['politica'] },
  { id: 3, cat: 'Tecnología', texto: '💻 Nuevo procesador bate récord de velocidad', tags: ['tech'] },
  { id: 4, cat: 'Deporte', texto: '⚽ Argentina clasifica al mundial sub-20', tags: ['deporte'] },
  { id: 5, cat: 'Tecnología', texto: '🔒 Brecha de datos expone millones de usuarios', tags: ['tech', 'seguridad'] },
  { id: 6, cat: 'Entretenimiento', texto: '🎬 Estreno de película usa actores generados por IA', tags: ['ia', 'entretenimiento'] },
  { id: 7, cat: 'Deporte', texto: '🎾 Final del torneo de tenis más largo de la historia', tags: ['deporte'] },
  { id: 8, cat: 'Política', texto: '🌎 Cumbre climática: acuerdo histórico entre naciones', tags: ['politica', 'medioambiente'] },
  { id: 9, cat: 'Tecnología', texto: '📱 El nuevo celular con 100x zoom óptico', tags: ['tech'] },
  { id: 10, cat: 'Entretenimiento', texto: '🎵 Álbum generado por IA rompe récords en streaming', tags: ['ia', 'entretenimiento'] },
];

const COLORS = { Tecnología: '#3b82f6', Política: '#ef4444', Deporte: '#10b981', Entretenimiento: '#a855f7' };

const BurbujaFiltroSim = () => {
  const [filtroIA, setFiltroIA] = useState(false);
  const [filtroTech, setFiltroTech] = useState(false);
  const [operator, setOperator] = useState('OR');

  const visible = POSTS.filter(p => {
    if (!filtroIA && !filtroTech) return true;
    const matchIA = filtroIA && p.tags.includes('ia');
    const matchTech = filtroTech && p.tags.includes('tech');
    if (operator === 'AND') return matchIA && matchTech;
    return matchIA || matchTech;
  });

  const ocultos = POSTS.length - visible.length;

  return (
    <div style={{ background: '#0f172a', padding: '3rem', borderRadius: '40px' }}>
      <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '25px', marginBottom: '2rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Configuración del Algoritmo (condiciones booleanas):</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {[{ id: 'ia', label: '🤖 Contiene IA', state: filtroIA, set: setFiltroIA }, { id: 'tech', label: '💻 Contiene Tecnología', state: filtroTech, set: setFiltroTech }].map(f => (
            <button key={f.id} onClick={() => f.set(!f.state)} style={{
              padding: '0.8rem 1.5rem', borderRadius: '15px', border: '2px solid', cursor: 'pointer', fontWeight: 800,
              borderColor: f.state ? '#f59e0b' : '#334155', background: f.state ? '#f59e0b20' : '#0f172a', color: f.state ? '#f59e0b' : '#64748b'
            }}>{f.state ? '☑' : '☐'} {f.label}</button>
          ))}
          <div style={{ display: 'flex', gap: '0.5rem', background: '#0f172a', padding: '0.4rem', borderRadius: '12px' }}>
            {['AND', 'OR'].map(op => (
              <button key={op} onClick={() => setOperator(op)} style={{
                padding: '0.6rem 1.2rem', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: '0.85rem',
                background: operator === op ? '#f59e0b' : 'transparent', color: operator === op ? '#000' : '#64748b'
              }}>{op}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {visible.map(p => (
          <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            style={{ background: '#1e293b', padding: '1rem 1.5rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: `4px solid ${COLORS[p.cat]}` }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: COLORS[p.cat], minWidth: '90px', textTransform: 'uppercase' }}>{p.cat}</span>
            <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{p.texto}</span>
          </motion.div>
        ))}
      </div>

      <div style={{ background: ocultos > 0 ? '#ef444420' : '#0f172a', border: `2px solid ${ocultos > 0 ? '#ef4444' : '#1e293b'}`, padding: '1.5rem', borderRadius: '20px' }}>
        <p style={{ margin: 0, color: ocultos > 0 ? '#ef4444' : '#475569', fontWeight: 800, fontSize: '1rem', textAlign: 'center' }}>
          {ocultos === 0
            ? '✅ Ves el 100% del contenido. Sin filtros activos.'
            : `⚠️ El algoritmo ocultó ${ocultos} publicaciones (${Math.round(ocultos/POSTS.length*100)}%). Solo ves ${visible.length}/${POSTS.length}. ¡Eso es una burbuja de filtro!`}
        </p>
      </div>
    </div>
  );
};

const LogicaDigital = () => {
  const [gateType, setGateType] = useState('AND');
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const output = gateType === 'NOT' ? GATES.NOT(inputA) : GATES[gateType](inputA, inputB);

  return (
    <LockedContent keyword="boole" title="Clase 9: Lógica y Circuitos Digitales" unit={3}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Lógica Digital
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Los bloques que construyen la inteligencia de las máquinas. Suma, resta y decide usando solo ceros y unos.
            </p>
          </motion.div>
        </header>

        {/* Simulador Interactivo de Compuertas */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ background: '#111', padding: '4rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
             
             <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <Zap color="#f59e0b" /> Laboratorio Lógico
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                   {Object.keys(GATES).map(g => (
                     <button key={g} onClick={() => setGateType(g)} style={{
                        padding: '1.2rem', borderRadius: '15px', border: '2px solid', fontWeight: 800, cursor: 'pointer', transition: '0.2s',
                        background: gateType === g ? '#f59e0b10' : '#1e293b50',
                        color: gateType === g ? '#f59e0b' : '#64748b',
                        borderColor: gateType === g ? '#f59e0b' : 'transparent'
                     }}>{g}</button>
                   ))}
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                   <button onClick={() => setInputA(!inputA)} style={{
                      flex: 1, padding: '1.5rem', borderRadius: '20px', border: 'none', fontWeight: 900, cursor: 'pointer',
                      background: inputA ? '#f59e0b' : '#1e293b',
                      color: inputA ? '#000' : '#fff'
                   }}>Interruptor A: {inputA ? '1' : '0'}</button>
                   
                   {gateType !== 'NOT' && (
                     <button onClick={() => setInputB(!inputB)} style={{
                        flex: 1, padding: '1.5rem', borderRadius: '20px', border: 'none', fontWeight: 900, cursor: 'pointer',
                        background: inputB ? '#f59e0b' : '#1e293b',
                        color: inputB ? '#000' : '#fff'
                     }}>Interruptor B: {inputB ? '1' : '0'}</button>
                   )}
                </div>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0f172a', borderRadius: '40px', padding: '3rem', position: 'relative', border: '1.5px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 800, letterSpacing: '4px', marginBottom: '2rem' }}>SALIDA DEL CIRCUITO</div>
                
                <AnimatePresence mode="wait">
                  <motion.div key={output} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} style={{
                    fontSize: '6rem', marginBottom: '1.5rem',
                    filter: output ? 'drop-shadow(0 0 40px #f59e0b90)' : 'none'
                  }}>
                    {output ? '💡' : '⚫'}
                  </motion.div>
                </AnimatePresence>

                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: output ? '#f59e0b' : '#334155' }}>
                  {output ? 'BIT 1' : 'BIT 0'}
                </div>
                <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>Estado: {output ? 'Conduciendo corriente' : 'Circuito abierto'}</p>
             </div>
          </div>
        </section>

        {/* Tablas de Verdad completas */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Layers size={40} color="#f59e0b" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Tablas de Verdad de las Compuertas</h2>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem', maxWidth: '750px', margin: '0.5rem auto 0' }}>
              Cada tabla muestra todas las combinaciones posibles de entrada y su resultado. Para n entradas hay 2<sup>n</sup> filas.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'AND (Y)', symbol: 'A · B', color: '#f59e0b', desc: 'Solo da 1 si TODAS las entradas son 1.', rows: [[0,0,0],[0,1,0],[1,0,0],[1,1,1]] },
              { name: 'OR (O)', symbol: 'A + B', color: '#3b82f6', desc: 'Da 1 si AL MENOS UNA entrada es 1.', rows: [[0,0,0],[0,1,1],[1,0,1],[1,1,1]] },
              { name: 'NOT (NO)', symbol: "A'", color: '#ef4444', desc: 'Invierte la entrada: 0→1 y 1→0.', rows: [[0,1],[1,0]], single: true },
              { name: 'XOR (O Excl.)', symbol: 'A ⊕ B', color: '#8b5cf6', desc: 'Da 1 solo si las entradas son DIFERENTES.', rows: [[0,0,0],[0,1,1],[1,0,1],[1,1,0]] },
              { name: 'NAND', symbol: '(A · B)\'', color: '#ec4899', desc: 'Inversa de AND. Compuerta UNIVERSAL.', rows: [[0,0,1],[0,1,1],[1,0,1],[1,1,0]] },
              { name: 'NOR', symbol: '(A + B)\'', color: '#10b981', desc: 'Inversa de OR. También UNIVERSAL.', rows: [[0,0,1],[0,1,0],[1,0,0],[1,1,0]] },
            ].map((gate, gi) => (
              <div key={gi} style={{ background: '#111', borderRadius: '25px', border: `2px solid ${gate.color}30`, overflow: 'hidden' }}>
                <div style={{ background: `${gate.color}15`, padding: '1.25rem 1.5rem', borderBottom: `1px solid ${gate.color}30` }}>
                  <h3 style={{ margin: 0, fontWeight: 900, color: gate.color, fontSize: '1.15rem' }}>{gate.name}</h3>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.25rem' }}>Expresión: <strong style={{ color: '#fff' }}>{gate.symbol}</strong></div>
                </div>
                <div style={{ padding: '1rem 1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', borderBottom: '1px solid #1e293b', letterSpacing: '1px' }}>A</th>
                        {!gate.single && <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', borderBottom: '1px solid #1e293b', letterSpacing: '1px' }}>B</th>}
                        <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, color: gate.color, borderBottom: '1px solid #1e293b', letterSpacing: '1px' }}>Salida</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gate.rows.map((row, ri) => (
                        <tr key={ri}>
                          <td style={{ padding: '0.4rem', textAlign: 'center', fontWeight: 700, color: row[0] ? '#f59e0b' : '#475569', fontFamily: 'monospace', fontSize: '1rem' }}>{row[0]}</td>
                          {!gate.single && <td style={{ padding: '0.4rem', textAlign: 'center', fontWeight: 700, color: row[1] ? '#f59e0b' : '#475569', fontFamily: 'monospace', fontSize: '1rem' }}>{row[1]}</td>}
                          <td style={{ padding: '0.4rem', textAlign: 'center', fontWeight: 900, fontSize: '1.1rem', color: row[gate.single ? 1 : 2] ? '#22c55e' : '#ef4444' }}>
                            {row[gate.single ? 1 : 2]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>{gate.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0f172a', border: '1.5px solid #f59e0b30', borderRadius: '20px', padding: '1.5rem 2rem', marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ margin: 0, color: '#f59e0b', fontWeight: 800, fontSize: '0.95rem' }}>
              💡 Dato clave: Con 2 entradas hay 2² = 4 filas posibles. Con 3 entradas serían 2³ = 8 filas. La fórmula general es 2<sup>n</sup> combinaciones.
            </p>
          </div>
        </section>

        {/* Teoría Ampliada: El mundo digital */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
           <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 900 }}>De la Lógica al Hardware</h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
              {[
                { Icon: Cpu, color: '#f59e0b', title: 'Álgebra de Boole', desc: 'La matemática del 0 y 1. Claude Shannon demostró en 1937 que los circuitos de relés podían realizar cualquier operación lógica compleja. Las 3 operaciones básicas son AND (conjunción, símbolo ·), OR (disyunción, símbolo +) y NOT (negación, símbolo \').' },
                { Icon: Layers, color: '#ef4444', title: 'Tablas de Verdad', desc: 'Mapean cada combinación posible de entradas con su salida única. Define el comportamiento exacto de un componente digital. Para n entradas, la tabla tendrá 2^n filas. Son la herramienta fundamental para diseñar y verificar circuitos.' },
                { Icon: Smartphone, color: '#3b82f6', title: 'Compuertas Universales', desc: 'Las NAND y NOR pueden simular a todas las demás. Usando solo NANDs se puede construir una CPU completa. Esto las hace fundamentales en el diseño de circuitos VLSI (Very Large Scale Integration).' },
                { Icon: Zap, color: '#22c55e', title: 'Sumador Completo (Full Adder)', desc: 'Un circuito que suma 3 bits: dos operandos (A, B) y un acarreo de entrada (Cin). Produce un bit de suma (S) y un acarreo de salida (Cout). Es el bloque elemental de la ALU (Unidad Aritmético Lógica) del procesador.' },
                { Icon: Settings, color: '#a855f7', title: 'Multiplexor (MUX)', desc: 'Selector digital que elige una de varias entradas para enviarla a una sola salida, controlado por líneas de selección. Un MUX de 4:1 usa 2 bits de selección para elegir entre 4 entradas de datos. Se usa en buses de datos y memoria.' },
                { Icon: Info, color: '#ec4899', title: 'Flip-Flop y Registros', desc: 'Un Flip-Flop es un circuito secuencial con memoria que guarda 1 bit. A diferencia de las compuertas combinacionales, su salida depende también del estado anterior. 8 Flip-Flops juntos forman un registro de 8 bits (1 byte). Son la base de las memorias SRAM (caché).' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.04)' }}>
                   <item.Icon size={32} color={item.color} style={{ marginBottom: '1.25rem' }} />
                   <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                   <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Teoría: Conceptos adicionales para la evaluación */}
        <section style={{ marginBottom: '6rem', background: '#0f172a', padding: '4rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(245,158,11,0.15)' }}>
          <h2 style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 900, color: '#f59e0b' }}>Conceptos Avanzados</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            {[
              { title: 'Mapa de Karnaugh', color: '#3b82f6', text: 'Herramienta visual para simplificar funciones lógicas. Se agrupan los 1s adyacentes en la cuadrícula para encontrar la expresión booleana mínima, reduciendo la cantidad de compuertas necesarias en un circuito.' },
              { title: 'Lógica Tristate', color: '#22c55e', text: 'Añade un tercer estado: "Alta Impedancia" (Z), que equivale a un circuito abierto. Permite que varios dispositivos compartan un mismo bus de datos, desconectándose eléctricamente cuando no transmiten.' },
              { title: 'Lógica Negativa (Active Low)', color: '#ef4444', text: 'En ciertos circuitos el "1 lógico" se representa con 0 Volts (GND). Se usa en señales de control como Reset, Chip Select y habilitación de memoria. Se indica con una barra sobre el nombre (e.g. CS̄).' },
              { title: 'Decodificador (Decoder)', color: '#a855f7', text: 'Convierte un código binario de n bits en una de 2^n salidas activas. Un decodificador de 3 a 8 toma 3 bits de entrada y activa exactamente 1 de 8 líneas. Se usa para seleccionar celdas de memoria o registros del CPU.' },
              { title: 'Circuito Combinacional vs Secuencial', color: '#ec4899', text: 'Un combinacional produce salida basada solo en las entradas actuales (sin memoria). Un secuencial tiene Flip-Flops que guardan estado y su salida depende también de la historia previa. Los contadores y registros son secuenciales.' },
              { title: 'Retardo de Propagación', color: '#f59e0b', text: 'Es el tiempo que tarda la salida de una compuerta en cambiar después de que cambia la entrada. Es el límite físico de velocidad del procesador. A mayor frecuencia de reloj, menor es el margen para este retardo.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#1e293b', padding: '2rem', borderRadius: '25px', borderLeft: `5px solid ${item.color}` }}>
                <h4 style={{ margin: '0 0 0.75rem', fontWeight: 800, color: item.color, fontSize: '1.1rem' }}>{item.title}</h4>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.9rem', margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '6rem' }}>
           <div style={{ background: '#111', padding: '4rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <img src="/assets/digital_logic_gates_neon_1775235547550.png" alt="Logic Gates Diagram" style={{ width: '100%', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
              <div>
                 <h2 style={{ fontSize: '2.3rem', fontWeight: 900, marginBottom: '2rem' }}>Jerarquía de Abstracción</h2>
                 <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                   La lógica digital es la capa intermedia. Por debajo está la <strong>electrónica física</strong> (transistores operando como switches) y por encima está la <strong>arquitectura</strong> (registros, ALU, caches). Todo lo que ves en pantalla hoy es resultado de billones de estas decisiones lógicas por segundo.
                 </p>
              </div>
           </div>
        </section>

        {/* Simulador: Burbuja de Filtro */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <ArrowRightCircle size={40} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Simulador: Burbuja de Filtro Algorítmica</h2>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem', maxWidth: '750px', margin: '0.5rem auto 0' }}>
              Las redes sociales usan condiciones booleanas (AND/OR) para decidir qué contenido mostrarte. Activá filtros y observá cómo el algoritmo limita tu visión del mundo.
            </p>
          </div>
          <BurbujaFiltroSim />
        </section>

        <RepasoClave
          accentColor="#f59e0b"
          title="Lógica Digital"
          facts={[
            { icon: '🚀', term: 'Álgebra de Boole', def: 'Base matemática de la computación. Operaciones: AND (*), OR (+), NOT (\').' },
            { icon: '🧱', term: 'AND y OR', def: 'Suma y multiplicación lógica. AND requiere todo activo; OR solo uno.' },
            { icon: '⚡', term: 'NOT e Inversión', def: 'Cambia 0 a 1 y viceversa. Esencia del control digital.' },
            { icon: '🗺️', term: 'Tabla de Verdad', def: 'Lista exhaustiva de todas las entradas posibles y sus salidas resultantes.' },
            { icon: '🛠️', term: 'NAND / NOR', def: 'Compuertas Universales. Fundamentales en el diseño de circuitos VLSI y memorias Flash.' },
            { icon: '💾', term: 'Sistemas con Memoria', def: 'La lógica secuencial (Flip-Flops) permite guardar estados y crear memorias digitales.' },
          ]}
        />

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #f59e0b', boxShadow: '0 30px 60px rgba(245,158,11,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Settings size={52} color="#f59e0b" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Lógica de Sistemas</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>Certifica tu dominio sobre compuertas y tablas de verdad con esta evaluación de 20 preguntas.</p>
          </div>
          <QuizBlock
            questions={QUESTIONS}
            accentColor="#f59e0b"
            clase="Clase 9: Lógica Digital"
            unidad="Unidad 3"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default LogicaDigital;
