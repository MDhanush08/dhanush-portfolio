import { useEffect } from 'react'
import { Hero } from '../components/sections/Hero'
import { Work } from '../components/sections/Work'
import { About } from '../components/sections/About'
import { Experience } from '../components/sections/Experience'
import { Education } from '../components/sections/Education'
import { Contact } from '../components/sections/Contact'
import { profile } from '../data/portfolio'

export default function Home() {
  useEffect(() => {
    document.title = `${profile.name} | ${profile.role} ${profile.roleSpecialization}`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Portfolio of ${profile.name}, a software developer building secure, scalable web applications with Angular, React, Node.js, NestJS, and PostgreSQL.`
      )
    }
  }, [])

  return (
    <main id="main-content" className="w-full flex flex-col">
      <Hero />
      <Work />
      <About />
      <Experience />
      <Education />
      <Contact />
    </main>
  )
}
