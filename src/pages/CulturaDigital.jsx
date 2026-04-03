import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Cloud, Radio, Globe, Laptop, 
  Rocket
} from 'lucide-react';

const C = {
  cloud: '#2ed573',
  transform: '#00f2ff',
  collab: '#a855f7',
  bg: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc'
};

const CULTURA_QUESTS = [
  { q: '¿Qué es el Software como Servicio (SaaS)?', opts: ['Un software que se descarga en un CD', 'Un modelo de distribución donde el software se accede vía internet sin instalación local', 'Un virus informático', 'Hardware para servidores'], a: 1, exp: 'Ejemplos de SaaS son Google Workspace, Spotify o Netflix: accedes al servicio, no eres dueño de los archivos instalables.' },
  { q: 'La "Transformación Digital" consiste en:', opts: ['Solo comprar computadoras nuevas', 'Cambiar el logo de la empresa', 'Integrar tecnología digital en todas las áreas de un negocio para cambiar su forma de operar', 'Usar menos electricidad'], a: 2, exp: 'Es un cambio cultural, organizativo y de procesos potenciado por la tecnología digital.' },
  { q: '¿Qué tecnología permitió el trabajo colaborativo en tiempo real?', opts: ['Disco rígido mecánico', 'Cables de cobre básicos', 'Computación en la nube (Cloud Computing)', 'El mouse'], a: 2, exp: 'La nube permite que múltiples personas editen un mismo archivo simultáneamente desde cualquier lugar del mundo.' },
  { q: 'Un impacto crítico de la informática en la industria actual es:', opts: ['La automatización de procesos mediante robótica e IA', 'Que las fábricas sean más grandes', 'Que los empleados usen mejores uniformes', 'Ninguno'], a: 0, exp: 'La automatización industrial (Industria 4.0) reduce errores, riesgos y aumenta masivamente la productividad.' },
  { q: '¿Qué define a la "Cultura Digital"?', opts: ['Saber usar Excel únicamente', 'Conjunto de prácticas, costumbres e interacciones sociales que se realizan a través de medios digitales', 'Coleccionar computadoras viejas', 'Escribir rápido en el teclado'], a: 1, exp: 'Es cómo la sociedad se comporta, aprende y se relaciona utilizando el ecosistema digital como medio principal.' },
  { q: '¿Qué significa que el acceso a la tecnología sea "Ubicuo"?', opts: ['Que es muy caro', 'Que solo funciona en la oficina', 'Que está presente en todas partes y a toda hora a través de dispositivos móviles', 'Que es antiguo'], a: 2, exp: 'La ubicuidad es una característica de la era móvil: la información nos acompaña siempre y en todo lugar.' },
  { q: '¿Cuál es el principal beneficio de la computación en la nube en términos de costos para una empresa?', opts: ['Comprar servidores propios', 'Pagar solo por el uso (pago por servicio/consumo) en lugar de grandes inversiones iniciales', 'Gastar más en electricidad', 'Contratar más gente'], a: 1, exp: 'El modelo Cloud permite escalar recursos bajo demanda, convirtiendo inversiones fijas (CAPEX) en gastos operativos (OPEX).' },
  { q: 'En la Industria 4.0, ¿qué es el Internet de las Cosas (IoT)?', opts: ['Navegar por Facebook', 'Red de objetos físicos con sensores y conectividad para intercambiar datos', 'Un nuevo tipo de monitor', 'Un cable de internet más rápido'], a: 1, exp: 'IoT permite que máquinas, sensores y productos "hablen" entre sí para optimizar la producción en tiempo real.' }
];

const ticsEvolution = [
  { title: 'Escritorio', desc: 'Sistemas aislados y almacenamiento físico.', icon: <Laptop /> },
  { title: 'Conectividad', desc: 'Aparición de internet y navegación global.', icon: <Globe /> },
  { title: 'Nube & Móvil', desc: 'Acceso ubicuo desde cualquier dispositivo.', icon: <Cloud /> },
  { title: 'Inteligencia', desc: 'Sistemas autónomos e hiperconectividad.', icon: <Radio /> }
];

const CulturaDigital = () => {
  const [activeEra, setActiveEra] = useState(0);

  return (
    <LockedContent keyword="transformacion" title="Clase 7: Cultura Digital" unit={2}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: C.text }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: `linear-gradient(to right, ${C.cloud}, ${C.transform})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Cultura Digital
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Desde la PC aislada hasta la hiperconectividad global. Entiende cómo la tecnología redefine nuestra forma de vivir y trabajar.
            </p>
          </motion.div>
        </header>

        {/* Evolución TICs e Imagen */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src="/assets/cultura_digital_transformation_1775236198314.png" 
                alt="Digital Transformation" 
                style={{ width: '100%', borderRadius: '40px', boxShadow: `0 20px 50px ${C.transform}20` }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, transparent 40%, ${C.bg} 100%)`, borderRadius: '40px' }} />
            </div>
            <div style={{ background: C.card, padding: '3.5rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2.5rem', textAlign: 'center' }}>Hitos Tecnológicos</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {ticsEvolution.map((era, i) => (
                  <motion.div 
                    key={i}
                    onMouseEnter={() => setActiveEra(i)}
                    style={{ 
                      padding: '1.5rem', borderRadius: '25px', border: '1px solid',
                      borderColor: i === activeEra ? C.cloud : 'rgba(255,255,255,0.05)',
                      background: i === activeEra ? C.cloud + '10' : 'transparent',
                      transition: '0.3s', cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <div style={{ color: i === activeEra ? C.cloud : '#475569' }}>{era.icon}</div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{era.title}</h4>
                        {activeEra === i && <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>{era.desc}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Transformación Digital */}
        <section style={{ marginBottom: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
          <div style={{ background: 'linear-gradient(135deg, ' + C.card + ', #000)', padding: '4rem', borderRadius: '45px', borderLeft: `8px solid ${C.transform}` }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: C.transform }}>Transformación Digital</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
              No es solo comprar tecnología; es repensar el modelo de negocio para centrarse en los datos, la agilidad y la colaboración ubicua.
            </p>
          </div>

          <div style={{ background: C.card, padding: '4rem', borderRadius: '45px', border: '1.5px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <Rocket size={56} color={C.cloud} style={{ margin: '0 auto 2rem' }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem' }}>Impacto Industrial</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
              La <strong>Industria 4.0</strong> conecta sensores, robots e IA para crear procesos de producción infinitamente más eficientes.
            </p>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: C.card, padding: '4rem', borderRadius: '50px', border: `3px solid ${C.cloud}`, boxShadow: '0 30px 60px rgba(46,213,115,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Globe size={52} color={C.cloud} style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: Cultura Digital</h2>
          </div>
          <QuizBlock 
            questions={CULTURA_QUESTS} 
            accentColor={C.cloud}
            clase="Clase 7: Cultura digital"
            unidad="Unidad 2"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default CulturaDigital;
