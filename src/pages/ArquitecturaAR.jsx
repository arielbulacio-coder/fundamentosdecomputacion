import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line, Stars } from '@react-three/drei';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Square, RotateCcw, Cpu, Database, Layers, MonitorSmartphone, HardDrive, MemoryStick, CircuitBoard, Fan, CheckCircle } from 'lucide-react';
import './ArquitecturaAR.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   EDUCATIONAL DATA
   ═══════════════════════════════════════════════════════════════════════════════ */

const VN = {
  cpu:    { pos: [-3.5, 0.85, 0], size: [2.8, 1.7, 2.2], color: '#3b82f6', label: 'CPU',
            name: 'CPU — Unidad Central de Procesamiento',
            desc: 'El "cerebro" de la computadora. Ejecuta instrucciones del programa almacenado en memoria.',
            detail: 'Contiene la Unidad de Control (CU) que dirige las operaciones y la ALU que realiza los cálculos. En Von Neumann, accede a datos e instrucciones desde la misma memoria.' },
  ram:    { pos: [3.5, 1, 0], size: [2, 2, 2], color: '#22c55e', label: 'MEMORIA',
            name: 'Memoria Principal (RAM)',
            desc: 'Almacena tanto las instrucciones como los datos del programa en ejecución. Es volátil.',
            detail: 'En Von Neumann, instrucciones y datos comparten la misma memoria y el mismo bus — esto genera el famoso "cuello de botella de Von Neumann".' },
  input:  { pos: [-0.5, 0.5, -3.5], size: [2, 1, 1.2], color: '#f59e0b', label: 'ENTRADA',
            name: 'Dispositivos de Entrada',
            desc: 'Permiten al usuario enviar información: teclado, mouse, micrófono, escáner, cámara.',
            detail: 'Los datos se convierten en señales digitales que viajan por el bus de E/S hacia la CPU o memoria.' },
  output: { pos: [-0.5, 0.5, 3.5], size: [2, 1, 1.2], color: '#ef4444', label: 'SALIDA',
            name: 'Dispositivos de Salida',
            desc: 'Presentan los resultados del procesamiento: monitor, impresora, parlantes, proyector.',
            detail: 'La CPU envía datos procesados a través del bus hacia los dispositivos de salida.' },
};

const VN_BUSES = [
  { id: 'data',    points: [[-2.1, 0.85, -0.4], [2.5, 0.85, -0.4]], color: '#60a5fa', label: 'Bus Datos',
    name: 'Bus de Datos', desc: 'Transporta datos e instrucciones entre CPU y memoria. Bidireccional.',
    detail: 'Su ancho (32 o 64 bits) determina cuántos datos se transfieren simultáneamente.' },
  { id: 'address', points: [[-2.1, 0.85, 0],    [2.5, 0.85, 0]],    color: '#4ade80', label: 'Bus Dir.',
    name: 'Bus de Direcciones', desc: 'CPU envía la dirección de memoria a leer/escribir. Unidireccional (CPU→Memoria).',
    detail: 'Su ancho determina la memoria máxima direccionable. 32 bits = hasta 4 GB, 64 bits = 16 Exabytes teóricos.' },
  { id: 'control', points: [[-2.1, 0.85, 0.4],  [2.5, 0.85, 0.4]],  color: '#fb923c', label: 'Bus Ctrl',
    name: 'Bus de Control', desc: 'Transmite señales de sincronización: lectura, escritura, interrupciones, reloj.',
    detail: 'Coordina cuándo y cómo se comunican los componentes. Sin él, el sistema sería un caos.' },
];

const VN_IO_LINES = [
  { points: [[-0.5, 0.5, -2.9], [-2, 0.5, -1.3], [-2.1, 0.85, -0.6]], color: '#f59e0b' },
  { points: [[-2.1, 0.85, 0.6], [-2, 0.5, 1.3], [-0.5, 0.5, 2.9]],   color: '#ef4444' },
];

const CYCLE_PHASES = [
  { text: '1. FETCH — La CU envía la dirección de la instrucción por el Bus de Direcciones',
    highlight: 'cpu', busId: 'address', dir: 'forward', packetColor: '#4ade80' },
  { text: '2. FETCH — La memoria envía la instrucción por el Bus de Datos',
    highlight: 'ram', busId: 'data', dir: 'backward', packetColor: '#60a5fa' },
  { text: '3. DECODE — La Unidad de Control decodifica la instrucción recibida',
    highlight: 'cpu', busId: null, dir: null, packetColor: null },
  { text: '4. EXECUTE — La ALU ejecuta la operación aritmético-lógica',
    highlight: 'cpu', busId: null, dir: null, packetColor: null },
  { text: '5. STORE — El resultado se almacena en memoria por el Bus de Datos',
    highlight: 'ram', busId: 'data', dir: 'forward', packetColor: '#60a5fa' },
];

