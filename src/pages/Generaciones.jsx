import React from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  History, Milestone, Cpu, Zap, Activity, Info, 
  Database, Server, Globe, Bot
} from 'lucide-react';

const GEN_QUESTS = [
  { q: '¿Qué componente electrónico usaba la primera generación de computadoras?', opts: ['Transistores', 'Circuitos Integrados', 'Válvulas de vacío', 'Microchips'], a: 2, exp: 'Eran enormes, generaban mucho calor y se quemaban frecuentemente.' },
  { q: '¿Cuál fue el invento que dio inicio a la segunda generación?', opts: ['Pantalla táctil', 'El transistor (1947)', 'El mouse', 'El diskette'], a: 1, exp: 'El transistor reemplazó a las válvulas, siendo más pequeño, rápido y frío.' },
  { q: 'La tercera generación se caracteriza por el uso de:', opts: ['Válvulas', 'Inteligencia Artificial', 'Circuitos Integrados (Chips)', 'Redes sociales'], a: 2, exp: 'Permitieron meter cientos de componentes en una sola pieza de silicio.' },
  { q: 'El microprocesador define a la:', opts: ['Primera Gen', 'Segunda Gen', 'Tercera Gen', 'Cuarta Generación'], a: 3, exp: 'Nació con el Intel 4004 (1971), integrando todo el CPU en un solo chip.' },
  { q: '¿Cuál de estas fue una de las primeras computadoras programables electrónicas?', opts: ['Macintosh', 'Commodore 64', 'ENIAC', 'Deep Blue'], a: 2, exp: 'ENIAC (1946) ocupaba una habitación entera y usaba miles de válvulas.' },
  { q: '¿Quién es considerada la primera programadora de la historia?', opts: ['Grace Hopper', 'Ada Lovelace', 'Bill Gates', 'Alan Turing'], a: 1, exp: 'Escribió el primer algoritmo para la Máquina Analítica de Babbage.' },
  { q: 'La Quinta Generación se enfoca principalmente en:', opts: ['Hacer computadoras más grandes', 'IA, computación cuántica y procesamiento paralelo', 'Usar más transistores', 'Borrar Internet'], a: 1, exp: 'Busca imitar el razonamiento humano y manejar problemas masivos.' },
  { q: '¿Qué dice la Ley de Moore?', opts: ['Que el precio baja cada mes', 'Que la cantidad de transistores en un chip se duplica cada 2 años aprox.', 'Que todo software falla', 'Que la batería dura menos'], a: 1, exp: 'Ha sido la regla que ha impulsado el avance tecnológico por décadas.' },
  { q: '¿Cuál fue el precursor de Internet nacido en la era de los mainframes?', opts: ['Google', 'Facebook', 'ARPANET', 'Netflix'], a: 2, exp: 'Creado por el Departamento de Defensa de EE.UU. en los 60s.' },
  { q: 'Jack Kilby y Robert Noyce son famosos por inventar:', opts: ['El mouse', 'El Circuito Integrado', 'El monitor de color', 'El teclado'], a: 1, exp: 'Kilby de TI y Noyce de Fairchild/Intel lo inventaron casi simultáneamente en 1958.' },
  { q: 'La "Pascalina" era una máquina:', opts: ['Electrónica', 'Mecánica de suma y resta', 'De vapor', 'De aire'], a: 1, exp: 'Inventada por Blaise Pascal en el siglo XVII.' },
  { q: 'Herman Hollerith diseñó la máquina tabuladora para el censo de EE.UU. usando:', opts: ['Discos rígidos', 'Tarjetas perforadas', 'Niveles de agua', 'Luz láser'], a: 1, exp: 'Su empresa fue una de las que luego formaría IBM.' },
  { q: '¿En qué generación aparecieron por primera vez los Sistemas Operativos?', opts: ['1ra', '2da', '3ra', '4ta'], a: 2, exp: 'Con el O/S 360 de IBM en la era de los circuitos integrados.' },
  { q: 'El primer lenguaje de alto nivel ampliamente usado fue:', opts: ['Python', 'JavaScript', 'FORTRAN', 'Java'], a: 2, exp: 'Surgió a finales de los 50 para cálculos científicos e ingeniería.' },
  { q: '¿Qué invento de Xerox PARC revolucionó el uso de las computadoras en la 4ta Gen?', opts: ['La impresora', 'La Interfaz Gráfica de Usuario (GUI) y el mouse', 'El cable de red', 'El escáner'], a: 1, exp: 'Apple y Microsoft luego popularizaron estas ideas en el Macintosh y Windows.' },
  { q: '¿Cuál era el principal problema de las computadoras de 1ra Generación?', opts: ['No tenían juegos', 'Su gran tamaño, alto consumo y frecuentes fallas de las válvulas', 'Eran muy baratas', 'No tenían teclado'], a: 1, exp: 'Literalmente atraían "bugs" (bichos) que causaban cortocircuitos.' },
  { q: 'La tecnología VLSI (Very Large Scale Integration) permitió:', opts: ['Instalar Windows XP', 'Poner miles de transistores en un chip de la 4ta Gen', 'Limpiar el monitor', 'Tener Wi-Fi'], a: 1, exp: 'Fue la evolución que permitió el nacimiento del microprocesador moderno.' },
  { q: '¿Qué computadora lideró el inicio de la computación personal hogareña en 1975?', opts: ['iPhone', 'IBM PC', 'Altair 8800', 'NASA Apollo Computer'], a: 2, exp: 'Se vendía como un kit para armar y usaba el Intel 8080.' },
  { q: 'Alan Turing es conocido mundialmente por:', opts: ['Vender computadoras', 'Sentar las bases teóricas de la computación e IA', 'Pintar cuadros', 'Inventar el Wi-Fi'], a: 1, exp: 'Su máquina teórica define qué es lo que una computadora puede o no puede calcular.' },
  { q: '¿Qué caracteriza la arquitectura Neuman-Ullman o computación actual?', opts: ['Unidad de control, memoria y ALU separados', 'Todo mezclado', 'Solo memoria', 'Uso de vapor'], a: 0, exp: 'Es el modelo estándar que seguimos usando desde hace 70 años.' }
];

