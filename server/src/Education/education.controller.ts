import { Request, Response } from 'express';
import {
    getAllEducationService,
    getEducationByIdService,
    createEducationService,
    updateEducationService,
    deleteEducationService
} from './education.services';

// GET /api/education
export const getAllEducation = async (_req: Request, res: Response) => {
    try {
        const education = await getAllEducationService();
        res.status(200).json(education);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// GET /api/education/:id
export const getEducationById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid education ID' });
        return;
    }
    try {
        const entry = await getEducationByIdService(id);
        if (!entry) {
            res.status(404).json({ error: 'Education entry not found' });
            return;
        }
        res.status(200).json(entry);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// POST /api/education
export const createEducation = async (req: Request, res: Response) => {
    const { institution, degree, description, logoUrl, startDate, endDate, order } = req.body;
    if (!institution || !degree) {
        res.status(400).json({ error: 'Institution and degree are required' });
        return;
    }
    try {
        const result = await createEducationService({ institution, degree, description, logoUrl, startDate, endDate, order });
        res.status(201).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// PUT /api/education/:id
export const updateEducation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid education ID' });
        return;
    }
    const { institution, degree, description, logoUrl, startDate, endDate, order } = req.body;
    if (!institution || !degree) {
        res.status(400).json({ error: 'Institution and degree are required' });
        return;
    }
    try {
        const result = await updateEducationService(id, { institution, degree, description, logoUrl, startDate, endDate, order });
        res.status(200).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// DELETE /api/education/:id
export const deleteEducation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid education ID' });
        return;
    }
    try {
        const result = await deleteEducationService(id);
        res.status(200).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// POST /api/education/:id/logo  — upload logo via Cloudinary
export const uploadEducationLogo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid education ID' });
        return;
    }
    const logoUrl = (req.file as any)?.path;
    if (!logoUrl) {
        res.status(400).json({ error: 'No image file provided' });
        return;
    }
    try {
        const entry = await getEducationByIdService(id);
        if (!entry) {
            res.status(404).json({ error: 'Education entry not found' });
            return;
        }
        const result = await updateEducationService(id, { ...entry, logoUrl });
        res.status(200).json({ message: result, logoUrl });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};