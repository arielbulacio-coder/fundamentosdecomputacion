import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RegistrationModal from './RegistrationModal';
import { prepareQuiz } from '../utils/quizUtils';

/**
 * Reusable quiz block with:
 * - Shuffled question order + shuffled answer positions (generated once per session)
 * - Score tracking with explanation feedback
 * - 70% passing threshold
 * - On pass: "Mejorar puntaje" vs "Registrar resultado" decision
 *
 * Props:
 *   questions: [{ q, opts, a, exp }]
 *   passingScore: number (override, default: 70% of total)
 *   accentColor: string (default '#3b82f6')
 *   materia: string
 *   clase: string
 *   unidad: string
 */
const QuizBlock = ({
  questions,
  passingScore,
  accentColor = '#3b82f6',
  materia = 'Fundamentos de Computación',
  clase = 'Sin asignar',
  unidad = 'Sin asignar'
}) => {
  const [started, setStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  // Shuffle questions + options ONCE when quiz starts
  const shuffledQuestions = useMemo(() => {
    if (!started) return [];
    return prepareQuiz(questions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const minPass = passingScore ?? Math.ceil(questions.length * 0.7);
  const passed = score >= minPass;
  const pct = started && finished ? Math.round((score / questions.length) * 100) : 0;

  const reset = () => {
    setStarted(false);
    setQIdx(0);
    setScore(0);
    setChosen(null);
    setFinished(false);
    setShowRegistration(false);
  };

  const handleAnswer = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === shuffledQuestions[qIdx].a) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (qIdx + 1 < shuffledQuestions.length) {
      setQIdx(qIdx + 1);
      setChosen(null);
    } else {
      setFinished(true);
    }
  };

  // ── Start screen ────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '2.5rem' }}>
          <strong style={{ color: '#fff' }}>{questions.length} preguntas</strong> — Necesitás{' '}
          <strong style={{ color: accentColor }}>{minPass}/{questions.length} ({Math.round(minPass / questions.length * 100)}%)</strong> para aprobar.
          <br />Las preguntas y opciones aparecerán en orden aleatorio.
        </div>
        <button
          onClick={() => setStarted(true)}
          style={{
            background: accentColor, color: '#fff', border: 'none',
            padding: '1.5rem 4rem', borderRadius: '25px', fontWeight: 900,
            cursor: 'pointer', fontSize: '1.2rem',
            boxShadow: `0 15px 30px ${accentColor}40`
          }}
        >
          Iniciar Evaluación
        </button>
      </div>
    );
  }

  // ── Finished screen ─────────────────────────────────────────────────────────
  if (finished) {
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{passed ? '🎓' : '📚'}</div>
            <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              {score} / {questions.length}
            </h3>
            <div style={{ fontSize: '1.5rem', color: passed ? '#22c55e' : '#f59e0b', fontWeight: 700, marginBottom: '2rem' }}>
              {pct}% — {passed ? '¡APROBADO!' : 'NECESITÁS REPASAR'}
            </div>

            {passed ? (
              /* ── Passed: decision panel ── */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  background: '#1e293b', borderRadius: '35px', padding: '2.5rem',
                  maxWidth: '520px', margin: '0 auto 2rem',
                  border: '1.5px solid rgba(34,197,94,0.2)'
                }}
              >
                <p style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  ¿Qué deseas hacer?
                </p>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                  Podés intentar mejorar tu puntaje o registrar este resultado para que tu docente lo vea.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                  <button
                    onClick={() => setShowRegistration(true)}
                    style={{
                      background: 'linear-gradient(to right, #22c55e, #16a34a)', color: '#fff', border: 'none',
                      padding: '1.2rem 2rem', borderRadius: '20px', fontWeight: 900,
                      cursor: 'pointer', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'
                    }}
                  >
                    🎓 Registrar este resultado ({pct}%)
                  </button>
                  <button
                    onClick={reset}
                    style={{
                      background: `${accentColor}20`, color: accentColor,
                      border: `2px solid ${accentColor}40`,
                      padding: '1.2rem 2rem', borderRadius: '20px', fontWeight: 900,
                      cursor: 'pointer', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'
                    }}
                  >
                    🔄 Mejorar mi puntaje
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ── Not passed: retry prompt ── */
              <div>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem' }}>
                  Necesitabas al menos <strong style={{ color: accentColor }}>{minPass}</strong> respuestas correctas ({Math.round(minPass / questions.length * 100)}%).
                  Repasá el contenido y la sección de repaso rápido.
                </p>
                <button
                  onClick={reset}
                  style={{
                    background: `${accentColor}20`, color: accentColor,
                    border: `2px solid ${accentColor}40`,
                    padding: '1rem 2.5rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1rem'
                  }}
                >
                  🔄 Reintentar
                </button>
              </div>
            )}
          </motion.div>
        </div>

        <RegistrationModal
          isOpen={showRegistration}
          onClose={() => setShowRegistration(false)}
          score={score}
          total={questions.length}
          materia={materia}
          clase={clase}
          unidad={unidad}
        />
      </>
    );
  }

  // ── Question screen ─────────────────────────────────────────────────────────
  const current = shuffledQuestions[qIdx];

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: accentColor, fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px' }}>
        <span>PREGUNTA {qIdx + 1} / {shuffledQuestions.length}</span>
        <span>CORRECTAS: {score}</span>
      </div>
      {/* Progress bar */}
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '3rem' }}>
        <motion.div
          animate={{ width: `${((qIdx) / shuffledQuestions.length) * 100}%` }}
          style={{ height: '100%', background: accentColor, borderRadius: '2px' }}
        />
      </div>

      <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '3rem', lineHeight: 1.5, fontWeight: 800 }}>
        {current.q}
      </h3>

      <div style={{ display: 'grid', gap: '1.25rem' }}>
        {current.opts.map((opt, i) => {
          const isCorrect = i === current.a;
          const isChosen = i === chosen;
          let bg = 'transparent';
          let border = '2px solid rgba(255,255,255,0.1)';
          if (chosen !== null) {
            if (isCorrect) { bg = '#22c55e20'; border = '2px solid #22c55e'; }
            if (isChosen && !isCorrect) { bg = '#ef444420'; border = '2px solid #ef4444'; }
          }
          return (
            <motion.button
              key={i}
              whileHover={chosen === null ? { x: 8 } : {}}
              onClick={() => handleAnswer(i)}
              style={{
                padding: '1.5rem', textAlign: 'left', borderRadius: '20px',
                border, cursor: chosen === null ? 'pointer' : 'default',
                fontSize: '1.1rem', fontWeight: 600, background: bg, color: '#f8fafc', transition: '0.3s'
              }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '28px', height: '28px', borderRadius: '50%',
                background: chosen !== null && isCorrect ? '#22c55e' : chosen !== null && isChosen ? '#ef4444' : 'rgba(255,255,255,0.05)',
                color: chosen !== null ? '#fff' : '#94a3b8',
                fontWeight: 900, fontSize: '0.8rem', marginRight: '1rem', flexShrink: 0
              }}>
                {['A', 'B', 'C', 'D'][i]}
              </span>
              {opt}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {chosen !== null && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '3rem', padding: '2.5rem', background: 'rgba(255,255,255,0.02)',
              borderRadius: '30px', borderLeft: `8px solid ${chosen === current.a ? '#22c55e' : '#f59e0b'}`
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: chosen === current.a ? '#22c55e' : '#f59e0b', marginBottom: '0.75rem', letterSpacing: '1px' }}>
              {chosen === current.a ? '✓ CORRECTO' : '✗ INCORRECTO'} — EXPLICACIÓN
            </div>
            <p style={{ margin: 0, lineHeight: 1.8, fontSize: '1.05rem', color: '#94a3b8' }}>{current.exp}</p>
            <button
              onClick={nextQuestion}
              style={{
                background: accentColor, color: '#fff', width: '100%', border: 'none',
                padding: '1.25rem', borderRadius: '20px', fontWeight: 900, marginTop: '2rem',
                cursor: 'pointer', fontSize: '1.05rem'
              }}
            >
              {qIdx + 1 < shuffledQuestions.length ? 'Siguiente Pregunta →' : 'Ver Resultado Final'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizBlock;
