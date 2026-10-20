/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IntroductionSection } from './components/IntroductionSection';
import { MethodologySection } from './components/MethodologySection';
import { InteractiveMapSection } from './components/InteractiveMapSection';
import { ResultsSection } from './components/ResultsSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#05070a] text-slate-100 flex flex-col font-['Tajawal',sans-serif] selection:bg-[#d4af37]/30 selection:text-amber-200">
      <Header />
      <main className="flex-grow">
        <Hero />
        <IntroductionSection />
        <MethodologySection />
        <InteractiveMapSection />
        <ResultsSection />
      </main>
      <Footer />
    </div>
  );
}
