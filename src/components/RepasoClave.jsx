import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen } from 'lucide-react';

/**
 * Learning reinforcement component shown before the quiz.
 * Displays key concept flashcards in an expandable panel.
 *
 * Props:
 *   facts: [{ icon: string (emoji), term: string, def: string }]
 *   accentColor: string
 *   title: string
 */
const RepasoClave = ({ facts = [], accentColor = '#3b82f6', title = 'Conceptos Clave' }) => {
  const [open, setOpen] = useState(true);

  return (
    <section style={{ marginBottom: '6rem' }}>
      <div style={{
        background: `linear-gradient(135deg, ${accentColor}0a, ${accentColor}04)`,
        border: `1.5px solid ${accentColor}25`,
        borderRadius: '40px',
        overflow: 'hidden'
      }}>
        {/* Header / Toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            padding: '2rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            color: '#f8fafc', textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '16px',
              background: `${accentColor}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <BookOpen size={24} color={accentColor} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: accentColor, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2px' }}>
                Repaso Rápido — Antes del Examen
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900 }}>{title}</div>
            </div>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={24} color={accentColor} />
          </motion.div>
        </button>

        {/* Content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '0 3rem 3rem' }}>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                  Revisá estos conceptos clave antes de responder la evaluación. Hacé clic en cualquier tarjeta para destacarla.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {facts.map((fact, i) => (
                    <FlashCard key={i} fact={fact} accentColor={accentColor} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const FlashCard = ({ fact, accentColor, index }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => setFlipped(f => !f)}
      whileHover={{ y: -3, boxShadow: `0 8px 24px ${accentColor}20` }}
      style={{
        background: '#0f172a',
        borderRadius: '20px',
        padding: '1.5rem',
        border: `1.5px solid ${flipped ? accentColor + '60' : accentColor + '15'}`,
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        minHeight: '110px',
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Accent glow */}
      {flipped && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at top left, ${accentColor}08, transparent 60%)`,
          borderRadius: '20px', pointerEvents: 'none'
        }} />
      )}

      <div style={{
        width: '44px', height: '44px', borderRadius: '14px',
        background: `${accentColor}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.3rem', flexShrink: 0
      }}>
        {fact.icon}
      </div>

      <div style={{ flex: 1 }}>
        <h4 style={{
          margin: '0 0 0.4rem', fontWeight: 800, fontSize: '0.9rem',
          color: flipped ? accentColor : '#f8fafc'
        }}>
          {fact.term}
        </h4>
        <p style={{
          margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6,
          opacity: flipped ? 1 : 0.85
        }}>
          {fact.def}
        </p>
      </div>
    </motion.div>
  );
};

export default RepasoClave;
