import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import {
  Globe, Share2, Zap, ZapOff, Shield, Database, Smartphone,
  Cpu, Users, Info, Rocket, CheckCircle, BarChart3
} from 'lucide-react';

const INDUSTRIA4_PILLARS = [
  { id: 'iot', label: 'IoT', icon: '📡', color: '#2ed573', desc: 'Internet de las Cosas: Objetos físicos con sensores conectados a internet. Heladeras que piden compras, fábricas que se auto-diagnostican, ropa que mide tu salud.', ejemplo: 'Amazon Echo, sensores de temperatura industriales, autos Tesla.' },
  { id: 'bigdata', label: 'Big Data', icon: '🌊', color: '#3b82f6', desc: 'Análisis de volúmenes de datos masivos (las 3 V: Volumen, Velocidad, Variedad). Permite encontrar patrones imposibles de ver manualmente.', ejemplo: 'Netflix predice qué vas a ver, Spotify crea tu playlist, bancos detectan fraudes.' },
  { id: 'ia', label: 'Inteligencia Artificial', icon: '🧠', color: '#a855f7', desc: 'Sistemas que aprenden de los datos para tomar decisiones (Machine Learning). La IA no piensa, optimiza una función matemática.', ejemplo: 'GPT, reconocimiento facial, diagnóstico médico por imágenes, conducción autónoma.' },
  { id: 'cloud', label: 'Cloud Computing', icon: '☁️', color: '#00f2ff', desc: 'Computación bajo demanda: alquilás procesamiento y almacenamiento remoto en lugar de comprarlo. Pago por uso.', ejemplo: 'AWS (Amazon), Azure (Microsoft), Google Cloud. Startups sin servidores propios.' },
  { id: 'robotics', label: 'Robótica Avanzada', icon: '🤖', color: '#f59e0b', desc: 'Robots colaborativos (cobots) que trabajan junto a humanos en líneas de producción. Precisión de micrones y operación 24/7.', ejemplo: 'Brazos robóticos de Tesla, drones de reparto de Amazon.' },
  { id: '3d', label: 'Manufactura Aditiva', icon: '🖨️', color: '#ef4444', desc: 'Impresión 3D industrial: construye objetos capa por capa desde diseño digital. Elimina moldes y reduce desechos al mínimo.', ejemplo: 'Prótesis médicas, piezas aeroespaciales, casas de concreto impresas.' },
];

const BRECHA_DIGITAL_DATA = [
  { region: 'Europa Occ.', acceso: 93, habilidades: 71 },
  { region: 'América del Norte', acceso: 91, habilidades: 68 },
  { region: 'América Latina', acceso: 68, habilidades: 42 },
  { region: 'Asia-Pac.', acceso: 64, habilidades: 38 },
  { region: 'África Subsah.', acceso: 28, habilidades: 14 },
];

