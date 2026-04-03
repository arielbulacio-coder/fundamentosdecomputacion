import React from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Users, Database, FileCode, Share2, Globe, 
  Settings, Layers, Info, CheckCircle, ShieldCheck
} from 'lucide-react';

const SOCIETY_QUESTS = [
  { q: '¿Qué es un Sistema de Información (SI)?', opts: ['Una computadora cara', 'Un conjunto de componentes que recolectan, procesan, almacenan y distribuyen información', 'Un sitio web', 'Un programa de mensajería'], a: 1, exp: 'Va más allá del hardware; incluye procesos, personas y datos organizados.' },
  { q: '¿Cuál es el orden correcto del ciclo de los datos?', opts: ['Proceso, Entrada, Salida', 'Entrada, Proceso, Almacenamiento, Salida', 'Salida, Almacenamiento, Entrada', 'Solo Almacenamiento'], a: 1, exp: 'Es el flujo universal: los datos entran, se transforman, se guardan y se entregan.' },
  { q: 'El Software de Sistema se encarga de:', opts: ['Editar fotos', 'Gestionar directamente el hardware y servir de base para otras aplicaciones', 'Navegar por internet', 'Calcular impuestos'], a: 1, exp: 'El ejemplo principal es el Sistema Operativo (Windows, Linux, macOS).' },
  { q: '¿Cuál es la diferencia clave del Software Libre?', opts: ['Que es gratis siempre', 'Que otorga libertades para usarlo, estudiarlo, modificarlo y redistribuirlo', 'Que no tiene virus', 'Que es más rápido'], a: 1, exp: 'Es una cuestión de libertad de acceso al código fuente, no necesariamente de costo.' },
  { q: '¿Qué es el Software Propietario o Privativo?', opts: ['Un software para empresas', 'Software cuyo código fuente no es público y tiene restricciones de copia y modificación', 'Software que se borra solo', 'Software muy caro'], a: 1, exp: 'El autor o la empresa retienen todos los derechos legales sobre el código.' },
  { q: '¿Qué significa SaaS (Software as a Service)?', opts: ['Un software que arregla la PC', 'Software que se ejecuta en la nube y se accede vía navegador (ej: Google Docs)', 'Software para servidores', 'Un manual técnico'], a: 1, exp: 'No instalas nada, consumes el servicio por suscripción o acceso remoto.' },
  { q: 'El término "Brecha Digital" se refiere a:', opts: ['Una falla en el disco rígido', 'La desigualdad en el acceso a las tecnologías de la información entre diferentes grupos', 'El espacio entre las teclas', 'Una caída de internet'], a: 1, exp: 'Afecta tanto por infraestructura, costo como por falta de conocimientos.' },
  { q: '¿Qué es el Software de Aplicación?', opts: ['El que controla el procesador', 'Programas diseñados para realizar tareas específicas para el usuario (ej: Word, Photoshop)', 'Los cables de la PC', 'Un tipo de virus'], a: 1, exp: 'Son las herramientas que usamos directamente para nuestro trabajo o diversión.' },
  { q: 'Una licencia de tipo "Copyleft" obliga a:', opts: ['Cobrar por cada copia', 'Que las versiones modificadas del software sigan siendo libres', 'Borrar el código fuente', 'No usarlo en empresas'], a: 1, exp: 'Garantiza que el software nunca deje de ser libre aunque sea mejorado por otros.' },
  { q: '¿Para qué sirve el Middleware?', opts: ['Para limpiar el monitor', 'Para permitir la comunicación y gestión de datos entre aplicaciones o servicios distintos', 'Para acelerar el arranque', 'Para guardar archivos'], a: 1, exp: 'Es como un "pegamento" de software que une sistemas complejos.' },
  { q: 'En el ciclo de vida del software, la etapa de "Mantenimiento" sirve para:', opts: ['Instalar Windows de cero', 'Corregir errores detectados y actualizar el software según nuevas necesidades', 'Vender el producto', 'No existe tal etapa'], a: 1, exp: 'Es la etapa más larga y costosa; garantiza que el software siga siendo útil.' },
  { q: '¿Qué es el "Open Source" (Código Abierto)?', opts: ['Software que se puede abrir con cualquier programa', 'Software cuyo código fuente está disponible públicamente para inspección y mejora', 'Software para abrir puertas', 'Un manual de usuario'], a: 1, exp: 'Es un enfoque de desarrollo colaborativo (ej: Linux, Android).' },
  { q: 'Un Sistema Operativo es un ejemplo de:', opts: ['Software de Aplicación', 'Software de Sistema', 'Software de Programación', 'Middleware'], a: 1, exp: 'Administra los recursos físicos y lógicos de la computadora.' },
  { q: 'El "Teletrabajo" se beneficia principalmente de las TICs para:', opts: ['Ahorrar luz', 'Permitir la colaboración remota y acceso a la información desde cualquier lugar', 'Comprar muebles de oficina', 'Vender hardware'], a: 1, exp: 'Ha transformado la dinámica laboral global gracias a internet.' },
  { q: '¿Qué es un SGBD (Sistema de Gestión de Bases de Datos)?', opts: ['Un disco duro externo', 'Software encargado de definir, crear y mantener bases de datos (ej: MySQL)', 'Un cable de red', 'Un procesador de palabras'], a: 1, exp: 'Permite manejar grandes volúmenes de información de forma estructurada.' },
  { q: '¿Cuál es la función de los Compiladores en el software de programación?', opts: ['Detectar virus', 'Traducir el código escrito por humanos a lenguaje de máquina (binario)', 'Instalar aplicaciones', 'Comprimir imágenes'], a: 1, exp: 'Sin ellos, el hardware no sabría cómo ejecutar las instrucciones de C++ o Java.' },
  { q: 'El término "Vertical Software" se aplica a programas que:', opts: ['Se instalan de pie', 'Atienden necesidades específicas de un nicho o industria (ej: software médico)', 'Son muy rápidos', 'Se usan en celulares'], a: 1, exp: 'A diferencia del software horizontal (como Excel) que es de uso general.' },
  { q: '¿Qué es la "Nube" (Cloud Computing) de forma técnica?', opts: ['Estar distraído', 'Servicios de computación ofrecidos a través de internet mediante servidores remotos', 'Un tipo de pantalla LED', 'El pronóstico del tiempo'], a: 1, exp: 'Incluye almacenamiento, procesamiento y redes como servicio.' },
  { q: '¿Qué problema ético plantean los "Algoritmos de Recomendación"?', opts: ['Que son lentos', 'Que pueden crear "burbujas de filtro" y sesgar la información que consume el usuario', 'Que gastan batería', 'Que son muy caros'], a: 1, exp: 'Limitan la exposición a ideas diferentes al mostrar solo lo que ya nos gusta.' },
  { q: '¿Para qué sirve el Versionado (ej: v1.0, v2.1)?', opts: ['Para que se vea más lindo', 'Para identificar y controlar los cambios en el software a lo largo del tiempo', 'Para cobrar más caro', 'Para ocupar más espacio'], a: 1, exp: 'Permite saber si el software es compatible y qué mejoras se incluyeron.' }
];

