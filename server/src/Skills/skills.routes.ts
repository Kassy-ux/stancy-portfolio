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
 *   post:
 *     tags:
 *       - "🔐 Skills (Admin)"
 *     summary: Create a skill
 *     security:
 *       - bearerAuth: []
 */
SkillsRouter.get('/', getAllSkills);

/**
 * @openapi
 * /skills/{id}:
 *   get:
 *     tags:
 *       - "🔓 Skills (Public)"
 *     summary: Get a skill by ID
 *   put:
 *     tags:
 *       - "🔐 Skills (Admin)"
 *     summary: Update a skill
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     tags:
 *       - "🔐 Skills (Admin)"
 *     summary: Delete a skill
 *     security:
 *       - bearerAuth: []
 */
SkillsRouter.get('/:id', getSkillById);
SkillsRouter.post('/', authenticate, createSkill);
SkillsRouter.put('/:id', authenticate, updateSkill);
SkillsRouter.delete('/:id', authenticate, deleteSkill);

/**
 * @openapi
 * /skills/{id}/icon:
 *   post:
 *     tags:
 *       - "🔐 Skills (Admin)"
 *     summary: Upload skill icon to Cloudinary
 *     security:
 *       - bearerAuth: []
 */
SkillsRouter.post('/:id/icon', authenticate, upload.single('icon'), uploadToCloudinary('portfolio/skills'), uploadSkillIcon);