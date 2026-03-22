import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { UserRouter } from './User/user.routes';
import { ProjectsRouter } from './Projects/projects.routes';
import { SkillsRouter } from './Skills/skills.routes';
import { ExperienceRouter } from './Experience/experience.routes';
import { TestimonialsRouter } from './Testimonials/Testimonials.routes';
import { ContactRouter } from './Contact/contact.routes';
import { EducationRouter } from './Education/education.routes';
import { CommunityRouter } from './Community/community.routes';
import { setupSwagger } from './config/swagger';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger docs — available at /api/docs
setupSwagger(app);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'Server is running' });
});

app.use('/api', UserRouter);
app.use('/api', ProjectsRouter);
app.use('/api', SkillsRouter);
app.use('/api', ExperienceRouter);
app.use('/api', TestimonialsRouter);
app.use('/api', ContactRouter);
app.use('/api', EducationRouter);
app.use('/api', CommunityRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API docs: http://localhost:${PORT}/api/docs`);
});