const CPU_DATA = {
  cu:   { pos: [-3, 0.9, 0], size: [2.2, 1.8, 1.8], color: '#8b5cf6', label: 'CU',
          name: 'Unidad de Control (CU)', desc: 'Dirige y coordina todas las operaciones del CPU. Decodifica instrucciones y genera señales de control.',
          detail: 'Funciona como un "director de orquesta": indica a cada componente qué hacer y cuándo hacerlo.' },
  alu:  { pos: [3, 0.9, 0], size: [2.2, 1.8, 1.8], color: '#ec4899', label: 'ALU',
          name: 'Unidad Aritmético-Lógica (ALU)', desc: 'Realiza operaciones matemáticas (suma, resta, multiplicación) y lógicas (AND, OR, NOT).',
          detail: 'Recibe operandos de los registros, los procesa y devuelve el resultado. También actualiza flags de estado (Carry, Zero, Overflow).' },
  pc:   { pos: [-3, 0.4, -3.2], size: [1.4, 0.8, 0.8], color: '#06b6d4', label: 'PC',
          name: 'Contador de Programa (PC)', desc: 'Registro que contiene la dirección de memoria de la próxima instrucción a ejecutar.',
          detail: 'Se incrementa automáticamente después de cada instrucción. Las instrucciones de salto (JMP, CALL) lo modifican.' },
  ir:   { pos: [0, 0.4, -3.2], size: [1.4, 0.8, 0.8], color: '#14b8a6', label: 'IR',
          name: 'Registro de Instrucción (IR)', desc: 'Almacena la instrucción actualmente en proceso de ejecución.',
          detail: 'La CU lee este registro para decodificar qué operación realizar y con qué operandos.' },
  mar:  { pos: [-3, 0.4, 3.2], size: [1.4, 0.8, 0.8], color: '#a78bfa', label: 'MAR',
          name: 'Registro de Dirección (MAR)', desc: 'Contiene la dirección de memoria que se va a leer o escribir.',
          detail: 'La CPU coloca aquí la dirección antes de enviarla por el bus de direcciones hacia la memoria.' },
  mbr:  { pos: [0, 0.4, 3.2], size: [1.4, 0.8, 0.8], color: '#c084fc', label: 'MBR',
          name: 'Registro de Datos (MBR)', desc: 'Contiene el dato leído de memoria o el dato que se va a escribir.',
          detail: 'Actúa como buffer entre la CPU y el bus de datos. Todo dato que entra o sale del CPU pasa por aquí.' },
  regs: { pos: [3, 0.4, -3.2], size: [1.8, 0.8, 0.8], color: '#f472b6', label: 'REGISTROS',
          name: 'Banco de Registros', desc: 'Registros de propósito general (R0-R7) para almacenamiento temporal ultrarrápido.',
          detail: 'Son las memorias más rápidas del sistema (~0.5 ns). La ALU opera directamente con datos en registros.' },
  cache:{ pos: [0, 0.3, 0], size: [2.5, 0.6, 1.5], color: '#fbbf24', label: 'CACHÉ',
          name: 'Memoria Caché', desc: 'Memoria ultrarrápida dentro del CPU que almacena datos e instrucciones frecuentemente usados.',
          detail: 'Reduce el cuello de botella de Von Neumann. Si el dato está en caché (cache hit), se evita el acceso lento a RAM.' },
};

const CPU_CONNECTIONS = [
  { from: [-1.9, 0.9, 0], to: [1.9, 0.9, 0], color: '#f472b6', label: 'Bus interno' },
  { from: [-3, 0.5, -0.9], to: [-3, 0.4, -2.8], color: '#06b6d4' },
  { from: [-1.6, 0.9, -0.9], to: [0, 0.4, -2.8], color: '#14b8a6' },
  { from: [-3, 0.5, 0.9], to: [-3, 0.4, 2.8], color: '#a78bfa' },
  { from: [-0.4, 0.5, 0.9], to: [0, 0.4, 2.8], color: '#c084fc' },
  { from: [1.9, 0.9, -0.9], to: [3, 0.4, -2.8], color: '#f472b6' },
  { from: [-1.25, 0.3, 0], to: [-1.9, 0.9, -0.3], color: '#fbbf24' },
  { from: [1.25, 0.3, 0], to: [1.9, 0.9, 0.3], color: '#fbbf24' },
];

