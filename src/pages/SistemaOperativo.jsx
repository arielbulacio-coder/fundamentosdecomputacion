import React from 'react';
import { motion } from 'framer-motion';
import LockedContent from '../components/LockedContent';
import QuizBlock from '../components/QuizBlock';
import { 
  Server, Cpu, Database, Shield, Layers, Settings, Globe, 
  Info, Smartphone, CheckCircle, Activity, Layout
} from 'lucide-react';

const OS_QUESTS = [
  { q: '¿Qué es un Sistema Operativo?', opts: ['Un programa para navegar por internet', 'Software que administra los recursos de hardware y sirve de base para las aplicaciones', 'Un tipo de hardware especial', 'Una base de datos'], a: 1, exp: 'Es el intermediario crítico entre el usuario/aplicaciones y los fierros de la computadora.' },
  { q: '¿Cuál es la función del Kernel (Núcleo)?', opts: ['Dibujar las ventanas en la pantalla', 'Gestionar directamente la CPU, la memoria y los dispositivos', 'Cifrar archivos', 'Instalar juegos'], a: 1, exp: 'Es la parte central y más protegida del SO que tiene control absoluto del hardware.' },
  { q: 'El "Modo Usuario" se diferencia del "Modo Kernel" por:', opts: ['Tiene más colores', 'Las aplicaciones no tienen acceso directo al hardware por razones de seguridad', 'Es más rápido', 'Solo funciona con mouse'], a: 1, exp: 'Previene que un error en una aplicación (como Chrome) cuelgue todo el sistema.' },
  { q: '¿Qué es un Proceso en un SO?', opts: ['Un archivo guardado', 'Un programa en ejecución que consume recursos (CPU, RAM)', 'Una carpeta', 'Un virus'], a: 1, exp: 'Cuando haces clic en un icono, el programa pasa de ser algo estático en disco a ser un proceso vivo en RAM.' },
  { q: 'La "Planificación de la CPU" sirve para:', opts: ['Bajar el brillo', 'Decidir qué proceso usa el procesador en cada momento para que parezca que todos corren a la vez', 'Organizar los archivos', 'Medir la batería'], a: 1, exp: 'Es el algoritmo que crea la ilusión de la multitarea.' },
  { q: '¿Qué es el Sistema de Archivos (File System)?', opts: ['Un programa de oficina', 'La forma en que el SO organiza y almacena los datos en el disco (ej: NTFS, FAT32, ext4)', 'Una lista de contactos', 'El explorador de internet'], a: 1, exp: 'Determina cómo se nombran, guardan y recuperan los archivos.' },
  { q: '¿Qué sucede durante una "Llamada al Sistema" (System Call)?', opts: ['Te llaman por teléfono', 'Una aplicación pide un servicio protegido al Kernel (como leer un archivo)', 'Se apaga la PC', 'Se reinicia el router'], a: 1, exp: 'Es el puente legal que cruzan las apps para hablar con el hardware.' },
  { q: 'La técnica de "Paginación" en memoria sirve para:', opts: ['Hacer que el libro sea más corto', 'Dividir la memoria en trozos fijos para evitar la fragmentación externa', 'Cargar más rápido las páginas web', 'Tener más disco'], a: 1, exp: 'Permite que un proceso no necesite estar contiguo en toda la memoria RAM.' },
  { q: '¿Qué es el Interbloqueo (Deadlock)?', opts: ['Cuando se rompe el teclado', 'Una situación donde dos procesos se esperan mutuamente para liberar un recurso y nadie avanza', 'Un virus que bloquea carpetas', 'Cuando se llena el disco'], a: 1, exp: 'Es el "abrazo mortal" que congela procesos.' },
  { q: '¿Cuál es la función de los Controladores (Drivers)?', opts: ['Manejar camiones', 'Software que enseña al SO cómo hablar con un hardware específico (ej: impresora o GPU)', 'Acelerar la PC', 'Bajar drivers de red'], a: 1, exp: 'Sin ellos, el SO no sabría qué señales enviar a cada dispositivo diferente.' },
  { q: '¿Qué significa que un SO sea Multitarea?', opts: ['Que tiene muchas carpetas', 'Que puede ejecutar (o parecer que ejecuta) varios procesos de forma simultánea', 'Que es para muchos usuarios', 'Que es muy grande'], a: 1, exp: 'Permite escuchar música mientras escribes y descargas archivos.' },
  { q: 'La Interfaz de Línea de Comandos (CLI) es:', opts: ['Una pantalla con fotos', 'Una interfaz basada exclusivamente en texto donde el usuario escribe órdenes', 'El cable de video', 'Un tipo de procesador'], a: 1, exp: 'Es más eficiente y potente para administradores de sistemas (ej: Terminal, CMD).' },
  { q: '¿Qué es un Hilo (Thread)?', opts: ['Un cable de conexión', 'La unidad de ejecución más pequeña dentro de un proceso', 'Una parte del disco', 'Un mensaje de chat'], a: 1, exp: 'Un solo proceso (como un navegador) puede tener muchos hilos trabajando a la vez.' },
  { q: 'El "Spooling" se ejemplifica comúnmente con:', opts: ['Mirar un video', 'La cola de impresión que guarda los trabajos en disco hasta que la impresora esté lista', 'Mover carpetas', 'Instalar Windows'], a: 1, exp: 'Permite que la CPU se libere rápido aunque el periférico sea lento.' },
  { q: 'Un Sistema Operativo de Tiempo Real (RTOS) es vital en:', opts: ['Oficinas', 'Sistemas críticos donde el tiempo de respuesta debe ser exacto (ej: frenos de autos, satélites)', 'Juegos casuales', 'Escuelas'], a: 1, exp: 'Aquí un retraso de milisegundos puede ser fatal.' },
  { q: '¿Qué es la Shell del sistema?', opts: ['El caparazón del disco', 'El intérprete de comandos que sirve de interfaz entre el usuario y el Kernel', 'Un tipo de virus', 'El cooler del CPU'], a: 1, exp: 'Ejemplos son Bash en Linux o PowerShell en Windows.' },
  { q: 'El "Monolithic Kernel" (Núcleo Monolítico) se caracteriza por:', opts: ['Ser muy pequeño', 'Tener todos los servicios del SO (drivers, redes) dentro del espacio de memoria del Kernel', 'No tener drivers', 'Ser virtual'], a: 1, exp: 'Es el diseño de Linux: muy rápido pero un error en un driver puede tirar todo el sistema.' },
  { q: '¿Qué es una Interrupción de Software (Trap/Exception)?', opts: ['Que se cuelgue la PC', 'Una señal generada por un error (dividir por cero) o una petición especial de una app', 'Un mensaje de WhatsApp', 'Un cortocircuito'], a: 1, exp: 'El SO toma el control para manejar la situación o cerrar la app problemática.' },
  { q: 'La Gestión de E/S (Entrada/Salida) en un SO usa "Buffering" para:', opts: ['Limpiar el disco', 'Sincronizar dispositivos de diferentes velocidades almacenando datos intermedios en RAM', 'Aumentar el volumen', 'Cargar fotos'], a: 1, exp: 'Evita que el sistema espere a cada bit que viene de un dispositivo lento.' },
  { q: '¿Cuál es la función del Gestor de Arranque (Bootloader) en sistemas con varios SO?', opts: ['Borrar el disco', 'Permitir al usuario elegir qué sistema operativo cargar (ej: Windows o Ubuntu)', 'Instalar actualizaciones', 'Mejorar el rendimiento'], a: 1, exp: 'Permite el famoso "Dual Boot".' }
];

