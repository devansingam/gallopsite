import React from 'react';
import { workflowSteps } from '../../utils/mockData';
import { FileText } from 'lucide-react';

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-spacing-lg" style={{ background: 'var(--bg-page)' }}>
      <div className="container-wide">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            How Gallop Works — From SOPs to Scoring
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Gallop transforms your brand standards into measurable, paper-free performance.
          </p>
        </div>

        {/* Workflow Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '5rem' }}>
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="step-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
              {/* Content (alternates left/right) */}
              <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
                <div style={{
                  display: 'inline-block',
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '0.5rem 1rem',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '700',
                  fontSize: '1.25rem',
                  marginBottom: '1rem'
                }}>
                  {step.number}
                </div>
                <h3 className="heading-3" style={{ marginBottom: '1rem' }}>{step.title}</h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
              </div>

              {/* Illustration */}
              <div style={{ order: index % 2 === 0 ? 2 : 1, minHeight: '280px' }}>
                <img 
                  src={getStepImage(step.id)}
                  alt={`Step ${step.number}: ${step.title}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    objectFit: 'cover',
                    maxHeight: '400px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Digital Logs Integration */}
        <div className="step-card" style={{
          background: 'var(--bg-purple-wash)',
          border: '2px solid var(--gallop-purple)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--gallop-purple)',
              color: 'white',
              borderRadius: '12px',
              padding: '0.5rem 1rem',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '600',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              <FileText size={20} /> Digital Logs Integration
            </div>
            <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Replace Paper Logbooks</h3>
            <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
              Replace paper logbooks with customizable digital logs for temperature, waste, maintenance, or any process. Each record is timestamped and cloud-stored.
            </p>
          </div>

          <div className="illustration-placeholder">
            <div className="illustration-placeholder-icon">☁️</div>
            <p className="illustration-placeholder-text">
              <strong>Digital Logs Illustration:</strong><br/>
              Worker entering temperature/waste data on tablet → cloud icon → data flowing into central dashboard
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p className="heading-4" style={{ color: 'var(--gallop-teal)' }}>
            “From SOPs to Workflows, Audits to Insight — Gallop gives you total control.”
          </p>
        </div>
      </div>
    </section>
  );
};