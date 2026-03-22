import { useState, useEffect } from 'react';

export const sections = [
  { id: 'hero',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'resume',       label: 'Resume' },
  { id: 'skills',       label: 'Skills' },
  { id: 'portfolio',    label: 'Portfolio' },
  { id: 'education',    label: 'Education' },
  { id: 'community',    label: 'Community' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact',      label: 'Contact' },
];

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return { activeSection, scrollToSection };
};