const SistemaOperativo = () => {
  return (
    <LockedContent keyword="kernel" title="Clase 10: El Corazón del Software" unit={4}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', background: 'linear-gradient(to right, #4f46e5, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', fontWeight: 900 }}>
              Sistemas Operativos
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, color: '#94a3b8' }}>
              El gestor de recursos definitivo. Entiende cómo el software toma control del hardware para crear el entorno que usas cada día.
            </p>
          </motion.div>
        </header>

        {/* Teoría Ampliada: Capas del Sistema */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
             {[
               { title: 'Nucleo / Kernel', icon: <Cpu />, color: '#9333ea', desc: 'Es la parte vital. Maneja la memoria, el tiempo del procesador (Scheduling) y el acceso a los periféricos de forma segura.' },
               { title: 'Gestión de Procesos', icon: <Activity />, color: '#4f46e5', desc: 'Un programa es algo muerto en disco. El SO lo convierte en un Proceso vivo, asignándole recursos y tiempo de ejecución.' },
               { title: 'Sistema de Archivos', icon: <Database />, color: '#3b82f6', desc: 'Organiza la información en estructuras lógicas (directorios/archivos) sobre estructuras físicas (sectores del disco).' },
               { title: 'Interfaz de Usuario', icon: <Layout />, color: '#10b981', desc: 'Ya sea gráfica (GUI) o de texto (CLI), es la capa que permite al ser humano comunicarse con el complejo mundo binario.' }
             ].map((layer, i) => (
               <div key={i} style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '40px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: layer.color, marginBottom: '1.25rem' }}>{layer.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{layer.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>{layer.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Modelo de Capas Visual Ampliado */}
        <section style={{ marginBottom: '6rem', background: '#111', padding: '5rem 3.5rem', borderRadius: '55px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                 <h2 style={{ fontSize: '2.3rem', fontWeight: 900, marginBottom: '2rem' }}>Jerarquía de Abstracción</h2>
                 <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.1rem' }}>
                   El Sistema Operativo nos oculta la complejidad del hardware. Para una aplicación, guardar un archivo es una simple orden (System Call), mientras que para el SO implica mover cabezales de disco o enviar voltajes a celdas SSD.
                 </p>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
                    {[
                      { l: 'Memoria Virtual', d: 'Engaña a las apps con más recursos.' },
                      { l: 'Multiprogramación', d: 'Muchos procesos en una sola CPU.' },
                      { l: 'Protección', d: 'Nadie toca la memoria de otro.' },
                      { l: 'Planificación', d: 'Justicia en el uso del procesador.' }
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#1e293b', padding: '1rem', borderRadius: '15px' }}>
                         <CheckCircle size={18} color="#9333ea" />
                         <div>
                            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{item.l}:</span>
                            <span style={{ color: '#64748b', fontSize: '0.85rem' }}> {item.d}</span>
                         </div>
                      </li>
                    ))}
                 </ul>
              </div>
              <div style={{ position: 'relative' }}>
                 <img 
                   src="/assets/operating_system_layers_glass_1775235566953.png" 
                   alt="OS Layers Architecture" 
                   style={{ width: '100%', borderRadius: '50px', boxShadow: '0 20px 50px rgba(147,51,234,0.3)' }} 
                 />
                 <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #0f172a 100%)', borderRadius: '50px' }} />
              </div>
           </div>
        </section>

        {/* Evaluación */}
        <section style={{ background: '#1e293b', padding: '4rem', borderRadius: '50px', border: '3px solid #9333ea', boxShadow: '0 30px 60px rgba(147,51,234,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Server size={52} color="#9333ea" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Evaluación Completa: Sistemas Operativos</h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem' }}>20 preguntas para validar tu conocimiento sobre la gestión de recursos del sistema.</p>
          </div>
          <QuizBlock 
            questions={OS_QUESTS} 
            accentColor="#9333ea"
            clase="Clase 10: Sistemas Operativos"
            unidad="Unidad 4"
            materia="Fundamentos de Computación"
          />
        </section>
      </div>
    </LockedContent>
  );
};

export default SistemaOperativo;
