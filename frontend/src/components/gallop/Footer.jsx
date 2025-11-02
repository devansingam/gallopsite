import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      background: 'var(--gallop-navy)',
      color: 'white',
      padding: '4rem 0 2rem'
    }}>
      <div className="container-wide">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Company */}
          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_8341778f-f2a7-4c6c-a972-f567de2da9f3/artifacts/ieutuw0d_IMG_0015.png" 
              alt="Gallop Logo" 
              style={{ height: '40px', width: 'auto', marginBottom: '1rem', filter: 'brightness(0) invert(1)' }}
            />
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem' }}>
              Where SOP Meets Action
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="mailto:dev@gallop.my" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.9375rem' }}>
                <Mail size={16} /> dev@gallop.my
              </a>
              <a href="tel:+601112166316" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.9375rem' }}>
                <Phone size={16} /> +6011 121 66316
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9375rem' }}>
                <MapPin size={16} style={{ marginTop: '2px', flexShrink: 0 }} /> 
                <span>Kuala Lumpur, Malaysia</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.125rem', marginBottom: '1rem' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#features" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}>Features</a></li>
              <li><a href="#pricing" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}>Pricing</a></li>
              <li><a href="https://app.gallop.my" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}>Login</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.125rem', marginBottom: '1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}>About</a></li>
              <li><a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}>Careers</a></li>
              <li><Link to="/demo" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}>Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
              © 2025 Gallop. All rights reserved.
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Made with <span style={{ color: '#ff6b6b' }}>❤️</span> in <span>🇲🇾</span>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};