import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Lock, ShieldCheck, RefreshCw, AlertTriangle, Users,
  Terminal, Shield, Eye, Key, Fingerprint, Globe, Scale
} from 'lucide-react';

const QUESTIONS = [
  {
    q: '¿Qué significa la "C" en la Tríada CIA de la seguridad informática?',
    opts: ['Control', 'Confidencialidad', 'Criptografía', 'Certificación'],
    a: 1,
    exp: 'Confidencialidad previene que personas no autorizadas accedan a la información. Se garantiza con cifrado, autenticación y control de accesos estricto.'
  },
  {
    q: '¿Qué significa la "I" en la Tríada CIA?',
    opts: ['Identificación', 'Inteligencia', 'Integridad', 'Internet'],
    a: 2,
    exp: 'Integridad asegura que los datos no hayan sido alterados de forma no autorizada. Se verifica mediante hashing (SHA-256, MD5) y firmas digitales.'
  },
  {
    q: '¿Cuál es un ejemplo de amenaza a la "Disponibilidad"?',
    opts: ['Phishing por email', 'Ataque DDoS que satura los servidores', 'Un keylogger', 'SQL Injection'],
    a: 1,
    exp: 'Un ataque DDoS (Distributed Denial of Service) inunda un servidor con tráfico hasta dejarlo inaccesible, comprometiendo la Disponibilidad.'
  },
  {
    q: '¿Qué es el "phishing"?',
    opts: ['Un tipo de virus que borra archivos', 'Un ataque de ingeniería social que suplanta identidades para robar credenciales', 'Un protocolo de red seguro', 'Una técnica de cifrado avanzada'],
    a: 1,
    exp: 'El phishing engaña al usuario haciéndolo creer que interactúa con una entidad legítima (banco, empresa), para robar su usuario, contraseña u otros datos sensibles.'
  },
  {
    q: '¿Qué es un "Zero-Day" en ciberseguridad?',
    opts: ['Un antivirus nuevo sin licencia', 'Una vulnerabilidad desconocida por el fabricante, sin parche disponible', 'Un backup realizado a medianoche', 'Una contraseña de solo ceros'],
    a: 1,
    exp: 'Una vulnerabilidad Zero-Day es aquella que el fabricante del software desconoce, por lo que no hay parche. Los atacantes la explotan antes de que se publique una solución.'
  },
  {
    q: '¿Qué es el cifrado (criptografía)?',
    opts: ['Comprimir archivos para ahorrar espacio', 'Convertir datos en un formato ilegible para quienes no tienen la clave', 'Borrar datos de forma segura', 'Hacer copias de seguridad en la nube'],
    a: 1,
    exp: 'La criptografía transforma datos (plaintext) en un formato cifrado (ciphertext) usando algoritmos matemáticos. Solo quien posee la clave puede descifrarlos.'
  },
  {
    q: '¿Cuál es la Tríada completa de la Seguridad Informática?',
    opts: ['Control, Identidad y Autoridad', 'Confidencialidad, Integridad y Disponibilidad', 'Cables, Internet y Aplicaciones', 'Software, Hardware y Datos'],
    a: 1,
    exp: 'CIA (Confidentiality, Integrity, Availability) es el modelo fundamental de la seguridad informática desde los años 80. Toda política de seguridad debe garantizar estos tres pilares.'
  },
  {
    q: '¿Qué responsabilidad ética tiene un desarrollador respecto a los datos personales de los usuarios?',
    opts: ['Ninguna, es responsabilidad del usuario', 'Protegerlos con cifrado y cumplir las leyes de privacidad (GDPR, Ley 25326)', 'Venderlos si la empresa lo necesita', 'Solo guardarlos en texto plano por simplicidad'],
    a: 1,
    exp: 'El desarrollador es guardián técnico de la privacidad. Debe aplicar "Privacy by Design", cifrar datos sensibles, cumplir leyes como el GDPR o la Ley Argentina 25326 de Protección de Datos.'
  }
];

