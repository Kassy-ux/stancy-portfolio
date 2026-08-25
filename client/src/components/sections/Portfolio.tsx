import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Github, ExternalLink, Star, Code2 } from 'lucide-react';
import { fadeInLeft, fadeInUp, staggerContainer } from '../../lib/animations';
import { getOptimizedImageUrl } from '../../lib/cloudinary';
import { api } from '../../services/api';
import { Project } from '../../types';

const placeholderGradients = [
  { from: '#1A56FF', to: '#0D2DB4' },
  { from: '#0D2DB4', to: '#7C3AED' },
  { from: '#059669', to: '#1A56FF' },
  { from: '#B8960C', to: '#1A56FF' },
];

const ProjectImage = ({
  project,
  index,
  dimensions,
}: {
  project: Project;
  index: number;
  dimensions: { width: number; height: number };
}) => {
  const g = placeholderGradients[index % placeholderGradients.length];
  return project.imageUrl ? (
    <img
      src={getOptimizedImageUrl(project.imageUrl, { ...dimensions, fit: 'fill' })}
      alt={project.title}
      width={dimensions.width}
      height={dimensions.height}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
  ) : (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{ background: `linear-gradient(135deg, ${g.from}22, ${g.to}40)` }}
    >
      <div className="w-14 h-14 rounded-2xl bg-white/70 backdrop-blur-sm
                      flex items-center justify-center shadow-sm">
        <Code2 size={26} style={{ color: g.from }} />
      </div>
      <span className="font-mono text-xs tracking-widest uppercase"
            style={{ color: `${g.from}99` }}>
        {project.title.split(' ')[0]}
      </span>
    </div>
  );
};

const ProjectCardSkeleton = ({ featured = false }: { featured?: boolean }) => (
  <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white animate-pulse">
    <div className={`bg-slate-200 ${featured ? 'h-[260px]' : 'h-[160px]'}`} />
    <div className="space-y-3 p-6">
      <div className="h-5 w-2/3 rounded bg-slate-200" />
      <div className="h-3 w-full rounded bg-slate-100" />
      <div className="h-3 w-5/6 rounded bg-slate-100" />
      <div className="h-7 w-1/2 rounded bg-slate-100" />
    </div>
  </div>
);

