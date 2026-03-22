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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *   post:
 *     tags:
 *       - "🔐 Projects (Admin)"
 *     summary: Create a new project
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectBody'
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
ProjectsRouter.get('/projects', getAllProjects);

/**
 * @openapi
 * /projects/featured:
 *   get:
 *     tags:
 *       - "🔓 Projects (Public)"
 *     summary: Get featured projects only
 *     responses:
 *       200:
 *         description: List of featured projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
ProjectsRouter.get('/projects/featured', getFeaturedProjects);

/**
 * @openapi
 * /projects/{projectId}:
 *   get:
 *     tags:
 *       - "🔓 Projects (Public)"
 *     summary: Get a project by ID
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Not found
 *   put:
 *     tags:
 *       - "🔐 Projects (Admin)"
 *     summary: Update a project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectBody'
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *   delete:
 *     tags:
 *       - "🔐 Projects (Admin)"
 *     summary: Delete a project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       401:
 *         description: Unauthorized
 */
ProjectsRouter.get('/projects/:projectId', getProjectById);
ProjectsRouter.post('/projects', authenticate, createProject);
ProjectsRouter.put('/projects/:projectId', authenticate, updateProject);
ProjectsRouter.delete('/projects/:projectId', authenticate, deleteProject);

/**
 * @openapi
 * /projects/{projectId}/image:
 *   post:
 *     tags:
 *       - "🔐 Projects (Admin)"
 *     summary: Upload project image to Cloudinary
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUploadResponse'
 *       401:
 *         description: Unauthorized
 */
ProjectsRouter.post('/projects/:projectId/image', authenticate, upload.single('image'), uploadToCloudinary('portfolio/projects'), uploadProjectImage);

/**
 * @openapi
 * /projects/{projectId}/featured:
 *   patch:
 *     tags:
 *       - "🔐 Projects (Admin)"
 *     summary: Toggle featured flag on a project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Featured status toggled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 featured:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
ProjectsRouter.patch('/projects/:projectId/featured', authenticate, toggleFeaturedProject);