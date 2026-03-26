import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Award, Calendar, ExternalLink, CheckCircle2 } from 'lucide-react';
import { fadeInLeft, fadeInUp, staggerContainer } from '../../lib/animations';
import type { Certification as TCertification } from '../../types';
import { api } from '../../services/api';

const fallbackCertifications: TCertification[] = [
  {
    id: 1,
    issuer: 'Teach2Give',
    certificateName: 'Full Stack Software Engineering',
    description: 'Intensive training in React, Node.js, and PostgreSQL.',
    issueDate: 'July 2024',
    expiryDate: null,
    certificateUrl: null,
    order: 1,
  },
];

const floatingSymbols = [
  { text: '{ }',      x: '3%',  y: '8%',  size: 'text-6xl',  delay: 0    },
  { text: '</>',      x: '85%', y: '6%',  size: 'text-6xl',  delay: 0.8  },
  { text: '=>',       x: '72%', y: '25%', size: 'text-7xl',  delay: 1.6  },
  { text: '//',       x: '12%', y: '48%', size: 'text-6xl',  delay: 0.4  },
  { text: '[ ]',      x: '88%', y: '55%', size: 'text-6xl',  delay: 2.1  },
  { text: 'const',    x: '55%', y: '75%', size: 'text-5xl',  delay: 1.2  },
  { text: '&&',       x: '25%', y: '82%', size: 'text-7xl',  delay: 0.6  },
  { text: '===',      x: '6%',  y: '75%', size: 'text-5xl',  delay: 1.9  },
  { text: '()',       x: '46%', y: '10%', size: 'text-7xl',  delay: 2.5  },
];

const Certification = () => {
  const { data: certificationData } = useQuery({
    queryKey: ['certification'],
    queryFn: api.certification.getAll,
  });

  const certifications = (certificationData as TCertification[]) ?? fallbackCertifications;

  return (
    <section id="certification" className="relative min-h-screen bg-[#F4F6FF] section-padding overflow-hidden">
      {/* Background patterns */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1A56FF10 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Floating symbols */}
      {floatingSymbols.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute font-mono font-bold text-[#1A56FF]/15 select-none pointer-events-none ${s.size}`}
          style={{ left: s.x, top: s.y }}
          animate={{ y: [0, -15, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          {s.text}
        </motion.span>
      ))}

      <div className="relative max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-1 bg-[#1A56FF] rounded-full" />
          <h2 className="section-heading">Certifications</h2>
        </motion.div>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-[#8892A4] mb-16 ml-16"
        >
          Professional recognitions and technical milestones
        </motion.p>

        {/* Grid layout for certifications */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl p-8 border border-gray-100
                         hover:border-[#1A56FF]/30 hover:shadow-2xl 
                         transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle accent corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#1A56FF]/5 to-transparent rounded-bl-full" />
              
              {/* Icon & Issuer */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#1A56FF]/10 flex items-center justify-center text-[#1A56FF] group-hover:scale-110 transition-transform duration-500">
                  <Award size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#0A0A0F] text-lg leading-tight uppercase tracking-wide">
                    {cert.issuer}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[#1A56FF] text-xs font-semibold mt-1">
                    <Calendar size={12} />
                    {cert.issueDate}
                  </div>
                </div>
              </div>

              {/* Certificate Name */}
              <h3 className="font-heading font-extrabold text-[#0A0A0F] text-xl mb-4 group-hover:text-[#1A56FF] transition-colors duration-300">
                {cert.certificateName}
              </h3>

              {/* Description */}
              {cert.description && (
                <p className="font-body text-[#8892A4] text-sm leading-relaxed mb-8">
                  {cert.description}
                </p>
              )}

              {/* Action Area */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <span className="flex items-center gap-2 text-[#1A56FF] text-xs font-bold uppercase tracking-widest">
                  <CheckCircle2 size={14} />
                  Verified
                </span>
                
                {cert.certificateUrl && (
                  <motion.a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-[#0A0A0F] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1A56FF] transition-all duration-300 shadow-lg shadow-black/5"
                  >
                    View <ExternalLink size={12} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certification;
