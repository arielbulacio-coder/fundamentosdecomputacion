import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Database, Users, Settings, Share2, Layers, 
  Code, PlayCircle, Globe
} from 'lucide-react';

const C = {
  info: '#0ea5e9',
  software: '#8b5cf6',
  people: '#ec4899',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc'
};

const SOCIEDAD_QUESTS = [
  { q: '¿Cuál es el componente del Sistema de Información que incluye a los usuarios y administradores?', opts: ['Software', 'Datos', 'Personas / Humanware', 'Hardware'], a: 2, exp: 'El factor humano es esencial para que la información tenga sentido, propósito y dirección.' },
  { q: 'En el ciclo de vida de la información, el "Procesamiento" sirve para:', opts: ['Borrar los datos', 'Convertir datos brutos en información útil', 'Vender la PC', 'Descargar virus'], a: 1, exp: 'Procesar implica transformar datos aislados mediante algoritmos o cálculos en conocimiento accionable.' },
  { q: 'El Software de Base tiene como función principal:', opts: ['Editar fotos', 'Gestionar el hardware y servir de plataforma a otros programas', 'Jugar online', 'Escribir documentos'], a: 1, exp: 'El Sistema Operativo es el ejemplo principal de software de base; controla los recursos del equipo.' },
  { q: '¿Qué es un Sistema de Información (SI)?', opts: ['Un conjunto de cables', 'Cualquier software de juegos', 'Conjunto de componentes interrelacionados que recolectan, procesan y distribuyen información', 'Una base de datos de Excel únicamente'], a: 2, exp: 'Un SI es un ecosistema completo que incluye procesos, tecnología y personas.' },
  { q: 'Un compilador o un IDE (entorno de desarrollo) se clasifica como:', opts: ['Software de Base', 'Software de Aplicación', 'Software de Desarrollo / Programación', 'Hardware'], a: 2, exp: 'Son las herramientas fundamentales que usamos los desarrolladores para crear otros programas.' },
  { q: '¿Cuál es la diferencia fundamental entre un "Dato" y la "Información"?', opts: ['Son lo mismo', 'Los datos son hechos brutos sin contexto; la información es el resultado de procesarlos con significado', 'La información es más pequeña', 'Los datos solo son números'], a: 1, exp: 'El dato "38" no dice nada; la información "38 grados de temperatura" permite tomar decisiones.' },
  { q: '¿Qué componente se considera el "combustible" que alimenta a los sistemas de información?', opts: ['La electricidad', 'Los cables', 'Los Datos', 'El teclado'], a: 2, exp: 'Sin datos (Dataware) que procesar, el sistema no tendría propósito ni salida útil.' },
  { q: 'Un navegador web o un procesador de texto (como Word) se clasifican como:', opts: ['Software de Base', 'Software de Aplicación', 'Hardware', 'Firmware'], a: 1, exp: 'Son aplicaciones diseñadas para que el usuario realice tareas específicas finales.' }
];

const SociedadSoftware = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Captura/Entrada', desc: 'Recolección de datos brutos desde sensores, teclados o formularios.', icon: <PlayCircle /> },
    { title: 'Procesamiento', desc: 'Transformación de datos mediante algoritmos y lógica de negocio.', icon: <Settings /> },
    { title: 'Almacenamiento', desc: 'Guardado persistente en bases de datos o sistemas de archivos.', icon: <Database /> },
    { title: 'Distribución', desc: 'Presentación de la información final al usuario o envío a otros sistemas.', icon: <Share2 /> }
  ];

  return (
    <LockedContent keyword="ecosistema" title="Clase 6: Sociedad y Software" unit={2}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: C.text }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: `linear-gradient(to right, ${C.info}, ${C.software})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Sociedad y Software
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde el dato aislado hasta la orquestación global. Entiende cómo el software actúa como el tejido que conecta nuestra civilización moderna.
            </p>
          </motion.div>
        </header>

        {/* Componentes del SI e Imagen */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { icon: <Users />, title: 'Humanware', color: C.people, desc: 'Usuarios y admins.' },
                { icon: <Layers />, title: 'Hardware', color: C.info, desc: 'Soporte físico.' },
                { icon: <Code />, title: 'Software', color: C.software, desc: 'Lógica aplicada.' },
                { icon: <Database />, title: 'Dataware', color: '#10b981', desc: 'Combustible informativo.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  style={{ background: C.card, padding: '2rem', borderRadius: '30px', border: '1.5px solid rgba(255,255,255,0.05)', textAlign: 'center' }}
                >
                  <div style={{ color: item.color, marginBottom: '1rem' }}>{React.cloneElement(item.icon, { size: 24, style: { margin: '0 auto' } })}</div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>{item.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/sociedad_software_networks_1775236177650.png" 
                alt="Social Networks" 
                style={{ width: '100%', borderRadius: '40px', boxShadow: `0 20px 50px ${C.software}20` }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, transparent 40%, ${C.bg} 100%)`, borderRadius: '40px' }} />
            </div>
          </div>
        </section>

        {/* Ciclo de Vida interactivo */}
        <section style={{ marginBottom: '6rem', background: '#111', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 900 }}>Ciclo de la Información</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                onMouseEnter={() => setActiveStep(i)}
                style={{ 
                   display: 'flex', gap: '2rem', padding: '2rem', borderRadius: '30px',
                   background: activeStep === i ? '#ffffff05' : 'transparent',
                   border: activeStep === i ? `2px solid ${C.info}` : '1.5px solid #ffffff05',
                   transition: '0.3s', cursor: 'pointer'
                }}
              >
                <div style={{ color: activeStep === i ? C.info : '#475569' }}>{step.icon}</div>
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{step.title}</h4>
                  <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: `3px solid ${C.info}`, boxShadow: '0 30px 60px rgba(14,165,233,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Globe size={52} color={C.info} style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: Sociedad y Software</h2>
          </div>
          <QuizBlock 
            questions={SOCIEDAD_QUESTS} 
            accentColor={C.info}
            clase="Clase 6: Sociedad y software"
            unidad="Unidad 2"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default SociedadSoftware;
