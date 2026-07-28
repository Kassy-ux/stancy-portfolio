import { env } from './config/env';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { UserRouter } from './User/user.routes';
import { ProjectsRouter } from './Projects/projects.routes';
import { SkillsRouter } from './Skills/skills.routes';
import { CertificationRouter } from './Certification/certification.routes';
import { TestimonialsRouter } from './Testimonials/Testimonials.routes';
import { ContactRouter } from './Contact/contact.routes';
import { EducationRouter } from './Education/education.routes';
import { CommunityRouter } from './Community/community.routes';
import { setupSwagger } from './config/swagger';
import { errorHandler, notFoundHandler } from './Middleware/error';
import { apiLimiter } from './Middleware/rateLimit';

const app = express();

// Trust the first proxy hop so express-rate-limit sees real client IPs
// behind Render/Vercel/Fly rather than rate-limiting the proxy itself.
app.set('trust proxy', 1);

// crossOriginResourcePolicy is relaxed so Swagger UI assets load correctly.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: env.clientUrl }));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Swagger docs — available at /api/docs
setupSwagger(app);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'Server is running' });
});

// Applied after /api/docs and /api/health so docs and uptime checks stay free.
app.use('/api', apiLimiter);

app.use('/api', UserRouter);
app.use('/api/projects', ProjectsRouter);
app.use('/api/skills', SkillsRouter);
app.use('/api/certification', CertificationRouter);
app.use('/api/testimonials', TestimonialsRouter);
app.use('/api/contact', ContactRouter);
app.use('/api/education', EducationRouter);
app.use('/api/communities', CommunityRouter);

// Must be registered last, after every route.
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
  console.log(`API docs: http://localhost:${env.port}/api/docs`);
});