const SociedadSoftware = () => {
  return (
    <LockedContent keyword="datos" title="Clase 6: Información y Software" unit={2}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #00f2ff, #2ed573)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Sociedad, Información y Software
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              La tecnología no es solo silicio, es impacto social. Entiende cómo los sistemas de información y el software moldean nuestro mundo.
            </p>
          </motion.div>
        </header>

        {/* Teoría Ampliada: Categorías de Software */}
        <section style={{ marginBottom: '6rem' }}>
           <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '4rem', textAlign: 'center' }}>El Ecosistema del Software</h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
              {[
                { title: 'Software de Sistema', color: '#3b82f6', desc: 'Permite que el hardware funcione. Incluye Sistemas Operativos, Controladores de dispositivos (divers) y utilidades de bajo nivel.' },
                { title: 'Software de Aplicación', color: '#2ed573', desc: 'Programas finales para el usuario. Desde navegadores web y suites de oficina hasta juegos y editores de video profesionales.' },
                { title: 'Software de Programación', color: '#f59e0b', desc: 'Las herramientas de los creadores. Editores de texto, compiladores, depuradores e IDEs (Entornos de Desarrollo Integrados).' }
              ].map((s, i) => (
                <div key={i} style={{ background: '#1e293b', padding: '3rem', borderRadius: '45px', border: `1.5px solid ${s.color}30` }}>
                   <div style={{ fontSize: '0.8rem', fontWeight: 900, color: s.color, marginBottom: '1rem', letterSpacing: '1px' }}>CATEGORÍA</div>
                   <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>{s.title}</h3>
                   <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1rem' }}>{s.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Teoría Ampliada: Ciclo de Vida e Impacto */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
             <div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2rem' }}>El Ciclo de los Datos</h2>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '2rem' }}>
                  En un Sistema de Información, el dato recorre un camino vital: desde su <strong style={{ color: '#2ed573' }}>captura</strong> (sensores, teclado), su <strong style={{ color: '#2ed573' }}>procesamiento</strong> (ALU, algoritmos), su <strong style={{ color: '#2ed573' }}>almacenamiento</strong> (Bases de datos) y su comunicación final para la toma de decisiones.
                </p>
                <div style={{ display: 'grid', gap: '1rem' }}>
                   {[
                     'Sistemas ERP: Integran toda la empresa.',
                     'Sistemas de TICs: Impacto en salud y educación.',
                     'SaaS: El software como servicio en la nube.',
                     'Ética Digital: Sesgos en algoritmos de redes.'
                   ].map((t, j) => (
                     <div key={j} style={{ background: '#0f172a', padding: '1rem 1.5rem', borderRadius: '15px', borderLeft: '4px solid #00f2ff', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <CheckCircle size={18} color="#00f2ff" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{t}</span>
                     </div>
                   ))}
                </div>
             </div>
             <div style={{ position: 'relative' }}>
                <img 
                  src="/assets/sociedad_software_networks_1775236177650.png" 
                  alt="Social Software Networks" 
                  style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(46,213,115,0.2)' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
             </div>
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #00f2ff', boxShadow: '0 30px 60px rgba(0,242,255,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Users size={52} color="#00f2ff" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Sociedad e Información</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>20 preguntas para validar tu conocimiento sobre sistemas, software y su impacto actual.</p>
          </div>
          <QuizBlock 
            questions={SOCIETY_QUESTS} 
            accentColor="#00f2ff"
            clase="Clase 6: Sociedad y Software"
            unidad="Unidad 2"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default SociedadSoftware;
