import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollManager } from './components/layout/ScrollManager'
import { ChatbotWidget } from './components/chatbot/ChatbotWidget'
import { BackToTop } from './components/ui/BackToTop'
import Home from './pages/Home'

// Lazy loaded ProjectDetail route with Suspense skeleton
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ProjectDetailSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[var(--bg)] py-20 px-[clamp(20px,5vw,80px)] max-w-[1240px] mx-auto animate-pulse">
      <div className="w-24 h-5 bg-[var(--line)] mb-8 rounded-[2px]" />
      <div className="w-32 h-4 bg-[var(--line)] mb-4 rounded-[2px]" />
      <div className="w-3/4 h-16 bg-[var(--line)] mb-6 rounded-[2px]" />
      <div className="w-full h-80 bg-[var(--line)] mb-12 rounded-[2px]" />
      <div className="w-full h-40 bg-[var(--line)] rounded-[2px]" />
    </div>
  )
}

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <BrowserRouter>
      {/* Accessible Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--ink)] focus:text-[var(--bg)] focus:outline-2 focus:outline-[#A8E600]"
      >
        Skip to content
      </a>

      {/* Handles scroll reset, hash navigation, and sessionStorage scroll restoration */}
      <ScrollManager />

      <div className="relative min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        {/* Navbar (fixed, always visible, 72px) */}
        <Navbar
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />

        {/* Routes */}
        <div className="flex-1 w-full">
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
            <Route
              path="*"
              element={
                <Suspense fallback={<ProjectDetailSkeleton />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />

        {/* Floating Utilities (hidden when mobile drawer is open) */}
        <BackToTop hidden={isDrawerOpen} />
        <ChatbotWidget hidden={isDrawerOpen} />
      </div>
    </BrowserRouter>
  )
}
