import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/gallop/Header';
import { Footer } from '../components/gallop/Footer';
import { CheckCircle, Home } from 'lucide-react';

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

          {/* Happy Staff Illustration */}
          <div style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
            <img 
              src="https://images.unsplash.com/photo-1758691737584-a8f17fb34475"
              alt="Happy staff celebrating completed tasks and successful collaboration"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-lg)',
                objectFit: 'cover',
                maxHeight: '450px'
              }}
            />
          </div>

          {/* Footer Note */}
          <p className="body-small" style={{ color: 'var(--text-muted)' }}>
            Didn't get an email? Check spam or contact{' '}
            <a href="mailto:dev@gallop.my" style={{ color: 'var(--gallop-teal)', textDecoration: 'underline' }}>
              dev@gallop.my
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