const MEM_LEVELS = [
  { label: 'Registros',  size: '~1 KB',       speed: '0.5 ns',   color: '#ef4444', w: 1.5, name: 'Registros del CPU',
    desc: 'Dentro del CPU. Los más rápidos y costosos.', detail: 'Acceso en medio ciclo de reloj. Típicamente 16-32 registros de 64 bits.' },
  { label: 'Caché L1',   size: '32-64 KB',    speed: '~1 ns',    color: '#f97316', w: 2.2, name: 'Caché Nivel 1',
    desc: 'Dentro del CPU, una por núcleo. Datos más usados.', detail: 'Dividida en L1i (instrucciones) y L1d (datos). ~4 ciclos de latencia.' },
  { label: 'Caché L2',   size: '256 KB-1 MB', speed: '~4 ns',    color: '#eab308', w: 3.0, name: 'Caché Nivel 2',
    desc: 'Junto al núcleo. Mayor capacidad que L1.', detail: 'Unificada (instrucciones + datos). ~12 ciclos de latencia.' },
  { label: 'Caché L3',   size: '2-64 MB',     speed: '~10 ns',   color: '#84cc16', w: 3.8, name: 'Caché Nivel 3',
    desc: 'Compartida entre todos los núcleos.', detail: 'Crucial para rendimiento multinúcleo. ~40 ciclos de latencia.' },
  { label: 'RAM',        size: '4-128 GB',    speed: '~100 ns',  color: '#22c55e', w: 4.8, name: 'Memoria RAM (DRAM)',
    desc: 'Memoria principal. Volátil. Programas en ejecución.', detail: 'DDR5: hasta 6400 MT/s. ~200 ciclos. 100x más lenta que L1.' },
  { label: 'SSD',        size: '128 GB-4 TB', speed: '~100 μs',  color: '#06b6d4', w: 5.8, name: 'Disco de Estado Sólido',
    desc: 'Almacenamiento flash no volátil. Sin partes móviles.', detail: 'NVMe PCIe 5: hasta 14 GB/s secuencial. 1000x más lento que RAM.' },
  { label: 'HDD',        size: '500 GB-20 TB',speed: '~10 ms',   color: '#3b82f6', w: 6.8, name: 'Disco Duro Mecánico',
    desc: 'Platos giratorios magnéticos. Más barato por GB.', detail: '~200 MB/s lectura. 100.000x más lento que RAM. Para almacenamiento masivo.' },
];


/* ═══════════════════════════════════════════════════════════════════════════════
   REUSABLE 3D COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════════ */

const GlowBox = ({ position, size, color, label, isSelected, isHighlight, onClick, opacity = 0.85, children }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const emissiveTarget = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const target = isHighlight ? 0.6 : isSelected ? 0.35 : hovered ? 0.15 : 0;
    emissiveTarget.current += (target - emissiveTarget.current) * delta * 6;
    meshRef.current.material.emissiveIntensity = emissiveTarget.current;

    const s = isHighlight ? 1.08 : hovered ? 1.04 : 1;
    meshRef.current.scale.lerp({ x: s, y: s, z: s }, delta * 8);
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick?.(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <boxGeometry args={size} />
        <meshPhysicalMaterial
          color={color} transparent opacity={opacity}
          emissive={color} emissiveIntensity={0}
          metalness={0.3} roughness={0.4}
        />
      </mesh>
      <mesh>
        <boxGeometry args={size} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
      </mesh>
      {label && (
        <Text
          position={[0, size[1] / 2 + 0.3, 0]}
          fontSize={0.32} color="white" anchorX="center" anchorY="bottom"
          fontWeight="bold" outlineWidth={0.025} outlineColor="#000"
        >
          {label}
        </Text>
      )}
      {children}
    </group>
  );
};

const AnimatedPacket = ({ path, color, active }) => {
  const ref = useRef();
  const progress = useRef(0);

  useEffect(() => { progress.current = 0; }, [path, active]);

  useFrame((_, delta) => {
    if (!active || !ref.current || !path || path.length < 2) return;
    progress.current = Math.min(progress.current + delta * 0.55, 1);
    const t = progress.current;
    const n = path.length - 1;
    const seg = Math.min(Math.floor(t * n), n - 1);
    const segT = (t * n) - seg;
    const p1 = path[seg], p2 = path[Math.min(seg + 1, n)];
    ref.current.position.set(
      p1[0] + (p2[0] - p1[0]) * segT,
      p1[1] + (p2[1] - p1[1]) * segT + Math.sin(t * Math.PI) * 0.4,
      p1[2] + (p2[2] - p1[2]) * segT
    );
    ref.current.scale.setScalar(0.8 + Math.sin(t * Math.PI * 4) * 0.2);
  });

  if (!active || !path) return null;
  return (
    <mesh ref={ref} position={path[0]}>
      <sphereGeometry args={[0.18, 14, 14]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} toneMapped={false} />
    </mesh>
  );
};

