import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Github, Linkedin, Mail, ArrowDown, Briefcase, Code2, MapPin } from 'lucide-react';
import { api } from '../../services/api';

const HeroBackground = lazy(() => import('../three/HeroBackground'));

const TYPED_STRINGS = [
  'Full Stack Developer',
  'React & Node.js Engineer',
  'TypeScript Enthusiast',
  'Problem Solver',
];

const DEFAULT_PROFILE_IMAGE_URL =
  'https://res.cloudinary.com/diia0dapa/image/upload/v1774165277/portfolio/hero/1774165274168-heroImage.png';

const HeroBackgroundFallback = () => (
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)
      `,
      backgroundSize: '72px 72px',
      maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
    }}
  />
);

const TypingAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const current = TYPED_STRINGS[currentIndex];

    if (!deleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
      return;
    }

    if (deleting && displayed === '') {
      timeoutRef.current = setTimeout(() => {
        setDeleting(false);
        setCurrentIndex((i) => (i + 1) % TYPED_STRINGS.length);
      }, 0);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayed(prev =>
        deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      );
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, currentIndex]);

  return (
    <span className="text-blue-500">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: api.settings.get,
    staleTime: 1000 * 60 * 2,
  });

  const s = settings as Record<string, string> | undefined;
  const tagline  = s?.tagline  || 'Code that solves real problems — not just runs. Building scalable web applications from frontend to backend.';
  const photoUrl = s?.heroImageUrl || DEFAULT_PROFILE_IMAGE_URL;
  const githubUrl   = s?.githubUrl   || 'https://github.com/Kassy-ux';
  const linkedinUrl = s?.linkedinUrl || 'https://www.linkedin.com/in/stancy-ngereso';
  const emailVal    = s?.email       || 'stancyngereso4@gmail.com';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F1419 0%, #1E293B 50%, #1A1A2E 100%)' }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Suspense fallback={<HeroBackgroundFallback />}>
          <HeroBackground />
        </Suspense>
      </div>

      {/* Technical grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24
                      w-full pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text */}
          <div className="flex flex-col gap-6">

            {/* Status row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <span className="flex items-center gap-1.5 text-white/60 font-body text-sm">
                <MapPin size={13} className="text-blue-400" />
                Kenya
              </span>
              <span className="w-px h-3.5 bg-white/20" />
              <span className="flex items-center gap-1.5 font-body text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 font-medium">Open to work</span>
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-white/70 font-body text-lg mb-1">
                I'm
              </p>
              <h1 className="font-heading font-extrabold text-white leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
                Stancy<br />
                <span className="text-blue-500">Ngereso</span>
              </h1>
            </motion.div>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading font-bold text-2xl md:text-3xl text-white"
            >
              <TypingAnimation />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-white/70 text-lg max-w-md leading-relaxed"
            >
              {tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document.getElementById('portfolio')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-blue-500 text-white font-body font-semibold
                           px-8 py-3.5 rounded-full hover:bg-blue-600
                           transition-colors shadow-lg shadow-blue-500/30"
              >
                View Projects
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document.getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-transparent text-white font-body font-semibold
                           px-8 py-3.5 rounded-full border-2 border-white/30
                           hover:border-blue-400 hover:bg-blue-500/10
                           transition-all"
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 mt-2"
            >
              {[
                { icon: Github, href: githubUrl, label: 'GitHub' },
                { icon: Linkedin, href: linkedinUrl, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${emailVal}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 rounded-full bg-white/10
                             border border-white/20 flex items-center
                             justify-center text-white hover:bg-blue-500/20
                             hover:border-blue-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — Floating Photo */}
          <div className="relative flex justify-center items-center min-h-[420px]">

            {/* Photo — floats as one unit */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-10"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Photo */}
                <img
                  src={photoUrl}
                  alt="Stancy Ngereso"
                  className="w-auto h-[360px] max-w-[78vw] object-contain md:h-[500px] md:max-w-none"
                />

                {/* Floating card — Experience */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.3 }}
                  className="absolute left-2 top-8 bg-slate-900/80 backdrop-blur rounded-lg sm:-left-14 sm:top-10
                             px-3.5 py-2.5 shadow-xl flex items-center gap-3 border border-blue-500/20"
                >
                  <div className="w-9 h-9 bg-blue-500/20 rounded-md flex items-center justify-center shrink-0">
                    <Briefcase size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-sm leading-none">1+</p>
                    <p className="font-body text-gray-400 text-xs mt-0.5">Years Exp.</p>
                  </div>
                </motion.div>

                {/* Floating card — Projects */}
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.8 }}
                  className="absolute right-2 bottom-12 bg-slate-900/80 backdrop-blur rounded-lg sm:-right-14 sm:bottom-16
                             px-3.5 py-2.5 shadow-xl flex items-center gap-3 border border-blue-500/20"
                >
                  <div className="w-9 h-9 bg-blue-500/20 rounded-md flex items-center justify-center shrink-0">
                    <Code2 size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-sm leading-none">5+</p>
                    <p className="font-body text-gray-400 text-xs mt-0.5">Projects</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2
                     flex flex-col items-center gap-2 text-white/60
                     hover:text-white transition-colors"
        >
          <span className="font-body text-xs">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
