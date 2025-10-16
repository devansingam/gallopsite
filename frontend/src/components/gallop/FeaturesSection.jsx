import React from 'react';
import { features } from '../../utils/mockData';
import { ListChecks, ClipboardCheck, FileText, AlertCircle, BarChart3, Trophy } from 'lucide-react';

const iconMap = {
  'ListChecks': ListChecks,
  'ClipboardCheck': ClipboardCheck,
  'FileText': FileText,
  'AlertCircle': AlertCircle,
  'BarChart3': BarChart3,
  'Trophy': Trophy
};

export const FeaturesSection = () => {
  return (
    <section id="features" className="section-spacing-lg" style={{ background: 'var(--bg-section)' }}>
      <div className="container-wide">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            Core Features
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Gallop connects your people, procedures, and performance into one simple system.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <div key={feature.id} className="feature-card">
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <IconComponent size={28} color="white" />
                </div>
                <h3 className="heading-4" style={{ marginBottom: '0.75rem' }}>{feature.title}</h3>
                <p className="body-small" style={{ margin: 0 }}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};