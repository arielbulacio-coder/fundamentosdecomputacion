import { useState } from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import RepasoClave from '../components/RepasoClave';
import {
  Shield, Zap, Eye, EyeOff, AlertTriangle, Fingerprint, Lock, RefreshCw
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

// Cifrado César: desplaza cada letra del alfabeto
const caesarEncrypt = (text, shift) => {
  return text.split('').map(char => {
    if (/[a-zA-Z]/.test(char)) {
      const base = char >= 'a' ? 97 : 65;
      return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
    }
    return char;
  }).join('');
};

// Hash visual determinístico (no criptográfico — solo para demostración didáctica)
const fakeHash = (text) => {
  if (!text) return '—';
  let h = 0x9e3779b9;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x85ebca6b);
    h ^= h >>> 13;
  }
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  h ^= h >>> 16;
  const h2 = h ^ (text.length * 0xdeadbeef);
  const part = (n) => (n >>> 0).toString(16).padStart(8, '0');
  return `${part(h)}${part(h2)}${part(h ^ 0xabcdef12)}${part(h2 ^ 0x87654321)}`;
};

const getPasswordStrength = (pwd) => {
  let score = 0;
  const checks = [
    { ok: pwd.length >= 8, label: '8+ caracteres' },
    { ok: pwd.length >= 12, label: '12+ caracteres' },
    { ok: /[A-Z]/.test(pwd), label: 'Mayúsculas' },
    { ok: /[a-z]/.test(pwd), label: 'Minúsculas' },
    { ok: /[0-9]/.test(pwd), label: 'Números' },
    { ok: /[^A-Za-z0-9]/.test(pwd), label: 'Símbolos (!@#...)' },
  ];
  score = checks.filter(c => c.ok).length;
  const levels = [
    { label: 'Muy débil', color: '#ef4444' },
    { label: 'Débil', color: '#f97316' },
    { label: 'Regular', color: '#f59e0b' },
    { label: 'Buena', color: '#84cc16' },
    { label: 'Fuerte', color: '#22c55e' },
    { label: 'Muy fuerte', color: '#10b981' },
  ];
  return { score, checks, level: levels[Math.min(score, levels.length - 1)] };
};

