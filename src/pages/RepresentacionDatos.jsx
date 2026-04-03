import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { Binary, Hash, FileJson, Music, Video, Calculator, Zap, ArrowDown } from 'lucide-react';

const QUESTIONS = [
  { q: '¿Cuál es la base del sistema binario?', opts: ['Base 10', 'Base 2 (0 y 1)', 'Base 16', 'Base 8'], a: 1, exp: 'Los circuitos digitales solo entienden dos estados: encendido (1) y apagado (0). Todo lo demás se construye sobre esta base.' },
  { q: '¿Cuántos bits hay en un Byte?', opts: ['4 bits', '16 bits', '8 bits', '1024 bits'], a: 2, exp: '8 bits forman un Byte, la unidad mínima de almacenamiento direccionable en la mayoría de arquitecturas.' },
  { q: 'Para convertir el número decimal 10 a binario usando divisiones sucesivas, el resultado es:', opts: ['1100', '1010', '0101', '1001'], a: 1, exp: '10÷2=5 r0, 5÷2=2 r1, 2÷2=1 r0, 1÷2=0 r1. Los restos de abajo hacia arriba: 1010.' },
  { q: 'El binario "1101" en decimal usando suma de potencias es:', opts: ['15', '14', '13', '11'], a: 2, exp: '1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13.' },
  { q: 'En el sistema hexadecimal, la letra "F" representa:', opts: ['10', '14', '15', '16'], a: 2, exp: 'Hex va de 0-9 y luego A(10), B(11), C(12), D(13), E(14), F(15). Un dígito hex representa 4 bits exactos.' },
  { q: '¿Qué es el código ASCII?', opts: ['Un lenguaje de programación', 'Un estándar que representa caracteres de texto como números (0-127)', 'Un tipo de procesador', 'Un sistema de compresión'], a: 1, exp: 'ASCII (1963) asigna números a letras: la "A" es 65, la "a" es 97. UTF-8 extiende esto a todos los idiomas del mundo.' },
  { q: '¿Cuántos colores puede representar una imagen con 8 bits por canal RGB?', opts: ['256', '65536', '16.777.216', '4.294.967.296'], a: 2, exp: '3 canales × 8 bits = 24 bits = 2²⁴ = 16.777.216 colores. Por eso se llama "color de 24 bits" o "True Color".' },
  { q: '¿Qué tamaño tiene 1 KiB (Kibibyte)?', opts: ['1000 bytes exactos', '1024 bytes', '512 bytes', '2048 bytes'], a: 1, exp: 'En informática, los prefijos binarios usan potencias de 2: 1 KiB = 2¹⁰ = 1024 bytes. Los fabricantes de discos usan 1 KB = 1000 bytes.' }
];