const PhaseTimer = ({ animating, onAdvance }) => {
  const timer = useRef(0);
  useFrame((_, delta) => {
    if (!animating) { timer.current = 0; return; }
    timer.current += delta;
    if (timer.current >= 2.8) { timer.current = 0; onAdvance(); }
  });
  return null;
};

const FloorGrid = () => (
  <group>
    <gridHelper args={[20, 20, '#1a2744', '#151f36']} position={[0, -0.01, 0]} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
      <planeGeometry args={[22, 22]} />
      <meshStandardMaterial color="#0c1222" transparent opacity={0.9} />
    </mesh>
  </group>
);

const CameraReset = ({ target }) => {
  const { camera } = useThree();
  const controlsRef = useRef();
  useEffect(() => {
    if (target) {
      camera.position.set(...target);
      camera.lookAt(0, 1, 0);
    }
  }, [target, camera]);
  return <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.08} minDistance={3} maxDistance={25} target={[0, 1, 0]} />;
};


/* ═══════════════════════════════════════════════════════════════════════════════
   SCENE 1: VON NEUMANN ARCHITECTURE
   ═══════════════════════════════════════════════════════════════════════════════ */

const VonNeumannScene = ({ onSelect, selected, animating, cyclePhase }) => {
  const phase = CYCLE_PHASES[cyclePhase] || null;
  const busMap = {};
  VN_BUSES.forEach(b => { busMap[b.id] = b; });

  const packetPath = (() => {
    if (!phase || !phase.busId) return null;
    const bus = busMap[phase.busId];
    if (!bus) return null;
    return phase.dir === 'backward' ? [...bus.points].reverse() : bus.points;
  })();

  return (
    <group>
      {/* Main components */}
      {Object.entries(VN).map(([key, c]) => (
        <GlowBox key={key} position={c.pos} size={c.size} color={c.color} label={c.label}
          isSelected={selected === key} isHighlight={phase?.highlight === key}
          onClick={() => onSelect(key === selected ? null : key)}
        >
          {/* CPU internal: CU and ALU */}
          {key === 'cpu' && (
            <>
              <mesh position={[0, 0.28, -0.4]}>
                <boxGeometry args={[1.1, 0.6, 0.8]} />
                <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6"
                  emissiveIntensity={phase?.highlight === 'cpu' && (cyclePhase === 2) ? 0.8 : 0.1} />
              </mesh>
              <Text position={[0, 0.28, -0.01]} fontSize={0.18} color="#fff" anchorX="center" fontWeight="bold">CU</Text>
              <mesh position={[0, -0.28, 0.4]}>
                <boxGeometry args={[1.1, 0.6, 0.8]} />
                <meshStandardMaterial color="#ec4899" emissive="#ec4899"
                  emissiveIntensity={phase?.highlight === 'cpu' && (cyclePhase === 3) ? 0.8 : 0.1} />
              </mesh>
              <Text position={[0, -0.28, 0.81]} fontSize={0.18} color="#fff" anchorX="center" fontWeight="bold">ALU</Text>
            </>
          )}
          {/* RAM: cell grid visual */}
          {key === 'ram' && (
            <>
              {[...Array(8)].map((_, i) => (
                <mesh key={i} position={[-0.5 + (i % 2) * 1, 0.55 - Math.floor(i / 2) * 0.35, 0.85]}>
                  <boxGeometry args={[0.7, 0.25, 0.15]} />
                  <meshStandardMaterial color="#166534" emissive="#22c55e" emissiveIntensity={0.15} />
                </mesh>
              ))}
            </>
          )}
        </GlowBox>
      ))}

      {/* System buses */}
      {VN_BUSES.map(bus => (
        <group key={bus.id} onClick={(e) => { e.stopPropagation(); onSelect(selected === `bus_${bus.id}` ? null : `bus_${bus.id}`); }}>
          <Line points={bus.points} color={bus.color} lineWidth={3} dashed dashScale={1} dashSize={0.3} gapSize={0.15} />
          <Text
            position={[(bus.points[0][0] + bus.points[1][0]) / 2, bus.points[0][1] + 0.35, bus.points[0][2]]}
            fontSize={0.18} color={bus.color} anchorX="center" fontWeight="bold" outlineWidth={0.02} outlineColor="#000"
          >
            {bus.label}
          </Text>
        </group>
      ))}

      {/* I/O connection lines */}
      {VN_IO_LINES.map((line, i) => (
        <Line key={i} points={line.points} color={line.color} lineWidth={2} dashed dashScale={2} dashSize={0.2} gapSize={0.2} />
      ))}

      {/* Animated data packet */}
      <AnimatedPacket path={packetPath} color={phase?.packetColor || '#fff'} active={animating && phase?.busId != null} />

      {/* Direction arrows on buses */}
      <Text position={[0.2, 0.85, -0.4]} fontSize={0.22} color="#60a5fa" anchorX="center">{'↔'}</Text>
      <Text position={[0.2, 0.85, 0]}    fontSize={0.22} color="#4ade80" anchorX="center">{'→'}</Text>
      <Text position={[0.2, 0.85, 0.4]}  fontSize={0.22} color="#fb923c" anchorX="center">{'↔'}</Text>
    </group>
  );
};


