import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Landmark, History, ArrowRight } from 'lucide-react';

const Home = () => {
  const cards = [
    { title: 'Arquitectura Von Neumann', desc: 'Descubre el modelo de memoria compartida que define a la informática moderna.', icon: <Cpu />, path: '/von-neumann', color: '#004a99' },
    { title: 'Arquitectura Harvard', desc: 'Aprende sobre el paralelismo y la separación de buses para un alto rendimiento.', icon: <Landmark />, path: '/harvard', color: '#0066cc' },
    { title: 'Generaciones de Computadoras', desc: 'Un viaje por la evolución tecnológica desde las válvulas de vacío hasta la IA.', icon: <History />, path: '/generaciones', color: '#0088ff' },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', padding: '4rem 0' }}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--primary)', fontWeight: 900, marginBottom: '1rem' }}
        >
          Fundamentos de <span style={{ color: '#aaa' }}>Computación</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}
        >
          Recursos educativos interactivos sobre arquitectura de computadoras y evolución tecnológica.
        </motion.p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -5 }}
            style={{ 
              background: 'white',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)'
            }}
          >
            <div style={{ 
              width: '50px', 
              height: '50px', 
              background: card.color + '1a', 
              color: card.color,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {card.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{card.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', flex: 1 }}>{card.desc}</p>
            <Link to={card.path} style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: card.color,
              fontWeight: 700,
              fontSize: '0.9rem'
            }}>
              Explorar modulo <ArrowRight size={16} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
