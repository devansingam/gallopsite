import React from 'react';
import { industries } from '../../utils/mockData';

// Map industry IDs to custom illustration URLs
const getIndustryImage = (industryId) => {
  const images = {
    1: 'https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/y1kd8vwu_industry-restaurant.png',
    2: 'https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/614twtpy_industry-retail.png',
    3: 'https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/f0uuotx2_industry-hotel.png',
    4: 'https://customer-assets.emergentagent.com/job_compliance-hub-112/artifacts/ntgk6z5b_industry-cleaning.png'
  };
  return images[industryId] || images[1];
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
            return (
              <div 
                key={industry.id} 
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  border: '1px solid var(--border-light)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  overflow: 'hidden'
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
                {/* Custom Illustration */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  marginBottom: '1.5rem',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-section)'
                }}>
                  <img 
                    src={getIndustryImage(industry.id)}
                    alt={`${industry.name} illustration`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '0.5rem'
                    }}
                  />
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