import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Box, Zap, CheckSquare, Layers, Cpu, Database
} from 'lucide-react';

const LOGIC_QUESTS = [
  { q: '¿Qué entrada produce una salida "1" en una compuerta "AND"?', opts: ['1 y 1', '1 y 0', '0 y 0', 'Cualquier combinación'], a: 0, exp: 'Para que AND sea verdadero, todas sus entradas deben ser 1.' },
  { q: '¿Qué hace la compuerta "NOT"?', opts: ['Suma las entradas', 'Multiplica las entradas', 'Invierte la entrada (0->1, 1->0)', 'Apaga el sistema'], a: 2, exp: 'Es una compuerta inversora.' },
  { q: '¿Cuál es el resultado de (1 OR 0)?', opts: ['0', '1', 'Error', 'Bajo voltaje'], a: 1, exp: 'OR es verdadero si al menos una entrada lo es.' },
  { q: 'En una compuerta XOR, si las entradas son 1 y 1, el resultado es:', opts: ['1', '0', '2', 'Indeterminado'], a: 1, exp: 'XOR (O Exclusiva) es 1 solo si las entradas son diferentes.' },
  { q: 'La compuerta NAND es el resultado de:', opts: ['Una AND seguida de una NOT', 'Una OR seguida de una NOT', 'Dos AND en paralelo', 'Una XOR invertida'], a: 0, exp: 'NAND = NOT AND. Invierte la salida de una AND.' },
  { q: '¿Cuál es el resultado de una NOR con entradas 0 y 0?', opts: ['0', '1', 'Error', 'Depende del bus'], a: 1, exp: 'NOR es 1 solo si todas sus entradas son 0 (lo opuesto de OR).' },
  { q: 'El Álgeba de Boole utiliza únicamente dos valores:', opts: ['0 y 1', '1 y 2', 'A y B', 'Verdadero y Nulo'], a: 0, exp: 'Es la base de la lógica binaria.' },
  { q: '¿Quién formuló las leyes que simplifican expresiones lógicas como !(A ∧ B) = ¬A ∨ ¬B?', opts: ['Newton', 'Von Neumann', 'Babbage', 'Augustus De Morgan'], a: 3, exp: 'Las Leyes de De Morgan son fundamentales para optimizar circuitos.' },
  { q: '¿Qué es una "Tabla de Verdad"?', opts: ['Un libro de ética', 'Una lista de contraseñas', 'Una representación exhaustiva de todas las salidas para cada combinación de entradas', 'Un chip de silicio'], a: 2, exp: 'Permite analizar cualquier función lógica.' },
  { q: 'En Álgebra de Boole, ¿cuál es el resultado de (A ∧ 1)?', opts: ['1', '0', 'A', '¬A'], a: 2, exp: 'Cualquier valor operado con AND contra 1 mantiene su valor original (Identidad).' },
  { q: '¿Cuál es el resultado de (A ∨ 1)?', opts: ['A', '1', '0', '¬A'], a: 1, exp: 'Cualquier valor operado con OR contra 1 siempre da como resultado 1.' },
  { q: '¿Qué componente electrónico básico permitió la miniaturización de las compuertas lógicas?', opts: ['La válvula de vacío', 'El capacitor', 'El transistor', 'La resistencia'], a: 2, exp: 'Los transistores funcionan como micro-interruptores que forman las compuertas.' },
  { q: '¿Qué es un Semisumador (Half Adder)?', opts: ['Un circuito que suma 2 bits pero no acepta acarreo previo', 'Un circuito que suma 4 bits', 'Un procesador completo', 'Un tipo de memoria RAM'], a: 0, exp: 'Calcula la suma y el acarreo de dos bits individuales.' },
  { q: 'Un Sumador Completo (Full Adder) se diferencia del semisumador porque:', opts: ['Es más rápido', 'Acepta un acarreo de entrada (Cin)', 'Usa más energía', 'No tiene acarreo de salida'], a: 1, exp: 'Permite encadenar sumas para números de varios bits (n-bit adders).' },
  { q: '¿Cuántos bits de selección necesita un Multiplexor de 4 entradas?', opts: ['1', '2', '3', '4'], a: 1, exp: '2^2 = 4. Se necesitan 2 bits para seleccionar una de las 4 entradas.' },
  { q: '¿Qué hace un Decodificador?', opts: ['Comprime datos', 'Activa una salida específica basándose en una entrada binaria', 'Cifra información', 'Aumenta el voltaje'], a: 1, exp: 'Convierte un código binario en la activación de una línea específica (ej: selección de memoria).' },
  { q: '¿Cuál es el orden de jerarquía en las operaciones lógicas?', opts: ['OR, AND, NOT', 'NOT, AND, OR', 'AND, OR, NOT', 'Todas son iguales'], a: 1, exp: 'Al igual que en matemática, hay precedencias: primero la negación, luego la conjunción, luego la disyunción.' },
  { q: 'La expresión (A ∨ ¬A) siempre es igual a:', opts: ['A', '¬A', '1', '0'], a: 2, exp: 'Ley del Tercero Excluido: algo es verdadero o falso, no hay otra opción.' },
  { q: 'La expresión (A ∧ ¬A) siempre es igual a:', opts: ['1', '0', 'A', 'Error'], a: 1, exp: 'Principio de No Contradicción: algo no puede ser verdadero y falso al mismo tiempo.' },
  { q: '¿Para qué sirve el Mapa de Karnaugh?', opts: ['Para navegar por el procesador', 'Para simplificar funciones booleanas gráficamente', 'Para medir la temperatura del chip', 'Para guardar archivos'], a: 1, exp: 'Es una herramienta visual para reducir el número de compuertas necesarias en un circuito.' }
];