/* ═══════════════════════════════════════════════════════════════════════════════
   SCENE 2: CPU INTERIOR
   ═══════════════════════════════════════════════════════════════════════════════ */

const CPUScene = ({ onSelect, selected }) => (
  <group>
    {Object.entries(CPU_DATA).map(([key, c]) => (
      <GlowBox key={key} position={c.pos} size={c.size} color={c.color} label={c.label}
        isSelected={selected === key} onClick={() => onSelect(key === selected ? null : key)}
        opacity={key === 'cache' ? 0.6 : 0.85}
      />
    ))}

    {/* Internal connections */}
    {CPU_CONNECTIONS.map((conn, i) => (
      <Line key={i} points={[conn.from, conn.to]} color={conn.color || '#475569'} lineWidth={2}
        dashed dashScale={2} dashSize={0.2} gapSize={0.15} />
    ))}

    {/* Section labels */}
    <Text position={[-3, 2.2, -3.2]} fontSize={0.22} color="#64748b" anchorX="center">Registros Especiales</Text>
    <Text position={[3, 1.2, -3.2]}  fontSize={0.22} color="#64748b" anchorX="center">Propósito General</Text>
    <Text position={[0, 2.2, 0]}     fontSize={0.28} color="#475569" anchorX="center">── Interior del CPU ──</Text>

    {/* Decorative: outer CPU shell (translucent) */}
    <mesh position={[0, 1, 0]}>
      <boxGeometry args={[9, 3.5, 9]} />
      <meshPhysicalMaterial color="#1e293b" transparent opacity={0.06} wireframe />
    </mesh>
  </group>
);


/* ═══════════════════════════════════════════════════════════════════════════════
   SCENE 3: MEMORY HIERARCHY PYRAMID
   ═══════════════════════════════════════════════════════════════════════════════ */

const MemoryScene = ({ onSelect, selected }) => {
  const baseY = -0.5;
  const layerH = 0.75;

  return (
    <group position={[0, -1, 0]}>
      {MEM_LEVELS.map((level, i) => {
        const y = baseY + (MEM_LEVELS.length - 1 - i) * layerH + layerH / 2;
        const key = `mem_${i}`;
        const isSelected = selected === key;
        return (
          <group key={i}>
            <GlowBox position={[0, y, 0]} size={[level.w, layerH * 0.85, 2.2]} color={level.color}
              label={level.label} isSelected={isSelected} onClick={() => onSelect(isSelected ? null : key)}
            />
            {/* Speed label - left side */}
            <Text position={[-level.w / 2 - 0.6, y, 0]} fontSize={0.2} color={level.color}
              anchorX="right" fontWeight="bold" outlineWidth={0.015} outlineColor="#000">
              {level.speed}
            </Text>
            {/* Size label - right side */}
            <Text position={[level.w / 2 + 0.6, y, 0]} fontSize={0.2} color="#94a3b8"
              anchorX="left" outlineWidth={0.015} outlineColor="#000">
              {level.size}
            </Text>
          </group>
        );
      })}

      {/* Axis labels */}
      <Text position={[-4.8, 2.5, 0]} fontSize={0.25} color="#64748b" anchorX="center" rotation={[0, 0, Math.PI / 2]}>
        {'← MÁS RÁPIDO'}
      </Text>
      <Text position={[4.8, 2.5, 0]} fontSize={0.25} color="#64748b" anchorX="center" rotation={[0, 0, -Math.PI / 2]}>
        {'← MÁS CAPACIDAD'}
      </Text>
      <Text position={[0, baseY + MEM_LEVELS.length * layerH + 0.5, 0]} fontSize={0.3} color="#475569" anchorX="center">
        Jerarquía de Memoria
      </Text>

      {/* Speed gradient arrow (left side) */}
      <Line points={[[-4.2, baseY, 0], [-4.2, baseY + MEM_LEVELS.length * layerH, 0]]}
        color="#ef4444" lineWidth={2} />
      {/* Capacity gradient arrow (right side) */}
      <Line points={[[4.2, baseY + MEM_LEVELS.length * layerH, 0], [4.2, baseY, 0]]}
        color="#3b82f6" lineWidth={2} />
    </group>
  );
};


/* ═══════════════════════════════════════════════════════════════════════════════
   SCENE 4: PC ASSEMBLY — Armado de PC con componentes 3D
   ═══════════════════════════════════════════════════════════════════════════════ */

