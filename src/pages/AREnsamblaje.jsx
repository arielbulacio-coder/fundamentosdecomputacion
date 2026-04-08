import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { DeviceOrientationControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Camera, RotateCcw, Info, ChevronRight,
  CheckCircle, X, Smartphone, Hand
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════
   COMPONENT DATA — Detailed specs for each PC part
   ═══════════════════════════════════════════════════════════════════════════════ */

const PARTS_DATA = [
  {
    id: 'motherboard', label: 'Placa Madre', shortLabel: 'MOBO',
    name: 'Placa Madre (Motherboard) — ATX',
    desc: 'La columna vertebral del sistema. Interconecta todos los componentes a través del chipset y los buses de datos.',
    specs: [
      'Factor: ATX (305 × 244 mm)',
      'Socket: LGA 1700 (Intel) / AM5 (AMD)',
      'Chipset: Gestiona comunicación entre CPU, RAM, almacenamiento y periféricos',
      'Slots DIMM: 4 (Dual Channel DDR5)',
      'Slots PCIe: x16 para GPU, x4/x1 para expansiones',
      'Conectores: 24-pin ATX, 8-pin CPU, SATA, M.2 NVMe, USB, Audio',
      'BIOS/UEFI: Firmware almacenado en chip flash para configuración inicial',
    ],
    slotPos: [0, 0.04, 0],
    color: '#059669',
  },
  {
    id: 'cpu', label: 'Procesador', shortLabel: 'CPU',
    name: 'Procesador (CPU) — Intel Core / AMD Ryzen',
    desc: 'El cerebro de la computadora. Ejecuta miles de millones de instrucciones por segundo gracias a sus miles de millones de transistores.',
    specs: [
      'Arquitectura: x86-64 (CISC con micro-ops RISC internos)',
      'Núcleos: 8-24 cores / 16-32 threads (Hyper-Threading)',
      'Frecuencia: 3.5 - 5.8 GHz (Turbo Boost)',
      'Caché: L1 (64KB/core), L2 (1MB/core), L3 (30-36MB compartida)',
      'Litografía: 5-7 nm (Intel 7 / TSMC N5)',
      'TDP: 65-125W (PBP) hasta 253W (MTP)',
      'Se coloca en el socket alineando el triángulo dorado. NO tocar los contactos.',
    ],
    slotPos: [-0.55, 0.12, -0.25],
    color: '#3b82f6',
  },
  {
    id: 'cooler', label: 'Disipador', shortLabel: 'COOL',
    name: 'Sistema de Refrigeración — Disipador + Ventilador',
    desc: 'Extrae el calor generado por el CPU mediante conducción térmica y convección forzada. Sin él, el CPU se apagaría por protección térmica.',
    specs: [
      'Tipo: Torre (air cooler) o Líquido (AIO 240/360mm)',
      'Base: Cobre pulido con pasta térmica (contacto con IHS del CPU)',
      'Heatpipes: 4-6 tubos de calor de cobre con fluido interno',
      'Ventilador: 120mm, 800-2000 RPM, 20-35 dBA',
      'Disipación: Hasta 250W TDP',
      'La pasta térmica es OBLIGATORIA entre CPU y cooler',
      'Se fija con tornillos al backplate de la placa madre',
    ],
    slotPos: [-0.55, 0.35, -0.25],
    color: '#94a3b8',
  },
  {
    id: 'ram1', label: 'RAM Módulo 1', shortLabel: 'RAM1',
    name: 'Memoria RAM DDR5 — Módulo DIMM',
    desc: 'Memoria volátil de acceso aleatorio. Almacena los datos e instrucciones que el CPU necesita en tiempo real. Se pierde al apagar.',
    specs: [
      'Tipo: DDR5 SDRAM (Double Data Rate 5)',
      'Capacidad: 8-32 GB por módulo',
      'Velocidad: 4800-7200 MT/s (MHz efectivos)',
      'Latencia: CL30-CL36 (nanosegundos de acceso)',
      'Voltaje: 1.1V (regulador de voltaje integrado en DDR5)',
      'Dual Channel: Instalar en slots del mismo color (A2+B2)',
      'Muesca asimétrica impide instalación incorrecta',
    ],
    slotPos: [0.45, 0.2, -0.55],
    color: '#22c55e',
  },
  {
    id: 'ram2', label: 'RAM Módulo 2', shortLabel: 'RAM2',
    name: 'Memoria RAM DDR5 — Segundo Módulo (Dual Channel)',
    desc: 'El segundo módulo idéntico activa Dual Channel, duplicando el ancho de banda de memoria de 64 a 128 bits.',
    specs: [
      'Dual Channel ACTIVO: 2 módulos idénticos = doble ancho de banda',
      'Bandwidth: ~89.6 GB/s (DDR5-5600 Dual Channel)',
      'Importante: Usar módulos del MISMO fabricante, velocidad y latencia',
      'Slots correctos: A2 y B2 (salteando uno, según manual de la placa)',
      'Flex Mode: Si las capacidades difieren, parte funciona en Dual y parte en Single',
      'XMP/EXPO: Perfiles de overclock automáticos configurables en BIOS',
    ],
    slotPos: [0.65, 0.2, -0.55],
    color: '#22c55e',
  },
  {
    id: 'ssd', label: 'SSD NVMe', shortLabel: 'SSD',
    name: 'Unidad de Estado Sólido M.2 NVMe',
    desc: 'Almacenamiento no volátil ultrarrápido basado en memoria NAND Flash. Se conecta directamente a la placa madre sin cables.',
    specs: [
      'Interfaz: PCIe Gen 4 x4 / Gen 5 x4 (NVMe 2.0)',
      'Formato: M.2 2280 (22mm ancho × 80mm largo)',
      'Lectura secuencial: hasta 7,000 MB/s (Gen4) / 14,000 MB/s (Gen5)',
      'Escritura secuencial: hasta 6,500 MB/s (Gen4)',
      'IOPS: 1,000,000+ lecturas aleatorias 4K',
      'NAND: TLC o QLC (capas 3D: 176-232 layers)',
      'Controlador: Gestiona wear leveling, ECC, caché DRAM/SLC',
      'Se inserta en ángulo de 30° y se fija con tornillo M.2',
    ],
    slotPos: [0.5, 0.08, 0.25],
    color: '#06b6d4',
  },
  {
    id: 'gpu', label: 'Tarjeta Gráfica', shortLabel: 'GPU',
    name: 'Tarjeta Gráfica (GPU) — Procesador Gráfico Dedicado',
    desc: 'Procesador masivamente paralelo especializado en cálculos gráficos. Contiene miles de núcleos CUDA/Stream y su propia memoria VRAM.',
    specs: [
      'GPU: Miles de cores paralelos (CUDA/Stream Processors)',
      'VRAM: 8-24 GB GDDR6X (bus 256-384 bits)',
      'Interfaz: PCIe 4.0/5.0 x16 (63 GB/s bandwidth)',
      'Salidas: HDMI 2.1, DisplayPort 2.1 (hasta 8K)',
      'TDP: 150-450W (requiere conectores 8-pin/16-pin del PSU)',
      'Refrigeración: 2-3 ventiladores axiales + heatsink de cobre/aluminio',
      'Se inserta en el slot PCIe x16 más cercano al CPU',
      'Puede requerir soporte anti-sag por su peso (1-2 kg)',
    ],
    slotPos: [0, 0.18, 0.6],
    color: '#ef4444',
  },
  {
    id: 'psu', label: 'Fuente de Poder', shortLabel: 'PSU',
    name: 'Fuente de Alimentación (PSU) — ATX',
    desc: 'Convierte corriente alterna (220V AC) en corriente continua regulada (12V, 5V, 3.3V DC) para alimentar todos los componentes.',
    specs: [
      'Potencia: 650-1000W (según GPU y CPU)',
      'Certificación: 80 Plus Bronze/Gold/Platinum (eficiencia energética)',
      'Modular: Cables desmontables para mejor cable management',
      'Conectores: 24-pin ATX, 8-pin CPU (EPS12V), PCIe 6+2 pin, SATA, Molex',
      'Protecciones: OVP, UVP, OCP, OPP, SCP, OTP (corto, sobre-voltaje, etc.)',
      'Ventilador: 120-140mm semi-pasivo (0 RPM en baja carga)',
      'Rail +12V: Principal para CPU y GPU (la más demandada)',
      'Se monta en la parte inferior del gabinete con ventilador hacia abajo',
    ],
    slotPos: [-0.55, 0.18, 0.65],
    color: '#f59e0b',
  },
  {
    id: 'hdd', label: 'Disco Rígido', shortLabel: 'HDD',
    name: 'Disco Rígido Mecánico (HDD) — 3.5"',
    desc: 'Almacenamiento masivo no volátil basado en platos magnéticos giratorios. Ideal para archivos grandes y backups por su bajo costo por GB.',
    specs: [
      'Interfaz: SATA III (6 Gb/s)',
      'Capacidad: 1-20 TB',
      'Velocidad de rotación: 5400-7200 RPM',
      'Lectura secuencial: ~150-200 MB/s',
      'Formato: 3.5" (desktop) — requiere bahía de 3.5" en el gabinete',
      'Conectores: SATA datos + SATA alimentación (desde el PSU)',
      'Tecnología: Platos magnéticos + cabezal lector flotante (nanómetros)',
      'Sensible a golpes y vibraciones — manipular con cuidado',
    ],
    slotPos: [0.7, 0.12, 0.55],
    color: '#6366f1',
  },
  {
    id: 'casefan1', label: 'Ventilador Frontal', shortLabel: 'FAN1',
    name: 'Ventilador de Gabinete — Intake Frontal',
    desc: 'Inyecta aire fresco del exterior al interior del gabinete. Fundamental para mantener un flujo de aire positivo que refrigere todos los componentes.',
    specs: [
      'Tamaño: 120mm o 140mm',
      'Velocidad: 800-1500 RPM',
      'Flujo: 50-75 CFM (pies cúbicos por minuto)',
      'Ruido: 18-28 dBA',
      'Conector: 4-pin PWM (control automático de velocidad)',
      'Posición INTAKE: Aire entra por el frente hacia CPU/GPU',
      'Se atornilla al panel frontal del gabinete',
      'Filtro anti-polvo recomendado en la entrada',
    ],
    slotPos: [-0.85, 0.35, 0],
    color: '#8b5cf6',
  },
  {
    id: 'casefan2', label: 'Ventilador Trasero', shortLabel: 'FAN2',
    name: 'Ventilador de Gabinete — Exhaust Trasero',
    desc: 'Expulsa el aire caliente del interior hacia afuera. Trabaja en conjunto con el ventilador frontal para crear flujo de aire direccional.',
    specs: [
      'Tamaño: 120mm',
      'Velocidad: 800-1500 RPM',
      'Posición EXHAUST: Aire sale por la parte trasera superior',
      'Flujo de aire positivo: Más intake que exhaust = presión positiva',
      'Beneficio: Reduce acumulación de polvo y mejora refrigeración',
      'Se conecta al header CHA_FAN de la placa madre',
      'Orientación: Etiqueta del motor hacia afuera del gabinete',
    ],
    slotPos: [0.85, 0.45, 0],
    color: '#a855f7',
  },
  {
    id: 'cables', label: 'Cableado', shortLabel: 'CABLES',
    name: 'Cableado y Conexiones de Alimentación',
    desc: 'Todos los cables que conectan la fuente con los componentes. Sin estos cables, los componentes no reciben energía y el sistema no enciende.',
    specs: [
      'Cable 24-pin ATX: Alimentación principal de la placa madre',
      'Cable 8-pin EPS12V: Alimentación directa del CPU',
      'Cable PCIe 8-pin (6+2): Alimentación de la GPU (1 o 2 cables)',
      'Cable SATA power: Alimentación de discos HDD/SSD 2.5"',
      'Cable SATA datos: Conexión de datos HDD → placa madre',
      'Cable Front Panel: Power SW, Reset SW, HDD LED, Power LED',
      'Cable USB 3.0: Conector interno 19-pin del panel frontal',
      'Cable Management: Pasar cables por detrás de la bandeja para orden y flujo de aire',
    ],
    slotPos: [0, 0.55, 0],
    color: '#f97316',
  },
  {
    id: 'case', label: 'Gabinete', shortLabel: 'CASE',
    name: 'Gabinete (Case) — Torre ATX',
    desc: 'La estructura que aloja, protege y organiza todos los componentes internos. Provee soporte estructural, flujo de aire y conectividad frontal.',
    specs: [
      'Factor: Mid-Tower ATX (más común para gaming/workstation)',
      'Material: Acero SPCC + Panel lateral de vidrio templado',
      'Bahías: 2× 3.5" (HDD), 2× 2.5" (SSD), 7 slots de expansión PCIe',
      'Ventiladores: Soporte 3× 120mm frontal, 1× 120mm trasero, 2× superior',
      'I/O Frontal: USB 3.0, USB-C, Audio jack 3.5mm, botón Power/Reset',
      'Filtros anti-polvo: Frontal, inferior (PSU), superior',
      'Cable Management: Espacio trasero 20-25mm para cables',
      'Se recomienda flujo de aire frontal-a-trasero (front intake → rear exhaust)',
    ],
    slotPos: [0, 0.3, 0],
    color: '#475569',
  },
];

const INSTALL_ORDER = PARTS_DATA.map(p => p.id);


/* ═══════════════════════════════════════════════════════════════════════════════
   DETAILED 3D MODELS — Procedural, realistic hardware models
   ═══════════════════════════════════════════════════════════════════════════════ */

// ── Motherboard: PCB with slots, chipset, traces, VRM, socket ─────────────
const MotherboardModel = React.forwardRef(({ highlight, onClick }, ref) => {
  const boardColor = '#065f46';
  const socketColor = '#1e293b';
  return (
    <group ref={ref} onClick={onClick}>
      {/* Main PCB */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.04, 1.5]} />
        <meshStandardMaterial color={boardColor} roughness={0.6} metalness={0.1} emissive={highlight ? '#059669' : '#000'} emissiveIntensity={highlight ? 0.3 : 0} />
      </mesh>
      {/* PCB traces (decorative lines) */}
      {[...Array(12)].map((_, i) => (
        <mesh key={`trace_h_${i}`} position={[-0.7 + i * 0.13, 0.025, (i % 3 - 1) * 0.35]}>
          <boxGeometry args={[0.01, 0.005, 0.4 + (i % 4) * 0.15]} />
          <meshStandardMaterial color="#0d9488" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      {[...Array(8)].map((_, i) => (
        <mesh key={`trace_v_${i}`} position={[(i % 4 - 1.5) * 0.3, 0.025, -0.5 + i * 0.14]}>
          <boxGeometry args={[0.5 + (i % 3) * 0.2, 0.005, 0.01]} />
          <meshStandardMaterial color="#0d9488" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      {/* CPU Socket (LGA) */}
      <mesh position={[-0.55, 0.035, -0.25]}>
        <boxGeometry args={[0.5, 0.03, 0.5]} />
        <meshStandardMaterial color={socketColor} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Socket pin grid */}
      {[...Array(5)].map((_, r) =>
        [...Array(5)].map((_, c) => (
          <mesh key={`pin_${r}_${c}`} position={[-0.72 + c * 0.09, 0.055, -0.42 + r * 0.09]}>
            <boxGeometry args={[0.025, 0.01, 0.025]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
          </mesh>
        ))
      )}
      {/* Socket lever */}
      <mesh position={[-0.32, 0.06, -0.25]}>
        <boxGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color="#71717a" metalness={0.7} />
      </mesh>
      {/* DIMM Slots (4 slots) */}
      {[0, 0.1, 0.25, 0.35].map((offset, i) => (
        <group key={`dimm_${i}`}>
          <mesh position={[0.35 + offset, 0.035, -0.55]}>
            <boxGeometry args={[0.06, 0.03, 0.65]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#1e293b' : '#334155'} />
          </mesh>
          {/* Slot clips */}
          <mesh position={[0.35 + offset, 0.055, -0.85]}>
            <boxGeometry args={[0.07, 0.03, 0.04]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.5} />
          </mesh>
          <mesh position={[0.35 + offset, 0.055, -0.25]}>
            <boxGeometry args={[0.07, 0.03, 0.04]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.5} />
          </mesh>
        </group>
      ))}
      {/* PCIe x16 slot */}
      <mesh position={[0, 0.035, 0.55]}>
        <boxGeometry args={[1.1, 0.03, 0.08]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-0.6, 0.05, 0.55]}>
        <boxGeometry args={[0.05, 0.03, 0.1]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.5} />
      </mesh>
      {/* M.2 slot */}
      <mesh position={[0.5, 0.035, 0.25]}>
        <boxGeometry args={[0.08, 0.02, 0.5]} />
        <meshStandardMaterial color="#292524" />
      </mesh>
      {/* Chipset heatsink */}
      <mesh position={[0.3, 0.06, 0.1]}>
        <boxGeometry args={[0.25, 0.08, 0.25]} />
        <meshStandardMaterial color="#404040" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* VRM heatsinks */}
      <mesh position={[-0.55, 0.06, 0.25]}>
        <boxGeometry args={[0.15, 0.06, 0.4]} />
        <meshStandardMaterial color="#52525b" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.82, 0.06, -0.25]}>
        <boxGeometry args={[0.12, 0.06, 0.5]} />
        <meshStandardMaterial color="#52525b" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* 24-pin ATX connector */}
      <mesh position={[0.85, 0.055, -0.2]}>
        <boxGeometry args={[0.08, 0.06, 0.35]} />
        <meshStandardMaterial color="#f5f5f4" />
      </mesh>
      {/* 8-pin CPU connector */}
      <mesh position={[-0.82, 0.055, -0.65]}>
        <boxGeometry args={[0.12, 0.05, 0.06]} />
        <meshStandardMaterial color="#fde047" />
      </mesh>
      {/* IO panel area */}
      <mesh position={[-0.86, 0.06, 0.6]}>
        <boxGeometry args={[0.08, 0.1, 0.25]} />
        <meshStandardMaterial color="#27272a" />
      </mesh>
      {/* Capacitors and small chips */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`cap_${i}`} position={[-0.3 + (i % 4) * 0.22, 0.04, -0.05 + Math.floor(i / 4) * 0.6]}>
          <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
          <meshStandardMaterial color="#1e1e1e" metalness={0.3} />
        </mesh>
      ))}
      {/* SATA connectors */}
      {[0, 0.1, 0.2].map((o, i) => (
        <mesh key={`sata_${i}`} position={[0.85, 0.04, 0.2 + o]}>
          <boxGeometry args={[0.06, 0.04, 0.06]} />
          <meshStandardMaterial color="#1e1e1e" />
        </mesh>
      ))}
    </group>
  );
});

