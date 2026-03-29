import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const C = {
  primary: '#004a99',
  accent: '#e6f0ff',
};

const QUESTIONS = [
  { q: '¿Qué tecnología definía a la primera generación?', opts: ['Circuitos Integrados', 'Transistores', 'Válvulas de Vacío', 'Microchips'], a: 2 },
  { q: 'La segunda generación introdujo:', opts: ['IA', 'Transistores', 'Pantallas Táctiles', 'Windows'], a: 1 },
  { q: '¿Cuál fue la primera computadora programable de 1ra generación?', opts: ['IBM PC', 'ENIAC', 'Apple II', 'Commodore 64'], a: 1 },
  { q: 'En la tercera generación aparecieron los:', opts: ['Válvulas', 'Circuitos Integrados', 'Nubes', 'Smartphones'], a: 1 },
  { q: '¿A qué generación pertenece la invención del microprocesador?', opts: ['Segunda', 'Tercera', 'Cuarta', 'Quinta'], a: 2 },
  { q: 'La arquitectura Von Neumann se formalizó en la:', opts: ['Primera Gen', 'Segunda Gen', 'Tercera Gen', 'Cuarta Gen'], a: 0 },
  { q: 'El lenguaje de máquina era el único usado en la:', opts: ['Cuarta Gen', 'Tercera Gen', 'Segunda Gen', 'Primera Gen'], a: 3 },
  { q: '¿Qué generación se asocia con el procesamiento en paralelo e IA?', opts: ['Cuarta', 'Quinta', 'Tercera', 'Sexta (Moderna)'], a: 1 },
  { q: 'Las supercomputadoras actuales son evolución de la:', opts: ['Segunda Gen', 'Quinta Gen', 'Primera Gen', 'Tercera Gen'], a: 1 },
  { q: '¿Qué componente permitió reducir el tamaño de "habitaciones" a "escritorios"?', opts: ['Válvulas', 'Transistores', 'Teclados', 'Disco Rígido'], a: 1 },
  { q: 'La Ley de Moore describe la evolución de los chips desde la:', opts: ['Segunda Gen', 'Tercera Gen', 'Cuarta Gen', 'Quinta Gen'], a: 1 },
  { q: 'UNIVAC I fue una computadora famosa de la:', opts: ['Primera Gen', 'Segunda Gen', 'Tercera Gen', 'Cuarta Gen'], a: 0 },
  { q: 'Aparecen los sistemas operativos en la:', opts: ['Primera Gen', 'Tercera Gen', 'Segunda Gen', 'Cuarta Gen'], a: 1 },
  { q: 'El disquete fue un medio común en la:', opts: ['Primera Gen', 'Segunda Gen', 'Cuarta Gen', 'Quinta Gen'], a: 2 },
  { q: '¿En qué generación surgió la PC de IBM?', opts: ['Tercera', 'Sexta', 'Cuarta', 'Quinta'], a: 2 },
  { q: 'Los lenguajes de alto nivel (COBOL, FORTRAN) surgen en la:', opts: ['Primera Gen', 'Segunda Gen', 'Cuarta Gen', 'Quinta Gen'], a: 1 },
  { q: '¿Qué tecnología habilitó la computación móvil moderna?', opts: ['Válvulas mini', 'Microprocesadores VLSI', 'Circuitos de Papel', 'Baterías de vapor'], a: 1 },
  { q: 'El concepto de "Internet" comenzó a gestarse en la:', opts: ['Segunda Gen', 'Cuarta Gen', 'Tercera Gen', 'Primera Gen'], a: 2 },
  { q: 'La miniaturización extrema es característica de la:', opts: ['Segunda Gen', 'Quarta Gen', 'Quinta Gen', 'Sexta (Actual)'], a: 3 },
  { q: '¿Quién es considerado el padre de la computación moderna?', opts: ['Bill Gates', 'Steve Jobs', 'Alan Turing', 'Mark Zuckerberg'], a: 2 },
];

const Generaciones = () => {
  const [started, setStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === QUESTIONS[qIdx].a) setScore(s => s + 1);
  };

  const nextQ = () => {
    if (qIdx + 1 < QUESTIONS.length) {
      setQIdx(q => q + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ color: C.primary, fontSize: '2rem', fontWeight: 900 }}>Generaciones de Computadoras</h2>
        <p style={{ color: 'var(--text-light)' }}>De las válvulas de vacío a la Inteligencia Artificial.</p>
      </header>

      {!started ? (
        <div style={{ textAlign: 'center', background: '#f8fafc', padding: '4rem', borderRadius: '32px', border: '1px solid var(--border)' }}>
          <History size={64} color={C.primary} style={{ marginBottom: '1.5rem' }} />
          <h3>Desafío de Conocimiento</h3>
          <p style={{ marginBottom: '2rem', opacity: 0.7 }}>Pon a prueba cuánto sabes sobre la evolución tecnológica (20 preguntas).</p>
          <button onClick={() => setStarted(true)} style={{ background: C.primary, color: 'white', padding: '1rem 3rem', borderRadius: '15px', fontWeight: 800 }}>
            Comenzar Quiz
          </button>
        </div>
      ) : finished ? (
        <div style={{ textAlign: 'center', background: '#f8fafc', padding: '4rem', borderRadius: '32px' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉 ¡Completado!</h3>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Tu puntaje es: <strong>{score} de {QUESTIONS.length}</strong></p>
          <button onClick={() => { setStarted(false); setFinished(false); setQIdx(0); setScore(0); }} style={{ background: C.primary, color: 'white', padding: '1rem 3rem', borderRadius: '15px' }}>
            Reiniciar
          </button>
        </div>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--border)', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.8rem', fontWeight: 700, color: C.primary }}>
            <span>PREGUNTA {qIdx + 1} DE {QUESTIONS.length}</span>
            <span>ACIERTOS: {score}</span>
          </div>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>{QUESTIONS[qIdx].q}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {QUESTIONS[qIdx].opts.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => handleSelect(i)}
                style={{ 
                  textAlign: 'left', 
                  padding: '1.25rem', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border)',
                  background: selected === null ? '#fff' : i === QUESTIONS[qIdx].a ? '#dcfce7' : selected === i ? '#fee2e2' : '#fff',
                  transition: 'background 0.2s',
                  fontWeight: 500
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          {selected !== null && (
            <motion.button 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={nextQ}
              style={{ width: '100%', marginTop: '2rem', background: C.primary, color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700 }}
            >
              {qIdx + 1 < QUESTIONS.length ? 'Siguiente Pregunta' : 'Ver Resultados'}
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

// Simple History icon for the start screen
const History = ({ size, color, style }) => (
  <svg style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <path d="M12 7v5l4 2"/>
  </svg>
);

export default Generaciones;
