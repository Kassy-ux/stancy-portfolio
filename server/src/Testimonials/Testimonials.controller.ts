import { Request, Response } from 'express';
import {
    getAllTestimonialsService,
    getTestimonialByIdService,
    createTestimonialService,
    updateTestimonialService,
    deleteTestimonialService
} from './Testimonials.service';

// GET /api/testimonials
export const getAllTestimonials = async (_req: Request, res: Response) => {
    try {
        const testimonials = await getAllTestimonialsService();
        res.status(200).json(testimonials);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// GET /api/testimonials/:testimonialId
export const getTestimonialById = async (req: Request, res: Response) => {
    const testimonialId = parseInt(req.params.testimonialId as string);
    if (isNaN(testimonialId)) {
        res.status(400).json({ error: 'Invalid testimonial ID' });
        return;
    }
    try {
        const testimonial = await getTestimonialByIdService(testimonialId);
        if (!testimonial) {
            res.status(404).json({ error: 'Testimonial not found' });
            return;
        }
        res.status(200).json(testimonial);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// POST /api/testimonials
export const createTestimonial = async (req: Request, res: Response) => {
    const { name, role, avatarUrl, message, rating, order } = req.body;
    if (!name || !role || !message) {
        res.status(400).json({ error: 'Name, role, and message are required' });
        return;
    }
    try {
        const result = await createTestimonialService({ name, role, avatarUrl, message, rating, order });
        res.status(201).json({ message: result });
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: msg });
    }
};

// PUT /api/testimonials/:testimonialId
export const updateTestimonial = async (req: Request, res: Response) => {
    const testimonialId = parseInt(req.params.testimonialId as string);
    if (isNaN(testimonialId)) {
        res.status(400).json({ error: 'Invalid testimonial ID' });
        return;
    }
    const { name, role, avatarUrl, message, rating, order } = req.body;
    if (!name || !role || !message) {
        res.status(400).json({ error: 'Name, role, and message are required' });
        return;
    }
    try {
        const result = await updateTestimonialService(testimonialId, { name, role, avatarUrl, message, rating, order });
        res.status(200).json({ message: result });
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: msg });
    }
};

// DELETE /api/testimonials/:testimonialId
export const deleteTestimonial = async (req: Request, res: Response) => {
    const testimonialId = parseInt(req.params.testimonialId as string);
    if (isNaN(testimonialId)) {
        res.status(400).json({ error: 'Invalid testimonial ID' });
        return;
    }
    try {
        const result = await deleteTestimonialService(testimonialId);
        res.status(200).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// POST /api/testimonials/:testimonialId/avatar  — upload avatar via Cloudinary
export const uploadTestimonialAvatar = async (req: Request, res: Response) => {
    const testimonialId = parseInt(req.params.testimonialId as string);
    if (isNaN(testimonialId)) {
        res.status(400).json({ error: 'Invalid testimonial ID' });
        return;
    }
    const avatarUrl = (req.file as any)?.path;
    if (!avatarUrl) {
        res.status(400).json({ error: 'No image file provided' });
        return;
    }
    try {
        const testimonial = await getTestimonialByIdService(testimonialId);
        if (!testimonial) {
            res.status(404).json({ error: 'Testimonial not found' });
            return;
        }
        const result = await updateTestimonialService(testimonialId, { ...testimonial, avatarUrl });
        res.status(200).json({ message: result, avatarUrl });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};