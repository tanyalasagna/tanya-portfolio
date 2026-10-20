'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CaseStudyCard from './CaseStudyCard';
import { projects } from '@/data/projects';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AnimCard({ project, delay }: { project: (typeof projects)[0]; delay: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.div
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
      transition={{ duration: 0.55, ease: EASE }}
      style={{ opacity: 0 }}
    >
      <CaseStudyCard project={project} />
    </motion.div>
  );
}

export default function AnimatedCards() {
  const leftCol = projects.filter((_, i) => i % 2 === 0);
  const rightCol = projects.filter((_, i) => i % 2 === 1);

  return (
    <>
      {/* Mobile: single column */}
      <div className="md:hidden px-4 pt-0 pb-8">
        {projects.map((project, i) => (
          <AnimCard key={project.slug} project={project} delay={0.05 + i * 0.1} />
        ))}
      </div>

      {/* md+: two columns, interleaved stagger */}
      <div className="hidden md:flex px-4 lg:px-8 pb-8 gap-x-4 lg:gap-x-8 items-start">
        <div className="flex-1 flex flex-col">
          {leftCol.map((project, i) => (
            <AnimCard key={project.slug} project={project} delay={0.05 + i * 0.12} />
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          {rightCol.map((project, i) => (
            <AnimCard key={project.slug} project={project} delay={0.17 + i * 0.12} />
          ))}
        </div>
      </div>
    </>
  );
}
