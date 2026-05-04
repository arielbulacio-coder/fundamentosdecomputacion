import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Shield, BookOpen, Flag, CircuitBoard } from 'lucide-react';

const NavBar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();
    const [activeDropdown, setActiveDropdown] = React.useState(null);

    const fundamentosGroups = [
        {
            label: 'Unidad 1 — Hardware y Arquitectura',
            links: [
                { name: 'Clase 1: Generaciones', path: '/generaciones' },
                { name: 'Clase 2: Arquitecturas (Von Neumann)', path: '/von-neumann' },
                { name: 'Clase 3: Cerebro CPU', path: '/cpu' },
                { name: 'Clase 4: Jerarquía de Memoria', path: '/memoria' },
                { name: 'Clase 5: Hardware y Boot', path: '/arranque' },
            ]
        },
        {
            label: 'Unidad 2 — Sociedad y Software',
            links: [
                { name: 'Clase 6: Sociedad y SW', path: '/sociedad-software' },
                { name: 'Clase 7: Transformación Digital', path: '/cultura-digital' },
            ]
        },
        {
            label: 'Unidad 3 — Datos y Lógica',
            links: [
                { name: 'Clase 8: Representación de Datos', path: '/representacion-datos' },
                { name: 'Clase 9: Lógica y Ética', path: '/logica-digital' },
            ]
        },
        {
            label: 'Unidad 4 — Sistemas y Seguridad',
            links: [
                { name: 'Clase 10: Sistemas Operativos', path: '/sistema-operativo' },
                { name: 'Clase 11: Seguridad', path: '/seguridad-informatica' },
            ]
        },
        {
            label: 'Simuladores 3D y RA',
            links: [
                { name: 'Arquitectura 3D', path: '/ar-arquitectura' },
                { name: 'Ensamblaje PC (RA)', path: '/ar-ensamblaje' },
            ]
        }
    ];

    const fundamentosPaths = fundamentosGroups.flatMap(g => g.links.map(l => l.path));
    const isFundamentosActive = fundamentosPaths.some(p => location.pathname === p);

    return (
        <nav style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border)',
            padding: '0.75rem 1.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
                    }}>
                        <CircuitBoard size={24} color="#fff" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>SimuTec</h1>
                        <p style={{ fontSize: '0.65rem', opacity: 0.6, margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Simuladores Tecnológicos</p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div style={{ display: 'none', gap: '0.5rem', alignItems: 'center' }} className="desktop-only">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        <Home size={18} /> Inicio
                    </Link>

                    {/* Fundamentos de la Computación (mega-dropdown) */}
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setActiveDropdown('fundamentos')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button
                            className={`nav-link ${isFundamentosActive ? 'active' : ''}`}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                        >
                            <BookOpen size={18} /> Fundamentos de la Computación <span style={{ fontSize: '0.7rem' }}>▼</span>
                        </button>
                        {activeDropdown === 'fundamentos' && (
                            <div className="mega-menu">
                                {fundamentosGroups.map(group => (
                                    <div key={group.label} className="mega-group">
                                        <div className="mega-group-title">{group.label}</div>
                                        {group.links.map(link => (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                className={`drop-link ${location.pathname === link.path ? 'active' : ''}`}
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Proyecto Malvinas (link directo) */}
                    <Link
                        to="/proyecto-malvinas"
                        className={`nav-link malvinas-link ${location.pathname === '/proyecto-malvinas' ? 'active' : ''}`}
                    >
                        <Flag size={18} /> Proyecto Malvinas
                    </Link>

                    <Link
                        to="/portal-docente"
                        className={`nav-link ${location.pathname === '/portal-docente' ? 'active' : ''}`}
                        style={{ marginLeft: '0.75rem', borderLeft: '1px solid var(--border)', paddingLeft: '1.25rem', color: '#3b82f6' }}
                    >
                        <Shield size={18} /> Acceso Docente
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ border: 'none', background: 'none', color: '#004a99' }}
                    className="mobile-only"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    style={{
                        padding: '1.5rem',
                        background: '#fff',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }}
                    className="mobile-only"
                >
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#004a99', fontWeight: 900, padding: '0.75rem' }}
                    >
                        <Home size={20} /> Inicio
                    </Link>

                    <div className="mobile-section-header">
                        <BookOpen size={16} /> Fundamentos de la Computación
                    </div>
                    {fundamentosGroups.map(group => (
                        <div key={group.label} style={{ paddingLeft: '0.5rem' }}>
                            <div className="mobile-unit-header">{group.label}</div>
                            {group.links.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    ))}

                    <div className="mobile-section-header" style={{ marginTop: '1.25rem' }}>
                        <Flag size={16} /> Proyecto Malvinas
                    </div>
                    <Link
                        to="/proyecto-malvinas"
                        onClick={() => setIsOpen(false)}
                        className={`mobile-nav-link ${location.pathname === '/proyecto-malvinas' ? 'active' : ''}`}
                    >
                        Stand inmersivo + recorrido
                    </Link>

                    <div style={{ margin: '1.5rem 0.5rem 0.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                        <Link
                            to="/portal-docente"
                            onClick={() => setIsOpen(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#3b82f6', fontWeight: 900, padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '15px' }}
                        >
                            <Shield size={20} /> Acceso Portal Docente
                        </Link>
                    </div>
                </div>
            )}

            <style>{`
                .desktop-only { display: flex !important; }
                .mobile-only { display: none !important; }
                @media (max-width: 992px) {
                    .desktop-only { display: none !important; }
                    .mobile-only { display: block !important; }
                }
                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: var(--text-light);
                    padding: 0.55rem 0.85rem;
                    border-radius: 10px;
                    text-decoration: none;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .nav-link:hover, .nav-link.active {
                    color: var(--primary);
                    background: rgba(0, 74, 153, 0.05);
                }
                .malvinas-link {
                    background: linear-gradient(135deg, #35446a, #b45354);
                    color: #f0ece5 !important;
                }
                .malvinas-link:hover, .malvinas-link.active {
                    background: linear-gradient(135deg, #b45354, #35446a);
                    color: #fff !important;
                }
                .drop-link {
                    padding: 0.6rem 0.85rem;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--text-light);
                    text-decoration: none;
                    border-radius: 8px;
                    transition: all 0.2s;
                    display: block;
                }
                .drop-link:hover {
                    background: rgba(0, 74, 153, 0.05);
                    color: var(--primary);
                }
                .drop-link.active {
                    background: var(--primary);
                    color: #fff;
                }
                .mega-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    box-shadow: 0 12px 32px rgba(0,0,0,0.12);
                    padding: 1rem;
                    display: grid;
                    grid-template-columns: repeat(2, minmax(220px, 1fr));
                    gap: 1rem;
                    min-width: 540px;
                    max-width: calc(100vw - 4rem);
                    z-index: 1001;
                }
                .mega-group {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .mega-group-title {
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #888;
                    padding: 0.4rem 0.85rem 0.5rem;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 0.25rem;
                }
                .mobile-section-header {
                    margin: 1rem 0 0.5rem;
                    font-size: 0.8rem;
                    color: #004a99;
                    font-weight: 900;
                    padding: 0.5rem 0.75rem;
                    background: rgba(0, 74, 153, 0.06);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .mobile-unit-header {
                    margin: 0.75rem 0 0.4rem;
                    font-size: 0.7rem;
                    color: #888;
                    font-weight: 800;
                    padding-left: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .mobile-nav-link {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    text-decoration: none;
                    color: #333;
                    font-weight: 600;
                    padding: 0.85rem 1rem;
                    border-radius: 10px;
                }
                .mobile-nav-link.active {
                    color: #004a99;
                    background: rgba(0, 74, 153, 0.05);
                    font-weight: 900;
                }
            `}</style>
        </nav>
    );
};

export default NavBar;
