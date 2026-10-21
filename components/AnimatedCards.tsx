'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CaseStudyCard from './CaseStudyCard';
import { projects } from '@/data/projects';

const FROM = { opacity: 0, filter: 'blur(6px)' };
const TO = { opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out' };

export default function AnimatedCards() {
  const leftCol = projects.filter((_, i) => i % 2 === 0);
  const rightCol = projects.filter((_, i) => i % 2 === 1);

  const mobileRef = useRef<HTMLDivElement>(null);
  const leftRef   = useRef<HTMLDivElement>(null);
  const rightRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (mobileRef.current?.children.length) {
        gsap.fromTo(mobileRef.current.children, FROM, { ...TO, stagger: 0.1, delay: 0.05 });
      }
      if (leftRef.current?.children.length) {
        gsap.fromTo(leftRef.current.children, FROM, { ...TO, stagger: 0.12, delay: 0.05 });
      }
      if (rightRef.current?.children.length) {
        gsap.fromTo(rightRef.current.children, FROM, { ...TO, stagger: 0.12, delay: 0.17 });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Mobile: single column */}
      <div ref={mobileRef} className="md:hidden px-4 pt-4 pb-8">
        {projects.map((project, i) => (
          <div key={project.slug} style={{ opacity: 0 }}>
            <CaseStudyCard project={project} padTop={i === 0 ? 0 : undefined} />
          </div>
        ))}
      </div>

      {/* md+: two columns */}
      <div className="hidden md:flex px-4 lg:px-8 pt-4 lg:pt-8 pb-8 gap-x-3 lg:gap-x-[22px] items-start">
        <div ref={leftRef} className="flex-1 flex flex-col">
          {leftCol.map((project, i) => (
            <div key={project.slug} style={{ opacity: 0 }}>
              <CaseStudyCard project={project} padTop={i === 0 ? 0 : undefined} />
            </div>
          ))}
        </div>
        <div ref={rightRef} className="flex-1 flex flex-col">
          {rightCol.map((project, i) => (
            <div key={project.slug} style={{ opacity: 0 }}>
              <CaseStudyCard project={project} padTop={i === 0 ? 0 : undefined} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