const Links = ({ project }: { project: Project }) => (
  <div className="flex gap-2">
    {project.githubUrl && (
      <motion.a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200
                   flex items-center justify-center text-[#8892A4]
                   hover:bg-[#1A56FF] hover:text-white hover:border-[#1A56FF]
                   transition-all duration-200 shadow-sm"
      >
        <Github size={15} />
      </motion.a>
    )}
    {project.liveUrl && (
      <motion.a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200
                   flex items-center justify-center text-[#8892A4]
                   hover:bg-[#FFD600] hover:text-[#0A0A0F] hover:border-[#FFD600]
                   transition-all duration-200 shadow-sm"
      >
        <ExternalLink size={15} />
      </motion.a>
    )}
  </div>
);

// Large featured card (spans 2 cols, taller image)
const FeaturedCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="group bg-white rounded-3xl overflow-hidden border border-gray-100
               hover:border-[#1A56FF]/20
               hover:shadow-[0_32px_64px_rgba(26,86,255,0.12)]
               transition-all duration-300 flex flex-col"
  >
    <div className="relative overflow-hidden" style={{ height: '260px' }}>
      <ProjectImage project={project} index={index} dimensions={{ width: 960, height: 520 }} />
      {project.featured && (
        <div className="absolute top-4 left-4 flex items-center gap-1
                        bg-[#FFD600] text-[#0A0A0F] font-mono text-[10px]
                        font-bold px-3 py-1.5 rounded-full shadow-md tracking-wide">
          <Star size={8} fill="currentColor" />
          FEATURED
        </div>
      )}
      <div className="absolute top-4 right-4">
        <Links project={project} />
      </div>
    </div>
    <div className="p-6 flex flex-col gap-3 flex-1">
      <h3 className="font-heading font-bold text-[#0A0A0F] text-xl
                     group-hover:text-[#1A56FF] transition-colors duration-200">
        {project.title}
      </h3>
      <p className="font-body text-[#8892A4] text-sm leading-relaxed flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
        {project.techStack.map((tech) => (
          <span key={tech}
                className="font-mono text-[11px] font-medium px-2.5 py-1
                           bg-[#F4F6FF] text-[#1A56FF] rounded-lg border border-[#1A56FF]/10">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// Small card (single col, shorter)
const SmallCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="group bg-white rounded-3xl overflow-hidden border border-gray-100
               hover:border-[#1A56FF]/20
               hover:shadow-[0_24px_48px_rgba(26,86,255,0.10)]
               transition-all duration-300 flex flex-col"
  >
    <div className="relative overflow-hidden" style={{ height: '160px' }}>
      <ProjectImage project={project} index={index} dimensions={{ width: 640, height: 320 }} />
      <div className="absolute top-3 right-3">
        <Links project={project} />
      </div>
    </div>
    <div className="p-5 flex flex-col gap-2.5 flex-1">
      <h3 className="font-heading font-bold text-[#0A0A0F] text-base
                     group-hover:text-[#1A56FF] transition-colors duration-200">
        {project.title}
      </h3>
      <p className="font-body text-[#8892A4] text-sm leading-relaxed line-clamp-2 flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-gray-100">
        {project.techStack.slice(0, 3).map((tech) => (
          <span key={tech}
                className="font-mono text-[10px] font-medium px-2 py-0.5
                           bg-[#F4F6FF] text-[#1A56FF] rounded-md border border-[#1A56FF]/10">
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="font-mono text-[10px] font-medium px-2 py-0.5
                           bg-[#F4F6FF] text-[#8892A4] rounded-md border border-gray-100">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const Portfolio = () => {
  const { data: projectsData, isPending, isError, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: api.projects.getAll,
  });
  const { data: settingsData } = useQuery({
    queryKey: ['settings'],
    queryFn: api.settings.get,
  });

  // Read `data` directly, never gated on a refetch — a background refresh must
  // keep showing what we already have instead of blanking the section.
  const settings = settingsData as Record<string, string> | undefined;
  const githubUrl = settings?.githubUrl;
  const projects = Array.isArray(projectsData)
    ? (projectsData as Project[])
    : [];
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="portfolio" className="relative min-h-screen portfolio-dark-section section-padding overflow-hidden">

      {/* Graph-paper grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1A56FF0D 1px, transparent 1px),
            linear-gradient(to bottom, #1A56FF0D 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Radial fade to keep edges clean */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 35%, rgba(15,20,25,0.72) 100%)',
        }}
      />

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
          <h2 className="section-heading">Portfolio</h2>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-[#8892A4] mb-12 ml-16"
        >
          A selection of projects I have built
        </motion.p>

        {/* Bento grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {isError ? (
            <div className="md:col-span-2 xl:col-span-3 flex flex-col items-start gap-3 rounded-2xl border border-red-100 bg-red-50/70 p-6">
              <p className="font-body text-sm text-red-700">
                Projects could not load. The server may still be waking up.
              </p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="rounded-lg bg-[#1A56FF] px-4 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-[#0D2DB4]"
              >
                Try again
              </button>
            </div>
          ) : isPending ? (
            <>
              <div className="md:col-span-2"><ProjectCardSkeleton featured /></div>
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </>
          ) : projects.length === 0 ? (
            <p className="md:col-span-2 xl:col-span-3 font-body text-[#8892A4]">
              No projects added yet.
            </p>
          ) : (
            <>
              {/* Featured: span 2 cols */}
              {featured.map((project, i) => (
                <div key={project.id}
                     className={featured.length === 1 ? 'md:col-span-2' : ''}>
                  <FeaturedCard project={project} index={i} />
                </div>
              ))}

              {/* Rest: single col */}
              {rest.map((project, i) => (
                <SmallCard key={project.id} project={project} index={featured.length + i} />
              ))}
            </>
          )}
        </motion.div>

        {/* GitHub CTA */}
        {githubUrl && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 bg-[#1A56FF] text-white
                         font-body font-semibold px-8 py-3.5 rounded-full
                         hover:bg-[#0D2DB4] transition-colors
                         shadow-lg shadow-[#1A56FF]/25"
            >
              <Github size={16} />
              View more on GitHub
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
