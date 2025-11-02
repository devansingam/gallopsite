import React from 'react';
import { workflowSteps } from '../../utils/mockData';
import { FileText } from 'lucide-react';

// Map step IDs to image URLs
const getStepImage = (stepId) => {
  const images = {
    1: 'https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/dq6locms_step1-sops.png',
    2: 'https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/9lxs8m19_step2-workflow.png',
    3: 'https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/3y8jmuki_step3-audit.png',
    4: 'https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/cycv1b61_step4-assign.png',
    5: 'https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/58j4fo7m_step5-monitor.png'
  };
  return images[stepId] || images[1];
};

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
                    objectFit: 'contain',
                    maxHeight: '450px'
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

          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/l46380qr_digital-logs.png"
              alt="Worker entering temperature and waste data on tablet with cloud synchronization to central dashboard"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                objectFit: 'contain',
                maxHeight: '400px'
              }}
            />
          </div>
        </div>

        {/* Tagline */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p className="heading-4" style={{ color: 'var(--gallop-teal)', marginBottom: '2rem' }}>
            “From SOPs to Workflows, Audits to Insight — Gallop gives you total control.”
          </p>
          
          {/* Flow Summary Illustration */}
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <img 
              src="https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/u5dlaxyh_flow-summary.png"
              alt="Complete workflow visualization from SOPs to monitoring"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};