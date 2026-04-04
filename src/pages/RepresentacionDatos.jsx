import { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import { Binary, FileJson, Music, Video, Calculator } from 'lucide-react';

const QUESTIONS = [
  { q: '¿Cuál es la base del sistema binario?', opts: ['Base 10', 'Base 2 (0 y 1)', 'Base 16', 'Base 8'], a: 1, exp: 'Los circuitos digitales solo entienden dos estados: encendido (1) y apagado (0). Todo lo demás se construye sobre esta base.' },
  { q: '¿Cuántos bits hay en un Byte?', opts: ['4 bits', '16 bits', '8 bits', '1024 bits'], a: 2, exp: '8 bits forman un Byte, la unidad mínima de almacenamiento direccionable en la mayoría de arquitecturas.' },
  { q: 'Para convertir el número decimal 10 a binario usando divisiones sucesivas, el resultado es:', opts: ['1100', '1010', '0101', '1001'], a: 1, exp: '10÷2=5 r0, 5÷2=2 r1, 2÷2=1 r0, 1÷2=0 r1. Los restos de abajo hacia arriba: 1010.' },
  { q: 'El binario "1101" en decimal usando suma de potencias es:', opts: ['15', '14', '13', '11'], a: 2, exp: '1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13.' },
  { q: 'En el sistema hexadecimal, la letra "F" representa:', opts: ['10', '14', '15', '16'], a: 2, exp: 'Hex va de 0-9 y luego A(10), B(11), C(12), D(13), E(14), F(15). Un dígito hex representa 4 bits exactos.' },
  { q: '¿Qué es el código ASCII?', opts: ['Un lenguaje de programación', 'Un estándar que representa caracteres de texto como números (0-127)', 'Un tipo de procesador', 'Un sistema de compresión'], a: 1, exp: 'ASCII (1963) asigna números a letras: la "A" es 65, la "a" es 97. UTF-8 extiende esto a todos los idiomas del mundo.' },
  { q: '¿Cuántos colores puede representar una imagen con 8 bits por canal RGB?', opts: ['256', '65536', '16.777.216', '4.294.967.296'], a: 2, exp: '3 canales × 8 bits = 24 bits = 2²⁴ = 16.777.216 colores. Por eso se llama "color de 24 bits" o "True Color".' },
  { q: '¿Qué tamaño tiene 1 KiB (Kibibyte)?', opts: ['1000 bytes exactos', '1024 bytes', '512 bytes', '2048 bytes'], a: 1, exp: 'En informática, los prefijos binarios usan potencias de 2: 1 KiB = 2¹⁰ = 1024 bytes. Los fabricantes de discos usan 1 KB = 1000 bytes.' },
  { q: 'El sistema "Complemento a 2" se utiliza principalmente en las CPUs para:', opts: ['Comprimir datos', 'Representar y operar con números enteros negativos', 'Acelerar el bus de datos', 'Corregir errores de transmisión'], a: 1, exp: 'Permite que la resta se realice utilizando el mismo circuito suma de la ALU.' },
  { q: '¿Cuántos bits tiene un "Nibble"?', opts: ['1 bit', '4 bits', '8 bits', '2 bits'], a: 1, exp: 'Un nibble es medio byte. Equivale a un dígito hexadecimal (0-F).' },
  { q: 'El desbordamiento (Overflow) ocurre cuando:', opts: ['Se llena el disco rígido', 'El resultado de una operación excede la capacidad de bits del registro', 'La CPU sobrepasa los 100 grados', 'Hay demasiados archivos en una carpeta'], a: 1, exp: 'Si intentamos guardar 256 en un registro de 8 bits (máx 255), el bit extra se pierde o activa el flag de overflow.' },
  { q: '¿Qué estándar define el formato de los números de punto flotante (decimales) en computación?', opts: ['ASCII', 'ISO 9001', 'IEEE 754', 'Unicode'], a: 2, exp: 'Define cómo representar mantisa y exponente para manejar números muy grandes o muy pequeños.' },
  { q: 'El sistema BCD (Binary Coded Decimal) consiste en:', opts: ['Codificar cada dígito decimal independientemente en 4 bits', 'Sumar todos los bits de un número', 'Un sistema de 10 bits', 'Cifrar datos'], a: 0, exp: 'Facilita la visualización en pantallas digitales simples de 7 segmentos.' },
  { q: '¿Cuál es la función de un bit de paridad?', opts: ['Aumentar la velocidad', 'Detección de errores simples en la transmisión de datos', 'Cifrar passwords', 'Guardar el signo'], a: 1, exp: 'Indica si el número de bits encendidos es par o impar para detectar si un bit cambió accidentalmente.' },
  { q: '¿Qué significa que un número sea "Unsigned" (sin signo) en programación?', opts: ['Que es negativo', 'Que solo puede representar valores positivos o cero', 'Que no tiene valor', 'Que es una constante'], a: 1, exp: 'Un entero sin signo de 8 bits va de 0 a 255, mientras que uno con signo va de -128 a 127.' },
  { q: 'El término MSB (Most Significant Bit) se refiere al bit:', opts: ['Más a la derecha', 'De mayor valor posicional (más a la izquierda)', 'Que indica error', 'El que se borra primero'], a: 1, exp: 'En 1000, el 1 es el bit más significativo.' },
  { q: '¿Cuántas combinaciones únicas se pueden lograr con 10 bits?', opts: ['10', '100', '1000', '1024'], a: 3, exp: '2^10 = 1024.' },
  { q: '¿Por qué se usa el sistema Hexadecimal como taquigrafía del binario?', opts: ['Porque es más rápido para la CPU', 'Porque un dígito Hex representa exactamente 4 bits', 'Porque tiene letras', 'Porque es más antiguo'], a: 1, exp: 'Permite leer largos strings binarios de forma más humana (ej: 11111111 = FF).' },
  { q: '¿Cuál es el equivalente hexadecimal de 255 decimal?', opts: ['EF', 'FF', 'AA', '00'], a: 1, exp: '255 = 1111 1111 en binario, que son dos F en hexadecimal.' },
  { q: 'En el procesamiento de audio, la "Frecuencia de Muestreo" indica:', opts: ['El volumen del sonido', 'Cuántas veces por segundo se mide la amplitud de la onda sonora para digitalizarla', 'El peso del archivo mp3', 'La duración de la canción'], a: 1, exp: '44.1 kHz significa que se toman 44.100 muestras por segundo (estándar CD).' }
];

const CHAR_EXAMPLES = [
  { c: 'A', label: 'Mayúscula' }, { c: 'a', label: 'Minúscula' },
  { c: '0', label: 'Dígito' }, { c: ' ', label: 'Espacio' },
  { c: '!', label: 'Símbolo' }, { c: 'ñ', label: 'Unicode' },
];

const AsciiSimulator = () => {
  const [char, setChar] = useState('A');
  const code = char.length > 0 ? char.codePointAt(0) : 65;
  const isAscii = code <= 127;
  const binary8 = code.toString(2).padStart(isAscii ? 8 : 16, '0');
  const hex = code.toString(16).toUpperCase().padStart(2, '0');
  const utf8bytes = isAscii ? 1 : code <= 0x7FF ? 2 : 3;

  return (
    <div style={{ background: '#0f172a', padding: '3rem', borderRadius: '40px' }}>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {CHAR_EXAMPLES.map(ex => (
          <button key={ex.c} onClick={() => setChar(ex.c)} style={{
            padding: '0.6rem 1.2rem', borderRadius: '12px', border: '2px solid',
            borderColor: char === ex.c ? '#10b981' : '#1e293b',
            background: char === ex.c ? '#10b98120' : '#1e293b',
            color: char === ex.c ? '#10b981' : '#94a3b8', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem'
          }}>{ex.c === ' ' ? '[ espacio ]' : ex.c} <span style={{ color: '#475569', fontSize: '0.75rem' }}>({ex.label})</span></button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: '#1e293b', padding: '1rem 2rem', borderRadius: '20px' }}>
          <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700 }}>Escribí un carácter:</span>
          <input maxLength={2} value={char} onChange={e => { const v = e.target.value; if (v) setChar(v.slice(-1)); }}
            style={{ width: '80px', background: '#0f172a', border: '2px solid #10b981', borderRadius: '12px', padding: '0.75rem', color: '#10b981', fontSize: '2rem', fontWeight: 900, textAlign: 'center', fontFamily: 'monospace', outline: 'none' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Código Unicode/ASCII', value: code, color: '#10b981', note: isAscii ? 'Rango ASCII (0-127)' : 'Extendido Unicode' },
          { label: 'Binario', value: binary8, color: '#3b82f6', note: `${binary8.length} bits` },
          { label: 'Hexadecimal', value: `0x${hex}`, color: '#8b5cf6', note: `${hex.length} dígitos hex` },
          { label: 'Bytes en UTF-8', value: utf8bytes, color: '#f59e0b', note: isAscii ? 'Compatible ASCII' : 'Multi-byte Unicode' },
        ].map((d, i) => (
          <div key={i} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '20px', textAlign: 'center', border: `2px solid ${d.color}30` }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{d.label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 900, color: d.color, wordBreak: 'break-all' }}>{d.value}</div>
            <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.4rem' }}>{d.note}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#1e293b', padding: '1.5rem 2rem', borderRadius: '20px', borderLeft: `4px solid ${isAscii ? '#10b981' : '#a855f7'}` }}>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
          {isAscii
            ? <><strong style={{ color: '#10b981' }}>ASCII (1963):</strong> Estándar de 7 bits (128 caracteres). Diseñado para inglés. El código {code} representa la '{char}'. Cada PC del planeta lo entiende igual.</>
            : <><strong style={{ color: '#a855f7' }}>Unicode / UTF-8 (1991):</strong> Codifica más de 1.1 millón de caracteres de todos los idiomas. El carácter '{char}' usa código U+{hex} y ocupa {utf8bytes} bytes en UTF-8. Retrocompatible con ASCII para los primeros 127 valores.</>
          }
        </p>
      </div>
    </div>
  );
};

