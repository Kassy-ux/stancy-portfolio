import { Router } from 'express';
import {
    getAllExperience,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
} from './experience.controller';
import { authenticate } from '../Middleware/auth';

export const ExperienceRouter = Router();

/**
 * @openapi
 * /experience:
 *   get:
 *     tags:
 *       - "\U0001F513 Experience (Public)"
 *     summary: Get all experience entries
 *     responses:
 *       200:
 *         description: List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Experience'
 *   post:
 *     tags:
 *       - "\U0001F510 Experience (Admin)"
 *     summary: Create an experience entry
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExperienceBody'
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
ExperienceRouter.get('/experience', getAllExperience);

/**
 * @openapi
 * /experience/{experienceId}:
 *   get:
 *     tags:
 *       - "\U0001F513 Experience (Public)"
 *     summary: Get an experience entry by ID
 *     parameters:
 *       - name: experienceId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Experience
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experience'
 *       404:
 *         description: Not found
 *   put:
 *     tags:
 *       - "\U0001F510 Experience (Admin)"
 *     summary: Update an experience entry
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: experienceId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExperienceBody'
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags:
 *       - "\U0001F510 Experience (Admin)"
 *     summary: Delete an experience entry
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: experienceId
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
ExperienceRouter.get('/experience/:experienceId', getExperienceById);
ExperienceRouter.post('/experience', authenticate, createExperience);
ExperienceRouter.put('/experience/:experienceId', authenticate, updateExperience);
ExperienceRouter.delete('/experience/:experienceId', authenticate, deleteExperience);