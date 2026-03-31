import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, Landmark, History, Home } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const links = [
    { name: 'Inicio', path: '/', icon: <Home size={18} /> },
    { name: 'Von Neumann', path: '/von-neumann', icon: <Cpu size={18} /> },
    { name: 'Harvard', path: '/harvard', icon: <Landmark size={18} /> },
    { name: 'Generaciones', path: '/generaciones', icon: <History size={18} /> },
  ];

  return (
    <nav style={{ 
      background: 'white', 
      borderBottom: '1px solid var(--border)', 
      padding: '1rem', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={`${import.meta.env.BASE_URL}logo_unpilar.png`} alt="UNPilar Logo" style={{ height: '40px' }} />
          <div>
            <h1 style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 800, margin: 0 }}>Fundamentos</h1>
            <p style={{ fontSize: '0.7rem', opacity: 0.7, margin: 0 }}>De Computación</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="desktop-only">
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                fontSize: '0.9rem', 
                fontWeight: 600,
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-light)',
                transition: 'color 0.2s'
              }}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile toggle logic omitted for brevity in this mock-up, would add it for full production */}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
