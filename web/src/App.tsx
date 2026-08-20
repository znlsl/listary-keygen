import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppPreview } from './components/AppPreview';
import { KeygenSimulator } from './components/KeygenSimulator';
import { Features } from './components/Features';
import { WorkflowSteps } from './components/WorkflowSteps';
import { FAQSection } from './components/FAQSection';
import { DisclaimerSection } from './components/DisclaimerSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col antialiased">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AppPreview />
        <KeygenSimulator />
        <Features />
        <WorkflowSteps />
        <FAQSection />
        <DisclaimerSection />
      </main>
      <Footer />
    </div>
  );
};
