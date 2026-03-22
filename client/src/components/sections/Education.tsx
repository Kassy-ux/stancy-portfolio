import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { fadeInLeft, fadeInUp } from '../../lib/animations';
import { api } from '../../services/api';
import { Education as EducationType } from '../../types';

const fallbackEducation: EducationType[] = [
  {
    educationId: 1,
    institution: 'University of Eastern Africa, Baraton',
    degree: 'BSc. Software Engineering',
    description: 'Relevant coursework: Data Structures & Algorithms, Web & Distributed Systems, RESTful APIs, Cloud Computing, and Database Management.',
    logoUrl: null,
    startDate: 'Sep 2022',
    endDate: 'Aug 2026',
    order: 1,
  },
  {
    educationId: 2,
    institution: 'Teach2Give',
    degree: 'Software Engineering Program',
    description: 'Intensive peer-to-peer bootcamp covering full-stack development with React, Node.js, TypeScript, PostgreSQL, DevOps, and agile methodologies.',
    logoUrl: null,
    startDate: '2025',
    endDate: null,
    order: 2,
  },
];

const entryMeta = [
  { icon: GraduationCap, accent: '#1A56FF', bg: '#EEF3FF', label: 'University', side: 'left'  },
  { icon: BookOpen,      accent: '#059669', bg: '#ECFDF5', label: 'Bootcamp',   side: 'right' },
  { icon: GraduationCap, accent: '#7C3AED', bg: '#F5F3FF', label: 'Cert',       side: 'left'  },
];

const TimelineEntry = ({ edu, index }: { edu: EducationType; index: number }) => {
  const meta = entryMeta[index % entryMeta.length];
  const Icon = meta.icon;
  const isLeft = index % 2 === 0;
  const isOngoing = !edu.endDate;

  const card = (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl border p-6 flex flex-col gap-4
                 hover:shadow-[0_20px_48px_rgba(0,0,0,0.09)]
                 transition-all duration-300 w-full"
      style={{ borderColor: `${meta.accent}22` }}
    >
      {/* Top bar */}
      <div className="h-1 rounded-full w-16" style={{ backgroundColor: meta.accent }} />

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
             style={{ backgroundColor: meta.bg }}>
          {edu.logoUrl
            ? <img src={edu.logoUrl} alt={edu.institution} className="w-full h-full object-contain p-1.5" />
            : <Icon size={22} style={{ color: meta.accent }} />
          }
        </div>
        <div>
          <h3 className="font-heading font-bold text-[#0A0A0F] text-base leading-snug">
            {edu.degree}
          </h3>
          <p className="font-body font-semibold text-sm mt-0.5" style={{ color: meta.accent }}>
            {edu.institution}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 font-body text-xs font-medium
                         px-3 py-1.5 rounded-full"
              style={{ backgroundColor: `${meta.accent}12`, color: meta.accent }}>
          <Calendar size={11} />
          {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ' — Present'}
        </span>
        {isOngoing && (
          <span className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-full
                           bg-[#FFD600]/20 text-[#9A6E00]">
            IN PROGRESS
          </span>
        )}
        <span className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-full ml-auto"
              style={{ backgroundColor: `${meta.accent}12`, color: meta.accent }}>
          {meta.label.toUpperCase()}
        </span>
      </div>

      {/* Description */}
      {edu.description && (
        <p className="font-body text-[#8892A4] text-sm leading-relaxed">
          {edu.description}
        </p>
      )}
    </motion.div>
  );

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 items-start">

      {/* Left slot */}
      <div className="hidden md:flex justify-end pr-10">
        {isLeft && card}
      </div>

      {/* Center — dot + line connector */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.05 }}
          className="w-5 h-5 rounded-full border-4 border-white shadow-md z-10"
          style={{ backgroundColor: meta.accent }}
        />
      </div>

      {/* Right slot */}
      <div className="hidden md:flex justify-start pl-10">
        {!isLeft && card}
      </div>

      {/* Mobile: always full width */}
      <div className="md:hidden w-full">
        {card}
      </div>
    </div>
  );
};

const Education = () => {
  const { data: educationData } = useQuery({
    queryKey: ['education'],
    queryFn: api.education.getAll,
  });

  const educations = (educationData as EducationType[]) ?? fallbackEducation;

  return (
    <section id="education" className="relative min-h-screen bg-white section-padding overflow-hidden">

      {/* Dot background */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundImage: 'radial-gradient(circle, #1A56FF12 1px, transparent 1px)',
             backgroundSize: '32px 32px',
           }} />
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 50%, white 100%)' }} />

      <div className="relative max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-1 bg-[#1A56FF] rounded-full" />
          <h2 className="section-heading">Education</h2>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-[#8892A4] mb-16 ml-16"
        >
          My academic background and training
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0
                          w-px bg-gradient-to-b from-[#1A56FF]/50 via-[#1A56FF]/20
                          to-transparent -translate-x-1/2" />

          {/* Mobile left line */}
          <div className="md:hidden absolute left-2 top-0 bottom-0
                          w-px bg-gradient-to-b from-[#1A56FF]/40 via-[#1A56FF]/20
                          to-transparent" />

          <div className="flex flex-col gap-12 md:gap-16">
            {educations.map((edu, i) => (
              <TimelineEntry key={edu.educationId} edu={edu} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;