const PC_PARTS = [
  { id: 'motherboard', label: 'MOTHERBOARD', color: '#059669', slot: [0, 0.15, 0], size: [5, 0.15, 4],
    name: 'Placa Madre (Motherboard)', desc: 'La base donde se conectan todos los componentes. Contiene chipset, slots y conectores.',
    detail: 'Formatos ATX, Micro-ATX, Mini-ITX. Incluye socket del CPU, slots DIMM para RAM, slots PCIe para GPU, y conectores SATA/M.2.' },
  { id: 'cpu', label: 'CPU', color: '#3b82f6', slot: [-1.2, 0.55, -0.5], size: [1.2, 0.3, 1.2],
    name: 'Procesador (CPU)', desc: 'El cerebro de la computadora. Se instala en el socket de la placa madre.',
    detail: 'Se coloca con cuidado alineando la flecha dorada con el socket. Intel usa LGA (pines en el socket), AMD usa PGA (pines en el CPU) o AM5 LGA.' },
  { id: 'cooler', label: 'COOLER', color: '#64748b', slot: [-1.2, 1.1, -0.5], size: [1.3, 0.8, 1.3],
    name: 'Disipador / Cooler', desc: 'Extrae el calor del procesador para mantenerlo a temperatura segura.',
    detail: 'Puede ser de aire (heatsink + ventilador) o líquido (AIO). El TDP del CPU determina qué cooler necesitás.' },
  { id: 'ram1', label: 'RAM 1', color: '#22c55e', slot: [1.2, 0.65, -1.2], size: [0.3, 0.8, 1.5],
    name: 'Módulo RAM DDR', desc: 'Memoria volátil de acceso rápido. Se inserta en los slots DIMM de la placa madre.',
    detail: 'DDR5 actual: 4800-7200 MHz. Siempre instalar en pares (Dual Channel) para duplicar el ancho de banda.' },
  { id: 'ram2', label: 'RAM 2', color: '#22c55e', slot: [1.7, 0.65, -1.2], size: [0.3, 0.8, 1.5],
    name: 'Módulo RAM DDR (Dual Channel)', desc: 'Segundo módulo idéntico para activar Dual Channel y duplicar el rendimiento.',
    detail: 'Los slots tienen colores alternados en la placa: instalar en el mismo color activa Dual Channel automáticamente.' },
  { id: 'gpu', label: 'GPU', color: '#ef4444', slot: [0, 0.65, 1.2], size: [3.5, 0.5, 1],
    name: 'Tarjeta Gráfica (GPU)', desc: 'Procesador especializado en gráficos. Se conecta al slot PCIe x16.',
    detail: 'Contiene su propia VRAM (GDDR6/6X). Modelos actuales: NVIDIA RTX 40xx, AMD RX 7xxx. Necesita alimentación extra del PSU.' },
  { id: 'ssd', label: 'SSD M.2', color: '#06b6d4', slot: [1.5, 0.35, 0.5], size: [0.6, 0.1, 1.8],
    name: 'Disco SSD M.2 NVMe', desc: 'Almacenamiento ultrarrápido que se conecta directamente a la placa madre.',
    detail: 'NVMe PCIe Gen 4: hasta 7000 MB/s lectura. Gen 5: hasta 14000 MB/s. Reemplazó a los discos SATA tradicionales.' },
  { id: 'psu', label: 'FUENTE', color: '#f59e0b', slot: [-1.5, 0.55, 1.5], size: [1.6, 0.8, 1.2],
    name: 'Fuente de Alimentación (PSU)', desc: 'Convierte la corriente alterna (220V) en corriente continua para los componentes.',
    detail: 'Certificación 80 Plus (eficiencia). Para gaming se recomiendan 650-850W. Conectores: 24-pin ATX, 8-pin CPU, PCIe para GPU.' },
];

const PC_INSTALL_ORDER = ['motherboard', 'cpu', 'cooler', 'ram1', 'ram2', 'ssd', 'gpu', 'psu'];

const PCPartBox = ({ part, installed, installing, onInstall, onSelect, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const startY = useRef(part.slot[1] + 3);
  const targetY = part.slot[1];

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (installing) {
      startY.current += (targetY - startY.current) * delta * 3;
      meshRef.current.position.y = startY.current;
    } else if (installed) {
      meshRef.current.position.y = targetY;
    }
    const glow = isSelected ? 0.4 : hovered ? 0.2 : 0.05;
    meshRef.current.material.emissiveIntensity += (glow - meshRef.current.material.emissiveIntensity) * delta * 6;
    const s = hovered ? 1.03 : 1;
    meshRef.current.scale.lerp({ x: s, y: s, z: s }, delta * 8);
  });

  if (!installed && !installing) return null;

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[part.slot[0], part.slot[1] + 3, part.slot[2]]}
        onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <boxGeometry args={part.size} />
        <meshPhysicalMaterial color={part.color} transparent opacity={0.85} emissive={part.color} emissiveIntensity={0.05} metalness={0.4} roughness={0.3} />
      </mesh>
      {installed && (
        <Text position={[part.slot[0], part.slot[1] + part.size[1] / 2 + 0.25, part.slot[2]]}
          fontSize={0.22} color="white" anchorX="center" anchorY="bottom" fontWeight="bold" outlineWidth={0.02} outlineColor="#000">
          {part.label}
        </Text>
      )}
    </group>
  );
};

