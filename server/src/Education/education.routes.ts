import { Router } from 'express';
import {
    getAllEducation,
    getEducationById,
    createEducation,
    updateEducation,
    deleteEducation,
    uploadEducationLogo
} from './education.controller';
import { upload, uploadToCloudinary } from '../Middleware/upload';
import { authenticate } from '../Middleware/auth';

export const EducationRouter = Router();

/**
 * @openapi
 * /education:
 *   get:
 *     tags:
 *       - "🔓 Education (Public)"
 *     summary: Get all education entries
 *   post:
 *     tags:
 *       - "🔐 Education (Admin)"
 *     summary: Create an education entry
 *     security:
 *       - bearerAuth: []
 */
EducationRouter.get('/', getAllEducation);

/**
 * @openapi
 * /education/{id}:
 *   get:
 *     tags:
 *       - "🔓 Education (Public)"
 *     summary: Get an education entry by ID
 *   put:
 *     tags:
 *       - "🔐 Education (Admin)"
 *     summary: Update an education entry
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     tags:
 *       - "🔐 Education (Admin)"
 *     summary: Delete an education entry
 *     security:
 *       - bearerAuth: []
 */
EducationRouter.get('/:id', getEducationById);
EducationRouter.post('/', authenticate, createEducation);
EducationRouter.put('/:id', authenticate, updateEducation);
EducationRouter.delete('/:id', authenticate, deleteEducation);

/**
 * @openapi
 * /education/{id}/logo:
 *   post:
 *     tags:
 *       - "🔐 Education (Admin)"
 *     summary: Upload institution logo to Cloudinary
 *     security:
 *       - bearerAuth: []
 */
EducationRouter.post('/:id/logo', authenticate, upload.single('logo'), uploadToCloudinary('portfolio/education'), uploadEducationLogo);