const RepresentacionDatos = () => {
  const [num, setNum] = useState(42);

  const getDivisions = (n) => {
    let steps = []; let current = Math.abs(Math.floor(n));
    if (current === 0) return [{ n: 0, q: 0, r: 0 }];
    while (current > 0) { steps.push({ n: current, q: Math.floor(current / 2), r: current % 2 }); current = Math.floor(current / 2); }
    return steps;
  };

  const divisions = getDivisions(num);

  return (
    <LockedContent keyword="binario" title="Clase 8: Representación de la Información" unit={3}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Representación de Datos
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Todo lo digital son números binarios. Aprende a convertir entre bases y a entender cómo el hardware interpreta texto, sonido e imágenes.
            </p>
          </motion.div>
        </header>

        {/* Teoría Ampliada: Sistemas de Numeración */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem', fontWeight: 900 }}>Sistemas de Numeración e Información</h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 4rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Los sistemas de numeración posicionales asignan un valor diferente a cada dígito según su <strong style={{ color: '#10b981' }}>posición</strong>. Entender esto es la clave para comprender cómo se organizan los datos en la memoria.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { base: 'Decimal', b: 10, digits: '0-9', color: '#10b981', use: 'Uso humano cotidiano. Surgió por los 10 dedos de las manos.' },
              { base: 'Binario', b: 2, digits: '0, 1', color: '#3b82f6', use: 'El lenguaje nativo del hardware digital: señales eléctricas encendidas o apagadas.' },
              { base: 'Hexadecimal', b: 16, digits: '0-9, A-F', color: '#8b5cf6', use: 'Compacta los binarios: 1 hex = 4 bits (un nibble). Usado en colores Web y direcciones IP.' },
              { base: 'Octal', b: 8, digits: '0-7', color: '#f59e0b', use: 'Históricamente usado en UNIX para permisos y por simplicidad con palabras de 8 bits.' }
            ].map((s, i) => (
              <div key={i} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '30px', border: `1.5px solid ${s.color}30` }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: s.color, marginBottom: '0.75rem', letterSpacing: '2px' }}>BASE {s.b}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{s.base}</h3>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Símbolos: {s.digits}</div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>{s.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Simulador: Conversor Multi-Base */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ background: '#111', padding: '4rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Calculator color="#10b981" size={42} style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Conversor de Bases Numéricas</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '640px', margin: '1rem auto 0' }}>
                Ingresá un número decimal y observá su representación simultánea en <strong style={{ color: '#3b82f6' }}>Binario</strong>, <strong style={{ color: '#8b5cf6' }}>Hexadecimal</strong> y <strong style={{ color: '#f59e0b' }}>Octal</strong>.
              </p>
            </div>

            <div style={{ maxWidth: '400px', margin: '0 auto 3rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.75rem', color: '#64748b', fontWeight: 800 }}>DECIMAL (0-255):</label>
              <input type="number" min="0" max="255" value={num} onChange={e => setNum(Math.min(255, Math.max(0, parseInt(e.target.value) || 0)))} style={{ width: '100%', background: '#0f172a', border: '2px solid #10b981', borderRadius: '15px', padding: '1.25rem', color: '#fff', fontSize: '2rem', fontWeight: 900, textAlign: 'center', boxSizing: 'border-box' }} />
            </div>

            {/* Resultados en las 4 bases */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { label: 'Decimal', base: 10, value: num.toString(), color: '#10b981', prefix: '' },
                { label: 'Binario', base: 2, value: num.toString(2).padStart(8, '0'), color: '#3b82f6', prefix: '0b' },
                { label: 'Hexadecimal', base: 16, value: num.toString(16).toUpperCase().padStart(2, '0'), color: '#8b5cf6', prefix: '0x' },
                { label: 'Octal', base: 8, value: num.toString(8), color: '#f59e0b', prefix: '0o' },
              ].map(b => (
                <div key={b.label} style={{ background: '#1e293b', borderRadius: '25px', padding: '2rem', textAlign: 'center', border: `2px solid ${b.color}30` }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Base {b.base} — {b.label}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.6rem', fontWeight: 900, color: b.color, wordBreak: 'break-all' }}>
                    <span style={{ opacity: 0.4, fontSize: '1rem' }}>{b.prefix}</span>{b.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Divisiones sucesivas → Binario */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#3b82f6' }}>
                Método: Divisiones Sucesivas (Decimal → Binario)
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Dividir por 2 repetidamente. Los <strong style={{ color: '#3b82f6' }}>restos leídos de abajo hacia arriba</strong> forman el número binario.
              </p>
              <div style={{ display: 'flex', overflowX: 'auto', gap: '0.75rem', paddingBottom: '0.5rem' }}>
                {divisions.map((step, i) => (
                  <div key={i} style={{ minWidth: '110px', background: '#1e293b', padding: '1.25rem', borderRadius: '18px', textAlign: 'center', flexShrink: 0, borderBottom: `3px solid ${i === divisions.length - 1 ? '#3b82f6' : '#1e293b'}` }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{step.n} ÷ 2</div>
                    <div style={{ height: '2px', background: '#3b82f6', margin: '0.6rem 0', opacity: 0.2 }} />
                    <div style={{ color: '#3b82f6', fontWeight: 900, fontSize: '1.1rem' }}>R: {step.r}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1rem', padding: '1rem 1.5rem', background: '#0f172a', borderRadius: '15px', display: 'inline-flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Restos (↑ abajo→arriba):</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 900, color: '#3b82f6', fontSize: '1.2rem', letterSpacing: '4px' }}>
                  {num.toString(2).padStart(8, '0')}
                </span>
              </div>
            </div>

            {/* Descomposición posicional Binario → Decimal */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#10b981' }}>
                Método: Suma de Potencias (Binario → Decimal)
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                {num.toString(2).padStart(8, '0').split('').map((bit, i, arr) => {
                  const pos = arr.length - 1 - i;
                  const val = parseInt(bit) * Math.pow(2, pos);
                  return (
                    <div key={i} style={{
                      textAlign: 'center',
                      minWidth: '56px',
                      opacity: bit === '1' ? 1 : 0.3
                    }}>
                      <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '4px' }}>2^{pos}</div>
                      <div style={{
                        background: bit === '1' ? '#10b98120' : '#1e293b',
                        border: `2px solid ${bit === '1' ? '#10b981' : '#334155'}`,
                        borderRadius: '12px', padding: '0.6rem 0.5rem',
                        fontSize: '1.2rem', fontWeight: 900,
                        color: bit === '1' ? '#10b981' : '#475569'
                      }}>{bit}</div>
                      <div style={{ fontSize: '0.7rem', color: bit === '1' ? '#10b981' : '#334155', marginTop: '4px', fontWeight: 700 }}>
                        {bit === '1' ? `+${val}` : '—'}
                      </div>
                    </div>
                  );
                })}
                <div style={{ fontSize: '1.5rem', color: '#64748b', margin: '0 0.5rem', alignSelf: 'center' }}>=</div>
                <div style={{ background: '#10b98120', border: '2px solid #10b981', borderRadius: '15px', padding: '0.75rem 1.25rem', fontSize: '1.4rem', fontWeight: 900, color: '#10b981', alignSelf: 'center' }}>
                  {num}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teoría Ampliada: Formatos Digitales */}
        <section style={{ marginBottom: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
           <div style={{ background: '#1e293b', padding: '3.5rem', borderRadius: '45px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <FileJson size={32} color="#3b82f6" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.2rem' }}>Codificación de Texto</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>
                De <strong>ASCII</strong> (7 bits) a <strong>Unicode/UTF-8</strong>. Los caracteres son mapeados a números. La "A" es el 65, pero Unicode permite representar todo, desde caracteres árabes hasta emojis mediante extensiones de multibyte.
              </p>
           </div>
           <div style={{ background: '#1e293b', padding: '3.5rem', borderRadius: '45px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Music size={32} color="#10b981" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.2rem' }}>Digitalización de Sonido</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>
                Se basa en el <strong>muestreo (Sampling)</strong>. Se mide la intensidad de la onda miles de veces por segundo. A mayor frecuencia de muestreo y bits por muestra, mayor fidelidad (calidad CD es 44.1kHz / 16bits).
              </p>
           </div>
           <div style={{ background: '#1e293b', padding: '3.5rem', borderRadius: '45px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Video size={32} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.2rem' }}>Imagen y Video</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>
                Usa el modelo <strong>RGB</strong>. Cada píxel es la mezcla de Rojo, Verde y Azul. Cada color usa 8 bits (256 niveles). El video es una secuencia de estas imágenes comprimidas para ahorrar ancho de banda.
              </p>
           </div>
        </section>

        {/* Conceptos Avanzados */}
        <section style={{ marginBottom: '6rem', background: 'linear-gradient(135deg, #0f172a, #1e293b)', padding: '5rem', borderRadius: '55px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '3.5rem', textAlign: 'center' }}>Domina la Información Digital</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            <div>
              <h4 style={{ color: '#3b82f6', fontWeight: 800, marginBottom: '1rem' }}>Compresión</h4>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7 }}>Reduce el tamaño redundante. Puede ser <strong>Lossless</strong> (sin pérdida como ZIP) o <strong>Lossy</strong> (con pérdida como JPG o MP3).</p>
            </div>
            <div>
              <h4 style={{ color: '#10b981', fontWeight: 800, marginBottom: '1rem' }}>Redundancia</h4>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7 }}>Datos repetidos que permiten la <strong>detección y corrección de errores</strong> mediante Checksums o bits de paridad adicionales.</p>
            </div>
            <div>
              <h4 style={{ color: '#ef4444', fontWeight: 800, marginBottom: '1rem' }}>Digitalización</h4>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7 }}>El proceso de convertir magnitudes físicas continuas (analógicas) en valores discretos (ceros y unos).</p>
            </div>
          </div>
        </section>

        {/* Simulador: ASCII / Unicode */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <FileJson size={40} color="#10b981" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Simulador: Codificación ASCII y Unicode</h2>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem', maxWidth: '700px', margin: '0.5rem auto 0' }}>
              Escribí cualquier carácter y descubrí cómo la computadora lo almacena en binario, su código ASCII/Unicode y cuántos bytes ocupa en UTF-8.
            </p>
          </div>
          <AsciiSimulator />
        </section>

        <RepasoClave
          accentColor="#10b981"
          title="Representación de Datos"
          facts={[
            { icon: '💾', term: 'Bit y Byte', def: '1 bit = 0 ó 1. 1 byte = 8 bits (256 combinaciones). 1 KiB = 1024 bytes. El byte es la unidad mínima de almacenamiento direccionable.' },
            { icon: '🔢', term: 'Binario (Base 2)', def: 'El lenguaje nativo del hardware. Conversión: divisiones sucesivas (decimal→bin) o suma de potencias de 2 (bin→decimal).' },
            { icon: '🔠', term: 'Hexadecimal (Base 16)', def: 'Taquigrafía del binario: 1 dígito hex = 4 bits exactos (nibble). 0-9 y A-F. 11111111 binario = FF hexadecimal = 255 decimal.' },
            { icon: '📝', term: 'ASCII y UTF-8', def: 'ASCII: 7 bits, 128 caracteres (A=65, a=97). UTF-8: Unicode extensible que soporta todos los idiomas y emojis del mundo.' },
            { icon: '➖', term: 'Complemento a 2', def: 'Representar negativos: invertir todos los bits y sumar 1. Permite usar el mismo circuito sumador de la ALU para restar.' },
            { icon: '🔬', term: 'IEEE 754', def: 'Estándar para punto flotante (decimales): signo (1 bit) + exponente + mantisa. Define precisión simple (32 bits) y doble (64 bits).' },
          ]}
        />

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #10b981', boxShadow: '0 30px 60px rgba(16,185,129,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Binary size={52} color="#10b981" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: Representación Digital</h2>
            <p style={{ color: '#64748b', marginTop: '1rem' }}>20 preguntas diseñadas para certificar tu dominio total de la información computacional.</p>
          </div>
          <QuizBlock
            questions={QUESTIONS}
            accentColor="#10b981"
            clase="Clase 8: Representación de Datos"
            unidad="Unidad 3"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default RepresentacionDatos;
