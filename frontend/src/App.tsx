import React, { Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import { BackToTop } from './components/ui/BackToTop';

// Code-split the floating AI Chatbot widget so it does not block the initial critical render path
const ChatWidget = lazy(() =>
  import('./components/chatbot/ChatWidget').then((mod) => ({ default: mod.ChatWidget }))
);

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text) flex flex-col selection:bg-(--color-primary)/20 selection:text-(--color-primary) relative">
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
        Skip to main content
      </a>

      {/* 400px Top Sentinel for IntersectionObserver-based BackToTop button (zero scroll listeners) */}
      <div
        id="top-sentinel"
        className="absolute top-0 left-0 w-full h-[400px] pointer-events-none -z-50"
        aria-hidden="true"
      />

      {/* Sticky Header / Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back To Top Button (sits above the chatbot toggle) */}
      <BackToTop sentinelId="top-sentinel" />

      {/* Dhanush AI Chatbot Widget (bottom-right floating panel) */}
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
};

export default App;
