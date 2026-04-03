import React, { createContext, useContext, useState, useCallback } from 'react';

const API = '/api';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [docente, setDocente] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fd_docente') || 'null'); }
    catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('fd_token') || null);

  const login = useCallback(async (usuario, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error de login.');
    localStorage.setItem('fd_token', data.token);
    localStorage.setItem('fd_docente', JSON.stringify(data.docente));
    setToken(data.token);
    setDocente(data.docente);
    return data.docente;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('fd_token');
    localStorage.removeItem('fd_docente');
    setToken(null);
    setDocente(null);
  }, []);

  const authFetch = useCallback(async (path, opts = {}) => {
    const res = await fetch(`${API}${path}`, {
      ...opts,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, ...(opts.headers || {}) }
    });
    if (res.status === 401) { logout(); throw new Error('Sesión expirada. Iniciá sesión nuevamente.'); }
    return res;
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ docente, token, login, logout, authFetch, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
