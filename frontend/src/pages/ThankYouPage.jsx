import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/gallop/Header';
import { Footer } from '../components/gallop/Footer';
import { CheckCircle, Calendar, Home, PartyPopper } from 'lucide-react';

export const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Confetti or celebration animation could be added here
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <main style={{ 
        paddingTop: '8rem', 
        paddingBottom: '6rem', 
        minHeight: '100vh',
        background: 'var(--gradient-hero)'
      }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          {/* Success Icon */}
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            boxShadow: 'var(--shadow-teal)',
            animation: 'scaleIn 0.5s ease-out'
          }}>
            <CheckCircle size={64} color="white" strokeWidth={2.5} />
          </div>

          {/* Main Message */}
          <h1 className="heading-1" style={{ marginBottom: '1rem' }}>
            Thanks — you're in the queue!
          </h1>
          <p className="body-large" style={{ marginBottom: '3rem', color: 'var(--text-secondary)' }}>
            Our team will reach out within one business day.
          </p>

          {/* Action Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {/* Schedule Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-md)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onClick={() => window.open('https://calendly.com', '_blank')}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'var(--bg-purple-wash)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Calendar size={28} color="var(--gallop-purple)" />
              </div>
              <h3 className="heading-4" style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Schedule a Time</h3>
              <p className="body-small" style={{ margin: 0 }}>Pick a convenient slot on our calendar</p>
            </div>

            {/* Homepage Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-md)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onClick={() => navigate('/')}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'var(--bg-section)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Home size={28} color="var(--gallop-teal)" />
              </div>
              <h3 className="heading-4" style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Back to Homepage</h3>
              <p className="body-small" style={{ margin: 0 }}>Explore more about Gallop</p>
            </div>
          </div>

          {/* Illustration */}
          <div className="illustration-placeholder" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
            <div className="illustration-placeholder-icon"><PartyPopper size={48} /></div>
            <p className="illustration-placeholder-text">
              <strong>Thank You Illustration:</strong><br/>
              Happy staff celebrating completed tasks with confetti and trophy icons
            </p>
          </div>

          {/* Footer Note */}
          <p className="body-small" style={{ color: 'var(--text-muted)' }}>
            Didn't get an email? Check spam or contact{' '}
            <a href="mailto:hello@gallop.my" style={{ color: 'var(--gallop-teal)', textDecoration: 'underline' }}>
              hello@gallop.my
            </a>
          </p>
        </div>
      </main>
      <Footer />

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};