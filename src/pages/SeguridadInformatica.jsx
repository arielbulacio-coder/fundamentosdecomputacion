import React from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Shield, Lock, Zap, Eye, Database, Settings, Globe, 
  Info, Smartphone, CheckCircle, AlertTriangle, Fingerprint, EyeOff
} from 'lucide-react';

const SECURITY_QUESTS = [
  { q: '¿Qué conforma la Tríada de la Seguridad (CIA)?', opts: ['Costo, Importancia, Acceso', 'Confidencialidad, Integridad, Disponibilidad', 'Cifrado, Identidad, Alarma', 'Código, Internet, Apps'], a: 1, exp: 'Son los tres pilares: asegurar que solo lo vean los autorizados, que no se altere y que siempre esté disponible.' },
  { q: '¿Qué es la Ingeniería Social?', opts: ['Estudiar sociología', 'Manipular psicológicamente a las personas para que revelen información confidencial', 'Construir redes sociales', 'Un tipo de procesador'], a: 1, exp: 'Es el "hackeo" del eslabón más débil de la cadena: el ser humano.' },
  { q: 'El ataque de Phishing consiste en:', opts: ['Robar una computadora física', 'Suplantar la identidad de una empresa confiable (ej: banco) mediante mail o web falsa para robar claves', 'Borrar el disco rígido', 'Instalar un cooler nuevo'], a: 1, exp: 'Es una técnica de engaño masiva para obtener credenciales.' },
  { q: '¿Cuál es la característica del Ransomware?', opts: ['Es gratis', 'Cifra los archivos del usuario y pide un rescate económico para liberarlos', 'Acelera la PC', 'Limpia los virus'], a: 1, exp: 'Es uno de los ataques más lucrativos y peligrosos de la actualidad.' },
  { q: '¿Qué significa Cifrado Simétrico?', opts: ['Que no tiene forma', 'Que usa la misma clave para cifrar y para descifrar el mensaje', 'Que usa dos claves diferentes', 'Que solo funciona en Linux'], a: 1, exp: 'Es rápido pero tiene el problema de cómo compartir la clave de forma segura.' },
  { q: '¿Cuál es la ventaja fundamental del Cifrado Asimétrico?', opts: ['Es más rápido', 'Usa un par de claves (Pública y Privada), eliminando la necesidad de compartir claves secretas', 'No usa matemáticas', 'No necesita internet'], a: 1, exp: 'Es la base de la seguridad en la web (HTTPS) y las firmas digitales.' },
  { q: '¿Qué es un Firewall (Cortafuegos)?', opts: ['Un programa para apagar incendios', 'Un sistema que filtra el tráfico de red entrante y saliente basándose en reglas de seguridad', 'Un componente que enfría la PC', 'Un tipo de antivirus'], a: 1, exp: 'Actúa como una barrera entre una red confiable e internet.' },
  { q: 'La Integridad de la información garantiza que:', opts: ['La información esté disponible siempre', 'La información no haya sido alterada de forma accidental o malintencionada', 'Nadie pueda leerla', 'El sistema sea rápido'], a: 1, exp: 'Se suele verificar mediante funciones Hash.' },
  { q: '¿Qué es el Segundo Factor de Autenticación (2FA)?', opts: ['Tener dos computadoras', 'Una capa extra de seguridad que requiere algo que sabes y algo que tienes (ej: código al celular)', 'Tener dos passwords iguales', 'Entrar con dos usuarios'], a: 1, exp: 'Aumenta drásticamente la seguridad aunque roben tu contraseña primaria.' },
  { q: '¿Qué es una vulnerabilidad de "Día Cero" (Zero-day)?', opts: ['Un error que se arregla en un día', 'Un fallo de seguridad desconocido por el fabricante que es atacado antes de que exista un parche', 'Un virus muy viejo', 'Un error de fecha'], a: 1, exp: 'Son las más críticas porque no hay defensa inmediata hasta que sale la actualización.' },
  { q: '¿Cuál es la función de un VPN?', opts: ['Aumentar la velocidad de descarga', 'Crear un túnel cifrado y seguro en una red pública para proteger la privacidad', 'Bajar juegos gratis', 'Arreglar el WiFi'], a: 1, exp: 'Virtual Private Network: oculta tu IP y cifra tu tráfico.' },
  { q: '¿Qué es un Troyano en informática?', opts: ['Un antivirus potente', 'Software malicioso que parece legítimo para engañar al usuario e instalarse', 'Un hacker famoso', 'Un tipo de registro'], a: 1, exp: 'Nombre en honor al caballo de madera de la mitología griega.' },
  { q: 'El término "Exploit" se refiere a:', opts: ['Un programa que borra todo', 'Un fragmento de software o comando que aprovecha una vulnerabilidad para ganar acceso', 'Un tipo de disco', 'Una marca de monitores'], a: 1, exp: 'Es la herramienta para aprovechar el fallo (vulnerabilidad).' },
  { q: '¿Qué busca un ataque de Denegación de Servicio (DoS)?', opts: ['Robar archivos', 'Saturar un servidor con tráfico falso para que deje de estar disponible para usuarios legítimos', 'Cifrar la base de datos', 'Cambiar la password del admin'], a: 1, exp: 'Afecta la "Disponibilidad" (Availability) de la tríada CIA.' },
  { q: 'Un "Hacker Ético" (Sombrero Blanco) es alguien que:', opts: ['Roba bancos', 'Usa sus conocimientos para encontrar fallos y reportarlos legalmente para que se arreglen', 'No sabe programar', 'Borra redes sociales'], a: 1, exp: 'Son profesionales vitales para la ciberseguridad corporativa.' },
  { q: '¿Cuál es la mayor vulnerabilidad en casi todos los sistemas?', opts: ['Los cables', 'La falta de parches de actualización y la conducta del usuario (contraseñas débiles, clics en links)', 'El procesador', 'El router'], a: 1, exp: 'Por eso la educación en seguridad es tan importante como la tecnología.' },
  { q: '¿Qué es el Principio de Menor Privilegio?', opts: ['Que nadie use la PC', 'Dar a cada usuario solo los permisos mínimos necesarios para realizar su trabajo', 'Que solo el jefe use la PC', 'Borrar todas las cuentas'], a: 1, exp: 'Reduce el daño potencial si una cuenta es comprometida.' },
  { q: '¿Para qué sirve el Backup (Copia de Respaldo)?', opts: ['Para ocupar espacio', 'Para recuperar la información ante fallas de hardware, ataques o borrado accidental', 'Para acelerar el disco', 'Para instalar el SO'], a: 1, exp: 'Es el último recurso de defensa ante la pérdida de datos.' },
  { q: '¿Qué es el Spyware?', opts: ['Software para espías de cine', 'Software que recolecta información sobre el usuario sin su consentimiento para enviarla a terceros', 'Un tipo de firewall', 'Un juego de sigilo'], a: 1, exp: 'Roba historial de navegación, capturas de pantalla y pulsaciones de teclas.' },
  { q: '¿Qué es el "Hachís" o Hash en seguridad?', opts: ['Una droga', 'Una función matemática que convierte datos en una cadena fija de longitud única para verificar integridad', 'Un tipo de cifrado asimétrico', 'El nombre de un procesador'], a: 1, exp: 'Un cambio mínimo en el archivo cambia el Hash totalmente.' }
];