const TABLE_STYLE = { width: '100%', borderCollapse: 'collapse', textAlign: 'center', margin: '2rem 0' };
const TH_STYLE = { padding: '1rem', background: 'rgba(255,255,255,0.05)', color: '#f59e0b', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase' };
const TD_STYLE = { padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' };

const LogicaDigital = () => {
  const [inA, setInA] = useState(0);
  const [inB, setInB] = useState(0);

  const andOut = inA && inB;
  const orOut = inA || inB;
  const notA = inA ? 0 : 1;
  const xorOut = inA !== inB ? 1 : 0;

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
                <button onClick={() => setInA(inA ? 0 : 1)} style={{ background: inA ? '#eab308' : '#334155', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', transition: '0.2s' }}>A: {inA}</button>
                <button onClick={() => setInB(inB ? 0 : 1)} style={{ background: inB ? '#eab308' : '#334155', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', transition: '0.2s' }}>B: {inB}</button>
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  <span style={{ fontWeight: 800 }}>AND (A ∧ B)</span>
                  <span style={{ color: andOut ? '#22c55e' : '#64748b', fontWeight: 900 }}>Resultado: {andOut}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  <span style={{ fontWeight: 800 }}>OR (A ∨ B)</span>
                  <span style={{ color: orOut ? '#22c55e' : '#64748b', fontWeight: 900 }}>Resultado: {orOut}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  <span style={{ fontWeight: 800 }}>NOT A (¬A)</span>
                  <span style={{ color: notA ? '#22c55e' : '#64748b', fontWeight: 900 }}>Resultado: {notA}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#0f172a', borderRadius: '20px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  <span style={{ fontWeight: 800 }}>XOR (A ⊕ B)</span>
                  <span style={{ color: xorOut ? '#22c55e' : '#64748b', fontWeight: 900 }}>Resultado: {xorOut}</span>
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

        {/* Tablas de Verdad */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center' }}>Tablas de Verdad Universales</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {/* AND */}
            <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}><Zap color="#f59e0b" size={20} /> COMPUERTA AND</h3>
              <table style={TABLE_STYLE}>
                <thead><tr><th style={TH_STYLE}>A</th><th style={TH_STYLE}>B</th><th style={TH_STYLE}>Y</th></tr></thead>
                <tbody style={{ fontSize: '0.9rem' }}>
                  <tr><td style={TD_STYLE}>0</td><td style={TD_STYLE}>0</td><td style={TD_STYLE}>0</td></tr>
                  <tr><td style={TD_STYLE}>0</td><td style={TD_STYLE}>1</td><td style={TD_STYLE}>0</td></tr>
                  <tr><td style={TD_STYLE}>1</td><td style={TD_STYLE}>0</td><td style={TD_STYLE}>0</td></tr>
                  <tr style={{ background: 'rgba(34,197,94,0.05)' }}><td style={TD_STYLE}>1</td><td style={TD_STYLE}>1</td><td style={TD_STYLE}>1</td></tr>
                </tbody>
              </table>
            </div>

            {/* OR */}
            <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}><Zap color="#3b82f6" size={20} /> COMPUERTA OR</h3>
              <table style={TABLE_STYLE}>
                <thead><tr><th style={TH_STYLE}>A</th><th style={TH_STYLE}>B</th><th style={TH_STYLE}>Y</th></tr></thead>
                <tbody style={{ fontSize: '0.9rem' }}>
                  <tr style={{ opacity: 0.5 }}><td style={TD_STYLE}>0</td><td style={TD_STYLE}>0</td><td style={TD_STYLE}>0</td></tr>
                  <tr><td style={TD_STYLE}>0</td><td style={TD_STYLE}>1</td><td style={TD_STYLE}>1</td></tr>
                  <tr><td style={TD_STYLE}>1</td><td style={TD_STYLE}>0</td><td style={TD_STYLE}>1</td></tr>
                  <tr><td style={TD_STYLE}>1</td><td style={TD_STYLE}>1</td><td style={TD_STYLE}>1</td></tr>
                </tbody>
              </table>
            </div>

            {/* XOR */}
            <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}><Zap color="#a855f7" size={20} /> COMPUERTA XOR</h3>
              <table style={TABLE_STYLE}>
                <thead><tr><th style={TH_STYLE}>A</th><th style={TH_STYLE}>B</th><th style={TH_STYLE}>Y</th></tr></thead>
                <tbody style={{ fontSize: '0.9rem' }}>
                  <tr><td style={TD_STYLE}>0</td><td style={TD_STYLE}>0</td><td style={TD_STYLE}>0</td></tr>
                  <tr><td style={TD_STYLE}>0</td><td style={TD_STYLE}>1</td><td style={TD_STYLE}>1</td></tr>
                  <tr><td style={TD_STYLE}>1</td><td style={TD_STYLE}>0</td><td style={TD_STYLE}>1</td></tr>
                  <tr><td style={TD_STYLE}>1</td><td style={TD_STYLE}>1</td><td style={TD_STYLE}>0</td></tr>
                </tbody>
              </table>
            </div>

            {/* NOT */}
            <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}><Zap color="#ef4444" size={20} /> COMPUERTA NOT</h3>
              <table style={TABLE_STYLE}>
                <thead><tr><th style={TH_STYLE}>A</th><th style={TH_STYLE}>-</th><th style={TH_STYLE}>Y</th></tr></thead>
                <tbody style={{ fontSize: '0.9rem' }}>
                  <tr><td style={TD_STYLE}>0</td><td style={TD_STYLE}>-</td><td style={TD_STYLE}>1</td></tr>
                  <tr><td style={TD_STYLE}>1</td><td style={TD_STYLE}>-</td><td style={TD_STYLE}>0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Contenido Teórico Ampliado */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>Fundamentos del Pensamiento Lógico</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {[
              { Icon: Cpu, color: '#f59e0b', title: 'Compuertas Universales', desc: 'Las compuertas NAND y NOR se llaman "universales" porque cualquier circuito lógico imaginable puede construirse utilizando exclusivamente uno de estos dos tipos de compuerta.' },
              { Icon: Layers, color: '#8b5cf6', title: 'Leyes de De Morgan', desc: 'Permiten transformar operaciones multiplicativas (AND) en aditivas (OR) mediante la negación. !(A ∧ B) = ¬A ∨ ¬B. Es vital para reducir el número de componentes físicos.' },
              { Icon: Database, color: '#10b981', title: 'Sistemas Combinacionales', desc: 'Son circuitos donde la salida depende exclusivamente de la combinación actual de las entradas. Ejemplos: Sumadores, Multiplexores y Decodificadores.' },
              { Icon: Box, color: '#3b82f6', title: 'Multiplexores (MUX)', desc: 'Funcionan como un selector digital. De múltiples líneas de entrada, selecciona solo una para la salida basándose en una señal de control binaria.' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <item.Icon size={32} color={item.color} style={{ marginBottom: '1.25rem' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #f59e0b', boxShadow: '0 30px 60px rgba(234,179,8,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <CheckSquare size={52} color="#f59e0b" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Lógica Digital</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>20 preguntas para validar tu comprensión profunda de los circuitos digitales.</p>
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