const PCAssemblyScene = ({ onSelect, selected, installedParts, installingPart }) => {
  return (
    <group>
      {/* Case outline */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[6.5, 3, 5.5]} />
        <meshPhysicalMaterial color="#1e293b" transparent opacity={0.04} wireframe />
      </mesh>
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.5, 5.5]} />
        <meshStandardMaterial color="#0f172a" transparent opacity={0.5} />
      </mesh>

      {/* Slot guides for uninstalled parts */}
      {PC_PARTS.map(part => {
        if (installedParts.includes(part.id)) return null;
        if (installingPart === part.id) return null;
        return (
          <mesh key={`ghost_${part.id}`} position={part.slot}>
            <boxGeometry args={part.size} />
            <meshBasicMaterial color={part.color} transparent opacity={0.08} wireframe />
          </mesh>
        );
      })}

      {/* Installed parts */}
      {PC_PARTS.map(part => (
        <PCPartBox key={part.id} part={part}
          installed={installedParts.includes(part.id)}
          installing={installingPart === part.id}
          onSelect={() => onSelect(selected === part.id ? null : part.id)}
          isSelected={selected === part.id}
        />
      ))}

      {/* Labels */}
      <Text position={[0, 2.8, 0]} fontSize={0.3} color="#475569" anchorX="center">
        Armado de PC — Componentes Internos
      </Text>
    </group>
  );
};


/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */

const EXPERIENCES = [
  { id: 'vonneumann', label: 'Arquitectura Von Neumann', icon: Cpu, camera: [0, 10, 12], clase: 'Clase 2' },
  { id: 'cpu',        label: 'Interior del CPU',         icon: Layers, camera: [0, 8, 12], clase: 'Clase 3' },
  { id: 'memoria',    label: 'Jerarquía de Memoria',     icon: Database, camera: [8, 5, 5], clase: 'Clase 4' },
  { id: 'armado',     label: 'Ensamblaje RA',             icon: CircuitBoard, camera: [6, 6, 8], clase: 'RA', href: '/ar-ensamblaje' },
];

