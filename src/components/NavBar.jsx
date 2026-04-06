import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, Landmark, History, Home, Database, Power, Share2, Shield } from 'lucide-react';
import logo from '../assets/logo_unpilar.png';

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const [activeDropdown, setActiveDropdown] = React.useState(null);

  const unit1Links = [
    { name: 'Clase 1: Generaciones', path: '/generaciones' },
    { name: 'Clase 2: Arquitecturas', path: '/von-neumann' },
    { name: 'Clase 3: Cerebro CPU', path: '/cpu' },
    { name: 'Clase 4: Jerarquía Memoria', path: '/memoria' },
    { name: 'Clase 5: Hardware y Boot', path: '/arranque' },
    { name: 'Lab 3D Interactivo', path: '/ar-arquitectura' },
  ];

  const unit2Links = [
    { name: 'Clase 6: Sociedad y SW', path: '/sociedad-software' },
    { name: 'Clase 7: Transformación', path: '/cultura-digital' },
  ];

  const unit3Links = [
    { name: 'Clase 8: Repr. Datos', path: '/representacion-datos' },
    { name: 'Clase 9: Lógica y Ética', path: '/logica-digital' },
  ];

  const unit4Links = [
    { name: 'Clase 10: Sist. Operativo', path: '/sistema-operativo' },
    { name: 'Clase 11: Seguridad', path: '/seguridad-informatica' },
  ];

  return (
    <nav style={{ 
      background: 'rgba(255, 255, 255, 0.8)', 
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)', 
      padding: '0.75rem 1.5rem', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img src="/logo_unpilar.png" alt="UNPilar Logo" style={{ height: '38px' }} />
          <div>
            <h1 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>SimuUnpilar</h1>
            <p style={{ fontSize: '0.65rem', opacity: 0.6, margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Recursos Interactivos · UNPilar</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'none', gap: '1rem', alignItems: 'center' }} className="desktop-only">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <Home size={18} /> Inicio
          </Link>
          
          {/* Unidad 1 Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('u1')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`nav-link ${location.pathname.match(/generaciones|von-neumann|cpu|memoria|arranque/) ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              <Landmark size={18} /> Unidad 1 <span style={{ fontSize: '0.7rem' }}>▼</span>
            </button>
            {activeDropdown === 'u1' && (
              <div className="dropdown-menu">
                {unit1Links.map(link => (
                  <Link key={link.path} to={link.path} className={`drop-link ${location.pathname === link.path ? 'active' : ''}`} onClick={() => setActiveDropdown(null)}>
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Unidad 2 Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('u2')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`nav-link ${location.pathname.match(/sociedad-software|cultura-digital/) ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              <Share2 size={18} /> Unidad 2 <span style={{ fontSize: '0.7rem' }}>▼</span>
            </button>
            {activeDropdown === 'u2' && (
              <div className="dropdown-menu">
                {unit2Links.map(link => (
                  <Link key={link.path} to={link.path} className={`drop-link ${location.pathname === link.path ? 'active' : ''}`} onClick={() => setActiveDropdown(null)}>
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Unidad 3 Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('u3')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`nav-link ${location.pathname.match(/representacion-datos|logica-digital/) ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              <Database size={18} /> Unidad 3 <span style={{ fontSize: '0.7rem' }}>▼</span>
            </button>
            {activeDropdown === 'u3' && (
              <div className="dropdown-menu">
                {unit3Links.map(link => (
                  <Link key={link.path} to={link.path} className={`drop-link ${location.pathname === link.path ? 'active' : ''}`} onClick={() => setActiveDropdown(null)}>
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Unidad 4 Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('u4')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`nav-link ${location.pathname.match(/sistema-operativo|seguridad-informatica/) ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              <Power size={18} /> Unidad 4 <span style={{ fontSize: '0.7rem' }}>▼</span>
            </button>
            {activeDropdown === 'u4' && (
              <div className="dropdown-menu">
                {unit4Links.map(link => (
                  <Link key={link.path} to={link.path} className={`drop-link ${location.pathname === link.path ? 'active' : ''}`} onClick={() => setActiveDropdown(null)}>
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/portal-docente" className={`nav-link ${location.pathname === '/portal-docente' ? 'active' : ''}`} style={{ marginLeft: '1rem', borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem', color: '#3b82f6' }}>
            <Shield size={18} /> Acceso Docente
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} style={{ border: 'none', background: 'none', color: '#004a99' }} className="mobile-only">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ padding: '1.5rem', background: '#fff', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '80vh', overflowY: 'auto' }} className="mobile-only">
          <Link to="/" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#004a99', fontWeight: 900, padding: '0.75rem' }}>
            <Home size={20} /> Inicio
          </Link>
          
          <div className="mobile-unit-header">UNIDAD 1</div>
          {unit1Links.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}>
              {link.name}
            </Link>
          ))}

          <div className="mobile-unit-header">UNIDAD 2</div>
          {unit2Links.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}>
              {link.name}
            </Link>
          ))}

          <div className="mobile-unit-header">UNIDAD 3</div>
          {unit3Links.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}>
              {link.name}
            </Link>
          ))}

          <div className="mobile-unit-header">UNIDAD 4</div>
          {unit4Links.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}>
              {link.name}
            </Link>
          ))}

          <div style={{ margin: '1.5rem 0.5rem 0.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <Link to="/portal-docente" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#3b82f6', fontWeight: 900, padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '15px' }}>
              <Shield size={20} /> Acceso Portal Docente
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .desktop-only { display: flex !important; }
        .mobile-only { display: none !important; }
        @media (max-width: 768px) {
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
          padding: 0.6rem 1rem;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--primary);
          background: rgba(0, 74, 153, 0.05);
        }
        .drop-link {
          padding: 0.8rem 1rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-light);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .drop-link:hover {
          background: rgba(0, 74, 153, 0.05);
          color: var(--primary);
        }
        .drop-link.active {
          background: var(--primary);
          color: #fff;
        }
        .dropdown-menu {
          position: absolute; 
          top: 100%; 
          left: 0; 
          background: #fff; 
          border: 1px solid var(--border); 
          border-radius: 12px; 
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          padding: 0.5rem;
          min-width: 220px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mobile-unit-header {
          margin: 1rem 0 0.5rem; 
          font-size: 0.7rem; 
          color: #888; 
          font-weight: 800; 
          padding-left: 0.75rem;
        }
        .mobile-nav-link {
          display: flex; 
          align-items: center; 
          gap: 0.5rem; 
          text-decoration: none; 
          color: #333; 
          font-weight: 600; 
          padding: 1rem;
          border-radius: 12px;
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