const Generaciones = () => {
  return (
    <LockedContent keyword="valvula" title="Clase 1: El Viaje Evolutivo" unit={1}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #0088ff, #00f2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Generaciones de Computadoras
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde válvulas calientes hasta inteligencia artificial fría. Un viaje de transformación de 100 años resumido en 5 etapas.
            </p>
          </motion.div>
        </header>

        {/* Timeline Visual Ampliado */}
        <section style={{ marginBottom: '6rem', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '20px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, #0088ff, transparent)', opacity: 0.3 }} />
          {[
            { gen: '1ra Generación (1940-1956)', tech: 'Válvulas de Vacío', icon: <Zap />, desc: 'Computadoras del tamaño de una casa. Programadas en lenguaje de máquina puro (0 y 1). ENIAC y UNIVAC son los íconos.', color: '#0088ff' },
            { gen: '2da Generación (1956-1963)', tech: 'Transistores', icon: <Milestone />, desc: 'Menor tamaño y calor. Aparecen COBOL y FORTRAN. Surge el concepto de almacenamiento en núcleos magnéticos.', color: '#00f2ff' },
            { gen: '3ra Generación (1964-1971)', tech: 'Circuitos Integrados', icon: <Cpu />, desc: 'Chips de silicio. Nace el teclado y monitor. Los S.O. permiten ejecutar múltiples programas (Multiprocesamiento).', color: '#3b82f6' },
            { gen: '4ta Generación (1971-Presente)', tech: 'Microprocesadores', icon: <Database />, desc: 'Todo el CPU en un chip. Nacen las PC (Apple, IBM), GUIs y las redes modernas. El mundo se conecta.', color: '#4f46e5' },
            { gen: '5ta Generación (Futuro)', tech: 'IA y Quantum', icon: <Bot />, desc: 'Inteligencia artificial, lenguaje natural, robótica y supercomputación paralela. El software aprende de ti.', color: '#8b5cf6' }
          ].map((g, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ marginBottom: '3rem', paddingLeft: '4rem', position: 'relative' }}
            >
              <div style={{ position: 'absolute', left: '10px', top: '0', width: '30px', height: '30px', background: g.color, borderRadius: '50%', border: '4px solid #0f172a', boxShadow: `0 0 15px ${g.color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', zIndex: 2 }} />
              <div style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '35px', border: '1.5px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0, color: g.color }}>{g.gen}</h3>
                    <div style={{ padding: '0.4rem 1rem', background: `${g.color}30`, borderRadius: '10px', color: g.color, fontSize: '0.8rem', fontWeight: 900 }}>{g.tech}</div>
                 </div>
                 <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.05rem' }}>{g.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Teoría Ampliada: Evolución del Pensamiento */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>Del Ábaco al Microchip</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {[
              { Icon: History, color: '#f59e0b', title: 'Era Pre-Electrónica', desc: 'Desde el Ábaco hasta las máquinas de Babbage y Hollerith. Máquinas mecánicas diseñadas para cálculos matemáticos específicos.' },
              { Icon: Zap, color: '#3b82f6', title: 'Miniaturización', desc: 'El proceso clave del siglo XX. Cómo reducimos componentes de metros a nanómetros, aumentando la potencia y reduciendo el consumo exponencialmente.' },
              { Icon: Globe, color: '#10b981', title: 'Era de la Información', desc: 'Con la 4ta generación, la computadora dejó de ser una "calculadora" para pasar a ser una herramienta de comunicación global.' },
              { Icon: Bot, color: '#a855f7', title: 'IA y Cognición', desc: 'El estado actual. Las máquinas no solo calculan, sino que razonan, traducen y procesan datos masivos imitando redes neuronales.' }
            ].map((item, i) => (
              <div key={i} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <item.Icon size={32} color={item.color} style={{ marginBottom: '1.25rem' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #0088ff', boxShadow: '0 30px 60px rgba(0,136,255,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <History size={52} color="#0088ff" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Historia y Evolución</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>20 preguntas para validar tu dominio sobre la historia de la informática.</p>
          </div>
          <QuizBlock 
            questions={GEN_QUESTS} 
            accentColor="#0088ff"
            clase="Clase 1: Evolución"
            unidad="Unidad 1"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default Generaciones;
