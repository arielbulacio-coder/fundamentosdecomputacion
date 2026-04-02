import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LockedContent from '../components/LockedContent';

const Arranque = () => {
  const [bootStep, setBootStep] = useState(0);

  const steps = [
    { title: 'PC Apagada', desc: 'Presiona Iniciar para encender el sistema.', action: 'Energizar' },
    { title: '1. POST (Power-On Self-Test)', desc: 'El firmware (BIOS/UEFI) despierta y verifica que haya memoria RAM, CPU funcional y periféricos esenciales básicos.', action: 'Verificación de Hardware' },
    { title: '2. Búsqueda de Gestor', desc: 'La BIOS busca en los discos (SSD/HDD/USB) un "Bootloader" o Gestor de Arranque (ej: GRUB, Windows Boot Manager).', action: 'Cargar Bootloader' },
    { title: '3. Sistema Operativo', desc: 'El núcleo del SO se carga en la memoria RAM y asume el control absoluto del hardware.', action: 'Kernel Init' },
    { title: '4. Interfaz Lista', desc: 'El sistema carga la interfaz gráfica, lanza los servicios en segundo plano y asiste a las interrupciones del usuario.', action: 'Aceptar Entradas' }
  ];

  return (
    <LockedContent keyword="firmware" title="Clase 5: Interfaz de Hardware y Proceso de Arranque">
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#eee', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#00f2ff', marginBottom: '2rem' }}>Interfaz de Hardware y Proceso de Arranque</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
          
          <div style={{ background: '#111', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ color: '#a855f7' }}>Entrada y Salida (I/O)</h2>
            <p>Es el flujo bidireccional entre la CPU, la memoria y el mundo exterior.</p>
            <ul>
              <li><strong>Puertos:</strong> Interfaces por hardware (USB, HDMI, Ethernet).</li>
              <li>El CPU no se comunica de manera directa con tu mouse, sino a través de un controlador o placa base que interpreta esa señal.</li>
            </ul>
          </div>

          <div style={{ background: '#111', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ color: '#ff4757' }}>Interrupciones (Interrupts)</h2>
            <p>La capacidad de decirle a la CPU: <em>"¡Detente! Necesito tu atención ahora."</em></p>
            <ul>
              <li><strong>Polling:</strong> La CPU le pregunta repetidamente al teclado "¿hay una tecla nueva?". Pierde tiempo.</li>
              <li><strong>Interrupts:</strong> La CPU ignora el teclado. Cuando presionas una tecla, el hardware manda un choque eléctrico (IRQ) que frena a la CPU al instante para atenderte.</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#111', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ color: '#2ed573', textAlign: 'center' }}>Simulador de Proceso de Arranque (El Firmware y el POST)</h2>
          <div style={{ background: '#000', padding: '2rem', borderRadius: '12px', marginTop: '2rem', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: bootStep > 0 ? '#00f2ff' : '#666' }}>{steps[bootStep].title}</h3>
            <p style={{ opacity: 0.8, maxWidth: '600px', textAlign: 'center' }}>{steps[bootStep].desc}</p>
            
            {bootStep < steps.length - 1 ? (
              <button 
                onClick={() => setBootStep(b => b + 1)}
                style={{ marginTop: '1rem', background: '#00f2ff', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                {steps[bootStep].action} &rarr;
              </button>
            ) : (
              <button 
                onClick={() => setBootStep(0)}
                style={{ marginTop: '1rem', background: '#ff4757', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                Apagar y Reiniciar
              </button>
            )}
            
            <div style={{ display: 'flex', gap: '5px', marginTop: '2rem' }}>
              {steps.map((_, i) => (
                <div key={i} style={{ width: '20px', height: '10px', borderRadius: '5px', background: i <= bootStep ? '#00f2ff' : '#333' }} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </LockedContent>
  );
};

export default Arranque;
