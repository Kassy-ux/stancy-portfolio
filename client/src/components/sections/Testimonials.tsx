import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeInLeft, fadeInUp, staggerContainer } from '../../lib/animations';
import { api } from '../../services/api';
import { Testimonial } from '../../types';

// ── Fallback static data ──
const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Kamau',
    role: 'Senior Developer — Teach2Give',
    avatarUrl: null,
    message:
      'Stancy is one of the most dedicated developers I have worked with. Her ability to pick up new technologies quickly and deliver clean, well-structured code is impressive.',
    rating: 5,
    order: 1,
  },
  {
    id: 2,
    name: 'Sarah Wanjiru',
    role: 'Project Manager',
    avatarUrl: null,
    message:
      'Working with Stancy was a great experience. She communicates clearly, meets deadlines, and always goes the extra mile to ensure the product works perfectly.',
    rating: 5,
    order: 2,
  },
  {
    id: 3,
    name: 'David Ochieng',
    role: 'Full Stack Engineer',
    avatarUrl: null,
    message:
      'Stancy has a strong understanding of both frontend and backend development. Her TypeScript skills and attention to detail make her a valuable team member on any project.',
    rating: 5,
    order: 3,
  },
];

// ── Star Rating ──
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'text-[#FFD600] fill-[#FFD600]' : 'text-gray-200'}
      />
    ))}
  </div>
);

// ── Avatar ──
const Avatar = ({ name, avatarUrl }: { name: string; avatarUrl: string | null }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#1A56FF] to-[#0D2DB4]
                        flex items-center justify-center">
          <span className="font-heading font-bold text-white text-sm">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
};

// ── Testimonial Card ──
const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative flex flex-col gap-4 p-6 rounded-2xl
                 border transition-all duration-300 hover:shadow-lg
                 ${isEven
                   ? 'bg-white border-gray-100 hover:border-[#1A56FF]/20'
                   : 'bg-[#1A56FF]/8 border-[#1A56FF]/15 hover:border-[#1A56FF]/30'
                 }`}
    >
      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote size={40} className="text-[#1A56FF]" />
      </div>

      {/* Stars */}
      <StarRating rating={testimonial.rating} />

      {/* Message */}
      <p className="font-body text-[#8892A4] text-sm leading-relaxed flex-1">
        "{testimonial.message}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <Avatar name={testimonial.name} avatarUrl={testimonial.avatarUrl} />
        <div>
          <p className="font-heading font-bold text-[#0A0A0F] text-sm">
            {testimonial.name}
          </p>
          <p className="font-body text-[#8892A4] text-xs mt-0.5">
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Component ──
const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const { data: testimonialsData } = useQuery({
    queryKey: ['testimonials'],
    queryFn: api.testimonials.getAll,
  });

  const testimonials =
    (testimonialsData && (testimonialsData as Testimonial[]).length > 0)
      ? (testimonialsData as Testimonial[])
      : fallbackTestimonials;

  const prev = () =>
    setCurrent((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setCurrent((i) => (i + 1) % testimonials.length);

  return (
    <section id="testimonials" className="min-h-screen bg-white section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-1 bg-[#1A56FF] rounded-full" />
          <h2 className="section-heading">Testimonials</h2>
        </motion.div>

        <motion.p
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-[#8892A4] mb-16 ml-16"
        >
          What people say about working with me
        </motion.p>

        {/* Desktop Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              {testimonials[current] && (
                <TestimonialCard
                  testimonial={testimonials[current]}
                  index={current}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200
                         flex items-center justify-center
                         hover:border-[#1A56FF] hover:text-[#1A56FF]
                         transition-colors"
            >
              <ChevronLeft size={18} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300
                    ${i === current
                      ? 'w-6 h-2 bg-[#1A56FF]'
                      : 'w-2 h-2 bg-gray-200'
                    }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200
                         flex items-center justify-center
                         hover:border-[#1A56FF] hover:text-[#1A56FF]
                         transition-colors"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;