import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Terminal } from 'lucide-react';
import { fadeInLeft, fadeInUp } from '../../lib/animations';
import { api } from '../../services/api';
import { Community as CommunityType } from '../../types';

// Extended type to carry local display metadata
interface CommunityDisplay extends CommunityType {
  tags?: string[];
  stats?: { label: string; value: string }[];
}

const fallbackCommunity: CommunityDisplay[] = [
  {
    id: 1,
    name: 'Microsoft Learn Student Ambassadors',
    role: 'Gold Ambassador',
    description:
      'Organise tech workshops and learning sessions helping students explore Azure, AI tools, and cloud development. Achieved Gold milestone through consistent community impact.',
    logoUrl: null,
    bioUrl: '#',
    order: 1,
    tags: ['Azure', 'AI / ML', 'Cloud', 'TypeScript'],
    stats: [
      { label: 'workshops run', value: '8+'  },
      { label: 'students reached', value: '200+' },
      { label: 'milestone', value: 'Gold' },
    ],
  },
  {
    id: 2,
    name: 'Koding & Kahawa Developers',
    role: 'Contributor',
    description:
      'Participate in monthly developer meetups, share full-stack knowledge, and collaborate on open source projects with developers across Kenya.',
    logoUrl: null,
    bioUrl: null,
    order: 2,
    tags: ['React', 'Node.js', 'Open Source', 'Mentorship'],
    stats: [
      { label: 'meetups attended', value: '10+' },
      { label: 'talks given', value: '2'    },
      { label: 'projects', value: 'Open Source' },
    ],
  },
  {
    id: 3,
    name: 'Computer Society of Kirinyaga',
    role: 'Member',
    description:
      'Engage with fellow tech students, participate in hackathons, and contribute to building an innovative learning culture within the university.',
    logoUrl: null,
    bioUrl: null,
    order: 3,
    tags: ['Hackathons', 'Mentorship', 'Leadership'],
    stats: [
      { label: 'hackathons', value: '3+' },
      { label: 'role', value: 'Active' },
    ],
  },
];

const cardMeta = [
  { accent: '#1A56FF', bg: '#EEF3FF' },
  { accent: '#059669', bg: '#ECFDF5' },
  { accent: '#7C3AED', bg: '#F5F3FF' },
];

const CommunityCard = ({ item, index }: { item: CommunityDisplay; index: number }) => {
  const meta = cardMeta[index % cardMeta.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl border overflow-hidden flex flex-col
                 hover:shadow-[0_24px_48px_rgba(0,0,0,0.09)]
                 transition-all duration-300"
      style={{ borderColor: `${meta.accent}20` }}
    >
      {/* Dark header strip — terminal-style */}
      <div className="px-5 py-3.5 flex items-center justify-between gap-3"
           style={{ backgroundColor: meta.accent }}>
        <div className="flex items-center gap-2.5">
          <Terminal size={14} className="text-white/70" />
          <span className="font-mono text-xs text-white/90 font-medium truncate">
            {item.name}
          </span>
        </div>
        {item.role && (
          <span className="font-mono text-[10px] font-bold px-2.5 py-1
                           bg-white/20 text-white rounded-full shrink-0 tracking-wide">
            {item.role.toUpperCase()}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* Logo + org name row */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center
                       border-2 bg-white"
            style={{ borderColor: `${meta.accent}30` }}
          >
            {item.logoUrl ? (
              <img
                src={item.logoUrl}
                alt={`${item.name} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <span
                className="font-mono font-bold text-lg leading-none"
                style={{ color: meta.accent }}
              >
                {item.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-body font-semibold text-[#0A0A0F] text-sm leading-tight truncate">
              {item.name}
            </p>
            {item.role && (
              <p className="font-mono text-xs mt-0.5" style={{ color: meta.accent }}>
                {item.role}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-[#8892A4] text-sm leading-relaxed">
          {item.description}
        </p>

        {/* Stats row */}
        {item.stats && item.stats.length > 0 && (
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl"
               style={{ backgroundColor: `${meta.accent}08` }}>
            {item.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-0.5">
                <span className="font-mono text-sm font-bold"
                      style={{ color: meta.accent }}>
                  {s.value}
                </span>
                <span className="font-body text-[10px] text-[#8892A4] leading-tight">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span key={tag}
                    className="font-mono text-[10px] font-semibold px-2.5 py-1 rounded-md border"
                    style={{ color: meta.accent, borderColor: `${meta.accent}25`, backgroundColor: `${meta.accent}08` }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View profile link */}
        {item.bioUrl && item.bioUrl !== '#' && (
          <motion.a
            href={item.bioUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 font-body font-semibold text-sm
                       mt-auto px-5 py-2.5 rounded-xl text-white transition-colors"
            style={{ backgroundColor: meta.accent }}
          >
            <ExternalLink size={13} />
            View Profile
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const Community = () => {
  const { data: communityData } = useQuery({
    queryKey: ['community'],
    queryFn: api.community.getAll,
  });

  const rawData = communityData as CommunityType[] | undefined;

  // Merge live API data with local display metadata — match by name, not by index
  const communities: CommunityDisplay[] = (rawData && rawData.length > 0)
    ? rawData.map((item) => {
        const match = fallbackCommunity.find(
          (f) => f.name.toLowerCase() === item.name.toLowerCase()
        );
        return { ...item, tags: match?.tags, stats: match?.stats };
      })
    : fallbackCommunity;

  return (
    <section id="community" className="relative min-h-screen bg-[#F4F6FF] section-padding overflow-hidden">

      {/* Dot background */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundImage: 'radial-gradient(circle, #1A56FF0D 1px, transparent 1px)',
             backgroundSize: '28px 28px',
           }} />
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 50%, #F4F6FF 100%)' }} />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-1 bg-[#1A56FF] rounded-full" />
          <h2 className="section-heading">Community</h2>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-[#8892A4] mb-16 ml-16"
        >
          Organizations & communities I am active in
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {communities.map((item, i) => (
            <CommunityCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Community;
