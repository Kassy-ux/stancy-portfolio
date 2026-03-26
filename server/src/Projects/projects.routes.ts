import { Router } from 'express';
import {
    getAllProjects,
    getFeaturedProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    toggleFeaturedProject,
    uploadProjectImage
} from './projects.controller';
import { upload, uploadToCloudinary } from '../Middleware/upload';
import { authenticate } from '../Middleware/auth';

export const ProjectsRouter = Router();

/**
 * @openapi
 * /projects:
 *   get:
 *     tags:
 *       - "🔓 Projects (Public)"
 *     summary: Get all projects ordered by order field
 *     responses:
 *       200:
 *         description: List of projects
 *   post:
 *     tags:
 *       - "🔐 Projects (Admin)"
 *     summary: Create a new project
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Created
 */
ProjectsRouter.get('/', getAllProjects);

/**
 * @openapi
 * /projects/featured:
 *   get:
 *     tags:
 *       - "🔓 Projects (Public)"
 *     summary: Get featured projects only
 */
ProjectsRouter.get('/featured', getFeaturedProjects);

/**
 * @openapi
 * /projects/{id}:
 *   get:
 *     tags:
 *       - "🔓 Projects (Public)"
 *     summary: Get a project by ID
 *   put:
 *     tags:
 *       - "🔐 Projects (Admin)"
 *     summary: Update a project
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     tags:
 *       - "🔐 Projects (Admin)"
 *     summary: Delete a project
 *     security:
 *       - bearerAuth: []
 */
ProjectsRouter.get('/:id', getProjectById);
ProjectsRouter.post('/', authenticate, createProject);
ProjectsRouter.put('/:id', authenticate, updateProject);
ProjectsRouter.delete('/:id', authenticate, deleteProject);

/**
 * @openapi
 * /projects/{id}/image:
 *   post:
 *     tags:
 *       - "🔐 Projects (Admin)"
 *     summary: Upload project image to Cloudinary
 *     security:
 *       - bearerAuth: []
 */
ProjectsRouter.post('/:id/image', authenticate, upload.single('image'), uploadToCloudinary('portfolio/projects'), uploadProjectImage);

/**
 * @openapi
 * /projects/{id}/featured:
 *   patch:
 *     tags:
 *       - "🔐 Projects (Admin)"
 *     summary: Toggle featured flag on a project
 *     security:
 *       - bearerAuth: []
 */
ProjectsRouter.patch('/:id/featured', authenticate, toggleFeaturedProject);