// ── CPU: IHS (heat spreader) with substrate and contacts ──────────────────
const CPUModel = React.forwardRef(({ highlight, onClick }, ref) => (
  <group ref={ref} onClick={onClick}>
    {/* Substrate (green PCB) */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.38, 0.025, 0.38]} />
      <meshStandardMaterial color="#065f46" roughness={0.5} />
    </mesh>
    {/* IHS (Integrated Heat Spreader) — the metal top */}
    <mesh position={[0, 0.025, 0]}>
      <boxGeometry args={[0.33, 0.03, 0.33]} />
      <meshStandardMaterial color="#b8bcc4" metalness={0.85} roughness={0.15} emissive={highlight ? '#3b82f6' : '#000'} emissiveIntensity={highlight ? 0.4 : 0} />
    </mesh>
    {/* IHS label area */}
    <mesh position={[0, 0.042, 0]}>
      <boxGeometry args={[0.2, 0.002, 0.15]} />
      <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.2} />
    </mesh>
    {/* Corner triangle marker */}
    <mesh position={[-0.16, 0.015, -0.16]}>
      <boxGeometry args={[0.025, 0.015, 0.025]} />
      <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
    </mesh>
    {/* Contact pads (bottom, subtle) */}
    {[...Array(6)].map((_, r) =>
      [...Array(6)].map((_, c) => (
        <mesh key={`contact_${r}_${c}`} position={[-0.12 + c * 0.05, -0.015, -0.12 + r * 0.05]}>
          <boxGeometry args={[0.02, 0.005, 0.02]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
      ))
    )}
    {/* SMD capacitors on substrate edge */}
    {[...Array(4)].map((_, i) => (
      <mesh key={`smd_${i}`} position={[0.16, 0.015, -0.12 + i * 0.08]}>
        <boxGeometry args={[0.025, 0.015, 0.015]} />
        <meshStandardMaterial color="#292524" />
      </mesh>
    ))}
  </group>
));