const CipherSimulator = () => {
  const [activeTab, setActiveTab] = useState('caesar');
  const [plainText, setPlainText] = useState('Hola Mundo');
  const [shift, setShift] = useState(3);
  const [hashText, setHashText] = useState('fundamentos');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const encrypted = caesarEncrypt(plainText, shift);
  const decrypted = caesarEncrypt(encrypted, 26 - shift);
  const hashResult = fakeHash(hashText);
  const hashModified = fakeHash(hashText + ' ');
  const pwdStrength = getPasswordStrength(password);

  const TAB_STYLE = (active) => ({
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '0.85rem',
    background: active ? '#ef444430' : 'transparent',
    color: active ? '#ef4444' : '#64748b',
    borderBottom: active ? '2px solid #ef4444' : '2px solid transparent',
    transition: '0.2s'
  });

  return (
    <div style={{ background: '#111', padding: 'clamp(1.5rem, 4vw, 4rem)', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)', marginBottom: '6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Lock color="#ef4444" size={42} style={{ margin: '0 auto 1rem' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Laboratorio de Criptografía</h2>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
          Experimenta con cifrado, funciones hash e integridad de contraseñas de forma interactiva.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0' }}>
        {[
          { id: 'caesar', label: 'Cifrado César' },
          { id: 'hash', label: 'Función Hash' },
          { id: 'password', label: 'Fortaleza de Contraseña' }
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={TAB_STYLE(activeTab === t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: César */}
      {activeTab === 'caesar' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            El <strong style={{ color: '#f8fafc' }}>Cifrado César</strong> desplaza cada letra del alfabeto <strong style={{ color: '#ef4444' }}>N</strong> posiciones. Es el cifrado sustitutivo más antiguo (usado por Julio César). Aunque hoy es trivial romperlo por análisis de frecuencia, es la base conceptual del cifrado simétrico.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '2rem', marginBottom: '2rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Texto Original</label>
              <input
                value={plainText}
                onChange={e => setPlainText(e.target.value)}
                maxLength={60}
                style={{ width: '100%', background: '#1e293b', border: '2px solid rgba(255,255,255,0.08)', borderRadius: '15px', padding: '1rem 1.25rem', color: '#f8fafc', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ minWidth: '140px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Desplazamiento: {shift}</label>
              <input
                type="range" min="1" max="25" value={shift}
                onChange={e => setShift(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#ef4444' }}
              />
            </div>
          </div>

          {/* Resultado */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: '#0f172a', borderRadius: '20px', padding: '1.5rem', borderLeft: '4px solid #ef4444' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Texto Cifrado (desplaz. +{shift})</div>
              <div style={{ fontFamily: 'monospace', fontSize: '1.15rem', fontWeight: 800, color: '#ef4444', wordBreak: 'break-all' }}>{encrypted}</div>
            </div>
            <div style={{ background: '#0f172a', borderRadius: '20px', padding: '1.5rem', borderLeft: '4px solid #22c55e' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Descifrado (desplaz. -{shift})</div>
              <div style={{ fontFamily: 'monospace', fontSize: '1.15rem', fontWeight: 800, color: '#22c55e', wordBreak: 'break-all' }}>{decrypted}</div>
            </div>
          </div>

          {/* Tabla de sustitución */}
          <div style={{ background: '#0f172a', borderRadius: '20px', padding: '1.5rem', overflowX: 'auto' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 800, marginBottom: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Alfabeto de sustitución (primeras 13 letras)</div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {'ABCDEFGHIJKLM'.split('').map(c => (
                <div key={c} style={{ textAlign: 'center', minWidth: '32px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>{c}</div>
                  <div style={{ width: '1px', height: '12px', background: '#334155', margin: '2px auto' }} />
                  <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 800 }}>
                    {String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab: Hash */}
      {activeTab === 'hash' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            Una <strong style={{ color: '#f8fafc' }}>función Hash</strong> convierte cualquier entrada en una cadena de longitud fija. Es <strong style={{ color: '#ef4444' }}>irreversible</strong> y <strong style={{ color: '#ef4444' }}>determinística</strong>. Un cambio mínimo en el texto produce un hash completamente diferente (<em>efecto avalancha</em>).
          </p>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Texto de entrada</label>
            <input
              value={hashText}
              onChange={e => setHashText(e.target.value)}
              maxLength={80}
              style={{ width: '100%', background: '#1e293b', border: '2px solid rgba(255,255,255,0.08)', borderRadius: '15px', padding: '1rem 1.25rem', color: '#f8fafc', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ background: '#0f172a', borderRadius: '20px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Hash de: "<span style={{ color: '#f8fafc' }}>{hashText || '—'}</span>"</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 800, color: '#a855f7', wordBreak: 'break-all' }}>{hashResult}</div>
            </div>
            <div style={{ background: '#0f172a', borderRadius: '20px', padding: '1.5rem', position: 'relative' }}>
              <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Hash de: "<span style={{ color: '#f8fafc' }}>{hashText || '—'}</span><span style={{ color: '#ef4444' }}> </span>" (+ 1 espacio)
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 800, color: '#f59e0b', wordBreak: 'break-all' }}>{hashModified}</div>
            </div>
          </div>

          <div style={{ background: '#1e293b', borderRadius: '15px', padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <AlertTriangle size={18} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              <strong style={{ color: '#f59e0b' }}>Nota didáctica:</strong> Este hash es una simulación simplificada para visualizar el efecto avalancha. Los algoritmos reales de seguridad son SHA-256, SHA-3, bcrypt, etc.
            </p>
          </div>
        </motion.div>
      )}

      {/* Tab: Password */}
      {activeTab === 'password' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            Una contraseña segura combina <strong style={{ color: '#f8fafc' }}>longitud, variedad de caracteres y aleatoriedad</strong>. Los atacantes usan diccionarios y fuerza bruta — cuanto más compleja, más combinaciones deben probar.
          </p>
          <div style={{ marginBottom: '2rem', position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Tu contraseña</label>
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Escribí una contraseña..."
              style={{ width: '100%', background: '#1e293b', border: `2px solid ${pwdStrength.level.color}40`, borderRadius: '15px', padding: '1rem 3.5rem 1rem 1.25rem', color: '#f8fafc', fontSize: '1rem', boxSizing: 'border-box' }}
            />
            <button
              onClick={() => setShowPwd(s => !s)}
              style={{ position: 'absolute', right: '1rem', top: '2.4rem', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {password && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Barra de fortaleza */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Fortaleza</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 900, color: pwdStrength.level.color }}>{pwdStrength.level.label}</span>
                </div>
                <div style={{ height: '10px', background: '#1e293b', borderRadius: '5px', overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: `${(pwdStrength.score / 6) * 100}%` }}
                    style={{ height: '100%', background: pwdStrength.level.color, borderRadius: '5px', transition: '0.4s' }}
                  />
                </div>
              </div>

              {/* Checklist */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '0.75rem' }}>
                {pwdStrength.checks.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', background: '#0f172a', padding: '0.75rem 1rem', borderRadius: '12px' }}>
                    <span style={{ fontSize: '1rem', color: c.ok ? '#22c55e' : '#334155' }}>{c.ok ? '✓' : '○'}</span>
                    <span style={{ fontSize: '0.8rem', color: c.ok ? '#f8fafc' : '#475569', fontWeight: c.ok ? 700 : 400 }}>{c.label}</span>
                  </div>
                ))}
              </div>

              {/* Tiempo estimado de crack */}
              <div style={{ marginTop: '1.5rem', background: '#0f172a', borderRadius: '15px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Resistencia estimada (fuerza bruta)</span>
                <span style={{ fontWeight: 800, color: pwdStrength.level.color, fontSize: '0.9rem' }}>
                  {pwdStrength.score <= 1 ? 'Segundos' :
                   pwdStrength.score === 2 ? 'Minutos' :
                   pwdStrength.score === 3 ? 'Horas' :
                   pwdStrength.score === 4 ? 'Años' :
                   pwdStrength.score === 5 ? 'Décadas' : 'Siglos'}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '3rem' }}>
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
        <section style={{ marginBottom: '6rem', background: '#111', padding: 'clamp(1.5rem, 4vw, 5rem) clamp(1.5rem, 4vw, 3.5rem)', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '4rem', alignItems: 'center' }}>
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

        {/* Laboratorio de Criptografía */}
        <CipherSimulator />

        <RepasoClave
          accentColor="#ef4444"
          title="Ciberseguridad y Ética"
          facts={[
            { icon: '🛡️', term: 'Tríada CIA', def: 'Confidencialidad (solo autorizados ven los datos) + Integridad (no alterados) + Disponibilidad (accesibles cuando se necesitan).' },
            { icon: '🎣', term: 'Phishing', def: 'Suplantación de identidad por correo o web falsa para robar credenciales. Es la técnica de Ingeniería Social más extendida.' },
            { icon: '💰', term: 'Ransomware', def: 'Cifra los archivos del usuario y exige pago (criptomonedas) para recuperarlos. Uno de los ataques más lucrativos y devastadores.' },
            { icon: '🔑', term: 'Cifrado Simétrico vs Asimétrico', def: 'Simétrico: misma clave para cifrar/descifrar (rápido). Asimétrico: par clave pública/privada (base de HTTPS y firmas digitales).' },
            { icon: '🔢', term: 'Función Hash', def: 'Convierte datos en cadena de longitud fija. Irreversible. Efecto avalancha: un mínimo cambio en la entrada cambia todo el hash.' },
            { icon: '📱', term: '2FA (Doble Factor)', def: 'Segunda capa de verificación: algo que sabes (contraseña) + algo que tenés (código al celular). Reduce hackeos en ~99%.' },
          ]}
        />

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: 'clamp(1.5rem, 4vw, 4rem)', borderRadius: '50px', border: '3px solid #ef4444', boxShadow: '0 30px 60px rgba(239,68,68,0.1)' }}>
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