const SeguridadInformatica = () => {
  return (
    <LockedContent keyword="etica" title="Clase 11: Seguridad y Ética" unit={4}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #ef4444, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Ciberseguridad y Ética
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              Protegiendo el mundo digital. Entiende los pilares de la seguridad, las amenazas modernas y el rol ético de quien construye tecnología.
            </p>
          </motion.div>
        </header>

        {/* Tríada de la Seguridad Ampliada */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '4rem', textAlign: 'center' }}>La Tríada CIA</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
             {[
               { title: 'Confidencialidad', icon: <EyeOff />, color: '#ef4444', desc: 'Asegurar que la información sea accesible únicamente por las personas o sistemas autorizados mediante cifrado y control de accesos.' },
               { title: 'Integridad', icon: <Fingerprint />, color: '#f59e0b', desc: 'Garantizar que los datos no sean alterados durante su almacenamiento o transporte, manteniendo su veracidad original.' },
               { title: 'Disponibilidad', icon: <Zap />, color: '#2ed573', desc: 'Asegurar que los usuarios autorizados tengan acceso a la información y recursos cuando los necesiten, sin interrupciones.' }
             ].map((cia, i) => (
               <div key={i} style={{ background: '#1e293b', padding: '3rem', borderRadius: '45px', border: `1.5px solid ${cia.color}30`, textAlign: 'center' }}>
                  <div style={{ width: '70px', height: '70px', background: `${cia.color}20`, color: cia.color, borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>{cia.icon}</div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '1.2rem' }}>{cia.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.8 }}>{cia.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Amenazas Modernas Ampliadas */}
        <section style={{ marginBottom: '6rem', background: '#111', padding: '5rem 3.5rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                 <img 
                   src="/assets/cyber_security_shield_cia_1775235507133.png" 
                   alt="Cybersecurity Shield" 
                   style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(239,68,68,0.2)' }} 
                 />
                 <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
              </div>
              <div>
                 <h2 style={{ fontSize: '2.3rem', fontWeight: 900, marginBottom: '2rem' }}>El Límite Ético</h2>
                 <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                   La seguridad no es solo técnica, es una responsabilidad social. El programador maneja datos sensibles y crea realidades digitales que afectan la privacidad y libertad de millones de personas.
                 </p>
                 <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {[
                      { t: 'Ingeniería Social', d: 'El factor humano es el eslabón más débil.' },
                      { t: 'Phishing y Ransomware', d: 'Las plagas digitales del siglo XXI.' },
                      { t: 'Privacidad por Diseño', d: 'La ética desde la primera línea de código.' },
                      { t: 'Legislación Digital', d: 'Leyes que protegen tu vida online (GDPR).' }
                    ].map((item, id) => (
                      <div key={id} style={{ display: 'flex', gap: '1.5rem' }}>
                         <AlertTriangle size={24} color="#ef4444" />
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
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #ef4444', boxShadow: '0 30px 60px rgba(239,68,68,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Shield size={52} color="#ef4444" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Seguridad</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>20 preguntas para validar tu conocimiento sobre protección de datos y ética informática.</p>
          </div>
          <QuizBlock 
            questions={SECURITY_QUESTS} 
            accentColor="#ef4444"
            clase="Clase 11: Seguridad y Ética"
            unidad="Unidad 4"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default SeguridadInformatica;