// ── Cooler: Heatsink tower with fins and fan ──────────────────────────────
const CoolerModel = React.forwardRef(({ highlight, onClick }, ref) => {
  const fanRef = useRef();
  useFrame((_, delta) => {
    if (fanRef.current) fanRef.current.rotation.z += delta * 8;
  });
  return (
    <group ref={ref} onClick={onClick}>
      {/* Base plate (copper) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.3]} />
        <meshStandardMaterial color="#b87333" metalness={0.8} roughness={0.2} emissive={highlight ? '#94a3b8' : '#000'} emissiveIntensity={highlight ? 0.3 : 0} />
      </mesh>
      {/* Heat pipes */}
      {[-0.06, 0, 0.06].map((x, i) => (
        <mesh key={`hp_${i}`} position={[x, 0.15, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.28, 8]} />
          <meshStandardMaterial color="#b87333" metalness={0.85} roughness={0.15} />
        </mesh>
      ))}
      {/* Aluminum fins (heatsink tower) */}
      {[...Array(14)].map((_, i) => (
        <mesh key={`fin_${i}`} position={[0, 0.08 + i * 0.018, 0]}>
          <boxGeometry args={[0.32, 0.008, 0.28]} />
          <meshStandardMaterial color="#a8a8a8" metalness={0.6} roughness={0.3} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* Fan frame */}
      <mesh position={[0.2, 0.18, 0]}>
        <boxGeometry args={[0.04, 0.28, 0.3]} />
        <meshStandardMaterial color="#1e1e1e" transparent opacity={0.7} />
      </mesh>
      {/* Fan hub */}
      <mesh position={[0.23, 0.18, 0]} ref={fanRef}>
        <group>
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 0.02, 12]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          {/* Fan blades */}
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <mesh key={`blade_${i}`} position={[0, Math.sin(i * Math.PI * 2 / 7) * 0.09, Math.cos(i * Math.PI * 2 / 7) * 0.09]} rotation={[i * Math.PI * 2 / 7, 0, 0]}>
              <boxGeometry args={[0.008, 0.07, 0.025]} />
              <meshStandardMaterial color="#475569" transparent opacity={0.8} />
            </mesh>
          ))}
        </group>
      </mesh>
      {/* Mounting brackets */}
      {[-0.15, 0.15].map((z, i) => (
        <mesh key={`bracket_${i}`} position={[0, -0.01, z]}>
          <boxGeometry args={[0.35, 0.01, 0.015]} />
          <meshStandardMaterial color="#71717a" metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
});

// ── RAM: DIMM stick with chips, gold contacts, heatspreader ───────────────
const RAMModel = React.forwardRef(({ highlight, onClick, variant = 0 }, ref) => (
  <group ref={ref} onClick={onClick} rotation={[0, Math.PI / 2, 0]}>
    {/* PCB */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.55, 0.14, 0.02]} />
      <meshStandardMaterial color="#065f46" roughness={0.5} emissive={highlight ? '#22c55e' : '#000'} emissiveIntensity={highlight ? 0.3 : 0} />
    </mesh>
    {/* Heatspreader (aluminum, covers PCB) */}
    <mesh position={[0, 0.01, 0]}>
      <boxGeometry args={[0.54, 0.16, 0.025]} />
      <meshStandardMaterial color={variant === 0 ? '#1e293b' : '#1e3a5f'} metalness={0.6} roughness={0.3} />
    </mesh>
    {/* Top edge design */}
    <mesh position={[0, 0.095, 0]}>
      <boxGeometry args={[0.54, 0.01, 0.028]} />
      <meshStandardMaterial color={variant === 0 ? '#3b82f6' : '#6366f1'} emissive={variant === 0 ? '#3b82f6' : '#6366f1'} emissiveIntensity={0.3} />
    </mesh>
    {/* Memory chips (visible through heatspreader gaps — top) */}
    {[...Array(8)].map((_, i) => (
      <mesh key={`chip_${i}`} position={[-0.22 + i * 0.065, 0.025, 0.014]}>
        <boxGeometry args={[0.04, 0.04, 0.004]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    ))}
    {/* Gold edge contacts */}
    <mesh position={[0, -0.075, 0]}>
      <boxGeometry args={[0.5, 0.02, 0.015]} />
      <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
    </mesh>
    {/* Contact notch (key) */}
    <mesh position={[0.08, -0.075, 0]}>
      <boxGeometry args={[0.03, 0.025, 0.025]} />
      <meshStandardMaterial color="#065f46" />
    </mesh>
    {/* Label sticker */}
    <mesh position={[0.15, 0.02, 0.014]}>
      <boxGeometry args={[0.12, 0.06, 0.003]} />
      <meshStandardMaterial color="#f8fafc" roughness={0.8} />
    </mesh>
  </group>
));

// ── SSD M.2: Small PCB with controller and NAND chips ─────────────────────
const SSDModel = React.forwardRef(({ highlight, onClick }, ref) => (
  <group ref={ref} onClick={onClick}>
    {/* PCB (green, small) */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.08, 0.01, 0.35]} />
      <meshStandardMaterial color="#065f46" roughness={0.5} emissive={highlight ? '#06b6d4' : '#000'} emissiveIntensity={highlight ? 0.4 : 0} />
    </mesh>
    {/* Controller chip */}
    <mesh position={[0, 0.008, -0.1]}>
      <boxGeometry args={[0.05, 0.008, 0.05]} />
      <meshStandardMaterial color="#111" metalness={0.2} />
    </mesh>
    {/* NAND flash chips */}
    {[0.02, 0.1].map((z, i) => (
      <mesh key={`nand_${i}`} position={[0, 0.008, z]}>
        <boxGeometry args={[0.06, 0.006, 0.06]} />
        <meshStandardMaterial color="#1e1e1e" />
      </mesh>
    ))}
    {/* Gold M.2 connector */}
    <mesh position={[0, 0, -0.17]}>
      <boxGeometry args={[0.07, 0.012, 0.02]} />
      <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
    </mesh>
    {/* M-key notch */}
    <mesh position={[-0.025, 0, -0.17]}>
      <boxGeometry args={[0.015, 0.015, 0.025]} />
      <meshStandardMaterial color="#065f46" />
    </mesh>
    {/* Label sticker on top */}
    <mesh position={[0, 0.009, 0.05]}>
      <boxGeometry args={[0.07, 0.002, 0.2]} />
      <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
    </mesh>
  </group>
));

// ── GPU: Massive card with fans, backplate, PCIe connector ────────────────
const GPUModel = React.forwardRef(({ highlight, onClick }, ref) => {
  const fan1Ref = useRef();
  const fan2Ref = useRef();
  useFrame((_, delta) => {
    if (fan1Ref.current) fan1Ref.current.rotation.y += delta * 6;
    if (fan2Ref.current) fan2Ref.current.rotation.y += delta * 6;
  });
  return (
    <group ref={ref} onClick={onClick}>
      {/* Main shroud/body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.06, 0.45]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.4} emissive={highlight ? '#ef4444' : '#000'} emissiveIntensity={highlight ? 0.3 : 0} />
      </mesh>
      {/* Backplate (top) */}
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[1.02, 0.01, 0.46]} />
        <meshStandardMaterial color="#27272a" metalness={0.5} roughness={0.25} />
      </mesh>
      {/* Fan openings (circular mesh areas) */}
      {[-0.25, 0.25].map((x, i) => (
        <group key={`fan_area_${i}`} position={[x, -0.035, 0]}>
          {/* Fan ring */}
          <mesh>
            <cylinderGeometry args={[0.16, 0.16, 0.01, 24]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          {/* Fan hub */}
          <mesh position={[0, -0.01, 0]} ref={i === 0 ? fan1Ref : fan2Ref}>
            <group>
              <mesh>
                <cylinderGeometry args={[0.03, 0.03, 0.015, 12]} />
                <meshStandardMaterial color="#222" />
              </mesh>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(b => (
                <mesh key={`fb_${b}`} position={[Math.sin(b * Math.PI * 2 / 9) * 0.09, -0.005, Math.cos(b * Math.PI * 2 / 9) * 0.09]} rotation={[0, b * Math.PI * 2 / 9, 0]}>
                  <boxGeometry args={[0.06, 0.006, 0.015]} />
                  <meshStandardMaterial color="#374151" transparent opacity={0.85} />
                </mesh>
              ))}
            </group>
          </mesh>
        </group>
      ))}
      {/* PCIe connector (gold fingers) */}
      <mesh position={[0, 0, -0.24]}>
        <boxGeometry args={[0.5, 0.04, 0.02]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Power connectors (8-pin) */}
      <mesh position={[0.48, 0.015, 0.05]}>
        <boxGeometry args={[0.04, 0.04, 0.08]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0.48, 0.015, 0.15]}>
        <boxGeometry args={[0.04, 0.04, 0.08]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Display outputs (back IO) */}
      <mesh position={[-0.5, 0.01, 0.08]}>
        <boxGeometry args={[0.02, 0.04, 0.06]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {[-0.05, 0.05, 0.15].map((z, i) => (
        <mesh key={`dp_${i}`} position={[-0.5, 0.01, z]}>
          <boxGeometry args={[0.02, 0.03, 0.04]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
      {/* RGB accent strip */}
      <mesh position={[0, -0.032, -0.2]}>
        <boxGeometry args={[0.9, 0.005, 0.02]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} toneMapped={false} />
      </mesh>
      {/* Bracket */}
      <mesh position={[-0.51, 0.01, 0]}>
        <boxGeometry args={[0.01, 0.07, 0.45]} />
        <meshStandardMaterial color="#71717a" metalness={0.7} />
      </mesh>
    </group>
  );
});

// ── PSU: Metal box with fan grill, modular connectors, cables ─────────────
const PSUModel = React.forwardRef(({ highlight, onClick }, ref) => (
  <group ref={ref} onClick={onClick}>
    {/* Main body */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.55, 0.3, 0.45]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} emissive={highlight ? '#f59e0b' : '#000'} emissiveIntensity={highlight ? 0.3 : 0} />
    </mesh>
    {/* Fan grill (bottom) */}
    <mesh position={[0, -0.155, 0]}>
      <boxGeometry args={[0.45, 0.005, 0.4]} />
      <meshStandardMaterial color="#333" metalness={0.5} />
    </mesh>
    {/* Fan grill pattern */}
    {[...Array(7)].map((_, i) => (
      <mesh key={`grill_${i}`} position={[0, -0.15, -0.15 + i * 0.05]}>
        <boxGeometry args={[0.4, 0.005, 0.01]} />
        <meshStandardMaterial color="#555" metalness={0.6} />
      </mesh>
    ))}
    {/* Modular cable ports (front) */}
    {[[-0.15, 0.05, 0.228], [0, 0.05, 0.228], [0.15, 0.05, 0.228],
      [-0.15, -0.05, 0.228], [0, -0.05, 0.228], [0.15, -0.05, 0.228]].map(([x, y, z], i) => (
      <mesh key={`port_${i}`} position={[x, y, z]}>
        <boxGeometry args={[0.08, 0.06, 0.01]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    ))}
    {/* Power switch + AC inlet (back) */}
    <mesh position={[0, 0.05, -0.228]}>
      <boxGeometry args={[0.12, 0.08, 0.01]} />
      <meshStandardMaterial color="#222" />
    </mesh>
    <mesh position={[-0.15, 0.05, -0.228]}>
      <boxGeometry args={[0.04, 0.03, 0.01]} />
      <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} />
    </mesh>
    {/* 80 Plus label */}
    <mesh position={[0.12, 0.1, 0.228]}>
      <boxGeometry args={[0.12, 0.06, 0.003]} />
      <meshStandardMaterial color="#f5f5f4" roughness={0.9} />
    </mesh>
    {/* Brand label on side */}
    <mesh position={[0.278, 0.04, 0]}>
      <boxGeometry args={[0.003, 0.1, 0.25]} />
      <meshStandardMaterial color="#f59e0b" roughness={0.7} />
    </mesh>
    {/* Cables coming out (modular) */}
    {[[-0.15, 0.05], [0, 0.05], [0.15, -0.05]].map(([x, y], i) => (
      <mesh key={`cable_${i}`} position={[x, y, 0.3]}>
        <cylinderGeometry args={[0.015, 0.015, 0.15, 6]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color={i === 0 ? '#fde047' : i === 1 ? '#111' : '#ef4444'} />
      </mesh>
    ))}
  </group>
));


// ── HDD: Mechanical hard drive with SATA connectors ──────────────────────
const HDDModel = React.forwardRef(({ highlight, onClick }, ref) => (
  <group ref={ref} onClick={onClick}>
    {/* Main body (sealed aluminum) */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.4, 0.08, 0.55]} />
      <meshStandardMaterial color="#a8a8a8" metalness={0.7} roughness={0.2} emissive={highlight ? '#6366f1' : '#000'} emissiveIntensity={highlight ? 0.3 : 0} />
    </mesh>
    {/* Top label */}
    <mesh position={[0, 0.042, 0]}>
      <boxGeometry args={[0.35, 0.002, 0.45]} />
      <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
    </mesh>
    {/* PCB board (bottom, exposed) */}
    <mesh position={[0, -0.042, 0]}>
      <boxGeometry args={[0.38, 0.005, 0.5]} />
      <meshStandardMaterial color="#065f46" roughness={0.5} />
    </mesh>
    {/* Chips on bottom PCB */}
    {[[-0.1, 0.05], [0.1, 0.05], [0, -0.1]].map(([x, z], i) => (
      <mesh key={`hchip_${i}`} position={[x, -0.048, z]}>
        <boxGeometry args={[0.06, 0.01, 0.06]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    ))}
    {/* SATA data connector */}
    <mesh position={[-0.08, -0.02, 0.278]}>
      <boxGeometry args={[0.06, 0.03, 0.015]} />
      <meshStandardMaterial color="#111" />
    </mesh>
    {/* SATA power connector */}
    <mesh position={[0.06, -0.02, 0.278]}>
      <boxGeometry args={[0.1, 0.03, 0.015]} />
      <meshStandardMaterial color="#111" />
    </mesh>
    {/* Mounting screw holes (4 corners bottom) */}
    {[[-0.17, -0.22], [-0.17, 0.22], [0.17, -0.22], [0.17, 0.22]].map(([x, z], i) => (
      <mesh key={`screw_${i}`} position={[x, -0.04, z]}>
        <cylinderGeometry args={[0.012, 0.012, 0.01, 8]} />
        <meshStandardMaterial color="#999" metalness={0.8} />
      </mesh>
    ))}
  </group>
));

// ── Case Fan: Circular frame with spinning blades ────────────────────────
const CaseFanModel = React.forwardRef(({ highlight, onClick, exhaust = false }, ref) => {
  const bladeRef = useRef();
  useFrame((_, delta) => {
    if (bladeRef.current) bladeRef.current.rotation.z += delta * (exhaust ? -6 : 6);
  });
  const frameColor = exhaust ? '#7c3aed' : '#6d28d9';
  return (
    <group ref={ref} onClick={onClick} rotation={[0, exhaust ? Math.PI : 0, 0]}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[0.06, 0.35, 0.35]} />
        <meshStandardMaterial color={frameColor} transparent opacity={0.5} emissive={highlight ? '#8b5cf6' : '#000'} emissiveIntensity={highlight ? 0.4 : 0} />
      </mesh>
      {/* Corner posts */}
      {[[-0.15, -0.15], [-0.15, 0.15], [0.15, -0.15], [0.15, 0.15]].map(([y, z], i) => (
        <mesh key={`post_${i}`} position={[0, y, z]}>
          <boxGeometry args={[0.065, 0.04, 0.04]} />
          <meshStandardMaterial color="#1e1e1e" />
        </mesh>
      ))}
      {/* Screw holes */}
      {[[-0.15, -0.15], [-0.15, 0.15], [0.15, -0.15], [0.15, 0.15]].map(([y, z], i) => (
        <mesh key={`fscrew_${i}`} position={[0.033, y, z]}>
          <cylinderGeometry args={[0.008, 0.008, 0.01, 8]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#888" metalness={0.8} />
        </mesh>
      ))}
      {/* Spinning blade assembly */}
      <group ref={bladeRef} position={[0, 0, 0]}>
        {/* Hub */}
        <mesh>
          <cylinderGeometry args={[0.035, 0.035, 0.04, 12]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        {/* Blades */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const angle = (i * Math.PI * 2) / 8;
          return (
            <mesh key={`fblade_${i}`} position={[0, Math.sin(angle) * 0.1, Math.cos(angle) * 0.1]} rotation={[angle, 0, 0]}>
              <boxGeometry args={[0.015, 0.08, 0.03]} />
              <meshStandardMaterial color={frameColor} transparent opacity={0.7} />
            </mesh>
          );
        })}
      </group>
      {/* Cable */}
      <mesh position={[-0.02, 0.18, 0.12]}>
        <cylinderGeometry args={[0.006, 0.006, 0.12, 4]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
});

// ── Cables: Bundle of power cables with connectors ───────────────────────
const CablesModel = React.forwardRef(({ highlight, onClick }, ref) => (
  <group ref={ref} onClick={onClick}>
    {/* 24-pin ATX cable bundle */}
    <mesh position={[0.3, 0, -0.15]}>
      <cylinderGeometry args={[0.025, 0.025, 0.6, 6]} rotation={[0, 0, Math.PI / 4]} />
      <meshStandardMaterial color="#111" emissive={highlight ? '#f97316' : '#000'} emissiveIntensity={highlight ? 0.3 : 0} />
    </mesh>
    <mesh position={[0.55, 0, -0.15]}>
      <boxGeometry args={[0.08, 0.04, 0.06]} />
      <meshStandardMaterial color="#f5f5f4" />
    </mesh>
    {/* 8-pin CPU cable */}
    <mesh position={[-0.3, 0, -0.3]}>
      <cylinderGeometry args={[0.015, 0.015, 0.5, 6]} rotation={[0, 0, -Math.PI / 5]} />
      <meshStandardMaterial color="#fde047" />
    </mesh>
    <mesh position={[-0.5, 0, -0.3]}>
      <boxGeometry args={[0.05, 0.03, 0.04]} />
      <meshStandardMaterial color="#fde047" />
    </mesh>
    {/* PCIe cable */}
    <mesh position={[0, 0, 0.25]}>
      <cylinderGeometry args={[0.018, 0.018, 0.5, 6]} rotation={[Math.PI / 6, 0, 0]} />
      <meshStandardMaterial color="#111" />
    </mesh>
    <mesh position={[0, 0, 0.48]}>
      <boxGeometry args={[0.06, 0.03, 0.04]} />
      <meshStandardMaterial color="#111" />
    </mesh>
    {/* SATA power cable */}
    <mesh position={[0.4, 0, 0.3]}>
      <cylinderGeometry args={[0.01, 0.01, 0.35, 4]} rotation={[0, Math.PI / 3, 0]} />
      <meshStandardMaterial color="#ef4444" />
    </mesh>
    {/* SATA data cable */}
    <mesh position={[0.4, 0.02, 0.35]}>
      <cylinderGeometry args={[0.008, 0.008, 0.3, 4]} rotation={[0, Math.PI / 3, 0]} />
      <meshStandardMaterial color="#f97316" />
    </mesh>
    {/* Front panel header cables (thin, colored) */}
    {[['#ef4444', -0.15], ['#22c55e', -0.1], ['#f5f5f4', -0.05], ['#3b82f6', 0]].map(([color, z], i) => (
      <mesh key={`fp_${i}`} position={[-0.2, -0.02, z]}>
        <cylinderGeometry args={[0.004, 0.004, 0.2, 4]} rotation={[0, 0, Math.PI / 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
    ))}
  </group>
));

// ── Case: Transparent tower showing interior slots ───────────────────────
const CaseModel = React.forwardRef(({ highlight, onClick }, ref) => (
  <group ref={ref} onClick={onClick}>
    {/* Outer frame — wireframe for visibility */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2.2, 1.4, 1.6]} />
      <meshStandardMaterial color="#475569" transparent opacity={0.06} emissive={highlight ? '#475569' : '#000'} emissiveIntensity={highlight ? 0.3 : 0} />
    </mesh>
    {/* Wireframe edge */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2.2, 1.4, 1.6]} />
      <meshBasicMaterial color="#64748b" wireframe transparent opacity={0.25} />
    </mesh>
    {/* Back panel */}
    <mesh position={[1.1, 0, 0]}>
      <boxGeometry args={[0.02, 1.38, 1.58]} />
      <meshStandardMaterial color="#1e293b" transparent opacity={0.4} metalness={0.5} />
    </mesh>
    {/* Bottom panel */}
    <mesh position={[0, -0.69, 0]}>
      <boxGeometry args={[2.18, 0.02, 1.58]} />
      <meshStandardMaterial color="#1e293b" transparent opacity={0.3} metalness={0.5} />
    </mesh>
    {/* PSU shroud (bottom compartment) */}
    <mesh position={[0, -0.45, 0]}>
      <boxGeometry args={[2.18, 0.02, 1.58]} />
      <meshStandardMaterial color="#27272a" transparent opacity={0.35} />
    </mesh>
    {/* Front panel I/O area */}
    <mesh position={[-1.05, 0.55, 0]}>
      <boxGeometry args={[0.08, 0.15, 0.3]} />
      <meshStandardMaterial color="#111" />
    </mesh>
    {/* Power button */}
    <mesh position={[-1.1, 0.58, 0.05]}>
      <cylinderGeometry args={[0.02, 0.02, 0.01, 12]} rotation={[0, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#e2e8f0" metalness={0.6} />
    </mesh>
    {/* Drive bays (3.5") */}
    {[0, 0.12].map((z, i) => (
      <mesh key={`bay_${i}`} position={[0.8, -0.55, 0.4 + z]}>
        <boxGeometry args={[0.45, 0.1, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.5} />
      </mesh>
    ))}
    {/* PCIe slot covers (back) */}
    {[...Array(7)].map((_, i) => (
      <mesh key={`pcie_cover_${i}`} position={[1.09, -0.05 + i * 0.08, 0.55]}>
        <boxGeometry args={[0.015, 0.06, 0.02]} />
        <meshStandardMaterial color="#888" metalness={0.6} />
      </mesh>
    ))}
    {/* Tempered glass side panel */}
    <mesh position={[0, 0, -0.8]}>
      <boxGeometry args={[2.18, 1.38, 0.02]} />
      <meshPhysicalMaterial color="#1e3a5f" transparent opacity={0.08} roughness={0} metalness={0.1} />
    </mesh>
    {/* Feet */}
    {[[-0.9, -0.6], [-0.9, 0.6], [0.9, -0.6], [0.9, 0.6]].map(([x, z], i) => (
      <mesh key={`foot_${i}`} position={[x, -0.73, z]}>
        <boxGeometry args={[0.08, 0.04, 0.06]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    ))}
  </group>
));


/* ═══════════════════════════════════════════════════════════════════════════════
   MODEL DISPATCHER — Renders the correct model for each part ID
   ═══════════════════════════════════════════════════════════════════════════════ */

const PartModel = React.forwardRef(({ id, highlight, onClick }, ref) => {
  switch (id) {
    case 'motherboard': return <MotherboardModel ref={ref} highlight={highlight} onClick={onClick} />;
    case 'cpu': return <CPUModel ref={ref} highlight={highlight} onClick={onClick} />;
    case 'cooler': return <CoolerModel ref={ref} highlight={highlight} onClick={onClick} />;
    case 'ram1': return <RAMModel ref={ref} highlight={highlight} onClick={onClick} variant={0} />;
    case 'ram2': return <RAMModel ref={ref} highlight={highlight} onClick={onClick} variant={1} />;
    case 'ssd': return <SSDModel ref={ref} highlight={highlight} onClick={onClick} />;
    case 'gpu': return <GPUModel ref={ref} highlight={highlight} onClick={onClick} />;
    case 'psu': return <PSUModel ref={ref} highlight={highlight} onClick={onClick} />;
    case 'hdd': return <HDDModel ref={ref} highlight={highlight} onClick={onClick} />;
    case 'casefan1': return <CaseFanModel ref={ref} highlight={highlight} onClick={onClick} />;
    case 'casefan2': return <CaseFanModel ref={ref} highlight={highlight} onClick={onClick} exhaust />;
    case 'cables': return <CablesModel ref={ref} highlight={highlight} onClick={onClick} />;
    case 'case': return <CaseModel ref={ref} highlight={highlight} onClick={onClick} />;
    default: return null;
  }
});


/* ═══════════════════════════════════════════════════════════════════════════════
   3D ANIMATED PART — Drops into position with spring animation
   ═══════════════════════════════════════════════════════════════════════════════ */

const AnimatedPart = ({ partData, installed, installing, isSelected, onSelect }) => {
  const groupRef = useRef();
  const progress = useRef(0);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (installing) { progress.current = 0; setSettled(false); }
  }, [installing]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = partData.slotPos;
    if (installing && !settled) {
      progress.current = Math.min(progress.current + delta * 1.5, 1);
      const t = progress.current;
      // Spring-like easing
      const ease = 1 - Math.pow(1 - t, 3);
      const bounce = Math.sin(t * Math.PI * 2) * 0.03 * (1 - t);
      groupRef.current.position.set(
        target[0],
        target[1] + 1.5 * (1 - ease) + bounce,
        target[2]
      );
      if (t >= 1) setSettled(true);
    } else if (installed) {
      groupRef.current.position.set(target[0], target[1], target[2]);
    }
  });

  if (!installed && !installing) return null;

  return (
    <group ref={groupRef} position={[partData.slotPos[0], partData.slotPos[1] + 1.5, partData.slotPos[2]]}>
      <PartModel id={partData.id} highlight={isSelected} onClick={(e) => { e?.stopPropagation(); onSelect(); }} />
    </group>
  );
};


/* ═══════════════════════════════════════════════════════════════════════════════
   AR SCENE — All parts + marker cross + labels
   ═══════════════════════════════════════════════════════════════════════════════ */

const FixedCamera = () => {
  const { camera } = useThree();
  useEffect(() => {
    // Initial look at the center, but DeviceOrientationControls will take over rotation
    camera.position.set(0, 2.5, 2.2);
    camera.lookAt(0, 0.15, 0);
  }, [camera]);
  return <DeviceOrientationControls />;
};

const ARScene = ({ installedParts, installingPart, selected, onSelect, placed }) => {
  if (!placed) return null;
  return (
    <group>
      {/* Reference marker cross on "surface" */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial transparent opacity={0.08} color="#3b82f6" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.003, 0]}>
        <planeGeometry args={[0.05, 0.4]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.003, 0]}>
        <planeGeometry args={[0.4, 0.05]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>

      {/* Ghost slots for upcoming parts */}
      {PARTS_DATA.map(part => {
        if (installedParts.includes(part.id) || installingPart === part.id) return null;
        return (
          <mesh key={`slot_${part.id}`} position={part.slotPos}>
            <boxGeometry args={[0.15, 0.02, 0.15]} />
            <meshBasicMaterial color={part.color} transparent opacity={0.12} wireframe />
          </mesh>
        );
      })}

      {/* Installed + installing parts */}
      {PARTS_DATA.map(part => (
        <AnimatedPart key={part.id} partData={part}
          installed={installedParts.includes(part.id)}
          installing={installingPart === part.id}
          isSelected={selected === part.id}
          onSelect={() => onSelect(selected === part.id ? null : part.id)}
        />
      ))}

      {/* Lighting for the scene */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]} intensity={1} castShadow />
      <directionalLight position={[-2, 4, -2]} intensity={0.4} />
      <pointLight position={[0, 2, 0]} intensity={0.3} color="#60a5fa" />
    </group>
  );
};


/* ═══════════════════════════════════════════════════════════════════════════════
   CAMERA FEED — Uses getUserMedia for real AR background
   ═══════════════════════════════════════════════════════════════════════════════ */

const CameraFeed = ({ videoRef, onReady }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    let stream = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            onReady?.();
          };
        }
      } catch (err) {
        console.error('Camera error:', err);
        setError(err.message);
      }
    };
    startCamera();
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
  }, []);

  if (error) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '400px' }}>
          <Camera size={48} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ color: '#ef4444', fontWeight: 800, marginBottom: '0.5rem' }}>Cámara no disponible</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Para la experiencia de Realidad Aumentada se necesita acceso a la cámara.
            Asegurate de usar HTTPS y permitir el acceso en el navegador.
          </p>
          <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '1rem' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <video ref={videoRef} playsInline muted style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      objectFit: 'cover', zIndex: 1
    }} />
  );
};


