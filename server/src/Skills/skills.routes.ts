import { Router } from 'express';
import {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
    uploadSkillIcon
} from './skills.controller';
import { upload, uploadToCloudinary } from '../Middleware/upload';
import { authenticate } from '../Middleware/auth';

export const SkillsRouter = Router();

/**
 * @openapi
 * /skills:
 *   get:
 *     tags:
 *       - "🔓 Skills (Public)"
 *     summary: Get all skills
 *     responses:
 *       200:
 *         description: List of skills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *   post:
 *     tags:
 *       - "🔐 Skills (Admin)"
 *     summary: Create a skill
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkillBody'
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
SkillsRouter.get('/skills', getAllSkills);

/**
 * @openapi
 * /skills/{skillId}:
 *   get:
 *     tags:
 *       - "🔓 Skills (Public)"
 *     summary: Get a skill by ID
 *     parameters:
 *       - name: skillId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Skill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *       404:
 *         description: Not found
 *   put:
 *     tags:
 *       - "🔐 Skills (Admin)"
 *     summary: Update a skill
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: skillId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkillBody'
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags:
 *       - "🔐 Skills (Admin)"
 *     summary: Delete a skill
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: skillId
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
SkillsRouter.get('/skills/:skillId', getSkillById);
SkillsRouter.post('/skills', authenticate, createSkill);
SkillsRouter.put('/skills/:skillId', authenticate, updateSkill);
SkillsRouter.delete('/skills/:skillId', authenticate, deleteSkill);

/**
 * @openapi
 * /skills/{skillId}/icon:
 *   post:
 *     tags:
 *       - "🔐 Skills (Admin)"
 *     summary: Upload skill icon to Cloudinary
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: skillId
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
 *               icon:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Icon URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUploadResponse'
 *       401:
 *         description: Unauthorized
 */
SkillsRouter.post('/skills/:skillId/icon', authenticate, upload.single('icon'), uploadToCloudinary('portfolio/skills'), uploadSkillIcon);