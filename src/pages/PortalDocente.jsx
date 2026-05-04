import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  LogIn, LogOut, Users, Award, BookOpen, Filter,
  Download, Search, RefreshCw, Shield, ChevronDown,
  CheckCircle, AlertCircle, PlusCircle, X, Trash2, Settings, Edit3
} from 'lucide-react';

// ─── Login Screen ──────────────────────────────────────────────────────────────
const LoginScreen = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ usuario: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.usuario, form.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: '#1e293b', borderRadius: '40px', padding: 'clamp(1.5rem, 4vw, 4rem)', maxWidth: '480px', width: '100%', border: '1.5px solid rgba(255,255,255,0.06)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Shield size={56} color="#3b82f6" style={{ margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: 0 }}>Portal Docente</h1>
          <p style={{ color: '#64748b', marginTop: '0.75rem', fontSize: '1rem' }}>SimuTec — Simuladores Tecnológicos</p>
        </div>

        <form onSubmit={handleSubmit}>
          {['usuario', 'password'].map(k => (
            <div key={k} style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {k === 'usuario' ? 'Usuario' : 'Contraseña'}
              </label>
              <input
                type={k === 'password' ? 'password' : 'text'}
                required
                value={form[k]}
                onChange={(e) => setForm(f => ({ ...f, [k]: e.target.value }))}
                style={{ width: '100%', background: '#0f172a', border: '2px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1rem 1.25rem', color: '#fff', fontSize: '1rem', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>
          ))}

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '1rem', color: '#ef4444', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#334155' : '#3b82f6', color: '#fff', border: 'none', padding: '1.25rem', borderRadius: '18px', fontWeight: 900, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <LogIn size={20} /> {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <a
          href="/"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem', color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}
        >
          <LogIn size={16} style={{ transform: 'rotate(180deg)' }} /> Volver al Inicio
        </a>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem', marginTop: '1rem' }}>
          Acceso restringido a docentes autorizados.
        </p>
      </motion.div>
    </div>
  );
};