const SeguridadInformatica = () => {
  const [activeCIA, setActiveCIA] = useState(null);

  const ciaTriad = [
    { id: 'C', title: 'Confidencialidad', desc: 'Prevenir que personas no autorizadas accedan a los datos. Cifrado AES-256, MFA, control de accesos.', Icon: Lock, color: '#ef4444' },
    { id: 'I', title: 'Integridad', desc: 'Asegurar que la información no haya sido alterada. Hashing SHA-256, firmas digitales, control de versiones.', Icon: ShieldCheck, color: '#16a34a' },
    { id: 'A', title: 'Disponibilidad', desc: 'Garantizar acceso cuando se necesite. Redundancia, CDN, protección anti-DDoS, backups automáticos.', Icon: RefreshCw, color: '#3b82f6' }
  ];

  const vulnerabilidades = [
    { title: 'Social Engineering', type: 'Factor Humano', desc: 'El phishing explota la confianza y la urgencia. Más del 80% de los ataques exitosos comienzan aquí.', Icon: Users },
    { title: 'Malware & Ransomware', type: 'Software Malicioso', desc: 'Programas diseñados para espiar, dañar o secuestrar datos exigiendo rescate en criptomonedas.', Icon: AlertTriangle },
    { title: 'Zero-Day Flaws', type: 'Vulnerabilidades Técnicas', desc: 'Bugs desconocidos por el fabricante que permiten acceso no autorizado antes de existir un parche.', Icon: Terminal }
  ];

  return (
    <LockedContent keyword="seguridad" title="Clase 11: Seguridad Informática" unit={4}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #ef4444, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Seguridad, Privacidad y Ética
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              En la era de la información, proteger los datos es proteger la libertad individual y la estabilidad de toda la sociedad digital.
            </p>
          </motion.div>
        </header>

        {/* Tríada CIA */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {ciaTriad.map((item, i) => (
                <motion.div key={i} onMouseEnter={() => setActiveCIA(i)} style={{ padding: '2.5rem', borderRadius: '30px', border: '1.5px solid', borderColor: activeCIA === i ? item.color : 'rgba(255,255,255,0.05)', background: activeCIA === i ? item.color + '10' : '#1e293b', cursor: 'pointer', transition: '0.3s' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ color: item.color, flexShrink: 0 }}><item.Icon size={32} /></div>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{item.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.75rem', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <img src="/assets/cyber_security_shield_cia_1775235507133.png" alt="CIA Triad Shield" style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(239,68,68,0.2)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
            </div>
          </div>
        </section>

        {/* Teoría Expandida */}
        <section style={{ marginBottom: '6rem', background: '#1e293b', padding: '5rem 3rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900 }}>Conceptos Clave</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {[
              { Icon: Key, color: '#f59e0b', title: 'Criptografía', desc: 'Transforma datos legibles (plaintext) en datos cifrados (ciphertext) usando algoritmos matemáticos. AES-256 es el estándar actual del gobierno de EEUU para datos top secret.' },
              { Icon: Fingerprint, color: '#8b5cf6', title: 'Autenticación Multifactor', desc: 'Requiere dos o más pruebas de identidad: algo que sabés (contraseña), algo que tenés (token), algo que sos (biometría). Reduce los ataques en más del 99%.' },
              { Icon: Eye, color: '#ef4444', title: 'Ingeniería Social', desc: 'Manipulación psicológica que explota la confianza humana. No necesita hackear sistemas; hackea personas. El eslabón más débil siempre es el humano.' },
              { Icon: Globe, color: '#10b981', title: 'HTTPS y TLS', desc: 'Transport Layer Security cifra las comunicaciones entre tu navegador y el servidor. El candado verde confirma que la conexión es privada e íntegra.' },
              { Icon: Scale, color: '#3b82f6', title: 'Ética y Privacidad', desc: 'El GDPR (Europa) y la Ley 25326 argentina obligan a empresas a proteger datos personales. Los desarrolladores tienen responsabilidad legal y moral por las vulnerabilidades que introducen.' },
              { Icon: Shield, color: '#f59e0b', title: 'Defensa en Profundidad', desc: 'La seguridad real usa múltiples capas: firewall, antivirus, cifrado, backups, formación del usuario. Si una capa falla, las demás contienen el daño.' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <item.Icon size={32} color={item.color} style={{ marginBottom: '1.25rem' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Amenazas */}
        <section style={{ marginBottom: '6rem', padding: '5rem 3rem', borderRadius: '55px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', border: '1.5px solid rgba(239,68,68,0.15)' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4.5rem', fontWeight: 900, color: '#ef4444' }}>Ciberamenazas del Mundo Real</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {vulnerabilidades.map((v, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: '#ef4444', marginBottom: '1.5rem' }}><v.Icon size={40} style={{ margin: '0 auto' }} /></div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>{v.title}</h3>
                <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 800, letterSpacing: '1px', marginBottom: '1rem', textTransform: 'uppercase' }}>{v.type}</div>
                <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #ef4444', boxShadow: '0 30px 60px rgba(239,68,68,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Shield size={52} color="#ef4444" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación: Ciberseguridad</h2>
          </div>
          <QuizBlock
            questions={QUESTIONS}
            accentColor="#ef4444"
            clase="Clase 11: Seguridad Informática"
            unidad="Unidad 4"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default SeguridadInformatica;
