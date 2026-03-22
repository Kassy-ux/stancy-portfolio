import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { fadeInUp } from '../../lib/animations';
import { sections } from '../../hooks/useActiveSection';

const Footer = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0F] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-heading font-bold text-2xl">
              Ben<span className="text-[#1A56FF]">.</span>
            </h3>
            <p className="font-body text-white/50 text-sm leading-relaxed">
              Full Stack Developer based in Kenya.
              Building scalable web applications
              from frontend to backend.
            </p>
            <div className="flex gap-3 mt-2">
              {[
                { icon: Github,   href: 'https://github.com/bensidney' },
                { icon: Linkedin, href: 'https://linkedin.com/in/bensidney' },
                { icon: Mail,     href: 'mailto:bensidneyndungu@gmail.com' },
              ].map(({ icon: Icon, href }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10
                             flex items-center justify-center text-white/50
                             hover:bg-[#1A56FF] hover:text-white
                             hover:border-[#1A56FF] transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h4 className="font-heading font-bold text-sm uppercase
                           tracking-widest text-white/40">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="font-body text-sm text-white/50 text-left
                             hover:text-[#1A56FF] transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h4 className="font-heading font-bold text-sm uppercase
                           tracking-widest text-white/40">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'bensidneyndungu@gmail.com',
                  href: 'mailto:bensidneyndungu@gmail.com' },
                { label: '+254 798 696 008',
                  href: 'tel:+254798696008' },
                { label: 'Kapsabet, Kenya', href: null },
              ].map(({ label, href }) => (
                href ? (
                  <a
                    key={label}
                    href={href}
                    className="font-body text-sm text-white/50
                               hover:text-[#1A56FF] transition-colors"
                  >
                    {label}
                  </a>
                ) : (
                  <p key={label} className="font-body text-sm text-white/50">
                    {label}
                  </p>
                )
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10
                        flex flex-col md:flex-row items-center
                        justify-between gap-4">
          <p className="font-body text-white/30 text-sm">
            © {new Date().getFullYear()} Bensidney Githu Ndung'u.
            All rights reserved.
          </p>
          <p className="font-body text-white/30 text-sm flex items-center gap-1.5">
            Built with
            <Heart size={12} className="text-[#1A56FF] fill-[#1A56FF]" />
            using React + Node.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;