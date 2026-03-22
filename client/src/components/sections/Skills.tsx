import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fadeInLeft, fadeInUp } from '../../lib/animations';
import { api } from '../../services/api';
import { Skill } from '../../types';

const fallbackSkills: Skill[] = [
  { skillId: 1,  name: 'TypeScript',   category: 'Languages',  iconUrl: null, order: 1 },
  { skillId: 2,  name: 'JavaScript',   category: 'Languages',  iconUrl: null, order: 2 },
  { skillId: 3,  name: 'C#',           category: 'Languages',  iconUrl: null, order: 3 },
  { skillId: 4,  name: 'React',        category: 'Frontend',   iconUrl: null, order: 1 },
  { skillId: 5,  name: 'Next.js',      category: 'Frontend',   iconUrl: null, order: 2 },
  { skillId: 6,  name: 'Tailwind CSS', category: 'Frontend',   iconUrl: null, order: 3 },
  { skillId: 7,  name: 'React Native', category: 'Frontend',   iconUrl: null, order: 4 },
  { skillId: 8,  name: 'Kotlin',       category: 'Frontend',   iconUrl: null, order: 5 },
  { skillId: 9,  name: 'Node.js',      category: 'Backend',    iconUrl: null, order: 1 },
  { skillId: 10, name: 'Express.js',   category: 'Backend',    iconUrl: null, order: 2 },
  { skillId: 11, name: 'NestJS',       category: 'Backend',    iconUrl: null, order: 3 },
  { skillId: 12, name: 'REST APIs',    category: 'Backend',    iconUrl: null, order: 4 },
  { skillId: 13, name: 'PostgreSQL',   category: 'Databases',  iconUrl: null, order: 1 },
  { skillId: 14, name: 'MySQL',        category: 'Databases',  iconUrl: null, order: 2 },
  { skillId: 15, name: 'MongoDB',      category: 'Databases',  iconUrl: null, order: 3 },
  { skillId: 16, name: 'Docker',       category: 'DevOps',     iconUrl: null, order: 1 },
  { skillId: 17, name: 'Git / GitHub', category: 'DevOps',     iconUrl: null, order: 2 },
  { skillId: 18, name: 'AWS',          category: 'DevOps',     iconUrl: null, order: 3 },
  { skillId: 19, name: 'CI/CD',        category: 'DevOps',     iconUrl: null, order: 4 },
  { skillId: 20, name: 'Jest',         category: 'DevOps',     iconUrl: null, order: 5 },
];

const tabMeta: Record<string, { accent: string; file: string; comment: string }> = {
  'Languages':  { accent: '#1A56FF', file: 'languages.ts',  comment: '// runtime & compiled' },
  'Frontend':   { accent: '#B8960C', file: 'frontend.tsx',  comment: '// ui & mobile'         },
  'Backend':    { accent: '#0D2DB4', file: 'backend.ts',    comment: '// server & apis'        },
  'Databases':  { accent: '#059669', file: 'database.sql',  comment: '// storage & querying'   },
  'DevOps':     { accent: '#7C3AED', file: 'devops.sh',     comment: '// infra & workflow'     },
};

const Skills = () => {
  const { data: skillsData } = useQuery({
    queryKey: ['skills'],
    queryFn: api.skills.getAll,
  });

  const skills = (skillsData as Skill[]) ?? fallbackSkills;

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const categories = Object.keys(grouped);
  const [activeTab, setActiveTab] = useState('');
  // Derive active so it auto-corrects when API data replaces fallback categories
  const active = (activeTab && categories.includes(activeTab)) ? activeTab : (categories[0] ?? '');

  const meta = tabMeta[active] ?? { accent: '#1A56FF', file: `${active}.ts`, comment: '' };
  const activeSkills = grouped[active] ?? [];

  return (
    <section id="skills" className="min-h-screen bg-white section-padding">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-1 bg-[#1A56FF] rounded-full" />
          <h2 className="section-heading">Skills</h2>
        </motion.div>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-[#8892A4] mb-12 ml-16"
        >
          Technologies & tools I work with
        </motion.p>

        {/* IDE Window */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-2xl border border-gray-200 overflow-hidden shadow-xl"
        >
          {/* Window chrome */}
          <div className="bg-[#1E1E2E] px-4 pt-4 pb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-4 font-mono text-xs text-white/30">~/portfolio/skills</span>
            </div>

            {/* File tabs */}
            <div className="flex items-end gap-0.5 overflow-x-auto">
              {categories.map((cat) => {
                const m = tabMeta[cat] ?? { accent: '#1A56FF', file: `${cat}.ts`, comment: '' };
                const isActive = cat === active;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className="relative flex items-center gap-2 px-4 py-2.5 font-mono text-xs
                               whitespace-nowrap rounded-t-lg transition-all duration-200 outline-none"
                    style={{
                      backgroundColor: isActive ? '#F8F9FF' : 'transparent',
                      color: isActive ? m.accent : '#ffffff60',
                      borderTop:    isActive ? `2px solid ${m.accent}` : '2px solid transparent',
                    }}
                  >
                    {/* Dot */}
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: isActive ? m.accent : '#ffffff40' }}
                    />
                    {m.file}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code panel */}
          <div className="bg-[#F8F9FF] p-8 min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Comment line */}
                <p className="font-mono text-sm text-[#8892A4] mb-6">
                  {meta.comment}
                </p>

                {/* Skills grid */}
                <div className="flex flex-wrap gap-3">
                  {activeSkills.map((skill, i) => (
                    <motion.span
                      key={skill.skillId}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      whileHover={{ y: -3, transition: { duration: 0.15 } }}
                      className="inline-flex items-center gap-2 font-mono text-sm font-semibold
                                 px-4 py-2 rounded-lg border bg-white cursor-default shadow-sm"
                      style={{ color: meta.accent, borderColor: `${meta.accent}30` }}
                    >
                      <span className="text-xs opacity-40">▸</span>
                      {skill.name}
                    </motion.span>
                  ))}
                </div>

                {/* Footer line */}
                <p className="font-mono text-xs text-[#8892A4]/50 mt-8">
                  {activeSkills.length} {active.toLowerCase()} skills
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
