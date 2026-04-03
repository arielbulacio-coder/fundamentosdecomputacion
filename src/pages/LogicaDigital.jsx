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

        {/* Teoría Ampliada: El mundo digital */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
           <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 900 }}>De la de Lógica al Hardware</h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
              {[
                { Icon: Cpu, color: '#f59e0b', title: 'Álgebra de Boole', desc: 'La matemática del 0 y 1. Claude Shannon demostró en 1937 que los circuitos de relés podían realizar cualquier operación lógica compleja.' },
                { Icon: Layers, color: '#ef4444', title: 'Tablas de Verdad', desc: 'Mapean cada combinación posible de entradas con su salida única. Define el comportamiento exacto de un componente digital.' },
                { Icon: Smartphone, color: '#3b82f6', title: 'Compuertas Universales', desc: 'Las NAND y NOR pueden simular a todas las demás. Usando solo NANDs se puede construir una CPU completa.' }
              ].map((item, i) => (
                <div key={i} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.04)' }}>
                   <item.Icon size={32} color={item.color} style={{ marginBottom: '1.25rem' }} />
                   <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                   <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <section style={{ marginBottom: '6rem' }}>
           <div style={{ background: '#111', padding: '4rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <img src="/assets/digital_logic_gates_neon_1775235547550.png" alt="Logic Gates Diagram" style={{ width: '100%', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
              <div>
                 <h2 style={{ fontSize: '2.3rem', fontWeight: 900, marginBottom: '2rem' }}>Jerarquía de Abstracción</h2>
                 <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                   La lógica digital es la capa intermedia. Por debajo está la <strong>electrónica física</strong> (transistores operando como switches) y por encima está la <strong>arquitectura</strong> (registros, ALU, caches). Todo lo que ves en pantalla hoy es resultado de billones de estas decisiones lógicas por segundo.
                 </p>
              </div>
           </div>
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
