import React, { useEffect } from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { Projects } from '../components/sections/Projects';
import { Education } from '../components/sections/Education';
import { Contact } from '../components/sections/Contact';

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Dhanush M | Software Developer (Full Stack)';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Dhanush M - Software Developer with 2+ years of experience building secure, scalable web applications using Angular, React.js, Node.js, NestJS, GraphQL and PostgreSQL.'
      );
    }
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </>
  );
};

export default Home;
