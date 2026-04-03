import React from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Globe, Share2, Zap, ZapOff, Shield, Database, Smartphone, 
  Cpu, Users, Info, Rocket, CheckCircle, BarChart3
} from 'lucide-react';

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
