import React from 'react';
import { Link } from 'react-router-dom';
import { Check, TrendingUp } from 'lucide-react';

export const PricingSection = () => {
  const features = [
    'Unlimited SOPs & Tasks',
    'Custom Audits & Checklists',
    'Digital Logs & Records',
    'Real-time Dashboards',
    'Points & Leaderboards',
    'Issue Tracking',
    'Mobile Apps (iOS & Android)',
    'Email Support'
  ];

  return (
    <section id="pricing" className="section-spacing-lg" style={{ background: 'var(--bg-section)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            Simple, Transparent Pricing
          </h2>
        </div>

        {/* Pricing Card */}
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '3rem',
            border: '2px solid var(--gallop-teal)',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Badge */}
            <div style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem'
            }}>
              <span className="badge">No setup fees</span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '3.5rem', fontWeight: '700', color: 'var(--gallop-purple)' }}>
                  RM 350
                </span>
                <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                  per outlet/month
                </span>
              </div>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Cancel anytime. No hidden fees.
              </p>
            </div>

            {/* Features */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                {features.map((feature, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--gradient-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Check size={14} color="white" strokeWidth={3} />
                    </div>
                    <span className="body-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link to="/demo" className="btn-primary" style={{ width: '100%', fontSize: '1.125rem' }}>
              Start Today
            </Link>

            {/* Illustration */}
            <div style={{ marginTop: '2.5rem' }}>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                alt="Manager analyzing cost vs efficiency ROI improvement charts"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  objectFit: 'cover',
                  maxHeight: '300px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};