const ArquitecturaAR = () => {
  const navigate = useNavigate();
  const [experience, setExperience] = useState('vonneumann');
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [cyclePhase, setCyclePhase] = useState(0);
  const [installedParts, setInstalledParts] = useState([]);
  const [installingPart, setInstallingPart] = useState(null);

  const currentExp = EXPERIENCES.find(e => e.id === experience);

  // Reset state on experience change
  useEffect(() => {
    setSelected(null);
    setAnimating(false);
    setCyclePhase(0);
    setInstalledParts([]);
    setInstallingPart(null);
  }, [experience]);

  const installNextPart = () => {
    const next = PC_INSTALL_ORDER.find(id => !installedParts.includes(id));
    if (!next || installingPart) return;
    setInstallingPart(next);
    setTimeout(() => {
      setInstalledParts(prev => [...prev, next]);
      setInstallingPart(null);
    }, 1200);
  };

  const resetAssembly = () => {
    setInstalledParts([]);
    setInstallingPart(null);
    setSelected(null);
  };

  const pcComplete = installedParts.length === PC_INSTALL_ORDER.length;

  // Resolve selected component info
  const getInfo = () => {
    if (!selected) return null;
    if (selected.startsWith('bus_')) {
      const bus = VN_BUSES.find(b => `bus_${b.id}` === selected);
      return bus || null;
    }
    if (selected.startsWith('mem_')) {
      const idx = parseInt(selected.split('_')[1]);
      return MEM_LEVELS[idx] || null;
    }
    if (experience === 'vonneumann') return VN[selected] || null;
    if (experience === 'cpu') return CPU_DATA[selected] || null;
    if (experience === 'armado') return PC_PARTS.find(p => p.id === selected) || null;
    return null;
  };

  const info = getInfo();

  return (
    <div className="lab3d-container">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="lab3d-header">
        <div className="lab3d-header-top">
          <Link to="/" className="lab3d-back"><ArrowLeft size={20} /> Volver</Link>
          <h1 className="lab3d-title">Laboratorio 3D Interactivo</h1>
          <div className="lab3d-badge">
            <MonitorSmartphone size={14} /> Toca y rota
          </div>
        </div>
        <div className="lab3d-tabs">
          {EXPERIENCES.map(exp => (
            <button key={exp.id}
              className={`lab3d-tab ${experience === exp.id ? 'active' : ''}`}
              onClick={() => exp.href ? navigate(exp.href) : setExperience(exp.id)}
            >
              <exp.icon size={16} />
              <span className="lab3d-tab-label">{exp.label}</span>
              <span className="lab3d-tab-clase">{exp.clase}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 3D Viewport ───────────────────────────────────────────── */}
      <div className="lab3d-viewport">
        <Canvas shadows camera={{ position: currentExp.camera, fov: 50 }} dpr={[1, 2]}>
          <color attach="background" args={['#080e1a']} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[8, 12, 8]} intensity={0.8} />
          <pointLight position={[-8, 8, -8]} intensity={0.3} color="#60a5fa" />

          <Stars radius={80} depth={60} count={1500} factor={4} saturation={0.1} />
          <FloorGrid />
          <CameraReset target={currentExp.camera} />

          {experience === 'vonneumann' && (
            <>
              <VonNeumannScene onSelect={setSelected} selected={selected} animating={animating} cyclePhase={cyclePhase} />
              <PhaseTimer animating={animating} onAdvance={() => setCyclePhase(p => (p + 1) % CYCLE_PHASES.length)} />
            </>
          )}
          {experience === 'cpu' && <CPUScene onSelect={setSelected} selected={selected} />}
          {experience === 'memoria' && <MemoryScene onSelect={setSelected} selected={selected} />}
          {experience === 'armado' && <PCAssemblyScene onSelect={setSelected} selected={selected} installedParts={installedParts} installingPart={installingPart} />}
        </Canvas>

        {/* Cycle phase overlay */}
        {animating && experience === 'vonneumann' && (
          <div className="lab3d-phase-overlay">
            <div className="lab3d-phase-dot" style={{ background: CYCLE_PHASES[cyclePhase]?.packetColor || '#3b82f6' }} />
            <span>{CYCLE_PHASES[cyclePhase]?.text}</span>
          </div>
        )}

        {/* Hint when nothing is selected */}
        {!selected && !animating && (
          <div className="lab3d-hint">
            Toca un componente para ver su información
          </div>
        )}
      </div>

      {/* ── Controls ──────────────────────────────────────────────── */}
      {experience === 'vonneumann' && (
        <div className="lab3d-controls">
          <button className={`lab3d-btn ${animating ? 'stop' : 'play'}`}
            onClick={() => { setAnimating(a => !a); if (!animating) setCyclePhase(0); }}>
            {animating ? <><Square size={16} /> Detener Ciclo</> : <><Play size={16} /> Simular Fetch-Decode-Execute</>}
          </button>
          {animating && (
            <button className="lab3d-btn reset" onClick={() => setCyclePhase(0)}>
              <RotateCcw size={16} /> Reiniciar
            </button>
          )}
        </div>
      )}

      {/* ── Assembly Controls ─────────────────────────────────────── */}
      {experience === 'armado' && (
        <div className="lab3d-controls">
          {!pcComplete ? (
            <button className="lab3d-btn play" onClick={installNextPart} disabled={!!installingPart}>
              {installingPart
                ? <><RotateCcw size={16} className="lab3d-spin" /> Instalando...</>
                : <><Play size={16} /> Instalar: {PC_PARTS.find(p => p.id === PC_INSTALL_ORDER.find(id => !installedParts.includes(id)))?.label || ''}</>
              }
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#22c55e', fontWeight: 800, fontSize: '0.9rem' }}>
              <CheckCircle size={20} /> PC Armada Correctamente
            </div>
          )}
          {installedParts.length > 0 && (
            <button className="lab3d-btn reset" onClick={resetAssembly}>
              <RotateCcw size={16} /> Reiniciar Armado
            </button>
          )}
          <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>
            {installedParts.length}/{PC_INSTALL_ORDER.length} componentes
          </div>
        </div>
      )}

      {/* ── Info Panel ────────────────────────────────────────────── */}
      {info && (
        <div className="lab3d-info" onClick={() => setSelected(null)}>
          <div className="lab3d-info-inner" onClick={(e) => e.stopPropagation()}>
            <div className="lab3d-info-color" style={{ background: info.color }} />
            <div className="lab3d-info-content">
              <h3>{info.name}</h3>
              <p>{info.desc}</p>
              {info.detail && <p className="lab3d-info-detail">{info.detail}</p>}
            </div>
            <button className="lab3d-info-close" onClick={() => setSelected(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArquitecturaAR;
