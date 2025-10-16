import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="nav-header">
      <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src="https://customer-assets.emergentagent.com/job_8341778f-f2a7-4c6c-a972-f567de2da9f3/artifacts/ieutuw0d_IMG_0015.png" 
            alt="Gallop Logo" 
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link 
            to="/" 
            className="nav-link"
            style={{ fontWeight: isActive('/') ? '600' : '500', color: isActive('/') ? 'var(--gallop-teal)' : undefined }}
          >
            Home
          </Link>
          <Link 
            to="/demo" 
            className="nav-link"
            style={{ fontWeight: isActive('/demo') ? '600' : '500', color: isActive('/demo') ? 'var(--gallop-teal)' : undefined }}
          >
            Get Demo
          </Link>
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <Link to="/demo" className="btn-primary" style={{ marginLeft: '1rem' }}>
            Start Today
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--gallop-purple)'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu" style={{
          display: 'none',
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '1rem',
          background: 'white',
          borderTop: '1px solid var(--border-light)'
        }}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/demo" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Get Demo</Link>
          <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#pricing" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <Link to="/demo" className="btn-primary" onClick={() => setMobileMenuOpen(false)} style={{ marginTop: '0.5rem' }}>
            Start Today
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-menu {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};