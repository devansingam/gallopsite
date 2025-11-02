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

          {/* Right: Hero Illustration */}
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <img 
              src="https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/yyzmcxde_hero.png"
              alt="Multi-industry Malaysian teams completing digital tasks on tablets with manager observing progress dashboard"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            />
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