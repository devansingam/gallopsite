import React from 'react';
import { testimonials } from '../../utils/mockData';
import { Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  return (
    <section 
      className="section-spacing" 
      style={{ 
        background: 'var(--bg-purple-wash)',
        backgroundImage: 'url(https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/9qhaoiuq_testimonials-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      {/* Overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.85)',
        zIndex: 0
      }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            Success Stories
          </h2>
        </div>

        {/* Testimonials */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Quote size={24} color="white" />
              </div>
              <p className="body-large" style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
                "{testimonial.quote}"
              </p>
              <div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1rem', color: 'var(--gallop-purple)', marginBottom: '0.25rem' }}>
                  {testimonial.author}
                </p>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};