import React from 'react';
import { industries } from '../../utils/mockData';
import { ChefHat, ShoppingBag, Hotel, Sparkles } from 'lucide-react';

const iconMap = {
  'Chef': ChefHat,
  'ShoppingBag': ShoppingBag,
  'Hotel': Hotel,
  'Sparkles': Sparkles
};

export const IndustriesSection = () => {
  return (
    <section className="section-spacing-lg" style={{ background: 'var(--bg-page)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            Built for Every Industry
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            From kitchens to showrooms, Gallop adapts to your operations.
          </p>
        </div>

        {/* Industries Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {industries.map((industry) => {
            const IconComponent = iconMap[industry.icon];
            return (
              <div 
                key={industry.id} 
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center',
                  border: '1px solid var(--border-light)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  e.currentTarget.style.borderColor = 'var(--gallop-teal)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                }}
              >
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '16px',
                  background: 'var(--bg-purple-wash)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <IconComponent size={36} color="var(--gallop-purple)" strokeWidth={1.5} />
                </div>
                <h3 className="heading-4" style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{industry.name}</h3>
                <p className="body-small" style={{ margin: 0 }}>{industry.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};