// ─── Admin: Create / Edit Teacher Modal ───────────────────────────────────────
const DocenteModal = ({ isOpen, onClose, onSaved, editing }) => {
  const { authFetch } = useAuth();
  const isEdit = !!editing;
  const [form, setForm] = useState({ usuario: '', password: '', nombre_completo: '', comisiones: '' });
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (isOpen && editing) {
      setForm({
        usuario: editing.usuario || '',
        password: '',
        nombre_completo: editing.nombre_completo || '',
        comisiones: (editing.comisiones || []).join(', ')
      });
      setStatus('idle');
      setMsg('');
    } else if (isOpen) {
      setForm({ usuario: '', password: '', nombre_completo: '', comisiones: '' });
      setStatus('idle');
      setMsg('');
    }
  }, [isOpen, editing]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const comisiones = form.comisiones.split(',').map(s => s.trim()).filter(Boolean);
      const body = { nombre_completo: form.nombre_completo, comisiones };

      if (isEdit) {
        if (form.password) body.password = form.password;
        const res = await authFetch(`/docentes/${editing.id}`, {
          method: 'PUT',
          body: JSON.stringify(body)
        });
        const data = await res.json();
        if (res.ok) { setStatus('success'); setMsg(data.mensaje || 'Docente actualizado.'); onSaved?.(); }
        else { setStatus('error'); setMsg(data.error); }
      } else {
        body.usuario = form.usuario;
        body.password = form.password;
        const res = await authFetch('/docentes', {
          method: 'POST',
          body: JSON.stringify(body)
        });
        const data = await res.json();
        if (res.ok) { setStatus('success'); setMsg(data.mensaje || 'Docente creado.'); onSaved?.(); }
        else { setStatus('error'); setMsg(data.error); }
      }
    } catch (err) { setStatus('error'); setMsg(err.message); }
  };

  const fields = [
    { k: 'nombre_completo', l: 'Nombre Completo', p: 'Ej: Prof. María García', t: 'text', required: true },
    { k: 'usuario', l: 'Usuario', p: 'Ej: mgarcia', t: 'text', required: !isEdit, disabled: isEdit },
    { k: 'password', l: isEdit ? 'Nueva Contraseña (dejar vacío para no cambiar)' : 'Contraseña', p: isEdit ? 'Solo si desea cambiarla' : 'Mínimo 6 caracteres', t: 'password', required: !isEdit },
    { k: 'comisiones', l: 'Comisiones (separadas por coma)', p: 'Ej: 2025-A, 2025-B', t: 'text', required: false },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ background: '#1e293b', borderRadius: '35px', padding: '3rem', maxWidth: '500px', width: '100%', border: '1.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900 }}>{isEdit ? 'Editar Docente' : 'Crear Docente'}</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={24} /></button>
        </div>
        {status === 'success' ? (
          <div style={{ textAlign: 'center' }}>
            <CheckCircle size={48} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: '#22c55e', fontWeight: 800 }}>{msg}</p>
            <button onClick={onClose} style={{ marginTop: '1.5rem', background: '#22c55e', color: '#000', border: 'none', padding: '0.75rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer' }}>Cerrar</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {fields.map(({ k, l, p, t, required, disabled }) => (
              <div key={k} style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{l}</label>
                <input
                  type={t}
                  required={required}
                  disabled={disabled}
                  value={form[k]}
                  onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                  placeholder={p}
                  style={{ width: '100%', background: disabled ? '#1a2332' : '#0f172a', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.9rem 1rem', color: disabled ? '#475569' : '#fff', fontSize: '0.95rem', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none', opacity: disabled ? 0.6 : 1 }}
                />
              </div>
            ))}
            {status === 'error' && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem' }}>{msg}</div>}
            <button type="submit" disabled={status === 'loading'} style={{ width: '100%', background: '#3b82f6', color: '#fff', border: 'none', padding: '1rem', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', fontSize: '1rem' }}>
              {status === 'loading' ? (isEdit ? 'Guardando...' : 'Creando...') : (isEdit ? 'Guardar Cambios' : 'Crear Docente')}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

// ─── Admin: Confirm Delete Modal ──────────────────────────────────────────────
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, docente: target }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !target) return null;

  const handleDelete = async () => {
    setLoading(true);
    await onConfirm(target.id);
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ background: '#1e293b', borderRadius: '35px', padding: '3rem', maxWidth: '450px', width: '100%', border: '1.5px solid rgba(239,68,68,0.2)', textAlign: 'center' }}>
        <Trash2 size={48} color="#ef4444" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.5rem', fontWeight: 900 }}>Eliminar Docente</h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          ¿Estás seguro de eliminar a <strong style={{ color: '#fff' }}>{target.nombre_completo || target.usuario}</strong>? Esta acción no se puede deshacer.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={onClose} disabled={loading} style={{ background: '#334155', color: '#94a3b8', border: 'none', padding: '0.9rem 2rem', borderRadius: '14px', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem' }}>
            Cancelar
          </button>
          <button onClick={handleDelete} disabled={loading} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.9rem 2rem', borderRadius: '14px', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trash2 size={16} /> {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main Dashboard ────────────────────────────────────────────────────────────
const Dashboard = () => {
  const { docente, logout, authFetch } = useAuth();
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('evaluaciones');
  const [filters, setFilters] = useState({ comision: '', unidad: '', clase: '' });
  const [searchDni, setSearchDni] = useState('');
  const [searchNombre, setSearchNombre] = useState('');
  const [showDocenteModal, setShowDocenteModal] = useState(false);
  const [editingDocente, setEditingDocente] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchEvaluaciones = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.comision) params.set('comision', filters.comision);
      if (filters.unidad) params.set('unidad', filters.unidad);
      if (filters.clase) params.set('clase', filters.clase);
      const res = await authFetch(`/evaluaciones?${params}`);
      const data = await res.json();
      setEvaluaciones(data.evaluaciones || []);
    } catch (err) { console.error(err.message); }
    finally { setLoading(false); }
  }, [authFetch, filters]);

  const fetchDocentes = useCallback(async () => {
    if (!docente?.admin) return;
    try {
      const res = await authFetch('/docentes');
      const data = await res.json();
      setDocentes(data.docentes || []);
    } catch (err) { console.error(err.message); }
  }, [authFetch, docente]);

  const deleteDocente = useCallback(async (id) => {
    try {
      const res = await authFetch(`/docentes/${id}`, { method: 'DELETE' });
      if (res.ok) { fetchDocentes(); setDeleteTarget(null); }
      else { const data = await res.json(); alert(data.error || 'Error al eliminar'); }
    } catch (err) { alert(err.message); }
  }, [authFetch, fetchDocentes]);

  const openEdit = (d) => { setEditingDocente(d); setShowDocenteModal(true); };
  const openCreate = () => { setEditingDocente(null); setShowDocenteModal(true); };
  const closeDocenteModal = () => { setShowDocenteModal(false); setEditingDocente(null); };

  useEffect(() => { fetchEvaluaciones(); }, [fetchEvaluaciones]);
  useEffect(() => { if (activeTab === 'docentes') fetchDocentes(); }, [activeTab, fetchDocentes]);

  const filtered = evaluaciones.filter(e => {
    const dniOk = !searchDni || e.dni.includes(searchDni.trim());
    const nombreOk = !searchNombre || e.apellido.toLowerCase().includes(searchNombre.toLowerCase()) || e.nombres.toLowerCase().includes(searchNombre.toLowerCase());
    return dniOk && nombreOk;
  });

  const buildRows = () => {
    const headers = ['Comisión', 'DNI', 'Apellido', 'Nombres', 'Materia', 'Unidad', 'Clase', 'Puntaje', 'Total', '%', 'Fecha'];
    const rows = filtered.map(e => [
      e.numero_comision, e.dni, e.apellido, e.nombres,
      e.materia || 'Fundamentos de Computación', e.unidad, e.clase,
      e.puntaje, e.total, e.porcentaje,
      new Date(e.fecha).toLocaleString('es-AR')
    ]);
    return { headers, rows };
  };

  const exportCSV = () => {
    const { headers, rows } = buildRows();
    const csv = [headers, ...rows].map(r => r.join(';')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `evaluaciones_${Date.now()}.csv`;
    link.click();
  };

  const exportXLS = () => {
    const { headers, rows } = buildRows();
    const tableHtml = `<html><head><meta charset="UTF-8"></head><body><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></body></html>`;
    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `evaluaciones_${Date.now()}.xls`;
    link.click();
  };

  const CARD = { background: '#1e293b', borderRadius: '30px', padding: '2.5rem', border: '1.5px solid rgba(255,255,255,0.05)' };
  const LABEL = { fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' };
  const INPUT = { background: '#0f172a', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box' };

  // Stats
  const total = filtered.length;
  const unidades = [...new Set(evaluaciones.map(e => e.unidad))].sort();
  const comisiones = [...new Set(evaluaciones.map(e => e.numero_comision))].sort();
  const avgPct = total > 0 ? (filtered.reduce((a, e) => a + parseFloat(e.porcentaje), 0) / total).toFixed(1) : 0;

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc' }}>
      {/* Navbar */}
      <header style={{ background: '#1e293b', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Shield size={32} color="#3b82f6" />
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>Portal Docente</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Fundamentos de Computación</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a
             href="/"
             style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
             Sitio Principal
          </a>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            👤 <strong style={{ color: '#fff' }}>Docente Activo</strong>
            {docente?.admin && <span style={{ marginLeft: '0.5rem', background: '#3b82f620', color: '#3b82f6', borderRadius: '8px', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 800 }}>ADMIN</span>}
          </span>
          <button onClick={logout} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', padding: '0.6rem 1.25rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <LogOut size={16} /> Salir
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {[
            { id: 'evaluaciones', label: 'Evaluaciones', icon: <Award size={18} /> },
            ...(docente?.admin ? [{ id: 'docentes', label: 'Gestión Docentes', icon: <Users size={18} /> }] : [])
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.9rem 2rem', borderRadius: '18px', border: '1.5px solid', borderColor: activeTab === tab.id ? '#3b82f6' : 'rgba(255,255,255,0.08)', background: activeTab === tab.id ? '#3b82f620' : 'transparent', color: activeTab === tab.id ? '#3b82f6' : '#94a3b8', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem' }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ══ TAB: EVALUACIONES ══ */}
        {activeTab === 'evaluaciones' && (
          <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              {[
                { label: 'Total Aprobados', value: total, color: '#22c55e' },
                { label: 'Promedio', value: `${avgPct}%`, color: '#3b82f6' },
                { label: 'Comisiones', value: comisiones.length, color: '#f59e0b' },
                { label: 'Unidades', value: unidades.length, color: '#8b5cf6' }
              ].map((s, i) => (
                <div key={i} style={{ ...CARD, textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div style={{ ...CARD, marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1.5rem', alignItems: 'end' }}>
                <div>
                  <label style={LABEL}>Comisión</label>
                  <select value={filters.comision} onChange={e => setFilters(f => ({ ...f, comision: e.target.value }))} style={INPUT}>
                    <option value="">Todas</option>
                    {comisiones.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={LABEL}>Unidad</label>
                  <select value={filters.unidad} onChange={e => setFilters(f => ({ ...f, unidad: e.target.value }))} style={INPUT}>
                    <option value="">Todas</option>
                    {unidades.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label style={LABEL}>Buscar por DNI</label>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="text" value={searchDni} onChange={e => setSearchDni(e.target.value)} placeholder="Ej: 40123456" style={{ ...INPUT, paddingLeft: '2.75rem' }} />
                  </div>
                </div>
                <div>
                  <label style={LABEL}>Buscar por Apellido / Nombre</label>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="text" value={searchNombre} onChange={e => setSearchNombre(e.target.value)} placeholder="Ej: García" style={{ ...INPUT, paddingLeft: '2.75rem' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={fetchEvaluaciones} style={{ flex: 1, background: '#1e293b', border: '1.5px solid rgba(255,255,255,0.08)', color: '#94a3b8', borderRadius: '12px', padding: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <RefreshCw size={16} /> Actualizar
                  </button>
                  <button onClick={exportCSV} style={{ flex: 1, background: '#22c55e', border: 'none', color: '#000', borderRadius: '12px', padding: '0.75rem', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Download size={16} /> CSV
                  </button>
                  <button onClick={exportXLS} style={{ flex: 1, background: '#3b82f6', border: 'none', color: '#fff', borderRadius: '12px', padding: '0.75rem', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Download size={16} /> Excel
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div style={{ ...CARD, overflow: 'auto' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: 'clamp(1.5rem, 4vw, 4rem)', color: '#64748b' }}>Cargando resultados...</div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 'clamp(1.5rem, 4vw, 4rem)', color: '#64748b' }}>
                  <BookOpen size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                  <p>No hay evaluaciones registradas con los filtros seleccionados.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['Comisión', 'DNI', 'Apellido', 'Nombres', 'Materia', 'Unidad', 'Clase', 'Puntaje', '%', 'Fecha'].map(h => (
                        <th key={h} style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((e, i) => (
                      <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'default' }}>
                        <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}><span style={{ background: '#3b82f620', color: '#3b82f6', borderRadius: '8px', padding: '4px 10px', fontWeight: 700, fontSize: '0.85rem' }}>{e.numero_comision}</span></td>
                        <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{e.dni}</td>
                        <td style={{ padding: '1rem', fontWeight: 700 }}>{e.apellido}</td>
                        <td style={{ padding: '1rem', color: '#94a3b8' }}>{e.nombres}</td>
                        <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.85rem' }}>{e.materia || 'Fundamentos de Computación'}</td>
                        <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.85rem' }}>{e.unidad}</td>
                        <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.85rem' }}>{e.clase}</td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}><span style={{ fontWeight: 900 }}>{e.puntaje}/{e.total}</span></td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <span style={{ color: parseFloat(e.porcentaje) >= 80 ? '#22c55e' : parseFloat(e.porcentaje) >= 60 ? '#f59e0b' : '#ef4444', fontWeight: 800 }}>{e.porcentaje}%</span>
                        </td>
                        <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{new Date(e.fecha).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ══ TAB: DOCENTES (Admin) ══ */}
        {activeTab === 'docentes' && docente?.admin && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
              <button onClick={openCreate} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '18px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <PlusCircle size={20} /> Nuevo Docente
              </button>
            </div>
            <div style={{ ...CARD, overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['Usuario', 'Nombre', 'Comisiones Asignadas', 'Admin', 'Creado', 'Acciones'].map(h => (
                      <th key={h} style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {docentes.map((d) => (
                    <tr key={d.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>{d.usuario}</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>Usuario Autorizado</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {(d.comisiones || []).length > 0
                            ? d.comisiones.map(c => <span key={c} style={{ background: '#3b82f620', color: '#3b82f6', borderRadius: '8px', padding: '3px 10px', fontSize: '0.8rem', fontWeight: 700 }}>{c}</span>)
                            : <span style={{ color: '#475569' }}>Todas (admin)</span>}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>{d.es_admin ? <CheckCircle size={18} color="#22c55e" /> : <X size={18} color="#475569" />}</td>
                      <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.85rem' }}>{new Date(d.creado_en).toLocaleDateString('es-AR')}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => openEdit(d)} title="Editar" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3b82f6', borderRadius: '10px', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Edit3 size={16} />
                          </button>
                          {!d.es_admin && (
                            <button onClick={() => setDeleteTarget(d)} title="Eliminar" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', borderRadius: '10px', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <DocenteModal
        isOpen={showDocenteModal}
        onClose={closeDocenteModal}
        onSaved={() => { closeDocenteModal(); fetchDocentes(); }}
        editing={editingDocente}
      />
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteDocente}
        docente={deleteTarget}
      />
    </div>
  );
};

// ─── Page Root ─────────────────────────────────────────────────────────────────
const PortalDocente = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Dashboard /> : <LoginScreen />;
};

export default PortalDocente;