/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN AR ASSEMBLY PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */

const AREnsamblaje = () => {
  const videoRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [installedParts, setInstalledParts] = useState([]);
  const [installingPart, setInstallingPart] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const nextPart = useMemo(() => INSTALL_ORDER.find(id => !installedParts.includes(id)), [installedParts]);
  const nextPartData = PARTS_DATA.find(p => p.id === nextPart);
  const selectedPartData = PARTS_DATA.find(p => p.id === selected);
  const isComplete = installedParts.length === INSTALL_ORDER.length;

  const handlePlace = useCallback(() => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            if (!placed) setPlaced(true);
          } else {
            alert('Se requiere acceso a los sensores de movimiento para la Experiencia AR.');
            if (!placed) setPlaced(true); // fallback
          }
        })
        .catch(console.error);
    } else {
      if (!placed) setPlaced(true);
    }
  }, [placed]);

  const installNext = useCallback(() => {
    if (!nextPart || installingPart) return;
    setInstallingPart(nextPart);
    setTimeout(() => {
      setInstalledParts(prev => [...prev, nextPart]);
      setInstallingPart(null);
    }, 1400);
  }, [nextPart, installingPart]);

  const reset = useCallback(() => {
    setInstalledParts([]);
    setInstallingPart(null);
    setSelected(null);
    setShowInfo(false);
    setPlaced(false);
  }, []);

  const openInfo = useCallback(() => {
    if (selected) setShowInfo(true);
  }, [selected]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', overflow: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Camera Background ────────────────────────────────────── */}
      <CameraFeed videoRef={videoRef} onReady={() => setCameraReady(true)} />

      {/* ── 3D Overlay (transparent background) ──────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }} onClick={handlePlace}>
        <Canvas
          camera={{ position: [0, 2.5, 2.2], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ARScene
            installedParts={installedParts}
            installingPart={installingPart}
            selected={selected}
            onSelect={setSelected}
            placed={placed}
          />
          <FixedCamera />
        </Canvas>
      </div>

      {/* ── Top bar ──────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '0.75rem 1rem',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
        display: 'flex', alignItems: 'center', gap: '0.75rem'
      }}>
        <Link to="/ar-arquitectura" style={{
          display: 'flex', alignItems: 'center', gap: '0.3rem',
          color: '#fff', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700,
          padding: '0.4rem 0.75rem', borderRadius: '10px',
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)'
        }}>
          <ArrowLeft size={18} /> Volver
        </Link>
        <h1 style={{
          flex: 1, margin: 0, fontSize: '1rem', fontWeight: 900, color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)'
        }}>
          Ensamblaje AR
        </h1>
        <div style={{
          fontSize: '0.7rem', fontWeight: 800, color: '#3b82f6',
          background: 'rgba(59,130,246,0.15)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(59,130,246,0.3)',
          padding: '0.3rem 0.6rem', borderRadius: '8px'
        }}>
          {installedParts.length}/{INSTALL_ORDER.length}
        </div>
      </div>

      {/* ── Initial placement prompt ────────────────────────────── */}
      {cameraReady && !placed && (
        <div
          onClick={handlePlace}
          style={{
            position: 'absolute', inset: 0, zIndex: 15, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)'
          }}
        >
          <div style={{
            background: 'rgba(15,23,42,0.92)', backdropFilter: 'blur(20px)',
            borderRadius: '28px', padding: '2.5rem 2rem', maxWidth: '340px', width: '90%',
            textAlign: 'center', border: '1.5px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)', pointerEvents: 'none'
          }}>
            <Hand size={48} color="#3b82f6" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 900, margin: '0 0 0.75rem' }}>
              Apuntá a una superficie plana
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 2rem' }}>
              Buscá una mesa o escritorio con buena iluminación. Tocá la pantalla para posicionar los componentes y comenzar el ensamblaje.
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              color: '#3b82f6', fontWeight: 800, fontSize: '1rem',
              animation: 'pulse 2s ease infinite'
            }}>
              <Smartphone size={20} /> Tocar para colocar
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom controls ──────────────────────────────────────── */}
      {placed && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
          padding: '0 1rem 1rem',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }}>
          {/* Selected part info bar */}
          {selected && selectedPartData && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(16px)',
              borderRadius: '16px', padding: '0.9rem 1rem',
              marginBottom: '0.75rem',
              border: `1.5px solid ${selectedPartData.color}40`
            }}>
              <div style={{ width: 8, height: 40, borderRadius: 4, background: selectedPartData.color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>{selectedPartData.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedPartData.desc.slice(0, 60)}...
                </div>
              </div>
              <button onClick={openInfo} style={{
                background: selectedPartData.color, color: '#fff', border: 'none',
                borderRadius: '12px', padding: '0.6rem 1rem', fontWeight: 800,
                fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem',
                flexShrink: 0
              }}>
                <Info size={14} /> Ver más
              </button>
              <button onClick={() => setSelected(null)} style={{
                background: 'rgba(255,255,255,0.08)', border: 'none', color: '#64748b',
                borderRadius: '10px', padding: '0.5rem', cursor: 'pointer', flexShrink: 0
              }}>
                <X size={16} />
              </button>
            </div>
          )}

          {/* Install + Reset buttons */}
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            {!isComplete ? (
              <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); installNext(); }} disabled={!!installingPart} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                background: installingPart ? 'rgba(59,130,246,0.3)' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: '#fff', border: 'none', borderRadius: '16px',
                padding: '1rem', fontWeight: 900, fontSize: '0.95rem',
                cursor: installingPart ? 'not-allowed' : 'pointer',
                boxShadow: installingPart ? 'none' : '0 4px 20px rgba(59,130,246,0.4)',
                fontFamily: 'inherit'
              }}>
                {installingPart ? (
                  <>Instalando {PARTS_DATA.find(p => p.id === installingPart)?.shortLabel}...</>
                ) : (
                  <><ChevronRight size={20} /> Iniciar Simulación: {nextPartData?.label}</>
                )}
              </button>
            ) : (
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                background: 'linear-gradient(135deg, #059669, #10b981)',
                color: '#fff', borderRadius: '16px', padding: '1rem',
                fontWeight: 900, fontSize: '0.95rem',
                boxShadow: '0 4px 20px rgba(16,185,129,0.4)'
              }}>
                <CheckCircle size={20} /> PC Ensamblada Correctamente
              </div>
            )}
            <button onClick={reset} style={{
              background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8',
              borderRadius: '14px', padding: '1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontWeight: 700, fontSize: '0.8rem', fontFamily: 'inherit'
            }}>
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', marginTop: '0.75rem' }}>
            {PARTS_DATA.map((p) => (
              <div key={p.id} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: installedParts.includes(p.id) ? p.color : 'rgba(255,255,255,0.15)',
                transition: 'all 0.3s',
                boxShadow: installedParts.includes(p.id) ? `0 0 8px ${p.color}60` : 'none',
                cursor: 'pointer'
              }} onClick={() => installedParts.includes(p.id) && setSelected(p.id)} title={p.label} />
            ))}
          </div>
        </div>
      )}

      {/* ── Full info modal ──────────────────────────────────────── */}
      {showInfo && selectedPartData && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 50,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem'
        }} onClick={() => setShowInfo(false)}>
          <div style={{
            background: '#0f172a', borderRadius: '28px',
            maxWidth: '480px', width: '100%', maxHeight: '85vh', overflowY: 'auto',
            border: `2px solid ${selectedPartData.color}30`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 40px ${selectedPartData.color}15`
          }} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div style={{
              padding: '1.5rem 1.5rem 1rem',
              borderBottom: `1px solid ${selectedPartData.color}20`,
              position: 'relative'
            }}>
              <div style={{
                width: 50, height: 4, borderRadius: 2, background: selectedPartData.color,
                marginBottom: '1rem'
              }} />
              <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900, margin: '0 0 0.5rem', paddingRight: '2rem' }}>
                {selectedPartData.name}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                {selectedPartData.desc}
              </p>
              <button onClick={() => setShowInfo(false)} style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'rgba(255,255,255,0.06)', border: 'none', color: '#64748b',
                width: 32, height: 32, borderRadius: 10, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <X size={18} />
              </button>
            </div>

            {/* Specs list */}
            <div style={{ padding: '1.25rem 1.5rem' }}>
              <h3 style={{
                fontSize: '0.75rem', fontWeight: 800, color: selectedPartData.color,
                textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem'
              }}>
                Especificaciones y Datos Técnicos
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {selectedPartData.specs.map((spec, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                    padding: '0.6rem 0.75rem', background: 'rgba(255,255,255,0.03)',
                    borderRadius: '10px', borderLeft: `3px solid ${selectedPartData.color}40`
                  }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%', marginTop: 6, flexShrink: 0,
                      background: selectedPartData.color
                    }} />
                    <span style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5 }}>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Close button */}
            <div style={{ padding: '0 1.5rem 1.5rem' }}>
              <button onClick={() => setShowInfo(false)} style={{
                width: '100%', background: selectedPartData.color, color: '#fff',
                border: 'none', borderRadius: '14px', padding: '0.9rem',
                fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit'
              }}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Inline styles ────────────────────────────────────────── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.97); }
        }
      `}</style>
    </div>
  );
};

export default AREnsamblaje;