const RepresentacionDatos = () => {
  const [num, setNum] = useState(42);
  const [binaryStr, setBinaryStr] = useState("101010");

  const getDivisions = (n) => {
    let steps = []; let current = Math.abs(Math.floor(n));
    if (current === 0) return [{ n: 0, q: 0, r: 0 }];
    while (current > 0) { steps.push({ n: current, q: Math.floor(current / 2), r: current % 2 }); current = Math.floor(current / 2); }
    return steps;
  };

  const getBinarySum = (bin) => {
    let sum = 0; let components = [];
    const bits = bin.replace(/[^01]/g, '').split('').reverse();
    bits.forEach((bit, i) => { if (bit === '1') { const val = Math.pow(2, i); sum += val; components.push({ pos: i, val }); } });
    return { sum, components: components.reverse() };
  };

  const divisions = getDivisions(num);
  const binSum = getBinarySum(binaryStr);

  return (
    <LockedContent keyword="binario" title="Clase 8: Representación de la Información" unit={3}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Representación de Datos
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Todo lo digital son números binarios. Aprendé a convertir entre bases y a entender cómo el hardware interpreta texto, sonido e imágenes.
            </p>
          </motion.div>
        </header>

        {/* Teoría: Sistemas de Numeración */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem', fontWeight: 900 }}>Sistemas de Numeración</h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 4rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Los sistemas de numeración posicionales asignan un valor diferente a cada dígito según su <strong style={{ color: '#10b981' }}>posición</strong>. En base 10, cada posición vale 10 veces la anterior. En binario (base 2), vale el doble.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { base: 'Decimal', b: 10, digits: '0-9', color: '#10b981', use: 'Uso humano cotidiano. Surgió por los 10 dedos de las manos.' },
              { base: 'Binario', b: 2, digits: '0, 1', color: '#3b82f6', use: 'El lenguaje nativo del hardware digital: encendido o apagado.' },
              { base: 'Octal', b: 8, digits: '0-7', color: '#f59e0b', use: 'Históricamente usado en sistemas Unix para permisos de archivos (chmod 755).' },
              { base: 'Hexadecimal', b: 16, digits: '0-9, A-F', color: '#8b5cf6', use: 'Compacta los binarios: 1 hex = 4 bits. Usado en colores CSS, direcciones de memoria.' }
            ].map((s, i) => (
              <div key={i} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '30px', border: `1.5px solid ${s.color}30` }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: s.color, marginBottom: '0.75rem', letterSpacing: '2px' }}>BASE {s.b}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{s.base}</h3>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Dígitos: {s.digits}</div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>{s.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Simulador: Divisiones Sucesivas */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ background: '#111', padding: '4rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Calculator color="#10b981" size={42} style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Decimal → Binario</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '1rem auto 0' }}>
                <strong>Método: Divisiones Sucesivas.</strong> Dividimos por 2 repetidamente. Los restos, leídos de <em>abajo hacia arriba</em>, forman el número binario.
              </p>
            </div>
            <div style={{ maxWidth: '400px', margin: '0 auto 3rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.75rem', color: '#64748b', fontWeight: 800 }}>DECIMAL:</label>
              <input type="number" min="0" max="255" value={num} onChange={e => setNum(parseInt(e.target.value) || 0)} style={{ width: '100%', background: '#0f172a', border: '2px solid #10b981', borderRadius: '15px', padding: '1.25rem', color: '#fff', fontSize: '2rem', fontWeight: 900, textAlign: 'center', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', paddingBottom: '1rem', justifyContent: 'center' }}>
              {divisions.map((step, i) => (
                <div key={i} style={{ minWidth: '120px', background: '#1e293b', padding: '1.5rem', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>Paso {i + 1}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{step.n} ÷ 2</div>
                  <div style={{ height: '2px', background: '#10b981', margin: '0.75rem 0', opacity: 0.3 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <div style={{ textAlign: 'left' }}><div style={{ color: '#64748b', fontSize: '0.7rem' }}>Cociente</div><strong>{step.q}</strong></div>
                    <div style={{ textAlign: 'right', color: '#10b981' }}><div style={{ color: '#64748b', fontSize: '0.7rem' }}>Resto</div><strong style={{ fontSize: '1.1rem' }}>{step.r}</strong></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem', padding: '1.5rem', background: '#10b98115', borderRadius: '20px', border: '1px solid #10b98130' }}>
              <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Restos de abajo hacia arriba →</div>
              <code style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981', letterSpacing: '4px' }}>
                {divisions.map(d => d.r).reverse().join('')}
              </code>
              <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem' }}>Verificación: {parseInt(divisions.map(d => d.r).reverse().join(''), 2)} en decimal</div>
            </div>
          </div>
        </section>

        {/* Simulador: Suma de Potencias */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ background: '#111', padding: '4rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Zap color="#3b82f6" size={42} style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Binario → Decimal</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '1rem auto 0' }}>
                <strong>Método: Suma de Potencias de 2.</strong> Cada bit "1" activa su potencia de 2 según su posición (contando desde 0 a la derecha).
              </p>
            </div>
            <div style={{ maxWidth: '400px', margin: '0 auto 3rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.75rem', color: '#64748b', fontWeight: 800 }}>BINARIO (solo 0 y 1):</label>
              <input type="text" value={binaryStr} onChange={e => setBinaryStr(e.target.value.replace(/[^01]/g, '').slice(0, 8))} style={{ width: '100%', background: '#0f172a', border: '2px solid #3b82f6', borderRadius: '15px', padding: '1.25rem', color: '#fff', fontSize: '2rem', fontWeight: 900, textAlign: 'center', letterSpacing: '6px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {binaryStr.split('').map((bit, i) => {
                const pos = binaryStr.length - 1 - i;
                const val = Math.pow(2, pos);
                return (
                  <motion.div key={i} animate={{ scale: bit === '1' ? 1.05 : 1, opacity: bit === '1' ? 1 : 0.35 }} style={{ minWidth: '90px', padding: '1.25rem', background: bit === '1' ? '#3b82f615' : '#1e293b', borderRadius: '20px', border: bit === '1' ? '2px solid #3b82f6' : '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{bit}</div>
                    <div style={{ color: '#64748b', fontSize: '0.65rem', margin: '0.25rem 0' }}>pos {pos}</div>
                    <div style={{ fontWeight: 800, color: bit === '1' ? '#3b82f6' : '#475569', fontSize: '0.85rem' }}>2^{pos}={val}</div>
                  </motion.div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem', padding: '1.5rem', background: '#3b82f615', borderRadius: '20px', border: '1px solid #3b82f630' }}>
              <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{binSum.components.map((c, i) => <span key={i}>{i > 0 ? ' + ' : ''}2^{c.pos}</span>)} = {binSum.components.map((c, i) => <span key={i}>{i > 0 ? ' + ' : ''}{c.val}</span>)}</div>
              <code style={{ fontSize: '3rem', fontWeight: 900, color: '#3b82f6' }}>{binSum.sum}</code>
            </div>
          </div>
        </section>

        {/* Tipos de Datos */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>¿Cómo se Codifica el Mundo Real?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { icon: <FileJson />, title: 'Texto (Unicode/UTF-8)', color: '#10b981', desc: 'UTF-8 representa millones de caracteres de todos los idiomas. La "Ñ" es el código Unicode U+00D1. ASCII solo cubría el inglés con 128 caracteres.' },
              { icon: <Music />, title: 'Audio (PCM Sampling)', color: '#3b82f6', desc: 'Se mide la amplitud de una onda de sonido 44.100 veces por segundo (44.1 kHz, calidad CD). Cada muestra es un número de 16 bits.' },
              { icon: <Video />, title: 'Imágenes (Píxeles RGB)', color: '#ef4444', desc: 'Cada punto tiene 3 bytes: Rojo, Verde y Azul (0-255 cada uno). 1920×1080 píxeles × 3 bytes = más de 6 MB sin compresión.' }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: item.color, marginBottom: '1.5rem' }}>{React.cloneElement(item.icon, { size: 40, style: { margin: '0 auto' } })}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #10b981', boxShadow: '0 30px 60px rgba(16,185,129,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Binary size={52} color="#10b981" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: Representación Digital</h2>
          </div>
          <QuizBlock
            questions={QUESTIONS}
            accentColor="#10b981"
            clase="Clase 8: Representación de Datos"
            unidad="Unidad 3"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default RepresentacionDatos;
