import React from 'react';
import { Header } from '../components/gallop/Header';
import { Footer } from '../components/gallop/Footer';
import { HeroSection } from '../components/gallop/HeroSection';
import { HowItWorksSection } from '../components/gallop/HowItWorksSection';
import { FeaturesSection } from '../components/gallop/FeaturesSection';
import { IndustriesSection } from '../components/gallop/IndustriesSection';
import { TestimonialsSection } from '../components/gallop/TestimonialsSection';
import { PricingSection } from '../components/gallop/PricingSection';

export const LandingPage = () => {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <IndustriesSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};