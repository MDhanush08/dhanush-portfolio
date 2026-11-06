import { useEffect } from 'react';
import { ChatWidget } from './components/chatbot/ChatWidget';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ScrollTrigger } from './lib/gsap';

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after DOM & assets settle
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-lg focus:shadow-lg focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>

      {/* Global Scroll Progress Bar */}
      <ScrollProgress />

      {/* Subtle Custom Follower Cursor */}
      <CustomCursor />

      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive AI Chatbot Widget */}
      <ChatWidget />
    </div>
  );
}
