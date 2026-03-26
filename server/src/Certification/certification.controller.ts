import { Request, Response } from 'express';
import {
    getAllCertificationsService,
    getCertificationByIdService,
    createCertificationService,
    updateCertificationService,
    deleteCertificationService
} from './certification.service';

// GET /api/certification
export const getAllCertifications = async (_req: Request, res: Response) => {
    try {
        const certifications = await getAllCertificationsService();
        res.status(200).json(certifications);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// GET /api/certification/:certificationId
export const getCertificationById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid certification ID' });
        return;
    }
    try {
        const entry = await getCertificationByIdService(id);
        if (!entry) {
            res.status(404).json({ error: 'Certification entry not found' });
            return;
        }
        res.status(200).json(entry);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// POST /api/certification
export const createCertification = async (req: Request, res: Response) => {
    const { issuer, certificateName, description, issueDate, expiryDate, certificateUrl, order } = req.body;
    if (!issuer || !certificateName || !issueDate) {
        res.status(400).json({ error: 'Issuer, certificateName, and issueDate are required' });
        return;
    }
    try {
        const result = await createCertificationService({ issuer, certificateName, description, issueDate, expiryDate, certificateUrl, order });
        res.status(201).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// PUT /api/certification/:certificationId
export const updateCertification = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid certification ID' });
        return;
    }
    const { issuer, certificateName, description, issueDate, expiryDate, certificateUrl, order } = req.body;
    if (!issuer || !certificateName || !issueDate) {
        res.status(400).json({ error: 'Issuer, certificateName, and issueDate are required' });
        return;
    }
    try {
        const result = await updateCertificationService(id, { issuer, certificateName, description, issueDate, expiryDate, certificateUrl, order });
        res.status(200).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// DELETE /api/certification/:certificationId
export const deleteCertification = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid certification ID' });
        return;
    }
    try {
        const result = await deleteCertificationService(id);
        res.status(200).json({ message: result });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};

// POST /api/certification/:id/image  — upload certificate image/PDF via Cloudinary
export const uploadCertificationImage = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid certification ID' });
        return;
    }
    const certificateUrl = (req.file as any)?.path;
    if (!certificateUrl) {
        res.status(400).json({ error: 'No file provided' });
        return;
    }
    try {
        const entry = await getCertificationByIdService(id);
        if (!entry) {
            res.status(404).json({ error: 'Certification not found' });
            return;
        }
        const result = await updateCertificationService(id, { ...entry, certificateUrl });
        res.status(200).json({ message: result, certificateUrl });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: message });
    }
};