import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Box, Zap, CheckSquare
} from 'lucide-react';

const LOGIC_QUESTS = [
  { q: '¿Qué entrada produce una salida 1 en una compuerta "AND"?', opts: ['1 y 1', '1 y 0', '0 y 0', 'Cualquier combinación'], a: 0, exp: 'AND solo da verdadero (1) si AMBAS entradas son verdaderas.' },
  { q: '¿Qué hace la compuerta "NOT"?', opts: ['Suma las entradas', 'Multiplica las entradas', 'Invierte la entrada (0->1, 1->0)', 'Apaga el sistema'], a: 2, exp: 'NOT es una negación lógica del bit de entrada.' },
  { q: '¿Cuál es el resultado de la operación lógica (1 OR 0)?', opts: ['0', '1', 'Error', 'Depende de la CPU'], a: 1, exp: 'OR da verdadero si al menos una de las entradas es 1.' },
  { q: 'El Álgebra de Boole es la base fundamental de:', opts: ['La medicina', 'Los circuitos digitales y la programación', 'La cocina', 'La historia'], a: 1, exp: 'George Boole definió las bases de la lógica binaria que usan todos los chips actuales.' },
  { q: '¿Qué es una "Tabla de Verdad"?', opts: ['Un libro de ética', 'Una representación de todas las salidas posibles para cada combinación de entradas', 'Una lista de contraseñas', 'Un componente físico'], a: 1, exp: 'Permite visualizar matemáticamente cómo se comporta una compuerta o circuito.' },
  { q: '¿Cuál es el resultado de una compuerta XOR si sus entradas son 1 y 1?', opts: ['1', '0', '2', 'Indeterminado'], a: 1, exp: 'XOR (OR Exclusiva) da 1 solo si las entradas son DIFERENTES entre sí.' },
  { q: '¿Qué compuerta lógica representa la afirmación: "Es verdad solo si A no es verdad"?', opts: ['AND', 'OR', 'NOT', 'XOR'], a: 2, exp: 'NOT invierte el valor lógico (¬A).' },
  { q: 'En electrónica digital, el valor "0" suele representar...', opts: ['Voltaje alto', 'Ausencia de voltaje o voltaje bajo (tierra)', 'Mucha memoria', 'Un error crítico'], a: 1, exp: 'Usualmente 0 es 0V (o cercano) y 1 es 3.3V/5V.' }
];

const LogicaDigital = () => {
  const [inA, setInA] = useState(0);
  const [inB, setInB] = useState(0);

  const andOut = inA && inB;
  const orOut = inA || inB;
  const notA = inA ? 0 : 1;

  return (
    <LockedContent keyword="boole" title="Clase 9: Lógica Digital" unit={3}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Álgebra de Boole y Lógica
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Los ladrillos del pensamiento digital. Cómo simples compuertas construyen la inteligencia de cualquier procesador.
            </p>
          </motion.div>
        </header>

        {/* Simulador de Compuertas */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#1e293b', padding: '3rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', color: '#f59e0b' }}>Banco de Pruebas Lógicas</h2>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', justifyContent: 'center' }}>
                <button onClick={() => setInA(inA ? 0 : 1)} style={{ background: inA ? '#eab308' : '#334155', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer' }}>A: {inA}</button>
                <button onClick={() => setInB(inB ? 0 : 1)} style={{ background: inB ? '#eab308' : '#334155', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer' }}>B: {inB}</button>
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontWeight: 800 }}>AND (A ∧ B)</span>
                  <span style={{ color: andOut ? '#22c55e' : '#64748b', fontWeight: 900 }}>Resultado: {andOut}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontWeight: 800 }}>OR (A ∨ B)</span>
                  <span style={{ color: orOut ? '#22c55e' : '#64748b', fontWeight: 900 }}>Resultado: {orOut}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontWeight: 800 }}>NOT A (¬A)</span>
                  <span style={{ color: notA ? '#22c55e' : '#64748b', fontWeight: 900 }}>Resultado: {notA}</span>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/digital_logic_gates_neon_1775235547550.png" 
                alt="Digital Logic Gates" 
                style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(234,179,8,0.2)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Impacto y Ética */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
            <div>
              <Zap color="#f59e0b" size={40} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Lógica y Circuitos</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Cualquier programa complejo se reduce a miles de millones de estas operaciones básicas. La ALU de la CPU es esencialmente una red masiva de compuertas AND, OR y NOT.
              </p>
            </div>
            <div style={{ background: '#0f172a', padding: '3rem', borderRadius: '40px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}><Box size={24} color="#f59e0b" /> Tabla de Verdad (AND)</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                  <tr style={{ color: '#f59e0b', fontSize: '0.9rem' }}>
                    <th style={{ padding: '1rem' }}>A</th>
                    <th style={{ padding: '1rem' }}>B</th>
                    <th style={{ padding: '1rem' }}>Y (OUT)</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '1rem', opacity: 0.8 }}>
                  <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}><td>0</td><td>0</td><td>0</td></tr>
                  <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}><td>0</td><td>1</td><td>0</td></tr>
                  <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}><td>1</td><td>0</td><td>0</td></tr>
                  <tr style={{ background: 'rgba(234,179,8,0.1)' }}><td>1</td><td>1</td><td>1</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #f59e0b', boxShadow: '0 30px 60px rgba(234,179,8,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <CheckSquare size={52} color="#f59e0b" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: Lógica Digital</h2>
          </div>
          <QuizBlock 
            questions={LOGIC_QUESTS} 
            accentColor="#f59e0b"
            clase="Clase 9: Lógica digital"
            unidad="Unidad 3"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default LogicaDigital;
