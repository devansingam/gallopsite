import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components/gallop/Header';
import { Footer } from '../components/gallop/Footer';
import { industryOptions, outletOptions, contactTimeOptions, partners } from '../utils/mockData';
import { Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export const DemoPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    industry: '',
    outletCount: '',
    phone: '',
    preferredTime: '',
    message: '',
    consent: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'A valid business email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = 'Please enter a valid email address.';
    }
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required.';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Please select an industry.';
    }
    
    if (!formData.consent) {
      newErrors.consent = 'You must agree before submitting.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the form for validation errors.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const API = `${BACKEND_URL}/api`;
      
      const response = await axios.post(`${API}/demo-request`, formData);
      
      console.log('Demo request submitted:', response.data);
      toast({
        title: "Demo request received!",
        description: "We'll get in touch soon."
      });
      
      // Navigate to thank you page
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting demo request:', error);
      
      let errorMessage = "Please try again or email hello@gallop.my.";
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      toast({
        title: "Something went wrong",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <main style={{ paddingTop: '6rem', paddingBottom: '4rem', minHeight: '100vh', background: 'var(--bg-section)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'start'
          }}>
            {/* Left: Benefits & Social Proof */}
            <div>
              <h1 className="heading-2" style={{ marginBottom: '1rem' }}>
                See Gallop in Action.
              </h1>
              <p className="body-large" style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
                A quick demo tailored to your operations and workflows.
              </p>

              {/* Benefits */}
              <div style={{ marginBottom: '3rem' }}>
                {[
                  'See how Gallop transforms SOPs into daily action',
                  'Learn how to track compliance across all outlets',
                  'Discover gamification features that motivate teams',
                  'Get answers to your specific operational challenges'
                ].map((benefit, index) => (
                  <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <CheckCircle2 size={24} color="var(--gallop-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p className="body-medium" style={{ margin: 0 }}>{benefit}</p>
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid var(--border-light)'
              }}>
                <p className="body-small" style={{ marginBottom: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Trusted by leading operations:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                  {partners.map(partner => (
                    <span key={partner.id} className="body-small" style={{ color: 'var(--gallop-purple)', fontWeight: '500' }}>
                      {partner.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '2.5rem',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="fullName" className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Full Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Jane Lee"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: `1px solid ${errors.fullName ? 'red' : 'var(--border-medium)'}`,
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gallop-teal)'}
                    onBlur={(e) => e.target.style.borderColor = errors.fullName ? 'red' : 'var(--border-medium)'}
                  />
                  {errors.fullName && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.fullName}</p>}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="workEmail" className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Work Email <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="workEmail"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleChange}
                    placeholder="e.g. jane.lee@gallop.my"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: `1px solid ${errors.workEmail ? 'red' : 'var(--border-medium)'}`,
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gallop-teal)'}
                    onBlur={(e) => e.target.style.borderColor = errors.workEmail ? 'red' : 'var(--border-medium)'}
                  />
                  {errors.workEmail && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.workEmail}</p>}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="companyName" className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Company Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Gallop Enterprise Sdn Bhd"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: `1px solid ${errors.companyName ? 'red' : 'var(--border-medium)'}`,
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gallop-teal)'}
                    onBlur={(e) => e.target.style.borderColor = errors.companyName ? 'red' : 'var(--border-medium)'}
                  />
                  {errors.companyName && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.companyName}</p>}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="industry" className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Industry <span style={{ color: 'red' }}>*</span>
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: `1px solid ${errors.industry ? 'red' : 'var(--border-medium)'}`,
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif',
                      background: 'white'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gallop-teal)'}
                    onBlur={(e) => e.target.style.borderColor = errors.industry ? 'red' : 'var(--border-medium)'}
                  >
                    <option value="">Select the closest fit for your business</option>
                    {industryOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.industry && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.industry}</p>}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="outletCount" className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Number of Outlets
                  </label>
                  <select
                    id="outletCount"
                    name="outletCount"
                    value={formData.outletCount}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-medium)',
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif',
                      background: 'white'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gallop-teal)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-medium)'}
                  >
                    <option value="">Estimate if you manage multiple locations</option>
                    {outletOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="phone" className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +60 12-345 6789"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-medium)',
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gallop-teal)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-medium)'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="preferredTime" className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Preferred Contact Time
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-medium)',
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif',
                      background: 'white'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gallop-teal)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-medium)'}
                  >
                    <option value="">Select your preference</option>
                    {contactTimeOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="message" className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your workflow challenges (optional)"
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-medium)',
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gallop-teal)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-medium)'}
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      style={{
                        width: '20px',
                        height: '20px',
                        marginTop: '2px',
                        cursor: 'pointer',
                        accentColor: 'var(--gallop-teal)'
                      }}
                    />
                    <span className="body-small" style={{ flex: 1 }}>
                      I agree to be contacted by the Gallop team. We respect your privacy and won't spam you.
                    </span>
                  </label>
                  {errors.consent && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.5rem', marginLeft: '1.75rem' }}>{errors.consent}</p>}
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={isSubmitting}
                  style={{ 
                    width: '100%', 
                    fontSize: '1.125rem',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : (
                    <>
                      Request Demo <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};