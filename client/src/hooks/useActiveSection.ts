import { useState, useEffect } from 'react';

export const sections = [
  { id: 'hero',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'certification', label: 'Certification' },
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
    let observers: IntersectionObserver[] = [];

    // The page renders a loader before the sections exist, so a one-shot attach
    // on mount finds nothing. Watch the DOM and (re)attach as sections appear.
    const attach = () => {
      const els = sections
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (els.length === observers.length) return els.length === sections.length;

      observers.forEach(o => o.disconnect());
      observers = els.map(el => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(el.id);
          },
          { threshold: 0.4 }
        );
        observer.observe(el);
        return observer;
      });

      return els.length === sections.length;
    };

    let mutationObserver: MutationObserver | null = null;
    if (!attach()) {
      mutationObserver = new MutationObserver(() => {
        if (attach()) {
          mutationObserver?.disconnect();
          mutationObserver = null;
        }
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      mutationObserver?.disconnect();
      observers.forEach(o => o.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return { activeSection, scrollToSection };
};