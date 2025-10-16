import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const scrollToHow = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{
      background: 'var(--gradient-hero)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      paddingTop: '7rem',
      paddingBottom: '4rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Left: Content */}
          <div className="fade-in-up" style={{ maxWidth: '600px' }}>
            <h1 className="heading-1" style={{ marginBottom: '1.5rem' }}>
              Turn SOPs into Daily Action.
            </h1>
            <p className="body-large" style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
              Gallop keeps your team accountable, compliant, and on track — every single day.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/demo" className="btn-primary">
                Get a Demo <ArrowRight size={20} />
              </Link>
              <button onClick={scrollToHow} className="btn-secondary">
                See How It Works
              </button>
            </div>
          </div>

          {/* Right: Illustration Placeholder */}
          <div className="illustration-placeholder fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="illustration-placeholder-icon">👥</div>
            <p className="illustration-placeholder-text">
              <strong>Hero Illustration:</strong><br/>
              Multi-industry Malaysian teams (kitchen staff, hotel workers, retail employees, cleaning crew) completing digital tasks on tablets/phones, with a manager observing progress dashboard in background.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToHow}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-md)',
          transition: 'transform 0.2s ease',
          animation: 'bounce 2s infinite'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-50%) translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(-50%) translateY(0)'}
      >
        <ChevronDown size={24} color="var(--gallop-purple)" />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px); }
        }
      `}</style>
    </section>
  );
};