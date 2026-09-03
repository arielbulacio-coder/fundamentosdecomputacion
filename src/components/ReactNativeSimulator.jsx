import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Play, RotateCcw, Copy, Check, Smartphone, Terminal,
    Layers, List, Navigation, ShieldCheck, Database, Camera,
    Zap, Sparkles, ChevronRight, ExternalLink
} from 'lucide-react';

// PRESETS EDUCATIVOS DEL CURSO
export const SIMULATOR_PRESETS = [
    {
        id: 'flexbox',
        unit: 'Unidad 1.1',
        title: 'Flexbox & Layout Móvil',
        icon: <Layers size={18} />,
        summary: 'Aprende el modelo de caja y alineación en React Native con StyleSheet.',
        code: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📱 Flexbox Móvil</Text>
        <Text style={styles.subtitle}>React Native por defecto usa flexDirection: 'column'</Text>
      </View>

      <View style={styles.boxRow}>
        <View style={[styles.box, { backgroundColor: '#3b82f6' }]}>
          <Text style={styles.boxText}>Box 1</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#10b981' }]}>
          <Text style={styles.boxText}>Box 2</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#f59e0b' }]}>
          <Text style={styles.boxText}>Box 3</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeading}>Propiedades Clave:</Text>
        <Text style={styles.bullet}>• justifyContent: Distribuye en eje principal</Text>
        <Text style={styles.bullet}>• alignItems: Alinea en eje cruzado</Text>
        <Text style={styles.bullet}>• gap: Espaciado moderno entre hijos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  subtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    gap: 8,
  },
  box: {
    width: 75,
    height: 75,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeading: {
    color: '#f8fafc',
    fontWeight: '700',
    marginBottom: 8,
    fontSize: 14,
  },
  bullet: {
    color: '#cbd5e1',
    fontSize: 12,
    marginBottom: 4,
  }
});`,
        renderSimulator: ({ config, log }) => {
            const [direction, setDirection] = useState('row');
            const [justify, setJustify] = useState('space-around');

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', background: '#0f172a', color: '#fff', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#38bdf8' }}>📱 Flexbox Móvil</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                            React Native (flexDirection: '{direction}')
                        </div>

                        {/* Interactive Controls inside phone */}
                        <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px', fontSize: '11px' }}>
                            <div style={{ color: '#64748b', marginBottom: '6px', fontWeight: '700' }}>INTERACTÚA CON FLEXBOX:</div>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                                <button
                                    onClick={() => { setDirection(d => d === 'row' ? 'column' : 'row'); log(`flexDirection: ${direction === 'row' ? 'column' : 'row'}`); }}
                                    style={{ flex: 1, padding: '5px', borderRadius: '6px', background: '#3b82f6', color: '#fff', fontSize: '11px', fontWeight: '700' }}
                                >
                                    Dir: {direction}
                                </button>
                                <button
                                    onClick={() => {
                                        const next = justify === 'space-around' ? 'center' : (justify === 'center' ? 'flex-end' : 'space-around');
                                        setJustify(next);
                                        log(`justifyContent: ${next}`);
                                    }}
                                    style={{ flex: 1, padding: '5px', borderRadius: '6px', background: '#6366f1', color: '#fff', fontSize: '11px', fontWeight: '700' }}
                                >
                                    Justify: {justify.slice(0, 7)}
                                </button>
                            </div>
                        </div>

                        {/* Visual Boxes Container */}
                        <div style={{
                            display: 'flex',
                            flexDirection: direction,
                            justifyContent: justify,
                            alignItems: 'center',
                            minHeight: '160px',
                            background: '#1e293b',
                            borderRadius: '14px',
                            padding: '12px',
                            marginTop: '12px',
                            border: '1px dashed #475569',
                            gap: '8px'
                        }}>
                            <motion.div animate={{ scale: [0.95, 1] }} style={{ width: '60px', height: '60px', background: '#3b82f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px' }}>
                                Box 1
                            </motion.div>
                            <motion.div animate={{ scale: [0.95, 1] }} style={{ width: '60px', height: '60px', background: '#10b981', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px' }}>
                                Box 2
                            </motion.div>
                            <motion.div animate={{ scale: [0.95, 1] }} style={{ width: '60px', height: '60px', background: '#f59e0b', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px' }}>
                                Box 3
                            </motion.div>
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #334155', borderRadius: '10px', padding: '10px', fontSize: '11px', color: '#cbd5e1' }}>
                        <div style={{ fontWeight: '700', color: '#38bdf8', marginBottom: '2px' }}>💡 Consejo Docente:</div>
                        En React Native todo contenedor tiene <code style={{ color: '#f43f5e' }}>display: 'flex'</code> por defecto. ¡No existe display inline o block!
                    </div>
                </div>
            );
        }
    },
    {
        id: 'state',
        unit: 'Unidad 1.2',
        title: 'Estado con useState & Eventos',
        icon: <Zap size={18} />,
        summary: 'Manejo de estado reactivo, inmutabilidad y eventos táctiles onPress.',
        code: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CounterApp() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
    console.log('Nuevo valor:', count + 1);
  };

  const reset = () => {
    setCount(0);
    console.log('Contador reiniciado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>UNIDAD 1.2 • REACT STATE</Text>
      <Text style={styles.number}>{count}</Text>
      <Text style={styles.label}>Toques registrados</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.btnPrimary} onPress={increment}>
          <Text style={styles.btnText}>+ Incrementar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={reset}>
          <Text style={styles.btnSecondaryText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}`,
        renderSimulator: ({ log }) => {
            const [count, setCount] = useState(0);

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#0a0f1d', color: '#fff', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '1px', fontWeight: '800', color: '#38bdf8', background: 'rgba(56,189,248,0.1)', padding: '4px 10px', borderRadius: '999px', marginBottom: '16px' }}>
                        UNIDAD 1.2 • REACT STATE
                    </div>

                    <motion.div
                        key={count}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ fontSize: '56px', fontWeight: '900', color: '#ffffff', lineHeight: 1 }}
                    >
                        {count}
                    </motion.div>

                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px', marginBottom: '24px' }}>
                        Toques registrados con <span style={{ color: '#a855f7' }}>useState()</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px' }}>
                        <button
                            onClick={() => {
                                setCount(c => c + 1);
                                log(`[State] setCount(${count + 1}) -> Re-render ejecutado`);
                            }}
                            style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', color: '#fff', fontWeight: '800', fontSize: '14px', boxShadow: '0 4px 15px rgba(59,130,246,0.4)' }}
                        >
                            + Incrementar Toque
                        </button>

                        <button
                            onClick={() => {
                                setCount(0);
                                log(`[State] Contador reseteado a 0`);
                            }}
                            style={{ width: '100%', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', color: '#94a3b8', fontWeight: '600', fontSize: '12px' }}
                        >
                            Reiniciar
                        </button>
                    </div>
                </div>
            );
        }
    },
    {
        id: 'flatlist',
        unit: 'Unidad 1.2',
        title: 'Colecciones con FlatList',
        icon: <List size={18} />,
        summary: 'Renderizado virtualizado de alto rendimiento vs ScrollView ordinario.',
        code: `import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CURSOS = [
  { id: '1', nombre: 'Fundamentos de React Native', tag: 'Básico', icon: '⚛️' },
  { id: '2', nombre: 'Expo Router & Navegación', tag: 'Intermedio', icon: '🧭' },
  { id: '3', nombre: 'Zustand & Global State', tag: 'Avanzado', icon: '🐻' },
  { id: '4', nombre: 'Firebase Firestore en Tiempo Real', tag: 'Backend', icon: '🔥' },
  { id: '5', nombre: 'Acceso a Cámara y GPS', tag: 'Nativo', icon: '📸' },
  { id: '6', nombre: 'Build & EAS Deploy en Tiendas', tag: 'DevOps', icon: '🚀' },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.tag}>{item.tag}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={CURSOS}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}`,
        renderSimulator: ({ log }) => {
            const [items] = useState([
                { id: '1', nombre: 'React Native & Expo', tag: 'Semana 1', icon: '⚛️', color: '#38bdf8' },
                { id: '2', nombre: 'Expo Router (Tabs)', tag: 'Semana 3', icon: '🧭', color: '#818cf8' },
                { id: '3', nombre: 'Zustand State Store', tag: 'Semana 5', icon: '🐻', color: '#fbbf24' },
                { id: '4', nombre: 'Firebase Cloud Firestore', tag: 'Semana 8', icon: '🔥', color: '#f97316' },
                { id: '5', nombre: 'Cámara & Sensores GPS', tag: 'Semana 10', icon: '📸', color: '#34d399' },
                { id: '6', nombre: 'EAS Build & Deploy APK', tag: 'Semana 14', icon: '🚀', color: '#ec4899' },
            ]);

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#090d16', color: '#fff', overflow: 'hidden' }}>
                    <div style={{ padding: '14px 16px 8px', borderBottom: '1px solid #1e293b', background: '#0e1526' }}>
                        <div style={{ fontSize: '15px', fontWeight: '800', color: '#38bdf8' }}>📚 Lista Virtualizada</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>Renderizado eficiente con <code style={{ color: '#a855f7' }}>FlatList</code></div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {items.map(item => (
                            <div
                                key={item.id}
                                onClick={() => log(`[FlatList] Click en item ID ${item.id}: "${item.nombre}"`)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 12px',
                                    background: '#151d30',
                                    borderRadius: '12px',
                                    border: '1px solid #23304e',
                                    cursor: 'pointer'
                                }}
                            >
                                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#f1f5f9' }}>{item.nombre}</div>
                                    <span style={{ fontSize: '9px', fontWeight: '800', color: item.color, background: `${item.color}15`, padding: '2px 6px', borderRadius: '4px' }}>
                                        {item.tag}
                                    </span>
                                </div>
                                <ChevronRight size={14} color="#64748b" />
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '8px 12px', background: '#0e1526', borderTop: '1px solid #1e293b', fontSize: '10px', color: '#64748b', textAlign: 'center' }}>
                        Solo renderiza los elementos visibles en el viewport móvil
                    </div>
                </div>
            );
        }
    },
    {
        id: 'router',
        unit: 'Unidad 1.3',
        title: 'Navegación con Expo Router',
        icon: <Navigation size={18} />,
        summary: 'Enrutamiento basado en archivos: _layout.tsx, Tabs y Stack.',
        code: `import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#38bdf8' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="explorar"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => <Ionicons name="search" color={color} />
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person" color={color} />
        }}
      />
    </Tabs>
  );
}`,
        renderSimulator: ({ log }) => {
            const [tab, setTab] = useState('inicio');

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0b1120', color: '#fff' }}>
                    {/* Header Stack */}
                    <div style={{ padding: '12px 16px', background: '#111827', borderBottom: '1px solid #1f2937', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#38bdf8' }}>
                            {tab === 'inicio' ? '🏠 Feed Principal' : (tab === 'explorar' ? '🔍 Búsqueda & Explorar' : '👤 Perfil de Alumno')}
                        </div>
                        <span style={{ fontSize: '10px', background: '#1f2937', padding: '2px 8px', borderRadius: '999px', color: '#94a3b8' }}>app/(tabs)/{tab}.tsx</span>
                    </div>

                    {/* Content Screen */}
                    <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                        >
                            <div style={{ fontSize: '40px' }}>
                                {tab === 'inicio' ? '📱' : (tab === 'explorar' ? '🧭' : '🎓')}
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: '800' }}>
                                {tab === 'inicio' ? 'Bienvenido a SimuTec Mobile' : (tab === 'explorar' ? 'Catálogo de Recursos' : 'Estudiante: Tec. Software')}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', maxWidth: '200px' }}>
                                Expo Router maneja las pantallas según la estructura del sistema de archivos.
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Tab Bar */}
                    <div style={{ height: '56px', background: '#111827', borderTop: '1px solid #1f2937', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px' }}>
                        {[
                            { id: 'inicio', label: 'Inicio', icon: '🏠' },
                            { id: 'explorar', label: 'Explorar', icon: '🔍' },
                            { id: 'perfil', label: 'Perfil', icon: '👤' },
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setTab(t.id);
                                    log(`[Expo Router] Navegando a /(tabs)/${t.id}`);
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    background: 'none',
                                    border: 'none',
                                    color: tab === t.id ? '#38bdf8' : '#64748b',
                                    fontSize: '10px',
                                    fontWeight: tab === t.id ? '800' : '500',
                                    padding: '4px 16px',
                                    cursor: 'pointer'
                                }}
                            >
                                <span style={{ fontSize: '16px' }}>{t.icon}</span>
                                <span>{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            );
        }
    },
    {
        id: 'form',
        unit: 'Unidad 2.3',
        title: 'Formularios & Zod Validation',
        icon: <ShieldCheck size={18} />,
        summary: 'Inputs controlados, schema validation con Zod y teclado móvil adaptativo.',
        code: `import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email('Email inválido (@unpilar.edu.ar)'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const result = userSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
      alert('¡Validación exitosa con Zod!');
    }
  };
}`,
        renderSimulator: ({ log }) => {
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [error, setError] = useState(null);
            const [success, setSuccess] = useState(false);

            const validate = (e) => {
                e.preventDefault();
                if (!email.includes('@') || !email.includes('.')) {
                    setError('Ingresa un email institucional válido.');
                    setSuccess(false);
                    log('[Zod Error] Email inválido');
                    return;
                }
                if (password.length < 6) {
                    setError('La contraseña debe tener mínimo 6 caracteres.');
                    setSuccess(false);
                    log('[Zod Error] Password menor a 6 chars');
                    return;
                }
                setError(null);
                setSuccess(true);
                log(`[Zod Success] Credenciales validadas: ${email}`);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', background: '#0a0f1d', color: '#fff', justifyContent: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#38bdf8', marginBottom: '4px' }}>
                        🔐 Acceso Estudiantes
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '16px' }}>
                        Validado con <code style={{ color: '#34d399' }}>zod.safeParse()</code>
                    </div>

                    <form onSubmit={validate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px', fontWeight: '700' }}>EMAIL:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alumno@unpilar.edu.ar"
                                style={{ width: '100%', padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px', fontWeight: '700' }}>CONTRASEÑA (MIN 6):</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{ width: '100%', padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                            />
                        </div>

                        {error && (
                            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '8px', borderRadius: '8px', fontSize: '11px' }}>
                                ⚠️ {error}
                            </div>
                        )}

                        {success && (
                            <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#86efac', padding: '8px', borderRadius: '8px', fontSize: '11px' }}>
                                ✅ ¡Formulario validado correctamente!
                            </div>
                        )}

                        <button
                            type="submit"
                            style={{ marginTop: '8px', padding: '12px', background: '#3b82f6', color: '#fff', borderRadius: '10px', fontWeight: '800', fontSize: '13px' }}
                        >
                            Validar y Continuar
                        </button>
                    </form>
                </div>
            );
        }
    },
    {
        id: 'firebase',
        unit: 'Unidad 3.1',
        title: 'Firebase Firestore en Tiempo Real',
        icon: <Database size={18} />,
        summary: 'CRUD con addDoc, deleteDoc y sincronización reactiva onSnapshot.',
        code: `import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Escuchar cambios en tiempo real
useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'tareas'), snapshot => {
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTareas(lista);
  });
  return () => unsubscribe();
}, []);

// Agregar tarea
const agregar = async (texto) => {
  await addDoc(collection(db, 'tareas'), {
    titulo: texto,
    createdAt: new Date()
  });
};`,
        renderSimulator: ({ log }) => {
            const [tasks, setTasks] = useState([
                { id: '1', title: 'Configurar proyecto con Expo Router', done: true },
                { id: '2', title: 'Crear store con Zustand', done: false },
                { id: '3', title: 'Testear en dispositivo con Expo Go', done: false },
            ]);
            const [newTitle, setNewTitle] = useState('');

            const addTask = () => {
                if (!newTitle.trim()) return;
                const newTask = { id: Date.now().toString(), title: newTitle.trim(), done: false };
                setTasks(prev => [...prev, newTask]);
                log(`[Firestore Mock] addDoc("tareas", { title: "${newTitle}" }) -> onSnapshot() emitido`);
                setNewTitle('');
            };

            const toggle = (id) => {
                setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
                log(`[Firestore Mock] updateDoc("tareas/${id}") sincronizado`);
            };

            const remove = (id) => {
                setTasks(prev => prev.filter(t => t.id !== id));
                log(`[Firestore Mock] deleteDoc("tareas/${id}")`);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0f1d', color: '#fff', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div>
                            <div style={{ fontSize: '15px', fontWeight: '800', color: '#f97316' }}>🔥 Firebase Firestore</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Colección en tiempo real: <code style={{ color: '#fbbf24' }}>/tareas</code></div>
                        </div>
                        <span style={{ fontSize: '9px', background: 'rgba(16,185,129,0.2)', color: '#34d399', padding: '2px 8px', borderRadius: '999px', fontWeight: '700' }}>
                            ● Conectado
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addTask()}
                            placeholder="Nueva tarea móvil..."
                            style={{ flex: 1, padding: '8px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                        />
                        <button
                            onClick={addTask}
                            style={{ padding: '8px 12px', background: '#f97316', color: '#fff', borderRadius: '8px', fontWeight: '800', fontSize: '11px' }}
                        >
                            +
                        </button>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {tasks.map(t => (
                            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: '#151d30', borderRadius: '8px', border: '1px solid #23304e' }}>
                                <input
                                    type="checkbox"
                                    checked={t.done}
                                    onChange={() => toggle(t.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <span style={{ flex: 1, fontSize: '11px', textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#64748b' : '#f1f5f9' }}>
                                    {t.title}
                                </span>
                                <button
                                    onClick={() => remove(t.id)}
                                    style={{ background: 'none', color: '#ef4444', fontSize: '11px', padding: '2px 4px' }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    },
    {
        id: 'hardware',
        unit: 'Unidad 2.4',
        title: 'Hardware & Sensores (GPS/Cámara)',
        icon: <Camera size={18} />,
        summary: 'Permisos del sistema operativo y acceso a expo-camera y expo-location.',
        code: `import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Pedir permisos de ubicación
const { status } = await Location.requestForegroundPermissionsAsync();
if (status === 'granted') {
  const loc = await Location.getCurrentPositionAsync({});
  console.log('Lat:', loc.coords.latitude);
  console.log('Lng:', loc.coords.longitude);
}`,
        renderSimulator: ({ log }) => {
            const [hasGps, setHasGps] = useState(false);
            const [coords, setCoords] = useState(null);
            const [flash, setFlash] = useState(false);
            const [photoCount, setPhotoCount] = useState(0);

            const requestGps = () => {
                log('[Permissions] Location.requestForegroundPermissionsAsync() -> GRANTED');
                setHasGps(true);
                setCoords({ lat: -34.4586, lng: -58.9142, city: 'Pilar, Prov. Buenos Aires' });
                log('[Location] Coordenadas UNPilar obtenidas: -34.4586, -58.9142');
            };

            const snapPhoto = () => {
                setFlash(true);
                setTimeout(() => setFlash(false), 200);
                setPhotoCount(c => c + 1);
                log(`[Camera] Foto capturada #${photoCount + 1} guardada en cache`);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#050811', color: '#fff', padding: '14px', position: 'relative' }}>
                    {flash && (
                        <div style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 10, pointerEvents: 'none' }} />
                    )}

                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#34d399', marginBottom: '2px' }}>
                        📡 Sensores del Dispositivo
                    </div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '12px' }}>
                        Permisos nativos en runtime (Android & iOS)
                    </div>

                    {/* Camera Mock Viewfinder */}
                    <div style={{
                        flex: 1,
                        background: '#111c2e',
                        borderRadius: '12px',
                        border: '2px dashed #334155',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '12px',
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        <Camera size={36} color="#38bdf8" style={{ marginBottom: '6px' }} />
                        <div style={{ fontSize: '11px', fontWeight: '700' }}>Visor de Cámara Simulado</div>
                        <div style={{ fontSize: '9px', color: '#64748b' }}>Fotos tomadas: {photoCount}</div>

                        <button
                            onClick={snapPhoto}
                            style={{ marginTop: '10px', padding: '6px 14px', borderRadius: '999px', background: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: '800' }}
                        >
                            📸 Disparar Obturador
                        </button>
                    </div>

                    {/* GPS Widget */}
                    <div style={{ marginTop: '10px', background: '#0e1626', padding: '10px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                        {!hasGps ? (
                            <button
                                onClick={requestGps}
                                style={{ width: '100%', padding: '8px', background: '#10b981', color: '#fff', borderRadius: '8px', fontSize: '11px', fontWeight: '700' }}
                            >
                                📍 Solicitar Permiso de Ubicación
                            </button>
                        ) : (
                            <div style={{ fontSize: '10px' }}>
                                <div style={{ color: '#34d399', fontWeight: '800' }}>✓ Permiso GPS Concedido</div>
                                <div style={{ color: '#cbd5e1', marginTop: '2px' }}>Lat: {coords.lat} | Lng: {coords.lng}</div>
                                <div style={{ color: '#94a3b8', fontSize: '9px' }}>{coords.city}</div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    },
    {
        id: 'animations',
        unit: 'Unidad 3.2',
        title: 'Animaciones con Reanimated 3',
        icon: <Sparkles size={18} />,
        summary: 'Microinteracciones fluidas a 60 FPS corriendo directamente en el UI Thread.',
        code: `import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function BounceBox() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPress = () => {
    scale.value = withSpring(scale.value === 1 ? 1.3 : 1);
  };

  return (
    <Animated.View style={[styles.box, animatedStyle]}>
      <Text>60 FPS</Text>
    </Animated.View>
  );
}`,
        renderSimulator: ({ log }) => {
            const [active, setActive] = useState(false);

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#090d16', color: '#fff', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#a855f7', background: 'rgba(168,85,247,0.1)', padding: '3px 10px', borderRadius: '999px', marginBottom: '14px' }}>
                        UNIDAD 3.2 • UI THREAD
                    </div>

                    <motion.div
                        animate={{
                            scale: active ? 1.25 : 1,
                            rotate: active ? 10 : 0,
                            borderRadius: active ? '30px' : '16px'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        onClick={() => {
                            setActive(a => !a);
                            log(`[Reanimated 3] withSpring(scale: ${active ? 1 : 1.25}) ejecutado en UI Thread nativo`);
                        }}
                        style={{
                            width: '110px',
                            height: '110px',
                            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px rgba(168,85,247,0.4)',
                            userSelect: 'none'
                        }}
                    >
                        <Sparkles size={28} color="#fff" />
                        <span style={{ fontSize: '11px', fontWeight: '900', marginTop: '4px' }}>Tócame</span>
                    </motion.div>

                    <div style={{ marginTop: '20px', fontSize: '11px', color: '#94a3b8', maxWidth: '200px' }}>
                        ¡No bloquea el hilo de JavaScript! Corre a 60/120 FPS sin caídas de frames.
                    </div>
                </div>
            );
        }
    }
];

const ReactNativeSimulator = ({ initialPreset = 'flexbox' }) => {
    const [selectedPresetId, setSelectedPresetId] = useState(initialPreset);
    const [deviceType, setDeviceType] = useState('iphone'); // 'iphone' | 'android'
    const [copied, setCopied] = useState(false);
    const [logs, setLogs] = useState([]);
    const [currentTime, setCurrentTime] = useState('12:00');
    const [keyReload, setKeyReload] = useState(0);

    const activePreset = SIMULATOR_PRESETS.find(p => p.id === selectedPresetId) || SIMULATOR_PRESETS[0];

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };
        updateClock();
        const timer = setInterval(updateClock, 30000);
        return () => clearInterval(timer);
    }, []);

    const addLog = (msg) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev.slice(-15), { id: Math.random(), time, msg }]);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(activePreset.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        addLog('Código copiado al portapapeles para Expo Snack.');
    };

    const reloadPhone = () => {
        setKeyReload(k => k + 1);
        addLog('[Metro Bundler] Fast Refresh recargado en 120ms.');
    };

    return (
        <div style={{
            background: 'linear-gradient(180deg, #090e1a 0%, #050810 100%)',
            border: '1px solid #1e293b',
            borderRadius: '24px',
            padding: '1.5rem',
            color: '#f8fafc',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}>
            {/* Header del Simulador */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Smartphone size={22} color="#fff" />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900 }}>Simulador React Native & Expo</h3>
                            <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', background: '#0284c7', color: '#fff', fontWeight: '800' }}>SDK 51+</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Interactúa con código nativo en vivo como en tu smartphone</p>
                    </div>
                </div>

                {/* Preset Selector Pill Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {SIMULATOR_PRESETS.map(preset => (
                        <button
                            key={preset.id}
                            onClick={() => {
                                setSelectedPresetId(preset.id);
                                addLog(`Cargando lección: ${preset.title}`);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.45rem 0.85rem',
                                borderRadius: '10px',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                background: selectedPresetId === preset.id ? '#0284c7' : 'rgba(255,255,255,0.05)',
                                color: selectedPresetId === preset.id ? '#fff' : '#cbd5e1',
                                border: '1px solid',
                                borderColor: selectedPresetId === preset.id ? '#38bdf8' : 'transparent',
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                            }}
                        >
                            {preset.icon}
                            <span>{preset.title.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Stage: Editor / Controls + Smartphone */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>

                {/* COLUMNA IZQUIERDA: Código Fuente & Explicación Didáctica */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0 }}>
                    {/* Header de la Lección */}
                    <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #1e293b' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {activePreset.unit} • Tema del Programa
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Lic. Ariel Bulacio (UNPilar)</span>
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{activePreset.title}</h4>
                        <p style={{ margin: '0.3rem 0 0', fontSize: '0.88rem', color: '#cbd5e1' }}>{activePreset.summary}</p>
                    </div>

                    {/* Editor de Código */}
                    <div style={{ background: '#070b14', borderRadius: '14px', border: '1px solid #1e293b', overflow: 'hidden' }}>
                        <div style={{ padding: '0.6rem 1rem', background: '#0b1120', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                                <Terminal size={14} color="#38bdf8" />
                                <span>App.tsx (TypeScript / JSX)</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={copyCode}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}
                                >
                                    {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                                    <span>{copied ? 'Copiado' : 'Copiar Código'}</span>
                                </button>
                                <a
                                    href="https://snack.expo.dev"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#0284c7', color: '#fff', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', textDecoration: 'none' }}
                                >
                                    <span>Abrir en Expo Snack</span>
                                    <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>

                        {/* Código con Resaltado y scroll */}
                        <pre style={{
                            margin: 0,
                            padding: '1rem',
                            fontSize: '0.8rem',
                            fontFamily: 'Consolas, Monaco, "Fira Code", monospace',
                            color: '#e2e8f0',
                            lineHeight: 1.5,
                            maxHeight: '320px',
                            overflowY: 'auto',
                            background: '#070b14'
                        }}>
                            <code>{activePreset.code}</code>
                        </pre>
                    </div>

                    {/* Metro Terminal Logs */}
                    <div style={{ background: '#060a12', borderRadius: '14px', border: '1px solid #1e293b', padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#38bdf8', fontSize: '0.75rem', fontWeight: '800' }}>
                            <Terminal size={14} />
                            <span>CONSOLA METRO BUNDLER / LOGS</span>
                        </div>
                        <div style={{ height: '65px', overflowY: 'auto', fontSize: '0.75rem', fontFamily: 'monospace', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {logs.length === 0 ? (
                                <span style={{ color: '#475569' }}>Esperando interacciones en el teléfono...</span>
                            ) : (
                                logs.map(l => (
                                    <div key={l.id} style={{ display: 'flex', gap: '8px' }}>
                                        <span style={{ color: '#64748b' }}>[{l.time}]</span>
                                        <span style={{ color: '#cbd5e1' }}>{l.msg}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Smartphone Chassis Interactivo */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Device Selector Switches */}
                    <div style={{ display: 'flex', gap: '0.4rem', background: '#0f172a', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                        <button
                            onClick={() => setDeviceType('iphone')}
                            style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', background: deviceType === 'iphone' ? '#0284c7' : 'transparent', color: '#fff' }}
                        >
                            iPhone 15
                        </button>
                        <button
                            onClick={() => setDeviceType('android')}
                            style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', background: deviceType === 'android' ? '#0284c7' : 'transparent', color: '#fff' }}
                        >
                            Pixel Android
                        </button>
                        <button
                            onClick={reloadPhone}
                            title="Recargar App"
                            style={{ padding: '4px 8px', borderRadius: '6px', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}
                        >
                            <RotateCcw size={14} />
                        </button>
                    </div>

                    {/* Smartphone Bezel */}
                    <div style={{
                        width: '290px',
                        height: '560px',
                        background: '#000',
                        borderRadius: deviceType === 'iphone' ? '46px' : '36px',
                        padding: '12px',
                        boxShadow: '0 0 0 4px #2b3544, 0 20px 50px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                    }}>
                        {/* Dynamic Island / Notch */}
                        <div style={{
                            position: 'absolute',
                            top: '18px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: deviceType === 'iphone' ? '85px' : '14px',
                            height: deviceType === 'iphone' ? '20px' : '14px',
                            background: '#000',
                            borderRadius: '20px',
                            zIndex: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 3px rgba(255,255,255,0.1)'
                        }}>
                            {deviceType === 'iphone' && (
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0a0f1d', marginLeft: 'auto', marginRight: '8px' }} />
                            )}
                        </div>

                        {/* Mobile Screen Surface */}
                        <div style={{
                            flex: 1,
                            background: '#020617',
                            borderRadius: deviceType === 'iphone' ? '36px' : '26px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            border: '1px solid #1e293b'
                        }}>
                            {/* Mobile Status Bar */}
                            <div style={{
                                height: '32px',
                                padding: '0 16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '11px',
                                fontWeight: '700',
                                color: '#fff',
                                zIndex: 20,
                                background: 'rgba(0,0,0,0.3)',
                                backdropFilter: 'blur(5px)'
                            }}>
                                <span>{currentTime}</span>
                                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', fontSize: '10px' }}>
                                    <span>5G</span>
                                    <span>📶</span>
                                    <span>🔋 100%</span>
                                </div>
                            </div>

                            {/* Live App Container */}
                            <div key={keyReload} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                {activePreset.renderSimulator({
                                    config: {},
                                    log: addLog
                                })}
                            </div>

                            {/* Home Indicator Bar */}
                            <div style={{ height: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000' }}>
                                <div style={{ width: '90px', height: '3px', background: '#fff', borderRadius: '999px', opacity: 0.6 }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
                        Toca los elementos de la pantalla para interactuar
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReactNativeSimulator;
