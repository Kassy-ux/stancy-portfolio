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
 *       - "🔓 Testimonials (Public)"
 *     summary: Get all testimonials
 *   post:
 *     tags:
 *       - "🔐 Testimonials (Admin)"
 *     summary: Create a testimonial
 *     security:
 *       - bearerAuth: []
 */
TestimonialsRouter.get('/', getAllTestimonials);

/**
 * @openapi
 * /testimonials/{id}:
 *   get:
 *     tags:
 *       - "🔓 Testimonials (Public)"
 *     summary: Get a testimonial by ID
 *   put:
 *     tags:
 *       - "🔐 Testimonials (Admin)"
 *     summary: Update a testimonial
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     tags:
 *       - "🔐 Testimonials (Admin)"
 *     summary: Delete a testimonial
 *     security:
 *       - bearerAuth: []
 */
TestimonialsRouter.get('/:id', getTestimonialById);
TestimonialsRouter.post('/', authenticate, createTestimonial);
TestimonialsRouter.put('/:id', authenticate, updateTestimonial);
TestimonialsRouter.delete('/:id', authenticate, deleteTestimonial);

/**
 * @openapi
 * /testimonials/{id}/avatar:
 *   post:
 *     tags:
 *       - "🔐 Testimonials (Admin)"
 *     summary: Upload avatar to Cloudinary
 *     security:
 *       - bearerAuth: []
 */
TestimonialsRouter.post('/:id/avatar', authenticate, upload.single('avatar'), uploadToCloudinary('portfolio/testimonials'), uploadTestimonialAvatar);