const Industria4Explorer = () => {
  const [selected, setSelected] = useState(null);
  const current = INDUSTRIA4_PILLARS.find(p => p.id === selected);
  return (
    <div style={{ background: '#0f172a', padding: '3rem', borderRadius: '40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {INDUSTRIA4_PILLARS.map(p => (
          <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)} style={{
            padding: '1.5rem 1rem', borderRadius: '20px', border: '2px solid', cursor: 'pointer', transition: '0.3s', textAlign: 'center',
            borderColor: selected === p.id ? p.color : '#1e293b',
            background: selected === p.id ? `${p.color}20` : '#1e293b',
            color: selected === p.id ? p.color : '#94a3b8'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{p.icon}</div>
            <div style={{ fontWeight: 900, fontSize: '0.85rem' }}>{p.label}</div>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {current && (
          <motion.div key={current.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}>
            <div style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '25px', borderLeft: `5px solid ${current.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{current.icon}</span>
                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: current.color }}>{current.label}</h3>
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.8, marginBottom: '1rem' }}>{current.desc}</p>
              <div style={{ background: '#0f172a', padding: '1rem 1.5rem', borderRadius: '12px', borderLeft: `3px solid ${current.color}50` }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700 }}>EJEMPLOS REALES: </span>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{current.ejemplo}</span>
              </div>
            </div>
          </motion.div>
        )}
        {!current && (
          <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', color: '#475569', padding: '2rem' }}>
            ↑ Hacé clic en cualquier tecnología para explorarla
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const BrechaDigitalChart = () => {
  const [mode, setMode] = useState('acceso');
  return (
    <div style={{ background: '#0f172a', padding: '3rem', borderRadius: '40px' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', justifyContent: 'center' }}>
        {[{ id: 'acceso', label: '% Acceso a Internet', color: '#2ed573' }, { id: 'habilidades', label: '% Habilidades Digitales', color: '#a855f7' }].map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            padding: '0.8rem 1.5rem', borderRadius: '15px', border: '2px solid', cursor: 'pointer',
            borderColor: mode === m.id ? m.color : '#1e293b',
            background: mode === m.id ? `${m.color}20` : '#1e293b',
            color: mode === m.id ? m.color : '#64748b', fontWeight: 800, fontSize: '0.9rem'
          }}>{m.label}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {BRECHA_DIGITAL_DATA.map((d, i) => (
          <div key={d.region} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 60px', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 700 }}>{d.region}</span>
            <div style={{ background: '#1e293b', borderRadius: '10px', height: '28px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${d[mode]}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{ height: '100%', borderRadius: '10px', background: mode === 'acceso' ? 'linear-gradient(to right, #2ed573, #00f2ff)' : 'linear-gradient(to right, #a855f7, #3b82f6)' }}
              />
            </div>
            <span style={{ color: mode === 'acceso' ? '#2ed573' : '#a855f7', fontWeight: 900, fontSize: '1rem' }}>{d[mode]}%</span>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem', marginTop: '2rem' }}>
        Fuente: datos aproximados basados en informes ITU/UNESCO 2023
      </p>
    </div>
  );
};

const CULTURE_QUESTS = [
  { q: '¿Qué significan las siglas TICs?', opts: ['Técnicas de Información y Comunicación', 'Tecnologías del Internet y Calidad', 'Tecnologías de la Información y la Comunicación', 'Todo Internet Conectado'], a: 2, exp: 'Engloban las herramientas y métodos para procesar, guardar y transmitir información digital.' },
  { q: 'La "Convergencia Tecnológica" se refiere a:', opts: ['La unión de varias funciones (teléfono, cámara, internet) en un solo dispositivo', 'El choque de dos computadoras', 'Que todos usan la misma marca', 'Que el precio baja'], a: 0, exp: 'Tu smartphone es el mejor ejemplo de convergencia de cámara, radio, computadora y teléfono.' },
  { q: '¿Cuál es el impacto principal de las TICs en la globalización?', opts: ['Eliminar los idiomas', 'Permitir la comunicación y el comercio instantáneo sin fronteras físicas', 'Reducir el número de empresas', 'Hacer que todo sea más lento'], a: 1, exp: 'Permite que trabajes para empresas en otro continente en tiempo real.' },
  { q: '¿Qué es el "Teletrabajo"?', opts: ['Mirar televisión en el trabajo', 'Realizar actividades laborales a distancia mediante el uso de TICs', 'Arreglar televisores', 'No trabajar'], a: 1, exp: 'Ahorra costos de oficina y tiempos de transporte masivos.' },
  { q: 'En la industria, la automatización permite:', opts: ['Contratar más gente', 'Aumentar la productividad y precisión mediante el uso de robots y software de control', 'Hacer todo a mano', 'Bajar la calidad'], a: 1, exp: 'Reduce el error humano y permite producciones a escala masiva 24/7.' },
  { q: '¿Qué es un LMS (Learning Management System)?', opts: ['Un juego de carreras', 'Una plataforma para gestionar la enseñanza y el aprendizaje online (ej: Moodle, Classroom)', 'Un tipo de disco rígido', 'Un idioma antiguo'], a: 1, exp: 'Es el corazón de la educación a distancia moderna.' },
  { q: 'El E-commerce (Comercio Electrónico) de tipo B2C significa:', opts: ['Business to Client (Empresa al Consumidor Final)', 'Back to Computer', 'Bank to Center', 'Bitcoin to Cash'], a: 0, exp: 'Es la compra clásica en sitios como Amazon o Mercado Libre.' },
  { q: '¿Qué es la "Identidad Digital"?', opts: ['Tu foto de perfil', 'El conjunto de información publicada en internet sobre una persona (rastros, posts, perfiles)', 'Tu DNI escaneado', 'Una contraseña larga'], a: 1, exp: 'Se construye con cada acción que realizas en la red y forma tu reputación online.' },
  { q: '¿Cuál es el riesgo del "Ciberacoso" (Cyberbullying)?', opts: ['Que se rompa la pantalla', 'El acoso y hostigamiento mediante medios digitales que afecta la salud mental', 'Que te roben el mouse', 'Un mensaje de error'], a: 1, exp: 'Es una de las mayores problemáticas sociales en la era de los jóvenes hiperconectados.' },
  { q: 'La "Firma Digital" permite:', opts: ['Dibujar en la computadora', 'Garantizar la autoría e integridad de un documento electrónico con validez legal', 'Escribir rápido', 'Poner un sello de agua'], a: 1, exp: 'Equivale legalmente a la firma manuscrita en muchos países.' },
  { q: '¿Qué es el Internet de las Cosas (IoT)?', opts: ['Comprar cosas por internet', 'La interconexión digital de objetos cotidianos con internet (heladeras, focos, alarmas)', 'Un cable muy largo', 'Un buscador de objetos'], a: 1, exp: 'Permite que los objetos recolecten y compartan datos sin intervención humana.' },
  { q: 'Las "Smart Cities" utilizan las TICs para:', opts: ['Hacer que la gente se mude', 'Gestionar eficientemente recursos (tráfico, luz, agua) mediante sensores y datos', 'Vender entradas gratis', 'Construir más edificios'], a: 1, exp: 'Buscan la sostenibilidad y mejorar la calidad de vida urbana.' },
  { q: '¿Qué es el Big Data?', opts: ['Un disco muy grande', 'El procesamiento de volúmenes masivos de datos que superan la capacidad del software tradicional', 'Una base de datos de Excel', 'Un virus gigante'], a: 1, exp: 'Permite encontrar patrones predictivos imposibles de ver con pocos datos.' },
  { q: 'La "Economía Colaborativa" digital se ejemplifica con:', opts: ['Abrir un banco', 'Apps que conectan oferta y demanda directa (ej: Uber, Airbnb)', 'Comprar por catálogo', 'Vender hardware usado'], a: 1, exp: 'Optimiza el uso de recursos existentes (autos, casas) mediante plataformas digitales.' },
  { q: '¿A qué se refiere la "Ciudadanía Digital"?', opts: ['Votar por internet', 'El conjunto de derechos y deberes que tienen las personas en el entorno tecnológico', 'Tener una nacionalidad web', 'Saber usar el teclado'], a: 1, exp: 'Implica un uso responsable, ético y seguro de la red.' },
  { q: '¿Qué peligro representan los "Deepfakes"?', opts: ['Que el video sea pesado', 'La creación de videos sintéticos ultra-realistas que pueden suplantar la identidad de alguien', 'Que internet se corte', 'Un error de sistema'], a: 1, exp: 'Plantean graves retos para la veracidad de la información y la privacidad.' },
  { q: 'El "E-Government" (Gobierno Electrónico) busca:', opts: ['Votar siempre', 'Digitalizar trámites y servicios públicos para mayor transparencia y eficiencia', 'Que los políticos usen Mac', 'Borrar documentos'], a: 1, exp: 'Facilita la relación entre el ciudadano y el Estado mediante la red.' },
  { q: '¿Qué es la brecha de "Uso" de las TICs?', opts: ['Que el monitor se raye', 'La diferencia de habilidades para aprovechar la tecnología, más allá de tener acceso a ella', 'Que no haya WiFi', 'Un error de software'], a: 1, exp: 'No alcanza con tener la PC; hay que saber utilizarla para fines productivos o educativos.' },
  { q: 'El concepto de "Sostenibilidad Digital" implica:', opts: ['Que la PC dure 100 años', 'Reducir el impacto ambiental del hardware (e-waste) y el consumo energético de la red', 'Poner plantas en la oficina', 'Usar cargadores solares'], a: 1, exp: 'Es vital ante el crecimiento masivo de centros de datos y dispositivos desechables.' },
  { q: '¿Cuál es el futuro del trabajo ante la Inteligencia Artificial?', opts: ['Que desaparezcan todos los empleos', 'La transformación de tareas repetitivas y el surgimiento de nuevos roles de supervisión de IA', 'No habrá más computadoras', 'Todo será igual que ahora'], a: 1, exp: 'La IA no reemplaza humanos, sino a humanos que no saben usar IA por otros que sí.' }
];

const CulturaDigital = () => {
  return (
    <LockedContent keyword="tic" title="Clase 7: Transformación Digital" unit={2}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #2ed573, #7bed9f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Cultura Digital y Transformación
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              No es una época de cambios, es un cambio de época. Entiende cómo las TICs transforman la industria, la educación y nuestras vidas diarias.
            </p>
          </motion.div>
        </header>

        {/* Pilares de la Transformación Digital Ampliada */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
             {[
               { title: 'Conectividad Universal', icon: <Share2 />, color: '#2ed573', desc: 'El acceso a internet como un derecho habilitador. Permite la convergencia de datos de todo el mundo al instante.' },
               { title: 'Automatización e IA', icon: <Cpu />, color: '#3b82f6', desc: 'La delegación de tareas repetitivas y de análisis masivo a sistemas de software capaces de aprender.' },
               { title: 'Educación 4.0', icon: <Globe />, color: '#f59e0b', desc: 'Entornos de aprendizaje asincrónicos, personalizados y accesibles desde cualquier lugar del planeta.' },
               { title: 'Ciberseguridad Humana', icon: <Shield />, color: '#ef4444', desc: 'La protección de la identidad y la integridad del usuario en un entorno de exposición constante.' }
             ].map((p, i) => (
               <div key={i} style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', background: `${p.color}20`, color: p.color, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>{p.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{p.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>{p.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Análisis de Impacto Ampliado */}
        <section style={{ marginBottom: '6rem', background: '#111', padding: '5rem 3.5rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                 <img 
                   src="/assets/cultura_digital_transformation_1775236198314.png" 
                   alt="Digital Transformation" 
                   style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(46,213,115,0.2)' }} 
                 />
                 <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
              </div>
              <div>
                 <h2 style={{ fontSize: '2.3rem', fontWeight: 900, marginBottom: '2rem' }}>Nuevos Paradigmas</h2>
                 <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.1rem' }}>
                   La <strong>Economía del Conocimiento</strong> reemplaza a la economía industrial. Hoy el valor reside en los datos y la capacidad de procesarlos. Esto exige un ciudadano digital crítico y capaz de adaptarse a herramientas que evolucionan cada mes.
                 </p>
                 <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {[
                      { t: 'Smart Cities', d: 'Ciudades eficientes y sostenibles.' },
                      { t: 'IoT', d: 'La interconexión de todo lo físico.' },
                      { t: 'Industria 4.0', d: 'Fábricas inteligentes y conectadas.' },
                      { t: 'Big Data', d: 'Decisiones basadas en evidencia real.' }
                    ].map((item, id) => (
                      <div key={id} style={{ display: 'flex', gap: '1.5rem' }}>
                         <Rocket size={24} color="#2ed573" />
                         <div>
                            <h4 style={{ margin: 0, fontWeight: 800 }}>{item.t}</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{item.d}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Simulador: Industria 4.0 Explorer */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Rocket size={40} color="#2ed573" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Explorador: Industria 4.0</h2>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Los 6 pilares de la Cuarta Revolución Industrial. Hacé clic en cada tecnología para descubrir qué es y un ejemplo real.</p>
          </div>
          <Industria4Explorer />
        </section>

        {/* Simulador: Brecha Digital */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <BarChart3 size={40} color="#a855f7" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Visualizador: La Brecha Digital Global</h2>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Compará el acceso a internet con las habilidades digitales reales en distintas regiones del mundo.</p>
          </div>
          <BrechaDigitalChart />
        </section>

        <RepasoClave
          accentColor="#2ed573"
          title="Cultura Digital y TICs"
          facts={[
            { icon: '🌐', term: 'TICs', def: 'Tecnologías de Información y Comunicación: conjunto de herramientas digitales para crear, gestionar y compartir información.' },
            { icon: '🏭', term: 'Industria 4.0', def: 'Cuarta revolución industrial: IoT, Big Data, Inteligencia Artificial, Robótica, Cloud Computing y Manufactura Aditiva (3D).' },
            { icon: '🏙️', term: 'Smart Cities', def: 'Ciudades que usan sensores y TICs para optimizar servicios: tráfico inteligente, energía, salud pública y seguridad.' },
            { icon: '🎭', term: 'Deepfakes', def: 'Contenido multimedia falsificado con redes GAN (IA). Principal vector de desinformación y fraude en la era digital.' },
            { icon: '🏛️', term: 'E-government', def: 'Gobierno electrónico: trámites, votación y servicios públicos digitales. Aumenta la transparencia y reduce la burocracia.' },
            { icon: '👤', term: 'Ciudadanía Digital', def: 'Conjunto de derechos y responsabilidades en el entorno online: privacidad, respeto, veracidad, seguridad y participación.' },
          ]}
        />

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #2ed573', boxShadow: '0 30px 60px rgba(46,213,115,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <BarChart3 size={52} color="#2ed573" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: TICs y Cultura</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>20 preguntas para certificar tu dominio sobre la transformación digital de la sociedad.</p>
          </div>
          <QuizBlock 
            questions={CULTURE_QUESTS} 
            accentColor="#2ed573"
            clase="Clase 7: Transformación Digital"
            unidad="Unidad 2"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default CulturaDigital;
