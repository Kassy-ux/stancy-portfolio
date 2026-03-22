import { Router } from 'express';
import {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    uploadTestimonialAvatar
} from './Testimonials.controller';
import { upload, uploadToCloudinary } from '../Middleware/upload';
import { authenticate } from '../Middleware/auth';

export const TestimonialsRouter = Router();

/**
 * @openapi
 * /testimonials:
 *   get:
 *     tags:
 *       - "\U0001F513 Testimonials (Public)"
 *     summary: Get all testimonials
 *     responses:
 *       200:
 *         description: List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Testimonial'
 *   post:
 *     tags:
 *       - "\U0001F510 Testimonials (Admin)"
 *     summary: Create a testimonial
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimonialBody'
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
TestimonialsRouter.get('/testimonials', getAllTestimonials);

/**
 * @openapi
 * /testimonials/{testimonialId}:
 *   get:
 *     tags:
 *       - "\U0001F513 Testimonials (Public)"
 *     summary: Get a testimonial by ID
 *     parameters:
 *       - name: testimonialId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Testimonial
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       404:
 *         description: Not found
 *   put:
 *     tags:
 *       - "\U0001F510 Testimonials (Admin)"
 *     summary: Update a testimonial
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: testimonialId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimonialBody'
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags:
 *       - "\U0001F510 Testimonials (Admin)"
 *     summary: Delete a testimonial
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: testimonialId
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
TestimonialsRouter.get('/testimonials/:testimonialId', getTestimonialById);
TestimonialsRouter.post('/testimonials', authenticate, createTestimonial);
TestimonialsRouter.put('/testimonials/:testimonialId', authenticate, updateTestimonial);
TestimonialsRouter.delete('/testimonials/:testimonialId', authenticate, deleteTestimonial);

/**
 * @openapi
 * /testimonials/{testimonialId}/avatar:
 *   post:
 *     tags:
 *       - "\U0001F510 Testimonials (Admin)"
 *     summary: Upload avatar to Cloudinary
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: testimonialId
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
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUploadResponse'
 *       401:
 *         description: Unauthorized
 */
TestimonialsRouter.post('/testimonials/:testimonialId/avatar', authenticate, upload.single('avatar'), uploadToCloudinary('portfolio/testimonials'), uploadTestimonialAvatar);