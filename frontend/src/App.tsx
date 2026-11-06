import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/ui/BackToTop';
import { ScrollManager } from './components/routing/ScrollManager';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

// Lazy-load Project Detail view to keep initial load lightweight
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

// Code-split the floating AI Chatbot widget
const ChatWidget = lazy(() =>
  import('./components/chatbot/ChatWidget').then((mod) => ({ default: mod.ChatWidget }))
);

const ProjectDetailSkeleton: React.FC = () => (
  <div className="py-14 w-full animate-pulse">
    <div className="w-full max-w-[1680px] mx-auto px-[clamp(20px,5vw,96px)] space-y-8">
      <div className="w-32 h-4 bg-(--color-surface-2) rounded" />
      <div className="w-72 h-10 bg-(--color-surface-2) rounded-xl" />
      <div className="w-full max-w-xl h-6 bg-(--color-surface-2) rounded" />
      <div className="w-full aspect-video rounded-2xl bg-(--color-surface-2)" />
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Centralized Scroll restoration and anchor management */}
      <ScrollManager />

      <div className="min-h-screen w-full bg-(--color-bg) text-(--color-text) flex flex-col selection:bg-(--color-primary) selection:text-white relative">
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

        {/* Persistent Fixed Header / Navbar */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main id="main-content" className="flex-1 w-full flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/projects/:slug"
              element={
                <Suspense fallback={<ProjectDetailSkeleton />}>
                  <ProjectDetail />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Persistent Footer */}
        <Footer />

        {/* Back To Top Arrow Button */}
        <BackToTop sentinelId="top-sentinel" />

        {/* Dhanush AI Chatbot Widget (bottom-right floating panel) */}
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
