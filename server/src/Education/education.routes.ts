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
 *       - "\U0001F513 Education (Public)"
 *     summary: Get all education entries
 *     responses:
 *       200:
 *         description: List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Education'
 *   post:
 *     tags:
 *       - "\U0001F510 Education (Admin)"
 *     summary: Create an education entry
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EducationBody'
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
EducationRouter.get('/education', getAllEducation);

/**
 * @openapi
 * /education/{educationId}:
 *   get:
 *     tags:
 *       - "\U0001F513 Education (Public)"
 *     summary: Get an education entry by ID
 *     parameters:
 *       - name: educationId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Education
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *       404:
 *         description: Not found
 *   put:
 *     tags:
 *       - "\U0001F510 Education (Admin)"
 *     summary: Update an education entry
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: educationId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EducationBody'
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags:
 *       - "\U0001F510 Education (Admin)"
 *     summary: Delete an education entry
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: educationId
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
EducationRouter.get('/education/:educationId', getEducationById);
EducationRouter.post('/education', authenticate, createEducation);
EducationRouter.put('/education/:educationId', authenticate, updateEducation);
EducationRouter.delete('/education/:educationId', authenticate, deleteEducation);

/**
 * @openapi
 * /education/{educationId}/logo:
 *   post:
 *     tags:
 *       - "\U0001F510 Education (Admin)"
 *     summary: Upload institution logo to Cloudinary
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: educationId
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
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Logo URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUploadResponse'
 *       401:
 *         description: Unauthorized
 */
EducationRouter.post('/education/:educationId/logo', authenticate, upload.single('logo'), uploadToCloudinary('portfolio/education'), uploadEducationLogo);